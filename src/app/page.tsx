import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { Stats } from "@/components/sections/Stats";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-obsidian">
      <Hero />
      <Marquee />
      <HorizontalGallery />
      <Stats />
      <BentoGrid />
      <Testimonials />
      <CallToAction />

      {/* Cinematic Footer */}
      <footer className="w-full bg-obsidian border-t border-white/5 py-16 px-6 md:px-20">
        <div className="max-w-[90rem] mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 pb-12 border-b border-white/5">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan to-violet flex items-center justify-center">
                  <span className="text-[9px] font-black text-obsidian">KRM</span>
                </div>
                <span className="font-bold tracking-tight text-lg">KRMTech</span>
              </div>
              <p className="text-foreground/30 text-xs font-light leading-loose tracking-wide max-w-[220px]">
                Crafting experiences that transcend the ordinary. One pixel at a time.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-8 text-xs font-light tracking-widest text-foreground/40 uppercase">
              <div className="flex flex-col gap-4">
                <span className="text-foreground/70 font-bold tracking-[0.2em] mb-1">Services</span>
                <a href="#services" className="hover:text-cyan transition-colors">Web Architecture</a>
                <a href="#services" className="hover:text-cyan transition-colors">AI Development</a>
                <a href="#services" className="hover:text-cyan transition-colors">Web 3.0</a>
                <a href="#services" className="hover:text-cyan transition-colors">Immersive 3D</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-foreground/70 font-bold tracking-[0.2em] mb-1">Company</span>
                <a href="#work" className="hover:text-cyan transition-colors">Portfolio</a>
                <a href="#stats" className="hover:text-cyan transition-colors">About</a>
                <a href="#testimonials" className="hover:text-cyan transition-colors">Clients</a>
                <a href="#contact" className="hover:text-cyan transition-colors">Contact</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-foreground/70 font-bold tracking-[0.2em] mb-1">Socials</span>
                <a href="#" className="hover:text-cyan transition-colors">Twitter (X)</a>
                <a href="#" className="hover:text-cyan transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-cyan transition-colors">GitHub</a>
                <a href="#" className="hover:text-cyan transition-colors">Dribbble</a>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/20 tracking-widest uppercase font-light">
            <p>© {new Date().getFullYear()} KRMTech. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-foreground/50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground/50 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
