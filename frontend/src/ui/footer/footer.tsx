import {YnsLink} from "@/ui/yns-link";
import type {SVGAttributes} from "react";

const navigationLinks = [
    {
        label: "Почетна",
        href: "/",
    },
    {
        label: "Достапни станови",
        href: "/apartments",
    },
    {
        label: "Претходни проекти",
        href: "/sold-out"
    },
    {
        label: "Галерија",
        href: "/gallery"
    },
    {
        label: "Контакт",
        href: "/contact"
    }
];

const sections = [
    {
        header: "Навигација",
        links: navigationLinks,
    },
    {
        header: "Информации",
        links: [
            {
                label: "За нас",
                href: "/about",
            },
            {
                label: "Услуги",
                href: "/services",
            },
            {
                label: "Често поставувани прашања",
                href: "/faq",
            },
        ],
    },
    // {
    //     header: "Правни",
    //     links: [
    //         {
    //             label: "Услови за користење",
    //             href: "/terms",
    //         },
    //         {
    //             label: "Политика за приватност",
    //             href: "/privacy",
    //         },
    //         {
    //             label: "Колачиња",
    //             href: "/cookies",
    //         },
    //     ],
    // },
];

export async function Footer() {
    return (
        <footer className="w-full bg-neutral-900 text-neutral-100">
            {/* Main footer content */}
            <div className="container mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Company info */}
                    <div className="lg:col-span-1 mr-8 text-center">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-white">Фортуна ЕЛ-М-Т</h3>
                            <p className="text-sm text-neutral-300 leading-relaxed">
                                Професионални услуги во градежништвото и продажба на станови во Охрид.
                                Градиме иднината, создаваме домови.
                            </p>

                            {/* Contact info */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <LocationIcon className="h-4 w-4 text-neutral-400"/>
                                    <span>Охрид, Македонија</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-4 w-4 text-neutral-400"/>
                                    <span>+389 75 506 865</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <EmailIcon className="h-4 w-4 text-neutral-400"/>
                                    <span>info@fortuna-elmt.mk</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation sections */}
                    <div className="lg:col-span-2 text-center">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {sections.map((section) => (
                                <div key={section.header}>
                                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                                        {section.header}
                                    </h4>
                                    <ul className="space-y-3">
                                        {section.links.map((link) => (
                                            <li key={link.label}>
                                                <YnsLink
                                                    className="text-sm text-neutral-300 transition-colors hover:text-white hover:underline underline-offset-4"
                                                    href={link.href}
                                                >
                                                    {link.label}
                                                </YnsLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-neutral-800 bg-neutral-950">
                <div className="container mx-auto max-w-7xl px-6 py-4">
                    <div
                        className="flex flex-col gap-2 text-center text-sm text-neutral-500 sm:flex-row sm:justify-between sm:text-left">
                        <div>
                            <p>© 2025 Фортуна ЕЛ-М-Т Дооел увоз-извоз Охрид</p>
                            <p>Сите права задржани</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 sm:justify-end">
                            <span>Развиено со ❤️ во Охрид</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Icon components
function LocationIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"/>
        </svg>
    );
}

function PhoneIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
        </svg>
    );
}

function EmailIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
        </svg>
    );
}