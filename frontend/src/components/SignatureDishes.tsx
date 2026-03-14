"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { X, Flame, Leaf, AlertTriangle, Star } from "lucide-react";
import Image from "next/image";

const dishes = [
  {
    id: 1,
    name: "Aero-Sashimi",
    desc: "Levitating cuts of hyper-tuna synced to a bio-magnetic field.",
    fullDesc: "Each slice of Bluefin tuna is precision-cut at -8°C and suspended above the plate using electromagnetic plating technology. Served with bioluminescent wasabi synthesized from deep-ocean algae. The flavour profile shifts from saline ocean to buttery umami over 7 seconds.",
    price: "₹2,800",
    image: "/photos/aero-sashimi.jpg",
    color1: "#00ffff",
    color2: "#0044ff",
    spice: 0,
    calories: 180,
    ingredients: ["Bluefin Tuna", "Bio-Wasabi", "Dark Soy", "Micro-Shiso", "Sea Salt Crystal"],
    allergens: ["Fish", "Soy"],
    tag: "Chef's Pick",
  },
  {
    id: 2,
    name: "Neon Wagyu",
    desc: "Bioluminescent marbled beef with an encrypted flavor profile.",
    fullDesc: "A5 Wagyu sourced from the Sector-7 bio-farms, flash-seared at 2,400°C using plasma torch technology. The bioluminescent marbling is achieved via natural spirulina infusion. Gold flakes dissolve on the tongue releasing a cascade of Maillard-precise umami.",
    price: "₹9,500",
    image: "/photos/neon-wagyu.jpg",
    color1: "#ff007f",
    color2: "#ff6600",
    spice: 1,
    calories: 620,
    ingredients: ["A5 Wagyu Beef", "Edible Gold", "Truffle Oil", "Spirulina Marinade", "Black Pepper"],
    allergens: ["None"],
    tag: "Legendary",
  },
  {
    id: 3,
    name: "Quantum Matcha",
    desc: "Green tea in superposition. Contains infinite calmness.",
    fullDesc: "A layered mousse made from ceremonial-grade Uji matcha ground to 3 microns. The dessert exists in a flavour superposition — simultaneously bitter and sweet — until the first bite collapses the wave function. Topped with 24K gold leaf and activated bamboo charcoal crumble.",
    price: "₹1,800",
    image: "/photos/quantum-matcha.jpg",
    color1: "#00ff88",
    color2: "#00ccff",
    spice: 0,
    calories: 310,
    ingredients: ["Uji Matcha", "Heavy Cream", "Gold Leaf", "Bamboo Charcoal", "Yuzu Zest"],
    allergens: ["Dairy", "Gluten"],
    tag: "Vegan Option",
  },
  {
    id: 4,
    name: "Cyber-Ramen",
    desc: "48-hour synthetic Tonkotsu broth with black-garlic data-oil.",
    fullDesc: "The broth is pressure-cooked for 48 hours extracting pure collagen from pork knuckles. Black garlic oil is cold-infused with 22 additional compounds for maximum umami depth. Topped with chashu pork belly slow-braised for 12 hours, a Neon tamago marinated for 36 hours, and black bamboo shoots.",
    price: "₹1,950",
    image: "/photos/cyber-ramen.jpg",
    color1: "#00ffff",
    color2: "#ffffff",
    spice: 2,
    calories: 720,
    ingredients: ["Tonkotsu Broth", "Black Garlic Oil", "Chashu Pork", "Neon Tamago", "Black Bamboo", "Nori"],
    allergens: ["Pork", "Egg", "Soy", "Gluten"],
    tag: "Best Seller",
  },
  {
    id: 5,
    name: "Glitch-Sashimi",
    desc: "Precision-cut Bluefin Tuna with a bioluminescent wasabi glaze.",
    fullDesc: "A full platter of hand-cut sashimi — tuna, salmon, and yellowtail — arranged on a bed of neon-teal luminescent ice. Each piece is brushed with an enzymatic wasabi-yuzu glaze that activates on contact with warmth, intensifying flavour with every breath you take.",
    price: "₹3,200",
    image: "/photos/glitch-sashimi.jpg",
    color1: "#00ffcc",
    color2: "#ff007f",
    spice: 1,
    calories: 240,
    ingredients: ["Bluefin Tuna", "Atlantic Salmon", "Yellowtail", "Yuzu Wasabi Glaze", "Luminescent Ice"],
    allergens: ["Fish", "Soy"],
    tag: "New",
  },
];

function SpiceIndicator({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <Flame
          key={i}
          size={14}
          className={i <= level - 1 ? "text-orange-400" : "text-white/20"}
          fill={i <= level - 1 ? "currentColor" : "none"}
        />
      ))}
      <span className="text-[10px] font-mono text-white/40 ml-1 tracking-widest">
        {level === 0 ? "MILD" : level === 1 ? "SPICY" : "EXTREME"}
      </span>
    </div>
  );
}

function use3DTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };
  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

export default function SignatureDishes() {
  const [activeDish, setActiveDish] = useState<typeof dishes[0] | null>(null);

  return (
    <section className="relative py-24 bg-carbon z-10 w-full px-4 md:px-12">
      <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-magenta uppercase tracking-widest mb-4 text-cyber-glitch text-center">
        Signature Protocols
      </h2>
      <p className="text-center text-cyan/40 font-mono text-xs tracking-widest mb-16 uppercase">
        Scan any dish to decrypt its molecular profile
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {dishes.map((dish) => {
          const tilt = use3DTilt();
          return (
            <div key={dish.id} style={{ perspective: 800 }}>
              <motion.div
                style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                className="glass-panel rounded-xl border border-cyan/20 flex flex-col overflow-hidden group hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition-all duration-500 cursor-pointer"
                onClick={() => setActiveDish(dish)}
              >
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#04060d] via-transparent to-transparent" />

                  {/* Tag badge */}
                  {dish.tag && (
                    <div
                      className="absolute top-3 left-3 px-2 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded"
                      style={{ background: `${dish.color1}22`, border: `1px solid ${dish.color1}60`, color: dish.color1 }}
                    >
                      {dish.tag}
                    </div>
                  )}

                  {/* Scan overlay on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center animate-pulse"
                        style={{ borderColor: dish.color1, boxShadow: `0 0 16px ${dish.color1}` }}>
                        <span className="text-xs font-mono font-bold" style={{ color: dish.color1 }}>▶</span>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: dish.color1 }}>
                        VIEW DETAILS
                      </span>
                    </div>
                  </motion.div>

                  {/* Scan sweep animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${dish.color1}cc, transparent)` }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-black text-white uppercase tracking-wider leading-tight">{dish.name}</h3>
                  <p className="text-cyan/50 font-mono text-[11px] leading-relaxed flex-1">{dish.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono font-bold text-sm" style={{ color: dish.color1 }}>{dish.price}</span>
                    <SpiceIndicator level={dish.spice} />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {activeDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setActiveDish(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#04060d] rounded-2xl overflow-hidden border shadow-[0_0_60px_rgba(0,255,255,0.2)]"
              style={{ borderColor: `${activeDish.color1}40` }}
            >
              {/* Hero image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={activeDish.image} alt={activeDish.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[#04060d] via-[#04060d]/40 to-transparent" />

                {/* Scan sweep */}
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${activeDish.color1}dd, transparent)` }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <button
                  onClick={() => setActiveDish(null)}
                  className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-colors"
                >
                  <X size={18} />
                </button>

                {activeDish.tag && (
                  <span
                    className="absolute top-4 left-4 px-2 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded"
                    style={{ background: `${activeDish.color1}22`, border: `1px solid ${activeDish.color1}60`, color: activeDish.color1 }}
                  >
                    {activeDish.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">{activeDish.name}</h3>
                    <p className="text-white/50 font-mono text-xs mt-1">
                      {activeDish.calories} kcal &nbsp;·&nbsp;
                      <span style={{ color: activeDish.color1 }}>MOLECULAR PROFILE DECRYPTED</span>
                    </p>
                  </div>
                  <span className="text-2xl font-black font-mono shrink-0" style={{ color: activeDish.color1 }}>
                    {activeDish.price}
                  </span>
                </div>

                <p className="text-white/70 font-mono text-sm leading-relaxed border-l-2 pl-4"
                  style={{ borderColor: activeDish.color1 }}>
                  {activeDish.fullDesc}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Ingredients */}
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-2" style={{ color: activeDish.color1 }}>
                      <Leaf size={10} className="inline mr-1" />Ingredients
                    </p>
                    <ul className="space-y-1">
                      {activeDish.ingredients.map((ing) => (
                        <li key={ing} className="text-white/60 font-mono text-xs flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: activeDish.color1 }} />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Allergens + Spice */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-2 text-orange-400">
                        <AlertTriangle size={10} className="inline mr-1" />Allergens
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {activeDish.allergens.map((a) => (
                          <span key={a} className="px-2 py-0.5 rounded text-[10px] font-mono border border-orange-500/30 bg-orange-500/10 text-orange-400">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-2 text-white/40">
                        <Star size={10} className="inline mr-1" />Thermal Level
                      </p>
                      <SpiceIndicator level={activeDish.spice} />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setActiveDish(null); document.getElementById("reservation-hud")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full py-3 rounded-lg font-mono font-bold text-sm tracking-widest uppercase transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${activeDish.color1}22, ${activeDish.color2}22)`,
                    border: `1px solid ${activeDish.color1}60`,
                    color: activeDish.color1,
                    boxShadow: `0 0 20px ${activeDish.color1}20`,
                  }}
                >
                  Reserve a Table → Include This Dish
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
