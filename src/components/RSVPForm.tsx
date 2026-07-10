"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, User, Phone, Users, Send } from "lucide-react";
import { submitRSVP } from "@/app/actions/rsvp";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (attending === null) newErrors.attending = "Please let us know if you will attend.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerGoldConfetti = () => {
    // Custom premium gold & white confetti burst
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#B58A3A", "#E5D3B3", "#8C6215", "#FFFFFF"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await submitRSVP({
        name,
        phone,
        guests: Number(guests),
        attending: attending === true,
      });

      if (response.success) {
        setSubmitStatus({ success: true, message: response.message });
        triggerGoldConfetti();
        // Reset form
        setName("");
        setPhone("");
        setGuests(1);
        setAttending(null);
      } else {
        setSubmitStatus({ success: false, message: response.message });
      }
    } catch (err: any) {
      setSubmitStatus({
        success: false,
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 max-w-lg mx-auto relative z-10 select-none">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-sans text-[11px] tracking-[0.25em] text-gold font-semibold uppercase mb-2 block">
          Be Our Guest
        </span>
        <h2 className="font-serif text-3xl text-[#222] font-semibold">
          Confirm Attendance
        </h2>
        <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
      </div>

      {/* RSVP Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glassmorphism bg-[#FDFDFD]/90 p-5 sm:p-8 md:p-10 rounded-2xl border border-gold/25 shadow-premium relative overflow-hidden"
      >
        <div className="absolute inset-1.5 border border-gold/10 rounded-xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Name Field */}
          <div>
            <label className="font-sans text-xs tracking-wider uppercase text-gold-dark font-medium block mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gold/60" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/25 bg-white/70 text-sm focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold font-sans placeholder-stone-400 transition-all duration-300"
              />
            </div>
            {errors.name && (
              <span className="text-red-500 font-sans text-xs mt-1 block">{errors.name}</span>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="font-sans text-xs tracking-wider uppercase text-gold-dark font-medium block mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gold/60" />
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/25 bg-white/70 text-sm focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold font-sans placeholder-stone-400 transition-all duration-300"
              />
            </div>
            {errors.phone && (
              <span className="text-red-500 font-sans text-xs mt-1 block">{errors.phone}</span>
            )}
          </div>

          {/* Guest Count Field */}
          <div>
            <label className="font-sans text-xs tracking-wider uppercase text-gold-dark font-medium block mb-2">
              Number of Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gold/60" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/25 bg-white/70 text-sm focus:outline-none focus:border-gold-dark focus:ring-1 focus:ring-gold font-sans transition-all duration-300 appearance-none cursor-pointer text-[#222]"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="bg-white text-[#222]">
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
              {/* Custom select arrow decoration */}
              <div className="absolute right-4 top-4.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gold/70 pointer-events-none" />
            </div>
          </div>

          {/* Attendance Choice Buttons */}
          <div>
            <label className="font-sans text-xs tracking-wider uppercase text-gold-dark font-medium block mb-3 text-center">
              Will you attend the celebration?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`py-3 rounded-xl text-xs font-semibold tracking-wider uppercase border cursor-pointer transition-all duration-300 ${
                  attending === true
                    ? "bg-gold text-white border-gold shadow-wedding"
                    : "border-gold/30 text-gold-dark hover:border-gold/60 bg-white/50"
                }`}
              >
                Yes, I Will Attend
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`py-3 rounded-xl text-xs font-semibold tracking-wider uppercase border cursor-pointer transition-all duration-300 ${
                  attending === false
                    ? "bg-[#222] text-white border-[#222] shadow-wedding"
                    : "border-gold/30 text-gold-dark hover:border-gold/60 bg-white/50"
                }`}
              >
                No, I Cannot
              </button>
            </div>
            {errors.attending && (
              <span className="text-red-500 font-sans text-xs mt-2 block text-center">
                {errors.attending}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gold hover:bg-gold-dark text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-wedding hover:shadow-premium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Submit RSVP
              </>
            )}
          </button>

          {/* Status Message feedback panel */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl text-center text-xs font-sans tracking-wide leading-relaxed border ${
                  submitStatus.success
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-semibold mb-1">
                  {submitStatus.success && <CheckCircle2 className="h-4 w-4" />}
                  {submitStatus.success ? "Success!" : "Submission Failed"}
                </div>
                {submitStatus.message}
              </motion.div>
            )}
          </AnimatePresence>

        </form>
      </motion.div>
    </section>
  );
}
