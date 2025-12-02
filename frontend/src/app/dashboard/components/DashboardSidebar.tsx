// // app/admin/components/DashboardSidebar.tsx
// "use client";
//
// import Link from "next/link";
// import {usePathname} from "next/navigation";
// import {Home, Building2, CalendarClock, CalendarCheck} from "lucide-react";
//
// const navItems = [
//     {label: "Apartments", href: "/dashboard/apartments", icon: Building2},
//     {label: "Future Reservations", href: "/dashboard/reservations/future", icon: CalendarClock},
//     {label: "Past Reservations", href: "/dashboard/reservations/past", icon: CalendarCheck},
// ];
//
// export default function DashboardSidebar() {
//     const pathname = usePathname();
//
//     return (
//
//         <aside className="w-64 border-neutral-200 bg-neutral-900 p-4 fixed inset-y-0 left-0">
//
//             <div className="px-6 py-6 border-b border-neutral-200">
//                 <Link href="/dashboard">
//                     <h2 className="text-xl pt-8 mb-8 font-bold text-white">Admin Dashboard</h2>
//                 </Link>
//             </div>
//             <nav className="flex-1 px-4 py-4 space-y-2">
//                 {navItems.map(({label, href, icon: Icon}) => {
//                     const active = pathname.startsWith(href);
//                     return (
//                         <Link
//                             key={href}
//                             href={href}
//                             className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
//                                 active
//                                     ? "bg-neutral-800 text-white"
//                                     : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
//                             }`}
//                         >
//                             <Icon className="h-5 w-5"/>
//                             {label}
//                         </Link>
//                     );
//                 })}
//             </nav>
//         </aside>
//     );
// }

// app/admin/components/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    CalendarClock,
    CalendarCheck,
    Users,
    Euro,
    FileText,
    Settings,
    BarChart3,
    MessageSquare,
    Bell,
    Wrench,
    Calendar,
    ClipboardList,
    Home,
    LogOut
} from "lucide-react";

const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },

    // Core Management
    {
        section: "Management",
        items: [
            { label: "Apartments", href: "/dashboard/apartments", icon: Building2 },
            { label: "Reservations", href: "/dashboard/reservations", icon: Calendar, exact: true },
            { label: "Guests", href: "/dashboard/guests", icon: Users },
        ]
    },

    // Reservations Breakdown
    {
        section: "Bookings",
        items: [
            { label: "Future Reservations", href: "/dashboard/reservations/future", icon: CalendarClock },
            { label: "Past Reservations", href: "/dashboard/reservations/past", icon: CalendarCheck },
            { label: "Calendar View", href: "/dashboard/calendar", icon: Calendar },
        ]
    },

    // Financial
    {
        section: "Financial",
        items: [
            { label: "Payments", href: "/dashboard/payments", icon: Euro },
            { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
            { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
        ]
    },

    // Operations
    {
        section: "Operations",
        items: [
            { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
            { label: "Cleaning Schedule", href: "/dashboard/cleaning", icon: ClipboardList },
            { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
            { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
        ]
    },

    // Settings
    {
        section: "System",
        items: [
            { label: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
    },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    const isActive = (href: string, exact?: boolean) => {
        if (exact) {
            return pathname === href;
        }
        // Check if current path starts with href, but also ensure
        // it's either an exact match or followed by a slash
        if (pathname === href) return true;
        if (pathname.startsWith(href + '/')) return true;
        return false;
    };

    return (
        <aside className="w-64 bg-neutral-900 fixed inset-y-0 left-0 flex flex-col">
            {/* Header */}
            <div className="px-6 py-6 border-b border-neutral-800">
                <Link href="/dashboard" className="block">
                    <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
                    <p className="text-xs text-neutral-400 mt-1">Фортуна ЕЛ-М-Т</p>
                </Link>
            </div>

            {/* Navigation - Scrollable */}
            <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
                {navItems.map((item, index) => {
                    // Section with items
                    if ('section' in item) {
                        return (
                            <div key={item.section}>
                                <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                                    {item.section}
                                </h3>
                                <div className="space-y-1">
                                    {item.items.map(({ label, href, icon: Icon, exact }) => {
                                        const active = isActive(href, exact);
                                        return (
                                            <Link
                                                key={href}
                                                href={href}
                                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                                    active
                                                        ? "bg-neutral-800 text-white"
                                                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="text-sm">{label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    // Single item (like Overview)
                    const active = isActive(item.href, item.exact);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                active
                                    ? "bg-neutral-800 text-white"
                                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer - User/Logout */}
            <div className="p-4 border-t border-neutral-800">
                <Link
                    href="/public"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                    <Home className="h-5 w-5" />
                    <span className="text-sm">Back to Website</span>
                </Link>
                <button
                    onClick={() => {/* Add logout logic */}}
                    className="w-full flex items-center gap-3 px-4 py-2 mt-1 rounded-lg text-neutral-300 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}