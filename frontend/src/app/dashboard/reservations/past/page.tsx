// app/admin/reservations/past/page.tsx
// export default function PastReservationsPage() {
//     return (
//         <div>
//             <h2 className="text-xl font-semibold mb-4">Past Reservations</h2>
//             <p className="text-neutral-500">History of previous reservations.</p>
//         </div>
//     );
// }


import {getPastReservations} from "@/services/dashboard/reservations";
import {Reservation} from "@/types/reservation";
import {differenceInDays, format} from "date-fns";

export default async function PastReservationsPage() {
    let reservations: Reservation[] = [];

    try {
        reservations = await getPastReservations();
    } catch (error) {
        console.error("Failed to fetch past reservations:", error);
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Past Reservations</h2>
                <p className="text-red-500">Failed to load reservations. Please try again later.</p>
            </div>
        );
    }

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



// import { getApartments } from "@/services/dashboard/apartments";
// import {ApartmentsList} from "@/app/(store)/dashboard/components/ApartmentsList";


// export default async function ApartmentsPage() {
//     let apartments = [];
//
//     try {
//         apartments = await getApartments();
//     } catch (error) {
//         console.error("Failed to fetch apartments:", error);
//         return (
//             <div>
//                 <h2 className="text-2xl font-bold mb-2">Apartments</h2>
//                 <p className="text-red-500">Failed to load apartments. Please try again later.</p>
//             </div>
//         );
//     }
//
//     return (
//         <div className="w-full">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h2 className="text-2xl font-bold mb-2">Apartments</h2>
//                     <p className="text-neutral-500">Manage all apartments in your building.</p>
//                 </div>
//             </div>
//
//             <ApartmentsList initialApartments={apartments} />
//         </div>
//     );
// }