"use client";

import {Edit2, Trash2, Home, Users, Euro, Eye} from "lucide-react";
import { Apartment } from "@/types/apartment";

type Props = {
    apartment: Apartment;
    onEdit: (apartment: Apartment) => void;
    onDelete: (apartment: Apartment) => void; // Changed from id to apartment
    onDetails: (apartment: Apartment) => void; // new
};

export function ApartmentCard({ apartment, onEdit, onDelete, onDetails }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "bg-green-100 text-green-800";
            case "occupied":
                return "bg-blue-100 text-blue-800";
            case "maintenance":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 cursor-pointer" onClick={() => onDetails(apartment)}>
            <h3 className="text-lg font-semibold text-neutral-900 hover:text-neutral-700">
              {apartment.name}
            </h3>
            <p className="text-sm text-neutral-500">
              {apartment.building} • Floor {apartment.floor} • #{apartment.number}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
              apartment.status
            )}`}
          >
            {apartment.status}
          </span>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Users className="h-4 w-4" />
                        <span>Max {apartment.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Home className="h-4 w-4" />
                        <span>
              {apartment.bedrooms} bed • {apartment.bathrooms} bath
            </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                        <Euro className="h-4 w-4" />
                        <span>€{apartment.pricePerNight}/night</span>
                    </div>
                </div>

                {apartment.amenities.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                            {apartment.amenities.slice(0, 3).map((amenity, i) => (
                                <span key={i} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                  {amenity}
                </span>
                            ))}
                            {apartment.amenities.length > 3 && (
                                <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                  +{apartment.amenities.length - 3} more
                </span>
                            )}
                        </div>
                    </div>
                )}

        <div className="flex gap-2 pt-4 border-t border-neutral-200">
          <button
            onClick={() => onDetails(apartment)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Eye className="h-4 w-4" />
            Details
          </button>
          <button
            onClick={() => onEdit(apartment)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(apartment)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}