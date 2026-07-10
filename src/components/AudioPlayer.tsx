"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    // Using a soft royalty-free acoustic piano background track
    const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Check local fallback
    const checkLocalAudio = async () => {
      try {
        const res = await fetch("/audio/wedding-bg.mp3", { method: "HEAD" });
        if (res.ok) {
          audio.src = "/audio/wedding-bg.mp3";
        }
      } catch (err) {
        // Fallback to online default if local fetch fails
      }
    };
    checkLocalAudio();

    const handlePlayTrigger = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        setIsMuted(false);
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Failed playing audio on event trigger:", err));
      }
    };

    window.addEventListener("play-wedding-audio", handlePlayTrigger);

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("play-wedding-audio", handlePlayTrigger);
    };
  }, []);

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      // First time playing, unmute and play
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay prevented by browser, playing muted:", err);
        audioRef.current!.muted = true;
        setIsMuted(true);
        audioRef.current!.play();
        setIsPlaying(true);
      });
    } else {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    
    if (newMuted) {
      // If we muted, keep playing in background but silent
    } else {
      // If we unmuted, make sure it is playing
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Generate floating notes when playing
  const [notes, setNotes] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    if (!isPlaying || isMuted) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const id = Date.now();
      const style: React.CSSProperties = {
        left: `${Math.random() * 20 - 10}px`,
        bottom: "40px",
        fontSize: `${Math.random() * 10 + 12}px`,
        opacity: 0,
      };

      setNotes((prev) => [...prev.slice(-5), { id, style }]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">
      {/* Floating Notes Animation */}
      <AnimatePresence>
        {notes.map((note) => (
          <motion.span
            key={note.id}
            className="absolute text-gold pointer-events-none select-none"
            style={note.style}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], y: -50, x: Math.random() * 30 - 15, scale: [0.5, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            ♩
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Main Music Control Button */}
      <motion.button
        onClick={handleToggle}
        className="glassmorphism flex items-center justify-center h-12 w-12 rounded-full cursor-pointer shadow-wedding text-gold hover:text-gold-dark hover:scale-105 transition-all duration-300 relative group"
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {/* Vinyl record rotation effect */}
        {isPlaying && !isMuted && (
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-gold/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}

        <Music className={`h-5 w-5 ${isPlaying && !isMuted ? "animate-pulse" : ""}`} />

        {/* Small tooltip */}
        <span className="absolute right-14 bg-white/90 backdrop-blur-sm text-[#222] text-xs py-1 px-2.5 rounded-md border border-gold/20 shadow-wedding font-sans whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
          {isPlaying ? (isMuted ? "Unmute track" : "Mute background music") : "Play wedding music"}
        </span>
      </motion.button>

      {/* Secondary Mute Button, only visible when playing */}
      {isPlaying && (
        <motion.button
          onClick={handleMuteToggle}
          className="glassmorphism flex items-center justify-center h-9 w-9 rounded-full cursor-pointer shadow-wedding text-gold-dark/80 hover:text-gold hover:scale-105 transition-all duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.95 }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </motion.button>
      )}
    </div>
  );
}
