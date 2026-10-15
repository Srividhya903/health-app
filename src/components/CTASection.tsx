"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="section-gap">
      <div className="container-editorial">
        <p className="label-upper" style={{ marginBottom: "2rem" }}>Ready to begin</p>
        <h2
          className="display-lg"
          style={{ color: "#fff", marginBottom: "3rem", maxWidth: "700px" }}
        >
          Take control of your health, today.
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <button onClick={onGetStarted} className="btn-primary" id="cta-get-started">
            Start free — no card required
            <ArrowRight size={15} />
          </button>
        </div>
        <p className="body-sm" style={{ marginTop: "1.5rem" }}>
          Join 12,000+ patients managing their health on AuraHealth.
        </p>
      </div>
    </section>
  );
}
