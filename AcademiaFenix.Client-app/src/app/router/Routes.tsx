import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

import App from "../layout/App";
import NotFound from "../../features/errors/NotFound";
import ProfilePage from "../../features/profiles/ProfilePage";
import RegisterForm from "../../features/users/RegisterForm";
import RequireAuth from "./RequireAuth";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import StudentDashboard from "../../features/students/dashboard/StudentDashboard";
import StudentDetails from "../../features/students/details/StudentDetails";
import StudentForm from "../../features/students/form/StudentForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />,
                children: [
                    { path: 'students', element: <StudentDashboard /> },
                    { path: 'students/:id', element: <StudentDetails /> },
                    { path: 'createStudent', element: <StudentForm key='create' /> },
                    { path: 'manage/:id', element: <StudentForm key='manage' /> },
                    { path: 'register', element: <RegisterForm /> },
                    { path: 'profiles/:userName', element: <ProfilePage /> },
                    { path: 'errors', element: <TestErrors /> },

                ]
            },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' />, }
        ]
    }
]
export const router = createBrowserRouter(routes)