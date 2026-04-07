import { Topbar } from "@/components/layout/topbar";
import { ExpensesView } from "@/features/expenses/expenses-view";

export default function ExpensesPage() {
  return (
    <div>
      <Topbar title="Expenses" subtitle="Pencatatan pengeluaran operasional" />
      <div className="p-4 lg:p-6">
        <ExpensesView />
      </div>
    </div>
  );
}
