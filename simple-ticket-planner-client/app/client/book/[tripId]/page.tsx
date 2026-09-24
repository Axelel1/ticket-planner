"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import SeatMap from "@/app/ui/client/passenger/seat-map";
import PassengerDetailsForm from "@/app/ui/client/passenger/passenger-details-form";

const trip = {
  operator: "Genesis Transit",
  origin: "Manila",
  destination: "Baguio",
  departureTime: "6:00 AM",
  date: "Sep 14, 2026",
  pricePerSeat: 480,
};

export default function BookTripPage() {
  const { tripId } = useParams();
  const router = useRouter();
  const [seats, setSeats] = useState<string[]>([]);

  const total = seats.length * trip.pricePerSeat;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock booking transaction — real submission wired up with Server Actions later
    router.push(`/client/ticket/BK-${tripId}-${Date.now().toString().slice(-4)}`);
  }

  return (
    <div className="flex bg-app-gradient">
      <main className="mx-auto max-w-4xl px-6 pb-16 md:px-12">
        <Link href="/client/trips" className="mb-2 inline-block text-sm text-slate-500 hover:text-transit-navy">
          ← Back to Trips
        </Link>
        <h1 className="mb-1 text-2xl font-semibold text-transit-navy">Select Your Seat</h1>
        <p className="mb-6 text-sm text-slate-500">
          {trip.operator} · {trip.origin} → {trip.destination} · {trip.date}, {trip.departureTime}
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <SeatMap onSelect={setSeats} />
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-medium text-slate-500">Passenger Details</h3>
              <PassengerDetailsForm />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-medium text-slate-500">Booking Summary</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Seats</span>
                  <span>{seats.length > 0 ? seats.join(", ") : "—"}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Price per seat</span>
                  <span>₱{trip.pricePerSeat}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 font-semibold text-transit-navy">
                  <span>Total</span>
                  <span>₱{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={seats.length === 0}
                className="mt-4 w-full rounded-md bg-signal-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}