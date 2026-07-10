"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Target Date: August 1, 2026, 5:30 PM IST (UTC+05:30)
    const targetDate = new Date("2026-08-01T17:30:00+05:30");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsCompleted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    // Loading state during hydration
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="h-6 w-6 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-[#B58A3A]/5 to-transparent relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-xs tracking-[0.3em] text-gold uppercase mb-8 font-semibold">
          Count Down to the Big Day
        </h2>

        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-script text-4xl md:text-5xl text-gold-dark"
          >
            Happily Married, Alhamdulillah!
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto justify-center">
            {timeBlocks.map((block) => (
              <motion.div
                key={block.label}
                className="glassmorphism bg-[#FDFDFD]/90 p-4 sm:p-6 rounded-2xl border border-gold/20 shadow-wedding flex flex-col items-center relative overflow-hidden"
                whileHover={{ y: -5, borderColor: "rgba(181, 138, 58, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Visual subtle divider background pattern */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                
                {/* Digit Value */}
                <div className="h-16 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={block.value}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="font-serif text-4xl md:text-5xl font-bold gold-gradient-text"
                    >
                      {String(block.value).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Separator Line */}
                <div className="w-8 h-[1px] bg-gold/20 my-2" />

                {/* Label */}
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 font-semibold">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
