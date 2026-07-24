/**
 * CPlayground Mock Dashboard Data
 *
 * Centralized mock data for the dashboard UI.
 * Each section is clearly marked with the future API it will replace.
 *
 * API Integration Plan:
 *   GET /api/dashboard/profile     -> profile, stats, timeline
 *   GET /api/dashboard/contests    -> ratingHistory
 *   GET /api/dashboard/submissions -> activityLog, recentSubmissions, successRate
 *   GET /api/dashboard/analytics   -> topicMastery
 */

export interface ProfileData {
  handle: string;
  rank: string;
  maxRank: string;
  rating: number;
  maxRating: number;
  country: string;
  organization: string;
  avatar: string;
  isOnline: boolean;
}

export interface StatsData {
  currentRating: number;
  currentRank: string;
  ratingProgress: number;
  maxRating: number;
  globalPercentile: string;
  totalContests: number;
  nextBadgeAt: number;
  problemsSolved: number;
  totalProblems: number;
  solvedThisWeek: number;
}

export interface RatingPoint {
  date: string;
  rating: number;
  contestName: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}

export interface Submission {
  id: string;
  problemName: string;
  contestName: string;
  language: string;
  languageVersion: string;
  verdict: "Accepted" | "Wrong Answer" | "TLE" | "MLE" | "RE" | "CE";
  timeAgo: string;
}

export interface TopicTag {
  name: string;
  count: number;
  featured?: boolean;
}

export interface TimelineItem {
  id: string;
  type: "trophy" | "solve" | "social";
  title: string;
  timeAgo: string;
}

export interface SuccessRateData {
  accepted: number;
  wrongAnswer: number;
  other: number;
}

// TODO: Replace with GET /api/dashboard/profile
export const mockProfile: ProfileData = {
  handle: "@pankaj_codes",
  rank: "Master",
  maxRank: "Master",
  rating: 2150,
  maxRating: 2300,
  country: "India",
  organization: "IIT Delhi",
  avatar: "",
  isOnline: true,
};

// TODO: Replace with GET /api/dashboard/profile
export const mockStats: StatsData = {
  currentRating: 2150,
  currentRank: "Master",
  ratingProgress: 72,
  maxRating: 2300,
  globalPercentile: "Top 2%",
  totalContests: 42,
  nextBadgeAt: 50,
  problemsSolved: 856,
  totalProblems: 1200,
  solvedThisWeek: 12,
};

// TODO: Replace with GET /api/dashboard/contests
export const mockRatingHistory: RatingPoint[] = [
  { date: "2024-01", rating: 1650, contestName: "Codeforces Round #850" },
  { date: "2024-02", rating: 1720, contestName: "Educational Round 145" },
  { date: "2024-03", rating: 1680, contestName: "Codeforces Round #855" },
  { date: "2024-04", rating: 1800, contestName: "Educational Round 148" },
  { date: "2024-05", rating: 1750, contestName: "Codeforces Round #860" },
  { date: "2024-06", rating: 1900, contestName: "Global Round 25" },
  { date: "2024-07", rating: 1860, contestName: "Codeforces Round #863" },
  { date: "2024-08", rating: 2050, contestName: "Educational Round 155" },
  { date: "2024-09", rating: 1980, contestName: "Codeforces Round #868" },
  { date: "2024-10", rating: 2100, contestName: "Global Round 27" },
  { date: "2024-11", rating: 2050, contestName: "Educational Round 160" },
  { date: "2024-12", rating: 2150, contestName: "Codeforces Round #875" },
  { date: "2025-01", rating: 2200, contestName: "Educational Round 162" },
  { date: "2025-02", rating: 2180, contestName: "Codeforces Round #878" },
  { date: "2025-03", rating: 2250, contestName: "Global Round 28" },
  { date: "2025-04", rating: 2200, contestName: "Codeforces Round #882" },
  { date: "2025-05", rating: 2280, contestName: "Educational Round 165" },
  { date: "2025-06", rating: 2300, contestName: "Global Round 30" },
  { date: "2025-07", rating: 2260, contestName: "Codeforces Round #889" },
  { date: "2025-08", rating: 2150, contestName: "Educational Round 168" },
];

// TODO: Replace with GET /api/dashboard/submissions
function buildMockActivity(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const base = new Date("2025-08-01");
  for (let i = 364; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const r = Math.random();
    let count = 0;
    if (r > 0.55) count = Math.floor(Math.random() * 3) + 1;
    if (r > 0.80) count = Math.floor(Math.random() * 5) + 3;
    if (r > 0.93) count = Math.floor(Math.random() * 8) + 6;
    days.push({ date: dateStr, count });
  }
  return days;
}
export const mockActivityLog: ActivityDay[] = buildMockActivity();

// TODO: Replace with GET /api/dashboard/analytics
export const mockSuccessRate: SuccessRateData = {
  accepted: 642,
  wrongAnswer: 165,
  other: 49,
};

// TODO: Replace with GET /api/dashboard/submissions
export const mockSubmissions: Submission[] = [
  {
    id: "sub-1",
    problemName: "C. Minimalist Grid Paths",
    contestName: "Codeforces Round #912 (Div 2)",
    language: "C++",
    languageVersion: "23",
    verdict: "Accepted",
    timeAgo: "2 mins ago",
  },
  {
    id: "sub-2",
    problemName: "B. XOR Distance Optimization",
    contestName: "Educational Round 160",
    language: "Rust",
    languageVersion: "",
    verdict: "Wrong Answer",
    timeAgo: "15 mins ago",
  },
  {
    id: "sub-3",
    problemName: "D. Flow through the Matrix",
    contestName: "CSES Problemset",
    language: "C++",
    languageVersion: "23",
    verdict: "TLE",
    timeAgo: "1 hour ago",
  },
];

// TODO: Replace with GET /api/dashboard/analytics
export const mockTopics: TopicTag[] = [
  { name: "Dynamic Programming", count: 142, featured: true },
  { name: "Greedy", count: 98 },
  { name: "Math", count: 87 },
  { name: "Graphs", count: 76 },
  { name: "Trees", count: 45 },
  { name: "Binary Search", count: 32 },
];

// TODO: Replace with GET /api/dashboard/profile
export const mockTimeline: TimelineItem[] = [
  {
    id: "tl-1",
    type: "trophy",
    title: "1st Place in Global Coding Challenge",
    timeAgo: "2 days ago",
  },
  {
    id: "tl-2",
    type: "solve",
    title: 'Solved "Max Flow on DAG" (Hard)',
    timeAgo: "4 days ago",
  },
  {
    id: "tl-3",
    type: "social",
    title: "Reached 2000+ followers",
    timeAgo: "1 week ago",
  },
];
