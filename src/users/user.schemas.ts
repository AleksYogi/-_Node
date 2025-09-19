import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(1),
  birthDate: z.coerce.date(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});
