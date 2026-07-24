import Link from "next/link";
import type { Submission } from "@/data/mockDashboardData";

interface RecentSubmissionsProps {
  submissions: Submission[];
}

const VERDICT_STYLES: Record<Submission["verdict"], { label: string; className: string }> = {
  Accepted: { label: "Accepted", className: "text-emerald-600" },
  "Wrong Answer": { label: "Wrong Answer", className: "text-red-500" },
  TLE: { label: "TLE", className: "text-violet-600" },
  MLE: { label: "MLE", className: "text-amber-600" },
  RE: { label: "RE", className: "text-rose-600" },
  CE: { label: "CE", className: "text-gray-500" },
};

function VerdictIcon({ verdict }: { verdict: Submission["verdict"] }) {
  if (verdict === "Accepted") {
    return (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export default function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm animate-fade-in" aria-labelledby="recent-submissions-title">
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
        <h2 id="recent-submissions-title" className="text-sm font-semibold text-gray-900">Recent Submissions</h2>
        <Link href="/dashboard/submissions" className="text-xs font-semibold text-[#FF6B00] transition-colors hover:text-[#e55e00]">
          View all
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[590px] text-left">
          <thead className="bg-[#F3F7FF] text-[9px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-3 font-bold sm:px-6">Problem</th>
              <th className="px-3 py-3 font-bold">Language</th>
              <th className="px-3 py-3 font-bold">Verdict</th>
              <th className="px-5 py-3 font-bold sm:px-6">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submissions.map((submission) => {
              const verdict = VERDICT_STYLES[submission.verdict];
              const language = submission.languageVersion
                ? `${submission.language} ${submission.languageVersion}`
                : submission.language;

              return (
                <tr key={submission.id} className="transition-colors hover:bg-gray-50/70">
                  <td className="px-5 py-3 sm:px-6">
                    <p className="text-xs font-semibold text-gray-900">{submission.problemName}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">{submission.contestName}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">{language}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`flex items-center gap-1 text-[10px] font-semibold ${verdict.className}`}>
                      <VerdictIcon verdict={submission.verdict} />
                      {verdict.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[10px] text-gray-500 sm:px-6">{submission.timeAgo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link href="/dashboard/submissions" className="block border-t border-gray-100 px-6 py-3 text-center text-[10px] font-semibold text-[#FF6B00] transition-colors hover:bg-orange-50">
        View All Submissions
      </Link>
    </section>
  );
}
