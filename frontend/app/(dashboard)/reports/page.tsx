import { Topbar } from "@/components/layout/topbar";
import { ReportsView } from "@/features/reports/reports-view";

export default function ReportsPage() {
  return (
    <div>
      <Topbar title="Laporan & Ekspor" subtitle="Unduh laporan income dan expenses" />
      <div className="p-4 lg:p-6">
        <ReportsView />
      </div>
    </div>
  );
}
