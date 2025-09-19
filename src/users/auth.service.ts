import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userRepo } from './user.repo';

export const authService = {
  async login(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();
    const user = await userRepo.findByEmail(email);
    if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    const ok = await bcrypt.compare(input.password, (user as any).password_hash);
    if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    if (user.status === 'BLOCKED') throw Object.assign(new Error('User is blocked'), { status: 403 });

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET as unknown as jwt.Secret,
      { expiresIn: (process.env.JWT_EXPIRES || '1h') as any }
    );

    const { /* password_hash */ ...safe } = user as any;
    return { accessToken: token, user: safe };
  },
};
