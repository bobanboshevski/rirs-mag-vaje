"use client";

import {TrendingUp} from "lucide-react";

type Props = {
    channels: { channel: string; count: number }[];
};

export function ChannelDistribution({channels}: Props) {
    const total = channels.reduce((sum, c) => sum + c.count, 0);

    const channelIcons: Record<string, string> = {
        website: "🌐",
        "booking.com": "🏨",
        airbnb: "🏠",
        direct: "📞",
        other: "📊",
    };

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-neutral-600"/>
                <h3 className="text-lg font-semibold">Booking Channels</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {channels.map((item) => {
                    const percentage = (item.count / total) * 100;
                    return (
                        <div
                            key={item.channel}
                            className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                        >
                            <div className="text-3xl mb-2">{channelIcons[item.channel] || "📌"}</div>
                            <p className="text-sm font-medium text-neutral-600 capitalize mb-1">
                                {item.channel}
                            </p>
                            <p className="text-2xl font-bold text-neutral-900">{item.count}</p>
                            <p className="text-xs text-neutral-500">{percentage.toFixed(0)}% of guests</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}