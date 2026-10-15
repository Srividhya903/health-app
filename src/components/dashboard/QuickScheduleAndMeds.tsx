"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Pill,
  Plus,
} from "lucide-react";

export default function QuickScheduleAndMeds() {
  const [meds, setMeds] = useState([
    { id: 1, name: "Omega-3 Wild Fish Oil (EPA/DHA)", dose: "1,000 mg", time: "08:30 AM", taken: true },
    { id: 2, name: "Vitamin D3 + K2 (Liposomal)", dose: "5,000 IU", time: "08:30 AM", taken: true },
    { id: 3, name: "Magnesium Glycinate (Chelated)", dose: "300 mg", time: "09:00 PM", taken: false },
    { id: 4, name: "CoQ10 Ubiquinol", dose: "100 mg", time: "01:00 PM", taken: false },
  ]);

  const toggleMed = (id: number) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 6 cols: Upcoming Doctor Consultation */}
      <div className="lg:col-span-6 glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Upcoming Telehealth Session
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Confirmed
            </span>
          </div>

          <div className="mt-4 flex items-start gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                SC
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>

            <div className="flex-1">
              <h4 className="text-base font-bold text-white">Dr. Sarah Chen, MD</h4>
              <p className="text-xs text-cyan-400 font-medium">Chief of Preventative Cardiology</p>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Today at 2:15 PM (in 1h 45m) • 25 min follow-up
              </p>
            </div>
          </div>

          {/* AI Pre-Brief Pill */}
          <div className="mt-4 p-3 rounded-2xl bg-[#091124] border border-cyan-500/20 text-xs text-slate-300">
            <p className="font-semibold text-cyan-300 text-[11px] uppercase tracking-wide">
              AI Clinical Brief Ready:
            </p>
            <p className="mt-1 text-slate-400 text-[11px]">
              Summary of 7-day HRV, resting BP (118/78), and 8,432 steps pre-loaded for Dr. Chen.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={() => alert("Connecting to 256-bit encrypted Telehealth Room...")}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Join HD Video Room</span>
          </button>
          <button
            onClick={() => alert("Reschedule requested.")}
            className="py-2.5 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
          >
            Reschedule
          </button>
        </div>
      </div>

      {/* Right 6 cols: Daily Medication & Supplement Schedule */}
      <div className="lg:col-span-6 glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-amber-400" />
              Medications &amp; Longevity Stack
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              {meds.filter((m) => m.taken).length} / {meds.length} Taken
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {meds.map((med) => (
              <div
                key={med.id}
                onClick={() => toggleMed(med.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  med.taken
                    ? "bg-slate-900/60 border-slate-800/80 opacity-75"
                    : "bg-[#0c1424] border-cyan-500/30 hover:border-cyan-400/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                      med.taken
                        ? "bg-emerald-500 text-white border-emerald-400"
                        : "bg-slate-950 border-slate-700 text-transparent hover:border-cyan-400"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        med.taken ? "line-through text-slate-400" : "text-white"
                      }`}
                    >
                      {med.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {med.dose} • Scheduled: {med.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    med.taken
                      ? "text-emerald-400 bg-emerald-950/60"
                      : "text-amber-300 bg-amber-950/60"
                  }`}
                >
                  {med.taken ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with Digital Pharmacy auto-refill</span>
          <button
            onClick={() => alert("Add supplement modal.")}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}
