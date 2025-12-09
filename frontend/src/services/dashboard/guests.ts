import {Guest, GuestStats} from "@/types/guest";
import {fetchFromApi} from "@/lib/api/fetchFromApi";

export async function getGuests(): Promise<Guest[]> {
    return await fetchFromApi("/guests", {
        method: "GET"
    });
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