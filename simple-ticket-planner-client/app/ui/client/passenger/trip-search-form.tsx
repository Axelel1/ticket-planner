"use client";

import { MagnifyingGlassIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-transit-navy placeholder:text-slate-400 focus:border-signal-blue focus:outline-none focus:ring-2 focus:ring-signal-blue/20";

export default function TripSearchForm() {
  return (
    <form className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_1fr_auto]">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Origin</label>
          <input name="origin" type="text" defaultValue="Manila" className={inputClass} />
        </div>

        <div className="hidden items-end justify-center pb-2.5 sm:flex">
          <button type="button" className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-signal-blue">
            <ArrowsRightLeftIcon className="w-4" />
          </button>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Destination</label>
          <input name="destination" type="text" defaultValue="Baguio" className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Travel Date</label>
          <input name="date" type="date" defaultValue="2026-09-14" className={inputClass} />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-signal-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
          >
            <MagnifyingGlassIcon className="w-4" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}