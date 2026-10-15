"use client";

import React from "react";

const features = [
  {
    number: "01",
    title: "AI Clinical Diagnostics",
    body: "Symptom analysis, biomarker correlation, and differential diagnosis — powered by clinically-validated models.",
  },
  {
    number: "02",
    title: "Precision Nutrition",
    body: "Disease-specific meal plans calibrated to your metabolic markers. Updated daily as your data evolves.",
  },
  {
    number: "03",
    title: "Specialist Telehealth",
    body: "Board-certified physicians, dietitians, and psychologists available in under two minutes.",
  },
  {
    number: "04",
    title: "Biometric Monitoring",
    body: "Continuous sync from Apple Watch, Oura, and Garmin. Real-time alerts when readings drift from baseline.",
  },
  {
    number: "05",
    title: "Secure Health Records",
    body: "End-to-end encrypted patient EHR with HIPAA compliance and granular access controls.",
  },
  {
    number: "06",
    title: "Smart Medication Tracker",
    body: "Adherence monitoring, drug-nutrient interaction warnings, and automated refill reminders.",
  },
];

export default function ValuePropositions() {
  return (
    <section id="features" className="section-gap" style={{ borderBottom: "1px solid #1a1a1a" }}>
      <div className="container-editorial">
        {/* Section header */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
          <div>
            <p className="label-upper" style={{ marginBottom: "1rem" }}>Platform capabilities</p>
            <h2 className="display-md" style={{ color: "#fff", maxWidth: "480px" }}>
              Everything your health demands.
            </h2>
          </div>
          <p className="body-sm" style={{ maxWidth: "300px", textAlign: "right" }}>
            Six integrated systems working in concert to keep you ahead of disease.
          </p>
        </div>

        {/* Feature list — editorial rows */}
        <div>
          {features.map((feature, i) => (
            <div
              key={feature.number}
              style={{
                display: "grid",
                gridTemplateColumns: "4rem 1fr 1fr",
                gap: "2rem",
                alignItems: "start",
                padding: "2rem 0",
                borderTop: "1px solid #1a1a1a",
              }}
              className="feature-row"
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#505050", letterSpacing: "0.04em", paddingTop: "0.2rem" }}>
                {feature.number}
              </span>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                {feature.title}
              </h3>
              <p className="body-sm">{feature.body}</p>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .feature-row {
            grid-template-columns: 3rem 1fr !important;
          }
          .feature-row > p:last-child {
            grid-column: 2;
          }
        }
      `}</style>
    </section>
  );
}
