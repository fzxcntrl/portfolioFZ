import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiInstagram, SiX, SiGithub } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 1, y: 0, clearProps: "filter" });

      gsap.fromTo(
        sectionRef.current,
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

      gsap.from(".contact-heading", {
        y: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".contact-left", {
        x: -40,
        opacity: 0,
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".contact-right", {
        x: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".connect-btn", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".connect-links-wrapper",
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const mailtoLink = `mailto:farzainnaikwade@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="content-shell relative z-10">
        {/* Section Header */}
        <div className="contact-heading mb-16 md:mb-20 pt-6" style={{ textAlign: 'center' }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
            <span className="text-xs font-mono text-accent tracking-[0.4em] uppercase">
              04 — Transmission
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ghost">
            Get in <span className="text-gradient-accent">Touch</span>
          </h2>
          <div className="flex justify-center w-full mt-4">
            <p className="max-w-lg text-steel" style={{ textAlign: 'center' }}>
              Ready to collaborate on something extraordinary? Send a
              transmission.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="contact-content mx-auto grid w-full grid-cols-1 justify-items-center gap-10 lg:grid-cols-2 lg:gap-14 items-stretch">
          {/* Left: Info */}
          <div className="contact-left mx-auto flex w-full max-w-[33rem] flex-col justify-center space-y-6 text-center">
            <motion.div
              whileHover={{ scale: 1.01, y: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass flex min-h-[31rem] h-full flex-col justify-center rounded-2xl p-8 text-center transition-all duration-500 sm:p-10 hover:shadow-[0_24px_90px_rgba(185,28,28,0.12)] hover:bg-white/90"
              style={{ border: '1px solid #b91c1c' }}
              data-cursor-hover
            >
              <h3 className="font-display font-semibold text-xl text-ghost mb-4">
                Let&apos;s Build Something
              </h3>
              <p className="mx-auto mb-8 max-w-xl text-steel leading-relaxed">
                Whether you have a project in mind, want to discuss technology,
                or just want to say hello — I&apos;m always open to new
                connections and opportunities.
              </p>

              {/* Quick contact info */}
              <div className="space-y-5">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-steel block text-center">
                      EMAIL
                    </span>
                    <span className="text-ghost text-sm">
                      farzainnaikwade@gmail.com
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-steel block text-center">
                      LOCATION
                    </span>
                    <span className="text-ghost text-sm">India</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex flex-col items-center gap-6">
              <div className="connect-links-wrapper flex flex-wrap justify-center gap-3">
                <div className="connect-btn">
                  <motion.a
                    href="https://github.com/fzxcntrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-mid/60 bg-white/70 text-steel hover:border-accent/20 hover:text-accent transition-all duration-300"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <SiGithub className="h-[18px] w-[18px] shrink-0 text-current" />
                  </motion.a>
                </div>

                <div className="connect-btn">
                  <motion.a
                    href="https://www.linkedin.com/in/farzain-naikwade-793b11324/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-mid/60 bg-white/70 text-steel hover:border-accent/20 hover:text-accent transition-all duration-300"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn className="h-[18px] w-[18px] shrink-0 text-current" />
                  </motion.a>
                </div>

                <div className="connect-btn">
                  <motion.a
                    href="https://x.com/FarzainN67135"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-mid/60 bg-white/70 text-steel hover:border-accent/20 hover:text-accent transition-all duration-300"
                    aria-label="Twitter"
                    title="Twitter"
                  >
                    <SiX className="h-[18px] w-[18px] shrink-0 text-current" />
                  </motion.a>
                </div>

                <div className="connect-btn">
                  <motion.a
                    href="https://www.instagram.com/farzain__n/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-mid/60 bg-white/70 text-steel hover:border-accent/20 hover:text-accent transition-all duration-300"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <SiInstagram className="h-[18px] w-[18px] shrink-0 text-current" />
                  </motion.a>
                </div>

                <div className="connect-btn">
                  <motion.a
                    href="mailto:farzainnaikwade@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-mid/60 bg-white/70 text-steel hover:border-accent/20 hover:text-accent transition-all duration-300"
                    aria-label="Email"
                    title="Email"
                  >
                    <Mail className="h-[18px] w-[18px] shrink-0 text-current" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-right mx-auto w-full max-w-[33rem]">
            <motion.form
              whileHover={{ scale: 1.01, y: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="glass flex min-h-[31rem] h-full flex-col justify-center rounded-2xl p-8 space-y-5 transition-all duration-500 sm:p-10 hover:shadow-[0_24px_90px_rgba(185,28,28,0.12)] hover:bg-white/90"
              style={{ border: '1px solid #b91c1c' }}
              data-cursor-hover
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-center text-xs font-mono tracking-wider text-steel uppercase"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-mid/50 bg-black/5 px-4 py-3.5 text-center font-mono text-sm leading-normal text-ghost outline-none transition-colors duration-300 placeholder:text-steel/70 focus:border-accent/40"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono text-steel tracking-wider uppercase mb-2 text-center"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-mid/50 bg-black/5 px-4 py-3.5 text-center font-mono text-sm leading-normal text-ghost outline-none transition-colors duration-300 placeholder:text-steel/70 focus:border-accent/40"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-steel tracking-wider uppercase mb-2 text-center"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full resize-none rounded-xl border border-slate-mid/50 bg-black/5 px-4 py-4 text-center font-mono text-sm leading-normal text-ghost outline-none transition-colors duration-300 placeholder:text-steel/70 focus:border-accent/40"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
                className="w-full min-h-[3rem] py-3 px-4 bg-gradient-to-r from-accent/20 to-accent/20 border border-accent/30 text-accent font-mono text-sm tracking-wider uppercase rounded-lg hover:from-accent/30 hover:to-accent/30 transition-all duration-300 glow-accent flex items-center justify-center text-center whitespace-normal break-words"
              >
                Send Transmission
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
