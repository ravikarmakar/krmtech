"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
    { value: 127, suffix: "+", label: "Projects Delivered", desc: "Across 14 industries" },
    { value: 98, suffix: "%", label: "Client Satisfaction", desc: "Based on post-launch surveys" },
    { value: 40, suffix: "+", label: "Global Clients", desc: "From startups to Fortune 500" },
    { value: 6, suffix: "yr", label: "Studio Experience", desc: "Building the future since 2019" },
];

export function Stats() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        const counters = sectionRef.current.querySelectorAll(".stat-value");
        counters.forEach((el, i) => {
            const target = stats[i].value;
            gsap.fromTo(
                el,
                { textContent: "0" },
                {
                    textContent: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                    },
                }
            );
        });

        // Fade in the section heading
        gsap.fromTo(
            ".stats-heading",
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
            }
        );
        gsap.fromTo(
            ".stat-card",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="stats" className="relative w-full py-32 px-6 md:px-20 bg-obsidian border-t border-white/5 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,240,255,0.02),transparent)] pointer-events-none" />

            <div className="max-w-[90rem] mx-auto">
                <p className="stats-heading text-cyan text-xs tracking-[0.4em] uppercase font-bold mb-20 text-center">
                    By The Numbers
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/5">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-card flex flex-col items-center md:items-start md:px-10 text-center md:text-left">
                            <div className="flex items-end gap-1 mb-3">
                                <span className="stat-value text-5xl md:text-7xl font-black tabular-nums leading-none text-foreground">
                                    0
                                </span>
                                <span className="text-3xl md:text-5xl font-black text-cyan leading-none mb-1">
                                    {stat.suffix}
                                </span>
                            </div>
                            <p className="text-foreground/80 text-sm md:text-base font-semibold uppercase tracking-wider mb-2">
                                {stat.label}
                            </p>
                            <p className="text-foreground/30 text-xs font-light tracking-wide hidden md:block">
                                {stat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
