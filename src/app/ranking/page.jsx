"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import style from "./ranking.module.css";

function ranking() {
    const router = useRouter();
    const [isCheckingUser, setIsCheckingUser] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("quiz_user");

        if (!user) {
            localStorage.setItem("needs_login", "true");
            router.push("/");
        } else {
            setIsCheckingUser(false);
        }
    }, [router])

    if (isCheckingUser) return null;

    return (
        <>

        </>
    );
}

export default ranking;