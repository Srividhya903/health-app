"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  User,
  ArrowRight,
  Stethoscope,
  UtensilsCrossed,
  Layers,
  PhoneCall,
} from "lucide-react";

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export default function Navbar({ onOpenLogin, onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#hero", id: "nav-home" },
    { name: "Dashboard", href: "/dashboard", id: "nav-dashboard" },
    { name: "Features", href: "/#features", id: "nav-features" },
    { name: "Diet Planner", href: "/diet-planner", id: "nav-diet-planner" },
    { name: "Doctors", href: "/doctors", id: "nav-doctors" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro-bar: Emergency & Live status */}
      <div className="bg-[#0b1329]/90 border-b border-cyan-500/10 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center text-slate-400">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AI Diagnostic Engine: Operational (99.98% uptime)
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">HIPAA & ISO-27799 Compliant</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 hidden sm:flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-cyan-400" /> 24/7 Medical Careline:
            <span className="text-cyan-300 font-semibold ml-1">1-800-AURA-HEALTH</span>
          </span>
          <Link
            href="/dashboard"
            id="nav-login-top"
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
          >
            <User className="w-3 h-3" /> Patient Portal
          </Link>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? "glass-nav py-3.5 shadow-2xl shadow-cyan-950/20" : "bg-[#060911]/80 backdrop-blur-md py-4"
        } border-b border-slate-800/80 px-4 sm:px-8`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#hero"
            id="brand-logo"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090e1c] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Aura<span className="text-cyan-400">Health</span>
                </span>
                <span className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-cyan-500/30">
                  AI OS
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                Digital Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                id={link.id}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              id="nav-login-btn"
              className="text-sm font-medium text-slate-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-slate-800/60 transition-all duration-200 flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Login</span>
            </button>
            <button
              onClick={onOpenRegister || (() => {
                const el = document.getElementById("cta-section");
                el?.scrollIntoView({ behavior: "smooth" });
              })}
              id="nav-get-started-btn"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 group-hover:from-cyan-600 group-hover:to-emerald-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-200 bg-[#060911]/80 rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span className="font-semibold text-cyan-50 group-hover:text-white">Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-panel"
            className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-800 my-2" />
              <div className="flex flex-col gap-2 pt-1 px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin?.();
                  }}
                  id="mobile-login-btn"
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 rounded-xl transition-all"
                >
                  Sign In / Patient Portal
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById("cta-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                    onOpenRegister?.();
                  }}
                  id="mobile-get-started-btn"
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl shadow-md shadow-cyan-500/20"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
