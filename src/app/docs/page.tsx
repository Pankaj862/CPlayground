import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-semibold text-[#FF6B00] mb-2">
                  Knowledge Base
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  CPlayground Documentation
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Learn how CPlayground syncs, aggregates, and graphs your competitive programming rounds.
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm" className="self-start md:self-auto">
                  ← Back to Home
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sidebar/Contents index */}
              <nav className="space-y-6" aria-label="Documentation navigation">
                <div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Getting Started
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li><span className="text-[#FF6B00] font-semibold">Introduction</span></li>
                    <li><span className="hover:text-gray-900 cursor-not-allowed">Account setup</span></li>
                    <li><span className="hover:text-gray-900 cursor-not-allowed">Connecting Codeforces</span></li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Analytics Guides
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li><span className="hover:text-gray-900 cursor-not-allowed">Submission heatmaps</span></li>
                    <li><span className="hover:text-gray-900 cursor-not-allowed">Error category insights</span></li>
                    <li><span className="hover:text-gray-900 cursor-not-allowed">Contest rating charts</span></li>
                  </ul>
                </div>
              </nav>

              {/* Main content pane */}
              <div className="md:col-span-2 space-y-6 text-gray-600 text-sm leading-relaxed">
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 text-[#FF6B00] text-xs font-semibold mb-6 flex items-center gap-2.5">
                  <span className="animate-pulse">⏳</span>
                  <span>Full detailed documentation suite is currently being finalized. Check back soon!</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  How does the sync mechanism work?
                </h3>
                <p>
                  CPlayground tracks Codeforces athletes by fetching public API data exposed directly by the official Codeforces servers.
                </p>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    <strong>Identify Handle:</strong> Once registered, you will connect your Codeforces handle in the dashboard.
                  </li>
                  <li>
                    <strong>Import Submissions:</strong> We parse and index all historical submissions, mapping error categories (such as Time Limit Exceeded, Memory Limit Exceeded, Runtime Error, or Wrong Answer).
                  </li>
                  <li>
                    <strong>Calculate Growth:</strong> Mongoose processes these submissions, grouping solve statistics and calculating rating deltas, giving you visual feedback on exactly which tags (e.g. Dynamic Programming, Graphs) you excel or struggle with.
                  </li>
                </ol>

                <h3 className="text-lg font-bold text-gray-900 pt-4">
                  Do you store source code?
                </h3>
                <p>
                  No. CPlayground only saves metadata about submissions (language, rating, tags, verdicts, solved timestamp) and contest performance statistics (rating, rank, delta changes). Your source files remain secure on Codeforces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
