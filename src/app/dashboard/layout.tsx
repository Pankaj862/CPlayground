import type { Metadata } from "next";
import AuthProvider from "@/components/dashboard/layout/SessionProvider";

export const metadata: Metadata = {
  title: "Dashboard - CPlayground",
  description: "CPlayground Elite Coding Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F8F9FB]">{children}</div>
    </AuthProvider>
  );
}
