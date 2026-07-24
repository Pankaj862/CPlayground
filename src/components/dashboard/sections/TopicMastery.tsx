import type { TopicTag } from "@/types/dashboard";

interface TopicMasteryProps {
  topics: TopicTag[];
}

export default function TopicMastery({ topics }: TopicMasteryProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-fade-in" aria-labelledby="topic-mastery-title">
      <h2 id="topic-mastery-title" className="text-sm font-semibold text-gray-900">Topic Mastery</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic.name}
            className={topic.featured
              ? "rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-[#FF6B00]"
              : "rounded-full bg-[#F3F7FF] px-2.5 py-1 text-[10px] font-semibold text-blue-600"}
          >
            {topic.name} <span className="opacity-70">#{topic.count}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
