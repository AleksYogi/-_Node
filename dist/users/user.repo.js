"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const db_1 = require("../db");
exports.userRepo = {
    async create(data) {
        const sql = `
      INSERT INTO users (full_name, birth_date, email, password_hash, role)
      VALUES ($1,$2,$3,$4,COALESCE($5,'USER'))
      RETURNING id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
    `;
        const { rows } = await (0, db_1.query)(sql, [data.fullName, data.birthDate, data.email, data.passwordHash, data.role]);
        return rows[0];
    },
    async findByEmail(email) {
        const sql = `
      SELECT id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text, password_hash
      FROM users WHERE email=$1
    `;
        const { rows } = await (0, db_1.query)(sql, [email]);
        return rows[0];
    },
    async findById(id) {
        const sql = `
      SELECT id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
      FROM users WHERE id=$1
    `;
        const { rows } = await (0, db_1.query)(sql, [id]);
        return rows[0];
    },
    async list(skip, take) {
        const sql = `
      SELECT id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
      FROM users
      ORDER BY created_at DESC
      OFFSET $1 LIMIT $2
    `;
        const { rows } = await (0, db_1.query)(sql, [skip, take]);
        return rows;
    },
    async block(id) {
        const sql = `
      UPDATE users SET status='BLOCKED', blocked_at=now() WHERE id=$1
      RETURNING id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
    `;
        const { rows } = await (0, db_1.query)(sql, [id]);
        return rows[0];
    },
};
//# sourceMappingURL=user.repo.js.map