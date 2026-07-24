import type { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

const RANK_COLORS: Record<string, string> = {
  Newbie: "text-gray-500",
  Pupil: "text-green-600",
  Specialist: "text-cyan-600",
  Expert: "text-blue-600",
  "Candidate Master": "text-violet-600",
  Master: "text-orange-500",
  "International Master": "text-orange-600",
  Grandmaster: "text-red-500",
  "International Grandmaster": "text-red-600",
  "Legendary Grandmaster": "text-red-700",
};

export default function StatsCards({ stats }: StatsCardsProps) {
  const rankColor = RANK_COLORS[stats.currentRank] ?? "text-orange-500";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in">
      {/* Card 1: Current Rating */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">
          Current Rating
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold text-gray-900">{stats.currentRating}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-orange-50 ${rankColor}`}>
            {stats.currentRank}
          </span>
        </div>
        <p className="mt-3 text-xs text-gray-400">Current Codeforces rating</p>
      </div>

      {/* Card 2: Max Rating */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">
          Max Rating
        </p>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold text-gray-900">{stats.maxRating}</span>
          <span className="text-xs font-semibold text-gray-400">Peak Performance</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-gray-400">Peak performance</span>
        </div>
      </div>

      {/* Card 3: Total Contests */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">
          Total Contests
        </p>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold text-gray-900">{stats.totalContests}</span>
          <span className="text-xs font-semibold text-gray-400">Participated</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span className="text-xs text-gray-400">Participated</span>
        </div>
      </div>

      {/* Card 4: Problems Solved */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">
          Problems Solved
        </p>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-3xl font-extrabold text-[#FF6B00]">{stats.problemsSolved}</span>
          <span className="text-base font-semibold text-gray-400">solved</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-xs text-gray-400">Across all submissions</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">Total Submissions</p>
        <div className="flex items-baseline gap-2 mb-2"><span className="text-3xl font-extrabold text-gray-900">{stats.totalSubmissions}</span><span className="text-xs font-semibold text-gray-400">Submitted</span></div>
        <p className="mt-3 text-xs text-gray-400">Codeforces attempts</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-3">Success Rate</p>
        <div className="flex items-baseline gap-2 mb-2"><span className="text-3xl font-extrabold text-[#FF6B00]">{stats.successRate}%</span><span className="text-xs font-semibold text-gray-400">Accepted</span></div>
        <p className="mt-3 text-xs text-gray-400">Of all submissions</p>
      </div>
    </div>
  );
}
