"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repo_1 = require("./user.repo");
exports.authService = {
    async login(input) {
        const email = input.email.trim().toLowerCase();
        const user = await user_repo_1.userRepo.findByEmail(email);
        if (!user)
            throw Object.assign(new Error('Invalid credentials'), { status: 401 });
        const ok = await bcrypt_1.default.compare(input.password, user.password_hash);
        if (!ok)
            throw Object.assign(new Error('Invalid credentials'), { status: 401 });
        if (user.status === 'BLOCKED')
            throw Object.assign(new Error('User is blocked'), { status: 403 });
        const token = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: (process.env.JWT_EXPIRES || '1h') });
        const { /* password_hash */ ...safe } = user;
        return { accessToken: token, user: safe };
    },
};
//# sourceMappingURL=auth.service.js.map