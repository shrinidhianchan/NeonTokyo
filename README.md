# 🏮 Neon Tokyo 2099: Synesthetic Dining Core

An immersive, high-performance Authentic Japanese restaurant terminal. This project bridges traditional Japanese culinary arts with a high-tech "Neon Noir" future, featuring a 3D interface and an autonomous AI concierge.

## 🚀 The Vision
In the year 2099, the Synesthetic Dining Core stands as a sanctuary of tradition in a digital megacity. We preserve the art of the Itamae through neural orchestration. The website is designed as a high-fidelity "Neural Link" interface, featuring 3D dish rotations, glassmorphism UI, and cinematic scrollytelling.

---

## 🛠️ Technical Stack

| Layer | Technology | Version |
|---|---|---|
| **Frontend Framework** | Next.js (Turbopack, App Router) | `16.1.6` |
| **UI Language** | React | `19.2.3` |
| **Styling** | Tailwind CSS (Custom Neon Tokyo Config) | `^4` |
| **Animations** | Framer Motion | `^12.36.0` |
| **3D Engine** | React Three Fiber (R3F) + Three.js | `^9.5.0` / `^0.183.2` |
| **3D Helpers** | @react-three/drei | `^10.7.7` |
| **AI Automation** | n8n (self-hosted workflow engine) | — |
| **Icons** | Lucide React | `^0.577.0` |
| **Type Safety** | TypeScript | `^5` |
| **Deployment** | Vercel | — |

---

## 🤖 AI Models Used

The **KAI-01 Gastronomic Core** is the soul of this platform — an autonomous AI concierge accessible via the floating Neural Link terminal. It is powered by a production n8n workflow that orchestrates the following:

### 🧠 Primary Language Model — Google Gemini Flash

| Property | Detail |
|---|---|
| **Model** | `gemini-2.0-flash` (or `gemini-1.5-flash`) |
| **Provider** | Google DeepMind |
| **Access** | Google AI Studio / Vertex AI API |
| **Role** | Core conversational reasoning for KAI-01 |
| **Context Window** | 1M tokens |
| **Capabilities Used** | Few-shot prompting, multi-turn conversation, JSON-structured output, tool-calling |

**Why Gemini Flash?**
- Ultra-low latency (~300ms) for snappy real-time chat responses in the terminal UI.
- Massive context window capable of holding the full restaurant menu, lore, and booking logic in its system prompt.
- Natively multimodal — ready for future dish-image recognition upgrades.
- Cost-efficient for high-frequency restaurant chat volume.

### ⚙️ AI Orchestration — n8n Workflow Engine

```
User Message (Frontend)
    ↓
Webhook Node (n8n) — Authenticated via Header Auth
    ↓
AI Agent Node — Gemini Flash as the LLM Brain
    ↓
Memory / Tool Nodes (booking lookup, context injection)
    ↓
Response → Frontend Terminal UI (KAI-01)
```

- **System Prompt Engineering:** KAI-01 is given a detailed persona — a calm, knowledgeable host from 2099 Sector 4, fluent in Japanese culinary traditions and the restaurant's full menu & lore.
- **Stateless + Stateful Modes:** Each conversation pass can optionally carry prior chat history, enabling contextual multi-turn dining recommendations.

---

## ✨ Key Features

### 1. 🤖 KAI-01: Gastronomic Core
A custom AI agent built via an n8n webhook that serves as your digital host within a sleek floating Terminal UI:
* **Neural Chat:** Real-time conversational interface integrated into the website.
* **Culinary Database:** Expert knowledge of our Japanese ingredients (Sushi, Ramen, Sake).
* **Lore Integration:** Deep-dive explanations of the 2099 "Sector 4" aesthetic.

### 2. 🍣 Kinetic 3D Holo-Menu
Utilizing React Three Fiber, signature dishes are rendered in a 3D canvas that reacts to user scroll:
* **Scroll-to-Rotate:** Dishes spin 360° to reveal textures and craftsmanship as you scroll.
* **Liquid Morphing:** Organic visual transitions utilizing custom WebGL shaders.

### 3. ❄️ Icy Glass HUD
The UI is a masterpiece of Cyberpunk Glassmorphism:
* High backdrop-blur panels with 1px glowing cyan and magenta borders.
* Scanline overlays and subtle phosphor-glow drop shadows.
* Kinetic Typography that responds to interaction.

### 4. 🔗 Neural Reservation Terminal
* Real-time table booking via a terminal interface.
* Indian phone format validation (`+91`).
* **WhatsApp Booking Route:** Direct payload encoding to WhatsApp API.
* **Thermal Override:** Biometric spice level selections mapping from "Mild" to "Total System Crash."

### 5. 🧬 Biometric Menu Filter
The Dynamic Menu section reads your "biometric state" (calm, deep focus, high energy) and filters dishes in real-time using Framer Motion opacity + blur animations — giving the illusion of an actually intelligent, adaptive menu system.

---

## 🌍 Real-World Use Cases

This project isn't just a concept UI — its architecture is directly applicable to real-world hospitality and AI-first business scenarios:

### 🍽️ 1. AI-Powered Restaurant Concierge
**Problem:** Staff are overwhelmed during peak hours; customers have repetitive questions about allergens, dish recommendations, and wait times.

**How this project solves it:**
- KAI-01 (the n8n + Gemini agent) can answer 100% of standard diner inquiries 24/7 — from "Is this dish gluten-free?" to "What sake pairs with the Bluefin Tuna?"
- The neural reservation terminal collects booking data and sends it directly to a WhatsApp line or a Google Sheet — zero manual effort.

**Real targets:** High-end restaurants, cloud kitchens, hotel dining rooms, izakayas.

---

### 📱 2. QR-Code Smart Menu for Physical Restaurants
**Problem:** Printed menus are static, expensive to update, and have no interactivity.

**How this project solves it:**
- The DynamicMenu component with biometric filters becomes a mobile-first, QR-accessible smart menu.
- A diner scans the QR, selects their mood (calm, energized), and sees only relevant dishes highlighted.
- Owners can update menu items in the data source without reprinting anything.

**Real targets:** Any restaurant, café, or food court modernizing their ordering experience.

---

### 🤝 3. WhatsApp-Integrated Booking System
**Problem:** Many restaurants (especially in India) rely entirely on WhatsApp for manual bookings, which is chaotic and untracked.

**How this project solves it:**
- The Neural Reservation Terminal collects: name, phone number (`+91` format), preferred time, party size, and spice level preference.
- The form encodes this into a WhatsApp deep-link and sends structured data to n8n for logging.
- n8n can route it to a Google Calendar, Notion database, or SMS confirmation — all automatically.

**Real targets:** Indian restaurants, street-food brands scaling up, catering businesses.

---

### 🎮 4. Immersive Brand Experience / Digital Marketing
**Problem:** Restaurant websites are universally boring — they are just menus on a white background.

**How this project solves it:**
- Cinematic hero animations, 3D rotating dishes, and glassmorphism panels create a memorable first impression that drives social media sharing.
- Visitors are more likely to share the website URL as an experience, acting as organic marketing.
- The 2099 Neon Tokyo aesthetic can be skinned for any brand — a cyberpunk ramen bar, a high-end omakase lounge, or a gaming café.

**Real targets:** Any F&B brand that wants to stand out in a saturated digital market.

---

### 🏨 5. Hotel & Hospitality In-Room AI Assistant
**Problem:** Hotels use outdated PDF room service menus with no personalization or interaction.

**How this project solves it:**
- The KAI-01 architecture (n8n + Gemini) can be repurposed as an in-room AI assistant displayed on a tablet or smart TV.
- Guests ask about available dishes, dietary restrictions, or local recommendations.
- Orders and requests are forwarded to the kitchen's POS or WhatsApp line via n8n.

**Real targets:** Boutique hotels, luxury resorts, Airbnb-style serviced apartments.

---

## 🍱 Operational Parameters (The Menu)
* **Cyber-Ramen**: 48-hour synthetic Tonkotsu broth with black-garlic "data-oil."
* **Glitch-Sashimi**: Precision-cut Bluefin Tuna with a bioluminescent wasabi glaze.
* **Neon Takoyaki**: Traditional octopus dumplings with a liquid-glass reduction.
* **Udon.exe**: Thick noodles in high-voltage broth. 100% stamina boost.
* **Neuro-Gin**: Botanical AI-distilled spirit to align synaptic pathways.

---

## ⚡ Getting Started

```bash
# Clone the repository
git clone <your-repo-url>
cd tokyoneon-resturant/frontend

# Install dependencies
npm install

# Set up your environment variables
# Create a .env.local file with:
# NEXT_PUBLIC_N8N_WEBHOOK_URL=<your-n8n-webhook-url>

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the Neural Link is live.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Your n8n production webhook URL for KAI-01 AI chat |

---

*Built with 🌸 wabi-sabi and ⚡ neon voltage — Neon Tokyo 2099.*
