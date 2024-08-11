import { Student, StudentFormValues } from "../models/student";
import { Pagination, PagingParams } from "../models/pagination";
import { makeAutoObservable, reaction, runInAction } from "mobx";

import { Profile } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export class StudentStore {
    studentRegistry = new Map<string, Student>();
    selectedStudent?: Student = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.studentRegistry.clear();
                this.loadStudents();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((_, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isHost':
                resetPredicate();
                this.predicate.set('isHost', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
                break;
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString())
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    get groupedStudents() {
        return Object.entries(
            this.studentsByDate.reduce((students, student) => {
                const date = student.date!.toISOString().split('T')[0];
                students[date] = students[date] ? [...students[date], student] : [student];
                return students;
            }, {} as { [key: string]: Student[] })
        )
    }

    get studentsByDate() {
        return Array.from(this.studentRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    loadStudents = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Students.list(this.axiosParams);
            result.data.forEach(student => {
                this.setStudent(student);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadStudent = async (id: string) => {
        let student = this.getStudent(id);
        if (student) {
            this.selectedStudent = student;
            return student;
        }
        else {
            this.setLoadingInitial(true);
            try {
                student = await agent.Students.details(id);
                this.setStudent(student);
                runInAction(() => this.selectedStudent = student);
                this.setLoadingInitial(false);
                return student;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setStudent = (student: Student) => {
        const user = store.userStore.user;
        if (user) {
            student.isGoing = student.attendees!.some(
                a => a.userName === user.userName
            );
            student.isHost = student.hostUserName === user.userName;
            student.host = student.attendees?.find(x => x.userName === student.hostUserName);
        }
        student.date = new Date(student.date!);
        this.studentRegistry.set(student.id, student);
    }

    private getStudent = (id: string) => {
        return this.studentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createStudent = async (student: StudentFormValues) => {
        const user = store.userStore!.user;
        const profile = new Profile(user!);
        try {
            await agent.Students.create(student);
            const newStudent = new Student(student);
            newStudent.hostUserName = user!.userName;
            newStudent.attendees = [profile];
            this.setStudent(newStudent);
            runInAction(() => this.selectedStudent = newStudent);
        } catch (error) {
            console.log(error);
        }
    }

    updateStudent = async (student: StudentFormValues) => {
        try {
            await agent.Students.update(student);
            runInAction(() => {
                if (student.id) {
                    const updatedStudent = { ...this.getStudent(student.id), ...student };
                    this.studentRegistry.set(student.id, updatedStudent as Student);
                    this.selectedStudent = updatedStudent as Student;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteStudent = async (id: string) => {
        this.loading = true;
        try {
            await agent.Students.delete(id);
            runInAction(() => {
                this.studentRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendeance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Students.attend(this.selectedStudent!.id);
            runInAction(() => {
                if (this.selectedStudent?.isGoing) {
                    this.selectedStudent.attendees = this.selectedStudent.attendees?.filter(a => a.userName !== user?.userName);
                    this.selectedStudent.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedStudent?.attendees?.push(attendee);
                    this.selectedStudent!.isGoing = true;
                }
                this.studentRegistry.set(this.selectedStudent!.id, this.selectedStudent!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelStudentToggle = async () => {
        this.loading = true;
        try {
            await agent.Students.attend(this.selectedStudent!.id);
            runInAction(() => {
                this.selectedStudent!.isCancelled = !this.selectedStudent!.isCancelled;
                this.studentRegistry.set(this.selectedStudent!.id, this.selectedStudent!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedStudent = () => {
        this.selectedStudent = undefined;
    }

    updateAttendeeFollowing = (username: string) => {
        this.studentRegistry.forEach(student => {
            student.attendees.forEach((attendee: Profile) => {
                if (attendee.userName === username) {
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
    }
}