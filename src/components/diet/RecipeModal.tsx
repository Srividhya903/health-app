"use client";

import React, { useState } from "react";
import { Meal } from "@/data/dietData";
import {
  X,
  Clock,
  CheckCircle2,
  Sparkles,
  ChefHat,
  Utensils,
  Copy,
  Printer,
} from "lucide-react";

interface RecipeModalProps {
  meal: Meal | null;
  onClose: () => void;
}

export default function RecipeModal({ meal, onClose }: RecipeModalProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!meal) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const copyIngredients = () => {
    navigator.clipboard.writeText(meal.ingredients.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#09101f] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Meal Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                {meal.type} Recipe
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> {meal.prepTime}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {meal.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {meal.description}
            </p>
          </div>
        </div>

        {/* Nutritional Pill Bar */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center mb-6">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Calories</span>
            <span className="text-base font-extrabold text-white">{meal.calories} kcal</span>
          </div>
          <div>
            <span className="text-[10px] text-cyan-400 block font-medium">Protein</span>
            <span className="text-base font-extrabold text-cyan-300">{meal.protein}g</span>
          </div>
          <div>
            <span className="text-[10px] text-amber-400 block font-medium">Carbohydrates</span>
            <span className="text-base font-extrabold text-amber-300">{meal.carbs}g</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-400 block font-medium">Healthy Fats</span>
            <span className="text-base font-extrabold text-emerald-300">{meal.fats}g</span>
          </div>
        </div>

        {/* Clinical Superfood Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {meal.superfoodTags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {tag}
            </span>
          ))}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
            Glycemic Index: {meal.glycemicIndex}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
            Fiber: {meal.fiber}g
          </span>
        </div>

        {/* Clinical Mechanism Box */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Clinical Biometric Impact
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {meal.clinicalBenefit}
          </p>
        </div>

        {/* Ingredients Checklist */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Ingredients List</span>
              <span className="text-xs font-normal text-slate-400">
                ({Object.values(checkedIngredients).filter(Boolean).length} / {meal.ingredients.length} in pantry)
              </span>
            </h4>
            <button
              onClick={copyIngredients}
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied!" : "Copy List"}</span>
            </button>
          </div>

          <div className="space-y-2">
            {meal.ingredients.map((ing, idx) => {
              const isChecked = checkedIngredients[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs sm:text-sm ${
                    isChecked
                      ? "bg-slate-900/60 border-slate-800 text-slate-400 line-through"
                      : "bg-slate-950/80 border-slate-800/80 text-slate-200 hover:border-cyan-500/40"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-400 text-white"
                        : "border-slate-600 bg-slate-900"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span>{ing}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preparation Instructions */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-cyan-400" />
            <span>Step-by-Step Preparation</span>
          </h4>
          <ol className="space-y-3">
            {meal.instructions.map((step, idx) => (
              <li
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
              >
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Recipe</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-md cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
