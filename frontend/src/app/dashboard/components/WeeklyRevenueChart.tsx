// app/(store)/dashboard/components/WeeklyRevenueChart.tsx
"use client";

import {DailyRevenueDataPoint} from "@/types/dashboardOverview";
import {TrendingUp} from "lucide-react";

type Props = {
    data: DailyRevenueDataPoint[];
};

export function WeeklyRevenueChart({data}: Props) {
    if (!data.length) return <div>No data available</div>;

    const maxRevenue = Math.max(...data.map((d) => d.revenue));
    const minRevenue = Math.min(...data.map((d) => d.revenue));
    const totalWeekRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
    const avgRevenue = totalWeekRevenue / data.length;

    // Calculate SVG path for the line
    const chartWidth = 1400;
    const chartHeight = 220;
    const padding = 0;
    const availableWidth = chartWidth - 2 * padding;
    const availableHeight = chartHeight - 2 * padding;

    const points = data.map((item, index) => {
        const x = padding + (index / (data.length - 1)) * availableWidth;
        const y =
            padding + availableHeight - ((item.revenue - minRevenue) / (maxRevenue - minRevenue)) * availableHeight;
        return {x, y, ...item};
    });

    // Create path for the line
    const linePath = points.map((point, i) => (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)).join(" ");

    const lastPoint = points[points.length - 1];

    if (!lastPoint) return <div>No data available</div>;

    const areaPath = `${linePath} L ${lastPoint.x} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`;

    // Create path for the gradient area (below the line)
    // const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${padding} ${
    //     chartHeight - padding
    // } Z`;

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Last 7 Days Revenue</h3>
                    <p className="text-sm text-neutral-500">Total: €{totalWeekRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-neutral-400"/>
            </div>

            <div className="relative">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-48"
                    style={{overflow: "visible"}}
                >
                    {/* Define gradient */}
                    <defs>
                        <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
                        </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((percent) => {
                        const y = padding + availableHeight * (1 - percent);
                        return (
                            <line
                                key={percent}
                                x1={padding}
                                y1={y}
                                x2={chartWidth - padding}
                                y2={y}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                        );
                    })}

                    {/* Area under the line (gradient fill) */}
                    <path d={areaPath} fill="url(#revenueGradient)"/>

                    {/* Line */}
                    <path d={linePath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"
                          strokeLinejoin="round"/>

                    {/* Data points */}
                    {points.map((point, index) => (
                        <g key={index}>
                            {/* Outer circle */}
                            <circle cx={point.x} cy={point.y} r="6" fill="white" stroke="#10b981" strokeWidth="3"/>
                            {/* Inner circle */}
                            <circle cx={point.x} cy={point.y} r="3" fill="#10b981"/>

                            {/* Hover area */}
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="15"
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={(e) => {
                                    const tooltip = document.getElementById(`tooltip-${index}`);
                                    if (tooltip) tooltip.style.display = "block";
                                }}
                                onMouseLeave={(e) => {
                                    const tooltip = document.getElementById(`tooltip-${index}`);
                                    if (tooltip) tooltip.style.display = "none";
                                }}
                            />
                        </g>
                    ))}
                </svg>

                {/* Tooltips */}
                {points.map((point, index) => (
                    <div
                        key={index}
                        id={`tooltip-${index}`}
                        className="absolute bg-neutral-900 text-white text-xs rounded-lg px-3 py-2 pointer-events-none shadow-lg"
                        style={{
                            display: "none",
                            left: `${(point.x / chartWidth) * 100}%`,
                            top: `${(point.y / chartHeight) * 100 - 10}%`,
                            transform: "translate(-50%, -100%)",
                            zIndex: 10,
                        }}
                    >
                        <div className="font-semibold">€{point.revenue}</div>
                        <div className="text-neutral-300">{point.bookings} bookings</div>
                        <div className="text-neutral-400">{point.date}</div>
                    </div>
                ))}

                {/* X-axis labels */}
                <div className="flex justify-between mt-4">
                    {data.map((item, index) => (
                        <div key={index} className="text-center flex-1">
                            <p className="text-xs font-medium text-neutral-700">{item.day}</p>
                            <p className="text-xs text-neutral-500">{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats below chart */}
            <div className="mt-6 pt-4 border-t border-neutral-200 grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Average</p>
                    <p className="text-lg font-bold text-neutral-900">€{avgRevenue.toFixed(0)}</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Highest</p>
                    <p className="text-lg font-bold text-green-600">€{maxRevenue}</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Lowest</p>
                    <p className="text-lg font-bold text-orange-600">€{minRevenue}</p>
                </div>
            </div>
        </div>
    );
}


