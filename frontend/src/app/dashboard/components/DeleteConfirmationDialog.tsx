"use client";

import {AlertTriangle, X} from "lucide-react";
import {Apartment} from "@/types/apartment";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    apartment: Apartment | null;
    isDeleting?: boolean;
};

export function DeleteConfirmationDialog({
                                             isOpen,
                                             onClose,
                                             onConfirm,
                                             apartment,
                                             isDeleting = false,
                                         }: Props) {
    if (!isOpen || !apartment) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-600"/>
                        </div>
                        <h2 className="text-lg font-semibold text-neutral-900">Delete Apartment</h2>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
                    >
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    <p className="text-neutral-600 mb-4">
                        Are you sure you want to delete <span
                        className="font-semibold text-neutral-900">{apartment.name}</span>?
                    </p>

                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
                        <div className="text-sm space-y-1">
                            <p className="text-neutral-600">
                                <span className="font-medium text-neutral-700">Building:</span> {apartment.building}
                            </p>
                            <p className="text-neutral-600">
                                <span className="font-medium text-neutral-700">Floor:</span> {apartment.floor},
                                #{apartment.number}
                            </p>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            <span className="font-semibold">Warning:</span> This action cannot be undone. All data
                            associated with this apartment will be permanently deleted.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-neutral-200 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2 text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isDeleting ? (
                            <>
                                <div
                                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                Deleting...
                            </>
                        ) : (
                            "Delete Apartment"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}