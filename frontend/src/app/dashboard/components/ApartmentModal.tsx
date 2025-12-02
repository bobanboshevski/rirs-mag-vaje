// app/admin/apartments/components/ApartmentModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Apartment, COMMON_AMENITIES } from "@/types/apartment";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (apartment: Apartment) => void;
    apartment: Apartment | null;
};

export function ApartmentModal({ isOpen, onClose, onSave, apartment }: Props) {
    const [formData, setFormData] = useState<Apartment>({
        id: "",
        name: "",
        building: "",
        floor: 1,
        number: "",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        pricePerNight: 50,
        status: "available",
        amenities: [],
        description: "",
    });

    useEffect(() => {
        if (apartment) {
            setFormData(apartment);
        } else {
            setFormData({
                id: "",
                name: "",
                building: "",
                floor: 1,
                number: "",
                maxGuests: 2,
                bedrooms: 1,
                bathrooms: 1,
                pricePerNight: 50,
                status: "available",
                amenities: [],
                description: "",
            });
        }
    }, [apartment, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const toggleAmenity = (amenity: string) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{apartment ? "Edit Apartment" : "Add New Apartment"}</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Apartment Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="e.g., Lakeview Apartment"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Building</label>
                            <input
                                type="text"
                                required
                                value={formData.building}
                                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="Building A"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Apartment Number
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="101"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Floor</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.floor}
                                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            >
                                <option value="available">Available</option>
                                <option value="occupied">Occupied</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Max Guests</label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={formData.maxGuests}
                                onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Bedrooms</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.bedrooms}
                                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Bathrooms</label>
                            <input
                                type="number"
                                required
                                min="1"
                                step="0.5"
                                value={formData.bathrooms}
                                onChange={(e) =>
                                    setFormData({ ...formData, bathrooms: parseFloat(e.target.value) })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Price per Night (€)
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={formData.pricePerNight}
                                onChange={(e) =>
                                    setFormData({ ...formData, pricePerNight: parseFloat(e.target.value) })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Amenities</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {COMMON_AMENITIES.map((amenity) => (
                                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => toggleAmenity(amenity)}
                                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                        />
                                        <span className="text-sm text-neutral-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                                placeholder="Brief description of the apartment..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-neutral-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                        >
                            {apartment ? "Update" : "Create"} Apartment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}