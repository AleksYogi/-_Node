import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { notFoundMiddleware, errorMiddleware, AppError } from './shared/errors';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api', router);

// тестовый маршрут, демонстрирует централизованную обработку ошибок
app.get('/boom', (_req, _res, next) => {
  next(new AppError(418, 'I am a teapot'));
});

// 404 и обработчик ошибок всегда в конце цепочки
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log('Server listening on :' + port);
});
