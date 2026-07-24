"use client";

import { useState } from "react";
import type { RatingPoint } from "@/data/mockDashboardData";

interface RatingChartProps {
  data: RatingPoint[];
}

const W = 540;
const H = 200;
const PAD = { top: 20, right: 10, bottom: 30, left: 10 };

function buildSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1].x + pts[i].x) / 2;
    d += ` C ${cpx} ${pts[i - 1].y}, ${cpx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
  }
  return d;
}

export default function RatingChart({ data }: RatingChartProps) {
  const [period, setPeriod] = useState<"6m" | "1y">("1y");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = period === "6m" ? data.slice(-10) : data;
  const n = filtered.length;
  if (n < 2) return null;

  const minR = Math.min(...filtered.map((d) => d.rating)) - 80;
  const maxR = Math.max(...filtered.map((d) => d.rating)) + 80;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const baseY = H - PAD.bottom;

  const toX = (i: number) => PAD.left + (i / (n - 1)) * innerW;
  const toY = (r: number) => PAD.top + innerH - ((r - minR) / (maxR - minR)) * innerH;

  const pts = filtered.map((d, i) => ({ x: toX(i), y: toY(d.rating) }));
  const linePath = buildSmoothPath(pts);
  const areaPath = `${linePath} L ${pts[n - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-sm font-semibold text-gray-900">Rating Progress</h2>
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(["6m", "1y"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={[
                "px-3 py-1.5 text-xs font-semibold transition-colors",
                period === p ? "bg-[#FF6B00] text-white" : "bg-white text-gray-400 hover:text-gray-755",
              ].join(" ")}
            >
              {p === "6m" ? "6 Months" : "1 Year"}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          style={{ minHeight: 140 }}
          role="img"
          aria-label="Rating progress chart"
        >
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#rg)" />
          <path d={linePath} fill="none" stroke="#FF6B00" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((pt, i) => (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
              <circle cx={pt.x} cy={pt.y} r={12} fill="transparent" />
              <circle
                cx={pt.x} cy={pt.y}
                r={hovered === i ? 5 : 3}
                fill={hovered === i ? "#FF6B00" : "white"}
                stroke="#FF6B00"
                strokeWidth={2}
              />
              {hovered === i && (
                <>
                  <rect
                    x={Math.min(pt.x - 44, W - 92)}
                    y={Math.max(pt.y - 48, 2)}
                    width={90}
                    height={38}
                    rx={6}
                    fill="#111827"
                  />
                  <text
                    x={Math.min(pt.x - 44, W - 92) + 45}
                    y={Math.max(pt.y - 48, 2) + 15}
                    textAnchor="middle" fill="white" fontSize={12} fontWeight="bold"
                  >
                    {filtered[i].rating}
                  </text>
                  <text
                    x={Math.min(pt.x - 44, W - 92) + 45}
                    y={Math.max(pt.y - 48, 2) + 29}
                    textAnchor="middle" fill="#9ca3af" fontSize={9}
                  >
                    {filtered[i].date}
                  </text>
                </>
              )}
            </g>
          ))}
          <text x={PAD.left} y={H - 6} fontSize={9} fill="#9ca3af">{filtered[0]?.date}</text>
          <text x={W - PAD.right} y={H - 6} fontSize={9} fill="#9ca3af" textAnchor="end">{filtered[n - 1]?.date}</text>
        </svg>
      </div>
    </div>
  );
}
