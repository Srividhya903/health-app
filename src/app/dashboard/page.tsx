"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2, X, Activity, Droplets, Scale, Heart, RefreshCw } from "lucide-react";
import MetricCards from "@/components/dashboard/MetricCards";
import AIAssistantWidget from "@/components/dashboard/AIAssistantWidget";
import QuickScheduleAndMeds from "@/components/dashboard/QuickScheduleAndMeds";

export default function DashboardPage() {
  const [logVitalsModalOpen, setLogVitalsModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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
    showToast("Vitals logged and synced to encrypted EHR.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Sub-nav */}
      <header style={{ borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "#000", zIndex: 40 }}>
        <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", color: "#707070", textDecoration: "none", fontWeight: 500 }} className="link-underline">
            <ArrowLeft size={14} /> Home
          </Link>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#505050" }}>
            Dashboard
          </span>
          <button
            onClick={() => showToast("Biometrics refreshed from Apple Watch.")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#505050", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem" }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </header>

      {/* Toast */}
      {toastMessage && (
        <div className="toast-mono">
          <CheckCircle2 size={16} />
          {toastMessage}
        </div>
      )}

      <main style={{ flex: 1 }}>
        {/* Welcome hero */}
        <div style={{ borderBottom: "1px solid #1a1a1a", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="container-editorial">
            <p className="label-upper" style={{ marginBottom: "1rem" }}>Good morning</p>
            <h1 className="display-lg" style={{ color: "#fff", marginBottom: "1.5rem" }}>
              Jane.
            </h1>
            {/* Health score inline */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "flex-end" }}>
              <div>
                <p className="label-upper" style={{ marginBottom: "0.5rem" }}>Health score</p>
                <p style={{ fontSize: "4rem", fontWeight: 900, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1 }}>
                  87<span style={{ fontSize: "1.5rem", color: "#505050" }}>/100</span>
                </p>
              </div>
              <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                {[
                  { label: "Trend", value: "↑ +3 pts this week" },
                  { label: "BMI", value: "22.4 · Normal" },
                  { label: "Last sync", value: "Just now" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="label-upper" style={{ marginBottom: "0.25rem" }}>{s.label}</p>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#a0a0a0" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem" }}>
              <button onClick={() => setLogVitalsModalOpen(true)} className="btn-primary btn-sm">
                Log vitals
              </button>
              <button onClick={() => setScheduleModalOpen(true)} className="btn-ghost btn-sm">
                Book doctor
              </button>
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }}>
          <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            <p className="label-upper" style={{ marginBottom: "2.5rem" }}>Today&apos;s biometrics</p>
            <MetricCards />
          </div>
        </div>

        {/* AI Assistant */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }}>
          <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>AI Health Assistant</p>
            <p className="body-sm" style={{ marginBottom: "2.5rem" }}>
              Ask about biomarkers, nutrition, or symptoms — clinically validated responses only.
            </p>
            <AIAssistantWidget />
          </div>
        </div>

        {/* Schedule & meds */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }}>
          <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            <QuickScheduleAndMeds />
          </div>
        </div>
      </main>

      {/* Log Vitals Modal */}
      {logVitalsModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setLogVitalsModalOpen(false); }}>
          <div className="modal-panel" style={{ position: "relative" }}>
            <button onClick={() => setLogVitalsModalOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}><X size={20} /></button>
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>Manual entry</p>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "2rem", letterSpacing: "-0.025em" }}>Log vitals</h2>
            <form onSubmit={handleSaveVitals} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {[
                { label: "Blood Pressure (mmHg)", value: manualBP, set: setManualBP, placeholder: "120/80", icon: <Heart size={14} /> },
                { label: "Fasting Glucose (mg/dL)", value: manualGlucose, set: setManualGlucose, placeholder: "90", icon: <Droplets size={14} /> },
                { label: "Body Weight (kg)", value: manualWeight, set: setManualWeight, placeholder: "65.0", icon: <Scale size={14} /> },
              ].map((field) => (
                <div key={field.label}>
                  <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>{field.label}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", color: "#505050" }}>{field.icon}</span>
                    <input
                      type="text"
                      className="input-editorial"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      style={{ paddingLeft: "1.5rem" }}
                    />
                  </div>
                </div>
              ))}
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Save to medical history
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setScheduleModalOpen(false); }}>
          <div className="modal-panel" style={{ position: "relative" }}>
            <button onClick={() => setScheduleModalOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}><X size={20} /></button>
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>Quick book</p>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "2rem", letterSpacing: "-0.025em" }}>Select a specialist</h2>
            {[
              { name: "Dr. Sarah Chen, MD", spec: "Cardiologist", slot: "Today at 4:30 PM" },
              { name: "Dr. Alexander Patel, MD", spec: "Endocrinologist", slot: "Tomorrow at 10:00 AM" },
            ].map((doc) => (
              <div key={doc.name} style={{ padding: "1.25rem 0", borderTop: "1px solid #1a1a1a" }}>
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>{doc.name}</p>
                <p className="body-sm">{doc.spec} · {doc.slot}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
              <button
                onClick={() => { setScheduleModalOpen(false); showToast("Consultation booked. Calendar invite sent."); }}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Confirm booking ($0 copay)
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
