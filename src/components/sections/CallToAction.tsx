"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/magnetic-button";

export function CallToAction() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        gsap.fromTo(
            ".cta-heading",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
            }
        );
        gsap.fromTo(
            ".cta-sub",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.3,
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative w-full min-h-screen bg-obsidian border-t border-white/5 flex flex-col items-center justify-center overflow-hidden px-6 py-32"
        >
            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-cyan/5 blur-[180px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-violet/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Horizontal divider line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
                <p className="text-cyan text-xs tracking-[0.4em] uppercase font-bold mb-8">Start Now</p>

                <h2 className="cta-heading text-[13vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] text-foreground mb-8">
                    Let's Build
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-violet">
                        Together
                    </span>
                </h2>

                <p className="cta-sub text-foreground/40 text-sm md:text-lg font-light tracking-widest uppercase max-w-md mb-16 leading-relaxed">
                    Transform your digital presence into an unforgettable experience.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <MagneticButton strength={40}>
                        <button className="group relative px-10 py-5 rounded-full overflow-hidden bg-white text-obsidian font-bold tracking-widest uppercase text-xs md:text-sm">
                            <span className="relative z-10 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-cyan inline-block animate-pulse" />
                                Start a Project
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan to-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left z-0" />
                            <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-500 delay-100 font-bold tracking-widest uppercase text-xs md:text-sm">
                                <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
                                Start a Project
                            </span>
                        </button>
                    </MagneticButton>

                    <MagneticButton strength={20}>
                        <a
                            href="mailto:hello@krmtech.io"
                            className="text-foreground/40 hover:text-foreground text-xs tracking-[0.3em] uppercase transition-colors duration-300 flex items-center gap-3"
                        >
                            <span className="w-8 h-[1px] bg-current" />
                            hello@krmtech.io
                        </a>
                    </MagneticButton>
                </div>

                {/* Bottom trust badges */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 text-foreground/20 text-xs tracking-[0.25em] uppercase font-light">
                    {["NDA Friendly", "Fixed Pricing", "48hr Response", "Agile Process"].map((badge) => (
                        <span key={badge} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-cyan/40 inline-block" />
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
