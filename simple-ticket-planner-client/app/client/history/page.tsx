import HistoryTabs from "@/app/ui/client/passenger/history-tabs";

export default function HistoryPage() {
  return (
    <div className="flex bg-app-gradient">
    <main className="d-flex px-6 pb-16 md:px-12">
      <h1 className="mb-1 text-2xl font-semibold text-transit-navy">History</h1>
      <p className="mb-6 text-sm text-slate-500">View your past bookings</p>
      <HistoryTabs />
    </main>
    </div>
  );
}