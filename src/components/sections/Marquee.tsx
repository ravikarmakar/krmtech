"use client";

const techItems = [
    "React", "Three.js", "GSAP", "WebGL", "TypeScript", "Node.js", "Next.js",
    "Framer Motion", "AWS", "GraphQL", "PostgreSQL", "Redis", "Docker", "Figma",
    "React", "Three.js", "GSAP", "WebGL", "TypeScript", "Node.js", "Next.js",
    "Framer Motion", "AWS", "GraphQL", "PostgreSQL", "Redis", "Docker", "Figma",
];

export function Marquee() {
    return (
        <div className="relative w-full py-12 bg-obsidian border-y border-white/5 overflow-hidden select-none">
            {/* Left fade */}
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

            <div className="flex gap-0 w-max animate-marquee">
                {techItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 pr-6">
                        <span className="text-foreground/25 text-sm font-light tracking-[0.3em] uppercase whitespace-nowrap">
                            {item}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-cyan/40 flex-shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}
