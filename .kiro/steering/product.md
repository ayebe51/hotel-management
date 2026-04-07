# Product Overview

Hotel Dashboard adalah sistem manajemen operasional hotel internal berbasis web untuk owner dan admin. Sistem ini BUKAN website pemesanan publik.

## Purpose
Manajemen terpusat operasional hotel meliputi reservasi, hunian kamar, pendapatan, dan pengeluaran di seluruh properti.

## Target Users
- **Owner**: Akses penuh, mengelola pengguna/peran, melihat semua laporan
- **Admin**: Operasional harian (reservasi, tamu, transaksi)
- **Staff Operasional**: Akses baca/tulis terbatas — update status kamar, lihat kalender dan reservasi
- **Finance/Accounting**: Lihat dan input transaksi keuangan, ekspor laporan
- **Auditor**: Akses baca saja

## Core Modules
- Authentication & session management
- Role-Based Access Control (RBAC)
- Property & Room management
- Guest management
- Reservation lifecycle (draft → confirmed → checked_in → checked_out / cancelled / no_show)
- Room swap within reservations
- Occupancy calendar (visual grid)
- Income & expense transaction management
- Operational dashboard with KPIs
- Occupancy performance reports
- Export laporan dasar (CSV/Excel)
- Audit log

## Key Business Rules
- All timestamps stored in UTC, displayed in Asia/Jakarta (WIB, UTC+7)
- Currency: IDR (Indonesian Rupiah)
- Check-in date is inclusive, check-out date is exclusive
- Booking price is per stay (bukan per malam) — default assumption
- Reservation, Occupancy_Record, and Income_Transaction changes must be atomic
- Optimistic locking required for concurrent edits
- Field `source` pada Reservation (internal/manual/future_public) disiapkan untuk Phase 4

## Phase 4 Readiness
- Data model menyertakan field `source` pada Reservation untuk membedakan asal pemesanan (internal/manual/future_public)
- API diverifikasi di /api/v1/ untuk memungkinkan ekspansi ke /api/v2/ atau layanan terpisah di masa depan
- Prisma schema dirancang extensible untuk public booking engine (field rate_plan, payment, channel dicadangkan)
