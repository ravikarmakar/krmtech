"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/magnetic-button";

export function HorizontalGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !containerRef.current || !progressRef.current) return;

        const sections = gsap.utils.toArray('.horizontal-panel');

        const ctx = gsap.context(() => {

            const scrollTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (sections.length - 1),
                        duration: { min: 0.2, max: 0.8 },
                        delay: 0.1,
                        ease: "power1.inOut"
                    },
                    end: () => "+=" + containerRef.current!.offsetWidth,
                }
            });

            // Progress bar animation
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => "+=" + containerRef.current!.offsetWidth,
                    scrub: true,
                }
            });

            // Image Parallax Effect
            sections.forEach((section: any, idx: number) => {
                const image = section.querySelector('.parallax-bg');
                if (image && idx > 0) {
                    gsap.fromTo(image,
                        { backgroundPosition: "100% 50%" },
                        {
                            backgroundPosition: "0% 50%",
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                containerAnimation: scrollTween,
                                start: "left right",
                                end: "right left",
                                scrub: true,
                            }
                        }
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const projects = [
        {
            id: 1,
            title: "Nexus OS",
            category: "System Design",
            year: "2026",
            desc: "A sprawling operating system concept blending AI intent driven flows with spatial computing interfaces.",
            color: "from-cyan/30 via-obsidian to-obsidian"
        },
        {
            id: 2,
            title: "Aura 3D",
            category: "WebGL Architecture",
            year: "2025",
            desc: "Immersive product visualization engine that scales dynamically across enterprise ecosystems.",
            color: "from-violet/30 via-obsidian to-obsidian"
        },
        {
            id: 3,
            title: "KRM Data Grid",
            category: "Enterprise Fintech",
            year: "2026",
            desc: "High-frequency data rendering systems handling 1M+ transactions a second flawlessly.",
            color: "from-white/20 via-obsidian to-obsidian"
        },
    ];

    return (
        <section ref={sectionRef} id="work" className="relative w-full h-screen bg-obsidian border-t border-white/5 disable-scrollbars">
            {/* Header Overlay */}
            <div className="absolute top-10 left-6 md:top-20 md:left-20 z-10 pointer-events-none mix-blend-difference">
                <h2 className="text-2xl md:text-5xl font-light uppercase tracking-[0.2em] text-foreground opacity-90">
                    Selected <br /><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Works</span>
                </h2>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 z-20">
                <div ref={progressRef} className="h-full bg-cyan origin-left scale-x-0" />
            </div>

            <div
                ref={containerRef}
                className="flex w-[300vw] h-full will-change-transform"
            >
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="horizontal-panel w-screen h-full flex items-center justify-center relative flex-shrink-0 px-4 md:px-0"
                    >
                        <div
                            className="group relative w-full md:w-[70vw] h-[70vh] md:h-[80vh] flex-shrink-0 bg-obsidian overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 hover:border-white/30"
                            data-magnetic
                        >
                            {/* Parallax Background Gradient to simulate a stunning abstract image */}
                            <div className={`parallax-bg absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 transition-opacity duration-700 group-hover:opacity-80`} />

                            {/* Noise overlay inside card */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.1%22/%3E%3C/svg%3E')] mix-blend-overlay" />

                            {/* Dynamic Grid Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end bg-gradient-to-t from-black via-black/80 to-transparent">
                                <div className="flex-1 max-w-2xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-cyan text-xs md:text-sm tracking-[0.2em] font-bold uppercase">{project.category}</span>
                                        <div className="h-[1px] w-12 bg-white/20" />
                                        <span className="text-white/40 text-xs md:text-sm tracking-widest">0{i + 1}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 pr-4">{project.title}</h3>
                                    <p className="text-white/60 font-light text-sm md:text-lg leading-relaxed md:max-w-md hidden md:block">
                                        {project.desc}
                                    </p>
                                </div>

                                <div className="mt-8 md:mt-0 flex flex-col items-end gap-6 text-right">
                                    <span className="text-foreground/30 text-4xl md:text-7xl font-light leading-none">{project.year}</span>
                                    <MagneticButton strength={20}>
                                        <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
