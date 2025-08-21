import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NAME, LINE2, LINE3, ACCENT } from "../theme";
import ScrambleOnce from "../components/ScrambleOnce";

export default function Home({ theme }) {
  const navigate = useNavigate();

  // 🔒 Lock page scroll ONLY on Home route
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight   = html.style.height;
    const prevHtmlObs      = html.style.overscrollBehavior;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight   = body.style.height;
    const prevBodyObs      = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.height = "100%";
    body.style.height = "100%";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
      html.style.overscrollBehavior = prevHtmlObs;
      body.style.overscrollBehavior = prevBodyObs;
    };
  }, []);

  const handleHyperjump = () => {
    if (window.__hyperjumping) return;
    window.__hyperjumping = true;
    window.dispatchEvent(new Event("hyperjump"));

    setTimeout(() => {
      navigate("/story");
      setTimeout(() => {
        window.dispatchEvent(new Event("hyperjump-settle"));
        window.__hyperjumping = false;
      }, 60);
    }, 2500);
  };

  const RocketIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14.5 3C10 5 7 8 6 12l-3 3 3 3 3-3c4-1 7-4 9-8l2-4-4 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14.5" cy="7.5" r="1.4" fill="currentColor"/>
      <path d="M7 17l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  return (
    <main
      style={{
        position: "relative",
        zIndex: 1,
        display: "grid",
        placeItems: "center",
        /* Use dynamic viewport units to avoid mobile URL bar jumps */
        minHeight: "100svh",
        height: "100svh",
        /* Clip any accidental overflow so no scrollbars appear */
        overflow: "clip",
        padding: 24,
        textAlign: "center",
        userSelect: "none",
      }}
    >
      <section style={{ maxWidth: 820, paddingInline: 12 }}>
        <h1
          style={{
            fontSize: "clamp(28px, 6vw, 56px)",
            lineHeight: 1.06,
            margin: 0,
            letterSpacing: -0.5,
            textShadow:
              theme.name === "dark"
                ? "0 0 10px rgba(255,255,255,0.06)"
                : "0 0 6px rgba(0,0,0,0.06)",
          }}
        >
          <ScrambleOnce text={`Hey, I'm ${NAME}`} duration={3000} />
        </h1>

        <p
          style={{
            marginTop: 12,
            color: theme.sub,
            fontSize: "clamp(16px, 3.2vw, 26px)",
            marginBottom: 0,
          }}
        >
          <ScrambleOnce text={LINE2} duration={2900} />
        </p>

        <p
          style={{
            marginTop: 6,
            color: theme.sub,
            fontSize: "clamp(16px, 3.2vw, 26px)",
          }}
        >
          <ScrambleOnce text={LINE3} duration={2800} />
        </p>
      </section>

      {/* Floating hyperjump CTA — perfectly centered with no drift */}
      <motion.button
        onClick={handleHyperjump}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        whileHover={{ y: -2, boxShadow: "0 14px 30px rgba(208,93,154,0.45)" }}
        whileTap={{ scale: 0.98 }}
        style={{
          position: "fixed",
          bottom: "max(22px, env(safe-area-inset-bottom))",
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "max-content",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 18px",
          borderRadius: 14,
          border: `1px solid ${ACCENT}`,
          color: "#fff",
          background:
            theme.name === "dark"
              ? "linear-gradient(180deg, rgba(208,93,154,0.35), rgba(208,93,154,0.18))"
              : "linear-gradient(180deg, rgba(208,93,154,0.45), rgba(208,93,154,0.22))",
          boxShadow: "0 12px 28px rgba(208,93,154,0.45)",
          fontWeight: 800,
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transform: "translateZ(0)",
          willChange: "transform, box-shadow",
        }}
      >
        {RocketIcon} Hyperjump to Story
      </motion.button>
    </main>
  );
}

