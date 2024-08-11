import { Profile } from "./profile";

export interface IStudent {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    attendees: Profile[];
}

export class Student implements IStudent {
    constructor(init: StudentFormValues) {
        this.id = init.id!;
        this.title = init.title;
        this.date = init.date;
        this.description = init.description;
        this.category = init.category;
        this.city = init.city;
        this.venue = init.venue;

    }
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName: string = '';
    isCancelled: boolean = false;
    isGoing: boolean = false;
    isHost: boolean = false;
    host?: Profile;
    attendees: Profile[] = [];

}

export class StudentFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(student?: StudentFormValues) {
        if (student) {
            this.id = student.id;
            this.title = student.title;
            this.category = student.category;
            this.description = student.description;
            this.date = student.date;
            this.venue = student.venue;
            this.city = student.city;
        }
    }
}