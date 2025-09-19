import { Request, Response, NextFunction } from 'express';
import { idParamSchema } from './user.schemas';
import { userRepo } from './user.repo';

export const userController = {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const user = await userRepo.findById(id);
      if (!user) return next(Object.assign(new Error('User not found'), { status: 404 }));
      res.json(user);
    } catch (e) { next(e); }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, Number(req.query.page || 1));
      const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize || 20)));
      const skip = (page - 1) * pageSize;
      const users = await userRepo.list(skip, pageSize);
      res.json({ page, pageSize, data: users });
    } catch (e) { next(e); }
  },

  async block(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const user = await userRepo.block(id);
      if (!user) return next(Object.assign(new Error('User not found'), { status: 404 }));
      res.json(user);
    } catch (e) { next(e); }
  },
};
