import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: 'students',
				element: <StudentDashboard/>,
			},
		],
	},
];
export const router = createBrowserRouter(routes);
