'use client';

import { createUser } from "@/lib/actions";

export default function CreateForm() {
  return (
    <form action={createUser} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 border">
          Full Name
        </label>
        <input type="text" id="name" name="name" required placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Email Address
        </label>
        <input type="email" id="email" name="email"
          required placeholder="john@example.com"
        />
      </div>

      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        type="submit">
        Create User
      </button>
    </form>
  )
}