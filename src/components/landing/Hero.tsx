import Link from "next/link";
import Button from "@/components/ui/Button";

const RATING_BARS = [65, 45, 72, 58, 80, 62, 90, 76];

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-white overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,107,0,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
          {/* ── Left: Copy ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-xs font-semibold text-[#FF6B00] mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"
                aria-hidden="true"
              />
              Codeforces Analytics Platform
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-gray-900">
              Level Up Your{" "}
              <span className="text-[#FF6B00]">Competitive</span>{" "}
              Programming Journey
            </h1>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              A unified analytics platform for Codeforces athletes. Track your
              rating trajectory, identify weak spots in your problem set, and
              optimize contest performance with deep data insights.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/sign-up">
                <Button size="lg" variant="primary">
                  Get Started
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Trust pills */}
            <ul className="mt-10 flex flex-wrap items-center gap-5 justify-center lg:justify-start text-sm text-gray-500">
              {["Free to start", "No credit card", "Real-time sync"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-green-500 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ── Right: Dashboard Mockup ── */}
          <div className="mt-16 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-green-400" aria-hidden="true" />
                  <span className="ml-auto text-xs text-gray-400 font-mono tracking-tight">
                    cplayground.dev
                  </span>
                </div>

                {/* Top stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="text-xs text-gray-500 mb-1">Contest Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      1942{" "}
                      <span className="text-sm font-semibold text-green-500">
                        +48
                      </span>
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Global Rank</p>
                    <p className="text-2xl font-bold text-gray-900">#4,201</p>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="mb-5">
                  <p className="text-xs text-gray-500 mb-3 font-medium">
                    Rating History — Last 8 Contests
                  </p>
                  <div
                    className="flex items-end gap-1.5 h-20"
                    role="img"
                    aria-label="Bar chart showing rating history over last 8 contests"
                  >
                    {RATING_BARS.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col justify-end rounded-t"
                      >
                        <div
                          className={`w-full rounded-t transition-all duration-500 ${
                            i === 6
                              ? "bg-[#FF6B00]"
                              : i === RATING_BARS.length - 1
                              ? "bg-orange-300"
                              : "bg-orange-100"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs text-gray-400">Rd. 1</span>
                    <span className="text-xs text-gray-400">Rd. 8</span>
                  </div>
                </div>

                {/* Bottom micro stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">148</p>
                    <p className="text-xs text-gray-400">Solved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">23</p>
                    <p className="text-xs text-gray-400">Contests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#FF6B00]">Expert</p>
                    <p className="text-xs text-gray-400">Division</p>
                  </div>
                </div>
              </div>

              {/* Floating badge — streak */}
              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2.5"
                aria-hidden="true"
              >
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-xs font-semibold text-gray-900 leading-tight">
                    7-Day Streak
                  </p>
                  <p className="text-xs text-gray-500">Keep it up!</p>
                </div>
              </div>

              {/* Floating badge — rating gain */}
              <div
                className="absolute -top-4 -right-4 bg-[#FF6B00] rounded-xl shadow-lg px-4 py-3 text-white"
                aria-hidden="true"
              >
                <p className="text-xs font-bold leading-tight">+12 Rating</p>
                <p className="text-xs opacity-80">Last contest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
