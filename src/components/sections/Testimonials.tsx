"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
    {
        quote: "KRMTech didn't just build us a website — they architected an experience that converts at 3x our previous rate. The 3D interactions are unlike anything our users have seen.",
        name: "Alexandra Chen",
        role: "CEO, NexusVault",
        rating: 5,
        initials: "AC",
        color: "from-cyan/30 to-cyan/5",
    },
    {
        quote: "Six-week timeline, zero compromises on quality. The GSAP animations and WebGL integration were executed flawlessly. We've won two awards since launch.",
        name: "Marcus Rivera",
        role: "CTO, AuraSystems",
        rating: 5,
        initials: "MR",
        color: "from-violet/30 to-violet/5",
    },
    {
        quote: "We came to KRMTech with a vision. They came back with something that blew our entire leadership team away. The attention to micro-interactions is elite-tier.",
        name: "Priya Sharma",
        role: "Head of Product, FinLayer",
        rating: 5,
        initials: "PS",
        color: "from-white/20 to-white/2",
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00f0ff" className="opacity-80">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
}

export function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        gsap.fromTo(
            ".testimonial-card",
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="testimonials" className="relative w-full py-32 px-6 md:px-20 bg-obsidian border-t border-white/5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.04),transparent_65%)] pointer-events-none" />

            <div className="max-w-[90rem] mx-auto">
                <div className="text-center mb-20">
                    <p className="text-cyan text-xs tracking-[0.4em] uppercase font-bold mb-5">Client Voices</p>
                    <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter text-foreground">
                        What They <br />
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                            Actually Said
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="testimonial-card relative rounded-3xl p-8 md:p-10 bg-obsidian-light/40 border border-white/5 hover:border-white/15 transition-all duration-500 flex flex-col gap-8 overflow-hidden group"
                        >
                            {/* Gradient top glow */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${t.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Quote mark */}
                            <div className="text-cyan/10 text-8xl font-black leading-none absolute top-4 right-8 group-hover:text-cyan/20 transition-all duration-500 pointer-events-none select-none">"</div>

                            <StarRating count={t.rating} />

                            <p className="text-foreground/70 text-sm md:text-base font-light leading-relaxed flex-1">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} border border-white/10 flex items-center justify-center text-sm font-bold text-foreground flex-shrink-0`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-foreground/90 font-semibold text-sm">{t.name}</p>
                                    <p className="text-foreground/40 text-xs tracking-widest uppercase">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
