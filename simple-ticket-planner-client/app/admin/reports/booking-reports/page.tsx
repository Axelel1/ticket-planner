import PageHeader from "@/app/ui/admin/page-header";
import StatBar from "@/app/ui/admin/dashboard/stat-bar";
import ExportButtons from "@/app/ui/admin/dashboard/reports/export-buttons";
import DateRangeFilter from "@/app/ui/admin/dashboard/reports/date-range-filter";
import SectionTitle from "@/app/ui/admin/dashboard/section-title";
import Link from "next/dist/client/link";

const summary = [
  { label: "Total Bookings", value: "1,284" },
  { label: "Avg. Occupancy Rate", value: "78%" },
  { label: "Active Routes", value: "12" },
  { label: "Trips Today", value: "34" },
];

// --- Users & Bookings ---
const userStats = [
  { label: "Total Active Users", value: "8,942" },
  { label: "New Registrations (7d)", value: "312" },
  { label: "Unclaimed / No-Shows", value: "19" },
];

const peakBookingTimes = [
  { label: "Monday", value: "412 bookings", percent: 85 },
  { label: "Tuesday", value: "268 bookings", percent: 55 },
  { label: "Wednesday", value: "190 bookings", percent: 39 },
  { label: "Thursday", value: "301 bookings", percent: 62 },
];

const noShows = [
  { id: "TCK-2340", passenger: "J. Santos", route: "Manila → Baguio", date: "Aug 25, 6:00 AM" },
  { id: "TCK-2352", passenger: "M. Reyes", route: "Cebu → Dumaguete", date: "Aug 25, 7:30 AM" },
];

export default function ReportsPage() {
  return (
    <main>
      <PageHeader title="System Reports" action={<ExportButtons />} />

      <DateRangeFilter />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-semibold text-transit-navy">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
            href="/admin/reports/booking-reports"
            className="flex items-center gap-2 rounded-lg bg-signal-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
          User & Booking Reports
          </Link>
          <Link
            href="/admin/reports/operational-reports"
            className="flex items-center gap-2 rounded-lg bg-signal-blue px-4 py-5 text-sm font-medium text-white hover:bg-blue-700"
          >
          Operational Reports
          </Link>
      </div>
      {/* User & Booking Reports */}
        <SectionTitle title="User & Booking Reports" description="Active users, peak demand, and no-shows." />
    
        <div className="grid gap-4 sm:grid-cols-3">
            {userStats.map((u) => (
            <div key={u.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{u.label}</p>
                <p className="mt-2 text-2xl font-semibold text-transit-navy">{u.value}</p>
            </div>
            ))}
        </div>

       <div className="grid gap-4 sm:grid-cols-2">
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-sm font-medium text-slate-500">Peak Booking Times</h3>
            <div className="space-y-5">
            {peakBookingTimes.map((p) => (
                <StatBar key={p.label} label={p.label} value={p.value} percent={p.percent} color="bg-status-delayed" />
            ))}
            </div>
        </div>
    
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="border-b border-slate-100 px-5 py-4 text-sm font-medium text-slate-500">
              Unclaimed Tickets / No-Shows
              </h3>
              <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Ticket ID</th>
                  <th className="px-5 py-3">Passenger</th>
                  <th className="px-5 py-3">Route</th>
                  <th className="px-5 py-3">Trip Date</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {noShows.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/60">
                      <td className="px-5 py-4 font-medium text-transit-navy">{n.id}</td>
                      <td className="px-5 py-4 text-slate-600">{n.passenger}</td>
                      <td className="px-5 py-4 text-slate-600">{n.route}</td>
                      <td className="px-5 py-4 text-slate-600">{n.date}</td>
                  </tr>
                  ))}
              </tbody>
              </table>
          </div>
        </div>
        </main>
    );
}

