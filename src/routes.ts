import { Router } from 'express';
import { authController } from './users/auth.controller';
import { authGuard, requireAdmin, adminOrSelf } from './middlewares/auth';
import { userController } from './users/user.controller';

export const router = Router();

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Users
router.get('/users/:id', authGuard, adminOrSelf('id'), userController.getById);
router.get('/users', authGuard, requireAdmin, userController.list);
router.post('/users/:id/block', authGuard, adminOrSelf('id'), userController.block);
