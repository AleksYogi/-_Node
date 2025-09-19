export declare const userService: {
    createUser(input: {
        fullName: string;
        birthDate: Date;
        email: string;
        password: string;
        role?: "ADMIN" | "USER";
    }): Promise<import("./user.types").User>;
};
//# sourceMappingURL=user.service.d.ts.map