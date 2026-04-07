"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { mockRooms, mockProperties } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<string, { cell: string; dot: string; label: string }> = {
  available:   { cell: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer", dot: "bg-emerald-400", label: "Tersedia" },
  booked:      { cell: "bg-blue-100 text-blue-800", dot: "bg-blue-500", label: "Dipesan" },
  occupied:    { cell: "bg-orange-100 text-orange-800", dot: "bg-orange-500", label: "Terisi" },
  maintenance: { cell: "bg-gray-100 text-gray-500", dot: "bg-gray-400", label: "Maintenance" },
  blocked:     { cell: "bg-red-50 text-red-600", dot: "bg-red-400", label: "Diblokir" },
  checked_out: { cell: "bg-slate-50 text-slate-400", dot: "bg-slate-300", label: "Selesai" },
};

const calendarData: Record<string, Record<number, string>> = {
  r1: { 1:"occupied",2:"occupied",3:"occupied",4:"occupied",5:"available",6:"available",7:"available",8:"booked",9:"booked",10:"booked",11:"booked",12:"available",13:"available",14:"available",15:"booked",16:"booked",17:"booked",18:"available",19:"available",20:"available",21:"available",22:"available",23:"available",24:"available",25:"available",26:"available",27:"available",28:"available",29:"available",30:"available" },
  r2: { 1:"available",2:"available",3:"booked",4:"booked",5:"booked",6:"booked",7:"available",8:"available",9:"available",10:"available",11:"available",12:"booked",13:"booked",14:"booked",15:"available",16:"available",17:"available",18:"available",19:"available",20:"available",21:"available",22:"available",23:"available",24:"available",25:"available",26:"available",27:"available",28:"available",29:"available",30:"available" },
  r3: { 1:"maintenance",2:"maintenance",3:"maintenance",4:"maintenance",5:"maintenance",6:"maintenance",7:"maintenance",8:"maintenance",9:"maintenance",10:"maintenance",11:"maintenance",12:"maintenance",13:"maintenance",14:"maintenance",15:"available",16:"available",17:"available",18:"available",19:"available",20:"available",21:"available",22:"available",23:"available",24:"available",25:"available",26:"available",27:"available",28:"available",29:"available",30:"available" },
  r4: { 1:"available",2:"available",3:"booked",4:"booked",5:"booked",6:"booked",7:"booked",8:"available",9:"available",10:"available",11:"available",12:"available",13:"available",14:"available",15:"available",16:"available",17:"available",18:"available",19:"available",20:"available",21:"available",22:"available",23:"available",24:"available",25:"available",26:"available",27:"available",28:"available",29:"available",30:"available" },
};

const dayNames = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

export function CalendarView() {
  const [selectedProperty, setSelectedProperty] = useState("1");
  // Mobile shows 7 days, desktop shows 30
  const [mobileStart] = useState(1);

  const propertyRooms = mockRooms.filter((r) => r.property_id === selectedProperty);
  const allDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const mobileDays = allDays.slice(mobileStart - 1, mobileStart + 6);

  const CalendarGrid = ({ days }: { days: number[] }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-3 py-3 font-semibold text-gray-600 w-24 sticky left-0 bg-gray-50 z-10 border-r border-gray-100 text-xs">
              Kamar
            </th>
            {days.map((d) => {
              const dow = new Date(2024, 3, d).getDay();
              const isWeekend = dow === 0 || dow === 6;
              return (
                <th key={d} className={cn("px-0.5 py-2 font-medium text-center min-w-[34px]", isWeekend ? "text-blue-500" : "text-gray-500")}>
                  <div className="text-[9px] text-gray-400">{dayNames[dow]}</div>
                  <div className={cn("text-xs font-semibold", isWeekend ? "text-blue-600" : "text-gray-700")}>{d}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {propertyRooms.map((room, ri) => (
            <tr key={room.id} className={cn("border-b border-gray-50", ri % 2 === 0 ? "bg-white" : "bg-gray-50/30")}>
              <td className={cn("px-3 py-2 sticky left-0 z-10 border-r border-gray-100", ri % 2 === 0 ? "bg-white" : "bg-gray-50/30")}>
                <div className="font-semibold text-gray-800 text-xs">{room.room_number}</div>
                <div className="text-[10px] text-gray-400 truncate max-w-[60px]">{room.room_name}</div>
              </td>
              {days.map((d) => {
                const status = calendarData[room.id]?.[d] ?? "available";
                const style = STATUS_STYLE[status] ?? STATUS_STYLE.available;
                return (
                  <td key={d} className="px-0.5 py-1.5 text-center">
                    <div
                      className={cn("rounded-md mx-0.5 py-1.5 text-[10px] font-medium transition-colors", style.cell)}
                      title={`${room.room_number} - ${d} Apr: ${style.label}`}
                    >
                      {status === "available" ? "·" : status === "maintenance" ? "M" : status === "blocked" ? "B" : status === "occupied" ? "●" : status === "booked" ? "◆" : "✓"}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Select
            className="w-36 lg:w-40 h-9 text-sm"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            {mockProperties.filter(p => p.is_active).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1.5 shadow-sm">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-700">
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <span className="text-sm font-semibold text-gray-800 px-1">April 2024</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-700">
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Legend — hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap">
            {Object.entries(STATUS_STYLE).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${val.dot}`} />
                <span className="text-[11px] text-gray-500">{val.label}</span>
              </div>
            ))}
          </div>
          <Button size="sm" className="gap-1.5 h-8 text-xs flex-shrink-0">
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">Booking Baru</span>
          </Button>
        </div>
      </div>

      {/* Mobile legend */}
      <div className="sm:hidden flex items-center gap-3 flex-wrap">
        {Object.entries(STATUS_STYLE).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${val.dot}`} />
            <span className="text-[10px] text-gray-500">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile: 7-day view */}
      <Card className="lg:hidden border-gray-100 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <CalendarGrid days={mobileDays} />
        </CardContent>
      </Card>

      {/* Desktop: full 30-day view */}
      <Card className="hidden lg:block border-gray-100 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <CalendarGrid days={allDays} />
        </CardContent>
      </Card>

      <p className="text-[11px] text-gray-400 text-center">
        Klik sel <span className="text-emerald-600 font-medium">Tersedia (·)</span> untuk membuat reservasi baru
      </p>
    </div>
  );
}
