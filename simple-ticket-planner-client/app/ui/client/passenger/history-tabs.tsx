"use client";

import { useState } from "react";
import clsx from "clsx";
import StatusBadge from "@/app/ui/admin/status-badge";

const bookings = [
  { id: "BK-2291", date: "Sep 10, 2026", route: "Manila → Baguio", seats: "2A, 2B", departure: "6:00 AM", status: "on-time" as const },
  { id: "BK-2245", date: "Aug 28, 2026", route: "Cebu → Dumaguete", seats: "5C", departure: "7:30 AM", status: "delayed" as const },
  { id: "BK-2198", date: "Aug 15, 2026", route: "Davao → Cagayan de Oro", seats: "1A", departure: "1:00 PM", status: "cancelled" as const },
  { id: "BK-2140", date: "Jul 30, 2026", route: "Manila → Vigan", seats: "3D, 3C", departure: "9:00 AM", status: "on-time" as const },
];

export default function HistoryTabs() {
  const [tab, setTab] = useState<"transactions" | "bookings">("bookings");

  return (
    <div>
      {tab === "bookings" && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Booking ID</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Seat(s)</th>
                <th className="px-5 py-3">Departure</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Ticket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4 font-medium text-transit-navy">{b.id}</td>
                  <td className="px-5 py-4 text-slate-600">{b.date}</td>
                  <td className="px-5 py-4 text-slate-600">{b.route}</td>
                  <td className="px-5 py-4 text-slate-600">{b.seats}</td>
                  <td className="px-5 py-4 text-slate-600">{b.departure}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a href={`/client/ticket/${b.id}`} className="text-sm font-medium text-signal-blue hover:text-blue-700">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}