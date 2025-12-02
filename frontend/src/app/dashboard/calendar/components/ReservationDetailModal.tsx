// ============================================
// app/admin/reservations/calendar/components/ReservationDetailModal.tsx
// ============================================

"use client";

import { CalendarReservation } from "@/types/calendar";
import { format, differenceInDays } from "date-fns";
import { X, CalendarIcon, Users, Euro } from "lucide-react";

type Props = {
    reservation: CalendarReservation;
    onClose: () => void;
};

export function ReservationDetailModal({ reservation, onClose }: Props) {
    const nights = differenceInDays(new Date(reservation.checkOut), new Date(reservation.checkIn));

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

    const getBookingStatusBg = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-blue-100 text-blue-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-900">{reservation.guestName}</h2>
                        <p className="text-sm text-neutral-500 mt-1">{reservation.apartmentName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status Badges */}
                    <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBookingStatusBg(reservation.bookingStatus)}`}>
              {reservation.bookingStatus}
            </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusBg(reservation.paymentStatus)}`}>
              {reservation.paymentStatus}
            </span>
                    </div>

                    {/* Reservation Dates */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            Dates
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-neutral-600 mb-1">Check-in</p>
                                <p className="font-semibold text-neutral-900">{format(new Date(reservation.checkIn), "PPpp")}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-600 mb-1">Check-out</p>
                                <p className="font-semibold text-neutral-900">{format(new Date(reservation.checkOut), "PPpp")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Guest Info */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Guest Information
                        </h3>
                        <div>
                            <p className="text-sm text-neutral-600 mb-1">Number of Guests</p>
                            <p className="font-semibold text-neutral-900">{reservation.numberOfGuests}</p>
                        </div>
                    </div>

                    {/* Financial */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                            <Euro className="h-5 w-5" />
                            Financial Details
                        </h3>
                        <div className="bg-neutral-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-neutral-700">Total Price:</span>
                                <span className="text-2xl font-bold text-neutral-900">€{reservation.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-neutral-600">
                                Duration: {nights} nights
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200 px-6 py-4 flex justify-end gap-3 bg-neutral-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}