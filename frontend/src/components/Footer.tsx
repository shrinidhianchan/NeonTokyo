"use client";

import { Phone, Instagram, MapPin, Skull } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-carbon border-t border-cyan/20 w-full pt-16 pb-8 px-4 md:px-12 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta to-cyan uppercase tracking-widest text-cyber-glitch flex items-center gap-3">
            <Skull className="w-6 h-6 text-magenta" />
            Neon Tokyo // 2099
          </h2>
          <p className="text-cyan/50 font-mono text-xs tracking-widest uppercase mt-2">
            Sector 4 • Underground Level 2
          </p>
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
          <div className="flex flex-col gap-3 group">
            <div className="flex items-center gap-3 text-cyan hover:text-white transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full border border-cyan/30 flex items-center justify-center group-hover:bg-cyan/10 transition-colors shadow-[0_0_10px_rgba(0,255,255,0.05)]">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-cyan/50 font-mono uppercase tracking-widest mb-1">Comm_Link</span>
                <span className="font-mono text-sm tracking-wider">+91 ---------------</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 group">
            <a href="https://instagram.com/neontokyo2099" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-magenta hover:text-white transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full border border-magenta/30 flex items-center justify-center group-hover:bg-magenta/10 transition-colors shadow-[0_0_10px_rgba(255,0,127,0.05)]">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-magenta/50 font-mono uppercase tracking-widest mb-1">Neural_Net</span>
                <span className="font-mono text-sm tracking-wider">@NeonTokyo2099</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cyan/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-cyan/30 text-[10px] font-mono tracking-widest uppercase">
          © 2099 Neon Tokyo Corporation. All rights reserved.
        </p>
        <p className="text-cyan/30 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
          Made in <span className="text-magenta">Neo-Delhi</span> // End of line.
        </p>
      </div>
    </footer>
  );
}
