"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

export function MagneticButton({
    children,
    className = "",
    strength = 40
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();
        if (boundingRect) {
            const { width, height, left, top } = boundingRect;
            const x = (clientX - (left + width / 2)) * (strength / 100);
            const y = (clientY - (top + height / 2)) * (strength / 100);
            setPosition({ x, y });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
            data-magnetic
        >
            {children}
        </motion.div>
    );
}
