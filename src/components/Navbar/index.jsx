"use client";
import style from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/app/assets/logo.svg";

function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={style.navbar}>
            <div className={style.navbar_brand}>
                <Logo className={style.navbar_icon} />
                <span className={style.navbar_title}>QuizBurguer</span>
            </div>

            <div className={style.navbar_content}>
                <ul>
                    <li>
                        <Link href="/" className={`${style.link} ${pathname === "/" ? style.active : ""}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/game" className={`${style.link} ${pathname === "/game" ? style.active : ""}`}>
                            Game
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className={style.link}>
                            Ranking
                        </Link>
                    </li>
                    {/*
                        <li>
                            <Link href="/" className={style.link}>
                                Account
                            </Link>
                        </li>
                    */}
                </ul>
            </div>
        </nav >
    );
}

export default Navbar;