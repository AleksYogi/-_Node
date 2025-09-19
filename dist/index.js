"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const errors_1 = require("./shared/errors");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.get('/health', (_req, res) => res.json({ ok: true }));
// API routes
app.use('/api', routes_1.router);
// тестовый маршрут, демонстрирует централизованную обработку ошибок
app.get('/boom', (_req, _res, next) => {
    next(new errors_1.AppError(418, 'I am a teapot'));
});
// 404 и обработчик ошибок всегда в конце цепочки
app.use(errors_1.notFoundMiddleware);
app.use(errors_1.errorMiddleware);
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log('Server listening on :' + port);
});
//# sourceMappingURL=index.js.map