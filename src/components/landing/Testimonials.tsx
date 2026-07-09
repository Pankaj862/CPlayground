const TESTIMONIALS = [
  {
    name: "Alex Chen",
    title: "Candidate Master",
    initials: "AC",
    color: "bg-blue-500",
    stars: 5,
    quote:
      "The submission insights helped me realize I was wasting too much time on DP problems. My rating shot up after following the CPlayground roadmap.",
  },
  {
    name: "Sarah J.",
    title: "International Master",
    initials: "SJ",
    color: "bg-purple-500",
    stars: 5,
    quote:
      "The platform is perfect for all my job applications. Clients are amazed by the insights provided by the level of data in my contest history.",
  },
  {
    name: "Marcus Weber",
    title: "Grandmaster",
    initials: "MW",
    color: "bg-green-600",
    stars: 5,
    quote:
      "Best platform for tracking rating changes across multiple contest platforms. The UI is incredibly clean compared to legacy sites.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-[#FF6B00]" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#FF6B00] uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by the Community
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-200 flex flex-col"
            >
              {/* Author */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`${t.color} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title}</p>
                </div>
              </div>

              <StarRating count={t.stars} />

              <p className="mt-4 text-sm text-gray-600 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
