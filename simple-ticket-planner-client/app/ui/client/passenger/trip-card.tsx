import Link from "next/link";
import StatusBadge from "@/app/ui/client/status-badge";

type Trip = {
  id: string;
  operator: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: string;
  seatsLeft: number;
  status: "on-time" | "delayed" | "cancelled";
};

export default function TripCard({ trip }: { trip: Trip }) {
  const soldOut = trip.seatsLeft === 0;

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex-1">
        <div className="mb-1.5 flex items-center gap-2">
          <p className="text-sm font-medium text-transit-navy">{trip.operator}</p>
          <StatusBadge status={trip.status} />
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold text-transit-navy">{trip.departureTime}</span>
          <span className="flex-1 border-t border-dashed border-slate-300" />
          <span className="text-xs text-slate-400">{trip.duration}</span>
          <span className="flex-1 border-t border-dashed border-slate-300" />
          <span className="font-semibold text-transit-navy">{trip.arrivalTime}</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          {trip.origin} → {trip.destination}
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
        <div className="text-right">
          <p className="text-lg font-semibold text-transit-navy">{trip.price}</p>
          <p className={`text-xs ${soldOut ? "text-status-cancelled" : "text-slate-400"}`}>
            {soldOut ? "Sold out" : `${trip.seatsLeft} seats left`}
          </p>
        </div>
        <Link
          href={soldOut ? "#" : `/client/book/${trip.id}`}
          aria-disabled={soldOut}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            soldOut
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-signal-blue text-white hover:bg-blue-700"
          }`}
        >
          {soldOut ? "Unavailable" : "Select Seat"}
        </Link>
      </div>
    </div>
  );
}