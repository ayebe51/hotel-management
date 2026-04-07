"use client";
import { mockIncomeTransactions, mockProperties } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatIDR, formatDate } from "@/lib/utils";
import { Plus, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { IncomeTrendChart } from "./income-trend-chart";

const typeLabels: Record<string, { label: string; color: string }> = {
  room_income:   { label: "Pendapatan Kamar", color: "bg-blue-50 text-blue-700" },
  manual_income: { label: "Manual", color: "bg-purple-50 text-purple-700" },
  refund:        { label: "Refund", color: "bg-red-50 text-red-600" },
  adjustment:    { label: "Adjustment", color: "bg-amber-50 text-amber-700" },
  reversal:      { label: "Reversal", color: "bg-orange-50 text-orange-700" },
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }> = {
  posted:    { label: "Posted", variant: "success" },
  draft:     { label: "Draft", variant: "secondary" },
  reversed:  { label: "Reversed", variant: "warning" },
  cancelled: { label: "Dibatalkan", variant: "destructive" },
};

const totalPosted = mockIncomeTransactions.filter(t => t.status === "posted").reduce((s, t) => s + t.amount, 0);
const monthlyPosted = mockIncomeTransactions.filter(t => t.status === "posted" && t.transaction_date.startsWith("2024-04")).reduce((s, t) => s + t.amount, 0);

export function IncomeView() {
  return (
    <div className="space-y-4 lg:space-y-5">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div className="flex gap-2 flex-wrap">
          <Select className="w-36 lg:w-40 h-9 text-sm">
            <option value="">Semua Property</option>
            {mockProperties.filter(p => p.is_active).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <Select className="w-32 lg:w-36 h-9 text-sm">
            <option value="4">April 2024</option>
            <option value="3">Maret 2024</option>
          </Select>
        </div>
        <Button size="sm" className="gap-1.5 h-9 flex-shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tambah Transaksi</span>
          <span className="sm:hidden">Tambah</span>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        {[
          { label: "Total Income", value: formatIDR(totalPosted), icon: DollarSign, bg: "bg-emerald-50", color: "text-emerald-600" },
          { label: "Revenue Bulan Ini", value: formatIDR(monthlyPosted), icon: Calendar, bg: "bg-blue-50", color: "text-blue-600" },
          { label: "Transaksi Bulan Ini", value: String(mockIncomeTransactions.filter(t => t.transaction_date.startsWith("2024-04")).length), icon: TrendingUp, bg: "bg-violet-50", color: "text-violet-600" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="border-gray-100">
              <CardContent className="p-4 lg:p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 lg:w-10 lg:h-10 ${kpi.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${kpi.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 mb-0.5">{kpi.label}</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900 truncate">{kpi.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <IncomeTrendChart />

      {/* Mobile: card list */}
      <div className="lg:hidden space-y-3">
        {mockIncomeTransactions.map((t) => {
          const sc = statusConfig[t.status] ?? { label: t.status, variant: "secondary" as const };
          const tc = typeLabels[t.type] ?? { label: t.type, color: "bg-gray-100 text-gray-600" };
          return (
            <Card key={t.id} className="border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{t.description}</p>
                    <p className="font-mono text-[11px] text-gray-400 mt-0.5">{t.transaction_code}</p>
                  </div>
                  <Badge variant={sc.variant} className="text-[11px] flex-shrink-0">{sc.label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-2">
                  <div><span className="text-gray-400">Property</span><p className="font-medium text-gray-700">{t.property_name}</p></div>
                  <div><span className="text-gray-400">Tanggal</span><p className="font-medium text-gray-700">{formatDate(t.transaction_date)}</p></div>
                  <div><span className="text-gray-400">Tipe</span><p><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${tc.color}`}>{tc.label}</span></p></div>
                  <div><span className="text-gray-400">Jumlah</span><p className={`font-bold ${t.amount < 0 ? "text-red-500" : "text-gray-900"}`}>{formatIDR(t.amount)}</p></div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {t.status === "draft" && <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-gray-200">Post</Button>}
                  {t.status === "posted" && t.type !== "refund" && <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-red-400">Reverse</Button>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop: table */}
      <Card className="hidden lg:block border-gray-100 shadow-sm">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-sm font-semibold text-gray-800">Daftar Transaksi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-xs text-gray-400 font-medium pl-5">Kode</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Property</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Tanggal</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Tipe</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Deskripsi</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right">Jumlah</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Status</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right pr-5">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIncomeTransactions.map((t) => {
                const sc = statusConfig[t.status] ?? { label: t.status, variant: "secondary" as const };
                const tc = typeLabels[t.type] ?? { label: t.type, color: "bg-gray-100 text-gray-600" };
                return (
                  <TableRow key={t.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="pl-5"><span className="font-mono text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{t.transaction_code}</span></TableCell>
                    <TableCell className="text-sm text-gray-700">{t.property_name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{formatDate(t.transaction_date)}</TableCell>
                    <TableCell><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${tc.color}`}>{tc.label}</span></TableCell>
                    <TableCell className="text-sm text-gray-500 max-w-[180px] truncate">{t.description}</TableCell>
                    <TableCell className={`text-right text-sm font-semibold ${t.amount < 0 ? "text-red-500" : "text-gray-900"}`}>{formatIDR(t.amount)}</TableCell>
                    <TableCell><Badge variant={sc.variant} className="text-[11px]">{sc.label}</Badge></TableCell>
                    <TableCell className="text-right pr-5">
                      {t.status === "draft" && <Button size="sm" variant="outline" className="h-7 px-2 text-xs border-gray-200">Post</Button>}
                      {t.status === "posted" && t.type !== "refund" && <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400">Reverse</Button>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
