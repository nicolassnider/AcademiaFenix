import axios, { AxiosError, AxiosResponse } from 'axios';
import { PaginatedResults } from '../models/pagination';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import  { Student , StudentFormValues } from '../models/student';

axios.defaults.baseURL= import.meta.env.VITE_API_URL;

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config=>{
	return config;
})
axios.interceptors.response.use(async response => {
    const pagination = response.headers['pagination'];
    console.log(pagination)
    if (pagination) {
        response.data = new PaginatedResults(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResults<unknown>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
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

        default:
            toast.error('something went wrong');
            break;
    }
    return Promise.reject(error);
})

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Students = {
    list: (params: URLSearchParams) => axios.get<PaginatedResults<Student[]>>('/students', { params })
        .then(responseBody),
    details: (id: string) => request.get<Student>(`/students/${id}`),
    create: (student: StudentFormValues) => request.post<void>('/students', student),
    update: (student: StudentFormValues) => request.put<void>(`/students/${student.Id}`, student),
    delete: (id: string) => request.del<void>(`/students/${id}`),
    
}

const agent ={
	Students
}


export default agent;