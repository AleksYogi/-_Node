"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./users/auth.controller");
const auth_1 = require("./middlewares/auth");
const user_controller_1 = require("./users/user.controller");
exports.router = (0, express_1.Router)();
// Auth
exports.router.post('/auth/register', auth_controller_1.authController.register);
exports.router.post('/auth/login', auth_controller_1.authController.login);
// Users
exports.router.get('/users/:id', auth_1.authGuard, (0, auth_1.adminOrSelf)('id'), user_controller_1.userController.getById);
exports.router.get('/users', auth_1.authGuard, auth_1.requireAdmin, user_controller_1.userController.list);
exports.router.post('/users/:id/block', auth_1.authGuard, (0, auth_1.adminOrSelf)('id'), user_controller_1.userController.block);
//# sourceMappingURL=routes.js.map