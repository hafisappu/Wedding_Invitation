"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FamilySection() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <span className="font-sans text-[11px] tracking-[0.25em] text-gold font-semibold uppercase mb-2 block">
          Meet the Families
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#222] font-semibold">
          The Families
        </h2>
        <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
        
        {/* GROOM'S SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="glassmorphism bg-[#FDFDFD] p-6 sm:p-8 md:p-10 rounded-2xl border border-gold/20 shadow-wedding text-center relative overflow-hidden"
        >
          {/* Top aesthetic floral accent line */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute inset-2 border border-gold/5 rounded-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold font-bold uppercase">
              The Groom
            </span>
            
            <h3 className="font-script text-4xl text-gold-dark leading-none">
              Safrad
            </h3>

            {/* Decorative Heart with horizontal branches */}
            <div className="flex items-center gap-4 w-full justify-center opacity-70 my-2">
              <div className="h-[0.5px] w-12 bg-gold/30" />
              <Heart className="h-4.5 w-4.5 text-gold fill-gold/10" />
              <div className="h-[0.5px] w-12 bg-gold/30" />
            </div>

            <p className="font-sans text-[#222] font-semibold text-base">
              Together with Family
            </p>
            <p className="font-sans text-stone-500 text-xs leading-relaxed max-w-xs font-light">
              We look forward to welcome our guests with open hearts and sharing the joy of our son&apos;s beginning of a blessed new journey.
            </p>
          </div>
        </motion.div>

        {/* BRIDE'S SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="glassmorphism bg-[#FDFDFD] p-6 sm:p-8 md:p-10 rounded-2xl border border-gold/20 shadow-wedding text-center relative overflow-hidden"
        >
          {/* Top aesthetic floral accent line */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="absolute inset-2 border border-gold/5 rounded-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold font-bold uppercase">
              The Bride
            </span>
            
            <h3 className="font-script text-4xl text-gold-dark leading-none">
              Sheyba
            </h3>

            {/* Decorative Heart with horizontal branches */}
            <div className="flex items-center gap-4 w-full justify-center opacity-70 my-2">
              <div className="h-[0.5px] w-12 bg-gold/30" />
              <Heart className="h-4.5 w-4.5 text-gold fill-gold/10" />
              <div className="h-[0.5px] w-12 bg-gold/30" />
            </div>

            <p className="font-sans text-[#222] font-semibold text-base">
              Together with Family
            </p>
            <p className="font-sans text-stone-500 text-xs leading-relaxed max-w-xs font-light">
              We invite you to share our happiness and shower our daughter with blessings as she embarks on this beautiful path of companionship.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
