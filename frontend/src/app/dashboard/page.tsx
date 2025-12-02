// app/admin/page.tsx


// import DashboardCard from "@/app/(store)/dashboard/components/DashboardCard";
//
// export default function AdminDashboard() {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <DashboardCard title="Total Apartments" value="24" />
//             <DashboardCard title="Future Reservations" value="12" />
//             <DashboardCard title="Past Reservations" value="48" />
//         </div>
//     );
// }


import {getDashboardStats} from "@/services/dashboard/stats";
import {StatsCards} from "@/app/dashboard/components/StatsCards";
import {RevenueChart} from "@/app/dashboard/components/RevenueChart";
import {OccupancyChart} from "@/app/dashboard/components/OccupancyChart";
import {UpcomingCheckInsOuts} from "@/app/dashboard/components/OucomingCheckInsOuts";
import {RecentActivity} from "@/app/dashboard/components/RecentActivity";
import {CurrentGuestsCard} from "@/app/dashboard/components/CurrentGuestsCard";
import {TodayRevenueCard} from "@/app/dashboard/components/TodayRevenueCard";
import {TopApartments} from "@/app/dashboard/components/TopApartments";
import {WeeklyRevenueChart} from "@/app/dashboard/components/WeeklyRevenueChart";


export default async function DashboardOverview() {
    let stats;


    try {
        stats = await getDashboardStats();
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return (
            <div>
                <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
                <p className="text-red-500">Failed to load dashboard data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-neutral-500">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Top Row - Main Stats */}
            <StatsCards stats={stats}/>

            {/* Second Row - Highlighted Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CurrentGuestsCard
                    currentGuests={stats.currentGuests}
                    occupiedApartments={stats.occupiedApartments}
                />
                <TodayRevenueCard todayRevenue={stats.todayRevenue} weekRevenue={stats.weekRevenue}/>
            </div>

            {/* Third Row - Weekly Revenue Chart + Top Apartments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WeeklyRevenueChart data={stats.weeklyRevenueData}/>
                </div>
                <TopApartments apartments={stats.topPerformingApartment}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart data={stats.revenueData}/>
                <OccupancyChart data={stats.occupancyData}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UpcomingCheckInsOuts
                    checkIns={stats.upcomingCheckIns}
                    checkOuts={stats.upcomingCheckOuts}
                    cleanings={stats.upcomingCleanings}
                />
                <RecentActivity activities={stats.recentActivities}/>
            </div>
        </div>
    );
}