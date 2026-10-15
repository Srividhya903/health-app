"use client";

import React, { useState } from "react";
import { X, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { syncUserProfile } from "@/lib/supabase/db";

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
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOAuthSignIn = async (provider: "google") => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setOauthLoading(provider);

    try {
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        if (error.message.includes("missing") || error.message.includes("URL") || error.message.includes("Failed to fetch")) {
          setErrorMessage(
            "Supabase credentials not configured yet. Please add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
          );
        } else {
          setErrorMessage(error.message);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect to authentication server.";
      setErrorMessage(msg);
    } finally {
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("URL") || error.message.includes("Failed to fetch")) {
            setErrorMessage(
              "Supabase credentials not configured yet. Please update .env.local with your Supabase credentials."
            );
          } else {
            setErrorMessage(error.message);
          }
        } else {
          if (data.user) {
            await syncUserProfile(data.user);
          }
          setSuccessMessage("Authenticated successfully! Connecting to your health record...");
          setTimeout(() => {
            onClose();
            window.location.href = "/dashboard";
          }, 600);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });

        if (error) {
          if (error.message.includes("URL") || error.message.includes("Failed to fetch")) {
            setErrorMessage(
              "Supabase credentials not configured yet. Please update .env.local with your Supabase credentials."
            );
          } else {
            setErrorMessage(error.message);
          }
        } else if (data.session && data.user) {
          await syncUserProfile(data.user, name);
          setSuccessMessage("Account created & connected to EHR! Redirecting to dashboard...");
          setTimeout(() => {
            onClose();
            window.location.href = "/dashboard";
          }, 800);
        } else {
          if (data.user) {
            await syncUserProfile(data.user, name);
          }
          setSuccessMessage("Account registered! Please check your email to confirm, or click Sign In.");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error occurred.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel" style={{ position: "relative" }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#707070",
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <p className="label-upper" style={{ marginBottom: "1rem" }}>
          AuraHealth Access
        </p>
        <h2 className="display-sm" style={{ color: "#fff", marginBottom: "0.75rem" }}>
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h2>
        <p className="body-sm" style={{ marginBottom: "2rem" }}>
          {mode === "login"
            ? "Sign in to access encrypted health records and diagnostics."
            : "Join verified patients and clinical practitioners on AuraHealth."}
        </p>

        {/* Status alerts */}
        {errorMessage && (
          <div
            style={{
              padding: "0.875rem 1rem",
              background: "#160b0b",
              border: "1px solid #331515",
              color: "#f87171",
              fontSize: "0.8125rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              lineHeight: 1.5,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div
            style={{
              padding: "0.875rem 1rem",
              background: "#0c150c",
              border: "1px solid #1a301a",
              color: "#4ade80",
              fontSize: "0.8125rem",
              marginBottom: "1.5rem",
              lineHeight: 1.5,
            }}
          >
            {successMessage}
          </div>
        )}

        {/* OAuth Social Button (Google) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
          <button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            disabled={!!oauthLoading || loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              width: "100%",
              padding: "0.75rem 1rem",
              background: "#0d0d0d",
              border: "1px solid #262626",
              color: "#ffffff",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.15s, background-color 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#262626")}
          >
            {oauthLoading === "google" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#d0d0d0" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#a0a0a0" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#fff" />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
          <span style={{ fontSize: "0.6875rem", color: "#505050", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            or with email
          </span>
          <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
        </div>

        {/* Mode switcher tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2rem", borderBottom: "1px solid #1a1a1a" }}>
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
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

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {mode === "register" && (
            <div>
              <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>
                Full name
              </label>
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
            <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>
              Email address
            </label>
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
            <label className="label-upper" style={{ display: "block", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              className="input-editorial"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            id="auth-submit-btn"
            disabled={loading || !!oauthLoading}
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                {mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <p className="body-sm" style={{ marginTop: "1.5rem", textAlign: "center" }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: "inherit",
              textDecoration: "underline",
            }}
          >
            {mode === "login" ? "Register free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
