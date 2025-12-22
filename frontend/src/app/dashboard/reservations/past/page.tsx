"use client";

import {getPastReservations} from "@/services/dashboard/reservations";
import {Reservation} from "@/types/reservation";
import {differenceInDays, format} from "date-fns";
import {useEffect, useState} from "react";

export default function PastReservationsPage() {
    // let reservations: Reservation[] = [];
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // try {
    //     reservations = await getPastReservations();
    // } catch (error) {
    //     console.error("Failed to fetch past reservations:", error);
    //     return (
    //         <div className="p-6">
    //             <h2 className="text-xl font-semibold mb-4">Past Reservations</h2>
    //             <p className="text-red-500">Failed to load reservations. Please try again later.</p>
    //         </div>
    //     );
    // }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPastReservations();
                setReservations(data);
            } catch (err: any) {
                console.error("Failed to fetch past reservations:", err);
                setError("Failed to load reservations. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div className="p-6">Loading past reservations...</div>;
    if (error) return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Past Reservations</h2>
            <p className="text-red-500">{error}</p>
        </div>
    );

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-2">Past Reservations</h2>
            <p className="text-neutral-500 mb-6">History of all completed reservations.</p>

            <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-neutral-100 text-neutral-700">
                    <tr>
                        <th className="px-6 py-3 font-semibold">Guest</th>
                        <th className="px-6 py-3 font-semibold">Apartment</th>
                        <th className="px-6 py-3 font-semibold">Check-in</th>
                        <th className="px-6 py-3 font-semibold">Check-out</th>
                        <th className="px-6 py-3 font-semibold">Nights</th>
                        <th className="px-6 py-3 font-semibold">Total (€)</th>
                        <th className="px-6 py-3 font-semibold">Payment</th>
                        <th className="px-6 py-3 font-semibold">Created At</th>
                        <th className="px-6 py-3 font-semibold">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.length === 0 ? (
                        <tr>
                            <td colSpan={9} className="px-6 py-6 text-center text-neutral-500">
                                No past reservations found.
                            </td>
                        </tr>
                    ) : (
                        reservations.map((r) => {
                            const nights = differenceInDays(new Date(r.checkOut), new Date(r.checkIn));
                            return (
                                <tr key={r.id} className="border-t hover:bg-neutral-50">
                                    <td className="px-6 py-4">{r.guestName}</td>
                                    <td className="px-6 py-4">{r.apartmentName}</td>
                                    <td className="px-6 py-4">{format(new Date(r.checkIn), "dd MMM yyyy")}</td>
                                    <td className="px-6 py-4">{format(new Date(r.checkOut), "dd MMM yyyy")}</td>
                                    <td className="px-6 py-4">{nights}</td>
                                    <td className="px-6 py-4 font-medium">{r.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                      <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              r.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : r.paymentStatus === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                          }`}
                      >
                        {r.paymentStatus}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">{format(new Date(r.createdAt), "dd MMM yyyy")}</td>
                                    <td className="px-6 py-4 text-neutral-500 max-w-[200px] truncate">{r.notes || "-"}</td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}