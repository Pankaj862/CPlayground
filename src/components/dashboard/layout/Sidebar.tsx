"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  rank: string;
  globalRank: number;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    exact: true,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Contests",
    href: "/dashboard/contests",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Submissions",
    href: "/dashboard/submissions",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose, username, rank, globalRank }: SidebarProps) {
  const pathname = usePathname();
  const initial = username?.charAt(0).toUpperCase() || "U";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed top-0 left-0 h-full z-50 w-[200px] bg-white border-r border-gray-100 flex flex-col",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:z-10",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-gray-100 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold text-sm shrink-0">
            C
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-gray-900 leading-none">CPlayground</p>
            <p className="text-[9px] text-gray-400 mt-0.5 tracking-[0.12em] uppercase">Elite Coding</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" role="navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#FF6B00] text-white shadow-sm shadow-orange-200"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800",
                ].join(" ")}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate capitalize">{username || "User"}</p>
              <p className="text-[10px] text-gray-400 truncate">
                {rank} &bull; Rank #{globalRank}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
