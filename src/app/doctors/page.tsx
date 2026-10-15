"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { doctorsData, DoctorProfile } from "@/data/doctorsData";
import DoctorFilters from "@/components/doctors/DoctorFilters";
import DoctorCard from "@/components/doctors/DoctorCard";
import BookingModal from "@/components/doctors/BookingModal";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedConsultationType, setSelectedConsultationType] = useState("all");
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<DoctorProfile | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doc) => {
      if (selectedSpecialty !== "all" && doc.specialty !== selectedSpecialty) return false;
      if (selectedConsultationType !== "all") {
        if (selectedConsultationType === "Online" && doc.consultationType === "Nearby Offline") return false;
        if (selectedConsultationType === "Nearby Offline" && doc.consultationType === "Online") return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          doc.name.toLowerCase().includes(q) ||
          doc.specialty.toLowerCase().includes(q) ||
          doc.subSpecialty.toLowerCase().includes(q) ||
          doc.hospital.toLowerCase().includes(q) ||
          doc.bio.toLowerCase().includes(q) ||
          doc.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedSpecialty, selectedConsultationType]);

  const handleOpenBooking = (doctor: DoctorProfile) => {
    setSelectedDoctorForBooking(doctor);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (summary: { doctorName: string; date: string; slot: string; mode: string }) => {
    setToastMessage(`Confirmed with ${summary.doctorName} · ${summary.date} at ${summary.slot}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Sub-nav header */}
      <header style={{ borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "#000", zIndex: 40 }}>
        <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
          <Link
            href="/dashboard"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", color: "#707070", textDecoration: "none", fontWeight: 500 }}
            className="link-underline"
          >
            <ArrowLeft size={14} />
            Dashboard
          </Link>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#505050" }}>
            Specialist Network
          </span>
          <Link href="/" style={{ fontSize: "0.8125rem", color: "#707070", textDecoration: "none" }} className="link-underline">
            Home
          </Link>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Toast */}
        {toastMessage && (
          <div className="toast-mono">
            <CheckCircle2 size={16} />
            {toastMessage}
          </div>
        )}

        {/* Hero */}
        <div style={{ borderBottom: "1px solid #1a1a1a", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container-editorial">
            <p className="label-upper" style={{ marginBottom: "1.5rem" }}>Doctor Discovery &amp; Consultation</p>
            <h1 className="display-lg" style={{ color: "#fff", maxWidth: "700px", marginBottom: "1.5rem" }}>
              Your specialist,<br />
              <span style={{ color: "#505050" }}>when you need them.</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: "480px" }}>
              Verified physicians, dietitians, and psychologists. Online or in-clinic — same day.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ borderBottom: "1px solid #1a1a1a", padding: "2.5rem 0" }}>
          <div className="container-editorial">
            <DoctorFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedSpecialty={selectedSpecialty}
              onSelectSpecialty={setSelectedSpecialty}
              selectedConsultationType={selectedConsultationType}
              onSelectConsultationType={setSelectedConsultationType}
              resultCount={filteredDoctors.length}
            />
          </div>
        </div>

        {/* Results */}
        <div className="container-editorial" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
          {filteredDoctors.length > 0 ? (
            <div>
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} onBookAppointment={handleOpenBooking} />
              ))}
            </div>
          ) : (
            <div style={{ paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" }}>
              <p className="display-sm" style={{ color: "#303030", marginBottom: "1rem" }}>No results</p>
              <p className="body-sm" style={{ marginBottom: "2rem" }}>
                No specialists matched &ldquo;{searchQuery}&rdquo;. Try clearing your filters.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedSpecialty("all"); setSelectedConsultationType("all"); }}
                className="btn-ghost btn-sm"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>

      <BookingModal
        doctor={selectedDoctorForBooking}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      <Footer />
    </div>
  );
}
