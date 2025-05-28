"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const HomeButton = () => {
    const router = useRouter();
    function handleRedirect() {
        router.push("/");
    }
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    console.log(search);
    return (
        <>
            <button onClick={handleRedirect} className="home-button">
                Back to Home
            </button>
        </>
    )
};

