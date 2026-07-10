"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface TimelineItem {
  title: string;
  time: string;
  description: string;
}

export default function ScheduleTimeline() {
  const items: TimelineItem[] = [
    {
      title: "Nikah",
      time: "5:30 PM",
      description: "The sacred marriage contract ceremony, marking the official union of Safrad & Sheyba in the presence of family and witnesses.",
    },
    {
      title: "Reception",
      time: "7:00 PM",
      description: "A celebratory dinner and gathering to share blessings, feast together, and capture memorable moments with the newlyweds.",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10 select-none">
      <div className="text-center mb-16">
        <span className="font-sans text-[11px] tracking-[0.25em] text-gold font-semibold uppercase mb-2 block">
          Order of Events
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#222] font-semibold">
          Schedule Timeline
        </h2>
        <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
      </div>

      <div className="relative">
        {/* Dotted Center Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-gold/40 transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.title}
                className="relative flex items-center md:justify-between"
              >
                {/* Timeline Node Checkmark - Perfectly aligned with the dotted line */}
                <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#F8F7F4] border border-gold flex items-center justify-center text-gold shadow-wedding transform -translate-x-1/2 z-10">
                  <Check className="h-3 w-3 stroke-[3px]" />
                </div>

                {/* Content Card - Full width on mobile, half width on desktop */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${
                    isEven ? "md:text-right md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glassmorphism bg-[#FDFDFD] p-5 sm:p-6 rounded-2xl border border-gold/20 shadow-wedding hover:border-gold/45 transition-all duration-300"
                  >
                    <span className="font-sans text-[10px] sm:text-xs text-gold font-bold tracking-wider uppercase">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-gold-dark font-semibold my-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed mt-2 font-light">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
