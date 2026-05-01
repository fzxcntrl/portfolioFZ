import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function ProfileAttribute({ label, value, isLast }) {
  return (
    <div className={`flex flex-col items-center gap-2 py-3.5 text-center w-full ${!isLast ? 'border-b border-slate-mid/50' : ''}`}>
      <span className="text-[10px] sm:text-[11px] font-mono text-steel tracking-[0.3em] uppercase shrink-0">
        {label}
      </span>
      <span className="w-full max-w-full text-xs sm:text-sm font-medium text-ghost break-words whitespace-normal text-center leading-relaxed">
        {value}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 1, y: 0, clearProps: "filter" });

      // Reversible section entrance without ever hiding the entire section on exit
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 100, filter: "blur(0px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );

      // Keep the section visible while preserving subtle cinematic drift
      gsap.to(contentRef.current, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".about-heading", {
        y: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.set(".profile-card", { opacity: 1, x: 0 });
      gsap.set(".bio-card", { opacity: 1, x: 0 });

      gsap.fromTo(".profile-card",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(".bio-card",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );

      // Parallax for decorative elements
      gsap.to(".about-deco-1", {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".about-deco-2", {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding grid-overlay overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      {/* Decorative elements */}
      <div className="about-deco-1 absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="about-deco-2 absolute bottom-20 left-10 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      <div ref={contentRef} className="content-shell relative z-10 text-center">
        {/* Section Header */}
        <div className="about-heading mb-16 md:mb-20 pt-6" ref={headingRef}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
            <span className="text-xs font-mono text-accent tracking-[0.4em] uppercase">
              01 — Player Profile
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ghost mt-2">
            About <span className="text-gradient-accent">Me</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="mx-auto mt-14 grid w-full items-center justify-items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Profile Card */}
          <motion.div
            whileHover={{ scale: 1.01, y: -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="profile-card glass group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] p-8 text-center transition-all duration-500 sm:p-12 mt-4 hover:shadow-[0_24px_90px_rgba(185,28,28,0.12)] hover:bg-white/90"
            style={{ border: '1px solid #b91c1c' }}
            data-cursor-hover
          >
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent/30" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent/30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent/30" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent/30" />

            <div className="mb-10 mt-2 flex flex-col items-center gap-5">
              {/* Avatar placeholder with initials */}
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-accent/20 bg-gradient-to-br from-accent/20 to-accent/10 shadow-lg">
                <span className="font-display text-3xl font-bold text-accent">
                  FN
                </span>
              </div>
              <div className="mt-1">
                <h3 className="font-display text-3xl font-semibold text-ghost tracking-tight">
                  {profile.name}
                </h3>
                <p className="mt-2 text-sm font-mono text-accent/70">
                  @farzainnaikwade
                </p>
              </div>
            </div>

            {/* Attributes */}
            <div className="mx-auto w-full max-w-lg rounded-[1.25rem] border border-slate-mid/40 bg-white/45 px-5 py-3 text-center sm:px-6 flex flex-col items-center">
              <ProfileAttribute label="Class" value={profile.title} />
              <ProfileAttribute label="Region" value={profile.location} />
              <ProfileAttribute label="Status" value="Open to Opportunities" />
              <ProfileAttribute label="Focus" value="Full-Stack Apps" isLast />
            </div>
          </motion.div>

          {/* Bio Card */}
          <motion.div
            whileHover={{ scale: 1.01, y: -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bio-card glass flex h-full w-full flex-col justify-center rounded-[1.75rem] p-8 text-center transition-all duration-500 sm:p-12 mt-4 hover:shadow-[0_24px_90px_rgba(185,28,28,0.12)] hover:bg-white/90"
            style={{ border: '1px solid #b91c1c' }}
            data-cursor-hover
          >
            <div>
              <div className="mb-5 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                <span className="text-xs font-mono text-accent tracking-widest uppercase">
                  System Log
                </span>
              </div>
              <p className="mx-auto max-w-xl text-center text-base leading-8 text-ghost/85 sm:text-lg">
                {profile.bio}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
