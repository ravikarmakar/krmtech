"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback } from "react";

const services = [
    {
        id: 1,
        title: "Digital Architecture",
        desc: "Building the scalable foundations of tomorrow's enterprises.",
        span: "col-span-1 md:col-span-2 row-span-2",
        color: "from-cyan/15 to-transparent",
        accent: "cyan",
        stat: "127+",
        statLabel: "Projects Shipped",
        features: ["System Design", "Cloud Infrastructure", "Zero-trust Security"],
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="10" height="10" rx="2" stroke="#00f0ff" strokeWidth="1.5" />
                <rect x="18" y="4" width="10" height="10" rx="2" stroke="#00f0ff" strokeWidth="1.5" />
                <rect x="4" y="18" width="10" height="10" rx="2" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="2 2" />
                <rect x="18" y="18" width="10" height="10" rx="2" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="14" y1="9" x2="18" y2="9" stroke="#00f0ff" strokeWidth="1.5" />
                <line x1="9" y1="14" x2="9" y2="18" stroke="#00f0ff" strokeWidth="1.5" />
                <line x1="23" y1="14" x2="23" y2="18" stroke="#00f0ff" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Web 3.0",
        desc: "Decentralized ecosystems that rewrite the rules.",
        span: "col-span-1",
        color: "from-violet/15 to-transparent",
        accent: "violet",
        stat: "40+",
        statLabel: "dApps Launched",
        features: ["Smart Contracts", "DeFi", "NFT Platforms"],
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" stroke="#8a2be2" strokeWidth="1.5" />
                <ellipse cx="16" cy="16" rx="6" ry="12" stroke="#8a2be2" strokeWidth="1.5" />
                <line x1="4" y1="16" x2="28" y2="16" stroke="#8a2be2" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        id: 3,
        title: "AI Development",
        desc: "Intelligent autonomous systems at enterprise scale.",
        span: "col-span-1",
        color: "from-white/8 to-transparent",
        accent: "white",
        stat: "15+",
        statLabel: "AI Models Deployed",
        features: ["LLM Integration", "Computer Vision", "Automation"],
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="4" fill="#ffffff" fillOpacity="0.3" />
                <circle cx="16" cy="16" r="8" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="16" cy="16" r="12" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            </svg>
        ),
    },
    {
        id: 4,
        title: "Immersive 3D",
        desc: "WebGL and spatial computing for next-gen experiences.",
        span: "col-span-1 md:col-span-2",
        color: "from-cyan/8 via-violet/8 to-transparent",
        accent: "cyan",
        stat: "60fps",
        statLabel: "Guaranteed Performance",
        features: ["Three.js", "React Three Fiber", "GLSL Shaders"],
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="16,4 28,22 4,22" stroke="#00f0ff" strokeWidth="1.5" strokeLinejoin="round" />
                <polygon points="16,10 22,22 10,22" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.4" strokeLinejoin="round" />
            </svg>
        ),
    },
];

function BentoCard({ svc }: { svc: (typeof services)[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            if (!cardRef.current || !glowRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,255,255,0.07), transparent 40%)`;
        });
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`bento-card group relative rounded-3xl overflow-hidden flex flex-col justify-end p-8 md:p-12 ${svc.span} cursor-none bg-obsidian-light/40 border border-white/5 transition-all duration-500 hover:border-white/15`}
        >
            {/* Dynamic Mouse Glow */}
            <div ref={glowRef} className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-70`} />

            {/* Top stat (large, ghosted) */}
            <div className="absolute top-8 right-8 flex flex-col items-end gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
                <span className="text-2xl md:text-4xl font-black tracking-tighter text-foreground leading-none">{svc.stat}</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/50">{svc.statLabel}</span>
            </div>

            {/* SVG Icon */}
            <div className="absolute top-8 left-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {svc.icon}
            </div>

            <div className="relative z-10 pointer-events-none flex flex-col h-full justify-between">
                <div className="flex-1" />
                <div>
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-3 group-hover:text-cyan transition-colors duration-300">
                        {svc.title}
                    </h3>
                    <p className="text-foreground/50 text-sm md:text-base font-light max-w-sm mb-6 leading-relaxed">
                        {svc.desc}
                    </p>
                    {svc.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {svc.features.map((feat) => (
                                <span
                                    key={feat}
                                    className="px-3 py-1 rounded-full border border-white/8 text-[10px] md:text-xs uppercase tracking-widest text-foreground/40 group-hover:border-white/20 group-hover:text-foreground/70 transition-all duration-300"
                                >
                                    {feat}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function BentoGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll(".bento-card");
        gsap.fromTo(
            cards,
            { y: 80, opacity: 0, scale: 0.97 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 1.0,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="services" className="relative w-full min-h-screen py-32 px-6 md:px-20 bg-obsidian border-t border-white/5">
            {/* Background decor */}
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-cyan/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-violet/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-[90rem] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
                    <div>
                        <p className="text-cyan text-xs tracking-[0.4em] uppercase font-bold mb-5">What We Build</p>
                        <h2 className="text-4xl md:text-7xl lg:text-[6rem] font-light uppercase tracking-tighter leading-none text-foreground">
                            Core <br />
                            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                                Capabilities
                            </span>
                        </h2>
                    </div>
                    <p className="text-foreground/40 max-w-xs text-sm font-light tracking-wide uppercase leading-loose">
                        Engineering solutions that bridge the gap between imagination and technical reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[320px]">
                    {services.map((svc) => (
                        <BentoCard key={svc.id} svc={svc} />
                    ))}
                </div>
            </div>
        </section>
    );
}
