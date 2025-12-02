
import {fetchFromApi} from "@/lib/api/fetchFromApi";
import {Apartment} from "@/types/apartment";

export async function getApartments(): Promise<Apartment[]> {
    return await fetchFromApi("/apartments", {
        method: "GET"
    });


    // return [
    //     {
    //         id: "apt_001",
    //         name: "Lakeview Apartment",
    //         building: "Building A",
    //         floor: 3,
    //         number: "301",
    //         maxGuests: 4,
    //         bedrooms: 2,
    //         bathrooms: 1,
    //         pricePerNight: 85,
    //         status: "available",
    //         amenities: ["WiFi", "TV", "Kitchen", "Air Conditioning", "Balcony"],
    //         description: "Beautiful apartment with lake views and modern amenities.",
    //     },
    //     {
    //         id: "apt_002",
    //         name: "Central City Loft",
    //         building: "Building B",
    //         floor: 5,
    //         number: "502",
    //         maxGuests: 2,
    //         bedrooms: 1,
    //         bathrooms: 1,
    //         pricePerNight: 95,
    //         status: "occupied",
    //         amenities: ["WiFi", "TV", "Kitchen", "Elevator", "Parking"],
    //         description: "Modern loft in the heart of the city.",
    //     },
    //     {
    //         id: "apt_003",
    //         name: "Sunset Studio",
    //         building: "Building A",
    //         floor: 1,
    //         number: "105",
    //         maxGuests: 2,
    //         bedrooms: 1,
    //         bathrooms: 1,
    //         pricePerNight: 65,
    //         status: "maintenance",
    //         amenities: ["WiFi", "TV", "Kitchen"],
    //         description: "Cozy studio perfect for couples.",
    //     },
    // ];
}

export async function createApartment(apartment: Omit<Apartment, "id">): Promise<Apartment> {
    // TODO: Uncomment when backend is ready
    // return await fetchFromApi("/apartments", {
    //   method: "POST",
    //   body: JSON.stringify(apartment),
    // });

    return { ...apartment, id: `apt_${Date.now()}` };
}

export async function updateApartment(id: string, apartment: Partial<Apartment>): Promise<Apartment> {
    // TODO: Uncomment when backend is ready
    // return await fetchFromApi(`/apartments/${id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(apartment),
    // });

    return { ...apartment, id } as Apartment;
}

export async function deleteApartment(id: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // await fetchFromApi(`/apartments/${id}`, {
    //   method: "DELETE",
    // });
}