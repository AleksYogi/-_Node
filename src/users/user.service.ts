import bcrypt from 'bcrypt';
import { userRepo } from './user.repo';

export const userService = {
  async createUser(input: { fullName: string; birthDate: Date; email: string; password: string; role?: 'ADMIN'|'USER'; }) {
    const email = input.email.trim().toLowerCase();
    const existing = await userRepo.findByEmail(email);
    if (existing) throw Object.assign(new Error('Email already in use'), { status: 409 });

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    const passwordHash = await bcrypt.hash(input.password, saltRounds);

    return userRepo.create({
      fullName: input.fullName,
      birthDate: input.birthDate,
      email,
      passwordHash,
      role: input.role,
    });
  },
};
