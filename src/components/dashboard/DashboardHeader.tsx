"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Bell,
  Search,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  onRefreshData?: () => void;
}

export default function DashboardHeader({
  userName = "Jane Doe",
  onRefreshData,
}: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefreshData?.();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-xl border-b border-slate-800/90 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Back to Home + Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
            title="Return to Main Portal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#080d19] rounded-[10px] flex items-center justify-center">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Aura<span className="text-cyan-400">Health</span>
                </span>
                <span className="bg-cyan-500/10 text-cyan-300 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded border border-cyan-500/30">
                  Portal
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Search & Sync status (desktop) */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search health records, lab biomarkers, doctors..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions, Sync, Notification, User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Live Sync button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Sync with Apple Health & Oura"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Sync IoT</span>
          </button>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all focus:outline-none"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            {/* Dropdown panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0a101d] border border-cyan-500/30 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Notifications (3)
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium cursor-pointer hover:underline">
                    Mark read
                  </span>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <p className="font-semibold text-white">Apple Watch Vitals Synced</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      HRV, resting pulse and 8,432 steps updated 2m ago.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <p className="font-semibold text-cyan-300">Appointment Reminder</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Consultation with Dr. Sarah Chen, MD in 2 hours.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <p className="font-semibold text-emerald-400">Daily Hydration Target</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      75% completed (2,250 ml logged). You are on track!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                JD
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white leading-tight">{userName}</p>
              <p className="text-[10px] text-emerald-400 font-medium">Patient #AH-4091</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
