import "@/app/globals.css";
import {CartModalProvider} from "@/context/cart-modal";
import {TooltipProvider} from "@ui/shadcn/tooltip";

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html className="h-full antialiased">
        <body className="flex min-h-full flex-col">
        <CartModalProvider>
            {/*bg-white/90 z-50 */}
            <header className=" py-4 sticky backdrop-blur-xs nav-border-reveal">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 flex-row sm:px-6 lg:px-8">

                </div>
            </header>
            <TooltipProvider>
                {/*mx-auto px-4 max-w-7xl */}
                <main className="mx-auto px-4 pt-2 flex w-full flex-1 flex-col pb-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </TooltipProvider>
        </CartModalProvider>
        </body>
        </html>
    );
}
