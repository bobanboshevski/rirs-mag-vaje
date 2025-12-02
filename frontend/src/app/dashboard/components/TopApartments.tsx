"use client";

import { TopApartment } from "@/types/dashboardOverview";
import { Trophy } from "lucide-react"; // TrendingUp

type Props = {
    apartments: TopApartment[];
};

export function TopApartments({ apartments }: Props) {
    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-neutral-900">Top Performing Apartments</h3>
            </div>

            <div className="space-y-4">
                {apartments.map((apt, index) => (
                    <div key={apt.id} className="flex items-center gap-4">
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                index === 0
                                    ? "bg-yellow-100 text-yellow-700"
                                    : index === 1
                                        ? "bg-neutral-200 text-neutral-700"
                                        : "bg-orange-100 text-orange-700"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm text-neutral-900">{apt.name}</p>
                            <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-neutral-600">
                  €{apt.revenue.toLocaleString()}
                </span>
                                <span className="text-xs text-neutral-600">{apt.bookings} bookings</span>
                                <span className="text-xs text-neutral-600">{apt.occupancyRate}% occupied</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}