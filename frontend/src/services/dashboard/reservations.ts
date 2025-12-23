import {fetchFromApi} from "@/lib/api/fetchFromApi";
import {Reservation} from "@/types/reservation";

export async function getPastReservations(): Promise<Reservation[]> {
    return await fetchFromApi("/reservations/past", {
        method: "GET"
    });
}

export async function getFutureReservations(): Promise<Reservation[]> {
    return await fetchFromApi("/reservations/future", {
        method: "GET"
    });
}