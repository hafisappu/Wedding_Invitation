"use client";

import React from "react";
import { motion as framerMotion } from "framer-motion";
import { MapPin, Calendar, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function MapSection() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Meethalepeedikayil+Orkkateri+Vadakara";
  
  // Google Calendar URL for Aug 1, 2026 (Nikah starts at 5:30 PM IST / 12:00 PM UTC)
  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Safrad+%26+Sheyba&dates=20260801T120000Z/20260801T153000Z&details=You+are+cordially+invited+to+celebrate+the+wedding+of+Safrad+%26+Sheyba.+Please+join+us+with+your+presence+and+blessings.&location=Meethalepeedikayil,+Orkkateri,+Vadakara";

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center relative z-10">
      
      {/* Wedding Details - Luxury 3 Column Grid */}
      <framerMotion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="glassmorphism bg-[#FDFDFD] max-w-4xl mx-auto rounded-2xl border border-gold/25 p-8 md:p-12 shadow-wedding mb-16 relative overflow-hidden"
      >
        <div className="absolute inset-2 border border-gold/10 rounded-xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4 relative z-10">
          
          {/* NIKAH */}
          <div className="flex flex-col items-center">
            <span className="font-sans text-[11px] tracking-[0.25em] text-gold font-semibold uppercase mb-2">
              Nikah
            </span>
            <div className="h-[1px] w-8 bg-gold/20 mb-3" />
            <span className="font-serif text-3xl text-gold-dark font-medium">5:30 PM</span>
            <span className="font-sans text-xs text-stone-500 mt-1 tracking-wide">Saturday Evening</span>
          </div>

          {/* DATE (Center Column) */}
          <div className="flex flex-col items-center py-4 md:py-0 border-y md:border-y-0 md:border-x border-gold/25">
            <span className="font-sans text-lg tracking-[0.3em] text-stone-400 font-light mb-1">
              01
            </span>
            <span className="font-serif text-4xl font-semibold tracking-wider text-gold-dark">
              AUG
            </span>
            <span className="font-sans text-lg tracking-[0.3em] text-stone-400 font-light mt-1">
              2026
            </span>
          </div>

          {/* RECEPTION */}
          <div className="flex flex-col items-center">
            <span className="font-sans text-[11px] tracking-[0.25em] text-gold font-semibold uppercase mb-2">
              Reception
            </span>
            <div className="h-[1px] w-8 bg-gold/20 mb-3" />
            <span className="font-serif text-3xl text-gold-dark font-medium">7:00 PM</span>
            <span className="font-sans text-xs text-stone-500 mt-1 tracking-wide">Saturday Evening</span>
          </div>

        </div>

        {/* Add to Google Calendar Button */}
        <div className="mt-8 flex justify-center">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gold-dark border-b border-gold/30 hover:border-gold-dark pb-1 hover:text-gold transition-colors duration-300 group"
          >
            <Calendar className="h-4 w-4 group-hover:scale-105 transition-transform" />
            Add to Google Calendar
          </a>
        </div>
      </framerMotion.div>

      {/* Venue Section */}
      <framerMotion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Map Marker Pin Icon */}
        <div className="h-12 w-12 rounded-full bg-gold/5 flex items-center justify-center text-gold border border-gold/25 mb-4 shadow-wedding">
          <MapPin className="h-5 w-5" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl text-[#222] font-semibold mb-6">
          The Venue
        </h2>

        <address className="not-italic font-sans text-[#444] text-base leading-relaxed tracking-wide mb-8">
          <p className="font-medium text-lg text-gold-dark mb-1">Meethalepeedikayil</p>
          <p>Orkkateri, Vadakara</p>
          <p className="text-stone-500 text-sm mt-1">Kerala, India</p>
        </address>

        {/* Action button & QR Code Container */}
        <div className="flex flex-col items-center sm:flex-row gap-8 justify-center p-6 glassmorphism border border-gold/20 rounded-2xl shadow-wedding max-w-md w-full">
          {/* View map link */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <p className="font-sans text-xs text-stone-500 text-center sm:text-left leading-relaxed">
              Scan the QR code or click below to navigate directly using Google Maps.
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glassmorphism inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-gold-dark border border-gold/40 shadow-wedding hover:bg-gold hover:text-white hover:border-gold hover:shadow-premium transition-all duration-300 cursor-pointer"
            >
              View on Google Maps
            </a>
          </div>

          {/* QR Code */}
          <div className="p-3 bg-white rounded-xl border border-gold/20 shadow-inner flex items-center justify-center relative group">
            <QRCodeSVG
              value={googleMapsUrl}
              size={100}
              fgColor="#B58A3A"
              bgColor="#FFFFFF"
              level="H"
            />
            {/* Tiny decoration */}
            <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[10px] text-gold-dark">
              <QrCode className="h-3 w-3" />
            </div>
          </div>
        </div>
      </framerMotion.div>

    </section>
  );
}
