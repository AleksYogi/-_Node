"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.notFoundMiddleware = notFoundMiddleware;
exports.errorMiddleware = errorMiddleware;
class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.AppError = AppError;
function notFoundMiddleware(_req, _res, next) {
    next(new AppError(404, 'Not Found'));
}
function errorMiddleware(err, _req, res, _next) {
    const status = typeof err.status === 'number' ? err.status : 500;
    const message = typeof err.message === 'string' ? err.message : 'Internal Server Error';
    if (process.env.NODE_ENV !== 'test') {
        // simple console logger for now
        console.error('[ERROR]', { status, message, stack: err?.stack });
    }
    res.status(status).json({ error: message });
}
//# sourceMappingURL=errors.js.map