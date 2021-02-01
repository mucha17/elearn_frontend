import Module from "../pages/Module";
import Course from "../pages/Course";
import Courses from "../pages/Courses";
import Lesson from "../pages/Lesson";
import Admin from "../pages/Admin";
import AdminCourses from "../pages/AdminCourses";
import AdminLessons from "../pages/AdminLessons";
import AdminModules from "../pages/AdminModules";
import AdminCourse from "../pages/AdminCourse";
import AdminLesson from "../pages/AdminLesson";
import AdminLessonContent from "../pages/AdminLessonContent";
import AdminLessonContents from "../pages/AdminLessonContents";
import AdminModule from "../pages/AdminModule";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";

export const routes = [
    {
        key: -2,
        exact: true,
        to: "/",
        component: <HomePage/>,
    },
    {
        key: -1,
        exact: true,
        to: "/home",
        component: <HomePage/>,
    },
    {
        key: -23231,
        exact: true,
        to: "/login",
        component: <LoginPage/>,
    },
    {
        key: 0,
        exact: true,
        to: "/courses",
        component: <Courses/>,
    },
    {
        key: 1,
        exact: true,
        to: "/courses/:name",
        component: <Course/>,
    },
    {
        key: 2,
        exact: true,
        to: "/courses/:name/:module",
        component: <Module/>,
    },
    {
        key: 3,
        exact: true,
        to: "/courses/:name/:module/:lesson",
        component: <Lesson/>,
    },
    {
        key: 4,
        exact: true,
        to: "/admin",
        component: <Admin/>,
        role: 'token_admin'
    },
    {
        key: 5,
        exact: true,
        to: "/admin/courses",
        component: <AdminCourses/>,
        role: 'token_admin'
    },
    {

        key: 101,
        exact: true,
        to: "/admin/modules/:moduleId/lesson/:id/contents",
        component: <AdminLessonContents/>,
        role: 'token_admin'
    },
    {

        key: 102,
        exact: true,
        to: "/admin/modules/:moduleId/lessons/:id/contents/:cid",
        component: <AdminLessonContent/>,
        role: 'token_admin'
    },
    {
        key: 6,
        exact: true,
        to: "/admin/modules",
        component: <AdminModules/>,
        role: 'token_admin'
    },
    {
        key: 7,
        exact: true,
        to: "/admin/lessons",
        component: <AdminLessons/>,
        role: 'token_admin'
    },
    {
        key: 8,
        exact: true,
        to: "/admin/courses/:id",
        component: <AdminCourse/>,
        role: 'token_admin'
    },
    {
        key: 9,
        exact: true,
        to: "/admin/modules/:id",
        component: <AdminModule/>,
        role: 'token_admin'
    },
    {
        key: 10,
        exact: true,
        to: "/admin/lessons/:moduleId/:id",
        component: <AdminLesson/>,
        role: 'token_admin'
    },
];
