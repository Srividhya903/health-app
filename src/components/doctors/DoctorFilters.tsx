"use client";

import React from "react";
import { Search, Stethoscope, UtensilsCrossed, Brain, Video, MapPin, X } from "lucide-react";

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
  const specialties = [
    { id: "all", label: "All", icon: null },
    { id: "Physician", label: "Physicians", icon: <Stethoscope size={11} /> },
    { id: "Dietitian", label: "Dietitians", icon: <UtensilsCrossed size={11} /> },
    { id: "Psychologist", label: "Psychologists", icon: <Brain size={11} /> },
  ];

  const consultationTypes = [
    { id: "all", label: "All formats", icon: null },
    { id: "Online", label: "Online", icon: <Video size={11} /> },
    { id: "Nearby Offline", label: "In-clinic", icon: <MapPin size={11} /> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Search input */}
      <div style={{ position: "relative" }}>
        <Search size={16} style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", color: "#505050" }} />
        <input
          type="text"
          placeholder="Search by name, specialty, hospital, condition…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-editorial"
          style={{ paddingLeft: "1.75rem", paddingRight: searchQuery ? "1.75rem" : "0" }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#505050" }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          <span className="label-upper" style={{ alignSelf: "center", marginRight: "0.5rem" }}>Specialty</span>
          {specialties.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSpecialty(s.id)}
              id={`filter-specialty-${s.id.toLowerCase()}`}
              className={`chip${selectedSpecialty === s.id ? " active" : ""}`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          <span className="label-upper" style={{ alignSelf: "center", marginRight: "0.5rem" }}>Mode</span>
          {consultationTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectConsultationType(t.id)}
              id={`filter-type-${t.id.toLowerCase().replace(" ", "-")}`}
              className={`chip${selectedConsultationType === t.id ? " active" : ""}`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="body-sm">
        {resultCount} verified specialist{resultCount !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
