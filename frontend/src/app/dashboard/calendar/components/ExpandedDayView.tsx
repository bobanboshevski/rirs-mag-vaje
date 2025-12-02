// ============================================
// app/admin/reservations/calendar/components/ExpandedDayView.tsx
// ============================================

"use client";

import { CalendarReservation } from "@/types/calendar";
import { format } from "date-fns";
import { X, CalendarIcon, Users } from "lucide-react";

type Props = {
    date: string;
    reservations: CalendarReservation[];
    onSelectReservation: (reservation: CalendarReservation) => void;
    onClose: () => void;
};

export function ExpandedDayView({ date, reservations, onSelectReservation, onClose }: Props) {
    const dayReservations = reservations.filter((res) => {
        const checkInDate = new Date(res.checkIn);
        const checkOutDate = new Date(res.checkOut);
        const currentDate = new Date(date);
        return currentDate >= checkInDate && currentDate < checkOutDate;
    });

    const getPaymentStatusBg = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "refunded":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    All reservations for {format(new Date(date), "EEEE, MMMM d, yyyy")}
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="space-y-4">
                {dayReservations.map((res) => (
                    <div
                        key={res.id}
                        onClick={() => onSelectReservation(res)}
                        className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-neutral-900">{res.guestName}</p>
                                <p className="text-sm text-neutral-600">{res.apartmentName}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-neutral-900">€{res.totalPrice.toFixed(2)}</p>
                                <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getPaymentStatusBg(res.paymentStatus)}`}>
                  {res.paymentStatus}
                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-600 mt-3">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                  {format(new Date(res.checkIn), "MMM d")} → {format(new Date(res.checkOut), "MMM d")}
              </span>
                            <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                                {res.numberOfGuests} guest{res.numberOfGuests !== 1 ? "s" : ""}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}