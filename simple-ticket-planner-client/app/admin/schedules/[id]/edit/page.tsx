import Link from "next/link";
import PageHeader from "@/app/ui/admin/page-header";
import FormField from "@/app/ui/admin/form-field";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-transit-navy placeholder:text-slate-400 focus:border-signal-blue focus:outline-none focus:ring-2 focus:ring-signal-blue/20";

// Placeholder — will be replaced by a real fetch keyed on params.id
const schedule = {
  route: "1",
  date: "2026-08-26",
  time: "06:00",
  capacity: 45,
  price: 480,
  status: "on-time",
};

export default async function EditSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main>
      <Link href="/admin/schedules" className="mb-2 inline-block text-sm text-slate-500 hover:text-transit-navy">
        ← Back to Schedules
      </Link>
      <PageHeader title={`Edit Schedule #${id}`} />

      <form action={`/admin/schedules`} method="POST" className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Route" htmlFor="route">
              <select id="route" name="route" defaultValue={schedule.route} className={inputClass}>
                <option value="1">Manila → Baguio</option>
                <option value="2">Cebu → Dumaguete</option>
                <option value="3">Davao → Cagayan de Oro</option>
              </select>
            </FormField>
          </div>

          <FormField label="Departure Date" htmlFor="date">
            <input id="date" name="date" type="date" defaultValue={schedule.date} className={inputClass} />
          </FormField>

          <FormField label="Departure Time" htmlFor="time">
            <input id="time" name="time" type="time" defaultValue={schedule.time} className={inputClass} />
          </FormField>

          <FormField label="Capacity" htmlFor="capacity">
            <input id="capacity" name="capacity" type="number" defaultValue={schedule.capacity} className={inputClass} />
          </FormField>

          <FormField label="Price (₱)" htmlFor="price">
            <input id="price" name="price" type="number" defaultValue={schedule.price} className={inputClass} />
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Status" htmlFor="status">
              <select id="status" name="status" defaultValue={schedule.status} className={inputClass}>
                <option value="on-time">On Time</option>
                <option value="delayed">Delayed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </FormField>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <div className="flex gap-3">
            <Link
              href="/admin/schedules"
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-transit-navy hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-signal-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}