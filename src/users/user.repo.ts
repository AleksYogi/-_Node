import { query } from '../db';
import { User } from './user.types';

export const userRepo = {
  async create(data: { fullName: string; birthDate: Date; email: string; passwordHash: string; role?: 'ADMIN'|'USER' | undefined; }): Promise<User> {
    const sql = `
      INSERT INTO users (full_name, birth_date, email, password_hash, role)
      VALUES ($1,$2,$3,$4,COALESCE($5,'USER'))
      RETURNING id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
    `;
    const { rows } = await query<User>(sql, [data.fullName, data.birthDate, data.email, data.passwordHash, data.role]);
    return rows[0]!;
  },

  async findByEmail(email: string) {
    const sql = `
      SELECT id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text, password_hash
      FROM users WHERE email=$1
    `;
    const { rows } = await query(sql, [email]);
    return rows[0] as (User & { password_hash: string }) | undefined;
  },

  async findById(id: string) {
    const sql = `
      SELECT id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
      FROM users WHERE id=$1
    `;
    const { rows } = await query<User>(sql, [id]);
    return rows[0];
  },

  async list(skip: number, take: number) {
    const sql = `
      SELECT id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
      FROM users
      ORDER BY created_at DESC
      OFFSET $1 LIMIT $2
    `;
    const { rows } = await query<User>(sql, [skip, take]);
    return rows;
  },

  async block(id: string) {
    const sql = `
      UPDATE users SET status='BLOCKED', blocked_at=now() WHERE id=$1
      RETURNING id, full_name, birth_date::text, email, role, status, blocked_at, created_at::text, updated_at::text
    `;
    const { rows } = await query<User>(sql, [id]);
    return rows[0];
  },
};
