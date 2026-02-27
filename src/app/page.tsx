import { Hero } from "@/components/sections/Hero";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { BentoGrid } from "@/components/sections/BentoGrid";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-obsidian">
      <Hero />
      <HorizontalGallery />
      <BentoGrid />

      {/* Cinematic Footer */}
      <footer className="w-full min-h-screen bg-obsidian border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden pt-32 pb-12">

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
        <div className="absolute -top-[20vw] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-cyan/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-6 text-center mt-20">
          <p className="text-cyan text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-12">Ready to evolve?</p>
          <div className="w-full mx-auto overflow-hidden group cursor-pointer inline-block">
            <h2 className="text-[14vw] md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] text-foreground transition-all duration-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan group-hover:to-violet">
              Let's Talk
            </h2>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-xs md:text-sm font-light tracking-widest text-foreground/50 uppercase z-10 mt-32 border-t border-white/5 pt-12">
          <div className="flex flex-col gap-4">
            <span className="text-foreground/80 font-bold mb-2 tracking-[0.2em]">Location</span>
            <p>123 Innovation Drive</p>
            <p>Silicon Valley, CA 94025</p>
          </div>
          <div className="flex flex-col gap-4 md:text-center">
            <span className="text-foreground/80 font-bold mb-2 tracking-[0.2em]">Socials</span>
            <a href="#" className="hover:text-cyan transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-cyan transition-colors">LinkedIn</a>
          </div>
          <div className="flex flex-col gap-4 md:text-right">
            <span className="text-foreground/80 font-bold mb-2 tracking-[0.2em]">Legal</span>
            <p>© {new Date().getFullYear()} KRMTech</p>
            <p>All rights reserved.</p>
          </div>
        </div>

      </footer>
    </main>
  );
}
