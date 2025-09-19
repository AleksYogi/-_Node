import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from './user.schemas';
import { userService } from './user.service';
import { authService } from './auth.service';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      const user = await userService.createUser(data);
      res.status(201).json(user);
    } catch (e) { next(e); }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data);
      res.json(result);
    } catch (e) { next(e); }
  },
};
