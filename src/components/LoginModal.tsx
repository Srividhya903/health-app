"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function LoginModal({
  isOpen,
  onClose,
  initialMode = "login",
}: LoginModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [role, setRole] = useState<"patient" | "clinician">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(
      mode === "login"
        ? `Welcome back! Authenticated as ${role === "patient" ? "Patient" : "Dr."} ${email || "demo@aurahealth.ai"}`
        : `Account created successfully for ${name || "AuraHealth Member"}!`
    );
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
      router.push("/dashboard");
    }, 1200);
  };

  const handleDemoLogin = (demoRole: "patient" | "clinician") => {
    setRole(demoRole);
    setEmail(demoRole === "patient" ? "patient.demo@aurahealth.ai" : "dr.chen@aurahealth.ai");
    setPassword("••••••••••••");
    setSuccessMsg(
      `Logged in via 1-Click Demo as ${
        demoRole === "patient" ? "Patient (Jane Doe)" : "Dr. Sarah Chen, MD"
      }! Navigating to Patient Dashboard...`
    );
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      id="login-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#090e1a] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-login-modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-3 text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {mode === "login" ? "Sign In to AuraHealth" : "Join AuraHealth Ecosystem"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end encrypted biometric health access
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Role Toggle: Patient vs Clinician */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`py-2 rounded-lg transition-all ${
              role === "patient"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Patient Access
          </button>
          <button
            type="button"
            onClick={() => setRole("clinician")}
            className={`py-2 rounded-lg transition-all ${
              role === "clinician"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Doctor / Clinician
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@healthcare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-slate-300">
                Password
              </label>
              {mode === "login" && (
                <a href="#reset" className="text-[11px] text-cyan-400 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>{mode === "login" ? "Sign In Securely" : "Create My Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login options */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <p className="text-[11px] text-center text-slate-400 mb-2.5 font-medium">
            ⚡ Quick Test / Evaluation:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("patient")}
              className="py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-semibold text-cyan-300 transition-all text-center"
            >
              Demo Patient
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("clinician")}
              className="py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-semibold text-emerald-300 transition-all text-center"
            >
              Demo Doctor
            </button>
          </div>
        </div>

        {/* Toggle between Login and Register */}
        <div className="mt-4 text-center text-xs text-slate-400">
          {mode === "login" ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-cyan-400 font-semibold hover:underline"
              >
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-cyan-400 font-semibold hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>

        {/* Security badge at bottom */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>HIPAA Safe • 256-Bit SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
}
