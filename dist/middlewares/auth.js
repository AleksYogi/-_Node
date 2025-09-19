"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
exports.requireAdmin = requireAdmin;
exports.adminOrSelf = adminOrSelf;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authGuard(req, _res, next) {
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if (!token)
        return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.sub, role: payload.role };
        next();
    }
    catch {
        next(Object.assign(new Error('Invalid token'), { status: 401 }));
    }
}
function requireAdmin(req, _res, next) {
    if (req.user?.role !== 'ADMIN')
        return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    next();
}
function adminOrSelf(param = 'id') {
    return (req, _res, next) => {
        const isAdmin = req.user?.role === 'ADMIN';
        const self = req.user?.id === req.params[param];
        if (isAdmin || self)
            return next();
        next(Object.assign(new Error('Forbidden'), { status: 403 }));
    };
}
//# sourceMappingURL=auth.js.map