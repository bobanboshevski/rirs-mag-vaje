export interface ReportData {
    // Financial Reports
    revenue: {
        daily: number;
        weekly: number;
        monthly: number;
        yearly: number;
        byApartment: { apartmentName: string; revenue: number }[];
    };

    // Occupancy Reports
    occupancy: {
        currentRate: number;
        averageRate: number;
        byMonth: { month: string; rate: number }[];
        byApartment: { apartmentName: string; rate: number }[];
    };

    // Booking Reports
    bookings: {
        total: number;
        confirmed: number;
        cancelled: number;
        averageLength: number;
        averageValue: number;
        bySource: { source: string; count: number }[];
    };

    // Guest Reports
    guests: {
        total: number;
        returning: number;
        newGuests: number;
        topGuests: { name: string; bookings: number; spent: number }[];
        byNationality: { country: string; count: number }[];
    };

    // Maintenance Reports
    maintenance: {
        totalRequests: number;
        completed: number;
        pending: number;
        totalCost: number;
        averageResolutionTime: number;
        byCategory: { category: string; count: number }[];
    };
}