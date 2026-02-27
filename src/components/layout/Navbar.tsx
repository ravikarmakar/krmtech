"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/magnetic-button";

export function Navbar() {
    const navRef = useRef<HTMLUnknownElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!navRef.current) return;

        // Hide/show navbar based on scroll direction
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                gsap.to(navRef.current, { yPercent: -100, duration: 0.3, ease: "power2.inOut" });
            } else {
                gsap.to(navRef.current, { yPercent: 0, duration: 0.3, ease: "power2.inOut", background: currentScrollY > 50 ? "rgba(5, 5, 5, 0.8)" : "transparent", backdropFilter: currentScrollY > 50 ? "blur(10px)" : "blur(0px)" });
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 transition-colors duration-300"
        >
            <MagneticButton strength={20}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan to-violet flex items-center justify-center text-xs font-black mix-blend-screen text-obsidian">
                        KRM
                    </div>
                    <span className="font-bold tracking-tight text-xl mix-blend-difference">KRMTech</span>
                </div>
            </MagneticButton>

            <ul className="hidden md:flex gap-12 text-sm font-medium tracking-wide uppercase text-foreground/80 mix-blend-difference">
                {["Work", "Services", "Studio", "Insights"].map((link) => (
                    <li key={link}>
                        <MagneticButton strength={15}>
                            <a href={`#${link.toLowerCase()}`} className="hover:text-cyan transition-colors relative group">
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan transition-all duration-300 group-hover:w-full" />
                            </a>
                        </MagneticButton>
                    </li>
                ))}
            </ul>

            <MagneticButton strength={30}>
                <button className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-obsidian transition-all duration-500">
                    Start Project
                </button>
            </MagneticButton>
        </nav>
    );
}
