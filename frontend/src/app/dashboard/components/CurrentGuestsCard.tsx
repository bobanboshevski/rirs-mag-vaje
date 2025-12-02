"use client";

import { Users } from "lucide-react";

type Props = {
    currentGuests: number;
    occupiedApartments: number;
};

export function CurrentGuestsCard({ currentGuests, occupiedApartments }: Props) {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                    <Users className="h-6 w-6" />
                </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{currentGuests}</h3>
            <p className="text-sm font-medium text-blue-100 mb-1">Guests Currently Staying</p>
            <p className="text-xs text-blue-200">Across {occupiedApartments} apartments</p>
        </div>
    );
}