"use client";

import React from "react";
import { HealthConditionDiet } from "@/data/dietData";
import {
  Activity,
  Heart,
  Sparkles,
  Droplet,
  Zap,
  Target,
} from "lucide-react";

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

  const iconMap: Record<string, React.ReactNode> = {
    diabetes: <Droplet className="w-4 h-4 text-cyan-400" />,
    pcos: <Sparkles className="w-4 h-4 text-purple-400" />,
    hearthealth: <Heart className="w-4 h-4 text-rose-400" />,
    fitness: <Zap className="w-4 h-4 text-amber-400" />,
  };

  return (
    <div className="space-y-6">
      {/* Selector Tabs */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          1. Select Health Condition &amp; Clinical Focus:
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.values(conditions).map((cond) => {
            const isSelected = cond.id === selectedConditionId;
            return (
              <button
                key={cond.id}
                onClick={() => onSelectCondition(cond.id)}
                id={`filter-${cond.id}`}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0b1426] border-cyan-400/80 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-400/50"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-xl border ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-500/40"
                        : "bg-slate-950 border-slate-800"
                    }`}
                  >
                    {iconMap[cond.id] || <Activity className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                        : "bg-slate-950 text-slate-400"
                    }`}
                  >
                    {cond.badge}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-sm font-bold leading-tight ${
                      isSelected ? "text-cyan-300" : "text-white"
                    }`}
                  >
                    {cond.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {cond.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Condition Clinical Overview Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                {activeCondition.clinicalTarget}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {activeCondition.name} Protocol
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeCondition.overview}
            </p>
          </div>

          {/* Macro Ratio Breakdown */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 lg:w-72 shrink-0">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-slate-300 uppercase tracking-wider text-[11px]">
                Target Macro Ratio
              </span>
              <span className="text-cyan-400">{activeCondition.baseCalories} kcal base</span>
            </div>

            {/* Split bar */}
            <div className="w-full h-3 rounded-full flex overflow-hidden gap-0.5 bg-slate-900 mb-3">
              <div
                className="bg-cyan-400 h-full transition-all duration-500"
                style={{ width: `${activeCondition.targetMacros.proteinPct}%` }}
                title={`Protein: ${activeCondition.targetMacros.proteinPct}%`}
              />
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${activeCondition.targetMacros.carbsPct}%` }}
                title={`Carbs: ${activeCondition.targetMacros.carbsPct}%`}
              />
              <div
                className="bg-emerald-400 h-full transition-all duration-500"
                style={{ width: `${activeCondition.targetMacros.fatsPct}%` }}
                title={`Fats: ${activeCondition.targetMacros.fatsPct}%`}
              />
            </div>

            <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
              <div>
                <span className="text-slate-400 block">Protein</span>
                <span className="font-bold text-cyan-300">
                  {activeCondition.targetMacros.proteinPct}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Carbs</span>
                <span className="font-bold text-amber-300">
                  {activeCondition.targetMacros.carbsPct}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Fats</span>
                <span className="font-bold text-emerald-300">
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
