"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function Gallery() {
  const images: GalleryImage[] = [
    { src: "/gallery/ring.png", alt: "Golden Wedding Rings on Soft Roses" },
    { src: "/gallery/decor.png", alt: "Elegant White & Gold Venue Floral Arch" },
    { src: "/gallery/henna.png", alt: "Bride's Hand with Delicate Henna Designs" },
    { src: "/gallery/cake.png", alt: "Minimalist White Cake with Gold Leaf Flakes" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10 select-none">
      <div className="text-center mb-16">
        <span className="font-sans text-[11px] tracking-[0.25em] text-gold font-semibold uppercase mb-2 block">
          Sweet Memories
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#222] font-semibold">
          Visual Gallery
        </h2>
        <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
      </div>

      {/* CSS Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((image, idx) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="break-inside-avoid bg-white p-3 rounded-2xl border border-gold/15 shadow-wedding cursor-pointer overflow-hidden group"
            onClick={() => setActiveIndex(idx)}
            whileHover={{ y: -4, borderColor: "rgba(181, 138, 58, 0.35)" }}
          >
            <div className="overflow-hidden rounded-xl aspect-[4/5] relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gold luxury overlay */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur-sm text-gold-dark text-xs tracking-wider uppercase py-2 px-4 rounded-full border border-gold/20 shadow-wedding font-semibold scale-95 group-hover:scale-100 transition-transform duration-300">
                  Zoom View
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-pointer"
            onClick={() => setActiveIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50"
              title="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
              title="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
              title="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Centered Image Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image card
            >
              <div className="relative max-w-full max-h-[75vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-stone-900">
                <motion.img
                  key={activeIndex}
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  className="max-w-full max-h-[75vh] object-contain select-none pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Caption */}
              <motion.p
                key={`caption-${activeIndex}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/70 text-sm font-sans tracking-wide mt-4 text-center max-w-md px-4 font-light"
              >
                {images[activeIndex].alt}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
