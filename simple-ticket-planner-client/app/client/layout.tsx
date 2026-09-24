import PassengerSideNav from "@/app/ui/client/sidenav-client";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-app-gradient md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <PassengerSideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-10">{children}</div>
    </div>
  );
}