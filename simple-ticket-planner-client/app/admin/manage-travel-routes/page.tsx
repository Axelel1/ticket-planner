// app/admin/manage-travel-routes/page.tsx
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/app/ui/admin/page-header";
import DeleteConfirm from "@/app/ui/admin/dashboard/delete-confirm";

const routes = [
  { id: 1, origin: "Manila", destination: "Baguio", duration: "5h 30m", distance: 246, basePrice: "₱480", capacity: 45 },
  { id: 2, origin: "Cebu", destination: "Dumaguete", duration: "3h 15m", distance: 165, basePrice: "₱320", capacity: 32 },
  { id: 3, origin: "Davao", destination: "Cagayan de Oro", duration: "4h 00m", distance: 190, basePrice: "₱410", capacity: 40 },
  { id: 4, origin: "Manila", destination: "Vigan", duration: "8h 00m", distance: 400, basePrice: "₱650", capacity: 45 },
];

export default function RoutesPage() {
  return (
    <main>
      <PageHeader
        title="Manage Routes"
        action={
          <Link
            href="/admin/manage-travel-routes/create"
            className="flex items-center gap-2 rounded-lg bg-signal-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon className="w-4" /> Create Route
          </Link>
        }
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Origin</th>
              <th className="px-5 py-3">Destination</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Distance</th>
              <th className="px-5 py-3">Base Price</th>
              <th className="px-5 py-3">Capacity</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {routes.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-4 font-medium text-transit-navy">{r.origin}</td>
                <td className="px-5 py-4 text-slate-600">{r.destination}</td>
                <td className="px-5 py-4 text-slate-600">{r.duration}</td>
                <td className="px-5 py-4 text-slate-600">{r.distance} km</td>
                <td className="px-5 py-4 text-slate-600">{r.basePrice}</td>
                <td className="px-5 py-4 text-slate-600">{r.capacity} seats</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/manage-travel-routes/${r.id}/edit`} className="text-sm font-medium text-signal-blue hover:text-blue-700">
                      Edit
                    </Link>
                    <DeleteConfirm itemLabel="route" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}