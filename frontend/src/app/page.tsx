import {redirect} from "next/navigation";

export default async function Home() {

    redirect('/dashboard')
    return (
        <main className="max-w-7xl mx-auto">

        </main>
    );
}
