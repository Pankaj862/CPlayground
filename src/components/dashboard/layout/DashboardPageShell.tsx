"use client";

import { useEffect, useState } from "react";
import DashboardShell from "./DashboardShell";
import DashboardSkeleton from "@/components/dashboard/skeletons/DashboardSkeleton";

interface ProfileResponse {
  success: boolean;
  connected: boolean;
  profile?: { handle?: string; rank?: string };
  message?: string;
}

export default function DashboardPageShell({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetch("/api/dashboard/profile")
        .then(async (response) => {
          const body = (await response.json()) as ProfileResponse;
          if (!response.ok || !body.success) throw new Error(body.message || "Unable to load your account.");
          setProfile(body);
        })
        .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load your account."));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!profile && !error) return <DashboardShell username="coder" rank="" globalRank={0}><DashboardSkeleton /></DashboardShell>;

  const username = profile?.profile?.handle ?? "coder";
  const rank = profile?.profile?.rank ?? "";
  return <DashboardShell username={username} rank={rank} globalRank={0}>
    {error ? <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm"><h1 className="text-lg font-bold text-gray-900">We could not load your account</h1><p className="mt-2 text-sm text-gray-500">{error}</p></div> : children}
  </DashboardShell>;
}
