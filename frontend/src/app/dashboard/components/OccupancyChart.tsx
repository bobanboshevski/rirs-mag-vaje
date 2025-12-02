"use client";

import {OccupancyDataPoint} from "@/types/dashboardOverview";
import {TrendingUp} from "lucide-react";

type Props = {
    data: OccupancyDataPoint[];
};

export function OccupancyChart({ data }: Props) {
    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Current Occupancy Rate</h3>
                    <p className="text-sm text-neutral-500">Monthly occupancy percentage</p>
                </div>
                <TrendingUp className="h-5 w-5 text-neutral-400" />
            </div>

            <div className="space-y-3">
                {data.map((item) => (
                    <div key={item.month}>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-neutral-700">{item.month}</span>
                            <span className="font-semibold text-neutral-900">{item.occupancyRate}%</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2">
                            <div
                                className="bg-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${item.occupancyRate}%` }}
                            />
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                            {item.occupiedNights} / {item.totalNights} nights
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}