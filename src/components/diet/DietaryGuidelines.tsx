"use client";

import React, { useState } from "react";
import { FoodGuideline } from "@/data/dietData";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lightbulb,
  Download,
  Check,
} from "lucide-react";

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
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>3. Clinical Food Guidelines &amp; Restrictions</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evidence-based nutritional boundary conditions specifically for {conditionName}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-2 w-fit cursor-pointer"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Guidelines Exported</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Grocery Cheat Sheet</span>
            </>
          )}
        </button>
      </div>

      {/* Two Column Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: FOODS TO EMBRACE */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Column Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Foods to Prioritize</h4>
                <p className="text-xs text-emerald-400 font-medium">Clinical Superfoods</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              {recommendedFoods.length} Essential Groups
            </span>
          </div>

          {/* List of recommended items */}
          <div className="space-y-3">
            {recommendedFoods.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-3"
              >
                <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-white">{item.food}</p>
                    <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.benefitOrHarm}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: FOODS TO RESTRICT / AVOID */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-rose-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Column Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Foods to Restrict / Avoid</h4>
                <p className="text-xs text-rose-400 font-medium">Inflammatory Triggers</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30">
              {restrictedFoods.length} Red Flags
            </span>
          </div>

          {/* List of restricted items */}
          <div className="space-y-3">
            {restrictedFoods.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-rose-500/40 transition-all flex items-start gap-3"
              >
                <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                  <XCircle className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-white">{item.food}</p>
                    <span className="text-[10px] text-rose-300 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/20 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.benefitOrHarm}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Pearls & Meal Timing Recommendations */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Clinical Practitioner Habits &amp; Timing Rules
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {clinicalTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
