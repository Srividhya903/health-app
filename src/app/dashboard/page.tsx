"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HealthScoreBanner from "@/components/dashboard/HealthScoreBanner";
import MetricCards from "@/components/dashboard/MetricCards";
import AIAssistantWidget from "@/components/dashboard/AIAssistantWidget";
import QuickScheduleAndMeds from "@/components/dashboard/QuickScheduleAndMeds";
import Footer from "@/components/Footer";
import {
  Activity,
  Calendar,
  X,
  CheckCircle2,
  Heart,
  Droplets,
  Scale,
} from "lucide-react";

export default function DashboardPage() {
  const [logVitalsModalOpen, setLogVitalsModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for manual vitals modal
  const [manualBP, setManualBP] = useState("118/78");
  const [manualGlucose, setManualGlucose] = useState("92");
  const [manualWeight, setManualWeight] = useState("64.2");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    setLogVitalsModalOpen(false);
    showToast("Manual vitals logged and synced to encrypted patient EHR!");
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Dashboard Top Header */}
      <DashboardHeader
        userName="Jane Doe"
        onRefreshData={() => showToast("IoT Biometric telemetry refreshed with Apple Watch & Oura.")}
      />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/95 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Welcome Greeting Banner with Health Score Summary */}
        <HealthScoreBanner
          userName="Jane"
          onLogVitals={() => setLogVitalsModalOpen(true)}
          onScheduleDoctor={() => setScheduleModalOpen(true)}
        />

        {/* 2. Interactive Visual Cards: Steps, Heart Rate, Sleep, Water */}
        <MetricCards />

        {/* 3. AI Health Assistant Chatbot Widget */}
        <section id="ai-health-assistant">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>AI Health Assistant &amp; Clinical Triage</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ask questions about your daily biomarkers, nutrition balance, or symptoms
            </p>
          </div>
          <AIAssistantWidget />
        </section>

        {/* 4. Upcoming Doctor Consultation & Daily Medications */}
        <QuickScheduleAndMeds />
      </main>

      {/* Manual Vitals Modal */}
      {logVitalsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#09101f] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setLogVitalsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Manual Vitals Entry</h3>
                <p className="text-xs text-slate-400">Sync with medical EHR record</p>
              </div>
            </div>

            <form onSubmit={handleSaveVitals} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Blood Pressure (Systolic / Diastolic)
                </label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={manualBP}
                    onChange={(e) => setManualBP(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Fasting Glucose (mg/dL)
                </label>
                <div className="relative">
                  <Droplets className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={manualGlucose}
                    onChange={(e) => setManualGlucose(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Body Weight (kg)
                </label>
                <div className="relative">
                  <Scale className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={manualWeight}
                    onChange={(e) => setManualWeight(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-lg shadow-cyan-500/25 transition-all text-sm cursor-pointer mt-2"
              >
                Save to Medical History
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Doctor Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#09101f] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setScheduleModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Book Specialist Session</h3>
                <p className="text-xs text-slate-400">Board-certified physician network</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-white">Dr. Sarah Chen, MD (Cardiologist)</p>
                <p className="text-[11px] text-cyan-400">Next Slot: Today at 4:30 PM</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-white">Dr. Alexander Patel, MD (Endocrine &amp; Diet)</p>
                <p className="text-[11px] text-cyan-400">Next Slot: Tomorrow at 10:00 AM</p>
              </div>

              <button
                onClick={() => {
                  setScheduleModalOpen(false);
                  showToast("Telehealth consultation booked successfully! Calendar invitation sent.");
                }}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-lg shadow-cyan-500/25 transition-all text-sm cursor-pointer mt-4"
              >
                Confirm Booking ($0 Copay)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
