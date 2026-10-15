"use client";

import React, { useState } from "react";
import {
  Footprints,
  Heart,
  Moon,
  Droplets,
  Plus,
  Flame,
  Award,
  Activity,
  RotateCcw,
  Clock,
} from "lucide-react";

export default function MetricCards() {
  // 1. Steps state
  const [steps, setSteps] = useState(8432);
  const stepsGoal = 10000;
  const stepsPercent = Math.min(Math.round((steps / stepsGoal) * 100), 100);
  const distanceKm = (steps * 0.00078).toFixed(1);
  const caloriesBurned = Math.round(steps * 0.042);

  // 2. Heart rate state
  const [heartRate, setHeartRate] = useState(71);
  const [hrMode, setHrMode] = useState<"resting" | "active">("resting");

  // 4. Water state
  const [waterMl, setWaterMl] = useState(2250);
  const waterGoal = 3000;
  const waterPercent = Math.min(Math.round((waterMl / waterGoal) * 100), 100);

  // Handlers
  const addSteps = (count: number) => {
    setSteps((prev) => prev + count);
  };

  const toggleHeartRate = () => {
    if (hrMode === "resting") {
      setHrMode("active");
      setHeartRate(114);
    } else {
      setHrMode("resting");
      setHeartRate(71);
    }
  };

  const addWater = (amount: number) => {
    setWaterMl((prev) => Math.min(prev + amount, 4500));
  };

  const resetWater = () => {
    setWaterMl(0);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Today&apos;s Biometric &amp; Activity Tracking</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry updated via IoT sensor synchronization
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
          Live Sensor Stream
        </span>
      </div>

      {/* Grid of 4 Core Interactive Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CARD 1: DAILY STEPS TRACKER */}
        <div
          id="card-steps-tracker"
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Footprints className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {stepsPercent}% Goal
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Daily Steps
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">/ {stepsGoal.toLocaleString()}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${stepsPercent}%` }}
              />
            </div>

            {/* Sub-stats: Distance & Calories */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>{distanceKm} km walked</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{caloriesBurned} kcal burned</span>
              </div>
            </div>

            {/* Hourly Activity Bars (Mock representation) */}
            <div className="mt-4 pt-2">
              <p className="text-[10px] text-slate-500 mb-1.5 font-medium">Hourly Movement (8am - 8pm)</p>
              <div className="flex items-end gap-1 h-8">
                {[30, 45, 60, 85, 40, 70, 95, 80, 65, 50, 40, 20].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-cyan-500/30 hover:bg-cyan-400 rounded-t transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                    title={`Hour ${i + 8}:00 - ${h * 12} steps`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Increment Controls */}
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => addSteps(500)}
              id="steps-add-500"
              className="flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 500
            </button>
            <button
              onClick={() => addSteps(1000)}
              id="steps-add-1000"
              className="flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 1,000
            </button>
          </div>
        </div>

        {/* CARD 2: HEART RATE MONITOR */}
        <div
          id="card-heart-rate"
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Heart className="w-6 h-6 fill-red-400/30 animate-pulse group-hover:scale-110 transition-transform" />
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full border transition-all ${
                  hrMode === "resting"
                    ? "text-emerald-400 bg-emerald-950/80 border-emerald-500/30"
                    : "text-amber-400 bg-amber-950/80 border-amber-500/30"
                }`}
              >
                {hrMode === "resting" ? "Resting Rhythm" : "Aerobic Pulse"}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Heart Rate Monitor
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {heartRate}
              </span>
              <span className="text-xs text-slate-400">BPM</span>
            </div>

            {/* Animated ECG Waveform */}
            <div className="mt-3 h-14 w-full bg-slate-950/70 rounded-xl overflow-hidden relative flex items-center px-1 border border-slate-800">
              <svg
                className={`w-full h-9 ${hrMode === "resting" ? "text-cyan-400" : "text-red-400"}`}
                viewBox="0 0 500 50"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  className="animate-ecg"
                  d="M0,25 L100,25 L120,5 L135,45 L150,15 L165,35 L175,25 L250,25 L270,5 L285,45 L300,15 L315,35 L325,25 L400,25 L420,5 L435,45 L450,15 L465,35 L475,25 L500,25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Metrics: Resting vs Max + HRV */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
              <div className="text-slate-300">
                <span className="text-[10px] text-slate-500 block">Resting Baseline</span>
                <span className="font-semibold text-white">62 BPM</span>
              </div>
              <div className="text-slate-300">
                <span className="text-[10px] text-slate-500 block">HRV Recovery</span>
                <span className="font-semibold text-emerald-400">58 ms (High)</span>
              </div>
            </div>
          </div>

          {/* Toggle resting vs workout pulse simulation */}
          <div className="mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={toggleHeartRate}
              id="heart-rate-toggle"
              className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-red-500/40 text-red-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span>{hrMode === "resting" ? "Simulate Cardio Spike (114)" : "Return to Resting (71)"}</span>
            </button>
          </div>
        </div>

        {/* CARD 3: SLEEP DURATION */}
        <div
          id="card-sleep-duration"
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Moon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/30">
                92% Quality
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sleep Duration
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                7h 48m
              </span>
              <span className="text-xs text-slate-400">/ 8h 00m</span>
            </div>

            {/* Segmented Sleep Stage Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Sleep Architecture</span>
                <span className="text-indigo-300 font-medium">Optimal REM</span>
              </div>
              <div className="w-full h-3 rounded-full flex overflow-hidden gap-0.5 bg-slate-900">
                <div className="bg-indigo-600 h-full w-[22%]" title="Deep Sleep: 1h 45m (22%)" />
                <div className="bg-indigo-400 h-full w-[28%]" title="REM Sleep: 2h 10m (28%)" />
                <div className="bg-sky-500/60 h-full w-[45%]" title="Light Sleep: 3h 30m (45%)" />
                <div className="bg-slate-700 h-full w-[5%]" title="Awake: 23m (5%)" />
              </div>
            </div>

            {/* Stage Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Deep: 1h 45m</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>REM: 2h 10m</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-sky-500/60" />
                <span>Light: 3h 30m</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span>Awake: 23m</span>
              </div>
            </div>
          </div>

          {/* Time window status */}
          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              11:15 PM - 07:03 AM
            </span>
            <span className="text-emerald-400 font-semibold">Consistent</span>
          </div>
        </div>

        {/* CARD 4: WATER INTAKE */}
        <div
          id="card-water-intake"
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Droplets className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                {waterPercent}% Logged
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Water Intake
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {waterMl.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">/ {waterGoal.toLocaleString()} ml</span>
            </div>

            {/* Dynamic Water Wave Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${waterPercent}%` }}
              />
            </div>

            {/* Glass cups indicators (8 cups goal) */}
            <div className="mt-4 pt-2">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                <span>Glasses Completed</span>
                <span className="text-cyan-300 font-medium">
                  {Math.floor(waterMl / 250)} / 12 cups
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const filled = waterMl >= (idx + 1) * 375;
                  return (
                    <div
                      key={idx}
                      onClick={() => addWater(250)}
                      className={`flex-1 h-5 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
                        filled
                          ? "bg-cyan-500/80 border-cyan-400 shadow-sm shadow-cyan-500/30"
                          : "bg-slate-900 border-slate-800 hover:border-cyan-500/50"
                      }`}
                      title={`Cup ${idx + 1}: Click to log +250ml`}
                    >
                      <Droplets className={`w-2.5 h-2.5 ${filled ? "text-white" : "text-slate-600"}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action buttons: +250ml, +500ml, reset */}
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => addWater(250)}
              id="water-add-250"
              className="flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 250ml
            </button>
            <button
              onClick={() => addWater(500)}
              id="water-add-500"
              className="flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 500ml
            </button>
            <button
              onClick={resetWater}
              id="water-reset"
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-300 transition-all cursor-pointer"
              title="Reset water intake"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
