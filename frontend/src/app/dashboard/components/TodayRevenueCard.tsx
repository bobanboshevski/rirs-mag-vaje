"use client";

import { TrendingUp, Euro } from "lucide-react";

type Props = {
    todayRevenue: number;
    weekRevenue: number;
};

export function TodayRevenueCard({ todayRevenue, weekRevenue }: Props) {
    const dailyAverage = weekRevenue / 7;
    const percentageVsAverage = ((todayRevenue - dailyAverage) / dailyAverage) * 100;

    return (
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Euro className="h-6 w-6" />
                </div>
                <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        percentageVsAverage >= 0 ? "bg-white/20" : "bg-red-500/20"
                    }`}
                >
                    <TrendingUp className="h-3 w-3" />
                    {percentageVsAverage >= 0 ? "+" : ""}
                    {percentageVsAverage.toFixed(0)}%
                </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">€{todayRevenue.toLocaleString()}</h3>
            <p className="text-sm font-medium text-green-100 mb-1">Today's Revenue</p>
            <p className="text-xs text-green-200">€{weekRevenue.toLocaleString()} this week</p>
        </div>
    );
}