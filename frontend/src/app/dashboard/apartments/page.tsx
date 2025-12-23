"use client";

import {getApartments} from "@/services/dashboard/apartments";
import {ApartmentsList} from "@/app/dashboard/components/ApartmentsList";
import {useEffect, useState} from "react";
import {Apartment} from "@/types/apartment";

export default function ApartmentsPage() {
    // let apartments = [];
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // try {
    //     apartments = await getApartments();
    // } catch (error) {
    //     console.error("Failed to fetch apartments:", error);
    //     return (
    //         <div>
    //             <h2 className="text-2xl font-bold mb-2">Apartments</h2>
    //             <p className="text-red-500">Failed to load apartments. Please try again later.</p>
    //         </div>
    //     );
    // }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getApartments();
                setApartments(data);
            } catch (err: any) {
                console.error("Failed to fetch apartments:", err);
                setError("Failed to load apartments. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Apartments</h2>
                    <p className="text-neutral-500">Manage all apartments in your building.</p>
                </div>
            </div>

            {/*<ApartmentsList initialApartments={apartments}/>*/}
            {loading && <p>Loading apartments...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <ApartmentsList initialApartments={apartments}/>}
        </div>
    );
}