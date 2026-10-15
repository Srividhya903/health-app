"use client";

import React from "react";
import { Meal } from "@/data/dietData";
import {
  Utensils,
  Clock,
  Flame,
  ChevronRight,
  Apple,
  Salad,
  Fish,
  ChefHat,
  Scale,
} from "lucide-react";

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
  // Compute daily totals
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

  const mealIcons: Record<string, React.ReactNode> = {
    Breakfast: <Apple className="w-5 h-5 text-amber-400" />,
    Lunch: <Salad className="w-5 h-5 text-emerald-400" />,
    Dinner: <Fish className="w-5 h-5 text-cyan-400" />,
  };

  const mealTypeColor: Record<string, string> = {
    Breakfast: "border-amber-500/30 text-amber-300 bg-amber-950/60",
    Lunch: "border-emerald-500/30 text-emerald-300 bg-emerald-950/60",
    Dinner: "border-cyan-500/30 text-cyan-300 bg-cyan-950/60",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Utensils className="w-5 h-5 text-cyan-400" />
            <span>2. Dynamic Daily Meal Recommendations</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated daily architecture for Breakfast, Lunch, and Dinner
          </p>
        </div>

        {/* Daily Total Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-300">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Daily Total:</span>
          <span className="font-bold text-white">{totalCalories} kcal</span>
        </div>
      </div>

      {/* Grid of Breakfast, Lunch, Dinner Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              className="glass-panel rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30"
            >
              <div>
                {/* Top Badge & Prep Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      {mealIcons[meal.type] || <Utensils className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        mealTypeColor[meal.type] || "border-slate-800 text-slate-300"
                      }`}
                    >
                      {meal.type}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {meal.prepTime}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {meal.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {meal.description}
                </p>

                {/* Calories Highlight */}
                <div className="mt-4 p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Total Energy:</span>
                    <div>
                      <span className="text-xl font-extrabold text-white">
                        {scaledCalories}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">kcal</span>
                    </div>
                  </div>

                  {/* Macro Progress Bar */}
                  <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5 bg-slate-900 mb-2.5">
                    <div
                      className="bg-cyan-400 h-full"
                      style={{ width: `${proteinPct}%` }}
                      title={`Protein: ${scaledProtein}g (${proteinPct}%)`}
                    />
                    <div
                      className="bg-amber-400 h-full"
                      style={{ width: `${carbsPct}%` }}
                      title={`Carbs: ${scaledCarbs}g (${carbsPct}%)`}
                    />
                    <div
                      className="bg-emerald-400 h-full"
                      style={{ width: `${fatsPct}%` }}
                      title={`Fats: ${scaledFats}g (${fatsPct}%)`}
                    />
                  </div>

                  {/* 3 Macro Pills */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                    <div className="p-1.5 bg-slate-900 rounded-lg">
                      <span className="text-[10px] text-cyan-400 block font-medium">Protein</span>
                      <span className="font-bold text-white">{scaledProtein}g</span>
                      <span className="text-[9px] text-slate-400 block">({proteinPct}%)</span>
                    </div>

                    <div className="p-1.5 bg-slate-900 rounded-lg">
                      <span className="text-[10px] text-amber-400 block font-medium">Carbs</span>
                      <span className="font-bold text-white">{scaledCarbs}g</span>
                      <span className="text-[9px] text-slate-400 block">({carbsPct}%)</span>
                    </div>

                    <div className="p-1.5 bg-slate-900 rounded-lg">
                      <span className="text-[10px] text-emerald-400 block font-medium">Fats</span>
                      <span className="font-bold text-white">{scaledFats}g</span>
                      <span className="text-[9px] text-slate-400 block">({fatsPct}%)</span>
                    </div>
                  </div>
                </div>

                {/* Superfood Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {meal.superfoodTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cyan-950/50 text-cyan-300 border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: View Full Recipe */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectMealForRecipe(meal)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 border border-slate-800 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ChefHat className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
                  <span>View Recipe &amp; Prep Steps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Nutritional Balance Summary Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Daily Macronutrient Totals</h4>
            <p className="text-xs text-slate-400">
              Balanced distribution engineered for metabolic stabilization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-center text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Calories</span>
            <span className="font-extrabold text-white text-sm">{totalCalories} kcal</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-cyan-400 block text-[10px]">Total Protein</span>
            <span className="font-extrabold text-cyan-300 text-sm">{totalProtein}g</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-amber-400 block text-[10px]">Total Carbs</span>
            <span className="font-extrabold text-amber-300 text-sm">{totalCarbs}g</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-emerald-400 block text-[10px]">Total Fats</span>
            <span className="font-extrabold text-emerald-300 text-sm">{totalFats}g</span>
          </div>
        </div>
      </div>
    </div>
  );
}
