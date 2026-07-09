const STATS = [
  {
    value: "500k+",
    label: "Submissions Analyzed",
    description: "Processing data from across the globe in real-time.",
  },
  {
    value: "25ms",
    label: "Data Latency",
    description: "High performance engine built for elite programmers.",
  },
  {
    value: "12k+",
    label: "Active Candidates",
    description: "From Expert to Legendary Grandmaster rankings.",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="relative">
              {/* Divider between stats on desktop */}
              {i > 0 && (
                <div
                  className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gray-100"
                  aria-hidden="true"
                />
              )}
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-5xl font-extrabold text-[#FF6B00] tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="block text-sm font-semibold text-gray-900 mb-1">
                  {stat.label}
                </span>
                <span className="block text-sm text-gray-500">
                  {stat.description}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
