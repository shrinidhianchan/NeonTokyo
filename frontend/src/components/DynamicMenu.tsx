"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

type Biometric = "all" | "high_energy" | "focus" | "calm";
type Category = "Starters" | "Main" | "Synthetic Liquors";

const menuItems = [
  { id: 1, name: "Edamame Glitch", category: "Starters", biometric: "calm", price: "¥800", desc: "Steamed pods with digital sea salt and calm-inducing enzymes.", image: "/photos/edamame.jpg" },
  { id: 2, name: "Neon Gyoza", category: "Starters", biometric: "high_energy", price: "¥1,200", desc: "Spicy pork with magma chili oil. Promotes hyper-reactivity.", image: "/photos/gyoza.jpg" },
  { id: 3, name: "Cyber-Bento", category: "Main", biometric: "focus", price: "¥4,500", desc: "Nutrient-dense omakase selection optimized for deep coding sessions.", image: "/photos/bento.jpg" },
  { id: 4, name: "Udon.exe", category: "Main", biometric: "high_energy", price: "¥2,800", desc: "Thick noodles in high-voltage broth. 100% stamina boost.", image: "/photos/udon.jpg" },
  { id: 5, name: "Neuro-Gin", category: "Synthetic Liquors", biometric: "focus", price: "¥1,500", desc: "Botanical AI-distilled spirit to align synaptic pathways.", image: "/photos/gin.jpg" },
  { id: 6, name: "Void Sake", category: "Synthetic Liquors", biometric: "calm", price: "¥2,000", desc: "Served at absolute zero. Quiets the inner monologue.", image: "/photos/sake.jpg" },
];

export default function DynamicMenu() {
  const [activeBio, setActiveBio] = useState<Biometric>("all");

  const categories: Category[] = ["Starters", "Main", "Synthetic Liquors"];
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
            <p className="text-cyan/60 font-mono text-sm tracking-wider">VIEW COMPLETE DATABASE. INSERT VISUAL ASSETS INTO DIRECTORY.</p>
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
                        
                        {/* Image Slot */}
                        <div className="w-full md:w-48 h-48 rounded-lg border border-cyan/20 overflow-hidden relative bg-carbon flex-shrink-0 group">
                          {/* Replace this div with an <img> tag once photos are added to public/photos directory */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-carbon/80 text-cyan/30 group-hover:bg-cyan/10 group-hover:text-cyan/70 transition-colors z-10">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="font-mono text-xs text-center px-4 tracking-widest uppercase">Add Image<br/>{item.image}</span>
                          </div>
                          
                          {/* Cyber Grid Pattern Background for visual flair while empty */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] z-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-carbon to-transparent z-0 opacity-50" />
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
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan/20 to-transparent" />
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
