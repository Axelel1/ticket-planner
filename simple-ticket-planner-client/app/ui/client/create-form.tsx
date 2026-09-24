import { createUser } from "@/lib/actions";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-transit-navy placeholder:text-slate-400 focus:border-signal-blue focus:outline-none focus:ring-2 focus:ring-signal-blue/20";

export default function CreateForm() {
  return (
    <form action={createUser} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">Name</label>
        <input name="name" type="text" required placeholder="e.g. Juan Dela Cruz" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">Email</label>
        <input name="email" type="email" required placeholder="e.g. juan@email.com" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">Phone</label>
        <input name="phone" type="tel" placeholder="e.g. 0917 123 4567" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">Password (test only)</label>
        <input name="password" type="password" required placeholder="••••••••" className={inputClass} />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-signal-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add User
      </button>
    </form>
  );
}