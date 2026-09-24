import Link from "next/link";
import TripSearchForm from "@/app/ui/client/passenger/trip-search-form";
import TripCard from "@/app/ui/client/passenger/trip-card";

const trips = [
  { id: "t1", operator: "Genesis Transit", origin: "Manila", destination: "Baguio", departureTime: "6:00 AM", arrivalTime: "11:30 AM", duration: "5h 30m", price: "₱480", seatsLeft: 12, status: "on-time" as const },
  { id: "t2", operator: "Victory Liner", origin: "Manila", destination: "Baguio", departureTime: "8:00 AM", arrivalTime: "1:45 PM", duration: "5h 45m", price: "₱450", seatsLeft: 3, status: "on-time" as const },
  { id: "t3", operator: "Genesis Transit", origin: "Manila", destination: "Baguio", departureTime: "10:00 AM", arrivalTime: "3:30 PM", duration: "5h 30m", price: "₱480", seatsLeft: 0, status: "delayed" as const },
  { id: "t4", operator: "Solid North", origin: "Manila", destination: "Baguio", departureTime: "1:00 PM", arrivalTime: "6:20 PM", duration: "5h 20m", price: "₱520", seatsLeft: 20, status: "on-time" as const },
];

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-app-gradient">  
      <main className="mx-auto max-w-3xl px-6 pb-16 md:px-12">
        <h1 className="mb-4 text-2xl font-semibold text-transit-navy">Search Trips</h1>
        <TripSearchForm />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">{trips.length} trips found · Manila → Baguio · Sep 14</p>
          <select className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-transit-navy">
            <option>Sort: Earliest departure</option>
            <option>Sort: Lowest price</option>
            <option>Sort: Fastest</option>
          </select>
        </div>

        <div className="mt-4 space-y-4">
          {trips.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </main>
    </div>
  );
}