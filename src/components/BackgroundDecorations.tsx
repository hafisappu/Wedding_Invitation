"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundDecorations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate deterministic-looking random values to avoid SSR mismatch
  const bokehParticles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -10,
  }));

  const sparkleParticles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * -5,
    scale: Math.random() * 0.6 + 0.4,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Soft color washes in background */}
      <div className="absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-[#B58A3A]/3 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[50vw] w-[50vw] rounded-full bg-[#E5D3B3]/4 blur-[120px]" />

      {/* Bokeh circles */}
      {bokehParticles.map((bokeh) => (
        <motion.div
          key={`bokeh-${bokeh.id}`}
          className="absolute rounded-full bg-[#E5D3B3]/10 mix-blend-multiply blur-md"
          style={{
            width: bokeh.size,
            height: bokeh.size,
            left: `${bokeh.x}%`,
            top: `${bokeh.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: bokeh.duration,
            delay: bokeh.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Elegant Line-Art Gold Floral Corners */}
      {/* Top Left Corner */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-56 md:h-56 opacity-25">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gold">
          <path
            d="M0,0 Q30,10 40,40 Q10,30 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M0,0 Q15,40 50,50 Q40,15 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M0,0 Q60,15 70,25"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Detailed leaf patterns */}
          <path d="M40,40 Q45,35 48,25 Q38,28 40,40 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
          <path d="M50,50 Q58,43 65,30 Q53,38 50,50 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
          <path d="M70,25 Q75,20 78,12 Q68,17 70,25 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-25 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gold">
          <path
            d="M0,0 Q30,10 40,40 Q10,30 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M0,0 Q15,40 50,50 Q40,15 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M0,0 Q60,15 70,25"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path d="M40,40 Q45,35 48,25 Q38,28 40,40 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
          <path d="M50,50 Q58,43 65,30 Q53,38 50,50 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-56 md:h-56 opacity-25 transform scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gold">
          <path
            d="M0,0 Q30,10 40,40 Q10,30 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M0,0 Q15,40 50,50 Q40,15 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path d="M40,40 Q45,35 48,25 Q38,28 40,40 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
          <path d="M50,50 Q58,43 65,30 Q53,38 50,50 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-25 transform scale-x-[-1] scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gold">
          <path
            d="M0,0 Q30,10 40,40 Q10,30 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M0,0 Q15,40 50,50 Q40,15 0,0 Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path d="M40,40 Q45,35 48,25 Q38,28 40,40 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
          <path d="M50,50 Q58,43 65,30 Q53,38 50,50 Z" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />
        </svg>
      </div>

      {/* Sparkling stars */}
      {sparkleParticles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute text-gold-light"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, sparkle.scale, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Custom SVG Sparkle Star shape */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-[0_0_2px_rgba(229,211,179,0.8)]"
          >
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
