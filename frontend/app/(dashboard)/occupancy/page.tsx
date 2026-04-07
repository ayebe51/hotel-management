import { Topbar } from "@/components/layout/topbar";
import { OccupancyView } from "@/features/occupancy/occupancy-view";

export default function OccupancyPage() {
  return (
    <div>
      <Topbar title="Performa Hunian" subtitle="Analitik tingkat hunian per kamar" />
      <div className="p-4 lg:p-6">
        <OccupancyView />
      </div>
    </div>
  );
}
