// app/admin/layout.tsx
import {ReactNode} from "react";
import DashboardSidebar from "@/app/dashboard/components/DashboardSidebar";
import DashboardHeader from "@/app/dashboard/components/DashboardHeader";

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        // inset-0
        <div className="flex min-h-screen bg-neutral-50">
            <DashboardSidebar/>
            {/* overflow-hidden */}
            <div className="flex-1 flex flex-col ml-60 overflow-hidden">
                <DashboardHeader/>
                {/* overflow-hidden */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}