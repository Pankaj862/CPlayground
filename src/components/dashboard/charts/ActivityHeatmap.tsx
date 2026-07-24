import type { ActivityDay } from "@/data/mockDashboardData";

interface ActivityHeatmapProps {
  data: ActivityDay[];
  totalSubmissions?: number;
}

function getCellColor(count: number): string {
  if (count === 0) return "#efefef";
  if (count <= 2) return "#fde8d0";
  if (count <= 5) return "#fdba74";
  if (count <= 9) return "#f97316";
  return "#c2410c";
}

export default function ActivityHeatmap({ data, totalSubmissions = 2412 }: ActivityHeatmapProps) {
  if (data.length === 0) return null;

  const firstDate = new Date(data[0].date);
  const startDay = firstDate.getDay();
  const padded: (ActivityDay | null)[] = [...Array(startDay).fill(null), ...data];
  while (padded.length % 7 !== 0) padded.push(null);

  const weeks: (ActivityDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));

  const LEGEND_VALS = [0, 2, 5, 9, 12];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <h2 className="text-sm font-semibold text-gray-900">Activity Log</h2>
        </div>
        <span className="text-xs text-gray-400">{totalSubmissions.toLocaleString()} submissions in the last year</span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px] min-w-fit">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={day ? `${day.date}: ${day.count}` : ""}
                  className="w-[11px] h-[11px] rounded-[2px] hover:opacity-75 transition-opacity"
                  style={{ backgroundColor: day ? getCellColor(day.count) : "transparent" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="text-[10px] text-gray-400">Less</span>
        {LEGEND_VALS.map((v) => (
          <div key={v} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: getCellColor(v) }} />
        ))}
        <span className="text-[10px] text-gray-400">More</span>
      </div>
    </div>
  );
}
