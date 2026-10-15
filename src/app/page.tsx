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

  const handleOpenLogin = () => { setAuthMode("login"); setLoginModalOpen(true); };
  const handleOpenRegister = () => { setAuthMode("register"); setLoginModalOpen(true); };

  const handleExploreFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />
      <main style={{ flex: 1 }}>
        <HeroSection onGetStarted={handleOpenRegister} onExploreFeatures={handleExploreFeatures} />
        <ValuePropositions />
        <DietPlannerTeaser onPlanClick={handleOpenRegister} />
        <DoctorsTeaser onBookDoctor={() => {}} />
        <CTASection onGetStarted={handleOpenRegister} />
      </main>
      <Footer onOpenLogin={handleOpenLogin} />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} initialMode={authMode} />
    </div>
  );
}
