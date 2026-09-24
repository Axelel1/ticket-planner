// @/app/admin/schedules/page.tsx
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/app/ui/admin/page-header";
import StatusBadge from "@/app/ui/admin/status-badge";
import DeleteConfirm from "@/app/ui/admin/dashboard/delete-confirm";

const schedules = [
  { id: 1, route: "Manila → Baguio", departure: "Aug 26, 6:00 AM", capacity: 45, price: "₱480", status: "on-time" as const },
  { id: 2, route: "Manila → Baguio", departure: "Aug 26, 10:00 AM", capacity: 45, price: "₱480", status: "delayed" as const },
  { id: 3, route: "Cebu → Dumaguete", departure: "Aug 26, 7:30 AM", capacity: 32, price: "₱320", status: "on-time" as const },
  { id: 4, route: "Davao → Cagayan de Oro", departure: "Aug 26, 1:00 PM", capacity: 40, price: "₱410", status: "cancelled" as const },
];

export default function SchedulesPage() {
  return (
    <main>
      <PageHeader
        title="Manage Schedules"
        action={
          <Link
            href="/admin/schedules/create"
            className="flex items-center gap-2 rounded-lg bg-signal-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon className="w-4" /> Create Schedule
          </Link>
        }
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Route</th>
              <th className="px-5 py-3">Departure</th>
              <th className="px-5 py-3">Capacity</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schedules.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-4 font-medium text-transit-navy">{s.route}</td>
                <td className="px-5 py-4 text-slate-600">{s.departure}</td>
                <td className="px-5 py-4 text-slate-600">{s.capacity} seats</td>
                <td className="px-5 py-4 text-slate-600">{s.price}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-5 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/schedules/${s.id}/edit`}
                    className="text-sm font-medium text-signal-blue hover:text-blue-700"
                  >
                    Edit
                  </Link>
                  <DeleteConfirm itemLabel="schedule" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}