export interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    dateOfBirth?: string;
    idNumber?: string;

    // Statistics
    totalBookings: number;
    totalSpent: number;
    totalNights: number;
    averageStayLength: number;
    firstBookingDate: string;
    lastBookingDate: string;

    // Preferences & Behavior
    preferredApartmentTypes: string[];
    bookingChannel: "website" | "booking.com" | "airbnb" | "direct" | "other";
    averageBookingLeadTime: number; // Days before check-in when booking

    // Status & Rating
    vipStatus: boolean;
    // blacklisted: boolean;
    guestRating: number; // 1-5
    status: "active" | "inactive" | "blacklisted";

    // Contact preferences
    marketingOptIn: boolean;
    preferredLanguage: string;

    notes?: string;
    tags?: string[];
}


export interface GuestStats {
    totalGuests: number;
    newGuestsThisMonth: number;
    returningGuestsRate: number;
    vipGuests: number;
    averageLifetimeValue: number;
    topNationalities: { country: string; count: number; flag: string }[];
    guestsByChannel: { channel: string; count: number }[];
    averageRating: number;
}