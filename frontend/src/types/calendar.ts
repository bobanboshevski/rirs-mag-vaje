export interface CalendarReservation {
    id: string;
    guestName: string;
    apartmentName: string;
    checkIn: string;
    checkOut: string;
    bookingStatus: "confirmed" | "pending" | "cancelled";
    paymentStatus: "paid" | "pending" | "refunded";
    numberOfGuests: number;
    totalPrice: number;
}

export interface CalendarDay {
    date: Date;
    dayOfMonth: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    reservations: CalendarReservation[];
}