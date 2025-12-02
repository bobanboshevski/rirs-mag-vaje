"use client";

import {Guest} from "@/types/guest";
import {format} from "date-fns";
import {Mail, Phone, Star} from "lucide-react";

type Props = {
    guests: Guest[];
};

export function GuestsTable({guests}: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-neutral-100 text-neutral-800";
            case "blacklisted":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">All Guests ({guests.length})</h3>

            <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-neutral-100 text-neutral-700">
                        <tr>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Guest</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Contact</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Nationality</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Bookings</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Total Spent</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Avg Stay</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Rating</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Channel</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Status</th>
                            <th className="px-6 py-3 font-semibold whitespace-nowrap">Tags</th>
                        </tr>
                        </thead>
                        <tbody>
                        {guests.map((guest) => (
                            <tr key={guest.id} className="border-t hover:bg-neutral-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="font-medium text-neutral-900">
                                            {guest.firstName} {guest.lastName}
                                            {guest.vipStatus && (
                                                <span className="ml-2 text-yellow-500">👑</span>
                                            )}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            Since {format(new Date(guest.firstBookingDate), "MMM yyyy")}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-xs text-neutral-600">
                                            <Mail className="h-3 w-3"/>
                                            {guest.email}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-neutral-600">
                                            <Phone className="h-3 w-3"/>
                                            {guest.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{guest.nationality}</td>
                                <td className="px-6 py-4 text-center font-medium whitespace-nowrap">
                                    {guest.totalBookings}
                                </td>
                                <td className="px-6 py-4 font-semibold whitespace-nowrap">
                                    €{guest.totalSpent.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    {guest.averageStayLength} nights
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                        <span className="font-medium">{guest.guestRating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs whitespace-nowrap capitalize">
                                    {guest.bookingChannel}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                            guest.status
                        )}`}
                    >
                      {guest.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                        {guest.tags?.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                                            >
                          {tag}
                        </span>
                                        ))}
                                        {guest.tags && guest.tags.length > 2 && (
                                            <span className="text-xs text-neutral-500">
                          +{guest.tags.length - 2}
                        </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}