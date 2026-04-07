"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, X, Trash2 } from "lucide-react";
const CHATS_KEY = "neon_tokyo_chats";

const INITIAL_MSG = { role: 'ai' as const, content: 'INITIALIZING KAI-01 NEURAL LINK... READY.' };
const MESSAGES_STORAGE_KEY = 'neon_tokyo_active_chat';

// Message type — includes optional error flag for retry UI
type Message = { role: 'user' | 'ai'; content: string; isError?: boolean };

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thoughtTrace, setThoughtTrace] = useState<string[]>([]);
  const sessionId = useRef(`${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const lastMessage = useRef(""); // for retry
  const messagesEndRef = useRef<HTMLDivElement>(null);


  // Load persisted messages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  // Persist active chat whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    } catch { /* storage full */ }
  }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, thoughtTrace]);

  const handleClear = () => {
    // Archive current session before clearing (if it has user messages)
    const userMsgs = messages.filter((m) => m.role === 'user');
    if (userMsgs.length > 0) {
      try {
        const existing = JSON.parse(localStorage.getItem(CHATS_KEY) || '[]');
        const sessionEntry = { id: sessionId.current, timestamp: new Date().toISOString(), messages };
        const filtered = existing.filter((s: { id: string }) => s.id !== sessionId.current);
        localStorage.setItem(CHATS_KEY, JSON.stringify([...filtered, sessionEntry]));
      } catch { /* ignore */ }
    }
    // Reset to a fresh session
    sessionId.current = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    lastMessage.current = '';
    setMessages([INITIAL_MSG]);
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
  };

  const handleClose = () => {
    const userMsgs = messages.filter((m) => m.role === 'user');
    if (userMsgs.length > 0) {
      try {
        const existing = JSON.parse(localStorage.getItem(CHATS_KEY) || '[]');
        const sessionEntry = { id: sessionId.current, timestamp: new Date().toISOString(), messages };
        const filtered = existing.filter((s: { id: string }) => s.id !== sessionId.current);
        localStorage.setItem(CHATS_KEY, JSON.stringify([...filtered, sessionEntry]));
      } catch { /* ignore */ }
    }
    setIsOpen(false);
  };

  const handleAIQuery = async (userMessage: string) => {
    setIsThinking(true);
    setThoughtTrace([]);
    lastMessage.current = userMessage;

    const thoughts = [
      "Accessing neural network...",
      "Analyzing user request parameters...",
      "Bypassing subnet firewalls...",
      "Generating query payload...",
      "Awaiting node response..."
    ];

    for (let i = 0; i < thoughts.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setThoughtTrace(prev => [...prev, thoughts[i]]);
    }

    try {
      let aiResponse = "I am currently disconnected from the main external network. Operating on local databanks.";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Greetings, user. KAI-01 interface is active. How may I assist your navigation today?";
      } else if (lowerInput.includes("menu") || lowerInput.includes("food") || lowerInput.includes("eat")) {
        aiResponse = "The menu features a selection of synth-crafted sushi and cyber-steaks. Please refer to the dynamic menu terminal for full specifications.";
      } else if (lowerInput.includes("reserve") || lowerInput.includes("book") || lowerInput.includes("table")) {
        aiResponse = "To secure your locus at Neon Tokyo, proceed to the reservation mainframe in the main hub.";
      } else if (lowerInput.includes("who are you") || lowerInput.includes("what is this")) {
        aiResponse = "I am KAI-01, the neural concierge of Neon Tokyo. My primary function is to optimize your digital and physical experience in this establishment.";
      } else if (lowerInput.includes("help")) {
        aiResponse = "Available local queries: menu databanks, reservation protocols, general system status. Please state your inquiry clearly.";
      } else {
        aiResponse = "Input acknowledged: '" + userMessage + "'. However, my cognitive pathways are currently restricted to basic inquiries.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setMessages(prev => [...prev, {
        role: 'ai',
        content: msg,
        isError: true,
      }]);
    } finally {
      setIsThinking(false);
      setThoughtTrace([]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    await handleAIQuery(userMessage);
  };

  const handleRetry = async () => {
    if (!lastMessage.current || isThinking) return;
    // Remove the last error message before retrying
    setMessages(prev => prev.filter((_, i) => !(i === prev.length - 1 && prev[prev.length - 1].isError)));
    await handleAIQuery(lastMessage.current);
  };

  const userCount = messages.filter(m => m.role === 'user').length;

  return (
    <>
      {/* ── Trigger Button ── */}
      {/* NOTE: wrapper div is fixed; inner button is relative so the badge can use absolute positioning */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          suppressHydrationWarning
          className="relative p-4 rounded-full border border-cyan/50 text-cyan hover:shadow-[0_0_24px_rgba(0,255,255,0.6)] transition-all duration-300 group"
          style={{ background: "#0a1a1a" }}
        >
          {/* Outer ping ring on hover */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ boxShadow: "0 0 0 1px rgba(0,255,255,0.3)" }} />

          <Terminal size={24} />

          {/* Unread badge */}
          {userCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-cyan text-[#04060d] text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.9)]">
              {userCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-8 z-50 w-88 md:w-104 flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,255,255,0.12)] border border-cyan/25"
            style={{
              maxHeight: "min(600px, 80vh)",
              height: "min(600px, 80vh)",
              background: "#07101a",
            }}
          >
            {/* ── Header ── */}
            <div
              className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-cyan/15"
              style={{ background: "#0c1f2e" }}
            >
              <div className="flex items-center gap-3">
                {/* Status dot */}
                <div className="relative w-2.5 h-2.5">
                  <span className="absolute inset-0 bg-cyan rounded-full animate-ping opacity-50" />
                  <span className="relative block w-2.5 h-2.5 bg-cyan rounded-full shadow-[0_0_8px_#00ffff]" />
                </div>
                <div>
                  <p className="text-cyan font-black tracking-widest text-xs uppercase leading-none">KAI-01</p>
                  <p className="text-cyan/40 font-mono text-[10px] tracking-widest leading-none mt-0.5">NEURAL LINK ACTIVE</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Clear / New Session button */}
                <button
                  onClick={handleClear}
                  suppressHydrationWarning
                  title="Clear chat"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
                {/* Close button */}
                <button
                  onClick={handleClose}
                  suppressHydrationWarning
                  title="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Scanline strip ── */}
            <div
              className="shrink-0 h-[2px] w-full"
              style={{ background: "linear-gradient(90deg, transparent, #00ffff, transparent)" }}
            />

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 font-mono text-sm
                         [&::-webkit-scrollbar]:w-1
                         [&::-webkit-scrollbar-track]:bg-transparent
                         [&::-webkit-scrollbar-thumb]:bg-cyan/20
                         [&::-webkit-scrollbar-thumb:hover]:bg-cyan/40"
              style={{ background: "#07101a" }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar for AI */}
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full shrink-0 mr-2 mt-0.5 flex items-center justify-center text-[9px] font-black text-[#07101a]"
                      style={{ background: "#00ffff", boxShadow: "0 0 8px #00ffff66" }}>
                      K
                    </div>
                  )}

                  {msg.isError ? (
                    /* ── Error bubble with retry ── */
                    <div className="max-w-[82%] rounded-xl rounded-bl-sm px-4 py-3 space-y-2"
                      style={{ background: "#1a0808", border: "1px solid rgba(255,60,60,0.45)", boxShadow: "0 0 14px rgba(255,0,0,0.1)" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-400 text-[10px] font-black tracking-widest uppercase">⚠ SYSTEM ERROR</span>
                      </div>
                      <p className="text-red-300/80 font-mono text-xs leading-relaxed">{msg.content}</p>
                      <p className="text-white/30 font-mono text-[10px]">Check your local network connection · Verify system integrity</p>
                      <button
                        suppressHydrationWarning
                        onClick={handleRetry}
                        disabled={isThinking}
                        className="mt-1 px-3 py-1.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase transition-all disabled:opacity-40"
                        style={{ background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.4)", color: "#ff8888" }}
                      >
                        ↺ Retry
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-3 rounded-xl max-w-[78%] text-sm leading-relaxed wrap-break-word ${
                        msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                      }`}
                      style={
                        msg.role === 'user'
                          ? { background: "#2a0f1f", border: "1px solid rgba(255,0,127,0.45)", color: "#ffffff", boxShadow: "0 0 12px rgba(255,0,127,0.15)" }
                          : { background: "#0d2233", border: "1px solid rgba(0,255,255,0.25)", color: "#c8f8ff", boxShadow: "0 0 12px rgba(0,255,255,0.08)" }
                      }
                    >
                      {msg.content}
                    </div>
                  )}

                  {/* Avatar for user */}
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full shrink-0 ml-2 mt-0.5 flex items-center justify-center text-[9px] font-black"
                      style={{ background: "#2a0f1f", border: "1px solid rgba(255,0,127,0.5)", color: "#ff007f" }}>
                      U
                    </div>
                  )}
                </div>
              ))}

              {/* Thought trace / loading */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full shrink-0 mr-2 mt-0.5 flex items-center justify-center text-[9px] font-black text-[#07101a]"
                    style={{ background: "#00ffff", boxShadow: "0 0 8px #00ffff66" }}>
                    K
                  </div>
                  <div
                    className="px-4 py-3 rounded-xl rounded-bl-sm max-w-[78%] font-mono text-xs overflow-hidden"
                    style={{
                      background: "#0d2233",
                      border: "1px solid rgba(0,255,255,0.2)",
                      minHeight: "4rem",
                      minWidth: "12rem",
                    }}
                  >
                    <div className="space-y-1">
                      {thoughtTrace.map((thought, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-cyan/60 truncate"
                        >
                          <span className="text-cyan/30 mr-1">›</span>{thought}
                        </motion.div>
                      ))}
                    </div>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.9 }}
                      className="inline-block mt-2 text-cyan font-bold"
                    >
                      _
                    </motion.span>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input bar ── */}
            <div
              className="shrink-0 border-t border-cyan/15 px-4 py-3 flex items-center gap-3"
              style={{ background: "#0c1f2e" }}
            >
              <input
                type="text"
                value={input}
                suppressHydrationWarning
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter query..."
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder:text-white/25 border-b border-cyan/30 focus:border-cyan/70 pb-1 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleSend}
                suppressHydrationWarning
                disabled={!input.trim() || isThinking}
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{
                  background: input.trim() && !isThinking ? "#00ffff" : "rgba(0,255,255,0.1)",
                  boxShadow: input.trim() && !isThinking ? "0 0 16px rgba(0,255,255,0.5)" : "none",
                  color: input.trim() && !isThinking ? "#07101a" : "#00ffff",
                }}
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}