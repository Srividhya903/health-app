"use client";

import React, { useState } from "react";
import { DoctorProfile } from "@/data/doctorsData";
import {
  X,
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface BookingModalProps {
  doctor: DoctorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: (bookingSummary: {
    doctorName: string;
    date: string;
    slot: string;
    mode: string;
  }) => void;
}

export default function BookingModal({
  doctor,
  isOpen,
  onClose,
  onBookingSuccess,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [consultMode, setConsultMode] = useState<"Online" | "Offline">("Online");
  const [reason, setReason] = useState<string>("");
  const [useInsurance, setUseInsurance] = useState<boolean>(true);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>("");

  if (!isOpen || !doctor) return null;

  // Initialize defaults if not set
  const activeDate = selectedDate || doctor.availableDates[0];
  const activeSlot = selectedSlot || doctor.availableSlots[0];

  const quickReasons = [
    "Annual Preventative Checkup",
    "Review Lab Biomarkers & ECG",
    "Dietary Strategy for Metabolic Health",
    "Stress & Sleep Optimization",
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `AH-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(refCode);
    setIsConfirmed(true);

    onBookingSuccess?.({
      doctorName: doctor.name,
      date: activeDate,
      slot: activeSlot,
      mode: consultMode === "Online" ? "HD Video Call" : `In-Person (${doctor.location})`,
    });
  };

  const handleResetAndClose = () => {
    setIsConfirmed(false);
    setSelectedDate("");
    setSelectedSlot("");
    setReason("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#09101f] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {isConfirmed ? (
          /* CONFIRMATION SCREEN */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                Booking Confirmed • {bookingRef}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                Consultation Reserved
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1">
                Your appointment with <strong className="text-white">{doctor.name}</strong> has
                been scheduled and confirmed.
              </p>
            </div>

            {/* Appointment Details Box */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Date &amp; Time:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {activeDate} at {activeSlot}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Consultation Format:</span>
                <span className="font-semibold text-cyan-300">
                  {consultMode === "Online" ? "Secure 256-bit Video Room" : `In-Person Clinic (${doctor.location})`}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Consultation Fee:</span>
                <span className="font-bold text-emerald-400">
                  {useInsurance ? "$0 Copay (Covered by Insurance)" : doctor.consultationFee}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800">
                <span className="text-slate-400">Specialist:</span>
                <span className="font-semibold text-slate-200">{doctor.title}</span>
              </div>
            </div>

            {/* Pre-Visit AI Brief status */}
            <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2 text-left">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Your recent vitals, steps, and EHR summary will be securely shared with {doctor.name} before the session begins.
              </span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-md shadow-cyan-500/20 transition-all text-sm cursor-pointer"
            >
              Done &amp; Return to Specialists
            </button>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleConfirm} className="space-y-5">
            {/* Doctor Info Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-800">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${doctor.avatarColor} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}
              >
                {doctor.avatarInitials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{doctor.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-cyan-400 font-medium">{doctor.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{doctor.location}</span>
                </p>
              </div>
            </div>

            {/* Consultation Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Select Consultation Format
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setConsultMode("Online")}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    consultMode === "Online"
                      ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Online HD Video Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultMode("Offline")}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    consultMode === "Offline"
                      ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>In-Clinic Visit</span>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                2. Select Preferred Date
              </label>
              <div className="grid grid-cols-3 gap-2">
                {doctor.availableDates.map((dateStr) => (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      activeDate === dateStr
                        ? "bg-cyan-950 border-cyan-400 text-cyan-300 shadow-sm"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {dateStr}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>3. Available Time Slots ({activeDate})</span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-normal">
                  <Clock className="w-3 h-3" /> Real-Time Availability
                </span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {doctor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all text-center ${
                      activeSlot === slot
                        ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/40"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason for Visit */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                4. Reason for Consultation
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {quickReasons.map((qr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReason(qr)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                      reason === qr
                        ? "bg-cyan-950 text-cyan-300 border-cyan-500/40"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    {qr}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Briefly describe any symptoms, recent lab results, or specific questions..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Insurance Option */}
            <div
              onClick={() => setUseInsurance(!useInsurance)}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    useInsurance
                      ? "bg-cyan-500 border-cyan-400 text-white"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {useInsurance && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <span className="font-semibold text-white">Apply Verified Health Insurance</span>
                  <p className="text-[11px] text-slate-400">BlueCross, Aetna, Cigna, Medicare ($0 copay)</p>
                </div>
              </div>
              <span className="font-bold text-emerald-400">
                {useInsurance ? "$0.00" : doctor.consultationFee}
              </span>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                id="confirm-booking-btn"
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 shadow-xl shadow-cyan-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Appointment with {doctor.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
