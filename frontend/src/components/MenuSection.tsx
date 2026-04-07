"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Flame, Leaf } from "lucide-react";

// ─── Menu Data ────────────────────────────────────────────────────────────────
type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  desc: string;
  image: string;
  spice: number;
  veg: boolean;
  calories: number;
};

const menuItems: MenuItem[] = [
  // Starters
  { id: 1,  name: "Edamame Glitch",      category: "Starters",          price: "₹650",   spice: 0, veg: true,  calories: 120, image: "/photos/edamame-glitch.jpg",   desc: "Steamed pods with digital sea salt and calm-inducing enzymes. Served with dark ponzu." },
  { id: 2,  name: "Neon Gyoza",          category: "Starters",          price: "₹950",   spice: 2, veg: false, calories: 280, image: "/photos/neon-gyoza.jpg",        desc: "Spicy pork & cabbage pan-fried dumplings with magma chili oil and black sesame." },
  { id: 3,  name: "Neon Takoyaki",       category: "Starters",          price: "₹780",   spice: 1, veg: false, calories: 310, image: "/photos/neon-takoyaki.jpg",     desc: "8 traditional octopus dumplings with liquid-glass okonomiyaki sauce and dancing bonito." },
  { id: 4,  name: "Glitch-Sashimi",      category: "Starters",          price: "₹3,200", spice: 1, veg: false, calories: 240, image: "/photos/glitch-sashimi.jpg",    desc: "Precision-cut Bluefin Tuna, Salmon & Yellowtail with bioluminescent wasabi-yuzu glaze." },
  // Mains
  { id: 5,  name: "Cyber-Ramen",         category: "Main",              price: "₹1,950", spice: 2, veg: false, calories: 720, image: "/photos/cyber-ramen.jpg",       desc: "48-hr synthetic Tonkotsu broth with black-garlic data-oil, chashu pork, and neon tamago." },
  { id: 6,  name: "Cyber-Bento",         category: "Main",              price: "₹3,500", spice: 0, veg: false, calories: 680, image: "/photos/cyber-bento.jpg",       desc: "Nutrient-dense omakase bento — onigiri, sashimi, tamagoyaki, and pickles. Optimised for focus." },
  { id: 7,  name: "Udon.exe",            category: "Main",              price: "₹2,200", spice: 1, veg: false, calories: 640, image: "/photos/udon-exe.jpg",          desc: "Thick noodles in high-voltage dashi broth with a tempura prawn. 100% stamina boost." },
  { id: 8,  name: "Neon Wagyu (200g)",   category: "Main",              price: "₹9,500", spice: 1, veg: false, calories: 620, image: "/photos/neon-wagyu.jpg",        desc: "A5 Wagyu plasma-seared at 2,400°C. Bioluminescent marbling, edible gold, truffle oil." },
  // Desserts
  { id: 9,  name: "Quantum Matcha",      category: "Desserts",          price: "₹1,800", spice: 0, veg: true,  calories: 310, image: "/photos/quantum-matcha.jpg",    desc: "Ceremonial-grade Uji matcha mousse with gold leaf and activated bamboo charcoal crumble." },
  // Drinks (non-alcoholic)
  { id: 10, name: "Yuzu Matcha Latte", category: "Drinks", price: "₹750",   spice: 0, veg: true, calories: 140, image: "/photos/yuzu-matcha-latte.jpg", desc: "Ceremonial matcha cold-layered with yuzu-infused oat milk. Energises without the neural crash." },
  { id: 11, name: "Sakura Bloom Tea",  category: "Drinks", price: "₹620",   spice: 0, veg: true, calories: 15,  image: "/photos/sakura-tea.jpg",        desc: "Hand-picked Yoshino cherry blossom petals steeped in mineral water. Calms the hippocampus." },
  { id: 12, name: "Cyber Ramune",      category: "Drinks", price: "₹550",   spice: 0, veg: true, calories: 90,  image: "/photos/cyber-ramune.jpg",     desc: "Japanese marble-sealed soda with neon electric-blue citrus fizz. Classic 2099 refreshment." },
];

const categories = ["Starters", "Main", "Desserts", "Drinks"] as const;
const catColor: Record<string, string> = {
  Starters: "#00ffff",
  Main: "#ff007f",
  Desserts: "#00ff88",
  Drinks: "#cc88ff",
};

// ─── Menu Row Component ────────────────────────────────────────────────────────
function MenuRow({ item, index }: { item: MenuItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = catColor[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        suppressHydrationWarning
        className="w-full flex items-center gap-4 py-4 text-left group hover:bg-white/2 transition-colors px-2 rounded-lg"
      >
        {/* Thumbnail */}
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border"
          style={{ borderColor: `${color}30` }}>
          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="56px" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}11, transparent)` }} />
        </div>

        {/* Title + desc */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm uppercase tracking-wide">{item.name}</span>
            {item.veg && <Leaf size={11} className="text-green-400 shrink-0" />}
            {item.spice > 0 && (
              <div className="flex">
                {Array.from({ length: item.spice }).map((_, i) => (
                  <Flame key={i} size={11} className="text-orange-400" fill="currentColor" />
                ))}
              </div>
            )}
          </div>
          <p className="text-white/40 font-mono text-[11px] mt-0.5 truncate">{item.desc}</p>
        </div>

        {/* Price + expand */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono font-bold text-sm" style={{ color }}>{item.price}</span>
          <motion.span
            animate={{ rotate: expanded ? 135 : 0 }}
            className="text-white/30 text-lg leading-none group-hover:text-white/60 transition-colors"
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 px-2 pb-5 ml-18">
              {/* Full image */}
              <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 border"
                style={{ borderColor: `${color}30` }}>
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
              </div>
              <div className="space-y-2">
                <p className="text-white/60 font-mono text-xs leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-4 font-mono text-[10px] text-white/30 tracking-widest uppercase">
                  <span>{item.calories} kcal</span>
                  <span style={{ color }}>·</span>
                  <span>{item.veg ? "Vegetarian" : "Non-Veg"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MenuSection() {
  const { scrollYProgress } = useScroll();
  const [activeCategory, setActiveCategory] = useState<string>("Starters");

  const filteredItems = menuItems.filter((i) => i.category === activeCategory);

  return (
    <div className="relative h-auto md:h-[200vh] bg-carbon w-full pt-0 md:pt-32">
      <div className="md:sticky top-0 h-auto md:h-screen w-full flex flex-col md:flex-row items-stretch overflow-hidden">

        {/* ── Left: Menu List ── */}
        <div className="flex-1 flex flex-col p-4 md:p-8 z-10 overflow-hidden">
          <div className="glass-panel rounded-2xl border border-cyan/20 shadow-[0_0_30px_rgba(0,255,255,0.08)] flex flex-col h-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 shrink-0 border-b border-white/5">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent animate-scanline" />
              <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta to-cyan uppercase tracking-widest text-cyber-glitch mb-4">
                Holo-Menu
              </h2>

              {/* Category tabs */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    suppressHydrationWarning
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase border transition-all duration-300"
                    style={activeCategory === cat
                      ? { background: `${catColor[cat]}22`, borderColor: catColor[cat], color: catColor[cat], boxShadow: `0 0 12px ${catColor[cat]}44` }
                      : { borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dish list */}
            <div className="flex-1 overflow-y-auto px-4 py-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredItems.map((item, i) => (
                    <MenuRow key={item.id} item={item} index={i} />
                  ))}
                  {filteredItems.length === 0 && (
                    <p className="text-center text-white/20 font-mono text-sm py-12 tracking-widest">NO ITEMS IN THIS SECTOR</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer note */}
            <div className="px-6 py-4 border-t border-white/5 shrink-0">
              <p className="text-white/20 font-mono text-[10px] tracking-widest">
                ALL PRICES INCLUSIVE OF TAXES · GST @ 5% APPLICABLE
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
