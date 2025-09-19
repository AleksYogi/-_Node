import jwt from 'jsonwebtoken';

export function authGuard(req: any, _res: any, next: any) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(Object.assign(new Error('Invalid token'), { status: 401 }));
  }
}

export function requireAdmin(req: any, _res: any, next: any) {
  if (req.user?.role !== 'ADMIN') return next(Object.assign(new Error('Forbidden'), { status: 403 }));
  next();
}

export function adminOrSelf(param = 'id') {
  return (req: any, _res: any, next: any) => {
    const isAdmin = req.user?.role === 'ADMIN';
    const self = req.user?.id === req.params[param];
    if (isAdmin || self) return next();
    next(Object.assign(new Error('Forbidden'), { status: 403 }));
  };
}
