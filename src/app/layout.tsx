import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraHealth AI | AI-Powered Digital Healthcare Ecosystem",
  description: "Next-generation healthcare ecosystem combining clinical AI diagnostics, personalized biometric diet planning, and instant 24/7 specialist telehealth consultations.",
  keywords: [
    "AI Healthcare",
    "Digital Health",
    "Telemedicine",
    "Diet Planner",
    "Clinical AI",
    "Doctor Consultation",
    "Biometric Health",
  ],
  authors: [{ name: "AuraHealth Technologies" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#060911] text-slate-100 antialiased selection:bg-cyan-500 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
