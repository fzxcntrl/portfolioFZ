import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { profile } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

/* ─── Scan Line Overlay ─── */
function ScanLine() {
  return (
    <motion.div
      initial={{ top: "-4%" }}
      animate={{ top: "104%" }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-[2px] pointer-events-none z-20"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(204,0,0,0.07) 20%, rgba(204,0,0,0.13) 50%, rgba(204,0,0,0.07) 80%, transparent 100%)",
      }}
    />
  );
}

/* ─── Horizontal HUD Divider ─── */
function HudDivider({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="w-1.5 h-1.5 rotate-45 border border-accent/30" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </div>
  );
}

export default function Hero({ introDone }) {
  const sectionRef = useRef(null);
  const mainContentRef = useRef(null);
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.2, offset: -88 });
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ─── GSAP scroll-driven animations ─── */
  useEffect(() => {
    if (!introDone || !sectionRef.current) return;

    let ctx;

    // small delay to let Framer Motion finish its entrance
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        /* main hero content fades out + pushes up */
        gsap.fromTo(
          ".hero-scroll-wrapper",
          { y: 0, opacity: 1, scale: 1 },
          {
            y: -180,
            opacity: 0,
            scale: 0.85,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "15% top",
              end: "85% top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        /* corner brackets spread outward */
        gsap.fromTo(
          ".hero-corner",
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 1.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "15% top",
              end: "50% top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        /* scroll indicator */
        gsap.fromTo(
          ".scroll-indicator",
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: 30,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "8% top",
              end: "25% top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        /* Ambient glow orbs parallax */
        gsap.to(".hero-orb-1", {
          y: -160,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".hero-orb-2", {
          y: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    }, 300);

    return () => {
      clearTimeout(timeout);
      ctx?.revert();
    };
  }, [introDone]);

  /* ─── Entrance animation variants ─── */
  const containerV = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  const childFadeUp = {
    hidden: { opacity: 0, y: 50, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const childFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      {/* ── Background layers ── */}



      {/* 2. Subtle animated grid lines (CSS) */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* 3. Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-void)_75%)] pointer-events-none" />

      {/* 4. Top-to-bottom gradient (fades hero into next section) */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-transparent to-void pointer-events-none" />

      {/* 5. Center glow  */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_45%,rgba(204,0,0,0.04)_0%,transparent_100%)] pointer-events-none" />

      {/* 6. Ambient orbs */}
      <div className="hero-orb-1 absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />
      <div className="hero-orb-2 absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[140px] pointer-events-none" />

      {/* 7. Scan line */}
      <ScanLine />

      {/* ── Corner HUD brackets ── */}
      <div className="hero-corner absolute top-5 left-5 sm:top-8 sm:left-8 w-10 h-10 sm:w-14 sm:h-14 border-l-2 border-t-2 border-accent/15 pointer-events-none" />
      <div className="hero-corner absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 border-r-2 border-t-2 border-accent/15 pointer-events-none" />
      <div className="hero-corner absolute bottom-5 left-5 sm:bottom-8 sm:left-8 w-10 h-10 sm:w-14 sm:h-14 border-l-2 border-b-2 border-accent/15 pointer-events-none" />
      <div className="hero-corner absolute bottom-5 right-5 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 border-r-2 border-b-2 border-accent/15 pointer-events-none" />

      {/* ── Content ── */}
      <div className="content-shell relative z-10 flex w-full justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 hero-scroll-wrapper">
        <AnimatePresence mode="wait">
          {introDone && (
            <motion.div
              key="main"
              ref={mainContentRef}
              className="hero-content-main mx-auto flex w-full max-w-5xl flex-col items-center text-center"
              variants={containerV}
              initial="hidden"
              animate="visible"
            >
              {/* Status badge */}
              <motion.div variants={childFade} className="flex justify-center mb-10">
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_8px_rgba(204,0,0,0.8)]" />
                  </span>
                  <span className="text-xs font-mono text-accent/90 tracking-[0.25em] uppercase">
                    System Online
                  </span>
                </div>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={childFadeUp}
                className="mb-8 font-display font-extrabold leading-[0.9] tracking-tighter"
              >
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ghost">
                  {profile.name.split(" ")[0]}
                </span>
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gradient-accent glow-text-accent mt-1 sm:mt-2">
                  {profile.name.split(" ").slice(1).join(" ")}
                </span>
              </motion.h1>

              {/* Divider */}
              <motion.div variants={childFade}>
                <HudDivider className="max-w-xs mx-auto mb-7" />
              </motion.div>

              {/* Title */}
              <motion.p
                variants={childFade}
                className="font-mono text-sm sm:text-base text-steel tracking-[0.35em] uppercase mb-4"
              >
                {profile.title}
              </motion.p>

              {/* ── Tagline — centered hero statement ── */}
              <motion.p
                variants={childFade}
                className="mx-auto mb-16 max-w-4xl text-center font-display text-2xl font-bold leading-tight tracking-tight text-ghost/85 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Building digital experiences that push boundaries.
              </motion.p>

              {/* ── CTA Buttons — full-width stretch ── */}
              <motion.div
                variants={childFade}
                className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-3xl mx-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("projects")}
                  data-cursor-hover
                  className="group relative w-full sm:w-[19rem] py-6 bg-accent text-white font-mono text-base sm:text-lg tracking-[0.2em] uppercase rounded-xl overflow-hidden transition-all duration-300 hover:bg-accent-dark shadow-xl hover:shadow-accent/40"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative">View Projects</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("contact")}
                  data-cursor-hover
                  className="w-full sm:w-[19rem] py-6 border-2 border-ghost/25 text-ghost font-mono text-base sm:text-lg tracking-[0.2em] uppercase rounded-xl hover:bg-ghost/8 hover:border-ghost/50 transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll Indicator ── */}
      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="scroll-indicator absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          >
            <span className="text-sm font-mono font-bold text-steel/60 tracking-[0.3em] uppercase">
              Scroll to Explore
            </span>
            <div className="relative w-6 h-10 rounded-full border-2 border-steel/30 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(204,0,0,0.8)]"
              />
            </div>
            {/* Pulsing ring around the capsule */}
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-12 rounded-full border border-accent/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom edge fade (transition into About) ── */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-void to-transparent pointer-events-none z-10" />
    </section>
  );
}
