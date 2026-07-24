"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

interface DashboardShellProps {
  children: React.ReactNode;
  username: string;
  rank: string;
  globalRank: number;
}

export default function DashboardShell({
  children,
  username,
  rank,
  globalRank,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        username={username}
        rank={rank}
        globalRank={globalRank}
      />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[200px] overflow-hidden">
        <DashboardNavbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
