// Mock data for Hotel Dashboard mockup

export const mockProperties = [
  { id: "1", name: "Lily", code: "LLY", address: "Jl. Mawar No. 1, Jakarta", is_active: true },
  { id: "2", name: "Tulip", code: "TLP", address: "Jl. Anggrek No. 5, Bandung", is_active: true },
  { id: "3", name: "Melati", code: "MLT", address: "Jl. Kenanga No. 12, Yogyakarta", is_active: true },
  { id: "4", name: "Anggrek", code: "AGR", address: "Jl. Dahlia No. 8, Surabaya", is_active: false },
];

export const mockRooms = [
  { id: "r1", property_id: "1", room_number: "101", room_name: "Deluxe A", type: "Deluxe", status: "active", capacity: 2 },
  { id: "r2", property_id: "1", room_number: "102", room_name: "Deluxe B", type: "Deluxe", status: "active", capacity: 2 },
  { id: "r3", property_id: "1", room_number: "201", room_name: "Suite A", type: "Suite", status: "maintenance", capacity: 3 },
  { id: "r4", property_id: "1", room_number: "202", room_name: "Suite B", type: "Suite", status: "active", capacity: 3 },
  { id: "r5", property_id: "2", room_number: "101", room_name: "Standard A", type: "Standard", status: "active", capacity: 2 },
  { id: "r6", property_id: "2", room_number: "102", room_name: "Standard B", type: "Standard", status: "blocked", capacity: 2 },
  { id: "r7", property_id: "2", room_number: "201", room_name: "Deluxe A", type: "Deluxe", status: "active", capacity: 2 },
  { id: "r8", property_id: "3", room_number: "101", room_name: "Standard A", type: "Standard", status: "active", capacity: 2 },
  { id: "r9", property_id: "3", room_number: "102", room_name: "Standard B", type: "Standard", status: "active", capacity: 2 },
];

export const mockGuests = [
  { id: "g1", full_name: "Budi Santoso", phone_number: "081234567890", email: "budi@email.com", id_document: "3201234567890001" },
  { id: "g2", full_name: "Siti Rahayu", phone_number: "082345678901", email: "siti@email.com", id_document: "3201234567890002" },
  { id: "g3", full_name: "Ahmad Fauzi", phone_number: "083456789012", email: "ahmad@email.com", id_document: "3201234567890003" },
  { id: "g4", full_name: "Dewi Lestari", phone_number: "084567890123", email: "dewi@email.com", id_document: "3201234567890004" },
  { id: "g5", full_name: "Rudi Hermawan", phone_number: "085678901234", email: "rudi@email.com", id_document: "3201234567890005" },
  { id: "g6", full_name: "Rina Wulandari", phone_number: "086789012345", email: "rina@email.com", id_document: "3201234567890006" },
];

export const mockReservations = [
  {
    id: "res1", reservation_code: "RES-2024-001", guest_id: "g1", guest_name: "Budi Santoso",
    room_id: "r1", room_number: "101", property_id: "1", property_name: "Lily",
    check_in_date: "2024-04-01", check_out_date: "2024-04-05",
    booking_price: 2500000, status: "checked_in", source: "internal",
  },
  {
    id: "res2", reservation_code: "RES-2024-002", guest_id: "g2", guest_name: "Siti Rahayu",
    room_id: "r4", room_number: "202", property_id: "1", property_name: "Lily",
    check_in_date: "2024-04-03", check_out_date: "2024-04-07",
    booking_price: 3200000, status: "confirmed", source: "internal",
  },
  {
    id: "res3", reservation_code: "RES-2024-003", guest_id: "g3", guest_name: "Ahmad Fauzi",
    room_id: "r5", room_number: "101", property_id: "2", property_name: "Tulip",
    check_in_date: "2024-04-10", check_out_date: "2024-04-14",
    booking_price: 1800000, status: "confirmed", source: "internal",
  },
  {
    id: "res4", reservation_code: "RES-2024-004", guest_id: "g4", guest_name: "Dewi Lestari",
    room_id: "r2", room_number: "102", property_id: "1", property_name: "Lily",
    check_in_date: "2024-03-20", check_out_date: "2024-03-25",
    booking_price: 2500000, status: "checked_out", source: "internal",
  },
  {
    id: "res5", reservation_code: "RES-2024-005", guest_id: "g5", guest_name: "Rudi Hermawan",
    room_id: "r7", room_number: "201", property_id: "2", property_name: "Tulip",
    check_in_date: "2024-03-15", check_out_date: "2024-03-18",
    booking_price: 2100000, status: "checked_out", source: "internal",
  },
  {
    id: "res6", reservation_code: "RES-2024-006", guest_id: "g6", guest_name: "Rina Wulandari",
    room_id: "r8", room_number: "101", property_id: "3", property_name: "Melati",
    check_in_date: "2024-04-15", check_out_date: "2024-04-18",
    booking_price: 1500000, status: "draft", source: "internal",
  },
  {
    id: "res7", reservation_code: "RES-2024-007", guest_id: "g1", guest_name: "Budi Santoso",
    room_id: "r9", room_number: "102", property_id: "3", property_name: "Melati",
    check_in_date: "2024-03-10", check_out_date: "2024-03-12",
    booking_price: 900000, status: "cancelled", source: "internal",
  },
];

export const mockIncomeTransactions = [
  { id: "inc1", transaction_code: "INC-2024-001", property_id: "1", property_name: "Lily", reservation_id: "res4", type: "room_income", status: "posted", amount: 2500000, transaction_date: "2024-03-25", description: "Pembayaran kamar 102 - Dewi Lestari" },
  { id: "inc2", transaction_code: "INC-2024-002", property_id: "2", property_name: "Tulip", reservation_id: "res5", type: "room_income", status: "posted", amount: 2100000, transaction_date: "2024-03-18", description: "Pembayaran kamar 201 - Rudi Hermawan" },
  { id: "inc3", transaction_code: "INC-2024-003", property_id: "1", property_name: "Lily", reservation_id: "res1", type: "room_income", status: "draft", amount: 2500000, transaction_date: "2024-04-01", description: "Pembayaran kamar 101 - Budi Santoso" },
  { id: "inc4", transaction_code: "INC-2024-004", property_id: "1", property_name: "Lily", reservation_id: null, type: "manual_income", status: "posted", amount: 500000, transaction_date: "2024-03-28", description: "Pendapatan laundry" },
  { id: "inc5", transaction_code: "INC-2024-005", property_id: "3", property_name: "Melati", reservation_id: "res7", type: "refund", status: "posted", amount: -900000, transaction_date: "2024-03-10", description: "Refund pembatalan - Budi Santoso" },
  { id: "inc6", transaction_code: "INC-2024-006", property_id: "2", property_name: "Tulip", reservation_id: null, type: "manual_income", status: "posted", amount: 750000, transaction_date: "2024-04-02", description: "Pendapatan parkir" },
];

export const mockExpenseTransactions = [
  { id: "exp1", transaction_code: "EXP-2024-001", property_id: "1", property_name: "Lily", category: "maintenance_expenses", amount: 1500000, expense_date: "2024-03-20", description: "Perbaikan AC kamar 201", status: "posted" },
  { id: "exp2", transaction_code: "EXP-2024-002", property_id: "1", property_name: "Lily", category: "operational_expenses", amount: 800000, expense_date: "2024-03-25", description: "Pembelian perlengkapan kamar mandi", status: "posted" },
  { id: "exp3", transaction_code: "EXP-2024-003", property_id: "2", property_name: "Tulip", category: "operational_expenses", amount: 600000, expense_date: "2024-03-28", description: "Biaya listrik bulan Maret", status: "posted" },
  { id: "exp4", transaction_code: "EXP-2024-004", property_id: "3", property_name: "Melati", category: "maintenance_expenses", amount: 2000000, expense_date: "2024-04-01", description: "Renovasi kamar mandi", status: "draft" },
  { id: "exp5", transaction_code: "EXP-2024-005", property_id: "2", property_name: "Tulip", category: "operational_expenses", amount: 450000, expense_date: "2024-04-03", description: "Pembelian sabun dan shampo", status: "posted" },
];

export const mockRevenueMonthly = [
  { month: "Jan", lily: 8500000, tulip: 6200000, melati: 4100000 },
  { month: "Feb", lily: 9200000, tulip: 7100000, melati: 3800000 },
  { month: "Mar", lily: 11500000, tulip: 8400000, melati: 5200000 },
  { month: "Apr", lily: 7800000, tulip: 5900000, melati: 3600000 },
  { month: "Mei", lily: 10200000, tulip: 7600000, melati: 4900000 },
  { month: "Jun", lily: 12100000, tulip: 9200000, melati: 6100000 },
];

export const mockOccupancyData = [
  { room: "Lily 101", rate: 87.5, occupied: 21, available: 24 },
  { room: "Lily 202", rate: 75.0, occupied: 18, available: 24 },
  { room: "Tulip 201", rate: 70.8, occupied: 17, available: 24 },
  { room: "Lily 102", rate: 66.7, occupied: 16, available: 24 },
  { room: "Melati 101", rate: 62.5, occupied: 15, available: 24 },
  { room: "Tulip 101", rate: 58.3, occupied: 14, available: 24 },
  { room: "Melati 102", rate: 50.0, occupied: 12, available: 24 },
  { room: "Tulip 102", rate: 0, occupied: 0, available: 0 },
];

export const mockAuditLogs = [
  { id: "al1", actor: "Admin Budi", entity_type: "Reservation", entity_id: "res1", action: "CHECK_IN", created_at: "2024-04-01T08:30:00Z", reason: "Tamu check-in tepat waktu" },
  { id: "al2", actor: "Admin Siti", entity_type: "Reservation", entity_id: "res7", action: "CANCEL", created_at: "2024-03-10T14:15:00Z", reason: "Tamu membatalkan karena urusan mendadak" },
  { id: "al3", actor: "Owner", entity_type: "Property", entity_id: "4", action: "DEACTIVATE", created_at: "2024-03-05T10:00:00Z", reason: "Renovasi besar-besaran" },
  { id: "al4", actor: "Admin Budi", entity_type: "Room", entity_id: "r3", action: "STATUS_CHANGE", created_at: "2024-03-18T09:00:00Z", reason: "AC rusak, perlu perbaikan" },
  { id: "al5", actor: "Admin Siti", entity_type: "Income_Transaction", entity_id: "inc5", action: "REVERSE", created_at: "2024-03-10T14:20:00Z", reason: "Refund pembatalan reservasi" },
  { id: "al6", actor: "Owner", entity_type: "User", entity_id: "u3", action: "CREATE", created_at: "2024-03-01T08:00:00Z", reason: "Penambahan admin baru" },
];

export const mockUsers = [
  { id: "u1", name: "Pak Hendra", email: "hendra@lily.com", role: "owner", is_active: true, last_login_at: "2024-04-06T07:00:00Z" },
  { id: "u2", name: "Admin Budi", email: "budi@lily.com", role: "admin", is_active: true, last_login_at: "2024-04-06T08:30:00Z" },
  { id: "u3", name: "Admin Siti", email: "siti@lily.com", role: "admin", is_active: true, last_login_at: "2024-04-05T17:00:00Z" },
  { id: "u4", name: "Rini Finance", email: "rini@lily.com", role: "finance", is_active: true, last_login_at: "2024-04-04T09:00:00Z" },
  { id: "u5", name: "Joko Staff", email: "joko@lily.com", role: "staff_operasional", is_active: true, last_login_at: "2024-04-06T06:00:00Z" },
];

// Calendar mock: room × date status for April 2024
export const mockCalendarData: Record<string, Record<string, string>> = {
  "r1": { "1": "occupied", "2": "occupied", "3": "occupied", "4": "occupied", "5": "available", "6": "available", "7": "available", "8": "booked", "9": "booked", "10": "booked" },
  "r2": { "1": "available", "2": "available", "3": "booked", "4": "booked", "5": "booked", "6": "booked", "7": "available", "8": "available", "9": "available", "10": "available" },
  "r3": { "1": "maintenance", "2": "maintenance", "3": "maintenance", "4": "maintenance", "5": "maintenance", "6": "maintenance", "7": "maintenance", "8": "maintenance", "9": "maintenance", "10": "maintenance" },
  "r4": { "1": "available", "2": "available", "3": "booked", "4": "booked", "5": "booked", "6": "booked", "7": "booked", "8": "available", "9": "available", "10": "available" },
};
