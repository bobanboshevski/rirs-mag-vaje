// ============================================
// app/admin/reservations/calendar/components/CalendarDayCell.tsx
// ============================================

"use client";

import {CalendarReservation} from "@/types/calendar";

type Props = {
    date: Date;
    currentMonth: Date;
    reservations: CalendarReservation[];
    isToday: boolean;
    isCurrentMonth: boolean;
    onSelectReservation: (reservation: CalendarReservation) => void;
    onSelectDate: () => void;
    isExpanded: boolean;
};

export function CalendarDayCell({
                                    date,
                                    reservations,
                                    isToday,
                                    isCurrentMonth,
                                    onSelectReservation,
                                    onSelectDate,
                                    isExpanded,
                                }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-blue-500 hover:bg-blue-600";
            case "pending":
                return "bg-yellow-500 hover:bg-yellow-600";
            case "cancelled":
                return "bg-red-500 hover:bg-red-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    return (
        <div
            className={`min-h-32 border border-neutral-200 p-2 ${
                !isCurrentMonth ? "bg-neutral-50" : ""
            } ${isToday ? "bg-blue-50" : ""}`}
        >
            <div
                className={`text-sm font-semibold mb-2 ${
                    !isCurrentMonth ? "text-neutral-400" : ""
                } ${isToday ? "text-blue-600" : ""}`}
            >
                {date.getDate()}
            </div>

            <div className="space-y-1">
                {reservations.map((res) => (
                    <button
                        key={res.id}
                        onClick={() => onSelectReservation(res)}
                        className={`w-full text-xs p-1 rounded text-white truncate ${getStatusColor(res.bookingStatus)} transition-colors cursor-pointer`}
                        title={`${res.guestName} - ${res.apartmentName}`}
                    >
                        {res.apartmentName.split(" ")[0]}
                    </button>
                ))}

                {reservations.length > 0 && (
                    <button
                        onClick={onSelectDate}
                        className={`text-xs px-1 font-medium ${isExpanded ? "text-purple-600 hover:text-purple-700" : "text-blue-600 hover:text-blue-700"}`}
                    >
                        {reservations.length} booking{reservations.length !== 1 ? "s" : ""}
                    </button>
                )}
            </div>
        </div>
    );
}