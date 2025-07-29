"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRoute = void 0;
const auth_route_1 = require("../modules/Auth/auth.route");
const student_route_1 = require("../modules/Student/student.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const user_routes_1 = require("../modules/User/user.routes");
const faculty_routes_1 = require("../modules/Faculty/faculty.routes");
const department_routes_1 = require("../modules/Department/department.routes");
const academicSession_route_1 = require("../modules/AcademicSession/academicSession.route");
const staff_route_1 = require("../modules/Staff/staff.route");
const event_route_1 = require("../modules/Event/event.route");
const overview_route_1 = require("../modules/Dashboard/overview.route");
const moduleRoutes = [
    {
        path: "/api/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/api/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/api/admins",
        route: admin_route_1.adminRoutes,
    },
    {
        path: "/api/dashboards",
        route: overview_route_1.dashboardRoutes,
    },
    {
        path: "/api/faculties",
        route: faculty_routes_1.facultyRoutes,
    },
    {
        path: "/api/departments",
        route: department_routes_1.departmentRoutes,
    },
    {
        path: "/api/sessions",
        route: academicSession_route_1.academicSessionRoutes,
    },
    {
        path: "/api/students",
        route: student_route_1.studentRoutes,
    },
    {
        path: "/api/payments",
        route: payment_route_1.paymentRoutes,
    },
    {
        path: "/api/staffs",
        route: staff_route_1.staffRoutes,
    }, {
        path: "/api/events",
        route: event_route_1.eventRoutes,
    },
];
const initialRoute = (app) => {
    moduleRoutes.forEach((route) => app.use(route.path, route.route));
};
exports.initialRoute = initialRoute;
