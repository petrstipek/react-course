"use client";
import { useRouter } from "next/navigation";

export const HomeButton = () => {
    const router = useRouter();
    function handleRedirect() {
        router.push("/");
    }
    return (
        <>
            <button onClick={handleRedirect} className="home-button">
                Back to Home
            </button>
        </>
    )
};

