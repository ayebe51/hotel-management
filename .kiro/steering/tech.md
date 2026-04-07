# Tech Stack

## Confirmed Stack

### Frontend
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query v5)
- **Charts**: Recharts
- **Form Validation**: React Hook Form + Zod

### Backend
- **Framework**: NestJS + TypeScript
- **ORM**: Prisma
- **Validation**: class-validator + class-transformer
- **Auth**: JWT (access token 15m + refresh token 7d) + CSRF token
- **API**: REST, versioned at /api/v1/

### Database
- **Engine**: PostgreSQL 15+
- **Migrations**: Prisma Migrate
- **Locking**: Optimistic locking via version field

### Testing
- **Backend**: Jest + Supertest
- **Frontend**: Vitest + Testing Library
- **Property-Based Testing**: fast-check

## Key Technical Requirements
- All API endpoints must enforce RBAC at the backend layer (NestJS Guards)
- Atomic transactions required for Reservation + Occupancy_Record + Income_Transaction operations (Prisma $transaction)
- Optimistic locking via version field on all mutable entities
- Passwords hashed with bcrypt (cost factor ≥ 12)
- All timestamps stored as UTC in the database (timestamptz)
- API versioned at /api/v1/ to support future public API at /api/v2/ or separate service
- Prisma schema designed to be extensible for Phase 4 public booking (rate_plan, payment, channel fields reserved)

## Common Commands
> Populate this section once the project is scaffolded.

```bash
# Install dependencies
pnpm install

# Run development server (frontend)
pnpm --filter frontend dev

# Run development server (backend)
pnpm --filter backend dev

# Run tests (backend)
pnpm --filter backend test

# Run tests (frontend)
pnpm --filter frontend test --run

# Build for production
pnpm build

# Database migrations
pnpm --filter backend prisma migrate dev
```
