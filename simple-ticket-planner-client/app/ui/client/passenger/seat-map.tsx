"use client";

import { useState } from "react";
import clsx from "clsx";

const bookedSeats = new Set(["1A", "1B", "3D", "5A", "5B", "7C", "9A"]);
const rows = Array.from({ length: 11 }, (_, i) => i + 1);
const cols = ["A", "B", "C", "D"];

export default function SeatMap({ onSelect }: { onSelect?: (seats: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleSeat(seat: string) {
    if (bookedSeats.has(seat)) return;

    const next = selected.includes(seat)
      ? selected.filter((s) => s !== seat)
      : [...selected, seat];

    setSelected(next);
    onSelect?.(next);
  }

  return (
    <div>
      {/* Legend */}
      <div className="mb-5 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded border border-slate-300 bg-white" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-signal-blue" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-slate-200" /> Booked
        </span>
      </div>

      {/* Driver indicator */}
      <div className="mb-4 flex justify-end">
        <span className="rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-500">🚍 Driver</span>
      </div>

      <div className="mx-auto max-w-xs space-y-2">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-2">
            {cols.map((col, i) => {
              const seat = `${row}${col}`;
              const isBooked = bookedSeats.has(seat);
              const isSelected = selected.includes(seat);
              return (
                <div key={seat} className="flex items-center">
                  {i === 2 && <span className="w-4" />}
                  <button
                    type="button"
                    disabled={isBooked}
                    onClick={() => toggleSeat(seat)}
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-md border text-[11px] font-medium transition-colors",
                      isBooked && "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400",
                      isSelected && "border-signal-blue bg-signal-blue text-white",
                      !isBooked && !isSelected && "border-slate-300 bg-white text-slate-600 hover:border-signal-blue hover:text-signal-blue",
                    )}
                  >
                    {seat}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        {selected.length === 0 ? "No seats selected" : `Selected: ${selected.join(", ")}`}
      </p>
    </div>
  );
}