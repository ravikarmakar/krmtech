"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { MagneticButton } from "../ui/magnetic-button";

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    /**
     * useLenis gives us scroll events synced to the Lenis smooth-scroll tick.
     * No window.addEventListener needed — no jank, no double-firing.
     * We only flip boolean state so React batches the update efficiently.
     */
    useLenis(({ scroll }) => {
        const prev = lastScrollY.current;

        // Show/hide: hide when scrolling down past 80px, always show when scrolling up
        if (scroll > prev && scroll > 80 && !menuOpen) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        // Glassmorphism background when scrolled > 30px
        setScrolled(scroll > 30);

        lastScrollY.current = scroll;
    });

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const links = [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Clients", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            {/*
             * ALL transitions are CSS — GPU-composited, zero JS per frame.
             * translate-y uses transform (compositor thread only, no repaint).
             * backdrop-blur is toggled via class, not GSAP (no per-frame JS).
             */}
            <nav
                className={[
                    "fixed top-0 left-0 w-full z-50",
                    "flex items-center justify-between px-6 py-4 md:px-12 md:py-5",
                    "transition-all duration-300 ease-out",
                    // Hide: slide up off screen
                    hidden ? "-translate-y-full" : "translate-y-0",
                    // Glass bg when scrolled
                    scrolled
                        ? "bg-obsidian/80 backdrop-blur-xl border-b border-white/5"
                        : "bg-transparent border-b border-transparent",
                ].join(" ")}
            >
                {/* Logo */}
                <MagneticButton strength={20}>
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan to-violet flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-black text-obsidian">KRM</span>
                        </div>
                        <span className="font-bold tracking-[-0.03em] text-lg text-foreground">KRMTech</span>
                    </a>
                </MagneticButton>

                {/* Desktop links */}
                <ul className="hidden md:flex gap-10 text-sm font-medium tracking-wide uppercase text-foreground/50">
                    {links.map((link) => (
                        <li key={link.label}>
                            <MagneticButton strength={12}>
                                <a
                                    href={link.href}
                                    className="hover:text-foreground transition-colors duration-200 relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan transition-all duration-300 group-hover:w-full" />
                                </a>
                            </MagneticButton>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <MagneticButton strength={25} className="hidden md:flex">
                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-obsidian transition-all duration-300"
                        >
                            Start Project
                        </a>
                    </MagneticButton>

                    {/* Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2 z-50"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-[1.5px] bg-foreground transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                        <span className={`block w-6 h-[1.5px] bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block w-6 h-[1.5px] bg-foreground transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile overlay menu */}
            <div
                className={[
                    "fixed inset-0 z-40 bg-obsidian/96 backdrop-blur-xl",
                    "flex flex-col items-center justify-center gap-8",
                    "transition-all duration-400 ease-out",
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
            >
                {links.map((link, i) => (
                    <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-4xl font-black uppercase tracking-tighter text-foreground hover:text-cyan transition-colors duration-200"
                        style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-6 px-8 py-4 rounded-full border border-white/15 text-sm tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors duration-200"
                >
                    Start Project
                </a>
            </div>
        </>
    );
}
