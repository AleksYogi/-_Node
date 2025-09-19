export type Role = 'ADMIN' | 'USER';
export type UserStatus = 'ACTIVE' | 'BLOCKED';

export type User = {
  id: string;
  full_name: string;
  birth_date: string; // ISO yyyy-mm-dd
  email: string;
  role: Role;
  status: UserStatus;
  blocked_at: string | null;
  created_at: string;
  updated_at: string;
};
