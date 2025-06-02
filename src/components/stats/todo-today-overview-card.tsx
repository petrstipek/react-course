"use client";
import { useEffect, useState } from "react";

type TodayStats = {
    totalToday: number;
    remainingToday: number;
};

export default function TodayOverviewCard() {
    const [stats, setStats] = useState<TodayStats | null>(null);

    const loadStats = () => {
        fetch("/api/todo-stats/today")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error("Error loading today stats", err));
    };

    useEffect(() => {
        loadStats();

        const handler = () => {
            loadStats();
        };

        window.addEventListener("refresh-today-stats", handler);

        return () => {
            window.removeEventListener("refresh-today-stats", handler);
        };
    }, []);

    if (!stats) {
        return <div className="p-4 bg-gray-700 rounded-lg text-white">Loading…</div>;
    }

    return (
        <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white space-y-2">
            <h3 className="text-xl font-semibold">📅 Today</h3>
            <p>🟢 Planned: <strong>{stats.totalToday}</strong></p>
            <p>🔴 Remaining to finish today: <strong>{stats.remainingToday}</strong></p>
        </div>
    );
}