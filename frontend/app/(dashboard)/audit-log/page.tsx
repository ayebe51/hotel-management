import { Topbar } from "@/components/layout/topbar";
import { AuditLogView } from "@/features/audit-log/audit-log-view";

export default function AuditLogPage() {
  return (
    <div>
      <Topbar title="Audit Log" subtitle="Riwayat perubahan data sistem" />
      <div className="p-4 lg:p-6">
        <AuditLogView />
      </div>
    </div>
  );
}
