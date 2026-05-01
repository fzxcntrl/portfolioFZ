import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Arsenal" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sectionEls = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const rect = sectionEls[i].getBoundingClientRect();

        if (rect.top <= window.innerHeight / 3) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, {
        duration: 1.1,
        offset: -88,
      });
      return;
    }

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 2.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "glass-strong py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="content-shell grid grid-cols-[auto_1fr] items-center px-6 sm:px-8 md:px-10 lg:grid-cols-[200px_1fr_200px] h-14">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo("hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 justify-self-start"
          data-cursor-hover
        >
          <div className="w-9 h-9 rounded-md border border-accent/40 flex items-center justify-center bg-accent/5 group-hover:bg-accent/10 group-hover:border-accent/60 transition-all duration-300">
            <span className="text-accent font-mono font-bold text-sm">
              FZ
            </span>
          </div>

          <span className="text-ghost font-mono text-xs tracking-[0.2em] font-semibold hidden sm:block opacity-60 group-hover:opacity-100 transition-opacity uppercase">
            Portfolio
          </span>
        </motion.button>

        {/* Navigation Links */}
        <div className="flex items-center justify-self-end gap-2 sm:gap-3 md:gap-5 lg:justify-self-center">
          {sections.map((section, i) => (
            <motion.button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              data-cursor-hover
              className={`relative flex items-center justify-center min-w-[3rem] md:min-w-[6.5rem] h-[2.5rem] md:h-[2.75rem] px-4 md:px-6 text-[10px] md:text-xs font-mono tracking-[0.18em] uppercase rounded-md whitespace-nowrap overflow-visible transition-all duration-300 ${
                activeSection === section.id
                  ? "text-accent"
                  : "text-steel hover:text-ghost"
              }`}
            >
              {/* Active Tab Background */}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-md border border-accent/40 bg-accent/8 shadow-[0_0_12px_rgba(255,58,58,0.08)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {/* Desktop Label */}
              <span className="relative z-10 hidden md:flex items-center justify-center w-full h-full leading-none">
                {section.label}
              </span>

              {/* Mobile Numeric Label */}
              <span className="relative z-10 flex md:hidden items-center justify-center w-full h-full leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="hidden items-center gap-2.5 justify-self-end lg:flex">
          <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse-glow" />

          <span className="text-xs font-mono text-steel tracking-[0.15em] uppercase leading-none flex items-center">
            Available
          </span>
        </div>
      </div>
    </motion.nav>
  );
}