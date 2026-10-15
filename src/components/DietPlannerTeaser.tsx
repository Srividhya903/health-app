"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Flame,
  Salad,
  Fish,
  Apple,
  Sparkles,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingDown,
  ShieldAlert,
} from "lucide-react";

type DietType = "mediterranean" | "keto" | "highprotein" | "hearthealthy";

interface MealPlan {
  breakfast: string;
  breakfastKcal: number;
  lunch: string;
  lunchKcal: number;
  dinner: string;
  dinnerKcal: number;
  snack: string;
  snackKcal: number;
  macros: { protein: number; carbs: number; fats: number };
  glycemicIndex: string;
  antiInflammatoryScore: number;
}

const dietPlans: Record<DietType, MealPlan> = {
  mediterranean: {
    breakfast: "Greek Yogurt with Sprouted Chia, Crushed Walnuts & Wild Berries",
    breakfastKcal: 420,
    lunch: "Wild Alaskan Salmon & Quinoa Bowl with Extra Virgin Olive Oil & Lemon",
    lunchKcal: 680,
    dinner: "Mediterranean Herb Chicken Breast, Roasted Bell Peppers & Couscous",
    dinnerKcal: 650,
    snack: "Handful of Raw Almonds, Kalamata Olives & Green Tea",
    snackKcal: 250,
    macros: { protein: 30, carbs: 45, fats: 25 },
    glycemicIndex: "Low (38)",
    antiInflammatoryScore: 98,
  },
  keto: {
    breakfast: "Organic Scrambled Eggs with Avocado, Spinach & Grass-Fed Ghee",
    breakfastKcal: 510,
    lunch: "Grass-Fed Ribeye Steak Salad with Hemp Hearts & Avocado Vinaigrette",
    lunchKcal: 780,
    dinner: "Wild Caught Halibut with Asparagus Sautéed in Garlic Butter",
    dinnerKcal: 580,
    snack: "Macadamia Nuts & Sea Salt Roasted Pumpkin Seeds",
    snackKcal: 230,
    macros: { protein: 25, carbs: 5, fats: 70 },
    glycemicIndex: "Very Low (15)",
    antiInflammatoryScore: 94,
  },
  highprotein: {
    breakfast: "Egg White & Turkey Bacon Scramble with Overnight Oats & Blueberries",
    breakfastKcal: 550,
    lunch: "Grilled Herb Chicken Breast (250g) with Sweet Potato & Steamed Broccoli",
    lunchKcal: 720,
    dinner: "Seared Wild Yellowfin Tuna Steak with Brown Rice & Edamame Salad",
    dinnerKcal: 670,
    snack: "Whey Isolate Protein Shake with Greek Yogurt & Chia Seeds",
    snackKcal: 280,
    macros: { protein: 45, carbs: 35, fats: 20 },
    glycemicIndex: "Moderate (42)",
    antiInflammatoryScore: 92,
  },
  hearthealthy: {
    breakfast: "Steel Cut Oatmeal with Ground Flaxseeds, Cinnamon & Sliced Pears",
    breakfastKcal: 430,
    lunch: "Lentil & Tuscan Bean Soup with Steamed Swiss Chard & Sourdough",
    lunchKcal: 620,
    dinner: "Baked Rainbow Trout with Lemon Thyme, Roasted Squash & Green Beans",
    dinnerKcal: 600,
    snack: "Fresh Pomegranate Seeds & Raw Pistachios",
    snackKcal: 210,
    macros: { protein: 25, carbs: 55, fats: 20 },
    glycemicIndex: "Low (35)",
    antiInflammatoryScore: 97,
  },
};

interface DietPlannerTeaserProps {
  onPlanClick?: () => void;
}

export default function DietPlannerTeaser({ onPlanClick }: DietPlannerTeaserProps) {
  const [selectedDiet, setSelectedDiet] = useState<DietType>("mediterranean");
  const [calorieTarget, setCalorieTarget] = useState<number>(2000);

  const plan = dietPlans[selectedDiet];
  const totalCalories =
    plan.breakfastKcal + plan.lunchKcal + plan.dinnerKcal + plan.snackKcal;

  return (
    <section id="diet-planner" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Background radial gradient */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>AI-Driven Biometric Nutrition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Personalized Meal Plans{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Tailored to Your DNA &amp; Vitals
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Harness metabolic AI that adapts daily calories, macros, and micro-nutrients based on
            your real-time glucose, heart-rate variability, and allergy profiles.
          </p>
        </div>

        {/* Interactive Diet Planner Studio */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-2xl">
          {/* Top Controls: Diet Archetype Buttons */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              1. Select Clinical Nutrition Protocol:
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: "mediterranean", label: "Mediterranean Longevity", desc: "Anti-aging & Cellular" },
                { id: "keto", label: "Ketogenic Metabolic", desc: "Low-carb fat burner" },
                { id: "highprotein", label: "High-Protein Athletic", desc: "Lean mass & recovery" },
                { id: "hearthealthy", label: "Cardio DASH Protocol", desc: "Arterial & BP control" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedDiet(item.id as DietType)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedDiet === item.id
                      ? "bg-emerald-950/70 border-emerald-400/80 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${
                      selectedDiet === item.id ? "text-emerald-300" : "text-white"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid: Calculated Macros & Meal Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Macro Wheel & Health Score */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Target Calorie Profile
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {totalCalories} kcal Total
                </span>
              </div>

              {/* Macro Bars */}
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      Protein ({plan.macros.protein}%)
                    </span>
                    <span className="text-cyan-300 font-bold">
                      {Math.round((totalCalories * (plan.macros.protein / 100)) / 4)}g
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plan.macros.protein}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Complex Carbs ({plan.macros.carbs}%)
                    </span>
                    <span className="text-amber-300 font-bold">
                      {Math.round((totalCalories * (plan.macros.carbs / 100)) / 4)}g
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plan.macros.carbs}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      Healthy Fats ({plan.macros.fats}%)
                    </span>
                    <span className="text-emerald-300 font-bold">
                      {Math.round((totalCalories * (plan.macros.fats / 100)) / 9)}g
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plan.macros.fats}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Biomarker Indicators */}
              <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400">Anti-Inflammatory Index</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">
                    {plan.antiInflammatoryScore}/100
                  </p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400">Glycemic Load</span>
                  <p className="text-lg font-bold text-cyan-400 mt-0.5">{plan.glycemicIndex}</p>
                </div>
              </div>

              {/* Smart Sync Note */}
              <div className="mt-5 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Adjusts automatically if continuous glucose monitor (CGM) spikes.</span>
              </div>
            </div>

            {/* Right 7 Cols: Generated Daily Menu Cards */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  2. Generated Daily Nutrition Architecture
                </span>
                <span className="text-xs text-cyan-400 font-medium">Chef &amp; Dietitian Formulated</span>
              </div>

              {/* Breakfast */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Breakfast
                      </span>
                      <span className="text-[11px] text-slate-500">• 08:30 AM</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">{plan.breakfast}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300 shrink-0">
                  {plan.breakfastKcal} kcal
                </span>
              </div>

              {/* Lunch */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <Salad className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Lunch (Peak Macro)
                      </span>
                      <span className="text-[11px] text-slate-500">• 01:00 PM</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">{plan.lunch}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300 shrink-0">
                  {plan.lunchKcal} kcal
                </span>
              </div>

              {/* Dinner */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                    <Fish className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        Dinner
                      </span>
                      <span className="text-[11px] text-slate-500">• 07:00 PM</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">{plan.dinner}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300 shrink-0">
                  {plan.dinnerKcal} kcal
                </span>
              </div>

              {/* Snack */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        Metabolic Boost Snack
                      </span>
                      <span className="text-[11px] text-slate-500">• 04:30 PM</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">{plan.snack}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300 shrink-0">
                  {plan.snackKcal} kcal
                </span>
              </div>

              {/* CTA button inside Diet Section */}
              <div className="pt-2">
                <Link
                  href="/diet-planner"
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build My Disease-Specific Nutrition Plan</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
