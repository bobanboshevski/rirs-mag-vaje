// ============================================
// app/admin/reservations/calendar/components/CalendarStats.tsx
// ============================================

"use client";

import { CalendarReservation } from "@/types/calendar";
import { format } from "date-fns";

type Props = {
    reservations: CalendarReservation[];
    currentMonth: Date;
    calendarDays: Date[];
};

export function CalendarStats({ reservations, currentMonth, calendarDays }: Props) {
    const monthlyRevenue = reservations
        .filter((res) => {
            const checkIn = new Date(res.checkIn);
            return checkIn.getMonth() === currentMonth.getMonth() &&
                checkIn.getFullYear() === currentMonth.getFullYear();
        })
        .reduce((sum, res) => sum + res.totalPrice, 0);

    const confirmedBookings = reservations.filter((res) => res.bookingStatus === "confirmed").length;

    const occupiedDays = new Set<string>();
    reservations.forEach((res) => {
        const checkIn = new Date(res.checkIn);
        const checkOut = new Date(res.checkOut);
        for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
            occupiedDays.add(format(d, "yyyy-MM-dd"));
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <p className="text-sm text-neutral-600 mb-1">Month Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">€{monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <p className="text-sm text-neutral-600 mb-1">Confirmed Bookings</p>
                <p className="text-2xl font-bold text-blue-600">{confirmedBookings}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <p className="text-sm text-neutral-600 mb-1">Occupied Days</p>
                <p className="text-2xl font-bold text-purple-600">{occupiedDays.size}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <p className="text-sm text-neutral-600 mb-1">Occupancy Rate</p>
                <p className="text-2xl font-bold text-green-600">
                    {((occupiedDays.size / (calendarDays.length / 7 * 7)) * 100).toFixed(0)}%
                </p>
            </div>
        </div>
    );
}
