"use client";

import React from "react";
import Link from "next/link";

const footerLinks = [
  {
    section: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Diet Planner", href: "/diet-planner" },
      { label: "Find Doctors", href: "/doctors" },
    ],
  },
  {
    section: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Privacy", href: "/" },
      { label: "Terms", href: "/" },
    ],
  },
];

interface FooterProps {
  onOpenLogin?: () => void;
}

export default function Footer({ onOpenLogin }: FooterProps) {
  return (
    <footer style={{ borderTop: "1px solid #1a1a1a", marginTop: "auto" }}>
      <div className="container-editorial" style={{ padding: "4rem 2rem 2.5rem" }}>
        {/* Top row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", justifyContent: "space-between", marginBottom: "4rem" }}>
          {/* Brand */}
          <div style={{ flex: "1 1 260px" }}>
            <p style={{ fontSize: "1rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.75rem" }}>
              AURAHEALTH
            </p>
            <p className="body-sm" style={{ maxWidth: "260px" }}>
              AI-powered healthcare ecosystem — diagnostics, nutrition, and specialist care unified.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.section} style={{ flex: "0 0 auto" }}>
              <p className="label-upper" style={{ marginBottom: "1rem" }}>{col.section}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="link-underline"
                    style={{ fontSize: "0.875rem", color: "#707070", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA column */}
          <div style={{ flex: "1 1 200px" }}>
            <p className="label-upper" style={{ marginBottom: "1rem" }}>Get started</p>
            <button
              onClick={onOpenLogin}
              className="btn-primary btn-sm"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Create Free Account
            </button>
          </div>
        </div>

        {/* Bottom strip */}
        <hr className="editorial-rule" style={{ marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#505050" }}>
            © {new Date().getFullYear()} AuraHealth Technologies. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#505050" }}>
            HIPAA compliant · End-to-end encrypted · ISO 27001
          </p>
        </div>
      </div>
    </footer>
  );
}
