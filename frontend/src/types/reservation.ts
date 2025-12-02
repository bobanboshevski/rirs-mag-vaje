export interface Reservation {
    id: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    apartmentName: string;
    checkIn: string; // ISO date
    checkOut: string; // ISO date
    nights: number; // Number of nights
    pricePerNight: number;
    totalPrice: number;
    paymentStatus: "paid" | "pending" | "refunded";
    bookingStatus: "confirmed" | "pending" | "cancelled"; // NEW
    createdAt: string;
    notes?: string;
    specialRequests?: string; // NEW
    numberOfGuests: number; // NEW
    bookingChannel?: "website" | "booking.com" | "airbnb" | "direct"; // NEW
}