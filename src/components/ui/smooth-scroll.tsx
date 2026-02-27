"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    // We use a ref to access the Lenis instance inside the GSAP ticker
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Drive Lenis from GSAP's ticker so they share one rAF.
        // CRITICAL: GSAP ticker `time` is in SECONDS — Lenis.raf() needs MILLISECONDS.
        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            autoRaf={false}
            options={{
                lerp: 0.1,
                syncTouch: true,
                wheelMultiplier: 1.1,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
