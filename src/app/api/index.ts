import { Application } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { studentRoutes } from "../modules/Student/student.routes";
import { facultyRoutes } from "../modules/Faculty/faculty.routes";
import { departmentRoutes } from "../modules/Department/department.routes";

import { paymentRoutes } from "../modules/Payment/payment.route";
import { academicSessionRoutes } from "../modules/AcademicSession/academicSession.route";

import { dashboardRoutes } from "../modules/Dashboard/dashbord.routes";

export const routes = [
    { path: '/api/users', handler: userRoutes },
    { path: '/api/students', handler: studentRoutes },
    { path: '/api/faculties', handler: facultyRoutes },
    { path: '/api/departments', handler: departmentRoutes },

    { path: '/api/payments', handler: paymentRoutes },
    { path: '/api/sessions', handler: academicSessionRoutes },

    { path: '/api/overviews', handler: dashboardRoutes },


];


export const initialRoute = (app: Application) => {
    routes.forEach(route => {
        app.use(route.path, route.handler);
    });
};