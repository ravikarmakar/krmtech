"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/magnetic-button";

const projects = [
    {
        id: 1,
        title: "Nexus OS",
        category: "System Design",
        year: "2026",
        tags: ["AI-Driven", "Spatial"],
        desc: "A sprawling operating system concept blending AI intent-driven flows with spatial computing interfaces.",
        gradient: "from-cyan/40 via-cyan/10 to-obsidian",
        accentColor: "#00f0ff",
    },
    {
        id: 2,
        title: "Aura 3D",
        category: "WebGL Architecture",
        year: "2025",
        tags: ["Three.js", "Interactive"],
        desc: "Immersive product visualization engine that scales dynamically across enterprise ecosystems.",
        gradient: "from-violet/40 via-violet/10 to-obsidian",
        accentColor: "#8a2be2",
    },
    {
        id: 3,
        title: "KRM Data Grid",
        category: "Enterprise Fintech",
        year: "2026",
        tags: ["Real-time", "1M+ TPS"],
        desc: "High-frequency data rendering systems handling 1M+ transactions a second flawlessly.",
        gradient: "from-white/20 via-white/5 to-obsidian",
        accentColor: "#ffffff",
    },
];

/**
 * HOW THIS WORKS (no GSAP pin, works with Lenis):
 *
 * Outer section is 300vh tall — provides the vertical scroll runway.
 * Inner viewport div is position:sticky at top:0 — stays on screen like a pin.
 * The horizontal track (300vw) is translated by GSAP as scroll progress advances.
 * GSAP ScrollTrigger only reads scroll position (no pin conflict with Lenis).
 */
export function HorizontalGallery() {
    const outerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const outer = outerRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;
        if (!outer || !track || !progress) return;

        const ctx = gsap.context(() => {
            // Translate the track horizontally as user scrolls through the outer section
            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: outer,
                    start: "top top",
                    // end = when the bottom of the outer (300vh) section hits the top of viewport
                    end: "bottom bottom",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (progress) {
                            progress.style.transform = `scaleX(${self.progress})`;
                        }
                    },
                },
            });
        }, outerRef);

        return () => ctx.revert();
    }, []);

    return (
        /*
         * Outer: 300vh — the scroll runway. No overflow:hidden so sticky child works.
         * (100vh per-project to give each project its own scroll length)
         */
        <section
            ref={outerRef}
            id="work"
            className="relative bg-obsidian border-t border-white/5"
            style={{ height: `${projects.length * 100}vh` }}
        >
            {/* Progress bar */}
            <div className="sticky top-0 left-0 w-full h-[2px] bg-white/5 z-30">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-cyan to-violet origin-left"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/*
             * Sticky viewport: stays at top of screen while outer section scrolls.
             * This replaces GSAP pin — works perfectly with Lenis.
             */}
            <div
                className="sticky top-0 w-full overflow-hidden"
                style={{ height: "100vh" }}
            >
                {/* Header labels */}
                <div className="absolute top-10 left-6 md:top-16 md:left-20 z-20 pointer-events-none">
                    <p className="text-foreground/30 text-[10px] tracking-[0.4em] uppercase mb-2">Portfolio</p>
                    <h2 className="text-2xl md:text-5xl font-light uppercase tracking-[0.15em] text-foreground">
                        Selected <br />
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                            Works
                        </span>
                    </h2>
                </div>
                <div className="absolute top-10 right-6 md:top-16 md:right-20 z-20 pointer-events-none">
                    <span className="text-foreground/20 text-xs tracking-[0.3em] uppercase">{projects.length} Projects</span>
                </div>

                {/*
                 * Track: 300vw flex row. GSAP translates this on scroll.
                 * will-change:transform tells the browser to GPU-accelerate this.
                 */}
                <div
                    ref={trackRef}
                    className="flex h-full will-change-transform"
                    style={{ width: `${projects.length * 100}vw` }}
                >
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className="flex-shrink-0 flex items-center justify-center px-4 md:px-16"
                            style={{ width: "100vw", height: "100vh" }}
                        >
                            <div className="group relative w-full h-[70vh] md:h-[76vh] bg-obsidian overflow-hidden rounded-2xl border border-white/8 transition-all duration-500 hover:border-white/20">
                                {/* Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-opacity duration-700 group-hover:opacity-80`} />

                                {/* Grid texture */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                                {/* Ghost number */}
                                <div className="absolute top-6 left-8 select-none pointer-events-none">
                                    <span
                                        className="text-[80px] md:text-[130px] font-black leading-none opacity-[0.06]"
                                        style={{ color: project.accentColor }}
                                    >
                                        0{i + 1}
                                    </span>
                                </div>

                                {/* Bottom bar */}
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-end bg-gradient-to-t from-black via-black/70 to-transparent">
                                    <div className="flex-1 max-w-2xl">
                                        <div className="flex items-center flex-wrap gap-3 mb-4">
                                            <span
                                                className="text-xs tracking-[0.25em] font-bold uppercase"
                                                style={{ color: project.accentColor }}
                                            >
                                                {project.category}
                                            </span>
                                            <div className="h-[1px] w-6 bg-white/20" />
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-full border border-white/15 text-[10px] tracking-widest uppercase text-white/40"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 pr-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/50 font-light text-sm md:text-base leading-relaxed md:max-w-md hidden md:block">
                                            {project.desc}
                                        </p>
                                    </div>

                                    <div className="mt-8 md:mt-0 flex flex-col items-end gap-5">
                                        <span className="text-foreground/20 text-4xl md:text-6xl font-light leading-none tabular-nums">
                                            {project.year}
                                        </span>
                                        <MagneticButton strength={20}>
                                            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md group/btn">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                                >
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
