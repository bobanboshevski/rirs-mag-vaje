// "use client";
//
// import { useState, useEffect } from "react";
// import { getCalendarReservations } from "@/services/dashboard/calendar";
// import { CalendarReservation } from "@/types/calendar";
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
// import { ChevronLeft, ChevronRight, Users, Euro } from "lucide-react";
//
// export default function CalendarViewPage() {
//     const [reservations, setReservations] = useState<CalendarReservation[]>([]);
//     const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const loadReservations = async () => {
//             try {
//                 const data = await getCalendarReservations();
//                 setReservations(data);
//             } catch (error) {
//                 console.error("Failed to load calendar reservations:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadReservations();
//     }, []);
//
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(currentMonth);
//     const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
//
//     // Add days from previous month to fill the first week
//     const firstDayOfWeek = monthStart.getDay();
//     const previousMonthDays = eachDayOfInterval({
//         start: subMonths(monthStart, 1),
//         end: subMonths(monthStart, 1),
//     });
//     const calendarDays = [
//         ...previousMonthDays.slice(Math.max(0, previousMonthDays.length - firstDayOfWeek)),
//         ...daysInMonth,
//     ];
//
//     // Pad to complete the last week
//     while (calendarDays.length % 7 !== 0) {
//         calendarDays.push(new Date(calendarDays[calendarDays.length - 1].getTime() + 24 * 60 * 60 * 1000));
//     }
//
//     const getReservationsForDate = (date: Date) => {
//         return reservations.filter((res) => {
//             const checkInDate = new Date(res.checkIn);
//             const checkOutDate = new Date(res.checkOut);
//             return date >= checkInDate && date < checkOutDate;
//         });
//     };
//
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "confirmed":
//                 return "bg-blue-500";
//             case "pending":
//                 return "bg-yellow-500";
//             case "cancelled":
//                 return "bg-red-500";
//             default:
//                 return "bg-gray-500";
//         }
//     };
//
//     const monthlyRevenue = reservations
//         .filter((res) => {
//             const checkIn = new Date(res.checkIn);
//             return checkIn.getMonth() === currentMonth.getMonth() &&
//                 checkIn.getFullYear() === currentMonth.getFullYear();
//         })
//         .reduce((sum, res) => sum + res.totalPrice, 0);
//
//     const confirmedBookings = reservations.filter((res) => res.bookingStatus === "confirmed").length;
//     const occupiedDays = new Set<string>();
//     reservations.forEach((res) => {
//         const checkIn = new Date(res.checkIn);
//         const checkOut = new Date(res.checkOut);
//         for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
//             occupiedDays.add(format(d, "yyyy-MM-dd"));
//         }
//     });
//
//     if (loading) {
//         return <div className="text-center py-12">Loading calendar...</div>;
//     }
//
//     return (
//         <div className="w-full">
//             {/* Header */}
//             <div className="mb-6">
//                 <h2 className="text-2xl font-bold mb-2">Booking Calendar</h2>
//                 <p className="text-neutral-500">Visual overview of all reservations across apartments</p>
//             </div>
//
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Month Revenue</p>
//                     <p className="text-2xl font-bold text-neutral-900">€{monthlyRevenue.toLocaleString()}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Confirmed Bookings</p>
//                     <p className="text-2xl font-bold text-blue-600">{confirmedBookings}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Occupied Days</p>
//                     <p className="text-2xl font-bold text-purple-600">{occupiedDays.size}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Occupancy Rate</p>
//                     <p className="text-2xl font-bold text-green-600">
//                         {((occupiedDays.size / (calendarDays.length / 7 * 7)) * 100).toFixed(0)}%
//                     </p>
//                 </div>
//             </div>
//
//             {/* Calendar */}
//             <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
//                 {/* Month Navigation */}
//                 <div className="flex items-center justify-between p-6 border-b border-neutral-200">
//                     <button
//                         onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                         className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
//                     >
//                         <ChevronLeft className="h-5 w-5" />
//                     </button>
//                     <h3 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
//                     <button
//                         onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                         className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
//                     >
//                         <ChevronRight className="h-5 w-5" />
//                     </button>
//                 </div>
//
//                 {/* Day Headers */}
//                 <div className="grid grid-cols-7 gap-0 border-b border-neutral-200">
//                     {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                         <div key={day} className="p-4 text-center font-semibold text-neutral-700 bg-neutral-50">
//                             {day}
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* Calendar Days */}
//                 <div className="grid grid-cols-7 gap-0">
//                     {calendarDays.map((date, index) => {
//                         const dayReservations = getReservationsForDate(date);
//                         const isCurrentMonthDay = isSameMonth(date, currentMonth);
//                         const isTodayDay = isToday(date);
//
//                         return (
//                             <div
//                                 key={index}
//                                 className={`min-h-32 border border-neutral-200 p-2 ${
//                                     !isCurrentMonthDay ? "bg-neutral-50" : ""
//                                 } ${isTodayDay ? "bg-blue-50" : ""}`}
//                             >
//                                 <div className={`text-sm font-semibold mb-2 ${!isCurrentMonthDay ? "text-neutral-400" : ""} ${isTodayDay ? "text-blue-600" : ""}`}>
//                                     {format(date, "d")}
//                                 </div>
//
//                                 <div className="space-y-1">
//                                     {dayReservations.slice(0, 2).map((res) => (
//                                         <div
//                                             key={res.id}
//                                             className={`text-xs p-1 rounded text-white truncate ${getStatusColor(res.bookingStatus)}`}
//                                             title={`${res.guestName} - ${res.apartmentName}`}
//                                         >
//                                             {res.apartmentName.split(" ")[0]}
//                                         </div>
//                                     ))}
//                                     {dayReservations.length > 2 && (
//                                         <div className="text-xs text-neutral-600 px-1">
//                                             +{dayReservations.length - 2} more
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//
//             {/* Legend */}
//             <div className="mt-6 flex flex-wrap gap-4 justify-center">
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                     <span className="text-sm text-neutral-600">Confirmed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-yellow-500 rounded"></div>
//                     <span className="text-sm text-neutral-600">Pending</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-red-500 rounded"></div>
//                     <span className="text-sm text-neutral-600">Cancelled</span>
//                 </div>
//             </div>
//
//             {/* Reservations List for Selected Month */}
//             <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-4">Reservations in {format(currentMonth, "MMMM yyyy")}</h3>
//                 <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
//                     <table className="min-w-full text-sm">
//                         <thead className="bg-neutral-100">
//                         <tr>
//                             <th className="px-4 py-3 text-left font-semibold">Guest</th>
//                             <th className="px-4 py-3 text-left font-semibold">Apartment</th>
//                             <th className="px-4 py-3 text-left font-semibold">Check-in</th>
//                             <th className="px-4 py-3 text-left font-semibold">Check-out</th>
//                             <th className="px-4 py-3 text-left font-semibold">Status</th>
//                             <th className="px-4 py-3 text-left font-semibold">Amount</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {reservations
//                             .filter((res) => {
//                                 const checkIn = new Date(res.checkIn);
//                                 return checkIn.getMonth() === currentMonth.getMonth() &&
//                                     checkIn.getFullYear() === currentMonth.getFullYear();
//                             })
//                             .map((res) => (
//                                 <tr key={res.id} className="border-t hover:bg-neutral-50">
//                                     <td className="px-4 py-3 font-medium">{res.guestName}</td>
//                                     <td className="px-4 py-3">{res.apartmentName}</td>
//                                     <td className="px-4 py-3">{format(new Date(res.checkIn), "dd MMM")}</td>
//                                     <td className="px-4 py-3">{format(new Date(res.checkOut), "dd MMM")}</td>
//                                     <td className="px-4 py-3">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           res.bookingStatus === "confirmed" ? "bg-blue-100 text-blue-800" :
//                               res.bookingStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
//                                   "bg-red-100 text-red-800"
//                       }`}>
//                         {res.bookingStatus}
//                       </span>
//                                     </td>
//                                     <td className="px-4 py-3 font-semibold">€{res.totalPrice.toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }



// ============================================
// app/admin/reservations/calendar/page.tsx
// ============================================

// "use client";
//
// import { useState, useEffect } from "react";
// import { getCalendarReservations } from "@/services/dashboard/calendar";
// import { CalendarReservation } from "@/types/calendar";
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, differenceInDays } from "date-fns";
// import { ChevronLeft, ChevronRight, X, Users, Euro, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";
//
// export default function CalendarViewPage() {
//     const [reservations, setReservations] = useState<CalendarReservation[]>([]);
//     const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025
//     const [loading, setLoading] = useState(true);
//     const [selectedReservation, setSelectedReservation] = useState<CalendarReservation | null>(null);
//     const [expandedDate, setExpandedDate] = useState<string | null>(null);
//
//     useEffect(() => {
//         const loadReservations = async () => {
//             try {
//                 const data = await getCalendarReservations();
//                 setReservations(data);
//             } catch (error) {
//                 console.error("Failed to load calendar reservations:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadReservations();
//     }, []);
//
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(currentMonth);
//     const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
//
//     // Add days from previous month to fill the first week
//     const firstDayOfWeek = monthStart.getDay();
//     const previousMonthDays = eachDayOfInterval({
//         start: subMonths(monthStart, 1),
//         end: subMonths(monthStart, 1),
//     });
//     const calendarDays = [
//         ...previousMonthDays.slice(Math.max(0, previousMonthDays.length - firstDayOfWeek)),
//         ...daysInMonth,
//     ];
//
//     // Pad to complete the last week
//     while (calendarDays.length % 7 !== 0) {
//         calendarDays.push(new Date(calendarDays[calendarDays.length - 1].getTime() + 24 * 60 * 60 * 1000));
//     }
//
//     const getReservationsForDate = (date: Date) => {
//         return reservations.filter((res) => {
//             const checkInDate = new Date(res.checkIn);
//             const checkOutDate = new Date(res.checkOut);
//             return date >= checkInDate && date < checkOutDate;
//         });
//     };
//
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "confirmed":
//                 return "bg-blue-500 hover:bg-blue-600";
//             case "pending":
//                 return "bg-yellow-500 hover:bg-yellow-600";
//             case "cancelled":
//                 return "bg-red-500 hover:bg-red-600";
//             default:
//                 return "bg-gray-500 hover:bg-gray-600";
//         }
//     };
//
//     const getPaymentStatusBg = (status: string) => {
//         switch (status) {
//             case "paid":
//                 return "bg-green-100 text-green-800";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "refunded":
//                 return "bg-red-100 text-red-800";
//             default:
//                 return "bg-neutral-100 text-neutral-800";
//         }
//     };
//
//     const monthlyRevenue = reservations
//         .filter((res) => {
//             const checkIn = new Date(res.checkIn);
//             return checkIn.getMonth() === currentMonth.getMonth() &&
//                 checkIn.getFullYear() === currentMonth.getFullYear();
//         })
//         .reduce((sum, res) => sum + res.totalPrice, 0);
//
//     const confirmedBookings = reservations.filter((res) => res.bookingStatus === "confirmed").length;
//     const occupiedDays = new Set<string>();
//     reservations.forEach((res) => {
//         const checkIn = new Date(res.checkIn);
//         const checkOut = new Date(res.checkOut);
//         for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
//             occupiedDays.add(format(d, "yyyy-MM-dd"));
//         }
//     });
//
//     if (loading) {
//         return <div className="text-center py-12">Loading calendar...</div>;
//     }
//
//     const dateKey = (date: Date) => format(date, "yyyy-MM-dd");
//     const isDateExpanded = expandedDate ? dateKey(new Date(expandedDate)) === expandedDate : false;
//
//     return (
//         <div className="w-full">
//             {/* Header */}
//             <div className="mb-6">
//                 <h2 className="text-2xl font-bold mb-2">Booking Calendar</h2>
//                 <p className="text-neutral-500">Visual overview of all reservations across apartments</p>
//             </div>
//
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Month Revenue</p>
//                     <p className="text-2xl font-bold text-neutral-900">€{monthlyRevenue.toLocaleString()}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Confirmed Bookings</p>
//                     <p className="text-2xl font-bold text-blue-600">{confirmedBookings}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Occupied Days</p>
//                     <p className="text-2xl font-bold text-purple-600">{occupiedDays.size}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg border border-neutral-200">
//                     <p className="text-sm text-neutral-600 mb-1">Occupancy Rate</p>
//                     <p className="text-2xl font-bold text-green-600">
//                         {((occupiedDays.size / (calendarDays.length / 7 * 7)) * 100).toFixed(0)}%
//                     </p>
//                 </div>
//             </div>
//
//             {/* Calendar */}
//             <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
//                 {/* Month Navigation */}
//                 <div className="flex items-center justify-between p-6 border-b border-neutral-200">
//                     <button
//                         onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                         className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
//                     >
//                         <ChevronLeft className="h-5 w-5" />
//                     </button>
//                     <h3 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
//                     <button
//                         onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                         className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
//                     >
//                         <ChevronRight className="h-5 w-5" />
//                     </button>
//                 </div>
//
//                 {/* Day Headers */}
//                 <div className="grid grid-cols-7 gap-0 border-b border-neutral-200">
//                     {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                         <div key={day} className="p-4 text-center font-semibold text-neutral-700 bg-neutral-50">
//                             {day}
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* Calendar Days */}
//                 <div className="grid grid-cols-7 gap-0">
//                     {calendarDays.map((date, index) => {
//                         const dayReservations = getReservationsForDate(date);
//                         const isCurrentMonthDay = isSameMonth(date, currentMonth);
//                         const isTodayDay = isToday(date);
//                         const dateStr = dateKey(date);
//                         const isExpanded = expandedDate === dateStr;
//
//                         return (
//                             <div
//                                 key={index}
//                                 className={`min-h-32 border border-neutral-200 p-2 ${
//                                     !isCurrentMonthDay ? "bg-neutral-50" : ""
//                                 } ${isTodayDay ? "bg-blue-50" : ""}`}
//                             >
//                                 <div className={`text-sm font-semibold mb-2 ${!isCurrentMonthDay ? "text-neutral-400" : ""} ${isTodayDay ? "text-blue-600" : ""}`}>
//                                     {format(date, "d")}
//                                 </div>
//
//                                 <div className="space-y-1">
//                                     {dayReservations.map((res) => (
//                                         <button
//                                             key={res.id}
//                                             onClick={() => setSelectedReservation(res)}
//                                             className={`w-full text-xs p-1 rounded text-white truncate ${getStatusColor(res.bookingStatus)} transition-colors cursor-pointer`}
//                                             title={`${res.guestName} - ${res.apartmentName}`}
//                                         >
//                                             {res.apartmentName.split(" ")[0]}
//                                         </button>
//                                     ))}
//
//                                     {dayReservations.length > 0 && (
//                                         <button
//                                             onClick={() => setExpandedDate(isExpanded ? null : dateStr)}
//                                             className="text-xs text-blue-600 hover:text-blue-700 px-1 font-medium"
//                                         >
//                                             {dayReservations.length} booking{dayReservations.length !== 1 ? "s" : ""}
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//
//             {/* Expanded Day View */}
//             {expandedDate && (
//                 <div className="mt-6 bg-white rounded-lg border border-neutral-200 p-6">
//                     <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-lg font-semibold">
//                             All reservations for {format(new Date(expandedDate), "EEEE, MMMM d, yyyy")}
//                         </h3>
//                         <button
//                             onClick={() => setExpandedDate(null)}
//                             className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
//                         >
//                             <X className="h-5 w-5" />
//                         </button>
//                     </div>
//
//                     <div className="space-y-4">
//                         {getReservationsForDate(new Date(expandedDate)).map((res) => (
//                             <div
//                                 key={res.id}
//                                 onClick={() => setSelectedReservation(res)}
//                                 className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
//                             >
//                                 <div className="flex items-start justify-between mb-2">
//                                     <div>
//                                         <p className="font-semibold text-neutral-900">{res.guestName}</p>
//                                         <p className="text-sm text-neutral-600">{res.apartmentName}</p>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="font-bold text-lg text-neutral-900">€{res.totalPrice.toFixed(2)}</p>
//                                         <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getPaymentStatusBg(res.paymentStatus)}`}>
//                       {res.paymentStatus}
//                     </span>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-4 text-sm text-neutral-600 mt-3">
//                   <span className="flex items-center gap-1">
//                     <CalendarIcon className="h-4 w-4" />
//                       {format(new Date(res.checkIn), "MMM d")} → {format(new Date(res.checkOut), "MMM d")}
//                   </span>
//                                     <span className="flex items-center gap-1">
//                     <Users className="h-4 w-4" />
//                                         {res.numberOfGuests} guest{res.numberOfGuests !== 1 ? "s" : ""}
//                   </span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//
//             {/* Legend */}
//             <div className="mt-6 flex flex-wrap gap-4 justify-center">
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                     <span className="text-sm text-neutral-600">Confirmed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-yellow-500 rounded"></div>
//                     <span className="text-sm text-neutral-600">Pending</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-red-500 rounded"></div>
//                     <span className="text-sm text-neutral-600">Cancelled</span>
//                 </div>
//             </div>
//
//             {/* Reservation Detail Modal */}
//             {selectedReservation && (
//                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         {/* Header */}
//                         <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-start justify-between">
//                             <div>
//                                 <h2 className="text-2xl font-bold text-neutral-900">{selectedReservation.guestName}</h2>
//                                 <p className="text-sm text-neutral-500 mt-1">{selectedReservation.apartmentName}</p>
//                             </div>
//                             <button
//                                 onClick={() => setSelectedReservation(null)}
//                                 className="text-neutral-400 hover:text-neutral-600 transition-colors"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>
//                         </div>
//
//                         {/* Content */}
//                         <div className="p-6 space-y-6">
//                             {/* Status Badges */}
//                             <div className="flex gap-2">
//                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     selectedReservation.bookingStatus === "confirmed" ? "bg-blue-100 text-blue-800" :
//                         selectedReservation.bookingStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
//                             "bg-red-100 text-red-800"
//                 }`}>
//                   {selectedReservation.bookingStatus}
//                 </span>
//                                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusBg(selectedReservation.paymentStatus)}`}>
//                   {selectedReservation.paymentStatus}
//                 </span>
//                             </div>
//
//                             {/* Reservation Dates */}
//                             <div className="border-t pt-4">
//                                 <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
//                                     <CalendarIcon className="h-5 w-5" />
//                                     Dates
//                                 </h3>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <p className="text-sm text-neutral-600 mb-1">Check-in</p>
//                                         <p className="font-semibold text-neutral-900">{format(new Date(selectedReservation.checkIn), "PPpp")}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm text-neutral-600 mb-1">Check-out</p>
//                                         <p className="font-semibold text-neutral-900">{format(new Date(selectedReservation.checkOut), "PPpp")}</p>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Guest Info */}
//                             <div className="border-t pt-4">
//                                 <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
//                                     <Users className="h-5 w-5" />
//                                     Guest Information
//                                 </h3>
//                                 <div className="space-y-3">
//                                     <div>
//                                         <p className="text-sm text-neutral-600 mb-1">Number of Guests</p>
//                                         <p className="font-semibold text-neutral-900">{selectedReservation.numberOfGuests}</p>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Financial */}
//                             <div className="border-t pt-4">
//                                 <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
//                                     <Euro className="h-5 w-5" />
//                                     Financial Details
//                                 </h3>
//                                 <div className="bg-neutral-50 p-4 rounded-lg">
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-neutral-700">Total Price:</span>
//                                         <span className="text-2xl font-bold text-neutral-900">€{selectedReservation.totalPrice.toFixed(2)}</span>
//                                     </div>
//                                     <div className="text-sm text-neutral-600 mt-2">
//                                         Duration: {differenceInDays(new Date(selectedReservation.checkOut), new Date(selectedReservation.checkIn))} nights
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Footer */}
//                         <div className="border-t border-neutral-200 px-6 py-4 flex justify-end gap-3 bg-neutral-50">
//                             <button
//                                 onClick={() => setSelectedReservation(null)}
//                                 className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {/* Reservations List for Selected Month */}
//             <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-4">All Reservations in {format(currentMonth, "MMMM yyyy")}</h3>
//                 <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
//                     <table className="min-w-full text-sm">
//                         <thead className="bg-neutral-100">
//                         <tr>
//                             <th className="px-4 py-3 text-left font-semibold">Guest</th>
//                             <th className="px-4 py-3 text-left font-semibold">Apartment</th>
//                             <th className="px-4 py-3 text-left font-semibold">Check-in</th>
//                             <th className="px-4 py-3 text-left font-semibold">Check-out</th>
//                             <th className="px-4 py-3 text-left font-semibold">Status</th>
//                             <th className="px-4 py-3 text-left font-semibold">Amount</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {reservations
//                             .filter((res) => {
//                                 const checkIn = new Date(res.checkIn);
//                                 return checkIn.getMonth() === currentMonth.getMonth() &&
//                                     checkIn.getFullYear() === currentMonth.getFullYear();
//                             })
//                             .map((res) => (
//                                 <tr
//                                     key={res.id}
//                                     className="border-t hover:bg-neutral-50 cursor-pointer"
//                                     onClick={() => setSelectedReservation(res)}
//                                 >
//                                     <td className="px-4 py-3 font-medium">{res.guestName}</td>
//                                     <td className="px-4 py-3">{res.apartmentName}</td>
//                                     <td className="px-4 py-3">{format(new Date(res.checkIn), "dd MMM")}</td>
//                                     <td className="px-4 py-3">{format(new Date(res.checkOut), "dd MMM")}</td>
//                                     <td className="px-4 py-3">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           res.bookingStatus === "confirmed" ? "bg-blue-100 text-blue-800" :
//                               res.bookingStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
//                                   "bg-red-100 text-red-800"
//                       }`}>
//                         {res.bookingStatus}
//                       </span>
//                                     </td>
//                                     <td className="px-4 py-3 font-semibold">€{res.totalPrice.toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }



// ============================================
// app/admin/reservations/calendar/page.tsx
// ============================================

"use client";

import { useState, useEffect } from "react";
import { getCalendarReservations } from "@/services/dashboard/calendar";
import { CalendarReservation } from "@/types/calendar";
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, format } from "date-fns";
import { CalendarGrid } from "./components/CalendarGrid";
import { CalendarStats } from "./components/CalendarStats";
import { CalendarLegend } from "./components/CalendarLegend";
import { ReservationDetailModal } from "./components/ReservationDetailModal";
import { ExpandedDayView } from "./components/ExpandedDayView";
import { ReservationsTable } from "./components/ReservationsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarViewPage() {
    const [reservations, setReservations] = useState<CalendarReservation[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1));
    const [loading, setLoading] = useState(true);
    const [selectedReservation, setSelectedReservation] = useState<CalendarReservation | null>(null);
    const [expandedDate, setExpandedDate] = useState<string | null>(null);

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const data = await getCalendarReservations();
                setReservations(data);
            } catch (error) {
                console.error("Failed to load calendar reservations:", error);
            } finally {
                setLoading(false);
            }
        };
        loadReservations();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Loading calendar...</div>;
    }

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const firstDayOfWeek = monthStart.getDay();
    const previousMonthDays = eachDayOfInterval({
        start: subMonths(monthStart, 1),
        end: subMonths(monthStart, 1),
    });

    const calendarDays = [
        ...previousMonthDays.slice(Math.max(0, previousMonthDays.length - firstDayOfWeek)),
        ...daysInMonth,
    ];

    while (calendarDays.length % 7 !== 0) {
        calendarDays.push(new Date(calendarDays[calendarDays.length - 1].getTime() + 24 * 60 * 60 * 1000));
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Booking Calendar</h2>
                <p className="text-neutral-500">Visual overview of all reservations across apartments</p>
            </div>

            {/* Stats */}
            <CalendarStats reservations={reservations} currentMonth={currentMonth} calendarDays={calendarDays} />

            {/* Calendar */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm mb-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h3 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <CalendarGrid
                    calendarDays={calendarDays}
                    currentMonth={currentMonth}
                    reservations={reservations}
                    onSelectReservation={setSelectedReservation}
                    onSelectDate={(date) => setExpandedDate(date)}
                    expandedDate={expandedDate}
                />
            </div>

            {/* Legend */}
            <CalendarLegend />

            {/* Expanded Day View */}
            {expandedDate && (
                <ExpandedDayView
                    date={expandedDate}
                    reservations={reservations}
                    onSelectReservation={setSelectedReservation}
                    onClose={() => setExpandedDate(null)}
                />
            )}

            {/* Reservation Detail Modal */}
            {selectedReservation && (
                <ReservationDetailModal
                    reservation={selectedReservation}
                    onClose={() => setSelectedReservation(null)}
                />
            )}

            {/* Reservations Table */}
            <ReservationsTable
                reservations={reservations}
                currentMonth={currentMonth}
                onSelectReservation={setSelectedReservation}
            />
        </div>
    );
}