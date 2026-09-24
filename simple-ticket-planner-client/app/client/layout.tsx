import PassengerSideNav from "@/app/ui/client/sidenav-client";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-app-gradient md:flex-row">
      <div className="w-full flex-none md:w-64">
        <PassengerSideNav />
      </div>
      <div className="flex-grow p-6 md:p-10">{children}</div>
    </div>
  );
}