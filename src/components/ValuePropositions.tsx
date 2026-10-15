"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  UtensilsCrossed,
  Stethoscope,
  Watch,
  ShieldCheck,
  Pill,
  ArrowUpRight,
  CheckCircle,
  Sparkles,
  Zap,
} from "lucide-react";

interface ValueCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  description: string;
  gradient: string;
  iconColor: string;
  iconBg: string;
  metrics: string;
  features: string[];
}

export default function ValuePropositions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const valueProps: ValueCard[] = [
    {
      id: "val-ai-diagnostics",
      icon: BrainCircuit,
      title: "Clinical AI Diagnostics",
      badge: "Clinical Intelligence",
      description:
        "Trained on over 40 million peer-reviewed medical cases to provide instant, sub-second differential symptom assessments and triage before your doctor visit.",
      gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10 border-cyan-500/30",
      metrics: "99.4% Accuracy",
      features: [
        "Sub-second symptom triage",
        "Predictive biomarker trend analysis",
        "Clinical triage safety red-flagging",
      ],
    },
    {
      id: "val-diet-planner",
      icon: UtensilsCrossed,
      title: "Biometric Diet & Nutrition",
      badge: "Precision Nutrition",
      description:
        "Dynamic meal architectures mapped precisely to your insulin sensitivity, lipid panel, activity levels, allergies, and cellular longevity goals.",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      metrics: "Adaptive Macros",
      features: [
        "Real-time glycemic index balancing",
        "Automated smart grocery list builder",
        "Micronutrient deficiency prevention",
      ],
    },
    {
      id: "val-telehealth",
      icon: Stethoscope,
      title: "Verified Specialist Telehealth",
      badge: "24/7 Virtual Care",
      description:
        "Connect with top tier US/EU board-certified doctors in under 3 minutes via secure, high-definition encrypted video appointments anytime, anywhere.",
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/30",
      metrics: "< 3 Min Wait Time",
      features: [
        "Cardiology, Endocrine & Primary Care",
        "Same-day consultation guarantees",
        "Instant clinical visit summaries",
      ],
    },
    {
      id: "val-wearables",
      icon: Watch,
      title: "Continuous Wearable & IoT Sync",
      badge: "Autonomous Telemetry",
      description:
        "Syncs smoothly with Apple Health, Oura, Whoop, and Dexcom CGM sensors to detect arrhythmia, sleep anomalies, and metabolic dips in real-time.",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/30",
      metrics: "50+ Devices Supported",
      features: [
        "Automated passive vitals ingestion",
        "Early warning illness detection",
        "Deep HRV and sleep architecture",
      ],
    },
    {
      id: "val-security",
      icon: ShieldCheck,
      title: "Bank-Grade Privacy & Vault",
      badge: "Zero-Knowledge Data",
      description:
        "Your clinical records belong exclusively to you. Built on zero-knowledge encryption architecture exceeding rigorous HIPAA, GDPR, and ISO-27799 benchmarks.",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/30",
      metrics: "256-Bit Quantum Safe",
      features: [
        "Granular patient data access control",
        "Never sold to insurers or third-parties",
        "Immutable clinical audit trail",
      ],
    },
    {
      id: "val-pharmacy",
      icon: Pill,
      title: "Smart Rx & Pharmacy Delivery",
      badge: "Instant Fulfillment",
      description:
        "Prescriptions formulated during consultations are instantly dispatched to partner local pharmacies for 2-hour doorstep delivery and auto-refill monitoring.",
      gradient: "from-rose-500/20 via-red-500/10 to-transparent",
      iconColor: "text-rose-400",
      iconBg: "bg-rose-500/10 border-rose-500/30",
      metrics: "2-Hour Delivery",
      features: [
        "Digital e-prescriptions dispatch",
        "Drug interaction safety verification",
        "Smart refill notifications & sync",
      ],
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative radial-gradient-cards">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Value Propositions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive Healthcare,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Reinvented by Intelligence
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminating fragmented medical systems with an integrated, intelligent platform
            designed around proactive wellness, rapid specialist access, and precision biometrics.
          </p>
        </div>

        {/* 6 Grid Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {valueProps.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={card.id}
                id={card.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative rounded-3xl p-7 transition-all duration-300 border flex flex-col justify-between group overflow-hidden ${
                  isHovered
                    ? "bg-[#0c1322] border-cyan-500/40 shadow-2xl shadow-cyan-950/40 -translate-y-1.5"
                    : "bg-[#090e1a]/80 border-slate-800/90 hover:border-slate-700"
                }`}
              >
                {/* Glow behind card */}
                <div
                  className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${card.gradient} rounded-full blur-2xl pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-30"
                  }`}
                />

                <div>
                  {/* Top Header inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${card.iconBg}`}
                    >
                      <Icon className={`w-7 h-7 ${card.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-slate-800">
                      {card.metrics}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="text-xs font-semibold text-cyan-400 tracking-wide uppercase">
                    {card.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mt-1 mb-3 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>
                </div>

                <div>
                  {/* Sub-feature checklist */}
                  <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                    {card.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Action Link */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">
                    <span>Explore Capability</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ecosystem High-Impact Metrics Strip */}
        <div className="mt-16 sm:mt-20 glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800/80 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">99.4%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Clinical Diagnostic Accuracy
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400">&lt; 3 Min</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Average Doctor Connect Time
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">500,000+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Active Patients Monitored
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-400">1,200+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Board-Certified Specialists
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
