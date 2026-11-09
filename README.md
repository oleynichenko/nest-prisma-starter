# NestJS service starter

NestJS, TypeScript, and PostgreSQL starter for a new backend service. It includes Prisma, environment validation, request validation, one error response shape, a health check, and a sample feature.

## Prerequisites

- Node.js 24.15 or newer
- Docker
- npm

## Setup

```bash
npm ci
cp .env.example .env
docker compose up -d
npx prisma migrate dev
npm run start:dev
```

On Windows, create the env file with `copy .env.example .env`.

The values in `.env.example` (`app` / `app`) are development defaults.

## Tests

```bash
npm test
npm run test:e2e
```

## Sample feature

`src/modules/note` is a sample of the feature pattern. The first real feature replaces it: remove the module, the model, and the table.

## Next feature

The next feature goes in `ASSIGNMENT.md`. Planning steps are in `.cursor/skills/plan-feature/SKILL.md`.

## Scripts

- `npm run start:dev` — start the API on the host with watch mode
- `npm run build` — generate the Prisma Client, then compile
- `npm run lint` — run oxlint
- `npm run format` — format TypeScript with Prettier
- `npm test` — generate the Prisma Client, then run unit tests
- `npm run test:watch` — generate the Prisma Client, then run unit tests in watch mode
- `npm run test:cov` — generate the Prisma Client, then run unit tests with coverage
- `npm run test:e2e` — point `DATABASE_URL` at `TEST_DATABASE_URL`, apply migrations, and request `GET /api/health`
- `npm run prisma:generate` — generate the Prisma Client
- `npm run prisma:migrate` — create and apply a development migration
- `npm run prisma:studio` — open Prisma Studio
