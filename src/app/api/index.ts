// routes/index.ts

import { Application } from 'express';
import { userRoutes } from '../routes/user.route';
import { universityRoutes } from '../routes/university.routes';
import { applicationRoutes } from '../routes/application.route';
import { departmentRoutes } from '../routes/department.route';
import { circularRoutes } from '../routes/circular.route';
import { noticeRoutes } from '../routes/notice.route';
import { paymentRoutes } from '../routes/payment.route';
import { applicationTokenRoutes } from '../routes/applicationToken.routes';


const routes = [
  { path: '/api/users', handler: userRoutes },
  { path: '/api/universities', handler: universityRoutes },
  { path: '/api/applications', handler: applicationRoutes },
  { path: '/api/departments', handler: departmentRoutes },
  { path: '/api/circulars', handler: circularRoutes },
  { path: '/api/notices', handler: noticeRoutes },
  { path: '/api/payments', handler: paymentRoutes },
  { path: '/api/application-token', handler: applicationTokenRoutes },
];

export const registerRoutes = (app: Application) => {
  routes.forEach(route => {
    app.use(route.path, route.handler);
  });
};
