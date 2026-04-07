"use client";
import { mockProperties, mockRooms } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Building2, MapPin, Hash, Edit, PowerOff, BedDouble } from "lucide-react";

const propertyColors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-violet-500"];

export function PropertiesView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-white border border-gray-100 p-1 rounded-xl shadow-sm">
          {["Semua", "Aktif", "Nonaktif"].map((f, i) => (
            <button key={f} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${i === 0 ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
              {f}
            </button>
          ))}
        </div>
        <Button size="sm" className="gap-1.5 h-9">
          <Plus className="w-3.5 h-3.5" />
          Tambah Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockProperties.map((p, i) => {
          const roomCount = mockRooms.filter(r => r.property_id === p.id).length;
          const activeRooms = mockRooms.filter(r => r.property_id === p.id && r.status === "active").length;
          return (
            <Card key={p.id} className={`border-gray-100 shadow-sm transition-all hover:shadow-md ${!p.is_active ? "opacity-60" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${propertyColors[i % propertyColors.length]} rounded-xl flex items-center justify-center shadow-sm`}>
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{p.name}</h3>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <Hash className="w-3 h-3" />
                        {p.code}
                      </div>
                    </div>
                  </div>
                  <Badge variant={p.is_active ? "success" : "secondary"} className="text-[11px]">
                    {p.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>

                <div className="flex items-start gap-1.5 text-xs text-gray-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
                  <span>{p.address}</span>
                </div>

                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                  <BedDouble className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{roomCount} Kamar</p>
                    <p className="text-[11px] text-gray-400">{activeRooms} aktif</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-8 border-gray-200">
                    <Edit className="w-3 h-3" /> Edit
                  </Button>
                  {p.is_active && (
                    <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs h-8 text-red-400 hover:text-red-600 hover:bg-red-50">
                      <PowerOff className="w-3 h-3" /> Nonaktifkan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
