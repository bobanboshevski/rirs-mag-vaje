"use client";

import { MaintenanceAlert } from "@/types/maintenance";
import { AlertTriangle, Wrench } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Props = {
    alerts: MaintenanceAlert[];
};

export function MaintenanceAlerts({ alerts }: Props) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "bg-red-100 text-red-800 border-red-300";
            case "high":
                return "bg-orange-100 text-orange-800 border-orange-300";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            default:
                return "bg-blue-100 text-blue-800 border-blue-300";
        }
    };

    if (alerts.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Wrench className="h-5 w-5 text-neutral-400" />
                    <h3 className="text-lg font-semibold text-neutral-900">Maintenance Alerts</h3>
                </div>
                <p className="text-sm text-neutral-500 text-center py-4">
                    No maintenance issues reported 🎉
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-neutral-900">Maintenance Alerts</h3>
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length}
        </span>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`p-4 rounded-lg border-2 ${getPriorityColor(alert.priority)}`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-sm">{alert.apartmentName}</p>
                            <span className="text-xs font-bold uppercase">{alert.priority}</span>
                        </div>
                        <p className="text-sm mb-2">{alert.issue}</p>
                        <p className="text-xs opacity-75">
                            Reported {formatDistanceToNow(new Date(alert.reportedDate), { addSuffix: true })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}