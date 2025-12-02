// // app/admin/apartments/page.tsx
// export default async function ApartmentsPage() {
//     return (
//         <div>
//             <h2 className="text-xl font-semibold mb-4">Apartments</h2>
//             <p className="text-neutral-500 mb-6">Manage all apartments here.</p>
//             {/* Later: Table with Add/Edit/Delete */}
//         </div>
//     );
// }


import {getApartments} from "@/services/dashboard/apartments";
import {ApartmentsList} from "@/app/dashboard/components/ApartmentsList";

export default async function ApartmentsPage() {
    let apartments = [];

    try {
        apartments = await getApartments();
    } catch (error) {
        console.error("Failed to fetch apartments:", error);
        return (
            <div>
                <h2 className="text-2xl font-bold mb-2">Apartments</h2>
                <p className="text-red-500">Failed to load apartments. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Apartments</h2>
                    <p className="text-neutral-500">Manage all apartments in your building.</p>
                </div>
            </div>

            <ApartmentsList initialApartments={apartments} />
        </div>
    );
}