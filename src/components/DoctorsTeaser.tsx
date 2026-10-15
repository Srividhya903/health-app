"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Star,
  Video,
  Clock,
  ShieldCheck,
  Calendar,
  Award,
  ChevronRight,
  Filter,
  CheckCircle,
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: "cardiology" | "neurology" | "nutrition" | "primary";
  specialtyLabel: string;
  hospital: string;
  experience: string;
  rating: number;
  reviews: number;
  status: "online" | "available_soon";
  nextSlot: string;
  fee: string;
  avatarInitials: string;
  avatarColor: string;
}

const doctorsList: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Chen, MD",
    title: "Chief of Preventative Cardiology",
    specialty: "cardiology",
    specialtyLabel: "Cardiology",
    hospital: "Stanford Medicine Affiliate",
    experience: "14 yrs exp",
    rating: 4.98,
    reviews: 412,
    status: "online",
    nextSlot: "Available Now (in 3 mins)",
    fee: "$0 copay / $45",
    avatarInitials: "SC",
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "doc-2",
    name: "Dr. Alexander Patel, MD, PhD",
    title: "Metabolic & Clinical Endocrinologist",
    specialty: "nutrition",
    specialtyLabel: "Endocrine & Nutrition",
    hospital: "Mayo Clinic Alum",
    experience: "12 yrs exp",
    rating: 4.95,
    reviews: 388,
    status: "online",
    nextSlot: "Today, 2:15 PM",
    fee: "$0 copay / $50",
    avatarInitials: "AP",
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "doc-3",
    name: "Dr. Elena Rostova, MD",
    title: "Neurovascular & Sleep Medicine Specialist",
    specialty: "neurology",
    specialtyLabel: "Neurology & Sleep",
    hospital: "Johns Hopkins Fellow",
    experience: "16 yrs exp",
    rating: 4.99,
    reviews: 520,
    status: "available_soon",
    nextSlot: "Today, 4:00 PM",
    fee: "$0 copay / $55",
    avatarInitials: "ER",
    avatarColor: "from-purple-500 to-indigo-600",
  },
  {
    id: "doc-4",
    name: "Dr. Marcus Vance, DO",
    title: "Family Medicine & Longevity Physician",
    specialty: "primary",
    specialtyLabel: "Primary & Longevity",
    hospital: "Harvard Medical Faculty",
    experience: "11 yrs exp",
    rating: 4.93,
    reviews: 295,
    status: "online",
    nextSlot: "Available Now",
    fee: "$0 copay / $40",
    avatarInitials: "MV",
    avatarColor: "from-amber-500 to-orange-600",
  },
];

interface DoctorsTeaserProps {
  onBookDoctor?: (doctorName: string) => void;
}

export default function DoctorsTeaser({ onBookDoctor }: DoctorsTeaserProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [bookedDoc, setBookedDoc] = useState<string | null>(null);

  const filteredDoctors =
    selectedSpecialty === "all"
      ? doctorsList
      : doctorsList.filter((doc) => doc.specialty === selectedSpecialty);

  const handleBook = (name: string) => {
    setBookedDoc(name);
    onBookDoctor?.(name);
    setTimeout(() => {
      setBookedDoc(null);
    }, 4000);
  };

  return (
    <section id="doctors" className="py-24 sm:py-32 relative bg-[#060a13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Board-Certified Clinical Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Consult With Top Doctors,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              In Minutes Not Weeks
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Direct high-definition telehealth with credentialed US &amp; EU medical specialists.
            Pre-briefed with your AI health history before the call begins.
          </p>
        </div>

        {/* Confirmation Banner if booked */}
        {bookedDoc && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold">
                Consultation slot reserved with {bookedDoc}! Patient Intake &amp; AI summary prepared.
              </span>
            </div>
            <span className="text-xs text-emerald-300 font-bold">Encrypted Room ID Generated</span>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Specialists" },
            { id: "cardiology", label: "Cardiology" },
            { id: "nutrition", label: "Endocrine & Diet" },
            { id: "neurology", label: "Neurology & Sleep" },
            { id: "primary", label: "Primary Care & Longevity" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSpecialty(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedSpecialty === tab.id
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="glass-panel rounded-3xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30"
            >
              <div>
                {/* Doctor Header & Avatar */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${doc.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-md`}
                    >
                      {doc.avatarInitials}
                    </div>
                    {doc.status === "online" && (
                      <span
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900"
                        title="Online for instant consultation"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-amber-300 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 text-[10px]">({doc.reviews})</span>
                  </div>
                </div>

                {/* Name & Specialty */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {doc.name}
                </h3>
                <p className="text-xs text-cyan-400 font-medium mt-0.5">{doc.title}</p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Award className="w-3 h-3 text-slate-400" />
                  <span>{doc.hospital}</span>
                </p>

                {/* Badges */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    {doc.nextSlot}
                  </span>
                  <span className="text-[11px] font-bold text-slate-300">{doc.fee}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5">
                <button
                  onClick={() => handleBook(doc.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800/90 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-teal-500 border border-slate-700/80 group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Instant Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Specialists Button */}
        <div className="mt-10 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 shadow-xl shadow-cyan-500/25 transition-all duration-300 text-sm cursor-pointer"
          >
            <span>Explore All Specialists &amp; Book Online</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctor Verification Guarantee Footnote */}
        <div className="mt-12 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Medical Licenses
          </span>
          <span>•</span>
          <span>Malpractice Insurance Covered</span>
          <span>•</span>
          <span>Automatic EHR &amp; Lab Order Integration</span>
        </div>
      </div>
    </section>
  );
}
