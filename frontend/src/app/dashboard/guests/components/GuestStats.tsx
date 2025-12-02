"use client";

import {GuestStats as GuestStatsType} from "@/types/guest";
import {Users, UserPlus, Star, Award} from "lucide-react";

type Props = {
    stats: GuestStatsType;
};

export function GuestStats({stats}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Total Guests</p>
                    <Users className="h-5 w-5 text-blue-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">{stats.totalGuests}</p>
                <p className="text-xs text-blue-600 mt-2">
                    {stats.newGuestsThisMonth} new this month
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Returning Rate</p>
                    <UserPlus className="h-5 w-5 text-green-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">
                    {stats.returningGuestsRate.toFixed(0)}%
                </p>
                <p className="text-xs text-neutral-600 mt-2">Guest retention</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Avg. Lifetime Value</p>
                    <Star className="h-5 w-5 text-yellow-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">
                    €{stats.averageLifetimeValue.toFixed(0)}
                </p>
                <p className="text-xs text-neutral-600 mt-2">Per guest</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">VIP Guests</p>
                    <Award className="h-5 w-5 text-purple-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">{stats.vipGuests}</p>
                <p className="text-xs text-purple-600 mt-2">
                    Avg rating: {stats.averageRating.toFixed(1)} ⭐
                </p>
            </div>
        </div>
    );
}