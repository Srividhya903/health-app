"use client";

import React, { useState } from "react";
import { FoodGuideline } from "@/data/dietData";
import { Download, Check } from "lucide-react";

interface DietaryGuidelinesProps {
  conditionName: string;
  recommendedFoods: FoodGuideline[];
  restrictedFoods: FoodGuideline[];
  clinicalTips: string[];
}

export default function DietaryGuidelines({
  conditionName,
  recommendedFoods,
  restrictedFoods,
  clinicalTips,
}: DietaryGuidelinesProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <p className="label-upper" style={{ marginBottom: "0.5rem" }}>
            03 / Nutritional Boundary Rules
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            Guidelines & Restrictions
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#707070", marginTop: "0.5rem" }}>
            Evidence-based nutritional parameters specifically for {conditionName}
          </p>
        </div>

        <button
          onClick={handleDownload}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderBottom: "1px solid #fff",
            paddingBottom: "2px",
          }}
        >
          {downloaded ? (
            <>
              <Check size={14} /> Guidelines Exported
            </>
          ) : (
            <>
              <Download size={14} /> Download Cheat Sheet
            </>
          )}
        </button>
      </div>

      {/* Two Column Layout: Prioritize vs Restrict */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "4rem",
          borderTop: "1px solid #1a1a1a",
          paddingTop: "2.5rem",
        }}
      >
        {/* Prioritize */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#fff",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Foods to Prioritize
            </span>
            <p style={{ fontSize: "0.8125rem", color: "#707070" }}>
              Therapeutic ingredients that lower inflammatory and metabolic load
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {recommendedFoods.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: "1px solid #141414",
                  padding: "1.25rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#fff" }}>
                    {item.food}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#707070",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 600,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#a0a0a0", lineHeight: 1.5 }}>
                  {item.benefitOrHarm}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Restrict */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#707070",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Foods to Restrict / Avoid
            </span>
            <p style={{ fontSize: "0.8125rem", color: "#707070" }}>
              Compounds that trigger glycaemic spikes or systemic inflammation
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {restrictedFoods.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: "1px solid #141414",
                  padding: "1.25rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#fff" }}>
                    {item.food}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#707070",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 600,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#a0a0a0", lineHeight: 1.5 }}>
                  {item.benefitOrHarm}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Habits & Timing Rules */}
      <div
        style={{
          borderTop: "1px solid #1a1a1a",
          paddingTop: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <span className="label-upper">
          Practitioner Habits & Meal Timing
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {clinicalTips.map((tip, idx) => (
            <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  color: "#505050",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                0{idx + 1}
              </span>
              <p style={{ fontSize: "0.875rem", color: "#a0a0a0", lineHeight: 1.6 }}>
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
