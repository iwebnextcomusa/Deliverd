import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Truck, Sparkles, Phone, ArrowUpRight } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Hi there! I'm Delly, your neighborly moving & logistics assistant at **Deliverd**. 🚚\n\nHow can I help you today? Ask me about **local rates**, **our service areas**, **packing support**, or share your locations to get a friendly ballpark estimate!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content) return;

    if (!textToSend) {
      setInput("");
    }

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Pack the messages to send to the backend
      const messageHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/quote-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageHistory })
      });

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        content: data.reply || "I'm sorry, I couldn't compute that request. Please try again or call us!",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      console.error(e);
      const botMessage: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        content: "I'm having trouble connecting to my logistics core right now. However, I can tell you our local moves start around $95/hour! Feel free to call our friendly team directly at **(604) 441-7304** to lock in your booking!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const quickSuggestions = [
    "What are your hourly rates?",
    "Do you offer packing services?",
    "Where are you located?",
    "Estimate Surrey to Burnaby cost"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] max-h-[calc(100vh-120px)] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#155EEF] flex items-center justify-center text-white">
                <Truck className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm font-bold text-slate-900 leading-none">Delly Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-pulse" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono font-medium block mt-1">
                  Deliverd AI Mover Coordinator
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.map((msg) => {
              const isBot = msg.role === "model";
              return (
                <div key={msg.id} className={`flex items-start ${isBot ? "justify-start" : "justify-end"} space-x-2`}>
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 text-[#12B76A]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-xs leading-relaxed ${
                    isBot 
                      ? "bg-slate-50 border border-slate-200 text-slate-800" 
                      : "bg-[#155EEF] text-white font-medium"
                  }`}>
                    {/* Minimal custom renderer for bold/emoji text since markdown parser is simple here */}
                    <div className="whitespace-pre-wrap">
                      {msg.content.split("\n").map((line, lIdx) => {
                        // Handle simple bold highlights (**text**)
                        const parts = line.split(/\*\*(.*?)\*\*/g);
                        return (
                          <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                            {parts.map((part, pIdx) => {
                              if (pIdx % 2 === 1) {
                                  return <strong key={pIdx} className="font-extrabold text-[#12B76A]">{part}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#12B76A]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex space-x-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions chips */}
          <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 overflow-x-auto flex space-x-2 scrollbar-none">
            {quickSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(sug)}
                className="flex-shrink-0 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Form input field */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Delly about your move..."
              className="flex-1 bg-white border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] px-3 py-2.5 rounded-xl text-xs text-slate-900 outline-none placeholder-slate-400 transition-all shadow-sm"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-xl bg-[#155EEF] hover:bg-[#155EEF]/90 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Call block */}
          <div className="bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center text-[10px] text-slate-400">
            <span>📞 Direct Hotline: (604) 441-7304</span>
            <a href="tel:6044417304" className="text-[#12B76A] font-bold flex items-center hover:underline">
              <span>Call Now</span>
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-[#155EEF] hover:bg-[#155EEF]/90 text-white shadow-xl shadow-[#155EEF]/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer relative border border-[#155EEF]/20"
        aria-label="Open support chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#12B76A]"></span>
            </span>
          </>
        )}
      </button>

    </div>
  );
}
