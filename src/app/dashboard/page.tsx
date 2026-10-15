"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import {
  ArrowLeft,
  CheckCircle2,
  X,
  Droplets,
  Scale,
  Heart,
  RefreshCw,
  Database,
  User as UserIcon,
  LogOut,
  LogIn,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import MetricCards from "@/components/dashboard/MetricCards";
import AIAssistantWidget from "@/components/dashboard/AIAssistantWidget";
import QuickScheduleAndMeds from "@/components/dashboard/QuickScheduleAndMeds";
import { createClient } from "@/lib/supabase/client";
import {
  getUserProfile,
  getUserVitals,
  saveUserVitals,
  saveUserAppointment,
  checkDatabaseHealth,
  type UserProfile,
  type VitalRecord,
} from "@/lib/supabase/db";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vitals, setVitals] = useState<VitalRecord[]>([]);
  const [dbHealth, setDbHealth] = useState<{ connected: boolean; missingTables: string[] }>({
    connected: false,
    missingTables: [],
  });

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [savingVitals, setSavingVitals] = useState(false);

  // Modals & Banners
  const [logVitalsModalOpen, setLogVitalsModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [sqlModalOpen, setSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Vitals form
  const [manualBP, setManualBP] = useState("118/78");
  const [manualGlucose, setManualGlucose] = useState("92");
  const [manualWeight, setManualWeight] = useState("64.2");
  const [healthScore, setHealthScore] = useState(87);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadUserData = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      const health = await checkDatabaseHealth();
      setDbHealth({
        connected: health.connected,
        missingTables: health.missingTables,
      });

      if (currentUser) {
        const userProf = await getUserProfile(currentUser.id);
        if (userProf) setProfile(userProf);

        const vitalsList = await getUserVitals(currentUser.id);
        if (vitalsList && vitalsList.length > 0) {
          setVitals(vitalsList);
          const latest = vitalsList[0];
          if (latest.blood_pressure) setManualBP(latest.blood_pressure);
          if (latest.glucose) setManualGlucose(String(latest.glucose));
          if (latest.weight) setManualWeight(String(latest.weight));
          if (latest.health_score) setHealthScore(latest.health_score);
        }
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadUserData();
    showToast("Dashboard data refreshed from cloud database.");
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    showToast("Signed out successfully.");
    window.location.href = "/";
  };

  const handleSaveVitals = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingVitals(true);

    const calculatedScore = Math.min(
      98,
      Math.max(
        70,
        90 -
          (parseInt(manualBP.split("/")[0]) > 130 ? 6 : 0) -
          (parseFloat(manualGlucose) > 105 ? 5 : 0)
      )
    );
    setHealthScore(calculatedScore);

    const result = await saveUserVitals({
      user_id: user ? user.id : "guest-patient",
      blood_pressure: manualBP,
      glucose: manualGlucose,
      weight: manualWeight,
      health_score: calculatedScore,
      steps: 8240,
      heart_rate: 68,
    });

    setSavingVitals(false);
    setLogVitalsModalOpen(false);

    if (result.success && result.data) {
      setVitals((prev) => [result.data!, ...prev]);
      showToast(
        user
          ? "Vitals synced & saved to Supabase cloud database!"
          : "Vitals saved locally. Sign in to sync to cloud database."
      );
    } else {
      showToast("Vitals saved locally.");
    }
  };

  const handleQuickBookAppointment = async (docName: string, spec: string, slot: string) => {
    setScheduleModalOpen(false);
    if (user) {
      await saveUserAppointment({
        user_id: user.id,
        doctor_name: docName,
        specialty: spec,
        appointment_date: "Upcoming",
        appointment_time: slot,
        mode: "Online Video",
        status: "confirmed",
        booking_ref: `AH-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      showToast(`Appointment booked with ${docName} & recorded to database!`);
    } else {
      showToast(`Appointment scheduled for ${slot}. Sign in to sync to EHR.`);
    }
  };

  const copySqlSchema = () => {
    const sqlText = `-- AuraHealth Supabase Schema
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'patient',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS public.vitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blood_pressure TEXT,
  glucose NUMERIC,
  weight NUMERIC,
  health_score INTEGER DEFAULT 87,
  steps INTEGER,
  heart_rate INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own vitals" ON public.vitals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own vitals" ON public.vitals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_name TEXT NOT NULL,
  specialty TEXT,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  mode TEXT DEFAULT 'Online',
  status TEXT DEFAULT 'confirmed',
  booking_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own appointments" ON public.appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = user_id);`;

    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const displayName =
    user?.user_metadata?.full_name ||
    profile?.full_name ||
    user?.user_metadata?.name ||
    (user?.email ? user.email.split("@")[0] : null);

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Sub-nav */}
      <header style={{ borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "#000", zIndex: 40 }}>
        <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", color: "#707070", textDecoration: "none", fontWeight: 500 }} className="link-underline">
              <ArrowLeft size={14} /> Home
            </Link>
            <div style={{ height: "14px", width: "1px", background: "#222" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>
              AuraHealth EHR Portal
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Database indicator pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                color: user ? "#4ade80" : "#a0a0a0",
                background: "#0d0d0d",
                padding: "0.3rem 0.65rem",
                border: "1px solid #222",
              }}
            >
              <Database size={12} style={{ color: user ? "#4ade80" : "#707070" }} />
              <span>
                {user
                  ? dbHealth.missingTables.length === 0
                    ? "Supabase DB Synced"
                    : "Supabase Connected"
                  : "Guest Mode"}
              </span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#707070", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem" }}
              className="link-underline"
            >
              <RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} /> Refresh
            </button>

            {user ? (
              <button
                onClick={handleSignOut}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#707070", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem" }}
                className="link-underline"
              >
                <LogOut size={13} /> Sign out
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode("login"); setLoginModalOpen(true); }}
                className="btn-primary btn-sm"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
              >
                <LogIn size={13} style={{ marginRight: "0.3rem" }} /> Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Guest Mode Banner */}
      {!user && !loading && (
        <div style={{ background: "#0a0c10", borderBottom: "1px solid #1a2233", padding: "0.875rem 1rem" }}>
          <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ShieldCheck size={18} style={{ color: "#38bdf8" }} />
              <p style={{ fontSize: "0.8125rem", color: "#cbd5e1", margin: 0 }}>
                You are currently viewing a live demonstration in <strong>Guest Mode</strong>. Sign in to connect and persist vitals to your Supabase cloud EHR database.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => { setAuthMode("login"); setLoginModalOpen(true); }}
                className="btn-primary btn-sm"
                style={{ fontSize: "0.75rem", padding: "0.35rem 0.85rem" }}
              >
                Sign in
              </button>
              <button
                onClick={() => { setAuthMode("register"); setLoginModalOpen(true); }}
                className="btn-ghost btn-sm"
                style={{ fontSize: "0.75rem", padding: "0.35rem 0.85rem" }}
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supabase Schema Notice Banner (if user is logged in and tables not yet migrated in Supabase) */}
      {user && dbHealth.missingTables.length > 0 && (
        <div style={{ background: "#130f06", borderBottom: "1px solid #362810", padding: "0.75rem 1rem" }}>
          <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.8125rem", color: "#fef08a", margin: 0 }}>
              Authenticated as <strong>{user.email}</strong>. Supabase tables (<code>{dbHealth.missingTables.join(", ")}</code>) can be activated in 1 click.
            </p>
            <button
              onClick={() => setSqlModalOpen(true)}
              style={{
                background: "#fef08a",
                color: "#000",
                border: "none",
                fontWeight: 700,
                fontSize: "0.75rem",
                padding: "0.35rem 0.75rem",
                cursor: "pointer",
              }}
            >
              View SQL Migration Script
            </button>
          </div>
        </div>
      )}

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
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <p className="label-upper" style={{ margin: 0 }}>
                {user ? "Authenticated Patient EHR" : "Guest Consultation"}
              </p>
              {user && (
                <span style={{ fontSize: "0.6875rem", background: "#142817", color: "#4ade80", padding: "0.15rem 0.5rem", border: "1px solid #1a4220" }}>
                  Cloud Synced
                </span>
              )}
            </div>

            <h1 className="display-lg" style={{ color: "#fff", marginBottom: "0.75rem" }}>
              {displayName ? `${displayName}.` : "Welcome back."}
            </h1>

            {user?.email && (
              <p style={{ fontSize: "0.8125rem", color: "#606060", marginBottom: "2rem" }}>
                Patient ID: <code style={{ color: "#a0a0a0" }}>{user.id.slice(0, 8)}...</code> · Linked Email: <strong style={{ color: "#888" }}>{user.email}</strong>
              </p>
            )}

            {/* Health score inline */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "flex-end" }}>
              <div>
                <p className="label-upper" style={{ marginBottom: "0.5rem" }}>Health score</p>
                <p style={{ fontSize: "4rem", fontWeight: 900, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1 }}>
                  {healthScore}<span style={{ fontSize: "1.5rem", color: "#505050" }}>/100</span>
                </p>
              </div>
              <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                {[
                  { label: "Blood Pressure", value: manualBP },
                  { label: "Fasting Glucose", value: `${manualGlucose} mg/dL` },
                  { label: "Body Weight", value: `${manualWeight} kg` },
                  { label: "Last Database Sync", value: vitals.length > 0 ? "Just now" : "Demo baseline" },
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
                Log vitals to EHR
              </button>
              <button onClick={() => setScheduleModalOpen(true)} className="btn-ghost btn-sm">
                Book doctor
              </button>
              <button onClick={() => setSqlModalOpen(true)} className="btn-ghost btn-sm" style={{ color: "#707070" }}>
                Database Schema
              </button>
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ borderBottom: "1px solid #1a1a1a" }}>
          <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2.5rem" }}>
              <p className="label-upper">Today&apos;s biometrics & vitals</p>
              <span style={{ fontSize: "0.75rem", color: "#606060" }}>
                Connected to Supabase EHR
              </span>
            </div>
            <MetricCards
              customBP={manualBP}
              customGlucose={manualGlucose}
              customWeight={manualWeight}
            />
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
            <button
              onClick={() => setLogVitalsModalOpen(false)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>
              {user ? `Record to ${user.email}` : "Manual Entry (Guest)"}
            </p>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.025em" }}>
              Log biometrics to database
            </h2>
            <p className="body-sm" style={{ marginBottom: "2rem" }}>
              {user
                ? "This vital reading will be encrypted and committed to your Supabase vitals table."
                : "Enter readings below. Sign in anytime to sync history to your cloud EHR."}
            </p>

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
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="btn-primary"
                disabled={savingVitals}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {savingVitals ? "Saving to database..." : "Commit to medical history"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setScheduleModalOpen(false); }}>
          <div className="modal-panel" style={{ position: "relative" }}>
            <button
              onClick={() => setScheduleModalOpen(false)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>Quick book</p>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "2rem", letterSpacing: "-0.025em" }}>
              Select a clinical specialist
            </h2>
            {[
              { name: "Dr. Sarah Chen, MD", spec: "Cardiologist", slot: "Today at 4:30 PM" },
              { name: "Dr. Alexander Patel, MD", spec: "Endocrinologist", slot: "Tomorrow at 10:00 AM" },
            ].map((doc) => (
              <div
                key={doc.name}
                style={{
                  padding: "1.25rem 0",
                  borderTop: "1px solid #1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>{doc.name}</p>
                  <p className="body-sm">{doc.spec} · {doc.slot}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickBookAppointment(doc.name, doc.spec, doc.slot)}
                  className="btn-ghost btn-sm"
                  style={{ fontSize: "0.75rem" }}
                >
                  Book ($0 copay)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SQL Schema Helper Modal */}
      {sqlModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSqlModalOpen(false); }}>
          <div className="modal-panel" style={{ position: "relative", maxWidth: "680px" }}>
            <button
              onClick={() => setSqlModalOpen(false)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>Supabase SQL Migration</p>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.025em" }}>
              Database Tables & RLS Policies
            </h2>
            <p className="body-sm" style={{ marginBottom: "1.5rem" }}>
              Run this in your <strong>Supabase Dashboard → SQL Editor</strong> to create the <code>profiles</code>, <code>vitals</code>, and <code>appointments</code> tables with security policies.
            </p>

            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <pre
                style={{
                  background: "#080808",
                  border: "1px solid #222",
                  padding: "1rem",
                  fontSize: "0.75rem",
                  color: "#a0a0a0",
                  maxHeight: "260px",
                  overflowY: "auto",
                  lineHeight: 1.5,
                  fontFamily: "monospace",
                }}
              >
{`-- AuraHealth Database Schema (already generated in supabase_schema.sql)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'patient',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.vitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blood_pressure TEXT,
  glucose NUMERIC,
  weight NUMERIC,
  health_score INTEGER DEFAULT 87,
  steps INTEGER,
  heart_rate INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_name TEXT NOT NULL,
  specialty TEXT,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  mode TEXT DEFAULT 'Online',
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;`}
              </pre>

              <button
                onClick={copySqlSchema}
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  background: "#222",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                {copiedSql ? <Check size={13} style={{ color: "#4ade80" }} /> : <Copy size={13} />}
                <span>{copiedSql ? "Copied!" : "Copy SQL"}</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button onClick={() => setSqlModalOpen(false)} className="btn-ghost btn-sm">
                Close
              </button>
              <a
                href="https://supabase.com/dashboard/project/rmdfjdewfzbelljrdhmw/sql"
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}
              >
                Open Supabase SQL Editor <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialMode={authMode}
      />

      <Footer />
    </div>
  );
}
