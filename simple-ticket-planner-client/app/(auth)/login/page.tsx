import Link from "next/link";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-transit-navy placeholder:text-slate-400 focus:border-signal-blue focus:outline-none focus:ring-2 focus:ring-signal-blue/20";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-gradient px-6">
      {/* Route-line signature, consistent with homepage / client portal */}
      <svg
        className="pointer-events-none absolute right-[-80px] top-[-40px] z-0 hidden w-[520px] opacity-[0.3] md:block"
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

      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-blue" />
          <span className="text-lg font-semibold tracking-tight text-transit-navy">
            Simple<span className="text-signal-blue">Ticket</span>
          </span>
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-transit-navy">Log in</h1>
          <p className="mt-1 text-sm text-slate-500">Access your bookings and tickets.</p>

          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-transit-navy">
                Email
              </label>
              <input id="email" name="email" type="email" placeholder="e.g. juan@email.com" className={inputClass} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-transit-navy">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-signal-blue hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <input id="password" name="password" type="password" placeholder="••••••••" className={inputClass} />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-signal-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-transit-navy hover:bg-slate-50">
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-signal-blue hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}