import {fetchFromApi} from "@/lib/api/fetchFromApi";
import {Apartment} from "@/types/apartment";

export async function getApartments(): Promise<Apartment[]> {
    return await fetchFromApi("/apartments", {
        method: "GET"
    });
}

export async function createApartment(apartment: Omit<Apartment, "id">): Promise<Apartment> {
    // TODO: Uncomment when backend is ready
    // return await fetchFromApi("/apartments", {
    //   method: "POST",
    //   body: JSON.stringify(apartment),
    // });

    return {...apartment, id: `apt_${Date.now()}`};
}

export async function updateApartment(id: string, apartment: Partial<Apartment>): Promise<Apartment> {
    // TODO: Uncomment when backend is ready
    // return await fetchFromApi(`/apartments/${id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(apartment),
    // });

    return {...apartment, id} as Apartment;
}

export async function deleteApartment(id: string): Promise<void> {
    // TODO: Uncomment when backend is ready
    // await fetchFromApi(`/apartments/${id}`, {
    //   method: "DELETE",
    // });
}