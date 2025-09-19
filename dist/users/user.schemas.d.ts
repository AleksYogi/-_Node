import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    fullName: z.ZodString;
    birthDate: z.ZodCoercedDate<unknown>;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.schemas.d.ts.map