// services/dashboard/stats.ts
import { DashboardStats } from "@/types/dashboardOverview";

export async function getDashboardStats(): Promise<DashboardStats> {
    // TODO: Replace with actual API call
    // return await fetchFromApi("/dashboard/stats", { method: "GET" });

    // Mock data
    return {
        // Current metrics
        totalApartments: 12,
        occupiedApartments: 8,
        availableApartments: 3,
        maintenanceApartments: 1,

        // Financial
        monthlyRevenue: 12450.00,
        yearlyRevenue: 89320.00,
        pendingPayments: 2340.00,
        todayRevenue: 890.0, // NEW
        weekRevenue: 5240.0, // NEW

        // Reservations
        activeReservations: 8,
        upcomingReservations: 15,
        totalGuests: 247,
        currentGuests: 18,

        // Occupancy rate
        occupancyRate: 66.7,
        averageNightlyRate: 85.50,

        weeklyRevenueData: [
            { day: "Mon", date: "Oct 6", revenue: 650, bookings: 3 },
            { day: "Tue", date: "Oct 7", revenue: 720, bookings: 4 },
            { day: "Wed", date: "Oct 8", revenue: 890, bookings: 5 },
            { day: "Thu", date: "Oct 9", revenue: 680, bookings: 3 },
            { day: "Fri", date: "Oct 10", revenue: 950, bookings: 6 },
            { day: "Sat", date: "Oct 11", revenue: 1240, bookings: 7 },
            { day: "Sun", date: "Oct 12", revenue: 890, bookings: 4 },
        ],

        // Charts data
        revenueData: [
            { month: "Jan", revenue: 6500, bookings: 12 },
            { month: "Feb", revenue: 7200, bookings: 15 },
            { month: "Mar", revenue: 8100, bookings: 18 },
            { month: "Apr", revenue: 9500, bookings: 21 },
            { month: "May", revenue: 11200, bookings: 24 },
            { month: "Jun", revenue: 13400, bookings: 28 },
            { month: "Jul", revenue: 15800, bookings: 32 },
            { month: "Aug", revenue: 14200, bookings: 30 },
            { month: "Sep", revenue: 10800, bookings: 22 },
            { month: "Oct", revenue: 12450, bookings: 26 },
        ],

        occupancyData: [
            { month: "Jan", occupancyRate: 52, occupiedNights: 195, totalNights: 375 },
            { month: "Feb", occupancyRate: 58, occupiedNights: 210, totalNights: 360 },
            { month: "Mar", occupancyRate: 64, occupiedNights: 240, totalNights: 375 },
            { month: "Apr", occupancyRate: 70, occupiedNights: 252, totalNights: 360 },
            { month: "May", occupancyRate: 75, occupiedNights: 281, totalNights: 375 },
            { month: "Jun", occupancyRate: 82, occupiedNights: 295, totalNights: 360 },
            { month: "Jul", occupancyRate: 88, occupiedNights: 330, totalNights: 375 },
            { month: "Aug", occupancyRate: 85, occupiedNights: 318, totalNights: 375 },
            { month: "Sep", occupancyRate: 72, occupiedNights: 259, totalNights: 360 },
            { month: "Oct", occupancyRate: 67, occupiedNights: 251, totalNights: 375 },
        ],

        // Recent activity
        recentActivities: [
            {
                id: "1",
                type: "booking",
                description: "New booking by Maria Petrova",
                timestamp: "2025-10-12T10:30:00Z",
                apartmentName: "Lakeview Apartment",
            },
            {
                id: "2",
                type: "payment",
                description: "Payment received €450",
                timestamp: "2025-10-12T09:15:00Z",
                apartmentName: "Central City Loft",
            },
            {
                id: "3",
                type: "maintenance",
                description: "Maintenance completed - AC repair",
                timestamp: "2025-10-11T16:45:00Z",
                apartmentName: "Sunset Studio",
            },
            {
                id: "4",
                type: "booking",
                description: "New booking by John Smith",
                timestamp: "2025-10-11T14:20:00Z",
                apartmentName: "Riverside Apartment",
            },
            {
                id: "5",
                type: "cancellation",
                description: "Booking cancelled by Elena Popov",
                timestamp: "2025-10-11T11:30:00Z",
                apartmentName: "Garden View Suite",
            },
        ],

        upcomingCheckIns: [
            {
                id: "1",
                guestName: "Sophie Laurent",
                apartmentName: "Lakeview Apartment",
                date: "2025-10-13",
                time: "14:00",
            },
            {
                id: "2",
                guestName: "Marco Rossi",
                apartmentName: "Central City Loft",
                date: "2025-10-14",
                time: "15:00",
            },
            {
                id: "3",
                guestName: "Anna Kowalski",
                apartmentName: "Sunset Studio",
                date: "2025-10-15",
                time: "14:00",
            },
        ],

        upcomingCheckOuts: [
            {
                id: "1",
                guestName: "David Chen",
                apartmentName: "Riverside Apartment",
                date: "2025-10-13",
                time: "10:00",
            },
            {
                id: "2",
                guestName: "Lisa Anderson",
                apartmentName: "Garden View Suite",
                date: "2025-10-14",
                time: "11:00",
            },
        ],

        // Upcoming cleanings
        upcomingCleanings: [
            {
                id: "1",
                apartmentName: "Riverside Apartment",
                type: "checkout",
                scheduledTime: "2025-10-13T11:00:00Z",
                status: "pending",
            },
            {
                id: "2",
                apartmentName: "Garden View Suite",
                type: "checkout",
                scheduledTime: "2025-10-14T12:00:00Z",
                status: "pending",
            },
            {
                id: "3",
                apartmentName: "Lakeview Apartment",
                type: "checkin",
                scheduledTime: "2025-10-13T13:00:00Z",
                status: "in-progress",
            },
            {
                id: "4",
                apartmentName: "Mountain View",
                type: "routine",
                scheduledTime: "2025-10-13T15:00:00Z",
                status: "pending",
            },
        ],

        // Top performing apartments
        topPerformingApartment: [
            {
                id: "1",
                name: "Lakeview Apartment",
                revenue: 3250,
                bookings: 8,
                occupancyRate: 85,
            },
            {
                id: "2",
                name: "Central City Loft",
                revenue: 2980,
                bookings: 7,
                occupancyRate: 78,
            },
            {
                id: "3",
                name: "Garden View Suite",
                revenue: 2650,
                bookings: 6,
                occupancyRate: 72,
            },
        ],

        // Maintenance alerts
        maintenanceAlerts: [
            {
                id: "1",
                apartmentName: "Sunset Studio",
                issue: "Water heater not working",
                priority: "urgent",
                reportedDate: "2025-10-12T08:00:00Z",
            },
            {
                id: "2",
                apartmentName: "Mountain View",
                issue: "Kitchen faucet leaking",
                priority: "high",
                reportedDate: "2025-10-11T14:30:00Z",
            },
        ],

    };
}
