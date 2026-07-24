import type { TimelineItem } from "@/data/mockDashboardData";

interface TimelineProps {
  items: TimelineItem[];
}

const ICONS: Record<TimelineItem["type"], React.ReactNode> = {
  trophy: <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4m5-16H5v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5ZM8 5V3h8v2" />,
  solve: <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />,
  social: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19a6 6 0 0 0-12 0m18 0a6 6 0 0 0-4.5-5.8M9 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-7a4 4 0 0 1 0 7" />,
};

const ICON_COLORS: Record<TimelineItem["type"], string> = {
  trophy: "bg-orange-100 text-[#FF6B00]",
  solve: "bg-orange-50 text-orange-500",
  social: "bg-blue-50 text-blue-500",
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-fade-in" aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="text-sm font-semibold text-gray-900">Timeline</h2>
      <ol className="mt-4 space-y-4">
        {items.map((item, index) => (
          <li key={item.id} className="relative flex gap-3">
            {index < items.length - 1 && <span className="absolute left-[9px] top-5 h-[calc(100%+4px)] w-px bg-gray-100" aria-hidden="true" />}
            <span className={`z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full ${ICON_COLORS[item.type]}`}>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                {ICONS[item.type]}
              </svg>
            </span>
            <div className="min-w-0 pb-0.5">
              <p className="text-[11px] font-semibold leading-4 text-gray-800">{item.title}</p>
              <p className="mt-0.5 text-[10px] text-gray-400">{item.timeAgo}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
