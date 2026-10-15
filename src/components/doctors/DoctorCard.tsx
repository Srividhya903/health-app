"use client";

import React from "react";
import { DoctorProfile } from "@/data/doctorsData";
import {
  Star,
  Video,
  MapPin,
  Clock,
  Calendar,
  Languages,
  Award,
  ArrowRight,
} from "lucide-react";

interface DoctorCardProps {
  doctor: DoctorProfile;
  onBookAppointment: (doctor: DoctorProfile) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const specialtyBadgeColor: Record<string, string> = {
    Physician: "bg-cyan-950/80 text-cyan-300 border-cyan-500/30",
    Dietitian: "bg-emerald-950/80 text-emerald-300 border-emerald-500/30",
    Psychologist: "bg-purple-950/80 text-purple-300 border-purple-500/30",
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30">
      <div>
        {/* Header: Avatar, Specialty, Rating */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${doctor.avatarColor} flex items-center justify-center text-white font-extrabold text-lg shadow-md`}
              >
                {doctor.avatarInitials}
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"
                title="Verified active provider"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {doctor.name}
                </h3>
                <span className="text-xs font-semibold text-slate-400">{doctor.degrees}</span>
              </div>

              <span
                className={`inline-block mt-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  specialtyBadgeColor[doctor.specialty] || "bg-slate-900 text-slate-300"
                }`}
              >
                {doctor.specialty} • {doctor.subSpecialty}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl text-amber-300 text-xs font-bold shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{doctor.rating}</span>
            <span className="text-slate-400 text-[10px] font-normal">({doctor.reviewCount})</span>
          </div>
        </div>

        {/* Hospital Affiliation & Location */}
        <div className="space-y-1.5 text-xs text-slate-300 mt-2 mb-4">
          <div className="flex items-center gap-1.5 text-slate-200">
            <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-medium">{doctor.hospital}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{doctor.location}</span>
            {doctor.distanceKm && (
              <span className="text-cyan-400 font-semibold">• {doctor.distanceKm}</span>
            )}
          </div>
        </div>

        {/* Bio Snippet */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {doctor.bio}
        </p>

        {/* Badges Bar: Consultation Type + Languages */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80 mb-4 text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
            <Video className="w-3 h-3 text-cyan-400" />
            <span>{doctor.consultationType === "Both" ? "Video & In-Clinic" : doctor.consultationType}</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1">
            <Languages className="w-3 h-3 text-slate-400" />
            <span>{doctor.languages.join(", ")}</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
            {doctor.experienceYears} yrs exp
          </span>
        </div>
      </div>

      {/* Footer: Fee & Book Button */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Consultation Fee
            </span>
            <span className="text-sm sm:text-base font-extrabold text-white">
              {doctor.consultationFee}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Earliest Opening
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {doctor.nextSlot}
            </span>
          </div>
        </div>

        {/* Interactive Book Appointment Button */}
        <button
          onClick={() => onBookAppointment(doctor)}
          id={`book-doctor-${doctor.id}`}
          className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm group"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
