"use client";

import { Canvas } from "@react-three/fiber";
import { DigitalCore } from "../canvas/DigitalCore";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/magnetic-button";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline();

        tl.fromTo(
            ".hero-title-word",
            { yPercent: 120, rotate: 10, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
        )
            .fromTo(
                ".hero-subtitle",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(
                ".hero-cta",
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.5"
            )
            .fromTo(
                ".hero-scroll-indicator",
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                "-=0.2"
            );

        gsap.to(".hero-content-wrapper", {
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            yPercent: 30,
            opacity: 0,
            scale: 0.95,
        });

        gsap.to(".hero-scroll-chevron", {
            y: 8,
            repeat: -1,
            yoyo: true,
            duration: 0.9,
            ease: "power1.inOut",
        });
    }, []);

    return (
        <section className="hero-section relative w-full h-screen overflow-hidden bg-obsidian flex items-center justify-center">
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* 3D Background — lightweight: no EffectComposer, no Environment HDR */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <Canvas
                    dpr={[1, 1.2]}
                    gl={{
                        antialias: false,
                        powerPreference: "high-performance",
                        alpha: true,
                        stencil: false,
                        depth: false,
                    }}
                    style={{ mixBlendMode: "screen" }}
                >
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[8, 8, 8]} intensity={1.5} color="#00f0ff" />
                    <pointLight position={[-8, -8, -8]} intensity={1.5} color="#8a2be2" />
                    <Stars radius={80} depth={40} count={2000} factor={4} saturation={0} fade speed={0.5} />
                    <DigitalCore />
                </Canvas>
            </div>

            {/* Foreground Content */}
            <div
                ref={containerRef}
                className="hero-content-wrapper relative z-10 w-full px-6 md:px-20 flex flex-col items-center text-center pointer-events-none mt-20 md:mt-0"
            >
                <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] flex flex-col items-center mix-blend-difference mb-8">
                    <div className="overflow-hidden p-2">
                        <span className="hero-title-word inline-block origin-left">Transcend</span>
                    </div>
                    <div className="overflow-hidden p-2 flex gap-2 md:gap-4">
                        <span className="hero-title-word inline-block origin-left italic font-light">The</span>
                        <span className="hero-title-word inline-block origin-left text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                            Ordinary
                        </span>
                    </div>
                </h1>

                <p className="hero-subtitle text-base md:text-xl font-light tracking-[0.2em] uppercase text-foreground/60 max-w-xl mx-auto mix-blend-difference">
                    Enterprise web architecture infused with spatial physics and cutting-edge motion.
                </p>

                <div className="hero-cta mt-12 flex items-center gap-6 pointer-events-auto">
                    <MagneticButton strength={40}>
                        <button className="group relative px-8 py-4 md:px-10 md:py-5 rounded-full overflow-hidden bg-white text-obsidian font-bold tracking-widest uppercase text-xs md:text-sm border-none outline-none">
                            <span className="relative z-10 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-cyan inline-block animate-pulse" />
                                Initialize Experience
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan to-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left z-0" />
                            <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-500 delay-100 font-bold tracking-widest uppercase text-xs md:text-sm">
                                <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
                                Initialize Experience
                            </span>
                        </button>
                    </MagneticButton>

                    <MagneticButton strength={20}>
                        <a
                            href="#work"
                            className="text-foreground/50 text-xs tracking-[0.3em] uppercase font-medium hover:text-cyan transition-colors duration-300 flex items-center gap-2"
                        >
                            <span className="w-8 h-[1px] bg-current inline-block" />
                            View Work
                        </a>
                    </MagneticButton>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
                <span className="text-foreground/30 text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
                <svg
                    className="hero-scroll-chevron text-foreground/30"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </section>
    );
}
