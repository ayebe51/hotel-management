import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatIDR } from "@/lib/utils";
import Link from "next/link";

const propertyData = [
  { name: "Lily", revenue: 18500000, expenses: 2300000, occupancy: 78.5, rooms: 4, color: "bg-blue-500" },
  { name: "Tulip", revenue: 12400000, expenses: 1050000, occupancy: 64.3, rooms: 3, color: "bg-emerald-500" },
  { name: "Melati", revenue: 8800000, expenses: 2000000, occupancy: 56.2, rooms: 2, color: "bg-amber-500" },
];

export function PropertyPerformanceTable() {
  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-800">Performa Property</CardTitle>
          <Link href="/occupancy" className="text-xs text-blue-600 hover:underline">Detail</Link>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="text-xs text-gray-400 font-medium pl-5">Property</TableHead>
              <TableHead className="text-xs text-gray-400 font-medium text-right">Revenue</TableHead>
              <TableHead className="text-xs text-gray-400 font-medium text-right">Expenses</TableHead>
              <TableHead className="text-xs text-gray-400 font-medium text-right">Net</TableHead>
              <TableHead className="text-xs text-gray-400 font-medium text-right pr-5">Occupancy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propertyData.map((p) => {
              const net = p.revenue - p.expenses;
              return (
                <TableRow key={p.name} className="border-gray-50 hover:bg-gray-50/50">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${p.color}`} />
                      <span className="text-sm font-medium text-gray-800">{p.name}</span>
                      <span className="text-xs text-gray-400">{p.rooms} kamar</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-700">{formatIDR(p.revenue)}</TableCell>
                  <TableCell className="text-right text-sm text-red-500">{formatIDR(p.expenses)}</TableCell>
                  <TableCell className="text-right text-sm font-semibold text-emerald-600">{formatIDR(net)}</TableCell>
                  <TableCell className="text-right pr-5">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${p.occupancy >= 70 ? "bg-emerald-500" : p.occupancy >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ width: `${p.occupancy}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-10 text-right">{p.occupancy}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
