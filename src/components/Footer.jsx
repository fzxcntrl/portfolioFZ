import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Profile", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Arsenal", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative w-full border-t border-slate-dark/20 bg-void">
      <div className="content-shell flex flex-col items-center px-6 py-16 text-center sm:px-8 md:px-10">
        {/* ── Top row ── */}
        <div className="mb-12 flex w-full flex-col items-center justify-center gap-8 text-center">

          {/* Brand */}
          <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/8">
              <span className="text-accent font-mono font-bold text-sm">FZ</span>
            </div>
            <span className="font-mono text-sm text-ghost tracking-[0.25em] font-semibold uppercase">
              Portfolio
            </span>
          </motion.div>

          {/* Nav */}
          <nav className="flex w-fit flex-wrap justify-center gap-x-10 gap-y-4">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs font-mono text-steel hover:text-accent tracking-[0.2em] uppercase transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Availability */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-xs font-mono text-steel/70 tracking-[0.2em] uppercase leading-none mt-[1px]">
              Available for work
            </span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {/* ── Bottom row ── */}
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
          <p className="text-center text-xs font-mono tracking-wider text-steel/40">
            &copy; {year} Farzain Naikwade. Crafted with precision.
          </p>
          <p className="max-w-xl text-center text-[10px] font-mono tracking-[0.32em] text-steel/30 uppercase">
            Designed &amp; Developed by Farzain Naikwade
          </p>
          <p className="text-center text-xs font-mono tracking-wider text-steel/40">
            v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
