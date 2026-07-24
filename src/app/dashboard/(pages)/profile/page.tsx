"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/dashboard/sections/ProfileCard";
import type { DashboardProfile } from "@/types/dashboard";

export default function ProfilePage() {
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => void fetch("/api/dashboard/profile").then(async (response) => {
      const body = await response.json();
      if (!response.ok || !body.success) throw new Error(body.message || "Unable to load your profile.");
      if (!body.connected) throw new Error("Connect your Codeforces account to view your profile.");
      const item = body.profile ?? {};
      setProfile({ handle: item.handle ?? "Codeforces user", rank: item.rank ?? "Unrated", maxRank: item.maxRank ?? "Unrated", rating: item.rating ?? 0, maxRating: item.maxRating ?? 0, country: item.country ?? "Not specified", organization: item.organization ?? "Not specified", avatar: item.avatar ?? "", isOnline: true });
    }).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load your profile.")), 0);
    return () => window.clearTimeout(timer);
  }, []);
  if (error) return <Message title="Profile unavailable" message={error} />;
  if (!profile) return <Loading title="Loading profile..." />;
  return <div className="space-y-6"><PageHeading title="Profile" description="Your Codeforces account details and rating information." /><div className="max-w-md"><ProfileCard profile={profile} username={profile.handle} /></div></div>;
}

export function PageHeading({ title, description }: { title: string; description: string }) { return <div className="animate-fade-in"><h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h1><p className="mt-1 text-xs text-gray-500">{description}</p></div>; }
export function Loading({ title }: { title: string }) { return <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"><p className="text-sm text-gray-500">{title}</p></div>; }
export function Message({ title, message }: { title: string; message: string }) { return <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm"><h1 className="text-lg font-bold text-gray-900">{title}</h1><p className="mt-2 text-sm text-gray-500">{message}</p></div>; }
