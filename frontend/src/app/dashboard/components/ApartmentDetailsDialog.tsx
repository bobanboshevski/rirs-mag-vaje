"use client";

import {Apartment} from "@/types/apartment";
import {X, Users, Home, FileText, Zap} from "lucide-react";

type Props = {
    apartment: Apartment | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function ApartmentDetailsDialog({apartment, open, onOpenChange}: Props) {
    if (!apartment) return null;

    const statusColors = {
        available: "bg-green-100 text-green-700 border-green-300",
        occupied: "bg-blue-100 text-blue-700 border-blue-300",
        maintenance: "bg-orange-100 text-orange-700 border-orange-300",
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div
                            className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900">{apartment.name}</h2>
                                <p className="text-sm text-neutral-500 mt-1">
                                    {apartment.building} • Floor {apartment.floor} • #{apartment.number}
                                </p>
                            </div>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                <X className="h-6 w-6"/>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div>
                <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                        statusColors[apartment.status as keyof typeof statusColors]
                    }`}
                >
                  {apartment.status.charAt(0).toUpperCase() + apartment.status.slice(1)}
                </span>
                            </div>

                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-neutral-600"/>
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Building</p>
                                        <p className="font-semibold text-neutral-900">{apartment.building}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Apartment Number</p>
                                        <p className="font-semibold text-neutral-900">{apartment.number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Floor</p>
                                        <p className="font-semibold text-neutral-900">{apartment.floor}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Price per Night</p>
                                        <p className="font-semibold text-neutral-900">€{apartment.pricePerNight}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Capacity Information */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-neutral-600"/>
                                    Capacity & Layout
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <p className="text-xs text-neutral-500 mb-1">Max Guests</p>
                                        <p className="text-2xl font-bold text-neutral-900">{apartment.maxGuests}</p>
                                    </div>
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <p className="text-xs text-neutral-500 mb-1">Bedrooms</p>
                                        <p className="text-2xl font-bold text-neutral-900">{apartment.bedrooms}</p>
                                    </div>
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <p className="text-xs text-neutral-500 mb-1">Bathrooms</p>
                                        <p className="text-2xl font-bold text-neutral-900">{apartment.bathrooms}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-neutral-600"/>
                                    Description
                                </h3>
                                <p className="text-neutral-700 leading-relaxed">{apartment.description}</p>
                            </div>

                            {/* Amenities */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                    <Home className="h-5 w-5 text-neutral-600"/>
                                    Amenities ({apartment.amenities.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {apartment.amenities.map((amenity) => (
                                        <span
                                            key={amenity}
                                            className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                        >
                      ✓ {amenity}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div
                                className="bg-gradient-to-r from-neutral-50 to-neutral-100 border border-neutral-200 rounded-lg p-4 mt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-neutral-600">Total Amenities</p>
                                        <p className="text-lg font-bold text-neutral-900">{apartment.amenities.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-neutral-600">Capacity (guests × nights)</p>
                                        {/* TODO: Calculate days occupied */}
                                        <p className="text-lg font-bold text-neutral-900">
                                            €{(apartment.pricePerNight * apartment.maxGuests).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-neutral-200 px-6 py-4 flex justify-end gap-3 bg-neutral-50">
                            <button
                                onClick={() => onOpenChange(false)}
                                className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}