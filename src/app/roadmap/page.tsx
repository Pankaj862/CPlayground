import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";

const PHASES = [
  {
    status: "Completed",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
    title: "Phase 1: Foundation (Current)",
    description: "Build robust backend synchronization utilities, database models, credentials authentication, and a responsive frontend landing layout.",
  },
  {
    status: "In Progress",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    title: "Phase 2: Analytics Dashboard",
    description: "Create user dashboard interfaces displaying rating history curves, Codeforces submission breakdown heatmaps, and error classification filters.",
  },
  {
    status: "Planned",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Phase 3: Community & Recruitment",
    description: "Launch public profile portfolios allowing competitive programmers to bundle their rating trajectory into recruitment-ready job profiles.",
  },
];

export default function RoadmapPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-semibold text-[#FF6B00] mb-3">
                Feature Roadmap
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900">
                CPlayground Feature Pipeline
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Discover what the core developers are planning and releasing next.
              </p>
            </div>

            <div className="relative border-l border-gray-100 pl-6 space-y-10 mb-10">
              {PHASES.map((phase) => (
                <div key={phase.title} className="relative">
                  {/* Timeline dot */}
                  <span 
                    className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border bg-white flex items-center justify-center border-gray-200"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                  </span>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-base font-bold text-gray-900">
                      {phase.title}
                    </h2>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${phase.badgeColor}`}>
                      {phase.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-8 flex justify-start items-center">
              <Link href="/">
                <Button variant="outline" size="sm">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
