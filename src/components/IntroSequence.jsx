import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  "Initializing System...",
  "Loading Modules...",
  "Access Granted"
];

// Simple Web Audio API beep
const playBeep = (freq, type = 'sine') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Audio might be blocked by browser policy without user interaction, which is fine
  }
};

export default function IntroSequence({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Muted by default, but attempts to play if browser allows
    const t1 = setTimeout(() => {
      setStep(1);
      playBeep(600);
    }, 800);
    
    const t2 = setTimeout(() => {
      setStep(2);
      playBeep(800, 'square');
    }, 1600);
    
    const t3 = setTimeout(() => {
      setStep(3);
      playBeep(1200);
    }, 2400);
    
    const t4 = setTimeout(() => onComplete(), 2800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 grid-overlay opacity-20" />
      
      {/* Scanline for extra cinematic feel */}
      <div className="scanlines" />
      <div className="noise" />

      <div className="relative font-mono text-sm sm:text-base md:text-xl text-accent/80 uppercase tracking-widest text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="0"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
            >
              {lines[0]}
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              key="1"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
            >
              {lines[1]}
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="2"
              className="text-accent font-bold glow-text-accent glitch-text"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
            >
              {lines[2]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-slate-mid/30 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: step >= 2 ? 1 : step === 1 ? 0.6 : 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}
