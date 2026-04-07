"use client";
import { useState } from "react";
import { mockReservations } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatIDR, formatDate } from "@/lib/utils";
import { Plus, Search, ArrowLeftRight, X, LogIn, LogOut, CalendarCheck, Clock, History } from "lucide-react";
import { Input } from "@/components/ui/input";

type Tab = "current" | "future" | "past" | "all";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }> = {
  checked_in: { label: "Check-in", variant: "success" },
  confirmed:  { label: "Confirmed", variant: "default" },
  draft:      { label: "Draft", variant: "secondary" },
  checked_out:{ label: "Selesai", variant: "outline" },
  cancelled:  { label: "Dibatalkan", variant: "destructive" },
  no_show:    { label: "No-show", variant: "warning" },
};

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "current", label: "Saat Ini", icon: CalendarCheck },
  { key: "future",  label: "Mendatang", icon: Clock },
  { key: "past",    label: "Riwayat", icon: History },
  { key: "all",     label: "Semua", icon: Search },
];

export function ReservationsView() {
  const [activeTab, setActiveTab] = useState<Tab>("current");
  const [search, setSearch] = useState("");

  const counts = {
    current: mockReservations.filter(r => r.status === "checked_in").length,
    future:  mockReservations.filter(r => r.status === "confirmed" || r.status === "draft").length,
    past:    mockReservations.filter(r => ["checked_out","cancelled","no_show"].includes(r.status)).length,
    all:     mockReservations.length,
  };

  const filtered = mockReservations.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = r.guest_name.toLowerCase().includes(q) || r.reservation_code.toLowerCase().includes(q);
    if (activeTab === "current") return r.status === "checked_in" && matchSearch;
    if (activeTab === "future")  return (r.status === "confirmed" || r.status === "draft") && matchSearch;
    if (activeTab === "past")    return ["checked_out","cancelled","no_show"].includes(r.status) && matchSearch;
    return matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
          <Input
            placeholder="Cari tamu..."
            className="pl-9 h-9 text-sm bg-white w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button size="sm" className="gap-1.5 h-9 flex-shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tambah Reservasi</span>
          <span className="sm:hidden">Tambah</span>
        </Button>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex gap-1 bg-white border border-gray-100 p-1 rounded-xl w-fit shadow-sm min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 lg:px-4 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-semibold ${
                  activeTab === tab.key ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="lg:hidden space-y-3">
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-10 text-sm">Tidak ada data reservasi</div>
        )}
        {filtered.map((r) => {
          const sc = statusConfig[r.status] ?? { label: r.status, variant: "secondary" as const };
          return (
            <Card key={r.id} className="border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{r.guest_name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{r.reservation_code}</p>
                  </div>
                  <Badge variant={sc.variant} className="text-[11px]">{sc.label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                  <div><span className="text-gray-400">Property</span><p className="font-medium text-gray-700">{r.property_name} · Kamar {r.room_number}</p></div>
                  <div><span className="text-gray-400">Harga</span><p className="font-semibold text-gray-900">{formatIDR(r.booking_price)}</p></div>
                  <div><span className="text-gray-400">Check-in</span><p className="font-medium text-gray-700">{formatDate(r.check_in_date)}</p></div>
                  <div><span className="text-gray-400">Check-out</span><p className="font-medium text-gray-700">{formatDate(r.check_out_date)}</p></div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {r.status === "confirmed" && <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1 border-gray-200"><LogIn className="w-3 h-3" /> Check-in</Button>}
                  {r.status === "checked_in" && <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1 border-gray-200"><LogOut className="w-3 h-3" /> Check-out</Button>}
                  {(r.status === "confirmed" || r.status === "checked_in") && <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs gap-1 text-gray-500"><ArrowLeftRight className="w-3 h-3" /> Pindah</Button>}
                  {(r.status === "confirmed" || r.status === "draft") && <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-red-400 gap-1"><X className="w-3 h-3" /> Batal</Button>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop: table */}
      <Card className="hidden lg:block border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-xs text-gray-400 font-medium pl-5">Kode</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Tamu</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Property / Kamar</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Check-in</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Check-out</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right">Harga</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Status</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right pr-5">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-gray-400 py-12 text-sm">Tidak ada data reservasi</TableCell></TableRow>
              )}
              {filtered.map((r) => {
                const sc = statusConfig[r.status] ?? { label: r.status, variant: "secondary" as const };
                return (
                  <TableRow key={r.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="pl-5"><span className="font-mono text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{r.reservation_code}</span></TableCell>
                    <TableCell><p className="text-sm font-medium text-gray-900">{r.guest_name}</p></TableCell>
                    <TableCell><p className="text-sm text-gray-700">{r.property_name}</p><p className="text-xs text-gray-400">Kamar {r.room_number}</p></TableCell>
                    <TableCell className="text-sm text-gray-600">{formatDate(r.check_in_date)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{formatDate(r.check_out_date)}</TableCell>
                    <TableCell className="text-right text-sm font-semibold text-gray-800">{formatIDR(r.booking_price)}</TableCell>
                    <TableCell><Badge variant={sc.variant} className="text-[11px]">{sc.label}</Badge></TableCell>
                    <TableCell className="text-right pr-5">
                      <div className="flex items-center justify-end gap-1">
                        {r.status === "confirmed" && <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-gray-200"><LogIn className="w-3 h-3" /> Check-in</Button>}
                        {r.status === "checked_in" && <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-gray-200"><LogOut className="w-3 h-3" /> Check-out</Button>}
                        {(r.status === "confirmed" || r.status === "checked_in") && <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1 text-gray-500"><ArrowLeftRight className="w-3 h-3" /> Pindah</Button>}
                        {(r.status === "confirmed" || r.status === "draft") && <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400 gap-1"><X className="w-3 h-3" /> Batal</Button>}
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
