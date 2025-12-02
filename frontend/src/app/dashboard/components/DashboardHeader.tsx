// app/admin/components/DashboardHeader.tsx
"use client";

import { LogOut } from "lucide-react";
// import { auth } from "@/lib/firebase";

export default function DashboardHeader() {
    const handleLogout = async () => {
        // await auth.signOut();
        // window.location.href = "/";
    };

    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold text-neutral-700">Admin Panel</h1>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
            >
                <LogOut className="h-4 w-4" />
                Logout
            </button>
        </header>
    );
}