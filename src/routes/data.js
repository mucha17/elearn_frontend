import Module from "../pages/Module";
import Course from "../pages/Course";
import Courses from "../pages/Courses";
import Lesson from "../pages/Lesson";

export const routes = [
	{
		key: 0,
		exact: true,
		to: "/courses",
		component: <Courses />,
	},
	{
		key: 1,
		exact: true,
		to: "/courses/:name",
		component: <Course />,
	},
	{
		key: 2,
		exact: true,
		to: "/courses/:name/:module",
		component: <Module />,
	},
	{
		key: 3,
		exact: true,
		to: "/courses/:name/:module/:lesson",
		component: <Lesson />,
	},
];
