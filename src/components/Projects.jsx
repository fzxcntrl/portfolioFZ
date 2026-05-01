import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { ExternalLink, Code as Github, Database, Code2 } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiRedux,
  SiJavascript,
  SiHtml5,
  SiFastapi,
  SiLeaflet,
  SiSocketdotio,
} from "react-icons/si";
import { FaCss3 } from "react-icons/fa";

const getTechIcon = (tech) => {
  const mapping = {
    "React": { icon: SiReact, color: "#61DAFB" },
    "Next.js": { icon: SiNextdotjs, color: "#000000" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "Express": { icon: SiExpress, color: "#000000" },
    "Python": { icon: SiPython, color: "#3776AB" },
    "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
    "MongoDB": { icon: SiMongodb, color: "#47A248" },
    "VectorDB": { icon: Database, color: "#000000" },
    "LangChain": { icon: Code2, color: "#000000" },
    "OpenAI": { icon: Code2, color: "#000000" },
    "Socket.io": { icon: SiSocketdotio, color: "#000000" },
    "JWT": { icon: Code2, color: "#000000" },
    "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
    "Redux": { icon: SiRedux, color: "#764ABC" },
    "Leaflet": { icon: SiLeaflet, color: "#199900" },
    "FastAPI": { icon: SiFastapi, color: "#009688" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
    "HTML5": { icon: SiHtml5, color: "#E34F26" },
    "CSS3": { icon: FaCss3, color: "#1572B6" },
  };
  const config = mapping[tech] || { icon: Code2, color: "#000000" };
  const Icon = config.icon;
  return (
    <Icon
      className="w-4 h-4 opacity-90 group-hover/tech:opacity-100 transition-opacity"
      style={{ color: config.color }}
    />
  );
};

function ProjectLink({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center justify-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-6 py-3 text-ghost font-medium hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_15px_rgba(185,28,28,0.15)] transition-all duration-300 cursor-none min-w-[140px]"
      data-cursor-hover
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] relative text-center">
        {label}
      </span>
    </a>
  );
}

function TechBadge({ tech }) {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-mid/50 bg-white/65 px-4 py-2 text-sm font-mono text-ghost/85">
      {getTechIcon(tech)}
      <span>{tech}</span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const accentTitle = project.accentTitle?.trim();
  const titleLead = accentTitle
    ? project.title.replace(accentTitle, "").replace(/\s+/g, " ").trim()
    : project.title;
  const titleTail = accentTitle || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: "-50px" }}
      whileHover={{ scale: 1.01, y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mt-10 flex min-h-[32rem] w-full max-w-full flex-col overflow-visible rounded-[2rem] border border-[#b91c1c] bg-white/68 px-6 pb-12 pt-16 text-center transition-all duration-500 sm:max-w-[38rem] sm:px-10 sm:pt-20 md:min-h-[36rem] md:px-12 md:pb-14 hover:border-accent/45 hover:bg-white/90 hover:shadow-[0_24px_90px_rgba(185,28,28,0.12)]"
      data-cursor-hover
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.08),transparent_55%)] opacity-70 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-accent/8 blur-[100px] opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100" />
      <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-between w-full">
        <div className="flex w-full justify-center items-center gap-4 mb-4 sm:mb-6">
          <span className="inline-flex shrink-0 items-center text-[11px] sm:text-[13px] leading-none font-mono font-medium text-ghost/80 uppercase tracking-[0.22em] max-w-full overflow-hidden text-ellipsis translate-y-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex shrink-0 items-center text-[11px] sm:text-[13px] leading-none font-mono font-medium text-ghost/80 uppercase tracking-[0.18em] max-w-full overflow-hidden text-ellipsis translate-y-0.5">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-4 md:py-6 w-full">
          <div className="w-full flex flex-col items-center transition-transform duration-500 md:group-hover:-translate-y-8">
            <p className="mb-4 sm:mb-5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.32em] text-steel/70 text-center break-words max-w-full">
              {project.subtitle}
            </p>
            <h3 className="w-full text-center font-display text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl break-words px-2">
              <span className="text-ghost">{titleLead}</span>
              {titleTail ? (
                <>
                  {" "}
                  <span className="text-gradient-accent">{titleTail}</span>
                </>
              ) : null}
            </h3>
          </div>
        </div>

        <div className="space-y-7 w-full flex flex-col items-center">
          <p className="mx-auto w-full max-w-[31rem] text-center text-sm leading-relaxed text-steel/90 transition-all duration-500 md:text-base md:-translate-y-2 md:opacity-0 md:group-hover:-translate-y-10 md:group-hover:opacity-100 break-words px-4">
            {project.description}
          </p>

          <div className="flex w-full flex-wrap justify-center items-center gap-4 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:-translate-y-8 md:group-hover:opacity-100 px-2">
            <ProjectLink href={project.github} icon={Github} label="GitHub" />
            <ProjectLink href={project.link} icon={ExternalLink} label="Live Demo" />
          </div>

          <div className="flex w-full flex-wrap justify-center items-center gap-3 transition-all duration-500 md:translate-y-3 md:opacity-0 md:group-hover:-translate-y-6 md:group-hover:opacity-100 px-2">
            {project.tech.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative section-padding border-t border-slate-dark/30 scroll-mt-24 md:scroll-mt-28">
      <div className="content-shell">
        {/* Header */}
        <div className="mt-10 mb-16 md:mb-20 text-center flex flex-col items-center gap-4">
          <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-ghost tracking-tighter">
            Projects
          </h2>
        </div>

        {/* Grid */}
        <div className="mx-auto grid w-full grid-cols-1 justify-items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
