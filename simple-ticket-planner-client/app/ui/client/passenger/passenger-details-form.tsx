const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-transit-navy placeholder:text-slate-400 focus:border-signal-blue focus:outline-none focus:ring-2 focus:ring-signal-blue/20";

export default function PassengerDetailsForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">Full Name</label>
        <input name="fullName" type="text" placeholder="e.g. Juan Dela Cruz" className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Contact Number</label>
          <input name="phone" type="tel" placeholder="e.g. 0917 123 4567" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Email</label>
          <input name="email" type="email" placeholder="e.g. juan@email.com" className={inputClass} />
        </div>
      </div>
    </div>
  );
}