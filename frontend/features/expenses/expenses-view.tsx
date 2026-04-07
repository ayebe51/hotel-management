"use client";
import { mockExpenseTransactions, mockProperties } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatIDR, formatDate } from "@/lib/utils";
import { Plus, Wrench, Settings } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const categoryConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  maintenance_expenses: { label: "Maintenance", color: "text-amber-700", bg: "bg-amber-50", icon: Wrench },
  operational_expenses: { label: "Operasional", color: "text-blue-700", bg: "bg-blue-50", icon: Settings },
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }> = {
  posted:    { label: "Posted", variant: "success" },
  draft:     { label: "Draft", variant: "secondary" },
  cancelled: { label: "Dibatalkan", variant: "destructive" },
};

const totalMaintenance = mockExpenseTransactions.filter(t => t.status === "posted" && t.category === "maintenance_expenses").reduce((s, t) => s + t.amount, 0);
const totalOperational = mockExpenseTransactions.filter(t => t.status === "posted" && t.category === "operational_expenses").reduce((s, t) => s + t.amount, 0);

const chartData = [
  { property: "Lily", maintenance: 1500000, operational: 800000 },
  { property: "Tulip", maintenance: 0, operational: 1050000 },
  { property: "Melati", maintenance: 2000000, operational: 0 },
];

export function ExpensesView() {
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
          <Select className="w-36 lg:w-40 h-9 text-sm">
            <option value="">Semua Kategori</option>
            <option value="maintenance_expenses">Maintenance</option>
            <option value="operational_expenses">Operasional</option>
          </Select>
        </div>
        <Button size="sm" className="gap-1.5 h-9 flex-shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tambah Expense</span>
          <span className="sm:hidden">Tambah</span>
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        {[
          { label: "Maintenance", value: totalMaintenance, cat: "maintenance_expenses" },
          { label: "Operasional", value: totalOperational, cat: "operational_expenses" },
        ].map((item) => {
          const cfg = categoryConfig[item.cat];
          const Icon = cfg.icon;
          return (
            <Card key={item.label} className="border-gray-100">
              <CardContent className="p-4 lg:p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 lg:w-10 lg:h-10 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${cfg.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900 truncate">{formatIDR(item.value)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <Card className="border-gray-100">
          <CardContent className="p-4">
            <p className="text-xs text-gray-400 mb-2 font-medium">Per Property</p>
            <ResponsiveContainer width="100%" height={72}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="property" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatIDR(v)} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="maintenance" stackId="a" fill="#fbbf24" name="Maintenance" />
                <Bar dataKey="operational" stackId="a" fill="#3b82f6" radius={[4,4,0,0]} name="Operasional" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: card list */}
      <div className="lg:hidden space-y-3">
        {mockExpenseTransactions.map((t) => {
          const sc = statusConfig[t.status] ?? { label: t.status, variant: "secondary" as const };
          const cc = categoryConfig[t.category];
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
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div><span className="text-gray-400">Property</span><p className="font-medium text-gray-700">{t.property_name}</p></div>
                  <div><span className="text-gray-400">Tanggal</span><p className="font-medium text-gray-700">{formatDate(t.expense_date)}</p></div>
                  <div><span className="text-gray-400">Kategori</span><p><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${cc.bg} ${cc.color}`}>{cc.label}</span></p></div>
                  <div><span className="text-gray-400">Jumlah</span><p className="font-bold text-red-500">{formatIDR(t.amount)}</p></div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-gray-500">Edit</Button>
                  {t.status !== "cancelled" && <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-red-400">Hapus</Button>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop: table */}
      <Card className="hidden lg:block border-gray-100 shadow-sm">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-sm font-semibold text-gray-800">Daftar Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-xs text-gray-400 font-medium pl-5">Kode</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Property</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Tanggal</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Kategori</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Deskripsi</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right">Jumlah</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Status</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right pr-5">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExpenseTransactions.map((t) => {
                const sc = statusConfig[t.status] ?? { label: t.status, variant: "secondary" as const };
                const cc = categoryConfig[t.category];
                return (
                  <TableRow key={t.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="pl-5"><span className="font-mono text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{t.transaction_code}</span></TableCell>
                    <TableCell className="text-sm text-gray-700">{t.property_name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{formatDate(t.expense_date)}</TableCell>
                    <TableCell><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${cc.bg} ${cc.color}`}>{cc.label}</span></TableCell>
                    <TableCell className="text-sm text-gray-500 max-w-[180px] truncate">{t.description}</TableCell>
                    <TableCell className="text-right text-sm font-semibold text-red-500">{formatIDR(t.amount)}</TableCell>
                    <TableCell><Badge variant={sc.variant} className="text-[11px]">{sc.label}</Badge></TableCell>
                    <TableCell className="text-right pr-5">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-gray-500">Edit</Button>
                        {t.status !== "cancelled" && <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400">Hapus</Button>}
                      </div>
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
