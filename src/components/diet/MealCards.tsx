"use client";

import React from "react";
import { Meal } from "@/data/dietData";
import { ArrowRight, Clock } from "lucide-react";

interface MealCardsProps {
  meals: Meal[];
  onSelectMealForRecipe: (meal: Meal) => void;
  calorieMultiplier?: number;
}

export default function MealCards({
  meals,
  onSelectMealForRecipe,
  calorieMultiplier = 1,
}: MealCardsProps) {
  const totalCalories = Math.round(
    meals.reduce((acc, m) => acc + m.calories * calorieMultiplier, 0)
  );
  const totalProtein = Math.round(
    meals.reduce((acc, m) => acc + m.protein * calorieMultiplier, 0)
  );
  const totalCarbs = Math.round(
    meals.reduce((acc, m) => acc + m.carbs * calorieMultiplier, 0)
  );
  const totalFats = Math.round(
    meals.reduce((acc, m) => acc + m.fats * calorieMultiplier, 0)
  );

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
            02 / Prescribed Daily Menus
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            Daily Architecture
          </h2>
        </div>

        {/* Total stats */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
          <div>
            <span className="label-upper" style={{ display: "block", marginBottom: "0.2rem" }}>
              Total Energy
            </span>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>
              {totalCalories}{" "}
              <span style={{ fontSize: "0.75rem", color: "#505050", fontWeight: 500 }}>
                kcal
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Meal Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {meals.map((meal) => {
          const scaledCalories = Math.round(meal.calories * calorieMultiplier);
          const scaledProtein = Math.round(meal.protein * calorieMultiplier);
          const scaledCarbs = Math.round(meal.carbs * calorieMultiplier);
          const scaledFats = Math.round(meal.fats * calorieMultiplier);

          const totalGrams = scaledProtein + scaledCarbs + scaledFats;
          const proteinPct = Math.round((scaledProtein / totalGrams) * 100);
          const carbsPct = Math.round((scaledCarbs / totalGrams) * 100);
          const fatsPct = Math.round((scaledFats / totalGrams) * 100);

          return (
            <div
              key={meal.id}
              style={{
                borderTop: "1px solid #1a1a1a",
                padding: "2.5rem 0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                alignItems: "start",
              }}
            >
              {/* Col 1: Type, Time, Title, Description */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#fff",
                    }}
                  >
                    {meal.type}
                  </span>
                  <span style={{ color: "#303030" }}>—</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#707070",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <Clock size={12} />
                    {meal.prepTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    lineHeight: 1.25,
                  }}
                >
                  {meal.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "#a0a0a0",
                    maxWidth: "520px",
                  }}
                >
                  {meal.description}
                </p>

                {/* Superfood Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {meal.superfoodTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: "0.6875rem",
                        color: "#707070",
                        letterSpacing: "0.04em",
                        borderBottom: "1px dotted #333",
                        paddingBottom: "1px",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Col 2: Nutrition breakdown & Recipe Trigger */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  height: "100%",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {scaledCalories}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "#505050", fontWeight: 600 }}>
                      kcal
                    </span>
                  </div>

                  {/* Micro split bar */}
                  <div
                    style={{
                      display: "flex",
                      height: "4px",
                      width: "100%",
                      maxWidth: "260px",
                      background: "#1a1a1a",
                      overflow: "hidden",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div style={{ width: `${proteinPct}%`, background: "#fff" }} />
                    <div style={{ width: `${carbsPct}%`, background: "#808080" }} />
                    <div style={{ width: `${fatsPct}%`, background: "#383838" }} />
                  </div>

                  {/* Macro details */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "#707070", display: "block" }}>Protein</span>
                      <span style={{ fontWeight: 700, color: "#fff" }}>{scaledProtein}g</span>
                    </div>
                    <div>
                      <span style={{ color: "#707070", display: "block" }}>Carbs</span>
                      <span style={{ fontWeight: 700, color: "#fff" }}>{scaledCarbs}g</span>
                    </div>
                    <div>
                      <span style={{ color: "#707070", display: "block" }}>Fats</span>
                      <span style={{ fontWeight: 700, color: "#fff" }}>{scaledFats}g</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onSelectMealForRecipe(meal)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
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
                    View Recipe & Prep <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Nutritional Balance Summary */}
      <div
        style={{
          borderTop: "1px solid #1a1a1a",
          paddingTop: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <span className="label-upper" style={{ display: "block", marginBottom: "0.25rem" }}>
            Cumulative Macronutrient Summary
          </span>
          <p style={{ fontSize: "0.8125rem", color: "#707070" }}>
            Calibrated for metabolic stabilization & glycemic control
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Protein
            </span>
            <span style={{ fontSize: "1.125rem", fontWeight: 800, color: "#fff" }}>
              {totalProtein}g
            </span>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Carbohydrates
            </span>
            <span style={{ fontSize: "1.125rem", fontWeight: 800, color: "#fff" }}>
              {totalCarbs}g
            </span>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Fats
            </span>
            <span style={{ fontSize: "1.125rem", fontWeight: 800, color: "#fff" }}>
              {totalFats}g
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
