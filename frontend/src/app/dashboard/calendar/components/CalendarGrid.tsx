// ============================================
// app/admin/reservations/calendar/components/CalendarGrid.tsx
// ============================================

"use client";

import { CalendarReservation } from "@/types/calendar";
import { isSameMonth, isToday, format } from "date-fns";
import {CalendarDayCell} from "@/app/dashboard/calendar/components/CalendarDayCell";

type Props = {
    calendarDays: Date[];
    currentMonth: Date;
    reservations: CalendarReservation[];
    onSelectReservation: (reservation: CalendarReservation) => void;
    onSelectDate: (date: string) => void;
    expandedDate: string | null;
};

export function CalendarGrid({
                                 calendarDays,
                                 currentMonth,
                                 reservations,
                                 onSelectReservation,
                                 onSelectDate,
                                 expandedDate,
                             }: Props) {
    const getReservationsForDate = (date: Date) => {
        return reservations.filter((res) => {
            const checkInDate = new Date(res.checkIn);
            const checkOutDate = new Date(res.checkOut);
            return date >= checkInDate && date < checkOutDate;
        });
    };

    const dateKey = (date: Date) => format(date, "yyyy-MM-dd");

    return (
        <>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-0 border-b border-neutral-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-4 text-center font-semibold text-neutral-700 bg-neutral-50">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0">
                {calendarDays.map((date, index) => (
                    <CalendarDayCell
                        key={index}
                        date={date}
                        currentMonth={currentMonth}
                        reservations={getReservationsForDate(date)}
                        isToday={isToday(date)}
                        isCurrentMonth={isSameMonth(date, currentMonth)}
                        onSelectReservation={onSelectReservation}
                        onSelectDate={() => onSelectDate(dateKey(date))}
                        isExpanded={expandedDate === dateKey(date)}
                    />
                ))}
            </div>
        </>
    );
}