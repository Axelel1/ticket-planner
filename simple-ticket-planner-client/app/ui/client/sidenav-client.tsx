"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, MagnifyingGlassIcon, ClockIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/client", icon: HomeIcon },
  { name: "Search Trips", href: "/client/trips", icon: MagnifyingGlassIcon },
  { name: "History", href: "/client/history", icon: ClockIcon },
];

export default function PassengerSideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col border-r border-slate-200 bg-blue-bg px-3 py-4">
      <Link href="/client" className="mb-6 flex items-center gap-2 px-2">
        <span className="h-2.5 w-2.5 rounded-full bg-signal-blue" />
        <span className="text-lg font-semibold tracking-tight text-white">
          Simple<span className="text-signal-blue">Ticket</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[44px] w-full items-center gap-2 rounded-md px-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white",
                  { 'bg-signal-blue/15 text-white': isActive },
              )}
            >
              <Icon className={clsx('w-5', { 'text-signal-blue': isActive })} />
              <span className="text-white">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 pt-3">
        <Link
          href="/client/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-white/5 hover:text-transit-navy"
        >
          <UserCircleIcon className="w-6 text-white" />
          <span className="text-white ">Juan Dela Cruz</span>
        </Link>
        <button className="mt-1 flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-status-cancelled text-white">
          Log Out
        </button>
      </div>
    </div>
  );
}