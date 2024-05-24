import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../models/pagination';
import { Student } from '../models/student';
import agent from '../api/agent';

export class StudentStore {
	studentRegistry = new Map<string, Student>();
	selectedStudent?: Student = undefined;
	editMode: boolean = false;
	loading: boolean = false;
	loadingInitial: boolean = false;
	pagination: Pagination | null = null;
	pagingParams: PagingParams = new PagingParams();
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
		);
	}

	get axiosParams() {
		const params = new URLSearchParams();
		params.append('pageNumber', this.pagingParams.pageNumber.toString());
		params.append('pageSize', this.pagingParams.pageSize.toString());
		this.predicate.forEach((value, key) => {
			if (key === 'startDate') {
				params.append(key, (value as Date).toISOString());
			} else {
				params.append(key, value);
			}
		});
		return params;
	}

	loadStudents = async () => {
		this.loadingInitial = true;
		try {
			const result = await agent.Students.list(this.axiosParams);
			result.data.forEach((activity) => {
				this.setStudent(activity);
			});
			this.setPagination(result.pagination);
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadStudent = async (id: string) => {
		let student = this.getStudent(id);
		if (student) {
			this.selectedStudent = student;
			return student;
		} else {
			this.setLoadingInitial(true);
			try {
				student = await agent.Students.details(id);
				this.setStudent(student);
				runInAction(() => (this.selectedStudent = student));
				this.setLoadingInitial(false);
				return student;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	setStudent = (student: Student) => {
		this.studentRegistry.set(student.Id, student);
	};

	setPagination = (pagination: Pagination) => {
		this.pagination = pagination;
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};
	private getStudent = (id: string) => {
        return this.studentRegistry.get(id);
    }
}
