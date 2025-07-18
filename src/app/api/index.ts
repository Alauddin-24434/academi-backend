import { Application } from "express";
import { userRoutes } from "../routes/user.routes";
import { studentRoutes } from "../routes/student.routes";

export const routes = [
    { path: '/api/users', handler: userRoutes },
    { path: '/api/students', handler: studentRoutes },


];


export const initialRoute = (app: Application) => {
    routes.forEach(route => {
        app.use(route.path, route.handler);
    });
};