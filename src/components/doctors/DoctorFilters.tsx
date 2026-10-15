"use client";

import React from "react";
import {
  Search,
  Stethoscope,
  UtensilsCrossed,
  Brain,
  Video,
  MapPin,
  X,
} from "lucide-react";

interface DoctorFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSpecialty: string;
  onSelectSpecialty: (spec: string) => void;
  selectedConsultationType: string;
  onSelectConsultationType: (type: string) => void;
  resultCount: number;
}

export default function DoctorFilters({
  searchQuery,
  onSearchChange,
  selectedSpecialty,
  onSelectSpecialty,
  selectedConsultationType,
  onSelectConsultationType,
  resultCount,
}: DoctorFiltersProps) {
  const specialties: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All Specialties", icon: null },
    { id: "Physician", label: "Physicians", icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: "Dietitian", label: "Dietitians", icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: "Psychologist", label: "Psychologists", icon: <Brain className="w-3.5 h-3.5" /> },
  ];

  const consultationTypes: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All Formats", icon: null },
    { id: "Online", label: "Online Telehealth", icon: <Video className="w-3.5 h-3.5" /> },
    { id: "Nearby Offline", label: "Nearby Offline Clinic", icon: <MapPin className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar Input */}
      <div className="relative w-full">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search by doctor name, specialty (e.g. Cardiology, PCOS, Sleep), hospital or condition..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#080e1b] border border-slate-800 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-lg shadow-cyan-950/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        {/* Specialty Filter Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Specialty:
          </span>
          {specialties.map((spec) => {
            const isSelected = selectedSpecialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => onSelectSpecialty(spec.id)}
                id={`filter-specialty-${spec.id.toLowerCase()}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/25 border border-cyan-400"
                    : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {spec.icon}
                <span>{spec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Consultation Type Filter Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Mode:
          </span>
          {consultationTypes.map((type) => {
            const isSelected = selectedConsultationType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onSelectConsultationType(type.id)}
                id={`filter-type-${type.id.toLowerCase().replace(" ", "-")}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 border border-emerald-400"
                    : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {type.icon}
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
        <span className="font-medium">
          Showing <strong className="text-white">{resultCount}</strong> verified clinical specialists
        </span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Pre-visit AI medical summaries enabled
        </span>
      </div>
    </div>
  );
}
