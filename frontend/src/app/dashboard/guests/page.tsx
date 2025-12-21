"use client";

import {getGuests, getGuestStats} from "@/services/dashboard/guests";
import {GuestStats as GuestStatsComponent} from "@/app/dashboard/guests/components/GuestStats";
import {NationalityChart} from "@/app/dashboard/guests/components/NationalityChart";
import {ChannelDistribution} from "@/app/dashboard/guests/components/ChannelDistribution";
import {GuestsTable} from "@/app/dashboard/guests/components/GuestsTable";
import {useEffect, useState} from "react";
import {Guest, GuestStats} from "@/types/guest";


export default async function GuestsPage() {
    // const guests = await getGuests();
    // const stats = await getGuestStats(guests);

    const [guests, setGuests] = useState<Guest[]>([]);
    const [stats, setStats] = useState<GuestStats | null>(null);

    useEffect(() => {
        async function fetchData() {
            const guestsData = await getGuests();
            setGuests(guestsData);
            setStats(await getGuestStats(guestsData));
        }

        fetchData();
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Guest Management</h2>
                <p className="text-neutral-500">
                    Track guest information, behavior, and analytics
                </p>
            </div>

            {/* Stats Overview */}
            <GuestStatsComponent stats={stats}/>

            {/* Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NationalityChart nationalities={stats.topNationalities}/>
                <ChannelDistribution channels={stats.guestsByChannel}/>
            </div>

            {/* Guests Table */}
            <GuestsTable guests={guests}/>
        </div>
    );
}