// ============================================
// app/admin/reservations/calendar/page.tsx
// ============================================

"use client";

import {useState, useEffect} from "react";
import {getCalendarReservations} from "@/services/dashboard/calendar";
import {CalendarReservation} from "@/types/calendar";
import {startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, format} from "date-fns";
import {CalendarGrid} from "./components/CalendarGrid";
import {CalendarStats} from "./components/CalendarStats";
import {CalendarLegend} from "./components/CalendarLegend";
import {ReservationDetailModal} from "./components/ReservationDetailModal";
import {ExpandedDayView} from "./components/ExpandedDayView";
import {ReservationsTable} from "./components/ReservationsTable";
import {ChevronLeft, ChevronRight} from "lucide-react";

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
    const daysInMonth = eachDayOfInterval({start: monthStart, end: monthEnd});

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
        // calendarDays.push(new Date(calendarDays[calendarDays.length - 1].getTime() + 24 * 60 * 60 * 1000));
        const lastDay = calendarDays[calendarDays.length - 1];

        if (!lastDay) break;

        calendarDays.push(
            new Date(lastDay.getTime() + 24 * 60 * 60 * 1000)
        );

    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Booking Calendar</h2>
                <p className="text-neutral-500">Visual overview of all reservations across apartments</p>
            </div>

            {/* Stats */}
            <CalendarStats reservations={reservations} currentMonth={currentMonth} calendarDays={calendarDays}/>

            {/* Calendar */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm mb-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5"/>
                    </button>
                    <h3 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="h-5 w-5"/>
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
            <CalendarLegend/>

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