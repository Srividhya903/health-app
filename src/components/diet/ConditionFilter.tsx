"use client";

import React from "react";
import { HealthConditionDiet } from "@/data/dietData";
import { ArrowRight } from "lucide-react";

interface ConditionFilterProps {
  conditions: Record<string, HealthConditionDiet>;
  selectedConditionId: string;
  onSelectCondition: (id: string) => void;
}

export default function ConditionFilter({
  conditions,
  selectedConditionId,
  onSelectCondition,
}: ConditionFilterProps) {
  const activeCondition = conditions[selectedConditionId] || conditions.diabetes;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* Condition Selector */}
      <div>
        <p className="label-upper" style={{ marginBottom: "1.25rem" }}>
          01 / Clinical Protocol Focus
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {Object.values(conditions).map((cond) => {
            const isSelected = cond.id === selectedConditionId;
            return (
              <button
                key={cond.id}
                onClick={() => onSelectCondition(cond.id)}
                id={`filter-${cond.id}`}
                className={`chip${isSelected ? " active" : ""}`}
                style={{
                  fontSize: "0.875rem",
                  padding: "0.6rem 1.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                {cond.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocol Overview & Macro Split */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          alignItems: "start",
          paddingTop: "2rem",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#707070",
              }}
            >
              {activeCondition.badge}
            </span>
            <span style={{ color: "#303030" }}>—</span>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#a0a0a0",
              }}
            >
              {activeCondition.clinicalTarget}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            {activeCondition.name}
          </h2>

          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "#a0a0a0",
              maxWidth: "540px",
            }}
          >
            {activeCondition.overview}
          </p>
        </div>

        {/* Macro targets */}
        <div
          style={{
            borderLeft: "1px solid #1a1a1a",
            paddingLeft: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div>
            <p className="label-upper" style={{ marginBottom: "0.5rem" }}>
              Daily Calorie Baseline
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {activeCondition.baseCalories}
              </span>
              <span style={{ fontSize: "0.875rem", color: "#505050", fontWeight: 600 }}>
                kcal / day
              </span>
            </div>
          </div>

          <div>
            <p className="label-upper" style={{ marginBottom: "1rem" }}>
              Target Macronutrient Distribution
            </p>

            {/* Split bar in grayscale */}
            <div
              style={{
                display: "flex",
                height: "6px",
                width: "100%",
                background: "#1a1a1a",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: `${activeCondition.targetMacros.proteinPct}%`,
                  background: "#ffffff",
                }}
                title={`Protein: ${activeCondition.targetMacros.proteinPct}%`}
              />
              <div
                style={{
                  width: `${activeCondition.targetMacros.carbsPct}%`,
                  background: "#808080",
                }}
                title={`Carbs: ${activeCondition.targetMacros.carbsPct}%`}
              />
              <div
                style={{
                  width: `${activeCondition.targetMacros.fatsPct}%`,
                  background: "#383838",
                }}
                title={`Fats: ${activeCondition.targetMacros.fatsPct}%`}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
                paddingTop: "0.5rem",
              }}
            >
              <div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.6875rem",
                    color: "#707070",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "#fff",
                      display: "inline-block",
                    }}
                  />
                  Protein
                </span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#fff",
                    display: "block",
                    marginTop: "0.2rem",
                  }}
                >
                  {activeCondition.targetMacros.proteinPct}%
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.6875rem",
                    color: "#707070",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "#808080",
                      display: "inline-block",
                    }}
                  />
                  Carbs
                </span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#fff",
                    display: "block",
                    marginTop: "0.2rem",
                  }}
                >
                  {activeCondition.targetMacros.carbsPct}%
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.6875rem",
                    color: "#707070",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "#383838",
                      display: "inline-block",
                    }}
                  />
                  Fats
                </span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#fff",
                    display: "block",
                    marginTop: "0.2rem",
                  }}
                >
                  {activeCondition.targetMacros.fatsPct}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
