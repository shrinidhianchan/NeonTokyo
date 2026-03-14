"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

type Review = {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  dish: string;
  badge: string;
  color: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    handle: "@arjun_eats",
    avatar: "A",
    rating: 5,
    date: "March 2099",
    text: "The Cyber-Ramen hit different. That 48-hour broth is criminally good. I could taste the black garlic data-oil through every single bite. Worth every rupee. KAI-01 even recommended it to me perfectly.",
    dish: "Cyber-Ramen",
    badge: "Verified Diner",
    color: "#00ffff",
  },
  {
    id: 2,
    name: "Priya Nair",
    handle: "@priya.n8n",
    avatar: "P",
    rating: 5,
    date: "March 2099",
    text: "I have never felt so immersed in a dining experience. The Aero-Sashimi was not just food, it was theatre. The neon atmosphere, the holographic menu, the AI host — 10/10 would return every week.",
    dish: "Aero-Sashimi",
    badge: "Top Reviewer",
    color: "#ff007f",
  },
  {
    id: 3,
    name: "Rohan Sharma",
    handle: "@rohaneats2099",
    avatar: "R",
    rating: 5,
    date: "February 2099",
    text: "Booked via WhatsApp in 30 seconds and the table was ready exactly on time. Neon Wagyu was a spiritual experience. The plasma-seared crust with gold flakes — absolutely legendary.",
    dish: "Neon Wagyu",
    badge: "Gold Member",
    color: "#ffcc00",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    handle: "@sneha_techfoodie",
    avatar: "S",
    rating: 5,
    date: "March 2099",
    text: "The chatbot KAI-01 is genuinely impressive. Asked it to pair a drink with my Cyber-Bento and it gave a full breakdown with reasoning. The Void Sake recommendation was spot on!",
    dish: "Cyber-Bento",
    badge: "AI Enthusiast",
    color: "#cc88ff",
  },
  {
    id: 5,
    name: "Vikram Bose",
    handle: "@vikram_neon",
    avatar: "V",
    rating: 5,
    date: "January 2099",
    text: "Took my entire team here for a dinner. Neon Takoyaki as a starter was a masterpiece. The bonito flakes dancing on the okonomiyaki sauce looked alive. Everyone was stunned.",
    dish: "Neon Takoyaki",
    badge: "Verified Diner",
    color: "#ff6600",
  },
  {
    id: 6,
    name: "Ananya Pillai",
    handle: "@ananya.bites",
    avatar: "A",
    rating: 5,
    date: "March 2099",
    text: "Quantum Matcha dessert is the most elegant thing I have ever put in my mouth. The gold leaf, the bamboo charcoal crumble — every layer had its own personality. A must-order.",
    dish: "Quantum Matcha",
    badge: "Food Critic",
    color: "#00ff88",
  },
  {
    id: 7,
    name: "Dev Kapoor",
    handle: "@devk_foodtech",
    avatar: "D",
    rating: 5,
    date: "February 2099",
    text: "That biometric filter on the menu is a genius UX idea. Chose Deep Focus mode and it showed me the Cyber-Bento and Yuzu Matcha Latte — honestly exactly what I needed for a late work dinner. Zero sugar crash.",
    dish: "Yuzu Matcha Latte",
    badge: "Power User",
    color: "#00ccff",
  },
  {
    id: 8,
    name: "Meera Joshi",
    handle: "@meera_gourmand",
    avatar: "M",
    rating: 5,
    date: "March 2099",
    text: "Glitch-Sashimi platter made me rethink what sashimi can be. The bioluminescent wasabi-yuzu glaze was a revelation. The whole neon Tokyo aesthetic is totally addictive. Already rebooked.",
    dish: "Glitch-Sashimi",
    badge: "Top Reviewer",
    color: "#00ffcc",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < rating ? "#ffcc00" : "transparent"}
          className={i < rating ? "text-yellow-400" : "text-white/20"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="relative shrink-0 w-80 mx-3 p-5 rounded-2xl flex flex-col gap-3 cursor-default select-none"
      style={{
        background: "#08131e",
        border: `1px solid ${review.color}22`,
        boxShadow: `0 0 20px ${review.color}08`,
      }}
    >
      {/* Top left accent */}
      <div
        className="absolute top-0 left-0 w-12 h-[2px] rounded-tl-2xl"
        style={{ background: review.color }}
      />

      {/* Quote icon */}
      <Quote
        size={20}
        className="absolute top-4 right-5 opacity-10"
        style={{ color: review.color }}
      />

      {/* Stars + date */}
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span className="text-white/25 font-mono text-[10px] tracking-widest">{review.date}</span>
      </div>

      {/* Review text */}
      <p className="text-white/75 font-mono text-xs leading-relaxed flex-1">
        "{review.text}"
      </p>

      {/* Dish tag */}
      <div
        className="inline-flex items-center self-start px-2 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase"
        style={{ background: `${review.color}15`, border: `1px solid ${review.color}35`, color: review.color }}
      >
        🍜 {review.dish}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-1 border-t border-white/5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
          style={{ background: `${review.color}22`, border: `1px solid ${review.color}50`, color: review.color }}
        >
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-bold tracking-wide truncate">{review.name}</p>
          <p className="text-white/35 font-mono text-[10px] truncate">{review.handle}</p>
        </div>
        <span
          className="ml-auto shrink-0 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold tracking-widest uppercase"
          style={{ background: `${review.color}15`, color: review.color }}
        >
          {review.badge}
        </span>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  // Duplicate for seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="relative py-20 w-full overflow-hidden border-t border-cyan/10 bg-carbon">
      {/* Left + right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #050505 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #050505 0%, transparent 100%)" }} />

      {/* Section heading */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan to-magenta uppercase tracking-widest text-cyber-glitch mb-3">
          Neural Testimonials
        </h2>
        <p className="text-cyan/40 font-mono text-xs tracking-widest uppercase">
          Live feedback from Sector-4 diners · Verified via biometric auth
        </p>

        {/* Aggregate rating */}
        <div className="inline-flex items-center gap-3 mt-4 px-5 py-2.5 rounded-full"
          style={{ background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.15)" }}>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="#ffcc00" className="text-yellow-400" />
            ))}
          </div>
          <span className="text-white font-black text-sm">5.0</span>
          <span className="text-white/30 font-mono text-xs">·</span>
          <span className="text-cyan/60 font-mono text-xs tracking-widest">247 verified diners</span>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-5 flex overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {allReviews.map((r, i) => (
            <ReviewCard key={`r1-${i}`} review={r} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right (reversed) */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        >
          {[...allReviews].reverse().map((r, i) => (
            <ReviewCard key={`r2-${i}`} review={r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
