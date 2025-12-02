"use client";

// import {UpcomingReservation} from "@/types/dashboardOverview";
// import {ArrowLeft, ArrowRight, Calendar} from "lucide-react";
// import {format} from "date-fns";
//
// type Props = {
//     checkIns: UpcomingReservation[];
//     checkOuts: UpcomingReservation[];
// };
//
// export function UpcomingCheckInsOuts({ checkIns, checkOuts }: Props) {
//     return (
//         <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//                 <Calendar className="h-5 w-5 text-neutral-400" />
//                 <h3 className="text-lg font-semibold text-neutral-900">Upcoming Activity</h3>
//             </div>
//
//             <div className="space-y-4">
//                 <div>
//                     <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
//                         <ArrowRight className="h-4 w-4" />
//                         Check-ins
//                     </h4>
//                     <div className="space-y-2">
//                         {checkIns.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
//                             >
//                                 <div>
//                                     <p className="font-medium text-sm text-neutral-900">{item.guestName}</p>
//                                     <p className="text-xs text-neutral-600">{item.apartmentName}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-sm font-medium text-neutral-900">
//                                         {format(new Date(item.date), "MMM dd")}
//                                     </p>
//                                     <p className="text-xs text-neutral-600">{item.time}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//
//                 <div>
//                     <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
//                         <ArrowLeft className="h-4 w-4" />
//                         Check-outs
//                     </h4>
//                     <div className="space-y-2">
//                         {checkOuts.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
//                             >
//                                 <div>
//                                     <p className="font-medium text-sm text-neutral-900">{item.guestName}</p>
//                                     <p className="text-xs text-neutral-600">{item.apartmentName}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-sm font-medium text-neutral-900">
//                                         {format(new Date(item.date), "MMM dd")}
//                                     </p>
//                                     <p className="text-xs text-neutral-600">{item.time}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { UpcomingReservation, CleaningTask } from "@/types/dashboardOverview";
import { Calendar, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { format } from "date-fns";

type Props = {
    checkIns: UpcomingReservation[];
    checkOuts: UpcomingReservation[];
    cleanings: CleaningTask[];
};

export function UpcomingCheckInsOuts({ checkIns, checkOuts, cleanings }: Props) {
    const getCleaningIcon = (type: string) => {
        return type === "routine" ? "🧹" : type === "checkin" ? "✨" : "🧼";
    };

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-neutral-400" />
                <h3 className="text-lg font-semibold text-neutral-900">Today's Activity</h3>
            </div>

            <div className="space-y-4">
                {/* Check-ins */}
                <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Check-ins ({checkIns.length})
                    </h4>
                    <div className="space-y-2">
                        {checkIns.slice(0, 3).map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-sm text-neutral-900">{item.guestName}</p>
                                    <p className="text-xs text-neutral-600">{item.apartmentName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-neutral-900">
                                        {format(new Date(item.date), "MMM dd")}
                                    </p>
                                    <p className="text-xs text-neutral-600">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Check-outs */}
                <div>
                    <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Check-outs ({checkOuts.length})
                    </h4>
                    <div className="space-y-2">
                        {checkOuts.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-sm text-neutral-900">{item.guestName}</p>
                                    <p className="text-xs text-neutral-600">{item.apartmentName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-neutral-900">
                                        {format(new Date(item.date), "MMM dd")}
                                    </p>
                                    <p className="text-xs text-neutral-600">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cleanings */}
                <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Scheduled Cleanings ({cleanings.length})
                    </h4>
                    <div className="space-y-2">
                        {cleanings.map((item) => (
                            <div
                                key={item.id}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                    item.status === "in-progress"
                                        ? "bg-blue-100 border border-blue-300"
                                        : "bg-blue-50"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{getCleaningIcon(item.type)}</span>
                                    <div>
                                        <p className="font-medium text-sm text-neutral-900">{item.apartmentName}</p>
                                        <p className="text-xs text-neutral-600 capitalize">{item.type} cleaning</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-neutral-900">
                                        {format(new Date(item.scheduledTime), "HH:mm")}
                                    </p>
                                    <p className="text-xs text-neutral-600 capitalize">{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}