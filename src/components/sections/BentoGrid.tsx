"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
    {
        id: 1,
        title: "Digital Architecture",
        desc: "Building the scalable foundations of tomorrow.",
        span: "col-span-1 md:col-span-2 row-span-2",
        color: "from-cyan/10 to-transparent",
        icon: "◆",
        features: ["System Design", "Cloud Infrastructure", "Zero-trust Security"]
    },
    {
        id: 2,
        title: "Web 3.0",
        desc: "Decentralized ecosystems.",
        span: "col-span-1",
        color: "from-violet/10 to-transparent",
        icon: "◇",
        features: []
    },
    {
        id: 3,
        title: "AI Development",
        desc: "Intelligent autonomous systems.",
        span: "col-span-1",
        color: "from-white/5 to-transparent",
        icon: "◈",
        features: []
    },
    {
        id: 4,
        title: "Immersive 3D",
        desc: "WebGL and spatial computing.",
        span: "col-span-1 md:col-span-2",
        color: "from-obsidian-light/50 to-transparent",
        icon: "◎",
        features: ["Three.js", "React Three Fiber", "GLSL Shaders"]
    }
];

function BentoCard({ svc }: { svc: typeof services[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`bento-card group relative rounded-3xl overflow-hidden flex flex-col justify-end p-8 md:p-12 ${svc.span} cursor-none bg-obsidian-light/50 border border-white/5 transition-colors hover:border-white/20`}
        >
            {/* Dynamic Mouse Glow */}
            <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
            />

            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-40 mix-blend-screen pointer-events-none`} />

            <div className="absolute top-8 right-8 text-cyan/50 text-2xl font-light">
                {svc.icon}
            </div>

            <div className="relative z-10 pointer-events-none flex flex-col h-full justify-between">
                <div className="flex-1" />
                <div>
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 group-hover:text-cyan transition-colors">{svc.title}</h3>
                    <p className="text-foreground/60 text-sm md:text-lg font-light max-w-sm mb-6 leading-relaxed">
                        {svc.desc}
                    </p>
                    {svc.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {svc.features.map(feat => (
                                <span key={feat} className="px-3 py-1 rounded-full border border-white/10 text-[10px] md:text-xs uppercase tracking-widest text-foreground/50">
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

        const cards = sectionRef.current.querySelectorAll('.bento-card');

        gsap.fromTo(cards,
            { y: 100, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="services" className="relative w-full min-h-screen py-32 px-6 md:px-20 bg-obsidian border-t border-white/5">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-cyan/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-violet/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-[90rem] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
                    <h2 className="text-4xl md:text-7xl lg:text-[6rem] font-light uppercase tracking-tighter leading-none text-foreground">
                        Core <br /><span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Capabilities</span>
                    </h2>
                    <p className="text-foreground/50 max-w-sm text-sm md:text-base font-light tracking-wide uppercase">
                        Engineering solutions that bridge the gap between imagination and technical reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[350px]">
                    {services.map((svc) => (
                        <BentoCard key={svc.id} svc={svc} />
                    ))}
                </div>
            </div>
        </section>
    );
}
