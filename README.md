# User Service (Express + TypeScript + pg)

Минимальный сервис пользователей без ORM (чистый SQL через node-postgres).

## Быстрый старт

1) Скопируй `.env.example` → `.env` и при необходимости подправь `DATABASE_URL`.

2) Подними PostgreSQL:
- Docker (рекомендуется):
```bash
docker compose up -d
```
- Или локально создай БД `users_db` и пользователя, чтобы URL подходил.

3) Применить миграцию:
```bash
npm run migrate
```

4) (Опционально) Засидить админа:
```bash
npm run seed
```

5) Запуск dev:
```bash
npm run dev
```

## Эндпоинты
Базовый префикс: `/api`

- POST `/auth/register`
  - body: `{ fullName, birthDate (ISO), email, password }`
- POST `/auth/login`
  - body: `{ email, password }`
  - response: `{ accessToken, user }`
- GET `/users/:id` (Bearer) — админ или сам
- GET `/users` (Bearer) — только админ
- POST `/users/:id/block` (Bearer) — админ или сам

## Примеры curl
```bash
# Register
curl -s -X POST http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"fullName":"Test User","birthDate":"1990-01-01","email":"u1@example.com","password":"Password123!"}'

# Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"u1@example.com","password":"Password123!"}' | jq -r .accessToken)

# Get self (replace :id)
curl -s http://localhost:3000/api/users/:id -H "Authorization: Bearer $TOKEN"
```

## Техническое
- Express + TypeScript
- Валидация: zod
- Auth: JWT (HS256), bcrypt
- БД: PostgreSQL + `pg`
- Безопасность: helmet, cors
- Ошибки: централизованный обработчик

## Миграции
- SQL: `migrations/001_init.sql`
- Скрипт: `npm run migrate`

## Замечания
- При отсутствии Docker — используй локальную БД и свой `DATABASE_URL`.
- В проде выставь сильный `JWT_SECRET`.
