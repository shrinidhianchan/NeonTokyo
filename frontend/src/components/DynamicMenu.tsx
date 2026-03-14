"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Biometric = "all" | "high_energy" | "focus" | "calm";
type Category = "Starters" | "Main" | "Desserts" | "Synthetic Liquors";

/** Per-dish visual config */
const dishTheme: Record<number, { color1: string; color2: string; kanji: string }> = {
  1: { color1: "#00ff88", color2: "#00ccff", kanji: "豆" },
  2: { color1: "#ff003c", color2: "#ff7700", kanji: "餃" },
  3: { color1: "#00ffff", color2: "#0044ff", kanji: "弁" },
  4: { color1: "#ffcc00", color2: "#ff6600", kanji: "麺" },
  5: { color1: "#cc88ff", color2: "#0099ff", kanji: "酒" },
  6: { color1: "#88ddff", color2: "#ffffff", kanji: "冷" },
};

function AnimatedDishImage({ id, highlighted }: { id: number; highlighted: boolean }) {
  const theme = dishTheme[id] ?? { color1: "#00ffff", color2: "#ff007f", kanji: "食" };
  const particles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: highlighted ? [0.4, 0.75, 0.4] : [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${theme.color1}28 0%, ${theme.color2}14 50%, transparent 80%)`
        }}
      />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <div className="rounded-full border" style={{
          width: "72%", height: "72%",
          borderColor: `${theme.color1}${highlighted ? "40" : "18"}`,
        }} />
      </motion.div>

      {/* Inner counter-rotating ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <div className="rounded-full border border-dashed" style={{
          width: "46%", height: "46%",
          borderColor: `${theme.color2}${highlighted ? "50" : "20"}`,
        }} />
      </motion.div>

      {/* Pulsing glow core */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.18, 1], opacity: highlighted ? [0.5, 1, 0.5] : [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-full blur-2xl" style={{
          width: "36%", height: "36%",
          background: `radial-gradient(circle, ${theme.color1}55, ${theme.color2}33)`
        }} />
      </motion.div>

      {/* Kanji character */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.span
          animate={{ opacity: highlighted ? [0.08, 0.18, 0.08] : [0.02, 0.05, 0.02], scale: [0.95, 1.04, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="font-black leading-none"
          style={{ fontSize: "5rem", color: theme.color1, textShadow: `0 0 30px ${theme.color1}` }}
        >
          {theme.kanji}
        </motion.span>
      </div>

      {/* Orbital particles */}
      {particles.map((i) => {
        const angle = (i / particles.length) * 360;
        const r = 30 + (i % 3) * 8;
        const cx = 50 + r * Math.cos((angle * Math.PI) / 180);
        const cy = 50 + r * Math.sin((angle * Math.PI) / 180);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${cx}%`, top: `${cy}%`,
              width: 3, height: 3,
              translateX: "-50%", translateY: "-50%",
              backgroundColor: i % 2 === 0 ? theme.color1 : theme.color2,
              boxShadow: `0 0 6px ${i % 2 === 0 ? theme.color1 : theme.color2}`,
            }}
            animate={{
              opacity: highlighted ? [0, 1, 0] : [0, 0.3, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.7,
              repeat: Infinity,
              delay: (i / particles.length) * 2.5,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.color1}${highlighted ? "bb" : "44"}, transparent)`
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: highlighted ? 3 : 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner brackets */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l" style={{ borderColor: `${theme.color1}60` }} />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r" style={{ borderColor: `${theme.color2}60` }} />
    </div>
  );
}

const menuItems = [
  { id: 1, name: "Edamame Glitch",  category: "Starters",          biometric: "calm",        price: "₹650",   desc: "Steamed pods with digital sea salt and calm-inducing enzymes.",                             image: "/photos/edamame-glitch.jpg" },
  { id: 2, name: "Neon Gyoza",      category: "Starters",          biometric: "high_energy", price: "₹950",   desc: "Spicy pork dumplings with magma chili oil. Promotes hyper-reactivity.",                   image: "/photos/neon-gyoza.jpg" },
  { id: 3, name: "Neon Takoyaki",   category: "Starters",          biometric: "high_energy", price: "₹780",   desc: "8 octopus dumplings with liquid-glass okonomiyaki sauce and dancing bonito flakes.",       image: "/photos/neon-takoyaki.jpg" },
  { id: 4, name: "Glitch-Sashimi", category: "Starters",          biometric: "calm",        price: "₹3,200", desc: "Precision-cut Bluefin Tuna, Salmon & Yellowtail with bioluminescent wasabi-yuzu glaze.",   image: "/photos/glitch-sashimi.jpg" },
  { id: 5, name: "Cyber-Bento",     category: "Main",              biometric: "focus",       price: "₹3,500", desc: "Nutrient-dense omakase bento optimized for deep coding sessions.",                        image: "/photos/cyber-bento.jpg" },
  { id: 6, name: "Cyber-Ramen",     category: "Main",              biometric: "high_energy", price: "₹1,950", desc: "48-hr Tonkotsu broth with black-garlic data-oil, chashu pork, and neon tamago.",           image: "/photos/cyber-ramen.jpg" },
  { id: 7, name: "Udon.exe",        category: "Main",              biometric: "high_energy", price: "₹2,200", desc: "Thick noodles in high-voltage broth with tempura prawn. 100% stamina boost.",             image: "/photos/udon-exe.jpg" },
  { id: 8, name: "Neon Wagyu",      category: "Main",              biometric: "focus",       price: "₹9,500", desc: "A5 Wagyu plasma-seared at 2,400°C. Bioluminescent marbling. Edible gold flakes.",          image: "/photos/neon-wagyu.jpg" },
  { id: 9, name: "Quantum Matcha",  category: "Desserts",          biometric: "calm",        price: "₹1,800", desc: "Ceremonial-grade Uji matcha mousse with 24K gold leaf and bamboo charcoal crumble.",       image: "/photos/quantum-matcha.jpg" },
  { id: 10, name: "Neuro-Gin",      category: "Synthetic Liquors", biometric: "focus",       price: "₹1,400", desc: "Botanical AI-distilled spirit to align synaptic pathways.",                              image: "/photos/neuro-gin.jpg" },
  { id: 11, name: "Void Sake",      category: "Synthetic Liquors", biometric: "calm",        price: "₹1,800", desc: "Served at absolute zero. Quiets the inner monologue.",                                   image: "/photos/void-sake.jpg" },
];

export default function DynamicMenu() {
  const [activeBio, setActiveBio] = useState<Biometric>("all");

  const categories: Category[] = ["Starters", "Main", "Desserts", "Synthetic Liquors"];
  const biometrics: { id: Biometric; label: string }[] = [
    { id: "all", label: "System Normal" },
    { id: "high_energy", label: "High Energy" },
    { id: "focus", label: "Deep Focus" },
    { id: "calm", label: "Zen State" },
  ];

  return (
    <section className="relative py-24 bg-carbon z-10 w-full px-4 md:px-12 border-t border-cyan/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta to-cyan uppercase tracking-widest mb-4 text-cyber-glitch">
              Full Neural Menu
            </h2>
            <p className="text-cyan/60 font-mono text-sm tracking-wider">FULL NEURAL DATABASE · FILTER BY BIOMETRIC STATE</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {biometrics.map((bio) => (
              <button
                key={bio.id}
                suppressHydrationWarning
                onClick={() => setActiveBio(bio.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                  activeBio === bio.id 
                    ? "bg-cyan/20 border-cyan text-cyan shadow-[0_0_15px_rgba(0,255,255,0.4)]" 
                    : "border-cyan/20 text-cyan/50 hover:border-cyan/50 hover:text-cyan/80 hover:bg-cyan/5"
                }`}
              >
                {bio.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-20">
          {categories.map(category => {
            const categoryItems = menuItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-2xl font-bold text-white mb-8 border-b border-cyan/20 pb-4 uppercase tracking-wider flex items-center gap-3">
                  <div className="h-2 w-2 bg-magenta rounded-full shadow-[0_0_10px_#ff007f]" />
                  {category}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {categoryItems.map(item => {
                    const isHighlighted = activeBio === "all" || item.biometric === activeBio;
                    
                    return (
                      <motion.div
                        key={item.id}
                        animate={{
                          opacity: isHighlighted ? 1 : 0.25,
                          scale: isHighlighted ? 1 : 0.98,
                          filter: isHighlighted ? "grayscale(0%)" : "grayscale(80%) blur(2px)",
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`p-4 rounded-xl border transition-all duration-500 overflow-hidden relative flex flex-col md:flex-row gap-6 ${
                          isHighlighted ? "border-cyan/40 bg-cyan/5 shadow-[0_0_20px_rgba(0,255,255,0.05)]" : "border-transparent bg-transparent"
                        }`}
                      >
                        {isHighlighted && activeBio !== "all" && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-magenta shadow-[0_0_10px_rgba(255,0,127,0.8)] z-20" />
                        )}
                        
                        {/* Real Dish Image */}
                        <div className="w-full md:w-48 h-48 rounded-lg border overflow-hidden relative bg-carbon shrink-0 transition-all duration-500 group/img"
                          style={{ borderColor: isHighlighted ? "rgba(0,255,255,0.4)" : "rgba(0,255,255,0.1)" }}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                            sizes="(max-width: 768px) 100vw, 192px"
                          />
                          {/* Neon tint on non-highlighted */}
                          {!isHighlighted && <div className="absolute inset-0 bg-carbon/50" />}
                          {/* Scan sweep on highlighted */}
                          {isHighlighted && (
                            <motion.div
                              className="absolute left-0 right-0 h-px pointer-events-none"
                              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.8), transparent)" }}
                              animate={{ top: ["0%", "100%", "0%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 flex flex-col py-2">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-2xl font-bold text-white tracking-wide uppercase">{item.name}</h4>
                            <span className="text-magenta font-mono font-bold text-lg">{item.price}</span>
                          </div>
                          <p className="text-cyan/60 font-mono text-sm mb-6 leading-relaxed">{item.desc}</p>
                          
                          <div className="mt-auto flex items-center gap-3">
                            <span className={`inline-block px-3 py-1.5 bg-carbon border text-[10px] uppercase tracking-widest rounded-sm ${
                                isHighlighted ? "border-cyan/40 text-cyan shadow-[0_0_10px_rgba(0,255,255,0.1)]" : "border-gray-800 text-gray-500"
                            }`}>
                              BIO_DATA: {item.biometric.replace('_', ' ')}
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-cyan/20 to-transparent" />
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
