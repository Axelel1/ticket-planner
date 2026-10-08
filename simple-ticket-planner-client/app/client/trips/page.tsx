import TripSearchForm from "@/app/ui/client/passenger/trip-search-form";
import TripCard from "@/app/ui/client/passenger/trip-card";
import { fetchTripsForDisplay } from "@/lib/data";

function formatDuration(minutes: number) {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function addMinutesToTime(time: string, minutesToAdd: number) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutesToAdd;
  const arrH = Math.floor((total % (24 * 60)) / 60);
  const arrM = total % 60;
  return `${String(arrH).padStart(2, "0")}:${String(arrM).padStart(2, "0")}`;
}

export default async function TripsPage() {
  const trips = await fetchTripsForDisplay();

  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold text-transit-navy">Search Trips</h1>
      <TripSearchForm />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">{trips.length} trips available</p>
      </div>

      <div className="mt-4 space-y-4">
        {trips.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
            No trips available right now.
          </p>
        ) : (
          trips.map((t) => (
            <TripCard
              key={t.id}
              trip={{
                id: String(t.id),
                operator: t.vehicle_label,
                origin: t.origin,
                destination: t.destination,
                departureTime: t.departure_time,
                arrivalTime: addMinutesToTime(t.departure_time, t.total_time_min),
                duration: formatDuration(t.total_time_min),
                price: t.price != null ? `₱${t.price}` : "—",
                seatsLeft: t.capacity, // placeholder — see note below
                status: "on-time",
              }}
            />
          ))
        )}
      </div>
    </main>
  );
}