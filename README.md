# 🏮 Neon Tokyo 2099: Synesthetic Dining Core

An immersive, high-performance Authentic Japanese restaurant terminal. This project bridges traditional Japanese culinary arts with a high-tech "Neon Noir" future, featuring a 3D interface and an autonomous AI concierge.

## 🚀 The Vision
In the year 2099, the Synesthetic Dining Core stands as a sanctuary of tradition in a digital megacity. We preserve the art of the Itamae through neural orchestration. The website is designed as a high-fidelity "Neural Link" interface, featuring 3D dish rotations, glassmorphism UI, and cinematic scrollytelling.

---

## 🛠️ Technical Stack
* **Frontend:** Next.js 16 (Turbopack, App Router)
* **Styling:** Tailwind CSS (Custom Neon Tokyo Configuration)
* **Animations:** Framer Motion (Scroll-driven physics & micro-interactions)
* **3D Engine:** React Three Fiber (R3F) & Three.js (Holo-Menu morphing)
* **Intelligence:** n8n AI Agent (KAI-01) powered by Gemini Flash
* **Icons:** Lucide-React
* **Deployment:** Vercel

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
* **Thermal Override:** Biometric spice level selections mapping from "Mild" to "Total System Crash".

---

## 🍱 Operational Parameters (The Menu)
* **Cyber-Ramen**: 48-hour synthetic Tonkotsu broth with black-garlic "data-oil."
* **Glitch-Sashimi**: Precision-cut Bluefin Tuna with a bioluminescent wasabi glaze.
* **Neon Takoyaki**: Traditional octopus dumplings with a liquid-glass reduction.
* **Udon.exe**: Thick noodles in high-voltage broth. 100% stamina boost.
* **Neuro-Gin**: Botanical AI-distilled spirit to align synaptic pathways.

---

## 💻 Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shrinidhianchan/NeonTokyo.git
   cd NeonTokyo/frontend
   ```

2. **Install node dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `frontend/` directory with your n8n AI Webhook Endpoint:
   ```env
   NEXT_PUBLIC_N8N_WEBHOOK_URL="https://your-n8n-domain/webhook/your-id/chat"
   ```

4. **Initialize the Local Server:**
   ```bash
   npm run dev
   ```

5. **Access the Terminal:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to initiate the Neural Link.

---

*© 2099 Neon Tokyo Corporation. Sector 4, Mega-Block C. Made in Neo-Delhi. End of line.*