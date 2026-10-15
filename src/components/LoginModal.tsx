"use client";

import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "register";
}

export default function LoginModal({ isOpen, onClose, initialMode }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-panel" style={{ position: "relative" }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <p className="label-upper" style={{ marginBottom: "1rem" }}>AuraHealth</p>
        <h2 className="display-sm" style={{ color: "#fff", marginBottom: "0.75rem" }}>
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h2>
        <p className="body-sm" style={{ marginBottom: "2.5rem" }}>
          {mode === "login"
            ? "Sign in to access your health dashboard."
            : "Join 12,000+ patients on AuraHealth."}
        </p>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2.5rem", borderBottom: "1px solid #1a1a1a" }}>
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingBottom: "0.75rem",
                paddingRight: "2rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: mode === m ? "#fff" : "#505050",
                borderBottom: mode === m ? "2px solid #fff" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.15s",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {m === "login" ? "Sign in" : "Register"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {mode === "register" && (
            <div>
              <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>Full name</label>
              <input
                type="text"
                className="input-editorial"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>Email address</label>
            <input
              type="email"
              className="input-editorial"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password"
              className="input-editorial"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" id="auth-submit-btn" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
            {mode === "login" ? "Sign in" : "Create account"}
            <ArrowRight size={15} />
          </button>
        </form>

        <p className="body-sm" style={{ marginTop: "1.5rem", textAlign: "center" }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "inherit", textDecoration: "underline" }}
          >
            {mode === "login" ? "Register free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
