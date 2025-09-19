"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repo_1 = require("./user.repo");
exports.userService = {
    async createUser(input) {
        const email = input.email.trim().toLowerCase();
        const existing = await user_repo_1.userRepo.findByEmail(email);
        if (existing)
            throw Object.assign(new Error('Email already in use'), { status: 409 });
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
        const passwordHash = await bcrypt_1.default.hash(input.password, saltRounds);
        return user_repo_1.userRepo.create({
            fullName: input.fullName,
            birthDate: input.birthDate,
            email,
            passwordHash,
            role: input.role,
        });
    },
};
//# sourceMappingURL=user.service.js.map