"use client";

import {RevenueDataPoint} from "@/types/dashboardOverview";
import {BarChart3} from "lucide-react";

type Props = {
    data: RevenueDataPoint[];
};

export function RevenueChart({ data }: Props) {
    const maxRevenue = Math.max(...data.map((d) => d.revenue));

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Revenue Trend</h3>
                    <p className="text-sm text-neutral-500">Monthly revenue over time</p>
                </div>
                <BarChart3 className="h-5 w-5 text-neutral-400" />
            </div>

            <div className="space-y-3">
                {data.map((item) => (
                    <div key={item.month}>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-neutral-700">{item.month}</span>
                            <span className="font-semibold text-neutral-900">€{item.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                            />
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">{item.bookings} bookings</div>
                    </div>
                ))}
            </div>
        </div>
    );
}