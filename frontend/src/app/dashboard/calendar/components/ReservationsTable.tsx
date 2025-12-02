// ============================================
// app/admin/reservations/calendar/components/ReservationsTable.tsx
// ============================================

"use client";

import { CalendarReservation } from "@/types/calendar";
import { format } from "date-fns";

type Props = {
    reservations: CalendarReservation[];
    currentMonth: Date;
    onSelectReservation: (reservation: CalendarReservation) => void;
};

export function ReservationsTable({ reservations, currentMonth, onSelectReservation }: Props) {
    const filteredReservations = reservations.filter((res) => {
        const checkIn = new Date(res.checkIn);
        return checkIn.getMonth() === currentMonth.getMonth() &&
            checkIn.getFullYear() === currentMonth.getFullYear();
    });

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">All Reservations in {format(currentMonth, "MMMM yyyy")}</h3>
            <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="min-w-full text-sm">
                    <thead className="bg-neutral-100">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">Guest</th>
                        <th className="px-4 py-3 text-left font-semibold">Apartment</th>
                        <th className="px-4 py-3 text-left font-semibold">Check-in</th>
                        <th className="px-4 py-3 text-left font-semibold">Check-out</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-left font-semibold">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredReservations.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-6 text-center text-neutral-500">
                                No reservations found for this month
                            </td>
                        </tr>
                    ) : (
                        filteredReservations.map((res) => (
                            <tr
                                key={res.id}
                                className="border-t hover:bg-neutral-50 cursor-pointer"
                                onClick={() => onSelectReservation(res)}
                            >
                                <td className="px-4 py-3 font-medium">{res.guestName}</td>
                                <td className="px-4 py-3">{res.apartmentName}</td>
                                <td className="px-4 py-3">{format(new Date(res.checkIn), "dd MMM")}</td>
                                <td className="px-4 py-3">{format(new Date(res.checkOut), "dd MMM")}</td>
                                <td className="px-4 py-3">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            res.bookingStatus === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : res.bookingStatus === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                        }`}
                    >
                      {res.bookingStatus}
                    </span>
                                </td>
                                <td className="px-4 py-3 font-semibold">€{res.totalPrice.toFixed(2)}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}