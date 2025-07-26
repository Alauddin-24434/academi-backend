"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRoute = exports.routes = void 0;
const user_routes_1 = require("../modules/User/user.routes");
const student_routes_1 = require("../modules/Student/student.routes");
const faculty_routes_1 = require("../modules/Faculty/faculty.routes");
const department_routes_1 = require("../modules/Department/department.routes");
const payment_route_1 = require("../modules/Payment/payment.route");
const academicSession_route_1 = require("../modules/AcademicSession/academicSession.route");
const dashbord_routes_1 = require("../modules/Dashboard/dashbord.routes");
exports.routes = [
    { path: '/api/users', handler: user_routes_1.userRoutes },
    { path: '/api/students', handler: student_routes_1.studentRoutes },
    { path: '/api/faculties', handler: faculty_routes_1.facultyRoutes },
    { path: '/api/departments', handler: department_routes_1.departmentRoutes },
    { path: '/api/payments', handler: payment_route_1.paymentRoutes },
    { path: '/api/sessions', handler: academicSession_route_1.academicSessionRoutes },
    { path: '/api/overviews', handler: dashbord_routes_1.dashboardRoutes },
];
const initialRoute = (app) => {
    exports.routes.forEach(route => {
        app.use(route.path, route.handler);
    });
};
exports.initialRoute = initialRoute;
