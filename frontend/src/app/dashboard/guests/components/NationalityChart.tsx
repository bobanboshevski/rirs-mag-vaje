"use client";

import {Globe} from "lucide-react";

type Props = {
    nationalities: { country: string; count: number; flag: string }[];
};

export function NationalityChart({nationalities}: Props) {
    const totalGuests = nationalities.reduce((sum, n) => sum + n.count, 0);

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-neutral-600"/>
                <h3 className="text-lg font-semibold">Top Nationalities</h3>
            </div>

            <div className="space-y-4">
                {nationalities.map((item) => {
                    const percentage = (item.count / totalGuests) * 100;
                    return (
                        <div key={item.country}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{item.flag}</span>
                                    <span className="font-medium text-neutral-900">{item.country}</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-semibold text-neutral-900">{item.count}</span>
                                    <span className="text-sm text-neutral-500 ml-2">
                    ({percentage.toFixed(0)}%)
                  </span>
                                </div>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all"
                                    style={{width: `${percentage}%`}}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}