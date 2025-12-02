// types/apartment.ts
export interface Apartment {
    id: string;
    name: string;
    building: string;
    floor: number;
    number: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    pricePerNight: number;
    status: "available" | "occupied" | "maintenance";
    amenities: string[];
    description: string;
}

export type ApartmentStatus = "available" | "occupied" | "maintenance";

export const COMMON_AMENITIES = [
    "WiFi",
    "TV",
    "Kitchen",
    "Washing Machine",
    "Air Conditioning",
    "Heating",
    "Parking",
    "Balcony",
    "Elevator",
    "Dishwasher",
] as const;