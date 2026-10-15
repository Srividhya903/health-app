"use client";

import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Activity,
  Heart,
  Moon,
  Droplets,
  Zap,
  Watch,
  FileText,
  Calendar,
} from "lucide-react";

interface HealthScoreBannerProps {
  userName?: string;
  onLogVitals?: () => void;
  onScheduleDoctor?: () => void;
}

export default function HealthScoreBanner({
  userName = "Jane",
  onLogVitals,
  onScheduleDoctor,
}: HealthScoreBannerProps) {
  const [activeSubMetric, setActiveSubMetric] = useState<string>("cardiac");

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c1527] via-[#09101f] to-[#070b16] border border-cyan-500/25 shadow-2xl shadow-cyan-950/40 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Greeting & Status */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs text-cyan-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Watch className="w-3.5 h-3.5" />
            <span>Apple Watch Synced • Real-Time Vitals Active</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Good day,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                {userName}
              </span>{" "}
              👋
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Your biometric markers are stable and optimal today. All 4 key physiological
              indices indicate strong cardiovascular resilience and low inflammation.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onLogVitals}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Log Manual Vitals</span>
            </button>
            <button
              onClick={onScheduleDoctor}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Telehealth Consult</span>
            </button>
            <button
              onClick={() => alert("Comprehensive clinical summary exported as encrypted PDF.")}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Export Health Report"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>

        {/* Right Column: Health Score Showcase Card */}
        <div className="lg:col-span-5">
          <div className="glass-panel-glow rounded-2xl p-5 sm:p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AuraHealth Composite Score
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <TrendingUp className="w-3 h-3" /> +4 pts this week
              </span>
            </div>

            {/* Score Big Display */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                    92
                  </span>
                  <span className="text-slate-400 font-bold text-base">/ 100</span>
                </div>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                  Optimal Condition (Top 5% Cohort)
                </p>
                <p className="text-[11px] text-slate-400">Biological Age: 2.4 yrs younger</p>
              </div>

              {/* Circular Gauge Graphic */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Gauge Arc (92%) */}
                  <path
                    className="text-cyan-400"
                    strokeDasharray="92, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                  <span className="text-[10px] font-bold text-slate-300">Grade A</span>
                </div>
              </div>
            </div>

            {/* 4 Pillars Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-4 gap-2 text-center">
              <div
                onClick={() => setActiveSubMetric("cardiac")}
                className={`p-2 rounded-xl cursor-pointer transition-all ${
                  activeSubMetric === "cardiac"
                    ? "bg-cyan-950/80 border border-cyan-500/40"
                    : "bg-slate-900/70 hover:bg-slate-850"
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-red-400 mx-auto" />
                <p className="text-[10px] text-slate-400 mt-1">Cardiac</p>
                <p className="text-xs font-bold text-white">95%</p>
              </div>

              <div
                onClick={() => setActiveSubMetric("metabolic")}
                className={`p-2 rounded-xl cursor-pointer transition-all ${
                  activeSubMetric === "metabolic"
                    ? "bg-cyan-950/80 border border-cyan-500/40"
                    : "bg-slate-900/70 hover:bg-slate-850"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 mx-auto" />
                <p className="text-[10px] text-slate-400 mt-1">Metabolic</p>
                <p className="text-xs font-bold text-white">89%</p>
              </div>

              <div
                onClick={() => setActiveSubMetric("sleep")}
                className={`p-2 rounded-xl cursor-pointer transition-all ${
                  activeSubMetric === "sleep"
                    ? "bg-cyan-950/80 border border-cyan-500/40"
                    : "bg-slate-900/70 hover:bg-slate-850"
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400 mx-auto" />
                <p className="text-[10px] text-slate-400 mt-1">Sleep</p>
                <p className="text-xs font-bold text-white">92%</p>
              </div>

              <div
                onClick={() => setActiveSubMetric("hydration")}
                className={`p-2 rounded-xl cursor-pointer transition-all ${
                  activeSubMetric === "hydration"
                    ? "bg-cyan-950/80 border border-cyan-500/40"
                    : "bg-slate-900/70 hover:bg-slate-850"
                }`}
              >
                <Droplets className="w-3.5 h-3.5 text-cyan-400 mx-auto" />
                <p className="text-[10px] text-slate-400 mt-1">Hydration</p>
                <p className="text-xs font-bold text-white">94%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
