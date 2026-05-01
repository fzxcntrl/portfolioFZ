import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll ↔ GSAP ScrollTrigger sync.
 *
 * Key design decisions:
 * - Lenis is driven by `gsap.ticker` so both systems share the same
 *   rAF loop — no drift or doubled frames.
 * - Every Lenis scroll event calls `ScrollTrigger.update()` so
 *   pinned sections, scrub timelines, and triggers stay in sync.
 * - `autoResize` is left on so layout shifts are handled.
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tickerCallback = (time) => {
      lenis.raf(time * 1000); // GSAP ticker gives seconds, Lenis wants ms
    };
    const handleRefresh = () => lenis.resize();

    /* ── Sync Lenis → ScrollTrigger ── */
    lenis.on("scroll", updateScrollTrigger);

    /* ── Drive Lenis from GSAP ticker (shared rAF) ── */
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // prevent GSAP from throttling on tab-switch
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    /* ── Initial refresh once layout is ready ── */
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return lenisRef;
}
