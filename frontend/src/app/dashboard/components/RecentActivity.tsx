"use client";

import {Activity} from "@/types/dashboardOverview";
import {Calendar, Clock, Euro, Wrench, XCircle} from "lucide-react";
import {formatDistanceToNow} from "date-fns";

type Props = {
    activities: Activity[];
};

export function RecentActivity({ activities }: Props) {
    const getIcon = (type: Activity["type"]) => {
        switch (type) {
            case "booking":
                return Calendar;
            case "payment":
                return Euro;
            case "maintenance":
                return Wrench;
            case "cancellation":
                return XCircle;
            default:
                return Calendar; // safe fallback (should never happen)
        }
    };

    const getColor = (type: Activity["type"]) => {
        switch (type) {
            case "booking":
                return "bg-blue-100 text-blue-600";
            case "payment":
                return "bg-green-100 text-green-600";
            case "maintenance":
                return "bg-orange-100 text-orange-600";
            case "cancellation":
                return "bg-red-100 text-red-600";
        }
    };

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-neutral-400" />
                <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => {
                    const Icon = getIcon(activity.type);
                    return (
                        <div key={activity.id} className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${getColor(activity.type)}`}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900">{activity.description}</p>
                                {activity.apartmentName && (
                                    <p className="text-xs text-neutral-600">{activity.apartmentName}</p>
                                )}
                                <p className="text-xs text-neutral-500 mt-1">
                                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}