"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  Heart,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  onOpenLogin?: () => void;
}

export default function Footer({ onOpenLogin }: FooterProps) {
  return (
    <footer className="bg-[#04060c] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#hero" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#080d19] rounded-[11px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Aura<span className="text-cyan-400">Health</span>
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm max-w-sm">
              The next-generation AI-powered healthcare ecosystem unifying predictive
              diagnostics, continuous wearable sync, personalized metabolic nutrition, and
              instant specialist telehealth.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>HIPAA &amp; ISO-27799 Compliant</span>
              </div>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Ecosystem
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#hero" className="hover:text-cyan-300 transition-colors">
                  AI Diagnostic Engine
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-cyan-300 transition-colors">
                  Continuous Vitals Monitor
                </Link>
              </li>
              <li>
                <Link href="/diet-planner" className="hover:text-cyan-300 transition-colors">
                  Adaptive Diet Planner
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-cyan-300 transition-colors">
                  Specialist Telehealth Network
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-cyan-300 transition-colors">
                  Digital Pharmacy Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Patients & Doctors */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Portals
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300 transition-colors text-left block">
                  Patient Medical Vault
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300 transition-colors text-left block">
                  Physician EHR Workstation
                </Link>
              </li>
              <li>
                <Link href="/diet-planner" className="hover:text-cyan-300 transition-colors">
                  Biometric Nutrition Studio
                </Link>
              </li>
              <li>
                <Link href="/#cta-section" className="hover:text-cyan-300 transition-colors">
                  Emergency Medical Protocols
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Careline */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              24/7 Careline
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>1-800-AURA-HEALTH</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>support@aurahealth.ai</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>San Francisco, CA &amp; Zurich, CH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-8 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Medical Notice &amp; Disclaimer:</strong> AuraHealth AI provides algorithmic clinical triage assistance, lifestyle nutrition guidance, and telehealth booking connectivity. It is not an automated medical practitioner or an emergency replacement. If you believe you are experiencing a life-threatening medical emergency, call 911 (or your local emergency services) immediately.
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 AuraHealth AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#hipaa" className="hover:text-cyan-300 transition-colors">
              HIPAA Safeguards
            </a>
            <a href="#terms" className="hover:text-cyan-300 transition-colors">
              Terms of Medical Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
