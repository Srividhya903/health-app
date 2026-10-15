"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { doctorsData, DoctorProfile } from "@/data/doctorsData";
import DoctorFilters from "@/components/doctors/DoctorFilters";
import DoctorCard from "@/components/doctors/DoctorCard";
import BookingModal from "@/components/doctors/BookingModal";
import Footer from "@/components/Footer";
import {
  Stethoscope,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Search,
  Video,
  Award,
} from "lucide-react";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedConsultationType, setSelectedConsultationType] = useState("all");
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<DoctorProfile | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered doctors list
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doc) => {
      // 1. Specialty filter
      if (selectedSpecialty !== "all" && doc.specialty !== selectedSpecialty) {
        return false;
      }

      // 2. Consultation type filter
      if (selectedConsultationType !== "all") {
        if (selectedConsultationType === "Online" && doc.consultationType === "Nearby Offline") {
          return false;
        }
        if (selectedConsultationType === "Nearby Offline" && doc.consultationType === "Online") {
          return false;
        }
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(q);
        const matchesSpecialty = doc.specialty.toLowerCase().includes(q);
        const matchesSubSpecialty = doc.subSpecialty.toLowerCase().includes(q);
        const matchesHospital = doc.hospital.toLowerCase().includes(q);
        const matchesBio = doc.bio.toLowerCase().includes(q);
        const matchesLocation = doc.location.toLowerCase().includes(q);

        return (
          matchesName ||
          matchesSpecialty ||
          matchesSubSpecialty ||
          matchesHospital ||
          matchesBio ||
          matchesLocation
        );
      }

      return true;
    });
  }, [searchQuery, selectedSpecialty, selectedConsultationType]);

  const handleOpenBooking = (doctor: DoctorProfile) => {
    setSelectedDoctorForBooking(doctor);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (summary: {
    doctorName: string;
    date: string;
    slot: string;
    mode: string;
  }) => {
    setToastMessage(
      `Appointment confirmed with ${summary.doctorName} on ${summary.date} at ${summary.slot} (${summary.mode})!`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-xl border-b border-slate-800/90 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <Link href="/" className="text-xs font-medium text-slate-400 hover:text-white hidden sm:block">
              Main Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Urgent Triage Careline: 1-800-AURA-HEALTH</span>
            </span>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Physicians Online Now</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/95 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Hero Header */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0b1426] via-[#080f1d] to-[#050811] border border-cyan-500/20 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs text-cyan-300 font-semibold mb-4">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Board-Certified Medical Specialist Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Doctor Discovery &amp;{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Instant Consultation
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect directly with credentialed Physicians, Clinical Dietitians, and Psychologists.
              Choose between high-definition encrypted online video consultations or visit nearby
              partner hospital clinics.
            </p>

            {/* Trust Badges Bar */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Medical Licenses &amp; Fellowships</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>256-bit Encrypted HD Video Rooms</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Insurance Accepted ($0 Copay)</span>
              </span>
            </div>
          </div>
        </div>

        {/* 1. Search Bar & Filter Tags Component */}
        <section className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl">
          <DoctorFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSpecialty={selectedSpecialty}
            onSelectSpecialty={setSelectedSpecialty}
            selectedConsultationType={selectedConsultationType}
            onSelectConsultationType={setSelectedConsultationType}
            resultCount={filteredDoctors.length}
          />
        </section>

        {/* 2. Doctor Profiles List Grid */}
        <section className="space-y-6">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onBookAppointment={handleOpenBooking}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 p-8 glass-panel rounded-3xl border border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No matching specialists found</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                No specialists matched your current search &quot;{searchQuery}&quot; or selected filters. Try
                resetting your filters to view all available providers.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                  setSelectedConsultationType("all");
                }}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* 3. Interactive Book Appointment Modal */}
      <BookingModal
        doctor={selectedDoctorForBooking}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
