import React, { useEffect, useRef } from "react";

/**
 * BackgroundFX
 * - Fixed full-viewport canvas background.
 * - Idle: soft drifting stars + radial glows following pointer.
 * - Hyperjump: stars streak + big speed-up for ~2.5s (trigger with window.dispatchEvent(new Event("hyperjump"))).
 * - Settle: smooth deceleration back to normal (~0.9s) (trigger with window.dispatchEvent(new Event("hyperjump-settle"))).
 *
 * Expects a `theme` object with:
 *  - bg, glowA, glowB, circleAccent, circleNeutral, star
 */
export default function BackgroundFX({ theme, big = 3, stars = 110 }) {
  const ref = useRef(null);
  const raf = useRef(0);

  // Hyperjump state
  const jumping = useRef(false);
  const settling = useRef(false);
  const jumpStart = useRef(0);
  const settleStart = useRef(0);
  const JUMP_MS = 2500;   // duration of hyperspace
  const SETTLE_MS = 900;  // deceleration back to idle

  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });

    const setSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = window.innerWidth, h = window.innerHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e;
      pointer.current.tx = p.clientX;
      pointer.current.ty = p.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    pointer.current.tx = pointer.current.x = window.innerWidth / 2;
    pointer.current.ty = pointer.current.y = window.innerHeight / 2;

    // Big glow circles (subtle movement)
    const C = Array.from({ length: big }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.min(window.innerWidth, window.innerHeight) * (0.26 + 0.12 * i),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.0007 + Math.random() * 0.0006,
      accent: i % 2 === 0,
      sx: 1, sy: 1,
    }));

    // Stars (idle drift; become streaks during jump/settle)
    const S = Array.from({ length: stars }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.6 + Math.random() * 1.2,
      vy: -0.08 - Math.random() * 0.14,
      tw: Math.random() * Math.PI * 2,
      tws: 0.002 + Math.random() * 0.003,
    }));

    // Easing helpers
    const easeInOut = (t) => 0.5 * (1 - Math.cos(Math.PI * t));          // 0→1 (smooth)
    const pulse = (t) => Math.sin(Math.PI * Math.min(1, t));              // up then down (0→1→0)
    const easeOut = (t) => 1 - Math.pow(1 - Math.min(1, t), 3);           // 0→1 (ease-out)

    const render = () => {
      const W = window.innerWidth, H = window.innerHeight;

      // Smooth pointer follow
      const chase = 0.06;
      pointer.current.x += (pointer.current.tx - pointer.current.x) * chase;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * chase;

      // Phase calculations
      let j = 0;            // jump pulse (0..1..0)
      let speedMul = 1;     // star vertical speed multiplier
      let stretch = 0;      // streak length
      let glowBoost = 0;    // extra glow intensity

      if (jumping.current) {
        const t = (performance.now() - jumpStart.current) / JUMP_MS;
        if (t >= 1) {
          jumping.current = false;
          // auto-start settle if not already triggered by event
          if (!settling.current) {
            settling.current = true;
            settleStart.current = performance.now();
          }
        } else {
          j = pulse(t);                          // 0→1→0
          speedMul = 1 + j * 35;                 // big speed-up
          stretch  = j * 28;                     // streak visuals
          glowBoost = easeInOut(Math.min(t, 1)) * 0.4;
        }
      } else if (settling.current) {
        const ts = (performance.now() - settleStart.current) / SETTLE_MS;
        if (ts >= 1) {
          settling.current = false;
        } else {
          const s = easeOut(ts);                 // 0→1
          const decay = 1 + (1 - s) * 5;         // gently reduce speed from small burst to 1
          speedMul = decay;
          stretch  = (1 - s) * 8;                // streaks shrink
          glowBoost = (1 - s) * 0.12;            // glow relaxes
        }
      }

      // Background base
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // Reactive glows
      const g1 = ctx.createRadialGradient(
        pointer.current.x, pointer.current.y, 12,
        W * 0.45, H * 0.5, Math.max(W, H)
      );
      g1.addColorStop(0, theme.glowA);
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(
        W - pointer.current.x, H - pointer.current.y, 10,
        W * 0.55, H * 0.6, Math.max(W, H)
      );
      g2.addColorStop(0, theme.glowB);
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 1 - glowBoost * 0.15; // subtle alter during jump/settle
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      // Big circles with slow wobble
      for (const a of C) {
        a.wobble += a.wobbleSpeed * (1 + (jumping.current ? 2 : settling.current ? 0.6 : 0));
        const ox = Math.cos(a.wobble) * 16;
        const oy = Math.sin(a.wobble * 0.8) * 10;
        a.x += (pointer.current.x + ox - a.x) * 0.015;
        a.y += (pointer.current.y + oy - a.y) * 0.015;

        const grad = ctx.createRadialGradient(a.x, a.y, a.r * 0.22, a.x, a.y, a.r);
        grad.addColorStop(0, a.accent ? theme.circleAccent : theme.circleNeutral);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.scale(a.sx, a.sy);
        ctx.translate(-a.x, -a.y);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Stars (dots normally, streaks during jump/settle)
      for (const s of S) {
        s.y += s.vy * speedMul;
        if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }

        s.tw += s.tws * (1 + (jumping.current ? 3 : settling.current ? 1.5 : 0));
        const alpha = 0.45 + Math.sin(s.tw) * 0.25;

        if (jumping.current || settling.current) {
          const len = Math.max(4, stretch + Math.abs(s.vy * speedMul * 22));
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + len);
          ctx.strokeStyle = theme.star.replace(/0\.\d+\)/, `${Math.min(0.8, alpha + 0.2)})`);
          ctx.lineWidth = Math.max(1, s.r * (1 + (jumping.current ? 0.8 : 0.4)));
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = theme.star.replace(/0\.\d+\)/, `${alpha})`);
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(render);
    };

    raf.current = requestAnimationFrame(render);

    // Global events for hyperjump phases
    const onHyperjump = () => {
      // If already jumping, ignore; if settling, restart jump.
      jumping.current = true;
      settling.current = false;
      jumpStart.current = performance.now();
    };
    const onHyperjumpSettle = () => {
      // Force a settle even if no jump preceded (useful on landing)
      settling.current = true;
      jumping.current = false;
      settleStart.current = performance.now();
    };

    window.addEventListener("hyperjump", onHyperjump);
    window.addEventListener("hyperjump-settle", onHyperjumpSettle);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("hyperjump", onHyperjump);
      window.removeEventListener("hyperjump-settle", onHyperjumpSettle);
    };
  }, [theme, big, stars]);

/* ...all your existing logic stays the same... */
return (
  <canvas
    ref={ref}
    aria-hidden
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      background: theme.bg,
      contain: "layout paint size",   // ✅ keep it out of layout math
      transform: "translateZ(0)",     // ✅ nudge into its own layer
    }}
  />
);
}
