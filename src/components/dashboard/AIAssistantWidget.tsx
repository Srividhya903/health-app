"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const QUICK_PROMPTS = [
  "Analyse my sleep trend",
  "Why is my resting HR elevated?",
  "Suggest a low-glycaemic breakfast",
  "Interpret my recent biomarkers",
];

interface Message {
  role: "user" | "ai";
  text: string;
}

const aiResponses: Record<string, string> = {
  "Analyse my sleep trend": "Over the past 7 nights, your average sleep duration is 7.1 hours with consistent deep sleep of ~1h 40m. REM cycles are slightly below optimal — consider reducing screen exposure 90 minutes before bed.",
  "Why is my resting HR elevated?": "Your resting HR today is 72 bpm vs your 30-day average of 65 bpm. Possible contributors: dehydration (water intake 1.8 L vs 2.5 L target), yesterday's late meal, or residual stress markers.",
  "Suggest a low-glycaemic breakfast": "For your diabetes profile: steel-cut oats with almond butter and chia seeds (GI ~42). Pair with a small protein source (2 boiled eggs or Greek yoghurt) to further blunt the glucose response.",
  "Interpret my recent biomarkers": "Fasting glucose 92 mg/dL — within range (normal <100). HbA1c trend improving. Blood pressure 118/78 mmHg — optimal. Your overall metabolic risk score has decreased by 4 points this quarter.",
};

export default function AIAssistantWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello Jane. I've reviewed today's biometrics. Ask me anything about your health." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    const aiText = aiResponses[text] || "Based on your current data, everything looks stable. For this query I would recommend speaking with your assigned physician for a more nuanced assessment.";
    setMessages((prev) => [...prev, userMsg, { role: "ai", text: aiText }]);
    setInput("");
  };

  return (
    <div>
      {/* Message thread */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "4rem 1fr", gap: "1rem", alignItems: "start" }}>
            <span className="label-upper" style={{ paddingTop: "0.15rem" }}>
              {m.role === "ai" ? "AI" : "You"}
            </span>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: m.role === "ai" ? "#d0d0d0" : "#707070" }}>
              {m.text}
            </p>
          </div>
        ))}
      </div>

      {/* Quick prompts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.5rem" }}>
        {QUICK_PROMPTS.map((p) => (
          <button key={p} onClick={() => send(p)} className="chip">
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", borderTop: "1px solid #1a1a1a", paddingTop: "1.5rem" }}>
        <input
          type="text"
          className="input-editorial"
          placeholder="Ask about your health…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); send(input); } }}
          style={{ flex: 1 }}
        />
        <button onClick={() => send(input)} className="btn-primary btn-sm" style={{ flexShrink: 0 }}>
          Send <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
