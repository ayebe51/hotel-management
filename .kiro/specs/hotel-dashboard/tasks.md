# Tasks: Hotel Dashboard

## Phase 1 — MVP

### 1. Monorepo & Project Scaffolding

- [x] 1.1 Initialize pnpm workspace root with `package.json` and `pnpm-workspace.yaml`
- [x] 1.2 Scaffold Next.js 14 App Router frontend (`frontend/`) with TypeScript, Tailwind CSS, and shadcn/ui
- [ ] 1.3 Scaffold NestJS backend (`backend/`) with TypeScript
- [ ] 1.4 Initialize Prisma inside `backend/` with PostgreSQL provider; create `schema.prisma` with all entities, enums, and relations from the data model
- [ ] 1.5 Run initial Prisma migration (`prisma migrate dev --name init`)
- [ ] 1.6 Configure shared ESLint + Prettier rules at workspace root
- [ ] 1.7 Add workspace-level scripts: `dev`, `build`, `test`, `lint`
- [ ] 1.8 Configure environment variable files (`.env.example`) for both frontend and backend

---

### 2. Authentication & Session Management

- [ ] 2.1 Backend: implement `auth` module — `POST /api/v1/auth/login` with bcrypt password verification (cost ≥ 12), issue JWT access token (15m) + refresh token (7d) as httpOnly cookie
- [ ] 2.2 Backend: implement `POST /api/v1/auth/logout` — invalidate refresh token and clear cookie
- [ ] 2.3 Backend: implement JWT auth guard and attach to all protected routes
- [ ] 2.4 Backend: implement CSRF middleware — generate and validate CSRF token on all state-changing endpoints
- [ ] 2.5 Backend: implement session timeout — reject requests with expired access token and require re-authentication
- [ ] 2.6 Frontend: build login page (`/login`) with React Hook Form + Zod validation
- [ ] 2.7 Frontend: implement auth Zustand store (user, role, token state) and TanStack Query auth hooks
- [ ] 2.8 Frontend: implement route guard — redirect unauthenticated users to `/login`; redirect authenticated users away from `/login`
- [ ] 2.9 Write unit tests for auth service (login success, invalid credentials, token expiry)

---

### 3. RBAC — Role-Based Access Control

- [ ] 3.1 Backend: define `Roles` decorator and `RolesGuard` (NestJS guard) enforcing the five roles: `owner`, `admin`, `staff_operasional`, `finance`, `auditor`
- [ ] 3.2 Backend: apply `RolesGuard` to all module controllers with correct role sets per endpoint (per design matrix)
- [ ] 3.3 Backend: implement `users` module — `GET/POST/PATCH /api/v1/users` (Owner only); hash password on create/update
- [ ] 3.4 Frontend: implement `usePermissions` hook that reads role from auth store and exposes boolean flags per feature
- [ ] 3.5 Frontend: hide/show nav items and action buttons based on role using `usePermissions`
- [ ] 3.6 Frontend: build User Management page (`/users`) — list, create, edit users (Owner only)
- [ ] 3.7 Write unit tests for `RolesGuard` — verify each role is blocked/allowed correctly for representative endpoints

---

### 4. Database — Prisma Schema & Audit Log Infrastructure

- [ ] 4.1 Finalize Prisma schema: all entities (`User`, `Property`, `Room`, `Guest`, `Reservation`, `Occupancy_Record`, `Income_Transaction`, `Expense_Transaction`, `RoomAvailabilityCalendar`, `Audit_Log`) with `version` fields and `timestamptz` columns
- [ ] 4.2 Backend: implement `PrismaService` (singleton, lifecycle hooks)
- [ ] 4.3 Backend: implement `AuditLogService` — `createEntry(actor, entityType, entityId, action, before, after)` used by all write operations
- [ ] 4.4 Backend: implement `audit-log` module — `GET /api/v1/audit-log` with filters (`entityType`, `action`, `from`, `to`); Owner sees all, Admin sees own entries only
- [ ] 4.5 Frontend: build Audit Log page (`/audit-log`) — filterable table (Owner/Auditor access)
- [ ] 4.6 Write unit tests for `AuditLogService` — verify entry creation and immutability (no update/delete paths exposed)
- [ ] 4.7 Write PBT (fast-check): **Property 6 — Audit Log Immutability** — every write operation produces exactly one new Audit_Log entry; count only ever increases

---

### 5. Property Management

- [ ] 5.1 Backend: implement `properties` module — `GET`, `POST /api/v1/properties`, `PATCH /api/v1/properties/:id`, `PATCH /api/v1/properties/:id/deactivate`
- [ ] 5.2 Backend: enforce unique `Property.code` globally; return 409 on duplicate
- [ ] 5.3 Backend: deactivation guard — reject if any `Reservation` with status `confirmed` or `checked_in` exists for the property; return list of blocking reservations
- [ ] 5.4 Backend: write to `Audit_Log` on create, update, and deactivate
- [ ] 5.5 Frontend: build Properties page (`/properties`) — list with active/inactive filter, create form, edit form, deactivate action (Owner only)
- [ ] 5.6 Write unit tests for `PropertiesService` — duplicate code rejection, deactivation guard logic

---

### 6. Room Management

- [ ] 6.1 Backend: implement `rooms` module — `GET /api/v1/rooms?propertyId=`, `POST`, `PATCH /api/v1/rooms/:id`, `POST /api/v1/rooms/:id/relocate`
- [ ] 6.2 Backend: enforce unique `room_code` per `property_id`; return 409 on duplicate
- [ ] 6.3 Backend: status transitions — allow `active`, `maintenance`, `blocked`, `inactive`; on `maintenance`/`blocked` update `RoomAvailabilityCalendar` for the specified date range
- [ ] 6.4 Backend: relocation guard — reject if any active `Occupancy_Record` exists on the room; return blocking info
- [ ] 6.5 Backend: prevent new `Reservation` creation on rooms with `maintenance`/`blocked` status for the overlapping date range
- [ ] 6.6 Backend: write to `Audit_Log` on create, update, status change, and relocate
- [ ] 6.7 Frontend: build Rooms page (`/rooms`) — list by property, create/edit form, status badge, status change action (Owner/Admin/Staff Operasional)
- [ ] 6.8 Write unit tests for `RoomsService` — unique code enforcement, relocation guard, maintenance block logic

---

### 7. Guest Management

- [ ] 7.1 Backend: implement `guests` module — `GET /api/v1/guests?search=`, `POST`, `PATCH /api/v1/guests/:id`
- [ ] 7.2 Backend: search by `full_name`, `phone_number`, or `id_document`
- [ ] 7.3 Backend: write to `Audit_Log` on create and update
- [ ] 7.4 Frontend: build Guests page (`/guests`) — searchable list, create/edit form (Admin access)
- [ ] 7.5 Frontend: implement guest search combobox component reused in Reservation form

---

### 8. Reservation Management

- [ ] 8.1 Backend: implement `reservations` module — `GET`, `POST /api/v1/reservations`, `PATCH /api/v1/reservations/:id`
- [ ] 8.2 Backend: overlap check on create/update — `check_in_date < existing.check_out_date AND check_out_date > existing.check_in_date` for active statuses (`draft`, `confirmed`, `checked_in`); return 409 with conflict info
- [ ] 8.3 Backend: validate `check_out_date > check_in_date` (Req 17.3)
- [ ] 8.4 Backend: on create — atomically (`$transaction`) create `Reservation` (status `draft`) + `Occupancy_Record` rows (one per day) + write `Audit_Log`
- [ ] 8.5 Backend: `POST /api/v1/reservations/:id/confirm` — `draft → confirmed`; atomic update of `Reservation` + `Occupancy_Record` + `Audit_Log`
- [ ] 8.6 Backend: `POST /api/v1/reservations/:id/cancel` — allowed from `draft`, `confirmed`, `checked_in`; atomic update + `Occupancy_Record` cancelled + auto-create `Reversal` if posted `Income_Transaction` exists + `Audit_Log` with cancellation reason
- [ ] 8.7 Backend: implement status lifecycle guard — reject invalid transitions (Req 6.10); define `VALID_TRANSITIONS` map
- [ ] 8.8 Backend: apply optimistic locking (`version` field) on `Reservation` updates
- [ ] 8.9 Frontend: build Reservations page (`/reservations`) — tabbed list (Current / Future / Past), create form, detail view with status actions
- [ ] 8.10 Frontend: reservation create form — room selector, guest selector (with search), date range picker, price field
- [ ] 8.11 Write unit tests for `ReservationsService` — overlap detection, status transition guard, cancellation with reversal
- [ ] 8.12 Write PBT (fast-check): **Property 1 — No Double Booking** — for any two overlapping date ranges on the same room, the second create must fail
- [ ] 8.13 Write PBT (fast-check): **Property 2 — Atomic Reservation + Occupancy + Income** — on success all counts increase together; on failure nothing changes
- [ ] 8.14 Write PBT (fast-check): **Property 3 — Reservation Status Lifecycle Transitions** — only valid transitions succeed; all invalid transitions are rejected

---

### 9. Occupancy Calendar

- [ ] 9.1 Backend: implement `occupancy` module — `GET /api/v1/rooms/:room_id/calendar?month=&year=` returning daily status grid
- [ ] 9.2 Backend: sync `RoomAvailabilityCalendar` on every `Reservation` create/confirm/cancel/checkin/checkout (within the same `$transaction`)
- [ ] 9.3 Frontend: build Calendar page (`/calendar`) — property filter, month navigation, grid (rooms × days), color-coded status cells
- [ ] 9.4 Frontend: click on available slot opens create-reservation modal (Admin/Owner)
- [ ] 9.5 Write unit tests for calendar sync — verify slot status after each reservation lifecycle event

---

### 10. Income Management

- [ ] 10.1 Backend: implement `income` module — `GET /api/v1/income/transactions`, `POST`, `PATCH /api/v1/income/transactions/:id`, `POST .../post`, `POST .../reverse`
- [ ] 10.2 Backend: `post` action — `draft → posted`; atomic update + recalculate property total
- [ ] 10.3 Backend: `reverse` action — create linked `reversal` transaction; reduce total income
- [ ] 10.4 Backend: total income calculation — sum of `posted` transactions excluding `reversal`/`refund` types (Req 9.9)
- [ ] 10.5 Backend: write to `Audit_Log` on create, post, reverse
- [ ] 10.6 Frontend: build Income page (`/income`) — transaction table with filters (property, month, year, type, status), summary cards (monthly / yearly / total), create/edit form
- [ ] 10.7 Write unit tests for `IncomeService` — total calculation, reversal logic, draft→posted transition
- [ ] 10.8 Write PBT (fast-check): **Property 5 — Income Total Consistency** — displayed total always equals sum of posted non-reversal/refund minus posted reversal/refund

---

### 11. Expense Management

- [ ] 11.1 Backend: implement `expenses` module — `GET /api/v1/expenses`, `POST`, `PATCH /api/v1/expenses/:id`, `POST /api/v1/expenses/:id/cancel`
- [ ] 11.2 Backend: validate `amount` is a positive number; reject otherwise (Req 10.2, 17.2)
- [ ] 11.3 Backend: soft-delete — set `status = cancelled`; never hard-delete; write `Audit_Log`
- [ ] 11.4 Backend: filter by property, month, year, category
- [ ] 11.5 Frontend: build Expenses page (`/expenses`) — transaction table with filters, summary by property and category, create/edit form, cancel action (Owner only for delete)
- [ ] 11.6 Write unit tests for `ExpensesService` — amount validation, soft-delete, filter logic

---

### 12. Dashboard

- [ ] 12.1 Backend: implement `dashboard` module — `GET /api/v1/dashboard/summary?propertyId=&month=&year=` returning KPIs: total income, monthly revenue, active bookings count, occupancy insight
- [ ] 12.2 Backend: `GET /api/v1/analytics/revenue-trend?propertyId=&year=` — monthly revenue array for the year
- [ ] 12.3 Backend: `GET /api/v1/analytics/expense-breakdown?propertyId=&month=&year=` — totals by category
- [ ] 12.4 Backend: return zero-state (all zeros, empty arrays) when no data exists for the period (Req 11.8)
- [ ] 12.5 Frontend: build Dashboard page (`/`) — KPI cards, revenue trend line chart (Recharts), expense breakdown, property performance table, property/month/year filters
- [ ] 12.6 Frontend: KPI cards link to respective module pages (drill-down, Req 11.9)
- [ ] 12.7 Write unit tests for `DashboardService` — KPI aggregation, zero-state handling, filter scoping

---

## Phase 2 — Extended Operations

### 13. Check-in / Check-out Workflow

- [ ] 13.1 Backend: `POST /api/v1/reservations/:id/checkin` — `confirmed → checked_in`; atomic update `Reservation` + `Occupancy_Record` (status → `occupied`) + `RoomAvailabilityCalendar` + `Audit_Log`
- [ ] 13.2 Backend: `POST /api/v1/reservations/:id/checkout` — `checked_in → checked_out`; atomic update `Reservation` + `Occupancy_Record` (status → `past`) + `RoomAvailabilityCalendar` + `Audit_Log`
- [ ] 13.3 Frontend: add Check-in / Check-out action buttons on Reservation detail (status-aware visibility)
- [ ] 13.4 Write unit tests for check-in/check-out transitions and occupancy record sync

---

### 14. Swap Room

- [ ] 14.1 Backend: `POST /api/v1/reservations/:id/swap-room` — validate target room availability for full reservation date range (no overlap with active reservations); reject with conflict info if unavailable
- [ ] 14.2 Backend: atomic swap — update `Reservation.room_id`, delete/recreate `Occupancy_Record` rows for new room, update `RoomAvailabilityCalendar` for both source and target rooms, write `Audit_Log`
- [ ] 14.3 Backend: default target room must be within the same property (Req 7.4)
- [ ] 14.4 Frontend: add Swap Room action on Reservation detail — room selector (same property, available rooms only), confirmation dialog
- [ ] 14.5 Write unit tests for `ReservationsService.swapRoom` — availability check, atomic update, no residual overlap on source room

---

### 15. Auto-sync: Reservation ↔ Calendar ↔ Income

- [ ] 15.1 Backend: on `Reservation` confirm — auto-create `Income_Transaction` (type `room_income`, status `draft`) linked to the reservation if none exists
- [ ] 15.2 Backend: on `Reservation` price update (PATCH) — if a `posted` income transaction exists, auto-create `adjustment` transaction for the price delta (Req 9.5)
- [ ] 15.3 Backend: on `Reservation` cancel — auto-create `reversal` transaction if a `posted` income transaction exists (Req 6.8)
- [ ] 15.4 Backend: ensure all sync operations are inside the same `$transaction` as the triggering reservation operation
- [ ] 15.5 Write integration tests — confirm → income draft created; price change → adjustment created; cancel → reversal created

---

### 16. Maintenance / Blocked Room Status

- [ ] 16.1 Backend: `PATCH /api/v1/rooms/:id` with status `maintenance` or `blocked` — accept `blockedFrom` and `blockedTo` date range; bulk-insert `RoomAvailabilityCalendar` rows with appropriate status
- [ ] 16.2 Backend: reservation creation must check `RoomAvailabilityCalendar` for `blocked`/`maintenance` slots in addition to existing reservation overlap
- [ ] 16.3 Frontend: room status change form — date range picker shown when selecting `maintenance` or `blocked`
- [ ] 16.4 Write unit tests — blocked room rejects new reservation in the blocked range; available outside the range

---

### 17. Export Reports

- [ ] 17.1 Backend: implement `reports` module — `GET /api/v1/reports/export?type=income|expense&format=csv|excel&propertyId=&month=&year=`
- [ ] 17.2 Backend: CSV export — generate RFC 4180 CSV with columns: date, transaction_code, description, category/type, amount, status
- [ ] 17.3 Backend: Excel export — generate `.xlsx` using a server-side library (e.g., `exceljs`); same columns as CSV
- [ ] 17.4 Backend: restrict endpoint to roles `owner`, `admin`, `finance` (Req 14.5)
- [ ] 17.5 Frontend: build Reports page (`/reports`) — filter form (type, format, property, month, year), export button that triggers file download
- [ ] 17.6 Write unit tests for export service — correct columns, correct row filtering, role restriction

---

## Phase 3 — Advanced Analytics

### 18. Occupancy Performance

- [ ] 18.1 Backend: implement `occupancy-performance` module — `GET /api/v1/analytics/occupancy-performance?propertyId=&month=&year=` returning per-room occupancy rate: `(room_nights_occupied / room_nights_available) × 100`
- [ ] 18.2 Backend: return results sorted by occupancy rate descending (Req 12.2)
- [ ] 18.3 Backend: format rate to two decimal places (Req 12.5)
- [ ] 18.4 Frontend: build Occupancy Performance page (`/occupancy`) — property/month/year filters, ranked table, bar chart (Recharts)
- [ ] 18.5 Write unit tests for occupancy rate calculation — boundary values (0%, 100%), partial occupancy
- [ ] 18.6 Write PBT (fast-check): **Property 4 — Occupancy Rate Calculation Correctness** — rate always in [0, 100]; formula matches `(occupied / available) × 100` within 0.01 tolerance

---

### 19. Advanced Dashboard Analytics

- [ ] 19.1 Backend: `GET /api/v1/analytics/revenue-trend` — extend to support multi-year comparison
- [ ] 19.2 Frontend: Dashboard — add property performance ranking (highest/lowest revenue, Req 11.5)
- [ ] 19.3 Frontend: Dashboard — add expense breakdown chart (Recharts pie/bar)
- [ ] 19.4* Frontend: Dashboard — add occupancy insight sparkline per property (optional enhancement)

---

## Cross-Cutting Concerns

### 20. Timezone & Currency Utilities

- [ ] 20.1 Frontend: implement `formatToJakarta(utcDate)` utility — convert UTC `Date` to `Asia/Jakarta` string using `Intl.DateTimeFormat` or `date-fns-tz`
- [ ] 20.2 Frontend: implement `formatIDR(amount)` utility — format number as IDR currency string (e.g., `Rp 1.500.000`)
- [ ] 20.3 Backend: ensure all `timestamptz` columns store UTC; add a test asserting stored value equals input UTC value
- [ ] 20.4 Write unit tests for `formatToJakarta` and `formatIDR` — verify correct output for representative inputs and edge cases (midnight UTC, large amounts)

---

### 21. Input Validation

- [ ] 21.1 Backend: add `class-validator` DTOs for all `POST`/`PATCH` endpoints — required fields, positive number constraints, date ordering (`checkOut > checkIn`)
- [ ] 21.2 Backend: enable global `ValidationPipe` in NestJS `main.ts` with `whitelist: true, forbidNonWhitelisted: true`
- [ ] 21.3 Frontend: add Zod schemas for all forms — required fields, positive amounts, date ordering; surface per-field error messages
- [ ] 21.4 Write unit tests for DTO validation — empty required fields, negative amounts, invalid date ranges

---

### 22. Optimistic Locking

- [ ] 22.1 Backend: implement optimistic locking helper — on every `UPDATE`, include `WHERE version = :currentVersion` and increment `version`; throw `409 Conflict` if no rows updated
- [ ] 22.2 Backend: apply to all mutable entities: `User`, `Property`, `Room`, `Guest`, `Reservation`, `Income_Transaction`, `Expense_Transaction`
- [ ] 22.3 Frontend: handle 409 optimistic lock conflict — show toast "Data telah diubah oleh pengguna lain. Muat ulang untuk melanjutkan." and refresh the query
- [ ] 22.4 Write unit tests for optimistic locking — concurrent update scenario returns 409 for the slower request

---

### 23. Error Handling & API Consistency

- [ ] 23.1 Backend: implement global exception filter — map NestJS exceptions to consistent JSON error shape `{ statusCode, message, error }`
- [ ] 23.2 Backend: return `400` for validation errors, `401` for unauthenticated, `403` for unauthorized role, `404` for not found, `409` for conflicts (overlap, duplicate, optimistic lock)
- [ ] 23.3 Frontend: implement global API error handler in TanStack Query `onError` — display toast notifications for 4xx/5xx responses
- [ ] 23.4 Frontend: implement loading and empty states for all data tables and charts

---

### 24. Testing — Integration & E2E

- [ ] 24.1 Backend: write Supertest e2e tests for the full reservation lifecycle (create → confirm → checkin → checkout → completed)
- [ ] 24.2 Backend: write Supertest e2e tests for cancellation with auto-reversal
- [ ] 24.3 Backend: write Supertest e2e tests for swap room — success path and conflict path
- [ ] 24.4* Frontend: write Vitest + Testing Library integration tests for the Reservation create form — validation errors, successful submit (optional)
