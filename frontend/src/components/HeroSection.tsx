"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const KANJI_SIGNS = [
  "ラーメン", "すし", "居酒屋", "東京", "サイバー", "ネオン", "電気", "未来", "味", "夜"
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 1000], [0, 400]);
  const titleScale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const titleLetterSpacing = useTransform(scrollY, [0, 500], ['0px', '20px']);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-carbon">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-magenta/10 rain-glass pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent z-20 pointer-events-none" />

      {/* Infinite Kanji Columns */}
      <div className="absolute inset-0 flex justify-between px-[5%] md:px-[20%] opacity-20 pointer-events-none z-0 overflow-hidden">
        <KanjiColumn speed={1.5} direction="up" />
        <KanjiColumn speed={0.8} direction="down" />
        <KanjiColumn speed={2} direction="up" />
      </div>

      <motion.div 
        style={{ y: titleY, scale: titleScale, letterSpacing: titleLetterSpacing }}
        className="z-30 text-center flex flex-col items-center"
      >
        <h1 className="text-7xl md:text-[8rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan to-white kinetic-text drop-shadow-[0_0_30px_rgba(0,255,255,0.8)] uppercase">
          Neon Tokyo
        </h1>
        <h2 className="text-2xl md:text-5xl mt-2 font-bold text-magenta drop-shadow-[0_0_15px_rgba(255,0,127,1)] uppercase tracking-[0.3em] text-cyber-glitch">
          2099 Restobar
        </h2>
      </motion.div>
    </div>
  );
}

function KanjiColumn({ speed, direction }: { speed: number, direction: 'up' | 'down' }) {
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 1000], [0, direction === 'up' ? -500 * speed : 500 * speed]);

  return (
    <motion.div 
      style={{ y: yOffset }}
      className="flex flex-col gap-12 font-bold text-6xl text-cyan/70 drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] mix-blend-screen"
    >
      {[...KANJI_SIGNS, ...KANJI_SIGNS, ...KANJI_SIGNS].map((kanji, i) => (
        <span key={i} style={{ writingMode: 'vertical-rl' }}>
          {kanji}
        </span>
      ))}
    </motion.div>
  );
}
