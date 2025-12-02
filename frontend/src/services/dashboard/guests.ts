import {Guest, GuestStats} from "@/types/guest";

export async function getGuests(): Promise<Guest[]> {
    // TODO: Replace with API call
    // return await fetchFromApi("/guests", { method: "GET" });

    return [
        {
            id: "guest_001",
            firstName: "Sophie",
            lastName: "Laurent",
            email: "sophie.laurent@email.com",
            phone: "+33 6 12 34 56 78",
            nationality: "France",
            countryCode: "FR",
            dateOfBirth: "1988-05-15",
            totalBookings: 3,
            totalSpent: 1575,
            totalNights: 15,
            averageStayLength: 5,
            firstBookingDate: "2024-03-10T00:00:00Z",
            lastBookingDate: "2025-10-15T00:00:00Z",
            preferredApartmentTypes: ["Lakeview Apartment"],
            bookingChannel: "booking.com",
            averageBookingLeadTime: 45,
            vipStatus: true,
            guestRating: 5,
            status: "active",
            marketingOptIn: true,
            preferredLanguage: "French",
            notes: "Excellent guest, always leaves apartments in perfect condition",
            tags: ["VIP", "Returning", "Clean"],
        },
        {
            id: "guest_002",
            firstName: "Marco",
            lastName: "Rossi",
            email: "marco.rossi@email.it",
            phone: "+39 328 1234567",
            nationality: "Italy",
            countryCode: "IT",
            dateOfBirth: "1992-08-22",
            totalBookings: 2,
            totalSpent: 1450,
            totalNights: 14,
            averageStayLength: 7,
            firstBookingDate: "2024-06-20T00:00:00Z",
            lastBookingDate: "2025-10-18T00:00:00Z",
            preferredApartmentTypes: ["Central City Loft"],
            bookingChannel: "website",
            averageBookingLeadTime: 30,
            vipStatus: false,
            guestRating: 5,
            status: "active",
            marketingOptIn: true,
            preferredLanguage: "Italian",
            notes: "Business traveler, prefers quiet apartments",
            tags: ["Business", "Returning"],
        },
        {
            id: "guest_003",
            firstName: "Anna",
            lastName: "Kowalski",
            email: "anna.k@email.pl",
            phone: "+48 123 456 789",
            nationality: "Poland",
            countryCode: "PL",
            dateOfBirth: "1995-12-03",
            totalBookings: 1,
            totalSpent: 250,
            totalNights: 3,
            averageStayLength: 3,
            firstBookingDate: "2025-10-22T00:00:00Z",
            lastBookingDate: "2025-10-22T00:00:00Z",
            preferredApartmentTypes: ["Sunset Studio"],
            bookingChannel: "airbnb",
            averageBookingLeadTime: 12,
            vipStatus: false,
            guestRating: 4,
            status: "active",
            marketingOptIn: false,
            preferredLanguage: "Polish",
            tags: ["New"],
        },
        {
            id: "guest_004",
            firstName: "David",
            lastName: "Chen",
            email: "david.chen@email.com",
            phone: "+1 415 555 0100",
            nationality: "United States",
            countryCode: "US",
            dateOfBirth: "1985-03-18",
            totalBookings: 4,
            totalSpent: 2800,
            totalNights: 28,
            averageStayLength: 7,
            firstBookingDate: "2023-08-15T00:00:00Z",
            lastBookingDate: "2025-11-01T00:00:00Z",
            preferredApartmentTypes: ["Garden View Suite", "Mountain View Retreat"],
            bookingChannel: "direct",
            averageBookingLeadTime: 60,
            vipStatus: true,
            guestRating: 5,
            status: "active",
            marketingOptIn: true,
            preferredLanguage: "English",
            notes: "Loyal customer, always books for holidays",
            tags: ["VIP", "Loyal", "Holiday"],
        },
        {
            id: "guest_005",
            firstName: "Lisa",
            lastName: "Anderson",
            email: "lisa.anderson@email.com",
            phone: "+1 206 555 0147",
            nationality: "United States",
            countryCode: "US",
            dateOfBirth: "1990-07-25",
            totalBookings: 2,
            totalSpent: 720,
            totalNights: 6,
            averageStayLength: 3,
            firstBookingDate: "2024-12-10T00:00:00Z",
            lastBookingDate: "2025-10-20T00:00:00Z",
            preferredApartmentTypes: ["Mountain View Retreat"],
            bookingChannel: "booking.com",
            averageBookingLeadTime: 20,
            vipStatus: false,
            guestRating: 4,
            status: "active",
            marketingOptIn: true,
            preferredLanguage: "English",
            tags: ["Family"],
        },
        {
            id: "guest_006",
            firstName: "Hans",
            lastName: "Müller",
            email: "hans.muller@email.de",
            phone: "+49 151 1234567",
            nationality: "Germany",
            countryCode: "DE",
            dateOfBirth: "1978-11-08",
            totalBookings: 5,
            totalSpent: 3250,
            totalNights: 30,
            averageStayLength: 6,
            firstBookingDate: "2023-05-20T00:00:00Z",
            lastBookingDate: "2025-09-10T00:00:00Z",
            preferredApartmentTypes: ["Lakeview Apartment", "Central City Loft"],
            bookingChannel: "website",
            averageBookingLeadTime: 90,
            vipStatus: true,
            guestRating: 5,
            status: "active",
            marketingOptIn: true,
            preferredLanguage: "German",
            notes: "Plans trips far in advance, very organized",
            tags: ["VIP", "Loyal", "Planner"],
        },
    ];
}

export async function getGuestStats(guests: Guest[]): Promise<GuestStats> {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const newGuestsThisMonth = guests.filter(
        (g) => new Date(g.firstBookingDate) >= thisMonthStart
    ).length;

    const returningGuests = guests.filter((g) => g.totalBookings > 1).length;
    const returningGuestsRate = (returningGuests / guests.length) * 100;

    const vipGuests = guests.filter((g) => g.vipStatus).length;

    const averageLifetimeValue =
        guests.reduce((sum, g) => sum + g.totalSpent, 0) / guests.length;

    // Top nationalities
    const nationalityCount: Record<string, number> = {};
    guests.forEach((g) => {
        nationalityCount[g.nationality] = (nationalityCount[g.nationality] || 0) + 1;
    });

    const countryFlags: Record<string, string> = {
        FR: "🇫🇷",
        IT: "🇮🇹",
        PL: "🇵🇱",
        US: "🇺🇸",
        DE: "🇩🇪",
        GB: "🇬🇧",
        ES: "🇪🇸",
    };

    const topNationalities = Object.entries(nationalityCount)
        .map(([country, count]) => {
            const guest = guests.find((g) => g.nationality === country);
            return {
                country,
                count,
                flag: countryFlags[guest?.countryCode || ""] || "🌍",
            };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Guests by channel
    const channelCount: Record<string, number> = {};
    guests.forEach((g) => {
        channelCount[g.bookingChannel] = (channelCount[g.bookingChannel] || 0) + 1;
    });

    const guestsByChannel = Object.entries(channelCount).map(([channel, count]) => ({
        channel,
        count,
    }));

    const averageRating =
        guests.reduce((sum, g) => sum + g.guestRating, 0) / guests.length;

    return {
        totalGuests: guests.length,
        newGuestsThisMonth,
        returningGuestsRate,
        vipGuests,
        averageLifetimeValue,
        topNationalities,
        guestsByChannel,
        averageRating,
    };
}