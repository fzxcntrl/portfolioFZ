import { useEffect, useRef, useCallback } from "react";

/**
 * Interactive background with two layers:
 *  1. A fixed dot-grid that reacts to the mouse (repulsion + connection lines)
 *  2. Free-floating particles that drift slowly (depth / bokeh feel)
 */
export default function ParticleGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const gridRef = useRef([]);
  const floatersRef = useRef([]);
  const animIdRef = useRef(null);
  const dprRef = useRef(1);

  /* ── create grid dots ── */
  const createGrid = useCallback((w, h) => {
    const dots = [];
    const spacing = 70;
    const cols = Math.ceil(w / spacing) + 1;
    const rows = Math.ceil(h / spacing) + 1;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        dots.push({
          bx: c * spacing,
          by: r * spacing,
          x: c * spacing,
          y: r * spacing,
          size: Math.random() * 1.4 + 0.5,
          baseAlpha: Math.random() * 0.22 + 0.08,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.004,
        });
      }
    }
    return dots;
  }, []);

  /* ── create free-floating particles ── */
  const createFloaters = useCallback((w, h) => {
    // Increase density: changed 8000 to 4000 to double the base particle count
    const count = Math.min(Math.floor((w * h) / 4000), 320); // Doubled max from 160 to 320
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.25 + 0.1, // Slightly higher minimum alpha
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.7 ? 0 : 350, // red or dark red tint
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    dprRef.current = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const dpr = dprRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridRef.current = createGrid(w, h);
      floatersRef.current = createFloaters(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const w = () => canvas.width / dprRef.current;
    const h = () => canvas.height / dprRef.current;

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);
      t += 0.008;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* ─── Grid dots ─── */
      const grid = gridRef.current;
      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];
        const dx = mx - p.bx;
        const dy = my - p.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const range = 180;

        if (dist < range && dist > 0) {
          const f = (1 - dist / range) * 28;
          p.x = p.bx - (dx / dist) * f;
          p.y = p.by - (dy / dist) * f;
        } else {
          p.x += (p.bx - p.x) * 0.06;
          p.y += (p.by - p.y) * 0.06;
        }

        const pulse = Math.sin(t * p.pulseSpeed * 100 + p.pulse) * 0.5 + 0.5;
        const a = p.baseAlpha * (0.5 + pulse * 0.5);

        // Brighten dots near mouse
        const mouseBright = dist < range ? (1 - dist / range) * 0.3 : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 26, 26, ${a + mouseBright})`;
        ctx.fill();
      }

      /* ─── Connection lines near cursor ─── */
      const connRange = 100;
      for (let i = 0; i < grid.length; i++) {
        const p1 = grid[i];
        const dm = Math.sqrt((mx - p1.x) ** 2 + (my - p1.y) ** 2);
        if (dm > 220) continue;

        for (let j = i + 1; j < grid.length; j++) {
          const p2 = grid[j];
          const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (d < connRange) {
            const alpha = (1 - d / connRange) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 26, 26, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* ─── Floating particles ─── */
      const floaters = floatersRef.current;
      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        f.x += f.vx;
        f.y += f.vy;

        // Wrap around edges
        if (f.x < -10) f.x = cw + 10;
        if (f.x > cw + 10) f.x = -10;
        if (f.y < -10) f.y = ch + 10;
        if (f.y > ch + 10) f.y = -10;

        // Subtle sine oscillation
        const ox = Math.sin(t * 2 + i) * 0.5;
        const oy = Math.cos(t * 1.5 + i * 0.7) * 0.4;

        ctx.beginPath();
        ctx.arc(f.x + ox, f.y + oy, f.r, 0, Math.PI * 2);

        // Glow for larger particles
        if (f.r > 1.8) {
          const grad = ctx.createRadialGradient(
            f.x + ox, f.y + oy, 0,
            f.x + ox, f.y + oy, f.r * 3
          );
          const cStr = f.hue === 350
            ? `rgba(200, 0, 0, ${f.alpha * 0.6})`  // Darker red, slightly more opaque glow
            : `rgba(139, 0, 0, ${f.alpha * 0.6})`;  // Dark red for the alternative
          grad.addColorStop(0, cStr);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fill();
          // core dot
          ctx.beginPath();
          ctx.arc(f.x + ox, f.y + oy, f.r * 0.5, 0, Math.PI * 2);
        }

        const color = f.hue === 350
          ? `rgba(180, 0, 0, ${f.alpha + 0.1})`  // Darker red for core particles
          : `rgba(100, 0, 0, ${f.alpha + 0.1})`; // Very dark red for alternatives
        ctx.fillStyle = color;
        ctx.fill();
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animIdRef.current);
    };
  }, [createGrid, createFloaters]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform" }}
    />
  );
}
