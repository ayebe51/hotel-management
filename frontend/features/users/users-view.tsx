import { mockUsers } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, UserX } from "lucide-react";

const roleConfig: Record<string, { label: string; color: string }> = {
  owner:             { label: "Owner", color: "bg-violet-100 text-violet-700" },
  admin:             { label: "Admin", color: "bg-blue-100 text-blue-700" },
  staff_operasional: { label: "Staff Operasional", color: "bg-teal-100 text-teal-700" },
  finance:           { label: "Finance", color: "bg-emerald-100 text-emerald-700" },
  auditor:           { label: "Auditor", color: "bg-gray-100 text-gray-600" },
};

const avatarColors = ["bg-violet-500", "bg-blue-500", "bg-teal-500", "bg-emerald-500", "bg-amber-500"];

export function UsersView() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-1.5 h-9">
          <Plus className="w-3.5 h-3.5" />
          Tambah User
        </Button>
      </div>

      {/* Mobile: card list */}
      <div className="lg:hidden space-y-3">
        {mockUsers.map((user, i) => {
          const rc = roleConfig[user.role] ?? { label: user.role, color: "bg-gray-100 text-gray-600" };
          return (
            <Card key={user.id} className="border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                      {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant={user.is_active ? "success" : "secondary"} className="text-[11px] flex-shrink-0">
                    {user.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] rounded-full px-2.5 py-0.5 font-medium ${rc.color}`}>{rc.label}</span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(user.last_login_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs gap-1 text-gray-500"><Edit className="w-3 h-3" /> Edit</Button>
                  {user.role !== "owner" && <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs text-red-400 gap-1"><UserX className="w-3 h-3" /> Nonaktif</Button>}
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
                <TableHead className="text-xs text-gray-400 font-medium pl-5">Pengguna</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Role</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Status</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium">Login Terakhir</TableHead>
                <TableHead className="text-xs text-gray-400 font-medium text-right pr-5">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user, i) => {
                const rc = roleConfig[user.role] ?? { label: user.role, color: "bg-gray-100 text-gray-600" };
                return (
                  <TableRow key={user.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}>
                          {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-[11px] text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><span className={`text-[11px] rounded-full px-2.5 py-0.5 font-medium ${rc.color}`}>{rc.label}</span></TableCell>
                    <TableCell><Badge variant={user.is_active ? "success" : "secondary"} className="text-[11px]">{user.is_active ? "Aktif" : "Nonaktif"}</Badge></TableCell>
                    <TableCell className="text-xs text-gray-400">{new Date(user.last_login_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</TableCell>
                    <TableCell className="text-right pr-5">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1 text-gray-500"><Edit className="w-3 h-3" /> Edit</Button>
                        {user.role !== "owner" && <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400 gap-1"><UserX className="w-3 h-3" /> Nonaktif</Button>}
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
