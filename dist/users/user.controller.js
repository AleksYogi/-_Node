"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_schemas_1 = require("./user.schemas");
const user_repo_1 = require("./user.repo");
exports.userController = {
    async getById(req, res, next) {
        try {
            const { id } = user_schemas_1.idParamSchema.parse(req.params);
            const user = await user_repo_1.userRepo.findById(id);
            if (!user)
                return next(Object.assign(new Error('User not found'), { status: 404 }));
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    },
    async list(req, res, next) {
        try {
            const page = Math.max(1, Number(req.query.page || 1));
            const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize || 20)));
            const skip = (page - 1) * pageSize;
            const users = await user_repo_1.userRepo.list(skip, pageSize);
            res.json({ page, pageSize, data: users });
        }
        catch (e) {
            next(e);
        }
    },
    async block(req, res, next) {
        try {
            const { id } = user_schemas_1.idParamSchema.parse(req.params);
            const user = await user_repo_1.userRepo.block(id);
            if (!user)
                return next(Object.assign(new Error('User not found'), { status: 404 }));
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=user.controller.js.map