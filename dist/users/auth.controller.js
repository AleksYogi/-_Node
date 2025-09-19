"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_schemas_1 = require("./user.schemas");
const user_service_1 = require("./user.service");
const auth_service_1 = require("./auth.service");
exports.authController = {
    async register(req, res, next) {
        try {
            const data = user_schemas_1.registerSchema.parse(req.body);
            const user = await user_service_1.userService.createUser(data);
            res.status(201).json(user);
        }
        catch (e) {
            next(e);
        }
    },
    async login(req, res, next) {
        try {
            const data = user_schemas_1.loginSchema.parse(req.body);
            const result = await auth_service_1.authService.login(data);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=auth.controller.js.map