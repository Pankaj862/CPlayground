export interface DashboardProfile {
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

export interface DashboardStats {
  currentRating: number;
  currentRank: string;
  maxRating: number;
  totalContests: number;
  problemsSolved: number;
  totalSubmissions: number;
  successRate: number;
}

export interface RatingPoint { date: string; rating: number; contestName: string; }
export interface ActivityDay { date: string; count: number; }
export type SubmissionVerdict = "Accepted" | "Wrong Answer" | "TLE" | "MLE" | "RE" | "CE";
export interface DashboardSubmission { id: string; problemName: string; contestName: string; language: string; languageVersion: string; verdict: SubmissionVerdict; timeAgo: string; }
export interface SuccessRateData { accepted: number; wrongAnswer: number; other: number; }
export interface TopicTag { name: string; count: number; featured?: boolean; }
export interface TimelineItem { id: string; type: "trophy" | "solve" | "social"; title: string; timeAgo: string; }
