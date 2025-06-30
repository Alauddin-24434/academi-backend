import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/', userController.registrationUser);         
router.post('/login', userController.loginUser);            
router.post('/refresh-token', userController.refreshTokenHandler); 

export const userRoutes= router;
