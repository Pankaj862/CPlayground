const BULLETS = [
  {
    title: "Integrated History",
    description:
      "Every submission comes in one view, not your source context across scattered pages.",
  },
  {
    title: "Weakness Detection",
    description:
      "Automatically flags bugs, Dynamic Programming hotspots that drop your rating.",
  },
  {
    title: "Portfolio Builder",
    description:
      "Contest bundles are the thing ready-able to leaderboard.",
  },
];

const CODE_LINES = [
  { indent: 0, content: "if (performance < benchmark) {", color: "text-orange-400" },
  { indent: 1, content: "analyze_weakness();", color: "text-green-400" },
  { indent: 1, content: "track_delta(rating);", color: "text-blue-400" },
  { indent: 0, content: "}", color: "text-orange-400" },
  { indent: 0, content: "", color: "" },
  { indent: 0, content: "// Auto-sync with Codeforces", color: "text-gray-500" },
  { indent: 0, content: "cf.sync(handle, realtime=true);", color: "text-purple-400" },
];

export default function WhySection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
          {/* ── Left: Copy ── */}
          <div className="mb-14 lg:mb-0">
            <p className="text-sm font-semibold text-[#FF6B00] uppercase tracking-widest mb-3">
              Why CPlayground?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why choose{" "}
              <span className="text-[#FF6B00]">CPlayground</span>?
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Standard contest sites provide the data, but we provide the{" "}
              <strong className="text-gray-900 font-semibold">strategy</strong>.
              CPlayground turns raw statistics into actionable learning paths.
            </p>

            <ul className="space-y-7">
              {BULLETS.map((bullet, i) => (
                <li key={bullet.title} className="flex gap-4">
                  <div
                    className="shrink-0 w-8 h-8 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center text-xs font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {bullet.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {bullet.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: Code mockup ── */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              {/* Terminal header */}
              <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
                <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
                <span className="ml-3 text-xs text-gray-400 font-mono">
                  The Modern Way to Code
                </span>
              </div>

              {/* Code body */}
              <div
                className="bg-[#0d1117] p-6 font-mono text-sm leading-7"
                role="img"
                aria-label="Code snippet demonstrating CPlayground API usage"
              >
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                  >
                    <span className={line.color || "text-gray-300"}>
                      {line.content || "\u00A0"}
                    </span>
                  </div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center mt-1 pl-0">
                  <span className="text-gray-300">{">"}&nbsp;</span>
                  <span className="inline-block w-2 h-4 bg-[#FF6B00] animate-pulse" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
