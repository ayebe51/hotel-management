import { Topbar } from "@/components/layout/topbar";
import { CalendarView } from "@/features/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <div>
      <Topbar title="Kalender Hunian" subtitle="Status kamar per tanggal" />
      <div className="p-4 lg:p-6">
        <CalendarView />
      </div>
    </div>
  );
}
