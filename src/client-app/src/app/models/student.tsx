export interface IStudent {
	Id: string;
	Name: string;
	Email: string;
	DateOfBirth: Date;
	Belt: TaekwondoBeltColorsEnum;
	LastMedicExamDate?: Date;
	LastExamDate?: Date;
	TrainingStartDate: Date;
	IsBlackBelt: boolean;
}

export class Student implements IStudent {
	constructor(init: Partial<IStudent>) {
		this.Id = init.Id || '';
		this.Name = init.Name || '';
		this.Email = init.Email || '';
		this.DateOfBirth = init.DateOfBirth || new Date();
		this.Belt = init.Belt || TaekwondoBeltColorsEnum.White;
		this.LastMedicExamDate = init.LastMedicExamDate;
		this.LastExamDate = init.LastExamDate;
		this.TrainingStartDate = init.TrainingStartDate || new Date();
		this.IsBlackBelt = this.Belt === TaekwondoBeltColorsEnum.Black;
	}

	Id: string;
	Name: string;
	Email: string;
	DateOfBirth: Date;
	Belt: TaekwondoBeltColorsEnum;
	LastMedicExamDate?: Date;
	LastExamDate?: Date;
	TrainingStartDate: Date;
	IsBlackBelt: boolean;
}

export class StudentFormValues {
	Id?: string;
	Name?: string;
	Email?: string;
	DateOfBirth?: Date | null;
	Belt?: TaekwondoBeltColorsEnum;
	LastMedicExamDate?: Date | null;
	LastExamDate?: Date | null;
	TrainingStartDate?: Date | null;
	IsBlackBelt?: boolean;

	constructor(student?: Partial<StudentFormValues>) {
		if (student) {
			this.Id = student.Id;
			this.Name = student.Name;
			this.Email = student.Email;
			this.DateOfBirth = student.DateOfBirth;
			this.Belt = student.Belt;
			this.LastMedicExamDate = student.LastMedicExamDate;
			this.LastExamDate = student.LastExamDate;
			this.TrainingStartDate = student.TrainingStartDate;
			this.IsBlackBelt = student.IsBlackBelt;
		}
	}
}

export enum TaekwondoBeltColorsEnum {
	White = 0,
	WhiteWithYellowStripe = 1,
	Yellow = 2,
	YellowWithGreenStripe = 3,
	Green = 4,
	GreenWithBlueStripe = 5,
	Blue = 6,
	BlueWithRedStripe = 7,
	Red = 8,
	RedWithBlackStripe = 9,
	Black = 10,
}
