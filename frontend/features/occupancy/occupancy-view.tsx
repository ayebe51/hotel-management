"use client";
import { mockOccupancyData, mockProperties } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";

function getRateVariant(rate: number): "success" | "warning" | "secondary" | "destructive" {
  if (rate >= 75) return "success";
  if (rate >= 50) return "warning";
  if (rate > 0)   return "secondary";
  return "destructive";
}

function getBarColor(rate: number): string {
  if (rate >= 75) return "#10b981";
  if (rate >= 50) return "#f59e0b";
  if (rate > 0)   return "#6b7280";
  return "#ef4444";
}

export function OccupancyView() {
  const validData = mockOccupancyData.filter(d => d.available > 0);
  const avgRate = validData.reduce((s, d) => s + d.rate, 0) / validData.length;

  return (
    <div className="space-y-4 lg:space-y-5">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
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

      {/* Summary — 3 cols on sm+, 1 col on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        <Card className="border-gray-100">
          <CardContent className="p-4 lg:p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Rata-rata Occupancy</p>
            <p className="text-3xl font-bold text-blue-600">{avgRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100">
          <CardContent className="p-4 lg:p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Kamar Terbaik</p>
            <p className="text-base font-bold text-emerald-600 truncate">{mockOccupancyData[0].room}</p>
            <p className="text-sm text-gray-500">{mockOccupancyData[0].rate}%</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100">
          <CardContent className="p-4 lg:p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Kamar Terendah</p>
            <p className="text-base font-bold text-red-500 truncate">{mockOccupancyData[mockOccupancyData.length - 1].room}</p>
            <p className="text-sm text-gray-500">{mockOccupancyData[mockOccupancyData.length - 1].rate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-gray-100">
        <CardHeader className="pb-2 pt-4 px-4 lg:pt-5 lg:px-5">
          <CardTitle className="text-sm font-semibold text-gray-800">Occupancy Rate per Kamar</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-4 lg:px-5 lg:pb-5">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockOccupancyData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="room" tick={{ fontSize: 10, fill: "#6b7280" }} width={72} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e5e7eb" }} />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]} name="Occupancy Rate">
                {mockOccupancyData.map((entry, i) => (
                  <Cell key={i} fill={getBarColor(entry.rate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ranking table */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4 lg:pt-5 lg:px-5">
          <CardTitle className="text-sm font-semibold text-gray-800">Ranking Kamar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-xs text-gray-400 font-medium w-12 pl-4 lg:pl-5">#</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Kamar</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right hidden sm:table-cell">Terisi</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right hidden sm:table-cell">Tersedia</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right pr-4 lg:pr-5">Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOccupancyData.map((d, i) => (
                <TableRow key={d.room} className="border-gray-50 hover:bg-gray-50/50">
                  <TableCell className="text-center font-bold text-gray-300 text-sm pl-4 lg:pl-5">#{i + 1}</TableCell>
                  <TableCell className="font-medium text-sm text-gray-800">{d.room}</TableCell>
                  <TableCell className="text-right text-sm text-gray-500 hidden sm:table-cell">{d.occupied}</TableCell>
                  <TableCell className="text-right text-sm text-gray-400 hidden sm:table-cell">{d.available}</TableCell>
                  <TableCell className="text-right pr-4 lg:pr-5">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-12 lg:w-20 bg-gray-100 rounded-full h-1.5 hidden sm:block">
                        <div className="h-1.5 rounded-full" style={{ width: `${d.rate}%`, backgroundColor: getBarColor(d.rate) }} />
                      </div>
                      <Badge variant={getRateVariant(d.rate)} className="text-[11px] w-14 justify-center">
                        {d.rate.toFixed(1)}%
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
