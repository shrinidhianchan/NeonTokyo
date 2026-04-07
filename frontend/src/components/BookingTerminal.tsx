"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, User, Phone, MessageSquare, Flame } from "lucide-react";
const BOOKINGS_KEY = "neon_tokyo_bookings";

export default function BookingTerminal() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [guests, setGuests] = useState(2);
  const [spiceLevel, setSpiceLevel] = useState("Mild/System Default");
  const [status, setStatus] = useState<"idle" | "processing" | "confirmed">("idle");

  const timeSlots = [
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
    "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
  ];

  const spiceOptions = [
    "Mild/System Default",
    "Spicy/Overclocked",
    "Insane/Total System Crash"
  ];

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    setStatus("idle");
  };

  const validatePhone = (p: string) => {
    const regex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (p && !regex.test(p)) {
      setPhoneError("INVALID_COMM_LINK: +91 Format Required");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (phoneError) validatePhone(val);
  };

  const sendMessage = async (method: 'terminal' | 'whatsapp') => {
    if (!selectedSlot || !name || !phone) return;
    if (!validatePhone(phone)) return;
    
    setStatus("processing");
    
    // Save to localStorage
    const newBooking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      name,
      phone,
      time: selectedSlot,
      guests,
      spicePreference: spiceLevel,
      method,
    };
    try {
      const existing = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...existing, newBooking]));
    } catch { /* storage full or unavailable */ }

    try {
      if (method === 'whatsapp') {
        const waText = encodeURIComponent(`Initiating Protocol\nName: ${name}\nTime: ${selectedSlot}\nGuests: ${guests}\nSpice: ${spiceLevel}`);
        window.open(`https://wa.me/919999999999?text=${waText}`, "_blank");
      }

      setTimeout(() => setStatus("confirmed"), 1000);
    } catch (err) {
      setTimeout(() => setStatus("confirmed"), 1000);
    }
  };

  return (
    <section id="reservation-hud" className="relative py-24 bg-carbon z-10 w-full px-4 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden border border-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-magenta to-transparent animate-scanline" />
        
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-magenta uppercase tracking-widest mb-10 text-cyber-glitch text-center">
          Reservation HUD
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan/70 w-5 h-5 group-focus-within:text-magenta transition-colors" />
              <input 
                type="text" 
                placeholder="CITIZEN_NAME" 
                value={name}
                suppressHydrationWarning
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-carbon/50 border border-cyan/30 rounded-lg py-4 pl-12 pr-4 text-cyan placeholder:text-cyan/40 focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
              />
            </div>

            <div className="relative group">
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${phoneError ? 'text-red-500' : 'text-cyan/70 group-focus-within:text-magenta'}`} />
              <input 
                type="tel" 
                placeholder="COMM_LINK (+91)" 
                value={phone}
                suppressHydrationWarning
                onChange={handlePhoneChange}
                onBlur={() => validatePhone(phone)}
                className={`w-full bg-carbon/50 border rounded-lg py-4 pl-12 pr-4 text-cyan placeholder:text-cyan/40 focus:outline-none focus:ring-1 transition-all ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-cyan/30 focus:border-magenta focus:ring-magenta'}`}
              />
              {phoneError && <span className="absolute -bottom-5 left-2 text-red-500 text-[10px] font-mono tracking-wider">{phoneError}</span>}
            </div>

            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan/70 w-5 h-5 group-focus-within:text-magenta transition-colors" />
              <input 
                type="number" 
                min="1"
                max="10"
                value={guests}
                suppressHydrationWarning
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full bg-carbon/50 border border-cyan/30 rounded-lg py-4 pl-12 pr-4 text-cyan focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
              />
            </div>

            {/* Spice Level Selector */}
            <div className="flex flex-col gap-3">
              <span className="text-cyan/70 text-sm font-mono tracking-widest uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-magenta" /> Thermal Override / Spice
              </span>
              <div className="flex flex-col gap-2">
                {spiceOptions.map((level) => (
                  <button
                    key={level}
                    suppressHydrationWarning
                    onClick={() => setSpiceLevel(level)}
                    className={`text-left px-4 py-3 rounded-md font-mono text-xs tracking-wider border transition-all ${
                      spiceLevel === level
                        ? 'border-magenta text-white bg-magenta/20 shadow-[0_0_10px_rgba(255,0,127,0.3)]'
                        : 'border-cyan/20 text-cyan/60 hover:border-cyan/50 hover:text-cyan'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {selectedSlot && (
              <div className="flex items-center gap-3 text-cyan/80 p-4 border border-cyan/20 rounded-lg bg-cyan/5">
                <Clock className="w-5 h-5 text-magenta" />
                <span className="font-mono tracking-wider text-sm">SELECTED_TIME: {selectedSlot}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button 
                onClick={() => sendMessage('terminal')}
                suppressHydrationWarning
                disabled={!selectedSlot || !name || !phone || status === "processing"}
                className="flex-1 relative overflow-hidden group py-4 px-4 bg-transparent border border-magenta text-magenta font-bold text-sm tracking-widest uppercase rounded-lg hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                <div className="absolute inset-0 w-0 bg-magenta transition-all duration-300 ease-out group-hover:w-full -z-10" />
                {status === "idle" && "Execute_Booking"}
                {status === "processing" && "Transmitting..."}
                {status === "confirmed" && "Connection_Established"}
              </button>

              <button 
                onClick={() => sendMessage('whatsapp')}
                suppressHydrationWarning
                disabled={!selectedSlot || !name || !phone || status === "processing"}
                className="flex-1 relative overflow-hidden group py-4 px-4 bg-[#25D366]/10 border border-[#25D366] text-[#25D366] font-bold text-sm tracking-widest uppercase rounded-lg hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 w-0 bg-[#25D366] transition-all duration-300 ease-out group-hover:w-full -z-10" />
                <MessageSquare className="w-5 h-5 group-hover:text-white" />
                WhatsApp Link
              </button>
            </div>
          </div>

          {/* Time Slots Grid */}
          <div>
            <h3 className="text-cyan/70 text-sm font-mono tracking-widest mb-6 uppercase border-b border-cyan/20 pb-2">Available Nodes</h3>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <motion.button
                    key={slot}
                    suppressHydrationWarning
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSlotClick(slot)}
                    className={`relative py-4 rounded-md font-mono text-sm tracking-wider border transition-all overflow-hidden ${
                      isSelected 
                        ? 'border-magenta text-white shadow-[0_0_15px_rgba(255,0,127,0.5)] bg-magenta/20' 
                        : 'border-cyan/30 text-cyan/70 hover:border-cyan hover:text-cyan hover:bg-cyan/10'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 bg-magenta rounded-md z-0"
                      />
                    )}
                    <span className="relative z-10">{slot}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
