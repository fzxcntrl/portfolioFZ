import { useEffect, useRef } from "react";

/**
 * Custom cursor — dot + crosshair core with a spring-physics trailing ring.
 *
 * Design:
 * - Inner: small cyan dot with 4 crosshair ticks (always on mouse)
 * - Outer: ring that trails with spring interpolation, expands on hover
 * - Uses event delegation on `document` so dynamically-rendered
 *   interactive elements are automatically detected.
 * - Hidden on mobile / touch devices.
 */

const INTERACTIVE =
  "a, button, [data-cursor-hover], input, textarea, select, [role='button'], label[for]";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const ringScale = useRef(1);
  const targetScale = useRef(1);
  const visible = useRef(false);
  const hovering = useRef(false);

  useEffect(() => {
    /* ── bail on touch devices ── */
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── mouse tracking ── */
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      visible.current = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    /* ── hover detection via event delegation ── */
    const onOverCapture = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        hovering.current = true;
        targetScale.current = 1.8;
      }
    };

    const onOutCapture = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        hovering.current = false;
        targetScale.current = 1;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOverCapture, true);
    document.addEventListener("mouseout", onOutCapture, true);

    /* ── animation loop (spring physics) ── */
    let rafId;
    const loop = () => {
      /* ring trails with spring lerp */
      const lerpFactor = 0.12;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerpFactor;

      /* scale spring */
      ringScale.current += (targetScale.current - ringScale.current) * 0.14;

      /* apply transforms (GPU-composited) */
      const dx = pos.current.x;
      const dy = pos.current.y;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

      const rx = ringPos.current.x;
      const ry = ringPos.current.y;
      const s = ringScale.current;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${s})`;

      /* hover state colors via opacity trick */
      const isH = hovering.current;
      dot.dataset.hover = isH ? "1" : "0";
      ring.dataset.hover = isH ? "1" : "0";

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOverCapture, true);
      document.removeEventListener("mouseout", onOutCapture, true);
    };
  }, []);

  return (
    <>
      {/* ── Dot + crosshair core ── */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {/* center dot */}
        <span className="cursor-dot-center" />
        {/* crosshair ticks */}
        <span className="cursor-tick cursor-tick-t" />
        <span className="cursor-tick cursor-tick-r" />
        <span className="cursor-tick cursor-tick-b" />
        <span className="cursor-tick cursor-tick-l" />
      </div>

      {/* ── Trailing ring ── */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}

