"use client";

import React, { useState } from "react";
import Link from "next/link";
import { dietData, Meal } from "@/data/dietData";
import ConditionFilter from "@/components/diet/ConditionFilter";
import MealCards from "@/components/diet/MealCards";
import DietaryGuidelines from "@/components/diet/DietaryGuidelines";
import RecipeModal from "@/components/diet/RecipeModal";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function DietPlannerPage() {
  const [selectedConditionId, setSelectedConditionId] = useState("diabetes");
  const [calorieLevel, setCalorieLevel] = useState<"standard" | "deficit" | "surplus">("standard");
  const [selectedMealForRecipe, setSelectedMealForRecipe] = useState<Meal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeCondition = dietData[selectedConditionId] || dietData.diabetes;
  const multiplierMap = { deficit: 0.85, standard: 1.0, surplus: 1.2 };
  const currentMultiplier = multiplierMap[calorieLevel];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Sub-nav */}
      <header style={{ borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "#000", zIndex: 40 }}>
        <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", color: "#707070", textDecoration: "none", fontWeight: 500 }} className="link-underline">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#505050" }}>
            Nutrition Planner
          </span>
          <Link href="/" style={{ fontSize: "0.8125rem", color: "#707070", textDecoration: "none" }} className="link-underline">
            Home
          </Link>
        </div>
      </header>

      {toastMessage && (
        <div className="toast-mono">
          <CheckCircle2 size={16} /> {toastMessage}
        </div>
      )}

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <div style={{ borderBottom: "1px solid #1a1a1a", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container-editorial">
            <p className="label-upper" style={{ marginBottom: "1.5rem" }}>Precision Nutrition</p>
            <h1 className="display-lg" style={{ color: "#fff", maxWidth: "700px", marginBottom: "1.5rem" }}>
              Meals for your<br />
              <span style={{ color: "#505050" }}>diagnosis.</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: "480px", marginBottom: "3rem" }}>
              Therapeutic nutrition calibrated to your condition — updated as your biomarkers evolve.
            </p>

            {/* Calorie toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span className="label-upper" style={{ marginRight: "0.5rem" }}>Calorie target:</span>
              {([
                { key: "deficit", label: "Deficit −15%" },
                { key: "standard", label: "Maintenance" },
                { key: "surplus", label: "Surplus +20%" },
              ] as { key: "deficit" | "standard" | "surplus"; label: string }[]).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setCalorieLevel(opt.key); showToast(`Calorie target: ${opt.label}`); }}
                  className={`chip${calorieLevel === opt.key ? " active" : ""}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Condition filter */}
        <div style={{ borderBottom: "1px solid #1a1a1a", padding: "2.5rem 0" }}>
          <div className="container-editorial">
            <ConditionFilter
              conditions={dietData}
              selectedConditionId={selectedConditionId}
              onSelectCondition={setSelectedConditionId}
            />
          </div>
        </div>

        {/* Meal cards */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }}>
          <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            <MealCards
              meals={activeCondition.meals}
              onSelectMealForRecipe={setSelectedMealForRecipe}
              calorieMultiplier={currentMultiplier}
            />
          </div>
        </div>

        {/* Dietary guidelines */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }}>
          <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            <DietaryGuidelines
              conditionName={activeCondition.name}
              recommendedFoods={activeCondition.recommendedFoods}
              restrictedFoods={activeCondition.restrictedFoods}
              clinicalTips={activeCondition.clinicalTips}
            />
          </div>
        </div>
      </main>

      <RecipeModal meal={selectedMealForRecipe} onClose={() => setSelectedMealForRecipe(null)} />
      <Footer />
    </div>
  );
}
