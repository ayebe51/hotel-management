import { Topbar } from "@/components/layout/topbar";
import { PropertiesView } from "@/features/properties/properties-view";

export default function PropertiesPage() {
  return (
    <div>
      <Topbar title="Manajemen Property" subtitle="Kelola data properti" />
      <div className="p-4 lg:p-6">
        <PropertiesView />
      </div>
    </div>
  );
}
