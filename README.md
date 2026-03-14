# 🏮 Neon Tokyo — Cyberpunk Japanese Restaurant Website

> *A full-stack immersive web experience built with Next.js 15, React Three Fiber, Framer Motion, and a live n8n + Gemini AI backend.*

---

## 🚀 Vision

This project is a **production-grade, AI-integrated restaurant website** built to push the limit of what a modern web frontend can do — without a traditional backend. Every piece of the stack was chosen deliberately:

- **No backend server.** The AI chat runs through n8n webhooks. Booking and chat data persist in the browser via `localStorage`. The entire app deploys as a static Next.js site on Vercel.
- **Real AI integration.** The KAI-01 chat widget connects live to a Gemini Flash model orchestrated by an n8n workflow — including session memory via `sessionId`, animated Thought Trace loading, graceful error handling, and a retry system.
- **3D in the browser.** React Three Fiber renders a custom WebGL shader mesh that morphs in response to scroll position — no canvas libraries, raw GLSL.
- **Design-engineering parity.** Every animation (3D card tilt, scan-sweep, infinite marquee, biometric filter dim/blur) is implemented in Framer Motion with no pre-built component libraries — all written from scratch.
- **Real dish photography.** All 12 dish and drink images were AI-generated, optimised, and served through Next.js Image for automatic WebP conversion and lazy loading.
- **Fully typed.** The entire codebase is TypeScript with strict types across all components, hooks, and data shapes.

The aesthetic is 2099 Neon Tokyo — but the engineering is production 2026.

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Frontend Framework** | Next.js (Turbopack, App Router) | `15+` |
| **UI Language** | React | `19+` |
| **Styling** | Tailwind CSS v4 (Custom Neon Tokyo Config) | `^4` |
| **Animations** | Framer Motion | `^12` |
| **3D Engine** | React Three Fiber (R3F) + Three.js | `^9 / ^0.18` |
| **AI Automation** | n8n (cloud workflow engine) | — |
| **Icons** | Lucide React | `^0.577` |
| **Image Optimization** | Next.js `next/image` | Built-in |
| **Type Safety** | TypeScript | `^5` |
| **Persistence** | Browser `localStorage` API | Built-in |
| **Deployment** | Vercel | — |

---

## 🤖 AI Model Used

### 🧠 Google Gemini Flash

| Property | Detail |
|---|---|
| **Model** | `gemini-2.0-flash` |
| **Provider** | Google DeepMind |
| **Access** | Google AI Studio  |
| **Role** | Core conversational reasoning for KAI-01 Neural Concierge |
| **Context Window** | 1M tokens |
| **Capabilities Used** | Multi-turn conversation, menu-aware recommendations, booking guidance, JSON-structured output |

**Why Gemini Flash?**
- ⚡ Ultra-low latency (~300ms) for real-time terminal chat responses
- 📚 1M token context window — holds the full menu, lore, and booking logic in its system prompt
- 🖼️ Natively multimodal — ready for future dish-image recognition upgrades
- 💰 Cost-efficient for high-frequency restaurant chat volume

---

## ⚙️ n8n Workflow

n8n acts as the **AI orchestration layer** between the frontend and Gemini — handling webhooks, memory, and response routing with zero custom backend code.

### Pipeline

```
User Message (AIWidget)
    ↓
POST /webhook/{id}/chat  ←  { chatInput, sessionId }
    ↓
n8n Chat Trigger Node
    ↓
AI Agent Node  ←  Google Gemini Flash (LLM)
    ↓
Simple Memory Node  ←  Per-session conversation history
    ↓
Response JSON  →  KAI-01 Terminal UI
```

### Key Design Decisions
- **`sessionId`** is sent with every request — n8n's Chat Trigger uses this to maintain per-user conversation memory across multiple turns
- **System Prompt Engineering** — KAI-01 is given a detailed persona: a calm, knowledgeable 2099 Sector-4 host fluent in Japanese culinary tradition and the restaurant's full menu
- **Response Format Support** — the frontend parses `output`, `response`, `text`, and `message` fields to handle different n8n node output formats
- **Error Handling** — if n8n returns a workflow error, the frontend displays a styled error card with the exact reason and a **↺ Retry** button

### Environment Variable

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Your n8n Chat Trigger webhook URL (`.../chat` endpoint) |

---

## ✨ Key Features

### 🤖 KAI-01 Neural Concierge
- Floating AI chat terminal (bottom-right) with animated Thought Trace loading sequence
- Session memory via `sessionId` — conversations persist across page refreshes (`localStorage`)
- Clear Chat archives the session to the Data Logs before resetting
- Unread message badge + auto-scroll to latest message
- Graceful n8n error UI with Retry button

### 🍣 Signature Dishes — Interactive Cards
- Real AI-generated dish photography with `next/image`
- 3D perspective tilt on hover via Framer Motion springs
- Click opens a full **Dish Detail Modal**: backstory, ingredients, allergens, calorie count, spice level, ₹ price, and a "Reserve a Table" CTA

### 📋 Holo-Menu
- Categorised list (Starters / Main / Desserts / Drinks) with real thumbnails
- Expandable rows reveal full description + calories
- Vegetarian indicators, spice flame icons, all prices in ₹

### 🧬 Biometric Menu Filter
- Filter the full menu by biometric state: System Normal · High Energy · Deep Focus · Zen State
- Non-matching dishes dim, blur (grayscale 80%), and shrink — matched dishes glow with a neon scan-sweep animation

### 📅 Neural Reservation Terminal
- Terminal-style booking form: name, phone (`+91`), time slot, party size, spice preference
- **Two booking routes:** n8n webhook (Terminal) or WhatsApp deep-link
- Successful bookings auto-saved to `localStorage` and visible in the Data Logs panel

### 🗄️ Data Logs Panel
- Slide-over panel showing all bookings and AI chat sessions stored in `localStorage`
- Bookings Tab: name, time, guests, phone, spice level, method, timestamp
- Chats Tab: expandable session transcripts
- Purge button to clear each tab independently

### ⭐ Neural Testimonials
- Dual infinite-scroll marquee of 8 verified diner reviews (Jan–Mar 2026)
- Per-reviewer accent colors, star ratings, dish tags, and verified badges
- Aggregate 5.0 ★ / 247 verified diners rating

### 🎨 Cyberpunk Design System
- Color palette: Carbon `#050505` · Neon Cyan `#00ffff` · Magenta `#ff007f`
- Glassmorphism panels with `backdrop-filter: blur(20px)` and 1px glowing borders
- CSS scanline animations, glitch text shadows, 3D WebGL morphing dish canvas
- Fully solid dark backgrounds — no transparency bleed

---

## 🌍 Real-World Use Cases

### 🍽️ 1. AI-Powered Restaurant Concierge
**Problem:** Staff are overwhelmed during peak hours; customers have repetitive questions about allergens, dish recommendations, and wait times.

**Solution:** KAI-01 answers 100% of standard diner inquiries 24/7. The reservation terminal collects bookings and routes them directly to WhatsApp or a Google Sheet via n8n — zero manual effort.

**Real targets:** High-end restaurants, cloud kitchens, hotel dining rooms, izakayas.

---

### 📱 2. QR-Code Smart Menu
**Problem:** Printed menus are static, expensive to update, and have no interactivity.

**Solution:** The biometric-filtered DynamicMenu becomes a mobile-first, QR-accessible smart menu. Diners select their mood and see only relevant dishes highlighted — no reprinting ever needed.

**Real targets:** Any restaurant, café, or food court modernising their ordering experience.

---

### 🤝 3. WhatsApp-Integrated Booking System
**Problem:** Many restaurants (especially in India) rely on WhatsApp for manual bookings — chaotic and untracked.

**Solution:** The Reservation Terminal encodes name, phone, time, guests, and preferences into a WhatsApp deep-link and simultaneously sends structured data to n8n for routing to Google Calendar, Notion, or SMS confirmation.

**Real targets:** Indian restaurants, street-food brands scaling up, catering businesses.

---

### 🎮 4. Immersive Brand Experience
**Problem:** Restaurant websites are universally boring — just menus on a white background.

**Solution:** Cinematic hero animations, 3D rotating dishes, glassmorphism panels, and a dual-row review marquee create a first impression that drives social media sharing. The aesthetic can be reskinned for any F&B brand.

**Real targets:** Any brand that wants to stand out in a saturated digital market.

---

### 🏨 5. Hotel In-Room AI Assistant
**Problem:** Hotels use static PDF room service menus with no personalization.

**Solution:** The KAI-01 architecture (n8n + Gemini) repurposed as an in-room assistant on a tablet or smart TV. Guests ask about dishes or local recommendations; orders route to the kitchen via n8n.

**Real targets:** Boutique hotels, luxury resorts, serviced apartments.

---

## ⚡ Getting Started

```bash
git clone <your-repo-url>
cd tokyoneon-resturant/frontend
npm install

# Create .env.local
echo 'NEXT_PUBLIC_N8N_WEBHOOK_URL=<your-n8n-chat-webhook-url>' > .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the Neural Link is live.

---

*Built with 🌸 wabi-sabi and ⚡ neon voltage — Neon Tokyo, 2026.*
