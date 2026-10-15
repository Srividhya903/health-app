"use client";

import React from "react";
import { DoctorProfile } from "@/data/doctorsData";
import { Star, MapPin, Calendar, Clock, Languages, ArrowRight, Video } from "lucide-react";

interface DoctorCardProps {
  doctor: DoctorProfile;
  onBookAppointment: (doctor: DoctorProfile) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "2rem",
        alignItems: "center",
        padding: "2rem 0",
        borderTop: "1px solid #1a1a1a",
        cursor: "default",
      }}
      className="doctor-card-row"
    >
      {/* Left: info */}
      <div>
        {/* Name + degrees */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            {doctor.name}
          </h3>
          <span style={{ fontSize: "0.75rem", color: "#505050" }}>{doctor.degrees}</span>
        </div>

        {/* Specialty + hospital */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "0.75rem" }}>
          <span className="body-sm">
            {doctor.specialty} · {doctor.subSpecialty}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "#505050" }}>
            <MapPin size={11} />
            {doctor.location}
            {doctor.distanceKm && <span style={{ color: "#a0a0a0" }}> · {doctor.distanceKm}</span>}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "#a0a0a0" }}>
            <Star size={11} />
            {doctor.rating}
            <span style={{ color: "#505050" }}>({doctor.reviewCount})</span>
          </span>
        </div>

        {/* Bio */}
        <p style={{ fontSize: "0.8125rem", color: "#505050", lineHeight: 1.6, maxWidth: "560px", marginBottom: "1rem" }}>
          {doctor.bio}
        </p>

        {/* Meta chips row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span className="chip" style={{ cursor: "default", fontSize: "0.6875rem" }}>
            <Video size={10} />
            {doctor.consultationType === "Both" ? "Video & In-Clinic" : doctor.consultationType}
          </span>
          <span className="chip" style={{ cursor: "default", fontSize: "0.6875rem" }}>
            <Languages size={10} />
            {doctor.languages.join(", ")}
          </span>
          <span className="chip" style={{ cursor: "default", fontSize: "0.6875rem" }}>
            {doctor.experienceYears} yrs experience
          </span>
          <span className="chip" style={{ cursor: "default", fontSize: "0.6875rem" }}>
            <Clock size={10} />
            {doctor.nextSlot}
          </span>
        </div>
      </div>

      {/* Right: fee + book */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <p className="label-upper" style={{ marginBottom: "0.25rem" }}>Fee</p>
          <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
            {doctor.consultationFee}
          </p>
        </div>
        <button
          onClick={() => onBookAppointment(doctor)}
          id={`book-doctor-${doctor.id}`}
          className="btn-primary btn-sm"
        >
          Book <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
