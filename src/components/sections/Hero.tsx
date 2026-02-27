"use client";

import { Canvas } from "@react-three/fiber";
import { DigitalCore } from "../canvas/DigitalCore";
import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/magnetic-button";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline();

        // Reveal animation
        tl.fromTo(".hero-title-word",
            { yPercent: 120, rotate: 10, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
        )
            .fromTo(".hero-subtitle",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(".hero-cta",
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.5"
            );

        // Parallax on scroll
        gsap.to(".hero-content-wrapper", {
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            yPercent: 40,
            opacity: 0,
            scale: 0.95
        });
    }, []);

    return (
        <section className="hero-section relative w-full h-screen overflow-hidden bg-obsidian flex items-center justify-center">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-90 mix-blend-screen pointer-events-auto">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
                    <pointLight position={[-10, -10, -10]} intensity={2} color="#8a2be2" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <DigitalCore />
                    <Environment preset="city" />

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
                        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} blendFunction={BlendFunction.NORMAL} />
                        <Noise opacity={0.05} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Foreground Content */}
            <div ref={containerRef} className="hero-content-wrapper relative z-10 w-full px-6 md:px-20 flex flex-col items-center text-center pointer-events-none mt-20 md:mt-0">

                <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] flex flex-col items-center mix-blend-difference mb-8">
                    <div className="overflow-hidden p-2">
                        <span className="hero-title-word inline-block origin-left">Transcend</span>
                    </div>
                    <div className="overflow-hidden p-2 flex gap-2 md:gap-4">
                        <span className="hero-title-word inline-block origin-left italic font-light">The</span>
                        <span className="hero-title-word inline-block origin-left text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Ordinary</span>
                    </div>
                </h1>

                <p className="hero-subtitle text-lg md:text-2xl font-light tracking-widest uppercase text-foreground/70 max-w-2xl mx-auto mix-blend-difference">
                    Enterprise web architecture infused with spatial physics and cutting-edge motion.
                </p>

                <div className="hero-cta mt-12 pointer-events-auto">
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
                </div>

            </div>

        </section>
    );
}
