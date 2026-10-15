"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const conditions = ["Diabetes", "PCOS", "Heart Health", "General Fitness"];
const meals = [
  { time: "Breakfast", name: "Steel-cut oats, almond butter, chia seeds", kcal: "380 kcal", macros: "P 14g · C 52g · F 12g" },
  { time: "Lunch", name: "Grilled salmon, quinoa, steamed broccoli", kcal: "520 kcal", macros: "P 42g · C 38g · F 18g" },
  { time: "Dinner", name: "Lentil soup, sautéed spinach, whole grain bread", kcal: "430 kcal", macros: "P 22g · C 58g · F 9g" },
];

interface DietPlannerTeaserProps {
  onPlanClick: () => void;
}

export default function DietPlannerTeaser({ onPlanClick }: DietPlannerTeaserProps) {
  return (
    <section className="section-gap" style={{ borderBottom: "1px solid #1a1a1a" }}>
      <div className="container-editorial">
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p className="label-upper" style={{ marginBottom: "1rem" }}>Diet &amp; Nutrition</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 className="display-md" style={{ color: "#fff", maxWidth: "460px" }}>
              Meals engineered for your diagnosis.
            </h2>
            <Link href="/diet-planner" className="btn-ghost btn-sm" style={{ whiteSpace: "nowrap" }}>
              Open planner <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Condition pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
          {conditions.map((c, i) => (
            <span
              key={c}
              className={i === 0 ? "chip active" : "chip"}
              style={{ cursor: "default" }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Meal rows */}
        <div>
          {meals.map((meal) => (
            <div
              key={meal.time}
              style={{
                display: "grid",
                gridTemplateColumns: "5rem 1fr auto",
                gap: "2rem",
                alignItems: "center",
                padding: "1.75rem 0",
                borderTop: "1px solid #1a1a1a",
              }}
            >
              <span className="label-upper">{meal.time}</span>
              <div>
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
                  {meal.name}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#505050" }}>{meal.macros}</p>
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#a0a0a0", whiteSpace: "nowrap" }}>
                {meal.kcal}
              </span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: "3rem" }}>
          <button onClick={onPlanClick} className="btn-primary" id="diet-teaser-cta">
            Generate my personalised plan
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
