// ============================================
// app/admin/reservations/calendar/components/CalendarLegend.tsx
// ============================================

"use client";

export function CalendarLegend() {
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-6">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-neutral-600">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm text-neutral-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-neutral-600">Cancelled</span>
            </div>
        </div>
    );
}