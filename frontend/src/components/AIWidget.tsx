"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal } from "lucide-react";

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'INITIALIZING KAI-01 NEURAL LINK... READY.' }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thoughtTrace, setThoughtTrace] = useState<string[]>([]);

  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsThinking(true);
    setThoughtTrace([]);

    // Simulate "Thought Trace"
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
      // Connect to n8n AI Agent Webhook
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sending 'chatInput' matching your snippet
        body: JSON.stringify({ chatInput: userMessage })
      });

      if (!response.ok) {
        const errorData = await response.text(); 
        console.error("N8N Error Details:", errorData); 
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      
      // Extract the correct response format from n8n (handles raw AI node output)
      let aiResponse = '[DATA LOG]: Processed input. (Received from n8n)';
      
      if (data.content && data.content.parts && data.content.parts.length > 0) {
        aiResponse = data.content.parts[0].text;
      } else if (data.response) { aiResponse = data.response; }
      else if (data.output) { aiResponse = data.output; }
      else if (data.text) { aiResponse = data.text; }
      else if (data.message) { aiResponse = data.message; }
      
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'ai', content: '[SYSTEM ERROR]: Neural link unstable. FAILED_TO_REACH_N8N. Check console for error details.' }]);
    } finally {
      setIsThinking(false);
      setThoughtTrace([]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        suppressHydrationWarning
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-cyan/10 border border-cyan/50 text-cyan hover:bg-cyan/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all backdrop-blur-md"
      >
        <Terminal size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 w-80 md:w-96 glass-panel rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.15)] flex flex-col max-h-[600px] h-[70vh] border border-cyan/30"
          >
            <div className="bg-cyan/10 p-4 flex justify-between items-center border-b border-cyan/20">
              <div className="flex items-center gap-2 text-cyan font-bold tracking-widest text-sm uppercase">
                <div className="w-2 h-2 bg-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,1)]" />
                KAI-01 LINK
              </div>
              <button onClick={() => setIsOpen(false)} suppressHydrationWarning className="text-cyan hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm relative">
                <div className="absolute inset-0 bg-transparent pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                  <div className={`p-3 rounded max-w-[85%] ${msg.role === 'user' ? 'bg-magenta/20 text-white border border-magenta/30 shadow-[0_0_10px_rgba(255,0,127,0.2)]' : 'bg-cyan/10 text-cyan shadow-[0_0_10px_rgba(0,255,255,0.1)] border border-cyan/20'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start relative z-10">
                  <div className="p-3 w-full bg-black/60 border border-cyan/20 rounded font-mono text-xs text-cyan/50 h-32 overflow-hidden flex flex-col justify-end">
                     {thoughtTrace.map((thought, i) => (
                         <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="text-left w-full truncate"
                          >
                             &gt; {thought}
                         </motion.div>
                     ))}
                     <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="mt-1">_</motion.div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-carbon/90 border-t border-cyan/20 flex gap-2 relative z-10">
              <input 
                type="text" 
                value={input}
                suppressHydrationWarning
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter query..."
                className="flex-1 bg-transparent border-b border-cyan/50 text-white p-2 font-mono text-sm outline-none focus:border-cyan placeholder-cyan/30"
              />
              <button 
                onClick={handleSend}
                suppressHydrationWarning
                className="p-2 text-cyan hover:text-magenta transition-colors hover:scale-110 transform"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}