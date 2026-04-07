"use client";
import { useState } from "react";
import { mockRooms, mockProperties } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Plus, Edit, BedDouble } from "lucide-react";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }> = {
  active:      { label: "Aktif", variant: "success" },
  maintenance: { label: "Maintenance", variant: "warning" },
  blocked:     { label: "Diblokir", variant: "destructive" },
  inactive:    { label: "Nonaktif", variant: "secondary" },
};

const typeColors: Record<string, string> = {
  Deluxe:   "bg-blue-50 text-blue-700",
  Suite:    "bg-violet-50 text-violet-700",
  Standard: "bg-gray-100 text-gray-600",
};

export function RoomsView() {
  const [selectedProperty, setSelectedProperty] = useState("");

  const filtered = selectedProperty
    ? mockRooms.filter(r => r.property_id === selectedProperty)
    : mockRooms;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Select
          className="w-36 lg:w-40 h-9 text-sm"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          placeholder="Semua Property"
        >
          {mockProperties.filter(p => p.is_active).map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </Select>
        <Button size="sm" className="gap-1.5 h-9 flex-shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tambah Kamar</span>
          <span className="sm:hidden">Tambah</span>
        </Button>
      </div>

      {/* Mobile: card grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((room) => {
          const property = mockProperties.find(p => p.id === room.property_id);
          const sc = statusConfig[room.status] ?? { label: room.status, variant: "secondary" as const };
          return (
            <Card key={room.id} className="border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BedDouble className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{room.room_number}</p>
                      <p className="text-xs text-gray-400">{room.room_name}</p>
                    </div>
                  </div>
                  <Badge variant={sc.variant} className="text-[11px]">{sc.label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div><span className="text-gray-400">Property</span><p className="font-medium text-gray-700">{property?.name}</p></div>
                  <div><span className="text-gray-400">Tipe</span><p><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${typeColors[room.type] ?? "bg-gray-100 text-gray-600"}`}>{room.type}</span></p></div>
                  <div><span className="text-gray-400">Kapasitas</span><p className="font-medium text-gray-700">{room.capacity} orang</p></div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs gap-1 text-gray-500"><Edit className="w-3 h-3" /> Edit</Button>
                  <Select className="flex-1 h-8 text-xs border-gray-200">
                    <option value="">Ubah Status</option>
                    <option value="active">Aktif</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="blocked">Blokir</option>
                    <option value="inactive">Nonaktif</option>
                  </Select>
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
                <TableHead className="text-xs text-gray-400 font-medium pl-5">No. Kamar</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Nama</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Property</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Tipe</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Kapasitas</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Status</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right pr-5">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((room) => {
                const property = mockProperties.find(p => p.id === room.property_id);
                const sc = statusConfig[room.status] ?? { label: room.status, variant: "secondary" as const };
                return (
                  <TableRow key={room.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <BedDouble className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-semibold text-gray-800">{room.room_number}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{room.room_name}</TableCell>
                    <TableCell className="text-sm text-gray-500">{property?.name}</TableCell>
                    <TableCell><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${typeColors[room.type] ?? "bg-gray-100 text-gray-600"}`}>{room.type}</span></TableCell>
                    <TableCell className="text-sm text-gray-500">{room.capacity} orang</TableCell>
                    <TableCell><Badge variant={sc.variant} className="text-[11px]">{sc.label}</Badge></TableCell>
                    <TableCell className="text-right pr-5">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1 text-gray-500"><Edit className="w-3 h-3" /> Edit</Button>
                        <Select className="h-7 text-xs w-32 border-gray-200">
                          <option value="">Ubah Status</option>
                          <option value="active">Aktif</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="blocked">Blokir</option>
                          <option value="inactive">Nonaktif</option>
                        </Select>
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
