"use client";

import {DashboardStats} from "@/types/dashboardOverview";
import {Building2, Euro, TrendingUp, Users} from "lucide-react";

type Props = {
    stats: DashboardStats;
};

export function StatsCards({ stats }: Props) {
    const cards = [
        {
            title: "Total Apartments",
            value: stats.totalApartments,
            subtitle: `${stats.occupiedApartments} occupied, ${stats.availableApartments} available`,
            icon: Building2,
            color: "bg-blue-500",
        },
        {
            title: "Monthly Revenue",
            value: `€${stats.monthlyRevenue.toLocaleString()}`,
            subtitle: `€${stats.yearlyRevenue.toLocaleString()} this year`,
            icon: Euro,
            color: "bg-green-500",
        },
        {
            title: "Occupancy Rate",
            value: `${stats.occupancyRate}%`,
            subtitle: `${stats.activeReservations} active reservations`,
            icon: TrendingUp,
            color: "bg-purple-500",
        },
        {
            title: "Total Lifetime Guests",
            value: stats.totalGuests,
            subtitle: `${stats.upcomingReservations} upcoming bookings`,
            icon: Users,
            color: "bg-orange-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${card.color} p-3 rounded-lg`}>
                            <card.icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">{card.value}</h3>
                    <p className="text-sm font-medium text-neutral-600 mb-1">{card.title}</p>
                    <p className="text-xs text-neutral-500">{card.subtitle}</p>
                </div>
            ))}
        </div>
    );
}