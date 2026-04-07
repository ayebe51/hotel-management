import { Topbar } from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatIDR } from "@/lib/utils";
import { mockReservations, mockProperties } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, DollarSign, BarChart2, CalendarCheck } from "lucide-react";
import { RevenueChart } from "@/features/dashboard/revenue-chart";
import { PropertyPerformanceTable } from "@/features/dashboard/property-performance-table";
import { ExpenseBreakdownChart } from "@/features/dashboard/expense-breakdown-chart";
import Link from "next/link";

const kpis = [
  { label: "Total Income", value: formatIDR(52850000), change: "+12.5%", trend: "up", icon: DollarSign, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", href: "/income" },
  { label: "Revenue Bulan Ini", value: formatIDR(18700000), change: "+8.3%", trend: "up", icon: TrendingUp, iconBg: "bg-blue-50", iconColor: "text-blue-600", href: "/income" },
  { label: "Booking Aktif", value: "12", change: "+3", trend: "up", icon: CalendarCheck, iconBg: "bg-violet-50", iconColor: "text-violet-600", href: "/reservations" },
  { label: "Occupancy Rate", value: "68.4%", change: "-2.1%", trend: "down", icon: BarChart2, iconBg: "bg-orange-50", iconColor: "text-orange-500", href: "/occupancy" },
];

const revenueData = [
  { month: "Jan", lily: 8500000, tulip: 6200000, melati: 4100000 },
  { month: "Feb", lily: 9200000, tulip: 7100000, melati: 3800000 },
  { month: "Mar", lily: 11500000, tulip: 8400000, melati: 5200000 },
  { month: "Apr", lily: 7800000, tulip: 5900000, melati: 3600000 },
  { month: "Mei", lily: 10200000, tulip: 7600000, melati: 4900000 },
  { month: "Jun", lily: 12100000, tulip: 9200000, melati: 6100000 },
];

export default function DashboardPage() {
  const currentGuests = mockReservations.filter((r) => r.status === "checked_in");
  const futureReservations = mockReservations.filter((r) => r.status === "confirmed");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Topbar title="Dashboard" subtitle="Ringkasan operasional & finansial" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-5">

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select className="w-36 lg:w-40 h-8 text-sm">
            <option value="">Semua Property</option>
            {mockProperties.filter(p => p.is_active).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <Select className="w-28 lg:w-32 h-8 text-sm">
            <option value="4">April</option>
            <option value="3">Maret</option>
          </Select>
          <Select className="w-20 lg:w-24 h-8 text-sm">
            <option value="2024">2024</option>
          </Select>
        </div>

        {/* KPI Cards — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Link key={kpi.label} href={kpi.href}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer border-gray-100 h-full">
                  <CardContent className="p-4 lg:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-xl ${kpi.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
                      </div>
                      <div className={`flex items-center gap-0.5 text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                        {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span className="hidden sm:inline">{kpi.change}</span>
                      </div>
                    </div>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 leading-tight">{kpi.value}</p>
                    <p className="text-[11px] lg:text-xs text-gray-500 leading-tight">{kpi.label}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Charts row — stacked mobile, 3-col desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
          <Card className="border-gray-100">
            <CardHeader className="pb-2 pt-4 px-4 lg:pt-5 lg:px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-800">Tamu & Reservasi</CardTitle>
                <Link href="/reservations" className="text-xs text-blue-600 hover:underline">Lihat semua</Link>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 lg:px-5 lg:pb-5 space-y-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Sedang Menginap</p>
              {currentGuests.map((r) => (
                <div key={r.id} className="flex items-start justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{r.guest_name}</p>
                    <p className="text-xs text-gray-500 truncate">{r.property_name} · Kamar {r.room_number}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">s/d {r.check_out_date}</p>
                  </div>
                  <Badge variant="success" className="text-[10px] flex-shrink-0">Check-in</Badge>
                </div>
              ))}
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide pt-1">Mendatang</p>
              {futureReservations.map((r) => (
                <div key={r.id} className="flex items-start justify-between p-3 bg-blue-50 rounded-xl border border-blue-100 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{r.guest_name}</p>
                    <p className="text-xs text-gray-500 truncate">{r.property_name} · Kamar {r.room_number}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Check-in: {r.check_in_date}</p>
                  </div>
                  <Badge variant="default" className="text-[10px] flex-shrink-0">Confirmed</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          <div className="lg:col-span-2">
            <PropertyPerformanceTable />
          </div>
          <ExpenseBreakdownChart />
        </div>

      </div>
    </div>
  );
}
