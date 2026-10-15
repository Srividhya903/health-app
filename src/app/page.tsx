"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePropositions from "@/components/ValuePropositions";
import DietPlannerTeaser from "@/components/DietPlannerTeaser";
import DoctorsTeaser from "@/components/DoctorsTeaser";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleOpenLogin = () => {
    setAuthMode("login");
    setLoginModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthMode("register");
    setLoginModalOpen(true);
  };

  const handleExploreFeatures = () => {
    const el = document.getElementById("features");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDoctorBooking = (doctorName: string) => {
    // Smooth interaction confirmation
    console.log(`Booking consultation with ${doctorName}`);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Global Header Navigation */}
      <Navbar
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section with AI-Powered Healthcare Ecosystem headline & Live Console */}
        <HeroSection
          onGetStarted={handleOpenRegister}
          onExploreFeatures={handleExploreFeatures}
        />

        {/* 2. Value Proposition Cards */}
        <ValuePropositions />

        {/* 3. AI Diet Planner Showcase */}
        <DietPlannerTeaser onPlanClick={handleOpenRegister} />

        {/* 4. Doctors & Specialist Telehealth Showcase */}
        <DoctorsTeaser onBookDoctor={handleDoctorBooking} />

        {/* 5. Prominent Get Started Call-to-Action */}
        <CTASection onGetStarted={handleOpenRegister} />
      </main>

      {/* Global Footer */}
      <Footer onOpenLogin={handleOpenLogin} />

      {/* Patient / Doctor Authentication Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
