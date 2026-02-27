"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use GSAP quickTo for high-performance cursor tracking
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);

            const target = e.target as HTMLElement;
            if (target.closest("a, button, [data-magnetic]")) {
                cursor.classList.add("hover");
            } else {
                cursor.classList.remove("hover");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
}
