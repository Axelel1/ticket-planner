import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/app/ui/admin/page-header";
import StatusBadge from "@/app/ui/admin/status-badge";
import StatBar from "@/app/ui/admin/dashboard/stat-bar";
import KpiCard from "@/app/ui/admin/dashboard/kpi-card";
import LineChart from "@/app/ui/admin/dashboard/line-chart";
import BarChart from "@/app/ui/admin/dashboard/bar-chart";
import AlertItem from "@/app/ui/admin/dashboard/alert-item";
import SectionTitle from "@/app/ui/admin/dashboard/section-title";

const kpis = [
  { label: "Total Revenue", value: "₱42,800", trend: 12 },
  { label: "Tickets Sold", value: "186", trend: 8 },
  { label: "Active Trips", value: "9", trend: -2 },
  { label: "Occupancy Rate", value: "78%", trend: 4 },
];

const liveTrips = [
  { id: "TRP-101", route: "Manila → Baguio, 6:00 AM", status: "on-time" as const, eta: "11:30 AM" },
  { id: "TRP-104", route: "Cebu → Dumaguete, 7:30 AM", status: "delayed" as const, eta: "12:15 PM (+45m)" },
  { id: "TRP-108", route: "Davao → Cagayan de Oro, 1:00 PM", status: "cancelled" as const, eta: "—" },
  { id: "TRP-110", route: "Manila → Baguio, 10:00 AM", status: "on-time" as const, eta: "3:30 PM" },
  { id: "TRP-112", route: "Manila → Vigan, 9:00 AM", status: "on-time" as const, eta: "5:00 PM" },
];

const alerts = [
  {
    severity: "critical" as const,
    title: "Vehicle Breakdown — Bus #22",
    detail: "Manila → Baguio (10:00 AM) stalled near Rosario, Pangasinan.",
    time: "5 min ago",
  },
  {
    severity: "warning" as const,
    title: "Overbooked Trip — TRP-112",
    detail: "Manila → Vigan has 47 confirmed passengers against 45 capacity.",
    time: "18 min ago",
  },
  {
    severity: "critical" as const,
    title: "Route Block Reported",
    detail: "Landslide advisory on Kennon Road affecting Baguio-bound trips.",
    time: "32 min ago",
  },
];

const salesTrend = [
  { label: "Mon", value: 32000 },
  { label: "Tue", value: 38000 },
  { label: "Wed", value: 35000 },
  { label: "Thu", value: 41000 },
  { label: "Fri", value: 39000 },
  { label: "Sat", value: 46000 },
  { label: "Today", value: 42800 },
];

const popularRoutes = [
  { label: "Manila–Baguio", value: 412 },
  { label: "Baguio–Manila", value: 300 },
  { label: "Cebu–Dumaguete", value: 268 },
  { label: "Davao–CDO", value: 190 },
  { label: "Manila–Vigan", value: 155 },
];

const capacityByTimeSlot = [
  { label: "Monday", percent: 85 },
  { label: "Tuesday", percent: 55 },
  { label: "Wednesday", percent: 39 },
  { label: "Thursday", percent: 62 },
  { label: "Sunday", percent: 24 },
];

const quickActions = [
  { label: "Cancel / Delay a Trip", tone: "border-status-delayed/30 text-status-delayed hover:bg-status-delayed/5" },
  { label: "Issue Bulk Refund", tone: "border-status-cancelled/30 text-status-cancelled hover:bg-status-cancelled/5" },
  { label: "Add Temporary Fleet/Route", tone: "border-signal-blue/30 text-signal-blue hover:bg-signal-blue/5" },
  { label: "User Search", tone: "border-slate-200 text-transit-navy hover:bg-slate-50" },
];

export default function AdminOverview() {
  return (
    <main>
      <PageHeader
        title="Admin Dashboard"
        action={
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-2.5 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search passenger, driver, or ticket ID"
              className="w-72 rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-transit-navy placeholder:text-slate-400 focus:border-signal-blue focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
            />
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Real-Time Operations & Alerts
      <SectionTitle title="Real-Time Operations & Alerts" description="Live trip status and issues needing attention." />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <h3 className="border-b border-slate-100 px-5 py-4 text-sm font-medium text-slate-500">Live Trip Monitor</h3>
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Trip</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {liveTrips.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4 font-medium text-transit-navy">{t.id}</td>
                  <td className="px-5 py-4 text-slate-600">{t.route}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-600">{t.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-medium text-slate-500">Critical Alerts</h3>
            <div className="space-y-3">
              {alerts.map((a) => (
                <AlertItem key={a.title} {...a} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-medium text-slate-500">Support Queue</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-transit-navy">Pending Ticket Issues</span>
                <span className="rounded-full bg-status-delayed/10 px-2.5 py-0.5 text-xs font-medium text-status-delayed">
                  14
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-transit-navy">Urgent Refund Requests</span>
                <span className="rounded-full bg-status-cancelled/10 px-2.5 py-0.5 text-xs font-medium text-status-cancelled">
                  5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Analytical Charts */}
      <SectionTitle title="Analytical Overview" description="Trends over the last 7 days." />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-slate-500">Sales Trend (Daily Revenue)</h3>
        <LineChart data={salesTrend} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-medium text-slate-500">Popular Routes (Tickets Sold)</h3>
          <BarChart data={popularRoutes} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-sm font-medium text-slate-500">Capacity Breakdown by Time Slot</h3>
          <div className="space-y-5">
            {capacityByTimeSlot.map((c) => (
              <StatBar
                key={c.label}
                label={c.label}
                value={`${c.percent}%`}
                percent={c.percent}
                color={c.percent < 40 ? "bg-status-cancelled" : c.percent < 60 ? "bg-status-delayed" : "bg-status-ontime"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <SectionTitle title="Quick Actions" description="Single-click shortcuts for common admin tasks." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((a) => (
          <button
            key={a.label}
            className={`rounded-lg border bg-white px-4 py-3 text-left text-sm font-medium shadow-sm transition-colors ${a.tone}`}
          >
            {a.label}
          </button>
        ))}
      </div>
    </main>
  );
}