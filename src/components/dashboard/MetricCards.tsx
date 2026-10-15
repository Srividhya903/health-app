"use client";

import React, { useState } from "react";

const metrics = [
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
    detail: "Resting · Normal",
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
  {
    id: "water",
    label: "Water Intake",
    value: "1.8",
    unit: "L",
    target: "2.5 L",
    progress: 72,
    detail: "3 glasses remaining",
  },
];

export default function MetricCards() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      {metrics.map((m) => (
        <div
          key={m.id}
          style={{
            display: "grid",
            gridTemplateColumns: "12rem 1fr auto",
            gap: "2rem",
            alignItems: "center",
            padding: "1.75rem 0",
            borderTop: "1px solid #1a1a1a",
            cursor: "pointer",
          }}
          onClick={() => setActive(active === m.id ? null : m.id)}
          className="metric-row"
        >
          <div>
            <p className="label-upper" style={{ marginBottom: "0.375rem" }}>{m.label}</p>
            <p style={{ fontSize: "0.8125rem", color: "#505050" }}>{m.detail}</p>
          </div>
          <div>
            <div className="progress-track" style={{ marginBottom: "0.5rem" }}>
              <div className="progress-fill" style={{ width: `${m.progress}%` }} />
            </div>
            <p style={{ fontSize: "0.75rem", color: "#505050" }}>Target: {m.target}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>
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
