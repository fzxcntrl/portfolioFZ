import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "./hooks/useSmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import IntroSequence from "./components/IntroSequence";
import ParticleGrid from "./components/ParticleGrid";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Force ScrollTrigger refresh after layout settles
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* Global Particle Grid */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <ParticleGrid />
      </div>
      
      <AnimatePresence mode="wait">
        {!introDone && (
          <IntroSequence key="intro" onComplete={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        className="relative noise"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Navbar />
        
        <main>
          <Hero introDone={introDone} />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
