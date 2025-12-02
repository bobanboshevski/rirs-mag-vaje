// // / app/admin/apartments/components/ApartmentsList.tsx
// "use client";
//
// import { useState } from "react";
// import { Plus, Edit2, Trash2, Home, Users, Euro } from "lucide-react";
// import {ApartmentModal} from "@/app/(store)/dashboard/components/ApartmentModal";
// // import { ApartmentModal } from "./ApartmentModal";
//
// type Apartment = {
//     id: string;
//     name: string;
//     building: string;
//     floor: number;
//     number: string;
//     maxGuests: number;
//     bedrooms: number;
//     bathrooms: number;
//     pricePerNight: number;
//     status: "available" | "occupied" | "maintenance";
//     amenities: string[];
//     description: string;
// };
//
// type Props = {
//     initialApartments: Apartment[];
// };
//
// export function ApartmentsList({ initialApartments }: Props) {
//     const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
//
//     const handleAdd = () => {
//         setEditingApartment(null);
//         setIsModalOpen(true);
//     };
//
//     const handleEdit = (apartment: Apartment) => {
//         setEditingApartment(apartment);
//         setIsModalOpen(true);
//     };
//
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this apartment?")) return;
//
//         // TODO: Call API to delete
//         // await deleteApartment(id);
//
//         setApartments(apartments.filter(a => a.id !== id));
//     };
//
//     const handleSave = (apartment: Apartment) => {
//         if (editingApartment) {
//             // Update existing
//             setApartments(apartments.map(a => a.id === apartment.id ? apartment : a));
//         } else {
//             // Add new
//             setApartments([...apartments, { ...apartment, id: `apt_${Date.now()}` }]);
//         }
//         setIsModalOpen(false);
//     };
//
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "available":
//                 return "bg-green-100 text-green-800";
//             case "occupied":
//                 return "bg-blue-100 text-blue-800";
//             case "maintenance":
//                 return "bg-red-100 text-red-800";
//             default:
//                 return "bg-neutral-100 text-neutral-800";
//         }
//     };
//
//     return (
//         <>
//             <div className="mb-4">
//                 <button
//                     onClick={handleAdd}
//                     className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
//                 >
//                     <Plus className="h-5 w-5" />
//                     Add Apartment
//                 </button>
//             </div>
//
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {apartments.map((apartment) => (
//                     <div
//                         key={apartment.id}
//                         className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                         <div className="p-6">
//                             <div className="flex justify-between items-start mb-4">
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-neutral-900">{apartment.name}</h3>
//                                     <p className="text-sm text-neutral-500">
//                                         {apartment.building} • Floor {apartment.floor} • #{apartment.number}
//                                     </p>
//                                 </div>
//                                 <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(apartment.status)}`}>
//                   {apartment.status}
//                 </span>
//                             </div>
//
//                             <div className="space-y-3 mb-4">
//                                 <div className="flex items-center gap-2 text-sm text-neutral-600">
//                                     <Users className="h-4 w-4" />
//                                     <span>Max {apartment.maxGuests} guests</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 text-sm text-neutral-600">
//                                     <Home className="h-4 w-4" />
//                                     <span>{apartment.bedrooms} bed • {apartment.bathrooms} bath</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
//                                     <Euro className="h-4 w-4" />
//                                     <span>€{apartment.pricePerNight}/night</span>
//                                 </div>
//                             </div>
//
//                             {apartment.amenities.length > 0 && (
//                                 <div className="mb-4">
//                                     <div className="flex flex-wrap gap-1">
//                                         {apartment.amenities.slice(0, 3).map((amenity, i) => (
//                                             <span key={i} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
//                         {amenity}
//                       </span>
//                                         ))}
//                                         {apartment.amenities.length > 3 && (
//                                             <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
//                         +{apartment.amenities.length - 3} more
//                       </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}
//
//                             <div className="flex gap-2 pt-4 border-t border-neutral-200">
//                                 <button
//                                     onClick={() => handleEdit(apartment)}
//                                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
//                                 >
//                                     <Edit2 className="h-4 w-4" />
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(apartment.id)}
//                                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
//                                 >
//                                     <Trash2 className="h-4 w-4" />
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {apartments.length === 0 && (
//                 <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
//                     <Home className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-neutral-900 mb-2">No apartments yet</h3>
//                     <p className="text-neutral-500 mb-4">Get started by adding your first apartment.</p>
//                     <button
//                         onClick={handleAdd}
//                         className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
//                     >
//                         <Plus className="h-5 w-5" />
//                         Add First Apartment
//                     </button>
//                 </div>
//             )}
//
//             <ApartmentModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSave={handleSave}
//                 apartment={editingApartment}
//             />
//         </>
//     );
// }







// app/admin/apartments/components/ApartmentsList.tsx
// "use client";
//
// import {useState} from "react";
// import {Plus, Home} from "lucide-react";
// import {Apartment} from "@/types/apartment";
// import {ApartmentCard} from "@/app/(store)/dashboard/components/ApartmentCard";
// import {ApartmentModal} from "@/app/(store)/dashboard/components/ApartmentModal";
// import {DeleteConfirmationDialog} from "@/app/(store)/dashboard/components/DeleteConfirmationDialog";
// import {ApartmentDetailsDialog} from "@/app/(store)/dashboard/components/ApartmentDetailsDialog";
//
// type Props = {
//     initialApartments: Apartment[];
// };
//
// export function ApartmentsList({initialApartments}: Props) {
//     const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
//     const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(null);
//     const [isDeleting, setIsDeleting] = useState(false);
//
//     const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
//
//     const handleAdd = () => {
//         setEditingApartment(null);
//         setIsModalOpen(true);
//     };
//
//     const handleEdit = (apartment: Apartment) => {
//         setEditingApartment(apartment);
//         setIsModalOpen(true);
//     };
//
//     const handleDeleteClick = (apartment: Apartment) => {
//         setDeletingApartment(apartment);
//         setIsDeleteDialogOpen(true);
//     };
//
//
//
//     const handleDeleteConfirm = async () => {
//         if (!deletingApartment) return;
//
//         setIsDeleting(true);
//
//         try {
//             // TODO: Call API to delete
//             // await deleteApartment(deletingApartment.id);
//
//             // Simulate API delay
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//
//             setApartments(apartments.filter((a) => a.id !== deletingApartment.id));
//             setIsDeleteDialogOpen(false);
//             setDeletingApartment(null);
//         } catch (error) {
//             console.error("Failed to delete apartment:", error);
//             // Show error toast/notification here
//         } finally {
//             setIsDeleting(false);
//         }
//     };
//
//     const handleSave = (apartment: Apartment) => {
//         if (editingApartment) {
//             // Update existing
//             setApartments(apartments.map((a) => (a.id === apartment.id ? apartment : a)));
//         } else {
//             // Add new
//             setApartments([...apartments, {...apartment, id: `apt_${Date.now()}`}]);
//         }
//         setIsModalOpen(false);
//     };
//
//     return (
//         <>
//             <div className="mb-4">
//                 <button
//                     onClick={handleAdd}
//                     className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
//                 >
//                     <Plus className="h-5 w-5" />
//                     Add Apartment
//                 </button>
//             </div>
//
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {apartments.map((apartment) => (
//                     <ApartmentCard
//                         key={apartment.id}
//                         apartment={apartment}
//                         onEdit={handleEdit}
//                         onDelete={handleDeleteClick}
//                         onDetails={}
//                     />
//                 ))}
//             </div>
//
//             {apartments.length === 0 && (
//                 <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
//                     <Home className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-neutral-900 mb-2">No apartments yet</h3>
//                     <p className="text-neutral-500 mb-4">Get started by adding your first apartment.</p>
//                     <button
//                         onClick={handleAdd}
//                         className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
//                     >
//                         <Plus className="h-5 w-5" />
//                         Add First Apartment
//                     </button>
//                 </div>
//             )}
//
//             <ApartmentModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSave={handleSave}
//                 apartment={editingApartment}
//             />
//
//             <DeleteConfirmationDialog
//                 isOpen={isDeleteDialogOpen}
//                 onClose={() => {
//                     setIsDeleteDialogOpen(false);
//                     setDeletingApartment(null);
//                 }}
//                 onConfirm={handleDeleteConfirm}
//                 apartment={deletingApartment}
//                 isDeleting={isDeleting}
//             />
//
//             {selectedApartment && (
//                 <ApartmentDetailsDialog
//                     apartment={selectedApartment}
//                     open={!!selectedApartment}
//                     onOpenChange={(open) => !open && setSelectedApartment(null)}
//                 />
//             )}
//         </>
//     );
// }

"use client";

import { useState } from "react";
import { Plus, Home } from "lucide-react";
import { Apartment } from "@/types/apartment";
import { ApartmentCard } from "./ApartmentCard";
import { ApartmentModal } from "./ApartmentModal";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { ApartmentDetailsDialog } from "./ApartmentDetailsDialog";

type Props = {
    initialApartments: Apartment[];
};

export function ApartmentsList({ initialApartments }: Props) {
    const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
    const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(null);
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAdd = () => {
        setEditingApartment(null);
        setIsModalOpen(true);
    };

    const handleEdit = (apartment: Apartment) => {
        setEditingApartment(apartment);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (apartment: Apartment) => {
        setDeletingApartment(apartment);
        setIsDeleteDialogOpen(true);
    };

    const handleDetailsClick = (apartment: Apartment) => {
        setSelectedApartment(apartment);
        setIsDetailsOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingApartment) return;

        setIsDeleting(true);

        try {
            // TODO: Call API to delete
            // await deleteApartment(deletingApartment.id);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setApartments(apartments.filter((a) => a.id !== deletingApartment.id));
            setIsDeleteDialogOpen(false);
            setDeletingApartment(null);
        } catch (error) {
            console.error("Failed to delete apartment:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSave = (apartment: Apartment) => {
        if (editingApartment) {
            // Update existing
            setApartments(apartments.map((a) => (a.id === apartment.id ? apartment : a)));
        } else {
            // Add new
            setApartments([...apartments, { ...apartment, id: `apt_${Date.now()}` }]);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="mb-4">
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Apartment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {apartments.map((apartment) => (
                    <ApartmentCard
                        key={apartment.id}
                        apartment={apartment}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        onDetails={handleDetailsClick}
                    />
                ))}
            </div>

            {apartments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                    <Home className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No apartments yet</h3>
                    <p className="text-neutral-500 mb-4">Get started by adding your first apartment.</p>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Add First Apartment
                    </button>
                </div>
            )}

            {/* Modals */}
            <ApartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                apartment={editingApartment}
            />

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setDeletingApartment(null);
                }}
                onConfirm={handleDeleteConfirm}
                apartment={deletingApartment}
                isDeleting={isDeleting}
            />

            <ApartmentDetailsDialog
                apartment={selectedApartment}
                open={isDetailsOpen}
                onOpenChange={(open) => {
                    setIsDetailsOpen(open);
                    if (!open) {
                        setSelectedApartment(null);
                    }
                }}
            />
        </>
    );
}