// Deterministic mock QR pattern — visual placeholder, not a scannable code.
// A real QR would use a library like `qrcode` once wired to the database.
function MockQRCode({ seed }: { seed: string }) {
  const size = 12;
  const cells = Array.from({ length: size * size }, (_, i) => {
    const hash = (seed.charCodeAt(i % seed.length) * (i + 7)) % 5;
    return hash < 2;
  });

  return (
    <div className="grid h-32 w-32 grid-cols-12 gap-[1px] rounded-lg bg-transit-navy p-2">
      {cells.map((filled, i) => (
        <div key={i} className={filled ? "bg-white" : "bg-transparent"} />
      ))}
    </div>
  );
}

type Ticket = {
  bookingId: string;
  passengerName: string;
  operator: string;
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  seats: string[];
  total: string;
};

export default function TicketReceipt({ ticket }: { ticket: Ticket }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-navy-gradient px-6 py-5 text-white">
        <p className="text-xs text-slate-300">Booking Confirmed</p>
        <p className="text-lg font-semibold">{ticket.bookingId}</p>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-slate-400">Passenger</p>
            <p className="font-medium text-transit-navy">{ticket.passengerName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Trip</p>
            <p className="font-medium text-transit-navy">
              {ticket.origin} → {ticket.destination}
            </p>
            <p className="text-slate-500">
              {ticket.operator} · {ticket.date}, {ticket.departureTime}
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-slate-400">Seat(s)</p>
              <p className="font-medium text-transit-navy">{ticket.seats.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Paid</p>
              <p className="font-medium text-transit-navy">{ticket.total}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <MockQRCode seed={ticket.bookingId} />
          <p className="text-[10px] text-slate-400">Scan at boarding</p>
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
        Present this ticket (digital or printed) to the conductor before boarding.
      </div>
    </div>
  );
}