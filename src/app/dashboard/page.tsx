"use client";

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
import {
  mockProfile,
  mockStats,
  mockRatingHistory,
  mockSuccessRate,
  mockActivityLog,
  mockSubmissions,
  mockTimeline,
  mockTopics,
} from "@/data/mockDashboardData";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return (
      <DashboardShell username="coder" rank={mockProfile.rank} globalRank={1242}>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  const username = session?.user?.name || session?.user?.email?.split("@")[0] || "coder";
  const rank = mockProfile.rank;
  const globalRank = 1242; // Mock global rank for indicators

  return (
    <DashboardShell username={username} rank={rank} globalRank={globalRank}>
      {/* Welcome Section */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl flex items-center gap-2">
          Welcome back, <span className="capitalize">{username}</span> 👋
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Here is your competitive programming activity and statistics overview.
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Stats & Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards Row */}
          <StatsCards stats={mockStats} />

          {/* Rating Progress Chart */}
          <RatingChart data={mockRatingHistory} />

          {/* Activity Log (Heatmap) */}
          <ActivityHeatmap data={mockActivityLog} totalSubmissions={2412} />

          <RecentSubmissions submissions={mockSubmissions} />
        </div>

        {/* Right 1 Column: Profile & Mastery */}
        <div className="space-y-6">
          {/* Profile Card */}
          <ProfileCard profile={mockProfile} username={username} />

          {/* Success Rate Chart */}
          <SuccessRate data={mockSuccessRate} />

          <TopicMastery topics={mockTopics} />

          <Timeline items={mockTimeline} />
        </div>
      </div>
    </DashboardShell>
  );
}
