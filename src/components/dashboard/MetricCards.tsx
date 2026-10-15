"use client";

import React, { useState } from "react";

interface MetricCardsProps {
  customBP?: string;
  customGlucose?: string;
  customWeight?: string;
}

export default function MetricCards({
  customBP = "118/78",
  customGlucose = "92",
  customWeight = "64.2",
}: MetricCardsProps) {
  const [active, setActive] = useState<string | null>(null);

  const dynamicMetrics = [
    {
      id: "bp",
      label: "Blood Pressure",
      value: customBP,
      unit: "mmHg",
      target: "< 120/80",
      progress: 88,
      detail: "Optimal · Arterial elasticity normal",
    },
    {
      id: "glucose",
      label: "Fasting Glucose",
      value: customGlucose,
      unit: "mg/dL",
      target: "70–99",
      progress: 85,
      detail: "In range · Insulin sensitivity high",
    },
    {
      id: "weight",
      label: "Body Weight",
      value: customWeight,
      unit: "kg",
      target: "65.0 kg",
      progress: 92,
      detail: "Stable · Lean body mass 76%",
    },
    {
      id: "steps",
      label: "Daily Steps",
      value: "8,240",
      unit: "steps",
      target: "10,000",
      progress: 82,
      detail: "↑ 420 from yesterday",
    },
    {
      id: "heart",
      label: "Heart Rate",
      value: "68",
      unit: "bpm",
      target: "60–100",
      progress: 72,
      detail: "Resting · Normal sinus rhythm",
    },
    {
      id: "sleep",
      label: "Sleep",
      value: "7.2",
      unit: "hrs",
      target: "8 hrs",
      progress: 90,
      detail: "Deep 1h 42m · REM 1h 58m",
    },
  ];

  return (
    <div>
      {dynamicMetrics.map((m) => (
        <div
          key={m.id}
          style={{
            display: "grid",
            gridTemplateColumns: "14rem 1fr auto",
            gap: "2rem",
            alignItems: "center",
            padding: "1.75rem 0",
            borderTop: "1px solid #1a1a1a",
            cursor: "pointer",
            background: active === m.id ? "#0a0a0a" : "transparent",
            transition: "background-color 0.15s ease",
          }}
          onClick={() => setActive(active === m.id ? null : m.id)}
          className="metric-row"
        >
          <div>
            <p className="label-upper" style={{ marginBottom: "0.375rem" }}>{m.label}</p>
            <p style={{ fontSize: "0.8125rem", color: "#606060" }}>{m.detail}</p>
          </div>
          <div>
            <div className="progress-track" style={{ marginBottom: "0.5rem" }}>
              <div className="progress-fill" style={{ width: `${m.progress}%` }} />
            </div>
            <p style={{ fontSize: "0.75rem", color: "#505050" }}>Target: {m.target}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {m.value}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#505050", marginTop: "0.2rem" }}>{m.unit}</p>
          </div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid #1a1a1a" }} />

      <style>{`
        @media (max-width: 580px) {
          .metric-row { grid-template-columns: 1fr auto !important; }
          .metric-row > div:nth-child(2) { display: none; }
        }
      `}</style>
    </div>
  );
}
