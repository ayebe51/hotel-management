import { Topbar } from "@/components/layout/topbar";
import { ReservationsView } from "@/features/reservations/reservations-view";

export default function ReservationsPage() {
  return (
    <div>
      <Topbar title="Reservasi" subtitle="Kelola reservasi tamu" />
      <div className="p-4 lg:p-6">
        <ReservationsView />
      </div>
    </div>
  );
}
