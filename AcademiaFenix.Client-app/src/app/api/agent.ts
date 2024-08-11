import { Student, StudentFormValues } from '../models/student';
import { Photo, Profile, Userstudent } from '../models/profile';
import { User, UserFormValues } from '../models/user';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { PaginatedResults } from '../models/pagination';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { toast } from 'react-toastify';

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token && config.headers)
		config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(
	async (response) => {
		if (import.meta.env.DEV) await sleep(1000);
		const pagination = response.headers['pagination'];
		console.log(pagination);
		if (pagination) {
			response.data = new PaginatedResults(
				response.data,
				JSON.parse(pagination)
			);
			return response as AxiosResponse<PaginatedResults<unknown>>;
		}
		return response;
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response as AxiosResponse;
		switch (status) {
			case 400:
				if (
					config.method === 'get' &&
					Object.prototype.hasOwnProperty.call(data.errors, 'id')
				) {
					router.navigate('/not-found');
				}
				if (data.errors) {
					const modalStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modalStateErrors.push(data.errors[key]);
						}
						throw modalStateErrors.flat();
					}
				} else {
					toast.error(data);
				}
				break;
			case 401:
				toast.error('unauthorised');
				break;
			case 403:
				toast.error('forbidden');
				break;
			case 404:
				toast.error('not found');
				router.navigate('/not-found');
				break;
			case 500:
				store.commonStore.setServerError(data);
				router.navigate('/server-error');
				break;

			default:
				toast.error('something went wrong');
				break;
		}
		return Promise.reject(error);
	}
);

const request = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: object) =>
		axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const urlPaths = {
	students: '/students/',
	users: '/account/',
	profiles: '/profiles/',
};

const Students = {
	list: (params: URLSearchParams) =>
		axios
			.get<PaginatedResults<Student[]>>(`${urlPaths.students}`, {
				params,
			})
			.then(responseBody),
	details: (id: string) => request.get<Student>(`${urlPaths.students}/${id}`),
	create: (student: StudentFormValues) =>
		request.post<void>(`${urlPaths.students}`, student),
	update: (student: StudentFormValues) =>
		request.put<void>(`${urlPaths.students}/${student.id}`, student),
	delete: (id: string) => request.del<void>(`${urlPaths.students}${id}`),
	attend: (id: string) =>
		request.post<void>(`${urlPaths.students}${id}/attend`, {}),
	unattend: (id: string) =>
		request.del<void>(`${urlPaths.students}${id}/attend`),
};

const Account = {
	current: () => request.get<User>(`${urlPaths.users}`),
	login: (user: UserFormValues) => request.post<User>(`${urlPaths.users}login`, user),
	register: (user: UserFormValues) =>
		request.post<User>(`${urlPaths.users}/register`, user),
};

const Profiles = {
	get: (userName: string) => {
		return request.get<Profile>(`${urlPaths.profiles}` + userName);
	},
	uploadPhoto: (file: Blob) => {
		const formData = new FormData();
		formData.append('File', file);
		return axios.post<Photo>('photos', formData, {
			headers: { 'Content-type': 'multipart/form-data' },
		});
	},
	setMainPhoto: (id: string) => request.post(`/photos/${id}/setMain`, {}),
	deletePhoto: (id: string) => request.del(`/photos/${id}`),
	updateProfile: (profile: Partial<Profile>) =>
		request.put(`/profiles`, profile),
	updateFollowing: (userName: string) =>
		request.post(`/follow/${userName}`, {}),
	listFollowings: (userName: string, predicate: string) =>
		request.get<Profile[]>(`/follow/${userName}?predicate=${predicate}`),
	listStudents: (userName: string, predicate: string) =>
		request.get<Userstudent[]>(
			`/profiles/${userName}/students=predicate=${predicate}`
		),
};

const agent = {
	Students,
	Account,
	Profiles,
};

export default agent;
