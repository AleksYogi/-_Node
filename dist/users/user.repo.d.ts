import { User } from './user.types';
export declare const userRepo: {
    create(data: {
        fullName: string;
        birthDate: Date;
        email: string;
        passwordHash: string;
        role?: "ADMIN" | "USER" | undefined;
    }): Promise<User>;
    findByEmail(email: string): Promise<(User & {
        password_hash: string;
    }) | undefined>;
    findById(id: string): Promise<User | undefined>;
    list(skip: number, take: number): Promise<User[]>;
    block(id: string): Promise<User | undefined>;
};
//# sourceMappingURL=user.repo.d.ts.map