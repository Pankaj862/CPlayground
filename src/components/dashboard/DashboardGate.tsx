"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import StatsCards from "@/components/dashboard/cards/StatsCards";
import ProfileCard from "@/components/dashboard/sections/ProfileCard";
import RatingChart from "@/components/dashboard/charts/RatingChart";
import SuccessRate from "@/components/dashboard/charts/SuccessRate";
import ActivityHeatmap from "@/components/dashboard/charts/ActivityHeatmap";
import RecentSubmissions from "@/components/dashboard/sections/RecentSubmissions";
import TopicMastery from "@/components/dashboard/sections/TopicMastery";
import Timeline from "@/components/dashboard/sections/Timeline";
import DashboardSkeleton from "@/components/dashboard/skeletons/DashboardSkeleton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { ActivityDay, DashboardProfile, DashboardStats, DashboardSubmission, RatingPoint, SuccessRateData, SubmissionVerdict } from "@/types/dashboard";

type ApiProfile = Partial<DashboardProfile>;
type ApiContest = { contestName?: string; contestDate?: string; newRating?: number };
type ApiSubmission = { _id?: string; contestId?: number; problemId?: string; problemName?: string; programmingLanguage?: string; verdict?: string; solvedAt?: string };
type DashboardData = { profile: DashboardProfile; stats: DashboardStats; ratingHistory: RatingPoint[]; submissions: DashboardSubmission[]; activity: ActivityDay[]; successRate: SuccessRateData };

const TOPICS = [{ name: "Dynamic Programming", count: 142, featured: true }, { name: "Greedy", count: 98 }, { name: "Math", count: 87 }, { name: "Graphs", count: 76 }, { name: "Trees", count: 45 }, { name: "Binary Search", count: 32 }];
const TIMELINE = [{ id: "tl-1", type: "trophy" as const, title: "1st Place in Global Coding Challenge", timeAgo: "2 days ago" }, { id: "tl-2", type: "solve" as const, title: 'Solved "Max Flow on DAG" (Hard)', timeAgo: "4 days ago" }, { id: "tl-3", type: "social" as const, title: "Reached 2000+ followers", timeAgo: "1 week ago" }];
const VERDICTS: Record<string, SubmissionVerdict> = { OK: "Accepted", WRONG_ANSWER: "Wrong Answer", TIME_LIMIT_EXCEEDED: "TLE", MEMORY_LIMIT_EXCEEDED: "MLE", RUNTIME_ERROR: "RE", COMPILATION_ERROR: "CE" };

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.success === false) throw new Error(body.message || "Something went wrong. Please try again.");
  return body as T;
}

function relativeTime(value?: string) {
  const time = value ? new Date(value).getTime() : NaN;
  if (Number.isNaN(time)) return "Recently";
  const minutes = Math.max(0, Math.floor((Date.now() - time) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function activityFrom(submissions: ApiSubmission[]): ActivityDay[] {
  const counts = new Map<string, number>();
  submissions.forEach(({ solvedAt }) => { if (solvedAt) { const key = new Date(solvedAt).toISOString().slice(0, 10); counts.set(key, (counts.get(key) ?? 0) + 1); } });
  return Array.from({ length: 365 }, (_, index) => { const day = new Date(); day.setHours(0, 0, 0, 0); day.setDate(day.getDate() - 364 + index); const date = day.toISOString().slice(0, 10); return { date, count: counts.get(date) ?? 0 }; });
}

function ConnectCodeforces({ onConnected }: { onConnected: () => Promise<void> }) {
  const [handle, setHandle] = useState("");
  const [progress, setProgress] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const connect = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!handle.trim()) { setNotice({ kind: "error", message: "Enter your Codeforces handle to continue." }); return; }
    try {
      setProgress("Connecting your Codeforces account..."); await request("/api/connect/codeforces", { method: "POST", body: JSON.stringify({ handle }) });
      setProgress("Syncing your profile..."); await request("/api/sync/codeforces/profile", { method: "POST" });
      setProgress("Syncing your contest history..."); await request("/api/sync/codeforces/contests", { method: "POST" });
      setProgress("Syncing your submissions..."); await request("/api/sync/codeforces/sumbissions", { method: "POST" });
      setProgress("Loading your dashboard..."); await onConnected();
      setNotice({ kind: "success", message: "Your Codeforces account is connected and synced." });
    } catch (error) { setNotice({ kind: "error", message: error instanceof Error ? error.message : "Unable to connect Codeforces." }); }
    finally { setProgress(null); }
  };
  return <main className="min-h-screen bg-[#F8F9FB] px-4 py-12 sm:flex sm:items-center sm:justify-center">
    {notice && <div role="status" className={`fixed right-4 top-4 z-50 max-w-sm rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${notice.kind === "success" ? "bg-emerald-600" : "bg-red-600"}`}>{notice.message}</div>}
    <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F7FF] text-xl font-extrabold text-[#FF6B00]">CF</div><h1 className="mt-6 text-2xl font-bold text-gray-900">Connect your Codeforces Account</h1><p className="mt-2 text-sm leading-6 text-gray-500">Connect your Codeforces account to unlock your coding analytics, rating history and contest insights.</p><form className="mt-7 space-y-5" onSubmit={connect}><Input label="Codeforces handle" placeholder="e.g. tourist" value={handle} onChange={(event) => setHandle(event.target.value)} disabled={Boolean(progress)} autoComplete="username" />{progress && <p className="flex items-center gap-2 text-xs font-medium text-gray-500"><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#FF6B00] border-t-transparent" />{progress}</p>}<Button type="submit" size="lg" fullWidth isLoading={Boolean(progress)}>{progress ? "Syncing..." : "Connect Codeforces"}</Button></form></section>
  </main>;
}

export default function DashboardGate() {
  const { status } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [checked, setChecked] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadDashboard = useCallback(async () => {
    setError(null);
    const profileResult = await request<{ connected: boolean; profile?: ApiProfile }>("/api/dashboard/profile");
    setChecked(true); setConnected(profileResult.connected); if (!profileResult.connected) return;
    const [statsResult, contestsResult, submissionsResult] = await Promise.all([
      request<{ stats: { currentRating?: number | null; maxRating?: number | null; rank?: string | null; contests?: number; solvedProblems?: number; totalSubmissions?: number; successRate?: number } }>("/api/dashboard/stats"), request<{ contests?: ApiContest[] }>("/api/dashboard/contests"), request<{ submissions?: ApiSubmission[] }>("/api/dashboard/submissions"),
    ]);
    const profile = profileResult.profile ?? {}; const stats = statsResult.stats; const raw = submissionsResult.submissions ?? [];
    const accepted = raw.filter((item) => item.verdict === "OK").length; const wrongAnswer = raw.filter((item) => item.verdict === "WRONG_ANSWER").length;
    setData({ profile: { handle: profile.handle ?? "Codeforces user", rank: profile.rank ?? "Unrated", maxRank: profile.maxRank ?? "Unrated", rating: profile.rating ?? 0, maxRating: profile.maxRating ?? 0, country: profile.country ?? "Not specified", organization: profile.organization ?? "Not specified", avatar: profile.avatar ?? "", isOnline: true }, stats: { currentRating: stats.currentRating ?? 0, currentRank: stats.rank ?? "Unrated", maxRating: stats.maxRating ?? 0, totalContests: stats.contests ?? 0, problemsSolved: stats.solvedProblems ?? 0, totalSubmissions: stats.totalSubmissions ?? 0, successRate: stats.successRate ?? 0 }, ratingHistory: (contestsResult.contests ?? []).map((contest) => ({ date: contest.contestDate ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(contest.contestDate)) : "-", rating: contest.newRating ?? 0, contestName: contest.contestName ?? "Codeforces contest" })), submissions: raw.map((submission, index) => ({ id: submission._id ?? `${submission.contestId}-${submission.problemId}-${index}`, problemName: submission.problemName ?? "Unknown problem", contestName: submission.contestId ? `Codeforces #${submission.contestId}` : "Codeforces", language: submission.programmingLanguage ?? "-", languageVersion: "", verdict: VERDICTS[submission.verdict ?? ""] ?? "CE", timeAgo: relativeTime(submission.solvedAt) })), activity: activityFrom(raw), successRate: { accepted, wrongAnswer, other: Math.max(0, raw.length - accepted - wrongAnswer) } });
  }, []);
  useEffect(() => {
    if (status === "loading") return;
    const timer = window.setTimeout(() => {
      void loadDashboard().catch((reason) => {
        setChecked(true);
        setError(reason instanceof Error ? reason.message : "Unable to load the dashboard.");
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadDashboard, status]);
  const username = useMemo(() => data?.profile.handle ?? "coder", [data]);
  if (!checked || status === "loading") return <DashboardShell username="coder" rank="" globalRank={0}><DashboardSkeleton /></DashboardShell>;
  if (error) return <DashboardShell username="coder" rank="" globalRank={0}><div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm"><h1 className="text-lg font-bold text-gray-900">We could not load your dashboard</h1><p className="mt-2 text-sm text-gray-500">{error === "Unauthorized" ? "Your session has expired. Please sign in again." : error}</p><Button className="mt-5" onClick={() => loadDashboard().catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load the dashboard."))}>Try again</Button></div></DashboardShell>;
  if (!connected) return <ConnectCodeforces onConnected={loadDashboard} />;
  if (!data) return null;
  return <DashboardShell username={username} rank={data.profile.rank} globalRank={0}><div className="mb-6 animate-fade-in"><h1 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">Welcome back, <span className="capitalize">{username}</span></h1><p className="mt-1 text-xs text-gray-500">Here is your competitive programming activity and statistics overview.</p></div><div className="grid grid-cols-1 gap-6 lg:grid-cols-3"><div className="space-y-6 lg:col-span-2"><StatsCards stats={data.stats} /><RatingChart data={data.ratingHistory} /><ActivityHeatmap data={data.activity} totalSubmissions={data.stats.totalSubmissions} /><RecentSubmissions submissions={data.submissions} /></div><div className="space-y-6"><ProfileCard profile={data.profile} username={username} /><SuccessRate data={data.successRate} /><TopicMastery topics={TOPICS} /><Timeline items={TIMELINE} /></div></div></DashboardShell>;
}
