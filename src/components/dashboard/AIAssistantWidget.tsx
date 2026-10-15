"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Loader2, Sparkles, Trash2 } from "lucide-react";

const QUICK_PROMPTS = [
  "Suggest a PCOS friendly diet plan",
  "Why is my resting HR elevated?",
  "Suggest a low-glycaemic breakfast",
  "Interpret my recent biomarkers",
];

interface Message {
  role: "user" | "ai";
  text: string;
}

interface AIAssistantWidgetProps {
  userName?: string | null;
  vitals?: {
    bp?: string;
    glucose?: string;
    weight?: string;
    score?: number;
  };
}

export default function AIAssistantWidget({ userName, vitals }: AIAssistantWidgetProps) {
  const initialGreeting = `Hello ${userName || "there"}. I've reviewed your biometric profile${
    vitals?.bp ? ` (BP: ${vitals.bp}, Glucose: ${vitals.glucose} mg/dL)` : ""
  }. Ask me any question about your health, nutrition, or symptoms.`;

  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: initialGreeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", text: text.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newHistory.filter((_, idx) => idx > 0 || newHistory.length <= 2),
          userContext: {
            name: userName || "Patient",
            bp: vitals?.bp || "118/78",
            glucose: vitals?.glucose || "92",
            weight: vitals?.weight || "64.2",
            score: vitals?.score || 87,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: `⚠️ Error: ${data.message || "Failed to retrieve response from AI."}`,
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Connection error: Unable to reach the AI server. Please check your network and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: `Chat reset. Ask me anything about conditions (e.g. PCOS diet, cholesterol, biomarkers), nutrition, or sleep.`,
      },
    ]);
  };

  return (
    <div>
      {/* Top status bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles size={14} style={{ color: "#38bdf8" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a0a0a0" }}>
            Groq AI Clinical Engine
          </span>
          <span style={{ fontSize: "0.6875rem", background: "#0c1f17", color: "#4ade80", border: "1px solid #144026", padding: "0.1rem 0.4rem" }}>
            Ultra-Low Latency
          </span>
        </div>

        {messages.length > 2 && (
          <button
            onClick={clearChat}
            style={{
              background: "none",
              border: "none",
              color: "#606060",
              fontSize: "0.6875rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            title="Clear conversation"
          >
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>

      {/* Message thread */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.75rem",
          marginBottom: "2rem",
          maxHeight: "460px",
          overflowY: "auto",
          paddingRight: "0.5rem",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "3.5rem 1fr", gap: "1rem", alignItems: "start" }}>
            <span
              className="label-upper"
              style={{
                paddingTop: "0.2rem",
                color: m.role === "ai" ? "#38bdf8" : "#888",
                fontWeight: 700,
              }}
            >
              {m.role === "ai" ? "AI" : "You"}
            </span>
            <div
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: m.role === "ai" ? "#e2e8f0" : "#94a3b8",
                whiteSpace: "pre-line",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "3.5rem 1fr", gap: "1rem", alignItems: "start" }}>
            <span className="label-upper" style={{ paddingTop: "0.2rem", color: "#38bdf8", fontWeight: 700 }}>
              AI
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#707070", fontSize: "0.875rem" }}>
              <Loader2 size={15} className="animate-spin" />
              <span>Analyzing with Groq AI...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            disabled={loading}
            className="chip"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", borderTop: "1px solid #1a1a1a", paddingTop: "1.5rem" }}>
        <input
          type="text"
          className="input-editorial"
          placeholder="Ask anything (e.g., 'Suggest a PCOS diet plan', 'Interpret glucose 110')…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send(input);
            }
          }}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          className="btn-primary btn-sm"
          style={{ flexShrink: 0, opacity: loading || !input.trim() ? 0.6 : 1 }}
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <>Send <ArrowRight size={13} /></>}
        </button>
      </div>
    </div>
  );
}
