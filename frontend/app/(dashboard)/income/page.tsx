import { Topbar } from "@/components/layout/topbar";
import { IncomeView } from "@/features/income/income-view";

export default function IncomePage() {
  return (
    <div>
      <Topbar title="Income" subtitle="Pencatatan & laporan pendapatan" />
      <div className="p-4 lg:p-6">
        <IncomeView />
      </div>
    </div>
  );
}
