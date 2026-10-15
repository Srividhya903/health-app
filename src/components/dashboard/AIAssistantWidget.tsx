"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Send,
  User,
  Paperclip,
  Mic,
  Maximize2,
  Minimize2,
  ShieldAlert,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  badges?: string[];
}

export default function AIAssistantWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "user",
      text: "Good morning AuraBot! How are my recovery metrics looking after yesterday's 8,432 steps?",
      time: "08:15 AM",
    },
    {
      id: "msg-2",
      sender: "bot",
      text: "Good morning Jane! Your cardiovascular recovery is in the optimal 92nd percentile today. Your resting heart rate settled at 62 BPM with an HRV of 58 ms (low autonomic stress). Your 7h 48m sleep architecture also showed an ideal 28% REM phase for neuro-cognitive restoration. \n\nRecommendation: You have logged 2,250 ml of water; drink 500 ml before lunch to hit your hydration peak.",
      time: "08:16 AM",
      badges: ["Clinical Triage Tier-1", "Optimal Recovery", "HRV: 58ms"],
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const quickPrompts = [
    "Explain my HRV score (58ms)",
    "Recommend a post-workout recovery snack",
    "Should I book a cardiology follow-up?",
    "Review my deep sleep stages",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const msgId = `user-msg-${messages.length + 1}`;
    const userMsg: Message = {
      id: msgId,
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock realistic clinical AI response
    setTimeout(() => {
      let botReply =
        "Based on your continuous telemetry and metabolic biomarkers, your vitals remain within healthy clinical thresholds. I've noted this in your health timeline.";

      if (query.toLowerCase().includes("hrv")) {
        botReply =
          "Your Heart Rate Variability (HRV) is 58 ms, which is 6 ms above your 30-day baseline. This indicates balanced autonomic nervous system activity and high physiological adaptability to physical training.";
      } else if (query.toLowerCase().includes("snack") || query.toLowerCase().includes("food")) {
        botReply =
          "To align with your Mediterranean Longevity protocol: Try 25g of raw walnuts paired with Greek yogurt and blueberries. This provides 18g of clean protein and anti-inflammatory polyphenols without insulin spikes.";
      } else if (query.toLowerCase().includes("doctor") || query.toLowerCase().includes("cardiolog")) {
        botReply =
          "Your cardiac rhythm is steady at 71 BPM with no arrhythmia detected. Dr. Sarah Chen, MD has open telehealth slots today at 2:15 PM if you'd like an annual preventative check-in.";
      } else if (query.toLowerCase().includes("sleep")) {
        botReply =
          "Last night you attained 1h 45m of Deep Sleep (22%) and 2h 10m of REM (28%). Your sleep efficiency was 92%, indicating minimal micro-awakenings.";
      }

      const botMsg: Message = {
        id: `bot-reply-${Math.floor(Math.random() * 10000)}`,
        sender: "bot",
        text: botReply,
        time: "Just now",
        badges: ["AuraBot Diagnostic", "Evidence-Based"],
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div
      id="ai-assistant-widget"
      className={`glass-panel-glow rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl transition-all duration-300 ${
        isExpanded ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#080e1b] rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080e1b] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                AuraBot Clinical AI™
              </h3>
              <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                Triage LLM 4.2
              </span>
            </div>
            <p className="text-xs text-slate-400">
              24/7 Clinical Assistant • Context-Aware of your Biometrics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all focus:outline-none"
            title={isExpanded ? "Collapse Widget" : "Expand Widget"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Quick Ask:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs font-medium text-cyan-300 hover:text-white bg-slate-900/90 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div
        className={`overflow-y-auto space-y-3.5 pr-1 my-2 transition-all ${
          isExpanded ? "max-h-[380px]" : "max-h-[260px]"
        }`}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${
              m.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === "user"
                  ? "bg-slate-800 text-cyan-300"
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              }`}
            >
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-900/20 rounded-tr-sm"
                  : "bg-[#0b1220] border border-slate-800 text-slate-200 rounded-tl-sm shadow-md"
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {/* Bot Badges if present */}
              {m.badges && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80">
                  {m.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[10px] font-semibold bg-cyan-950/90 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              <span className="block text-[10px] text-slate-400 mt-1.5 text-right font-medium">
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800 w-fit animate-pulse">
            <Bot className="w-3.5 h-3.5" />
            <span>AuraBot is analyzing biometrics &amp; medical guidelines...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Ask AuraBot anything about your symptoms, macros, or vitals..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Attach Lab PDF or Image"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
          title="Voice query"
        >
          <Mic className="w-4 h-4" />
        </button>

        <button
          type="submit"
          id="ai-assistant-send-btn"
          className="py-2.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* HIPAA Medical Notice */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 px-1">
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-cyan-400" />
          HIPAA Guarded • Encrypted conversation
        </span>
        <span>AI triage advisory only • Not a substitute for primary doctor</span>
      </div>
    </div>
  );
}
