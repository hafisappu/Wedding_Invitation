"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Share2 } from "lucide-react";
import { toPng } from "html-to-image";

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadInvitation = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      // Small delay to ensure styles are ready
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        backgroundColor: "#F8F7F4", // Ensure the card matches our background theme
        style: {
          transform: "scale(1)",
          boxShadow: "none",
          borderRadius: "0px",
        },
        pixelRatio: 2, // Retain high quality
      });

      const link = document.createElement("a");
      link.download = "Safrad_Sheyba_Wedding_Invitation.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting invitation image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: "Safrad & Sheyba Wedding Invitation",
        text: "You are cordially invited to the wedding of Safrad & Sheyba on August 1, 2026. Join us!",
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied to clipboard! You can now paste and share it.");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-4 py-12 md:py-16 overflow-hidden">
      <div className="w-full flex-grow flex items-center justify-center">
        {/* Animated Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg md:max-w-xl relative z-10"
        >
          {/* Card Border glow */}
          <div className="absolute inset-0 bg-gold/5 blur-xl rounded-2xl pointer-events-none" />

          {/* Invitation Card */}
          <div
            ref={cardRef}
            className="glassmorphism bg-[#FDFDFD] p-5 sm:p-8 md:p-12 rounded-2xl border border-gold/30 shadow-premium text-center relative overflow-hidden"
          >
            {/* Elegant double-line inner border */}
            <div className="absolute inset-3 sm:inset-4 border border-gold/20 pointer-events-none rounded-xl" />
            <div className="absolute inset-[14px] sm:inset-[18px] border border-gold/10 pointer-events-none rounded-xl" />

            {/* Corner Ornaments inside border */}
            <div className="absolute top-4 left-4 w-4 h-4 sm:top-6 sm:left-6 sm:w-6 sm:h-6 border-t border-l border-gold/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 sm:top-6 sm:right-6 sm:w-6 sm:h-6 border-t border-r border-gold/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 sm:bottom-6 sm:left-6 sm:w-6 sm:h-6 border-b border-l border-gold/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 sm:bottom-6 sm:right-6 sm:w-6 sm:h-6 border-b border-r border-gold/40 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              
              {/* Bismillah Calligraphy (Native Arabic Amiri Font) */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="my-3 select-all"
                dir="rtl"
              >
                <span className="font-arabic text-3xl md:text-[38px] text-gold-dark/95 tracking-normal leading-relaxed block drop-shadow-[0_1px_1px_rgba(181,138,58,0.15)] font-medium">
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </span>
              </motion.div>

              {/* Quran Verse */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-col gap-2 max-w-md"
              >
                <span className="font-serif italic text-lg md:text-xl text-[#222] font-semibold leading-relaxed">
                  &ldquo;And We Created You In Pairs&rdquo;
                </span>
                <span className="font-sans text-xs tracking-wider text-gold font-medium uppercase">
                  (Surah An-Naba 78:8)
                </span>
              </motion.div>

              {/* Elegant Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent my-1"
              />

              {/* TOGETHER WITH THEIR FAMILIES */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="font-sans text-xs tracking-[0.25em] text-gold-dark/80 font-semibold uppercase"
              >
                Together with their families
              </motion.span>

              {/* Couples Names */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="flex flex-col items-center gap-1 my-2 select-none"
              >
                <h1 className="font-script text-5xl md:text-7xl text-gold-dark/95 leading-none transition-all duration-300 hover:scale-102 cursor-default filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                  Safrad
                </h1>
                <span className="font-serif italic text-2xl md:text-3xl text-gold/80 my-1 font-light">
                  &amp;
                </span>
                <h1 className="font-script text-5xl md:text-7xl text-gold-dark/95 leading-none transition-all duration-300 hover:scale-102 cursor-default filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                  Sheyba
                </h1>
              </motion.div>

              {/* Invitation Message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="font-sans text-sm text-[#444] leading-relaxed max-w-sm md:max-w-md font-light"
              >
                Your presence and blessings will make this occasion even more special.
              </motion.p>
            </div>
          </div>

          {/* Luxury Card Action Buttons (Under the Card) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 mt-8 max-w-xs sm:max-w-none mx-auto w-full sm:w-auto px-4 sm:px-0 select-none"
          >
            <button
              onClick={downloadInvitation}
              disabled={isDownloading}
              className="glassmorphism flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-gold-dark border border-gold/40 shadow-wedding hover:bg-gold hover:text-white hover:border-gold hover:shadow-premium transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Generating Image..." : "Download Invitation"}
            </button>
            <button
              onClick={shareInvitation}
              className="glassmorphism flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-gold-dark border border-gold/40 shadow-wedding hover:bg-gold hover:text-white hover:border-gold hover:shadow-premium transition-all duration-300 cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              Share Link
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity }}
        className="flex flex-col items-center gap-1 select-none pointer-events-none pb-4"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold">
          Scroll Down
        </span>
        <ChevronDown className="h-4 w-4 text-gold" />
      </motion.div>
    </section>
  );
}
