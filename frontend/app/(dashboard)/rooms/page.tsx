import { Topbar } from "@/components/layout/topbar";
import { RoomsView } from "@/features/rooms/rooms-view";

export default function RoomsPage() {
  return (
    <div>
      <Topbar title="Manajemen Kamar" subtitle="Kelola data kamar per property" />
      <div className="p-4 lg:p-6">
        <RoomsView />
      </div>
    </div>
  );
}
