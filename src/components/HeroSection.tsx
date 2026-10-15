"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart,
  Zap,
  Stethoscope,
  Utensils,
  CheckCircle2,
  Play,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
  Thermometer,
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
}

export default function HeroSection({
  onGetStarted,
  onExploreFeatures,
}: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"vitals" | "triage" | "diet">("vitals");
  const [simulatedHeartRate, setSimulatedHeartRate] = useState(72);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateHealthScan = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedHeartRate((prev) => (prev === 72 ? 76 : 72));
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden radial-gradient-hero"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-cyan-900/40 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Next-Gen Intelligent Healthcare Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              AI-Powered Digital{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Healthcare Ecosystem
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal">
              Empowering proactive longevity with clinical-grade AI triage, personalized
              biometric nutrition plans, and instantaneous 24/7 telehealth connectivity with
              top certified physicians.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onGetStarted}
                id="hero-get-started-btn"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base group cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreFeatures}
                id="hero-explore-features-btn"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-850 hover:text-white border border-slate-700/80 hover:border-cyan-500/50 shadow-md backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2.5 text-base cursor-pointer"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Explore Ecosystem</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HIPAA & HITECH Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Board-Certified Physicians</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>99.4% Diagnostic Precision</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Glassmorphism Health Console */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Background Glow behind Console */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-indigo-600/20 rounded-3xl blur-2xl -z-10" />

            {/* Main Interactive Health Terminal */}
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 shadow-2xl relative border border-cyan-500/30">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                      AuraSync™ Live Patient Console
                    </h3>
                    <p className="text-xs text-slate-400">ID: #AH-9842 • Status: Monitored</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-900/90 rounded-lg p-1 border border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveTab("vitals")}
                    className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                      activeTab === "vitals"
                        ? "bg-cyan-500 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Vitals
                  </button>
                  <button
                    onClick={() => setActiveTab("triage")}
                    className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                      activeTab === "triage"
                        ? "bg-cyan-500 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    AI Triage
                  </button>
                  <button
                    onClick={() => setActiveTab("diet")}
                    className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                      activeTab === "diet"
                        ? "bg-cyan-500 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Diet Plan
                  </button>
                </div>
              </div>

              {/* Dynamic Content Views based on activeTab */}
              {activeTab === "vitals" && (
                <div className="mt-5 space-y-4">
                  {/* ECG Heart Rate Box */}
                  <div className="bg-[#0b1329]/80 rounded-2xl p-4 border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
                          <Heart className="w-4 h-4 fill-red-400 animate-pulse" />
                        </div>
                        <span className="text-xs font-medium text-slate-300">Continuous Cardiac Vitals</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Resting Rhythm
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">
                          {simulatedHealthRate(simulatedHeartRate)}
                        </span>
                        <span className="text-xs text-slate-400 ml-1.5">BPM</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">Oxygen Saturation</span>
                        <div className="text-sm font-bold text-cyan-300">99.2% SpO2</div>
                      </div>
                    </div>

                    {/* Animated ECG Waveform */}
                    <div className="mt-3 h-14 w-full bg-slate-950/60 rounded-xl overflow-hidden relative flex items-center px-2 border border-slate-800">
                      <svg
                        className="w-full h-10 text-cyan-400"
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
                      <div className="absolute right-3 top-2 text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">
                        ECG Sync: Active
                      </div>
                    </div>
                  </div>

                  {/* 3 Metric Cards Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400 font-medium">Blood Pressure</p>
                      <p className="text-base font-bold text-white mt-1">118/78</p>
                      <span className="text-[10px] text-emerald-400">Optimal</span>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400 font-medium">Temperature</p>
                      <p className="text-base font-bold text-white mt-1">98.6°F</p>
                      <span className="text-[10px] text-cyan-400">Normal</span>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400 font-medium">Sleep Score</p>
                      <p className="text-base font-bold text-white mt-1">94%</p>
                      <span className="text-[10px] text-indigo-400">Deep Stage</span>
                    </div>
                  </div>

                  {/* Quick Scan Action */}
                  <button
                    onClick={simulateHealthScan}
                    disabled={isSimulating}
                    id="simulate-scan-btn"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Activity className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                    <span>{isSimulating ? "Recalibrating Biometric Sensors..." : "Trigger Live Health Check"}</span>
                  </button>
                </div>
              )}

              {activeTab === "triage" && (
                <div className="mt-5 space-y-3 animate-in fade-in duration-200">
                  <div className="bg-cyan-950/40 rounded-2xl p-4 border border-cyan-500/30">
                    <div className="flex items-center gap-2 text-cyan-300 text-xs font-medium mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> Clinical AI Triage Model v4.2
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Patient Report: &quot;Mild morning fatigue &amp; post-workout tension&quot;
                    </p>
                    <div className="mt-3 p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Risk Stratification:</span>
                        <span className="text-emerald-400 font-semibold">Low (Tier 1)</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Recommended Action:</span>
                        <span className="text-cyan-300 font-medium">Hydration + Magnesium 300mg</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Escalate to Doctor Video Call</span>
                    </div>
                    <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">
                      Available (2 min wait)
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "diet" && (
                <div className="mt-5 space-y-3 animate-in fade-in duration-200">
                  <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-400 font-medium">Daily Metabolic Goal</span>
                      <span className="text-xs font-bold text-emerald-400">2,150 / 2,400 kcal</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full w-[88%]" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-950/60 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Protein</span>
                        <span className="text-cyan-300 font-bold">142g</span>
                      </div>
                      <div className="p-2 bg-slate-950/60 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Carbs</span>
                        <span className="text-amber-300 font-bold">190g</span>
                      </div>
                      <div className="p-2 bg-slate-950/60 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Healthy Fats</span>
                        <span className="text-emerald-300 font-bold">64g</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-white font-medium">Recommended Next Meal:</span>
                    </div>
                    <span className="text-cyan-300 font-medium">Wild Salmon &amp; Quinoa Salad</span>
                  </div>
                </div>
              )}

              {/* Floating Doctor Availability Pill */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center text-white text-xs font-bold">
                      SC
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Dr. Sarah Chen, MD</p>
                    <p className="text-[11px] text-slate-400">Cardiologist • 4.9★ (380+ reviews)</p>
                  </div>
                </div>
                <button
                  onClick={onGetStarted}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group cursor-pointer"
                >
                  <span>Connect</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Floating Trust Card Badge 1 */}
            <div className="hidden sm:flex items-center gap-3 p-3 rounded-2xl glass-panel absolute -bottom-6 -left-6 border border-emerald-500/30 shadow-xl animate-float">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">End-to-End Encrypted</p>
                <p className="text-[10px] text-slate-400">256-bit AES Patient Vault</p>
              </div>
            </div>

            {/* Floating Trust Card Badge 2 */}
            <div className="hidden sm:flex items-center gap-2.5 p-3 rounded-2xl glass-panel absolute -top-5 -right-5 border border-cyan-500/30 shadow-xl animate-float-delayed">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Continuous Sync</p>
                <p className="text-[10px] text-slate-400">Apple Health &amp; Garmin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function simulatedHealthRate(val: number) {
  return val;
}
