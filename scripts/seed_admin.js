require('dotenv/config');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

(async () => {
  const db = new Pool({ connectionString: process.env.DATABASE_URL });
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';
  const fullName = process.env.SEED_ADMIN_FULLNAME || 'Admin User';
  const birthDate = process.env.SEED_ADMIN_BIRTHDATE || '1990-01-01';
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  const passwordHash = await bcrypt.hash(password, saltRounds);
  try {
    await db.query(`INSERT INTO users (full_name, birth_date, email, password_hash, role)
      VALUES ($1,$2,$3,$4,'ADMIN') ON CONFLICT (email) DO NOTHING`,
      [fullName, birthDate, email, passwordHash]);
    console.log('Seeded admin:', email);
  } catch (e) {
    console.error('Seed failed:', e.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
