"use client";

import React, { useState } from "react";
import { DoctorProfile } from "@/data/doctorsData";
import { X, Calendar, Clock, Video, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

interface BookingModalProps {
  doctor: DoctorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: (summary: { doctorName: string; date: string; slot: string; mode: string }) => void;
}

export default function BookingModal({ doctor, isOpen, onClose, onBookingSuccess }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [consultMode, setConsultMode] = useState<"Online" | "Offline">("Online");
  const [reason, setReason] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen || !doctor) return null;

  const activeDate = selectedDate || doctor.availableDates[0];
  const activeSlot = selectedSlot || doctor.availableSlots[0];

  const quickReasons = [
    "Annual Checkup",
    "Review Lab Results",
    "Dietary Strategy",
    "Stress & Sleep",
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AH-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsConfirmed(true);
    onBookingSuccess?.({
      doctorName: doctor.name,
      date: activeDate,
      slot: activeSlot,
      mode: consultMode === "Online" ? "HD Video Call" : `In-Person (${doctor.location})`,
    });
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setSelectedDate("");
    setSelectedSlot("");
    setReason("");
    onClose();
  };

  const selBtn = (active: boolean) => ({
    border: `1px solid ${active ? "#fff" : "#303030"}`,
    background: active ? "#fff" : "transparent",
    color: active ? "#000" : "#707070",
    cursor: "pointer" as const,
    padding: "0.625rem 1rem",
    fontSize: "0.8125rem",
    fontWeight: 600 as const,
    letterSpacing: "0.04em",
    transition: "all 0.12s",
  });

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="modal-panel" style={{ position: "relative" }}>
        {/* Close */}
        <button
          onClick={handleClose}
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#707070" }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {isConfirmed ? (
          /* Confirmation screen */
          <div style={{ textAlign: "center", paddingTop: "1rem" }}>
            <CheckCircle2 size={40} style={{ color: "#fff", margin: "0 auto 1.5rem" }} />
            <p className="label-upper" style={{ marginBottom: "0.75rem" }}>Booking confirmed · {bookingRef}</p>
            <h2 className="display-sm" style={{ color: "#fff", marginBottom: "0.5rem" }}>Consultation reserved.</h2>
            <p className="body-sm" style={{ marginBottom: "2.5rem" }}>
              Your appointment with {doctor.name} has been confirmed.
            </p>

            {/* Summary */}
            <div style={{ textAlign: "left", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", paddingTop: "1.5rem", paddingBottom: "1.5rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { label: "Date & Time", value: `${activeDate} at ${activeSlot}` },
                { label: "Format", value: consultMode === "Online" ? "Encrypted Video Room" : `In-Person · ${doctor.location}` },
                { label: "Specialist", value: doctor.title },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="label-upper">{row.label}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button onClick={handleClose} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Done <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          /* Booking form */
          <form onSubmit={handleConfirm} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Doctor header */}
            <div style={{ paddingBottom: "1.5rem", borderBottom: "1px solid #1a1a1a" }}>
              <p className="label-upper" style={{ marginBottom: "0.5rem" }}>Booking appointment</p>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em" }}>
                {doctor.name}
              </h2>
              <p className="body-sm">{doctor.title}</p>
            </div>

            {/* Mode */}
            <div>
              <p className="label-upper" style={{ marginBottom: "0.875rem" }}>1. Consultation format</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button type="button" onClick={() => setConsultMode("Online")} style={{ ...selBtn(consultMode === "Online"), flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <Video size={13} /> Online
                </button>
                <button type="button" onClick={() => setConsultMode("Offline")} style={{ ...selBtn(consultMode === "Offline"), flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <MapPin size={13} /> In-Clinic
                </button>
              </div>
            </div>

            {/* Date */}
            <div>
              <p className="label-upper" style={{ marginBottom: "0.875rem" }}>2. Date</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {doctor.availableDates.map((d) => (
                  <button key={d} type="button" onClick={() => setSelectedDate(d)} style={{ ...selBtn(activeDate === d), fontSize: "0.75rem" }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
                <p className="label-upper">3. Time slot</p>
                <span style={{ fontSize: "0.6875rem", color: "#505050", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Clock size={10} /> Live availability
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {doctor.availableSlots.map((slot) => (
                  <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} style={{ ...selBtn(activeSlot === slot), fontSize: "0.75rem" }}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <p className="label-upper" style={{ marginBottom: "0.875rem" }}>4. Reason for visit</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.875rem" }}>
                {quickReasons.map((qr) => (
                  <button key={qr} type="button" onClick={() => setReason(qr)} style={{ ...selBtn(reason === qr), fontSize: "0.6875rem" }}>
                    {qr}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Describe symptoms or questions…"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input-editorial"
                style={{ resize: "none", fontSize: "0.875rem" }}
              />
            </div>

            <button type="submit" id="confirm-booking-btn" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Confirm appointment <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
