import DashboardPageShell from "@/components/dashboard/layout/DashboardPageShell";

export default function DashboardPagesLayout({ children }: { children: React.ReactNode }) {
  return <DashboardPageShell>{children}</DashboardPageShell>;
}
