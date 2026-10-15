"use client";

import React, { useState } from "react";
import Link from "next/link";
import { dietData, Meal } from "@/data/dietData";
import ConditionFilter from "@/components/diet/ConditionFilter";
import MealCards from "@/components/diet/MealCards";
import DietaryGuidelines from "@/components/diet/DietaryGuidelines";
import RecipeModal from "@/components/diet/RecipeModal";
import Footer from "@/components/Footer";
import {
  UtensilsCrossed,
  ArrowLeft,
  Sliders,
  CheckCircle2,
} from "lucide-react";

export default function DietPlannerPage() {
  const [selectedConditionId, setSelectedConditionId] = useState<string>("diabetes");
  const [calorieLevel, setCalorieLevel] = useState<"standard" | "deficit" | "surplus">("standard");
  const [selectedMealForRecipe, setSelectedMealForRecipe] = useState<Meal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeCondition = dietData[selectedConditionId] || dietData.diabetes;

  // Calorie multipliers
  const multiplierMap = {
    deficit: 0.85,
    standard: 1.0,
    surplus: 1.2,
  };

  const currentMultiplier = multiplierMap[calorieLevel];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-xl border-b border-slate-800/90 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <Link href="/" className="text-xs font-medium text-slate-400 hover:text-white hidden sm:block">
              Main Home
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Dietitian: Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/95 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Hero Section of Diet Planner */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0c1629] via-[#081020] to-[#050811] border border-cyan-500/20 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs text-emerald-300 font-semibold mb-4">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Disease-Based Precision Nutrition Studio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Clinical Diet &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Nutrition Architecture
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Personalized therapeutic meal engineering calibrated to target disease-specific
              biomarkers—down-regulating cellular inflammation, blunting glucose surges, and
              promoting arterial recovery.
            </p>

            {/* Calorie Goal Tuning Controls */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Calorie Intake Scale:
              </span>
              <div className="flex items-center gap-2 bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs">
                <button
                  onClick={() => {
                    setCalorieLevel("deficit");
                    showToast("Calorie target adjusted: Lean Deficit (-15%)");
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    calorieLevel === "deficit"
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Lean Deficit (-15%)
                </button>
                <button
                  onClick={() => {
                    setCalorieLevel("standard");
                    showToast("Calorie target adjusted: Maintenance (100%)");
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    calorieLevel === "standard"
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Maintenance (100%)
                </button>
                <button
                  onClick={() => {
                    setCalorieLevel("surplus");
                    showToast("Calorie target adjusted: Athletic Fuel (+20%)");
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    calorieLevel === "surplus"
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Athletic Fuel (+20%)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Condition Filter Selector */}
        <ConditionFilter
          conditions={dietData}
          selectedConditionId={selectedConditionId}
          onSelectCondition={(id) => setSelectedConditionId(id)}
        />

        {/* 2. Dynamic Meal Recommendation Cards for Breakfast, Lunch, Dinner */}
        <MealCards
          meals={activeCondition.meals}
          onSelectMealForRecipe={(meal) => setSelectedMealForRecipe(meal)}
          calorieMultiplier={currentMultiplier}
        />

        {/* 3. Food Restrictions and Recommendations for Selected Condition */}
        <DietaryGuidelines
          conditionName={activeCondition.name}
          recommendedFoods={activeCondition.recommendedFoods}
          restrictedFoods={activeCondition.restrictedFoods}
          clinicalTips={activeCondition.clinicalTips}
        />
      </main>

      {/* Recipe Modal */}
      <RecipeModal
        meal={selectedMealForRecipe}
        onClose={() => setSelectedMealForRecipe(null)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
