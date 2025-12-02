import {MaintenanceAlert} from "@/types/maintenance";

export interface DashboardStats {
    // Current metrics
    totalApartments: number;
    occupiedApartments: number;
    availableApartments: number;
    maintenanceApartments: number;

    // Financial
    monthlyRevenue: number;
    yearlyRevenue: number;
    pendingPayments: number;
    todayRevenue: number;
    weekRevenue: number;

    // Reservations
    activeReservations: number;
    upcomingReservations: number;
    totalGuests: number; // lifetime guests - analitical metric
    currentGuests: number; // currently clocked in guests (real time metric)

    // Occupancy rate
    occupancyRate: number;
    averageNightlyRate: number;

    // Charts data
    revenueData: RevenueDataPoint[];
    occupancyData: OccupancyDataPoint[];
    weeklyRevenueData: DailyRevenueDataPoint[];

    // Recent activity
    recentActivities: Activity[];
    upcomingCheckIns: UpcomingReservation[];
    upcomingCheckOuts: UpcomingReservation[];
    upcomingCleanings: CleaningTask[];

    //Additinal analytics
    topPerformingApartment: TopApartment[];
    maintenanceAlerts: MaintenanceAlert[];

}
/*

 in cleaning.ts i have more advanced one ! ! !

 */
export interface CleaningTask {
    id: string;
    apartmentName: string;
    type: "checkout" | "checkin" | "routine";
    scheduledTime: string;
    status: "pending" | "in-progress" | "completed";
}

export interface TopApartment {
    id: string;
    name: string;
    revenue: number;
    bookings: number;
    occupancyRate: number;
}

export interface DailyRevenueDataPoint {
    day: string;
    date: string;
    revenue: number;
    bookings: number;
}

export interface RevenueDataPoint {
    month: string;
    revenue: number;
    bookings: number;
}

export interface OccupancyDataPoint {
    month: string;
    occupancyRate: number;
    occupiedNights: number;
    totalNights: number;
}

export interface Activity {
    id: string;
    type: "booking" | "payment" | "maintenance" | "cancellation" | "cleaning";
    description: string;
    timestamp: string;
    apartmentName?: string;
}

export interface UpcomingReservation {
    id: string;
    guestName: string;
    apartmentName: string;
    date: string;
    time: string;
}