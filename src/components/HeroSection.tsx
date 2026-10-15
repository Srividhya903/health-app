"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
}

export default function HeroSection({ onGetStarted, onExploreFeatures }: HeroSectionProps) {
  return (
    <section style={{ paddingTop: "7rem", paddingBottom: "7rem", borderBottom: "1px solid #1a1a1a" }}>
      <div className="container-editorial">
        {/* Kicker label */}
        <p className="label-upper" style={{ marginBottom: "2rem" }}>
          AI-Powered Digital Healthcare Ecosystem
        </p>

        {/* Oversized headline */}
        <h1
          className="display-xl"
          style={{ color: "#fff", maxWidth: "900px", marginBottom: "2.5rem" }}
        >
          Your health,<br />
          <span style={{ color: "#505050" }}>understood.</span>
        </h1>

        {/* Body copy */}
        <p
          className="body-lg"
          style={{ maxWidth: "520px", marginBottom: "3rem" }}
        >
          Clinical AI diagnostics, precision nutrition, and instant specialist access — unified into one intelligent platform built around you.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "5rem" }}>
          <button onClick={onGetStarted} className="btn-primary" id="hero-get-started">
            Get started free
            <ArrowRight size={15} />
          </button>
          <button onClick={onExploreFeatures} className="btn-ghost" id="hero-explore">
            Explore features
          </button>
        </div>

        {/* Editorial stat strip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            paddingTop: "3rem",
            borderTop: "1px solid #1a1a1a",
          }}
        >
          {[
            { value: "12,000+", label: "Patients served" },
            { value: "97%", label: "Diagnostic accuracy" },
            { value: "< 2 min", label: "Average wait time" },
            { value: "ISO 27001", label: "Certified secure" },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginBottom: "0.25rem" }}>
                {stat.value}
              </p>
              <p className="body-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
