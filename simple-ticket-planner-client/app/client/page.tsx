import Link from "next/link";
import StatusBadge from "@/app/ui/client/status-badge";

const upcomingTrip = {
  bookingId: "BK-2291",
  route: "Manila → Baguio",
  date: "Sep 14, 2026",
  departure: "6:00 AM",
  seats: "2A, 2B",
  operator: "Genesis Transit",
  status: "on-time" as const,
};

const recentBookings = [
  { id: "BK-2291", route: "Manila → Baguio", date: "Sep 14, 2026", status: "on-time" as const },
  { id: "BK-2245", route: "Cebu → Dumaguete", date: "Aug 28, 2026", status: "delayed" as const },
  { id: "BK-2198", route: "Davao → Cagayan de Oro", date: "Aug 15, 2026", status: "cancelled" as const },
];

export default function ClientHome() {
  return (
    <main className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-transit-navy">Welcome back, Juan</h1>
        <p className="text-sm text-slate-500">Here&apos;s what&apos;s coming up.</p>
      </div>

      {/* Upcoming trip — hero card */}
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-navy-gradient px-6 py-4 text-white">
          <p className="text-xs text-slate-300">Your Next Trip</p>
          <p className="text-lg font-semibold">{upcomingTrip.route}</p>
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="text-transit-navy">
              <span className="font-medium">{upcomingTrip.date}</span> · {upcomingTrip.departure}
            </p>
            <p className="text-slate-500">
              {upcomingTrip.operator} · Seat(s) {upcomingTrip.seats}
            </p>
            <StatusBadge status={upcomingTrip.status} />
          </div>
          <div className="flex gap-3">
            <Link
              href={`/client/ticket/${upcomingTrip.bookingId}`}
              className="rounded-md bg-signal-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/client/trips"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-signal-blue/40"
        >
          <p className="text-sm font-semibold text-transit-navy">Search Trips</p>
          <p className="mt-1 text-sm text-slate-500">Find and book your next ride.</p>
        </Link>
        <Link
          href="/client/history"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-signal-blue/40"
        >
          <p className="text-sm font-semibold text-transit-navy">View History</p>
          <p className="mt-1 text-sm text-slate-500">See past bookings and payments.</p>
        </Link>
      </div>

      {/* Recent bookings preview */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-medium text-slate-500">Recent Bookings</h2>
          <Link href="/client/history" className="text-xs font-medium text-signal-blue hover:text-blue-700">
            View all
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recentBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <p className="text-sm font-medium text-transit-navy">{b.route}</p>
                <p className="text-xs text-slate-400">{b.date}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}