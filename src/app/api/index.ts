import { Application } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { studentRoutes } from "../modules/Student/student.routes";
import { facultyRoutes } from "../modules/Faculty/faculty.routes";
import { departmentRoutes } from "../modules/Department/department.routes";

import { paymentRoutes } from "../modules/Payment/payment.route";
import { academicSessionRoutes } from "../modules/AcademicSession/academicSession.route";

import { dashboardRoutes } from "../modules/Dashboard/dashbord.routes";
import { teacherRoutes } from "../modules/Teacher/teacher.route";
import { eventRoutes } from "../modules/Event/event.routes";

export const routes = [
    { path: '/api/users', handler: userRoutes },
    { path: '/api/students', handler: studentRoutes },
    { path: '/api/students', handler: studentRoutes },
    { path: '/api/teachers', handler: teacherRoutes },
    { path: '/api/departments', handler: departmentRoutes },
    { path: '/api/events', handler: eventRoutes },

    { path: '/api/payments', handler: paymentRoutes },
    { path: '/api/sessions', handler: academicSessionRoutes },

    { path: '/api/overviews', handler: dashboardRoutes },


];


export const initialRoute = (app: Application) => {
    routes.forEach(route => {
        app.use(route.path, route.handler);
    });
};