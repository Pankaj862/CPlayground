import type { SuccessRateData } from "@/data/mockDashboardData";

interface SuccessRateProps {
  data: SuccessRateData;
}

export default function SuccessRate({ data }: SuccessRateProps) {
  const total = data.accepted + data.wrongAnswer + data.other;
  const pct = Math.round((data.accepted / total) * 100);
  const R = 46;
  const CX = 62;
  const CY = 62;
  const SW = 14;
  const CIRC = 2 * Math.PI * R;

  const accLen = (data.accepted / total) * CIRC;
  const waLen = (data.wrongAnswer / total) * CIRC;
  const otherLen = (data.other / total) * CIRC;
  const accOffset = 0;
  const waOffset = -accLen;
  const otherOffset = -(accLen + waLen);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-fade-in">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Success Rate</h2>
      <div className="flex items-center gap-3">
        <svg width={124} height={124} viewBox="0 0 124 124" aria-label={`${pct}% acceptance rate`}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f3f4f6" strokeWidth={SW} />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e5e7eb" strokeWidth={SW}
            strokeDasharray={`${otherLen} ${CIRC - otherLen}`}
            strokeDashoffset={otherOffset}
            transform={`rotate(-90 ${CX} ${CY})`} />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#fca5a5" strokeWidth={SW}
            strokeDasharray={`${waLen} ${CIRC - waLen}`}
            strokeDashoffset={waOffset}
            transform={`rotate(-90 ${CX} ${CY})`} />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#FF6B00" strokeWidth={SW}
            strokeDasharray={`${accLen} ${CIRC - accLen}`}
            strokeDashoffset={accOffset}
            transform={`rotate(-90 ${CX} ${CY})`} />
          <text x={CX} y={CY - 5} textAnchor="middle" fontSize={18} fontWeight="800" fill="#111827">{pct}%</text>
          <text x={CX} y={CY + 13} textAnchor="middle" fontSize={10} fill="#9ca3af">AC</text>
        </svg>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shrink-0" />
            <span className="text-xs text-gray-500">Accepted</span>
            <span className="text-xs font-bold text-gray-900 ml-1">{data.accepted}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300 shrink-0" />
            <span className="text-xs text-gray-500">WA</span>
            <span className="text-xs font-bold text-gray-900 ml-1">{data.wrongAnswer}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" />
            <span className="text-xs text-gray-500">Other</span>
            <span className="text-xs font-bold text-gray-900 ml-1">{data.other}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
