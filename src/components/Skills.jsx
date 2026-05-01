import { useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import {
  SiReact, SiNextdotjs, SiTypescript,
  SiNodedotjs, SiExpress, SiPython,
  SiMongodb, SiMysql, SiGit, SiTailwindcss, SiFramer,
  SiHtml5, SiJavascript,
} from "react-icons/si";
import { FaCss3 } from "react-icons/fa";
import {
  Code2, Cpu, Users, Lightbulb, Target, MessageCircle,
  Handshake, Rocket, TrendingUp, Share2, Palette, Zap
} from "lucide-react";

const getSkillIcon = (name) => {
  const mapping = {
    "HTML":                 { icon: SiHtml5,       color: "#E34F26" },
    "CSS":                  { icon: FaCss3,        color: "#1572B6" },
    "JavaScript":           { icon: SiJavascript,  color: "#F7DF1E" },
    "TypeScript":           { icon: SiTypescript,   color: "#3178C6" },
    "React":                { icon: SiReact,        color: "#61DAFB" },
    "Next.js":              { icon: SiNextdotjs,    color: "#000000" },
    "Node.js":              { icon: SiNodedotjs,    color: "#339933" },
    "Express.js":           { icon: SiExpress,      color: "#000000" },
    "Python":               { icon: SiPython,       color: "#3776AB" },
    "Tailwind CSS":         { icon: SiTailwindcss,  color: "#06B6D4" },
    "Framer Motion":        { icon: SiFramer,       color: "#0055FF" },
    "MongoDB":              { icon: SiMongodb,      color: "#47A248" },
    "MySQL":                { icon: SiMysql,        color: "#4479A1" },
    "Git & GitHub":         { icon: SiGit,          color: "#F05032" },
    "API":                  { icon: Cpu,            color: "#b91c1c" },
    "Generative AI":        { icon: Zap,            color: "#b91c1c" },
    "Leadership":           { icon: Target,         color: "#b91c1c" },
    "Teamwork":             { icon: Users,          color: "#b91c1c" },
    "Communication Skills": { icon: MessageCircle,  color: "#b91c1c" },
    "Decision Making":      { icon: Lightbulb,      color: "#b91c1c" },
    "Problem Solving":      { icon: Code2,          color: "#b91c1c" },
    "Team Building":        { icon: Handshake,      color: "#b91c1c" },
    "Entrepreneurship":     { icon: Rocket,         color: "#b91c1c" },
    "Product Management":   { icon: TrendingUp,     color: "#b91c1c" },
    "Social Media":         { icon: Share2,         color: "#b91c1c" },
    "UI/UX":                { icon: Palette,        color: "#b91c1c" },
  };
  return mapping[name] || { icon: Code2, color: "#000000" };
};

function SkillPill({ name }) {
  const { icon: Icon, color } = getSkillIcon(name);
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ duration: 0.2 }}
      className="group inline-flex min-h-[3.4rem] min-w-[10.5rem] items-center justify-center gap-3 rounded-2xl border border-accent/18 bg-white/78 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-accent/45 hover:bg-accent/6 hover:shadow-[0_10px_28px_rgba(185,28,28,0.08)] cursor-none"
      data-cursor-hover
    >
      <Icon
        className="h-4 w-4 shrink-0 transition-colors duration-300 sm:h-[1.1rem] sm:w-[1.1rem]"
        style={{ color }}
      />
      <span className="max-w-full text-center text-[11px] sm:text-[13px] font-mono text-ghost/78 group-hover:text-ghost tracking-[0.14em] transition-colors duration-300 leading-none whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

function CategoryBlock({ category, icon, items, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex w-full max-w-full sm:max-w-[38rem] mx-auto flex-col items-center rounded-[2rem] bg-white/58 p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.04)] sm:p-10 h-full"
      style={{ border: '1px solid #b91c1c' }}
    >
      {/* Category header */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-xl bg-accent/8 border border-accent/20 flex items-center justify-center">
          <span className="text-accent text-2xl">{icon}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-ghost tracking-tight">
            {category}
          </h3>
          <p className="text-xs font-mono text-steel/60 tracking-widest uppercase">
            {items.length} {items.length === 1 ? "skill" : "skills"} equipped
          </p>
        </div>
      </div>

      {/* Skills grid */}
      <div className="flex w-full max-w-[52rem] flex-wrap justify-center gap-3 sm:gap-4">
        {items.map((item) => (
          <SkillPill key={item.name} name={item.name} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  return (
    <section id="skills" ref={sectionRef} className="relative section-padding border-t border-slate-dark/30 scroll-mt-24 md:scroll-mt-28">
      <div className="content-shell relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-20" style={{ textAlign: 'center' }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent/40" />
            <span className="text-xs font-mono text-accent tracking-[0.4em] uppercase">
              03 — Arsenal
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/40" />
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ghost tracking-tighter mb-5">
            Tech <span className="text-gradient-accent">Loadout</span>
          </h2>
          <div className="flex justify-center w-full">
            <p className="max-w-xl font-light leading-relaxed text-base sm:text-lg text-steel" style={{ textAlign: 'center' }}>
              My curated stack — tools, technologies, and skills equipped for every mission.
            </p>
          </div>
        </div>

        {/* Categories grid */}
        <div className="mx-auto grid w-full grid-cols-1 justify-items-center items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {skills.map((skill, i) => (
            <CategoryBlock
              key={skill.category}
              category={skill.category}
              icon={skill.icon}
              items={skill.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
