import Link from "next/link";
import TicketReceipt from "@/app/ui/client/passenger/ticket-receipt";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  // Mock data — real version fetches this booking by ID from the database
  const ticket = {
    bookingId,
    passengerName: "Juan Dela Cruz",
    operator: "Genesis Transit",
    origin: "Manila",
    destination: "Baguio",
    date: "Sep 14, 2026",
    departureTime: "6:00 AM",
    seats: ["2A", "2B"],
    total: "₱960",
  };

  return (
    <div className="min-h-screen bg-app-gradient">
      <main className="mx-auto max-w-lg px-6 pb-16 md:px-12">
        <h1 className="mb-1 text-2xl font-semibold text-transit-navy">Your Ticket</h1>
        <p className="mb-6 text-sm text-slate-500">Booking confirmed — see details below.</p>

        <TicketReceipt ticket={ticket} />

        <div className="mt-6 flex gap-3">
          <Link
            href="/client/trips"
            className="flex-1 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-transit-navy hover:bg-slate-50"
          >
            Book Another Trip
          </Link>
          <button className="flex-1 rounded-md bg-signal-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
            Download Receipt
          </button>
        </div>
      </main>
    </div>
  );
}