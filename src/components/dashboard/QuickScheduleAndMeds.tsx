"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const appointments = [
  { doctor: "Dr. Sarah Chen, MD", specialty: "Cardiologist", time: "Today, 4:30 PM", mode: "Online" },
  { doctor: "Dr. Alexander Patel, MD", specialty: "Endocrinologist", time: "Thu 17 Oct, 10:00 AM", mode: "In-Clinic" },
];

const medications = [
  { name: "Metformin 500mg", frequency: "Twice daily with meals", taken: true },
  { name: "Vitamin D3 2000 IU", frequency: "Once daily, morning", taken: true },
  { name: "Omega-3 1000mg", frequency: "Once daily, evening", taken: false },
];

export default function QuickScheduleAndMeds() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="schedule-grid">
      {/* Appointments */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
          <p className="label-upper">Upcoming appointments</p>
          <Link href="/doctors" className="link-underline" style={{ fontSize: "0.75rem", color: "#505050", textDecoration: "none" }}>
            View all →
          </Link>
        </div>
        <div>
          {appointments.map((a, i) => (
            <div key={i} style={{ padding: "1.25rem 0", borderTop: "1px solid #1a1a1a" }}>
              <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>{a.doctor}</p>
              <p className="body-sm">{a.specialty}</p>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#a0a0a0" }}>{a.time}</span>
                <span style={{ fontSize: "0.75rem", color: "#505050" }}>{a.mode}</span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>
      </div>

      {/* Medications */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
          <p className="label-upper">Medications today</p>
          <span style={{ fontSize: "0.75rem", color: "#505050" }}>2 of 3 taken</span>
        </div>
        <div>
          {medications.map((med) => (
            <div key={med.name} style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem 0", borderTop: "1px solid #1a1a1a" }}>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  border: `1px solid ${med.taken ? "#fff" : "#303030"}`,
                  background: med.taken ? "#fff" : "transparent",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: med.taken ? "#a0a0a0" : "#fff", textDecoration: med.taken ? "line-through" : "none" }}>
                  {med.name}
                </p>
                <p className="body-sm">{med.frequency}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .schedule-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
