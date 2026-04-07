import { mockAuditLogs } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const actionColors: Record<string, string> = {
  CHECK_IN:      "bg-emerald-100 text-emerald-700",
  CHECK_OUT:     "bg-blue-100 text-blue-700",
  CANCEL:        "bg-red-100 text-red-700",
  DEACTIVATE:    "bg-orange-100 text-orange-700",
  STATUS_CHANGE: "bg-yellow-100 text-yellow-700",
  REVERSE:       "bg-purple-100 text-purple-700",
  CREATE:        "bg-teal-100 text-teal-700",
  UPDATE:        "bg-gray-100 text-gray-700",
};

export function AuditLogView() {
  return (
    <div className="space-y-4">
      {/* Filters — wrap on mobile */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
          <Input placeholder="Cari..." className="pl-9 h-9 text-sm w-full" />
        </div>
        <Select className="w-36 h-9 text-sm">
          <option value="">Semua Entity</option>
          <option value="Reservation">Reservation</option>
          <option value="Property">Property</option>
          <option value="Room">Room</option>
          <option value="Income_Transaction">Income</option>
          <option value="User">User</option>
        </Select>
        <Select className="w-36 h-9 text-sm">
          <option value="">Semua Aksi</option>
          <option value="CHECK_IN">Check-in</option>
          <option value="CANCEL">Cancel</option>
          <option value="CREATE">Create</option>
          <option value="UPDATE">Update</option>
        </Select>
      </div>

      {/* Mobile: card list */}
      <div className="lg:hidden space-y-3">
        {mockAuditLogs.map((log) => (
          <Card key={log.id} className="border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2 gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.actor}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {new Date(log.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                  </p>
                </div>
                <span className={`text-[11px] rounded-full px-2 py-0.5 font-medium flex-shrink-0 ${actionColors[log.action] ?? "bg-gray-100 text-gray-700"}`}>
                  {log.action}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] bg-gray-100 text-gray-600 rounded px-2 py-0.5">{log.entity_type}</span>
              </div>
              {log.reason && <p className="text-xs text-gray-500 leading-relaxed">{log.reason}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: table */}
      <Card className="hidden lg:block border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-xs text-gray-400 font-medium pl-5">Waktu</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Aktor</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Entity</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Aksi</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium pr-5">Alasan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id} className="border-gray-50 hover:bg-gray-50/50">
                  <TableCell className="text-xs text-gray-400 whitespace-nowrap pl-5">
                    {new Date(log.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-800">{log.actor}</TableCell>
                  <TableCell><span className="text-[11px] bg-gray-100 text-gray-600 rounded px-2 py-0.5">{log.entity_type}</span></TableCell>
                  <TableCell><span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${actionColors[log.action] ?? "bg-gray-100 text-gray-700"}`}>{log.action}</span></TableCell>
                  <TableCell className="text-sm text-gray-500 max-w-[300px] truncate pr-5">{log.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
