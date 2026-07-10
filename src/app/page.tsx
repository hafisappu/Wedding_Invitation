"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Compass } from "lucide-react";

// Components
import BackgroundDecorations from "@/components/BackgroundDecorations";
import AudioPlayer from "@/components/AudioPlayer";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import CountdownTimer from "@/components/CountdownTimer";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import FamilySection from "@/components/FamilySection";
import RSVPForm from "@/components/RSVPForm";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    
    // Dispatch event to AudioPlayer to play music on user interaction
    setTimeout(() => {
      window.dispatchEvent(new Event("play-wedding-audio"));
    }, 100);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden select-none">
      
      {/* Background Decor Layer */}
      <BackgroundDecorations />

      {/* Floating Audio Player */}
      <AudioPlayer />

      {/* Fullscreen Entrance Card */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[100] bg-[#F8F7F4] flex flex-col justify-between items-center px-6 py-16"
          >
            {/* Elegant Background Wash */}
            <div className="absolute inset-0 bg-[#B58A3A]/3 blur-xl pointer-events-none" />

            {/* Inner Border Ornaments */}
            <div className="absolute inset-6 border border-gold/20 rounded-2xl pointer-events-none" />
            <div className="absolute inset-8 border border-gold/10 rounded-2xl pointer-events-none" />

            {/* Decorative Corner Branches */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-gold/40 pointer-events-none" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-gold/40 pointer-events-none" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-gold/40 pointer-events-none" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-gold/40 pointer-events-none" />

            {/* Header branding */}
            <div className="relative text-center mt-8">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-bold">
                The Wedding Of
              </span>
            </div>

            {/* Monogram Circular Reveal */}
            <div className="flex flex-col items-center gap-6 relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="h-24 w-24 rounded-full border border-gold/30 bg-white flex items-center justify-center shadow-wedding relative"
              >
                <div className="absolute inset-1 border border-dashed border-gold/20 rounded-full" />
                <span className="font-serif text-3xl font-light text-gold-dark">S&amp;S</span>
              </motion.div>

              {/* Couple Name */}
              <div className="text-center">
                <h1 className="font-script text-5xl text-gold-dark leading-none">
                  Safrad &amp; Sheyba
                </h1>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-3 font-semibold">
                  August 1, 2026
                </p>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="mb-8 relative z-10 flex flex-col items-center gap-4">
              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gold hover:bg-gold-dark text-white font-sans text-xs font-bold tracking-widest uppercase py-4 px-10 rounded-full shadow-wedding hover:shadow-premium transition-all duration-300 cursor-pointer flex items-center gap-2.5"
              >
                <Compass className="h-4 w-4 animate-spin-slow text-white/95" />
                Open Invitation
              </motion.button>
              <span className="font-sans text-[9px] tracking-wide text-stone-500 font-light">
                (Click to open with soft instrumental track)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Sections */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative"
        >
          {/* Main Hero Card Section */}
          <Hero />

          {/* Luxury details & map location Section */}
          <MapSection />

          {/* Wedding Countdown Timer */}
          <CountdownTimer />

          {/* Schedule of Events Timeline */}
          <ScheduleTimeline />

          {/* Family Section */}
          <FamilySection />

          {/* RSVP Attendance Form with Gold Confetti */}
          <RSVPForm />

          {/* Blessings & Closing Message */}
          <section className="py-24 px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
              
              {/* Floral element divider */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="h-[0.5px] w-8 bg-gold/40" />
                <Heart className="h-4 w-4 text-gold fill-gold/15" />
                <div className="h-[0.5px] w-8 bg-gold/40" />
              </div>

              {/* InshaAllah Script */}
              <span className="font-script text-4xl text-gold-dark">
                InshaAllah
              </span>

              {/* Invitation sentence */}
              <p className="font-serif text-lg md:text-xl text-[#222] italic font-medium max-w-sm">
                &ldquo;Looking forward to celebrating with you.&rdquo;
              </p>

              {/* Final Footer divider */}
              <div className="w-16 h-[0.5px] bg-gold/25 mt-4" />
              
              <footer className="mt-4">
                <p className="font-sans text-[10px] tracking-widest uppercase text-stone-500 font-medium">
                  #SafradWedsSheyba
                </p>
                <p className="font-sans text-[9px] text-stone-400 mt-2 font-light">
                  © 2026 Safrad &amp; Sheyba. All Rights Reserved.
                </p>
              </footer>

            </div>
          </section>

        </motion.div>
      )}
      
    </main>
  );
}
