export class AppError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function notFoundMiddleware(_req: any, _res: any, next: any) {
  next(new AppError(404, 'Not Found'));
}

export function errorMiddleware(err: any, _req: any, res: any, _next: any) {
  const status = typeof err.status === 'number' ? err.status : 500;
  const message = typeof err.message === 'string' ? err.message : 'Internal Server Error';
  if (process.env.NODE_ENV !== 'test') {
    // simple console logger for now
    console.error('[ERROR]', { status, message, stack: err?.stack });
  }
  res.status(status).json({ error: message });
}
