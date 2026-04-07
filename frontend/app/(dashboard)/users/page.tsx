import { Topbar } from "@/components/layout/topbar";
import { UsersView } from "@/features/users/users-view";

export default function UsersPage() {
  return (
    <div>
      <Topbar title="Manajemen User" subtitle="Kelola akun dan hak akses pengguna" />
      <div className="p-4 lg:p-6">
        <UsersView />
      </div>
    </div>
  );
}
