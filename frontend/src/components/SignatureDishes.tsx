"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, X } from "lucide-react";

const generateMolecules = () => 
  Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3
  }));

const dishes = [
  {
    id: 1,
    name: "Aero-Sashimi",
    desc: "Levitating cuts of hyper-tuna synced to a bio-magnetic field.",
    price: "¥3,500",
    molecules: generateMolecules()
  },
  {
    id: 2,
    name: "Neon Wagyu",
    desc: "Bioluminescent marbled beef with an encrypted flavor profile.",
    price: "¥12,000",
    molecules: generateMolecules()
  },
  {
    id: 3,
    name: "Quantum Matcha",
    desc: "Green tea in superposition. Contains infinite calmness.",
    price: "¥2,200",
    molecules: generateMolecules()
  }
];

export default function SignatureDishes() {
  const [activeDish, setActiveDish] = useState<typeof dishes[0] | null>(null);

  return (
    <section className="relative py-24 bg-carbon z-10 w-full px-4 md:px-12">
      <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-magenta uppercase tracking-widest mb-16 text-cyber-glitch text-center">
        Signature Protocols
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {dishes.map((dish) => (
          <div key={dish.id} className="glass-panel p-6 rounded-xl border border-cyan/30 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            <div className="w-full aspect-square mb-6 rounded-lg bg-gradient-to-br from-cyan/5 to-magenta/10 border border-cyan/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-1/2 absolute top-1/4 left-1/4 bg-cyan/20 rounded-full blur-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">{dish.name}</h3>
            <p className="text-cyan/60 font-mono text-xs mb-6 h-12">{dish.desc}</p>
            <div className="flex w-full items-center justify-between mt-auto">
              <span className="text-magenta font-mono font-bold tracking-widest">{dish.price}</span>
              <button 
                onClick={() => setActiveDish(dish)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan/10 hover:bg-cyan/20 border border-cyan/50 rounded text-cyan font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Scan className="w-4 h-4" /> Scan
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeDish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg aspect-square bg-(--color-icy-blue) backdrop-blur-3xl border border-(--color-icy-border) rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.2)]"
            >
              <button 
                onClick={() => setActiveDish(null)}
                className="absolute top-6 right-6 text-cyan hover:text-white transition-colors z-20"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                {activeDish.molecules.map((mol) => (
                  <motion.div
                    key={mol.id}
                    className="absolute w-2 h-2 bg-cyan rounded-full shadow-[0_0_10px_#00ffff]"
                    initial={{ x: "50%", y: "50%", opacity: 0 }}
                    animate={{ 
                      x: `${mol.x}%`, 
                      y: `${mol.y}%`, 
                      opacity: [0, 1, 0.4, 1],
                      scale: [1, 1.5, 0.8, 1.2]
                    }}
                    transition={{ 
                      duration: mol.duration, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: mol.delay,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center bg-carbon/60 p-6 rounded-2xl border border-cyan/30 backdrop-blur-md">
                <Scan className="w-12 h-12 text-cyan mx-auto mb-4 animate-pulse" />
                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">{activeDish.name}</h3>
                <p className="text-cyan uppercase text-sm font-mono tracking-widest mb-1">Molecular Breakdown Active</p>
                <p className="text-cyan/50 text-xs font-mono">Analyzing structural integrity...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
