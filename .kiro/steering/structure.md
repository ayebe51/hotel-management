# Project Structure

Monorepo dengan pnpm workspaces.

## Directory Layout

```
/
├── frontend/               # Next.js 14 App Router
│   ├── app/                # App Router pages and layouts
│   │   ├── (auth)/         # Auth routes (login)
│   │   ├── (dashboard)/    # Protected routes
│   │   └── layout.tsx
│   ├── components/         # Reusable UI components (shadcn/ui based)
│   ├── features/           # Feature modules (auth, reservations, income, expenses, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API client (TanStack Query + fetch)
│   ├── stores/             # Zustand stores
│   └── utils/              # Helpers (date/timezone, currency IDR formatting)
│
├── backend/                # NestJS API
│   ├── src/
│   │   ├── modules/        # Feature modules (auth, properties, rooms, guests, reservations, etc.)
│   │   ├── guards/         # RBAC guards, JWT auth guard
│   │   ├── middleware/     # CSRF, logging middleware
│   │   ├── prisma/         # Prisma service and schema
│   │   └── common/         # Shared DTOs, decorators, utils
│   └── test/               # e2e and unit tests
│
├── prisma/                 # Shared Prisma schema (or inside backend/)
│   ├── schema.prisma
│   └── migrations/
│
├── package.json            # pnpm workspace root
└── .kiro/
    ├── specs/
    └── steering/
```

## Module Boundaries

Each feature module should encapsulate:
- Controller (route handler)
- Service (business logic)
- Repository / Prisma queries
- DTOs + validation schema (class-validator)

## Conventions

- Timezone: always store UTC, convert to Asia/Jakarta only at the display layer
- Currency: format all IDR values consistently across the UI
- Audit logging: any write operation (create/update/delete/status change) must write to Audit_Log
- Atomic operations: use Prisma `$transaction` for any multi-table writes (Reservation + Occupancy_Record + Income_Transaction)
- RBAC: enforce at backend via NestJS Guards; mirror at frontend for UI visibility only
- API versioning: all routes prefixed with `/api/v1/`
