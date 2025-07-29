import type { Application } from "express"
import { authRoutes } from "../modules/Auth/auth.route"
import { studentRoutes } from "../modules/Student/student.route"
import { paymentRoutes } from "../modules/Payment/payment.route"
import { adminRoutes } from "../modules/Admin/admin.route"
import { userRoutes } from "../modules/User/user.routes"
import { facultyRoutes } from "../modules/Faculty/faculty.routes"
import { departmentRoutes } from "../modules/Department/department.routes"
import { academicSessionRoutes } from "../modules/AcademicSession/academicSession.route"
import { staffRoutes } from "../modules/Staff/staff.route"
import { eventRoutes } from "../modules/Event/event.route"
import { dashboardRoutes } from "../modules/Dashboard/overview.route"

const moduleRoutes = [
  {
    path: "/api/auth",
    route: authRoutes,
  },
  {
    path: "/api/users",
    route: userRoutes,
  },
    {
    path: "/api/admins",
    route: adminRoutes,
  },
    {
    path: "/api/dashboards",
    route: dashboardRoutes,
  },
    {
    path: "/api/faculties",
    route: facultyRoutes,
  },
    {
    path: "/api/departments",
    route: departmentRoutes,
  },
    {
    path: "/api/sessions",
    route: academicSessionRoutes,
  },
  {
    path: "/api/students",
    route: studentRoutes,
  },
  {
    path: "/api/payments",
    route: paymentRoutes,
  },
  {
    path: "/api/staffs",
    route: staffRoutes,
  },{
    path: "/api/events",
    route: eventRoutes,
  },

]

export const initialRoute = (app: Application) => {
  moduleRoutes.forEach((route) => app.use(route.path, route.route))
}
