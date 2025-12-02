// app/admin/reservations/future/page.tsx
// export default function FutureReservationsPage() {
//     return (
//         <div>
//             <h2 className="text-xl font-semibold mb-4">Future Reservations</h2>
//             <p className="text-neutral-500">List of all upcoming reservations.</p>
//         </div>
//     );
// }


// ============================================
// app/admin/reservations/future/page.tsx
// ============================================

import {getFutureReservations} from "@/services/dashboard/reservations";
import {Reservation} from "@/types/reservation";
import {differenceInDays, format} from "date-fns";
import {AlertCircle, CheckCircle, Clock} from "lucide-react";

export default async function FutureReservationsPage() {
    let reservations: Reservation[] = [];

    try {
        reservations = await getFutureReservations();
    } catch (error) {
        console.error("Failed to fetch future reservations:", error);
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Future Reservations</h2>
                <p className="text-red-500">Failed to load reservations. Please try again later.</p>
            </div>
        );
    }

    const getBookingStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    const getPaymentStatusColor = (status: string) => {
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

    const getCheckInIcon = (checkInDate: string) => {
        const daysUntil = differenceInDays(new Date(checkInDate), new Date());
        if (daysUntil <= 3) {
            return <AlertCircle className="h-4 w-4 text-red-600"/>;
        } else if (daysUntil <= 7) {
            return <Clock className="h-4 w-4 text-yellow-600"/>;
        } else {
            return <CheckCircle className="h-4 w-4 text-green-600"/>;
        }
    };

    return (
        // w-full
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Future Reservations</h2>
                <p className="text-neutral-500">List of all upcoming reservations ({reservations.length})</p>
            </div>

            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                {/* overflow-y-auto min-w-full */}
                <table className="overflow-y-auto min-w-full text-sm text-left">
                    <thead className="bg-neutral-100 text-neutral-700">
                    <tr>
                        {/* whitespace-nowrap */}
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Status</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Guest</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Contact</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Apartment</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Check-in</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Check-out</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Guests</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Nights</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Total (€)</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Payment</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Booking</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Channel</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.length === 0 ? (
                        <tr>
                            <td colSpan={13} className="px-6 py-6 text-center text-neutral-500">
                                No future reservations found.
                            </td>
                        </tr>
                    ) : (
                        reservations.map((r) => {
                            const nights = differenceInDays(new Date(r.checkOut), new Date(r.checkIn));
                            const daysUntilCheckIn = differenceInDays(new Date(r.checkIn), new Date());

                            return (
                                <tr key={r.id} className="border-t hover:bg-neutral-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getCheckInIcon(r.checkIn)}
                                            <span className="text-xs text-neutral-600">
                          {daysUntilCheckIn > 0 ? `in ${daysUntilCheckIn}d` : "Today"}
                        </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{r.guestName}</td>
                                    <td className="px-6 py-4 text-xs text-neutral-600">
                                        <div>{r.guestEmail}</div>
                                        <div>{r.guestPhone}</div>
                                    </td>
                                    <td className="px-6 py-4">{r.apartmentName}</td>
                                    <td className="px-6 py-4">{format(new Date(r.checkIn), "dd MMM yyyy")}</td>
                                    <td className="px-6 py-4">{format(new Date(r.checkOut), "dd MMM yyyy")}</td>
                                    <td className="px-6 py-4 text-center font-medium">{r.numberOfGuests}</td>
                                    <td className="px-6 py-4 text-center">{nights}</td>
                                    <td className="px-6 py-4 font-semibold">€{r.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                      <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getPaymentStatusColor(
                              r.paymentStatus
                          )}`}
                      >
                        {r.paymentStatus}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getBookingStatusColor(
                              r.bookingStatus
                          )}`}
                      >
                        {r.bookingStatus}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs">{r.bookingChannel || "-"}</td>
                                    <td className="px-6 py-4 text-neutral-500 max-w-[250px]">
                                        <div className="truncate">{r.notes || "-"}</div>
                                        {r.specialRequests && (
                                            <div className="text-blue-600 text-xs mt-1">
                                                ⭐ {r.specialRequests}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-1">Total Revenue (Upcoming)</p>
                    <p className="text-2xl font-bold text-neutral-900">
                        €{reservations.reduce((sum, r) => sum + r.totalPrice, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-1">Confirmed Bookings</p>
                    <p className="text-2xl font-bold text-green-600">
                        {reservations.filter((r) => r.bookingStatus === "confirmed").length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-1">Pending Payment</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        €{reservations
                        .filter((r) => r.paymentStatus === "pending")
                        .reduce((sum, r) => sum + r.totalPrice, 0)
                        .toLocaleString()}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-1">Check-ins (Next 7 days)</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {
                            reservations.filter(
                                (r) =>
                                    differenceInDays(new Date(r.checkIn), new Date()) <= 7 &&
                                    differenceInDays(new Date(r.checkIn), new Date()) >= 0
                            ).length
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

