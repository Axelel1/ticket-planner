import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-app-gradient">
      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-blue" />
          <span className="text-lg font-semibold tracking-tight text-transit-navy">
            Simple<span className="text-signal-blue">Ticket</span>
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-transit-navy/70">
          <Link href="/client/trips" className="hover:text-transit-navy">
            Search Trips
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-transit-navy px-4 py-2 text-white hover:bg-transit-navy/90"
          >
            Log In
          </Link>
        </nav>
      </header>

      {/* Route-line signature, sits behind hero content */}
      <svg
        className="pointer-events-none absolute right-[-60px] top-32 z-0 hidden w-[560px] opacity-[0.35] md:block"
        viewBox="0 0 560 200"
        fill="none"
      >
        <path
          d="M20 160 C 160 160, 180 40, 320 40 S 500 160, 540 160"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
        <circle cx="20" cy="160" r="6" fill="#0F172A" />
        <circle cx="540" cy="160" r="6" fill="#2563EB" />
      </svg>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="mb-4 inline-flex items-center rounded-full bg-signal-blue/10 px-3 py-1 text-xs font-medium text-signal-blue">
          Origin to destination, sorted in one search
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-transit-navy sm:text-6xl">
          Plan your trip.<br />
          <span className="text-signal-blue">Book your seat.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-transit-navy/70">
          Search available routes, pick your seat from a live map, and get a
          ticket with a scannable code — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/client/trips"
            className="rounded-md bg-signal-blue px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Search Trips
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-transit-navy/15 bg-white px-6 py-3 text-sm font-medium text-transit-navy hover:bg-slate-50"
          >
            Log In
          </Link>
        </div>

        {/* Feature row — maps to 1.1 / 1.2 / 1.3 */}
        <div className="mt-20 grid w-full max-w-4xl gap-6 text-left sm:grid-cols-3">
          {[
            {
              title: "Search & Filter",
              desc: "Enter origin, destination, and date to see matching trips instantly.",
            },
            {
              title: "Pick Your Seat",
              desc: "Choose from a live seat map and enter passenger details in seconds.",
            },
            {
              title: "Get Your Ticket",
              desc: "Receive a receipt and a scannable QR code — no printing required.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-transit-navy/10 bg-white p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-transit-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-transit-navy/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}