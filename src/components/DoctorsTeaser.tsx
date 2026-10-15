"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

interface Doctor {
  name: string;
  specialty: string;
  rating: string;
  reviews: number;
  location: string;
  fee: string;
}

const doctors: Doctor[] = [
  { name: "Dr. Sarah Chen", specialty: "Cardiologist", rating: "4.9", reviews: 312, location: "Boston, MA", fee: "$180" },
  { name: "Dr. Aisha Patel", specialty: "Clinical Dietitian", rating: "4.8", reviews: 204, location: "Online", fee: "$95" },
  { name: "Dr. Marcus Webb", specialty: "Psychologist", rating: "4.7", reviews: 178, location: "New York, NY", fee: "$160" },
];

interface DoctorsTeaserProps {
  onBookDoctor: (name: string) => void;
}

export default function DoctorsTeaser({ onBookDoctor }: DoctorsTeaserProps) {
  return (
    <section className="section-gap" style={{ borderBottom: "1px solid #1a1a1a" }}>
      <div className="container-editorial">
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p className="label-upper" style={{ marginBottom: "1rem" }}>Specialist Network</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 className="display-md" style={{ color: "#fff", maxWidth: "440px" }}>
              Board-certified specialists, on demand.
            </h2>
            <Link href="/doctors" className="btn-ghost btn-sm" style={{ whiteSpace: "nowrap" }}>
              Browse all <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Doctor rows */}
        <div>
          {doctors.map((doc) => (
            <div
              key={doc.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: "2rem",
                alignItems: "center",
                padding: "2rem 0",
                borderTop: "1px solid #1a1a1a",
              }}
              className="doctor-row"
            >
              <div>
                <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                  {doc.name}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <span className="body-sm">{doc.specialty}</span>
                  <span className="body-sm">{doc.location}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "#a0a0a0" }}>
                    <Star size={11} />
                    {doc.rating} <span style={{ color: "#505050" }}>({doc.reviews})</span>
                  </span>
                </div>
              </div>

              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#a0a0a0", whiteSpace: "nowrap" }}>
                {doc.fee}
              </span>

              <button
                onClick={() => onBookDoctor(doc.name)}
                className="btn-ghost btn-sm"
                style={{ whiteSpace: "nowrap" }}
              >
                Book
              </button>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .doctor-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
