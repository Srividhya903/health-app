"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/diet-planner", label: "Diet Planner" },
  { href: "/doctors", label: "Doctors" },
];

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export default function Navbar({ onOpenLogin, onOpenRegister }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setCurrentUser(null);
    window.location.href = "/";
  };

  const displayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "Patient";

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#000",
          borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
          transition: "border-color 0.2s ease",
        }}
      >
        <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "1rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>
              AURAHEALTH
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline"
                style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#707070", letterSpacing: "0.02em", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="hidden-mobile">
            {currentUser ? (
              <>
                <Link
                  href="/dashboard"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    padding: "0.4rem 0.75rem",
                    background: "#111",
                    border: "1px solid #222",
                  }}
                  className="link-underline"
                >
                  <User size={13} style={{ color: "#4ade80" }} />
                  <span>{displayName}</span>
                </Link>
                <Link href="/dashboard" className="btn-primary btn-sm">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "#707070",
                  }}
                  className="link-underline"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 600, color: "#707070", letterSpacing: "0.04em" }}
                >
                  Sign in
                </button>
                <button onClick={onOpenRegister} className="btn-primary btn-sm">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "none" }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            style={{
              background: "#000",
              borderTop: "1px solid #1a1a1a",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", textDecoration: "none", letterSpacing: "-0.02em" }}
              >
                {link.label}
              </Link>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid #1a1a1a", margin: "0.5rem 0" }} />
            {currentUser ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ fontSize: "0.8125rem", color: "#a0a0a0" }}>Signed in as <strong style={{ color: "#fff" }}>{displayName}</strong></p>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="btn-primary btn-sm" style={{ justifyContent: "center" }}>
                  Go to Dashboard
                </Link>
                <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="btn-ghost btn-sm" style={{ justifyContent: "center" }}>
                  Sign out
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => { onOpenLogin?.(); setMenuOpen(false); }} className="btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center" }}>
                  Sign in
                </button>
                <button onClick={() => { onOpenRegister?.(); setMenuOpen(false); }} className="btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>
                  Get Started
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
