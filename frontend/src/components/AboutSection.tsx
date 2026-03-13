"use client";

import { Info } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-32 bg-carbon z-10 w-full px-4 md:px-12 flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta to-cyan uppercase tracking-widest mb-10 text-cyber-glitch">
           System.Info // 2099
        </h2>
        
        <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden border border-cyan/30 text-left shadow-[0_0_20px_rgba(0,255,255,0.05)] text-cyan/90">
          <div className="absolute top-0 left-0 w-1 h-full bg-magenta animate-pulse" />
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center shrink-0">
               <Info className="w-6 h-6 text-cyan" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Neon Tokyo Resturant</h3>
              <p className="text-xs font-mono tracking-widest text-cyan/50 mt-1">EST. 2099 | SECTOR 4</p>
            </div>
          </div>

          <p className="text-lg md:text-xl font-mono leading-relaxed mb-6">
            Welcome to <span className="text-magenta font-bold">Neon Tokyo // 2099</span>, the premier underground dining experience where cybernetics meet culinary art. 
          </p>
          <p className="text-sm md:text-base font-mono leading-relaxed mb-6 text-cyan/70">
            Established in the shadow of the megacorps, we specialize in high-voltage organic synthesis. Our ingredients are sourced from bio-farms in the outer orbit, prepared by AI-assisted chefs, and served in an anti-grid format to bypass your neural inhibitors.
          </p>
          <p className="text-sm md:text-base font-mono leading-relaxed text-cyan/70">
            Whether you require a <span className="text-cyan font-semibold">Zen State</span> after a long shift at the terminal or <span className="text-magenta font-semibold">High Energy</span> to overclock your synapses, our bio-metric filtering ensures your nutrition is perfectly calibrated to your organic system's needs.
          </p>
          
          <div className="mt-12 border-t border-cyan/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
             <span className="text-xs font-mono text-cyan/40 tracking-widest uppercase">Location: Sector 4, Mega-Block C</span>
             <span className="text-xs font-mono text-cyan/40 tracking-widest uppercase">Encryption Status: Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
}
