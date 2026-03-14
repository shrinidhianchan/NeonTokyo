"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, X, Trash2, ChevronDown, ChevronUp, MessageSquare, BookOpen } from "lucide-react";

export type BookingLog = {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  time: string;
  guests: number;
  spicePreference: string;
  method: "terminal" | "whatsapp";
};

export type ChatLog = {
  id: string;
  timestamp: string;
  messages: { role: "user" | "ai"; content: string }[];
};

export const BOOKINGS_KEY = "neon_tokyo_bookings";
export const CHATS_KEY = "neon_tokyo_chats";

export default function DataLogs() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookings" | "chats">("bookings");
  const [bookings, setBookings] = useState<BookingLog[]>([]);
  const [chats, setChats] = useState<ChatLog[]>([]);
  const [expandedChat, setExpandedChat] = useState<string | null>(null);

  const load = () => {
    try {
      const b = localStorage.getItem(BOOKINGS_KEY);
      const c = localStorage.getItem(CHATS_KEY);
      setBookings(b ? JSON.parse(b) : []);
      setChats(c ? JSON.parse(c) : []);
    } catch {
      setBookings([]);
      setChats([]);
    }
  };

  useEffect(() => {
    if (isOpen) load();
  }, [isOpen]);

  const clearBookings = () => {
    localStorage.removeItem(BOOKINGS_KEY);
    setBookings([]);
  };

  const clearChats = () => {
    localStorage.removeItem(CHATS_KEY);
    setChats([]);
  };

  const spiceColor = (level: string) => {
    if (level.includes("Insane")) return "text-red-400 border-red-500/40 bg-red-500/10";
    if (level.includes("Spicy")) return "text-orange-400 border-orange-500/40 bg-orange-500/10";
    return "text-cyan border-cyan/30 bg-cyan/5";
  };

  const totalLogs = bookings.length + chats.length;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        suppressHydrationWarning
        className="fixed bottom-8 left-8 z-50 p-4 rounded-full bg-magenta/10 border border-magenta/50 text-magenta hover:bg-magenta/20 hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all backdrop-blur-md"
        title="Open Neural Data Logs"
      >
        <Database size={24} />
        {totalLogs > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-magenta text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,0,127,0.8)]">
            {totalLogs > 99 ? "99+" : totalLogs}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-60 h-full w-full max-w-xl bg-[#04060d] border-r border-cyan/20 shadow-[4px_0_40px_rgba(0,255,255,0.1)] flex flex-col overflow-hidden"
            >
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "100% 4px",
                }}
              />

              {/* Header */}
              <div className="relative z-20 flex items-center justify-between px-6 py-5 border-b border-cyan/20 bg-black/40 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                  <Database className="text-magenta w-5 h-5" />
                  <span className="text-white font-black tracking-widest uppercase text-sm">
                    Neural Data Logs
                  </span>
                  <span className="px-2 py-0.5 bg-magenta/20 border border-magenta/40 text-magenta text-[10px] font-mono rounded-full">
                    LIVE
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  suppressHydrationWarning
                  className="text-cyan/50 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="relative z-20 flex border-b border-cyan/20 shrink-0">
                {(["bookings", "chats"] as const).map((tab) => (
                  <button
                    key={tab}
                    suppressHydrationWarning
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 font-mono text-xs tracking-widest uppercase transition-all ${
                      activeTab === tab
                        ? "text-cyan border-b-2 border-cyan bg-cyan/5"
                        : "text-cyan/40 hover:text-cyan/70"
                    }`}
                  >
                    {tab === "bookings" ? <BookOpen size={14} /> : <MessageSquare size={14} />}
                    {tab} ({tab === "bookings" ? bookings.length : chats.length})
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-20 flex-1 overflow-y-auto p-4 space-y-3">

                {/* ── BOOKINGS TAB ── */}
                {activeTab === "bookings" && (
                  <>
                    {bookings.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 text-cyan/30 font-mono text-sm">
                        <BookOpen size={32} className="mb-3 opacity-30" />
                        <span>NO RESERVATION DATA FOUND</span>
                        <span className="text-xs mt-1 opacity-50">Bookings will appear here after submission</span>
                      </div>
                    ) : (
                      bookings.slice().reverse().map((b) => (
                        <motion.div
                          key={b.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg border border-cyan/20 bg-cyan/5 font-mono text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-magenta font-bold tracking-wider truncate">{b.name}</span>
                            <span className="text-cyan/40 text-[10px] shrink-0 ml-2">{new Date(b.timestamp).toLocaleString()}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-cyan/70">
                            <div><span className="text-cyan/40">TIME:</span> {b.time}</div>
                            <div><span className="text-cyan/40">GUESTS:</span> {b.guests}</div>
                            <div><span className="text-cyan/40">PHONE:</span> {b.phone}</div>
                            <div>
                              <span className="text-cyan/40">VIA:</span>{" "}
                              <span className={b.method === "whatsapp" ? "text-[#25D366]" : "text-magenta"}>
                                {b.method.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className={`mt-2 inline-block px-2 py-1 rounded border text-[10px] tracking-wider ${spiceColor(b.spicePreference)}`}>
                            🔥 {b.spicePreference}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </>
                )}

                {/* ── CHATS TAB ── */}
                {activeTab === "chats" && (
                  <>
                    {chats.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 text-cyan/30 font-mono text-sm">
                        <MessageSquare size={32} className="mb-3 opacity-30" />
                        <span>NO CHAT SESSIONS FOUND</span>
                        <span className="text-xs mt-1 opacity-50">KAI-01 conversations will appear here</span>
                      </div>
                    ) : (
                      chats.slice().reverse().map((c) => (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-cyan/20 bg-cyan/5 font-mono text-xs overflow-hidden"
                        >
                          <button
                            suppressHydrationWarning
                            onClick={() => setExpandedChat(expandedChat === c.id ? null : c.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-cyan/10 transition-colors text-left"
                          >
                            <div>
                              <div className="text-cyan font-bold tracking-wider">
                                SESSION_{c.id.slice(-6).toUpperCase()}
                              </div>
                              <div className="text-cyan/40 text-[10px] mt-0.5">
                                {new Date(c.timestamp).toLocaleString()} · {c.messages.filter(m => m.role === "user").length} user msg(s)
                              </div>
                            </div>
                            {expandedChat === c.id
                              ? <ChevronUp size={14} className="text-cyan/50 shrink-0" />
                              : <ChevronDown size={14} className="text-cyan/50 shrink-0" />}
                          </button>

                          <AnimatePresence>
                            {expandedChat === c.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-cyan/10"
                              >
                                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                                  {c.messages.map((msg, i) => (
                                    <div
                                      key={i}
                                      className={`p-2 rounded text-[11px] leading-relaxed ${
                                        msg.role === "user"
                                          ? "bg-magenta/10 border border-magenta/20 text-white text-right"
                                          : "bg-black/40 border border-cyan/10 text-cyan/80"
                                      }`}
                                    >
                                      <span className={`block text-[9px] mb-1 tracking-widest ${msg.role === "user" ? "text-magenta/70" : "text-cyan/40"}`}>
                                        {msg.role === "user" ? "USER" : "KAI-01"}
                                      </span>
                                      {msg.content}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="relative z-20 border-t border-cyan/20 px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-sm shrink-0">
                <span className="text-cyan/30 font-mono text-[10px] tracking-widest">
                  STORAGE: localStorage · SECTOR_4_NODE
                </span>
                <button
                  suppressHydrationWarning
                  onClick={activeTab === "bookings" ? clearBookings : clearChats}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded font-mono text-[10px] tracking-wider uppercase hover:bg-red-500/20 hover:border-red-500/60 transition-all"
                >
                  <Trash2 size={12} />
                  Purge {activeTab}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
