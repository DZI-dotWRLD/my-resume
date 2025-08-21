// =============================
// File: src/components/Links.jsx
// =============================
import React from "react";
import { ACCENT, LINKS } from "../theme";

export const Svg = {
  linkedin: (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.79 2.66 4.79 6.11V21h-4v-5.33c0-1.27-.02-2.91-1.77-2.91-1.77 0-2.04 1.38-2.04 2.81V21H9z"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }} fill="currentColor" aria-hidden>
      <path d="M20 4H4a2 2 0 0 0-2 2v1.2l10 6.25L22 7.2V6a2 2 0 0 0-2-2zm0 5.25-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.25z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.7c-2.78.6-3.37-1.17-3.37-1.17-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.36 1.08 2.94.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8a9.6 9.6 0 0 1 2.5.34c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.59.69.49A10 10 0 0 0 12 2z"/>
    </svg>
  ),
  pdf: (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }} fill="currentColor" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 2 4 4h-4zM8 13h2a2 2 0 1 1 0 4H8zm0-2v-2h4v2zm6 6h-2v-6h2a3 3 0 0 1 0 6zM10 15H9v2h1a1 1 0 0 0 0-2z"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }} fill="currentColor" aria-hidden>
      <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
    </svg>
  ),
};

function IconButton({ href, theme, icon, label }) {
  // Open in new tab for external URLs and PDFs (keep mailto in the same tab to open the mail app)
  const isExternal = /^https?:\/\//i.test(href);
  const isPdf = /\.pdf(\?|$)/i.test(href);
  const target = (isExternal || isPdf) ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      title={label}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 56, height: 56, margin: 6, borderRadius: 14,
        border: `1px solid ${theme.border}`, color: theme.text,
        background: theme.name === "dark" ? "rgba(12,14,16,0.55)" : "rgba(255,255,255,0.85)",
        boxShadow: theme.name === "dark" ? "0 10px 24px rgba(0,0,0,0.35)" : "0 10px 24px rgba(0,0,0,0.12)",
        textDecoration: "none",
        transition: "transform 140ms ease, background-color 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = ACCENT;
        e.currentTarget.style.boxShadow = `0 10px 24px ${ACCENT}55`;
        e.currentTarget.style.background = theme.name === "dark" ? `${ACCENT}1F` : `${ACCENT}18`; // subtle accent glaze
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = (theme.name === "dark" ? "0 10px 24px rgba(0,0,0,0.35)" : "0 10px 24px rgba(0,0,0,0.12)");
        e.currentTarget.style.background = (theme.name === "dark" ? "rgba(12,14,16,0.55)" : "rgba(255,255,255,0.85)");
      }}
    >
      {/* Keep the SVG icon — don’t replace it with a URL string */}
      <div style={{ width: 22, height: 22, display: "grid", placeItems: "center" }}>
        {icon}
      </div>
    </a>
  );
}

export function LinkColumn({ theme }) {
  return (
    <nav aria-label="Quick links" style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", zIndex: 2 }}>
      <IconButton href={LINKS.linkedin} theme={theme} icon={Svg.linkedin} label="LinkedIn" />
      <IconButton href={LINKS.gmail}    theme={theme} icon={Svg.mail}     label="Email" />
      <IconButton href={LINKS.resume}   theme={theme} icon={Svg.pdf}      label="Résumé (PDF)" />
      <IconButton href={LINKS.github}   theme={theme} icon={Svg.github}   label="GitHub" />
    </nav>
  );
}

export function RadialMenu({ theme }) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  const [size, setSize] = React.useState({ w: window.innerWidth, h: window.innerHeight });

  React.useEffect(() => {
    const on = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", on); return () => window.removeEventListener("resize", on);
  }, []);

  React.useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    const onClickAway = (e) => { if (!wrapRef.current) return; if (!wrapRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener("keydown", onEsc);
    window.addEventListener("mousedown", onClickAway);
    window.addEventListener("touchstart", onClickAway, { passive: true });
    return () => { window.removeEventListener("keydown", onEsc); window.removeEventListener("mousedown", onClickAway); window.removeEventListener("touchstart", onClickAway); };
  }, []);

  const w = size.w, h = size.h;
  const isCompactSheet = w < 420 || h < 620;
  const iconSize = isCompactSheet ? 20 : 22;
  const btnSize  = isCompactSheet ? 52 : 56;
  const triggerSize = isCompactSheet ? 60 : 64;

  // ✅ Use LINKS.* for destinations; keep Svg.* for icons
  const items = [
    { href: LINKS.linkedin, icon: Svg.linkedin, label: "LinkedIn" },
    { href: LINKS.github,   icon: Svg.github,   label: "GitHub"   },
    { href: LINKS.gmail,    icon: Svg.mail,     label: "Email"    },
    { href: LINKS.resume,   icon: Svg.pdf,      label: "Résumé"   },
  ];

  const RADIUS = Math.max(64, Math.min(100, Math.min(w, h) * 0.22));
  const START_DEG = -5, END_DEG = 95;
  const toRad = (deg) => (deg * Math.PI) / 180;

  return (
    <div ref={wrapRef} style={{ position: "fixed", right: 16, bottom: "max(16px, env(safe-area-inset-bottom))", zIndex: 3 }}>
      {isCompactSheet ? (
        <div role="menu" aria-hidden={!open} style={{ position: "fixed", left: 12, right: 12, bottom: open ? "calc(88px + env(safe-area-inset-bottom))" : "calc(72px + env(safe-area-inset-bottom))", transform: `translateY(${open ? "0" : "8px"})`, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 200ms ease, transform 220ms ease, bottom 220ms ease", background: theme.name === "dark" ? "rgba(18,20,22,0.96)" : "rgba(255,255,255,0.98)", color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 8, display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 8, boxShadow: "0 16px 36px rgba(0,0,0,0.35)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
          {items.map((it) => {
            // Same open-in-new-tab logic as IconButton
            const isExternal = /^https?:\/\//i.test(it.href);
            const isPdf = /\.pdf(\?|$)/i.test(it.href);
            const target = (isExternal || isPdf) ? "_blank" : undefined;
            return (
              <a key={it.label} href={it.href} target={target} rel={target ? "noopener noreferrer" : undefined} role="menuitem" aria-label={it.label} title={it.label} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: btnSize, borderRadius: 12, border: `1px solid ${theme.border}`, color: theme.text, background: theme.name === "dark" ? "rgba(12,14,16,0.65)" : "rgba(255,255,255,0.95)", textDecoration: "none", boxShadow: theme.name === "dark" ? "0 10px 24px rgba(0,0,0,0.35)" : "0 10px 24px rgba(0,0,0,0.12)" }}>
                <div style={{ width: iconSize, height: iconSize, display: "grid", placeItems: "center" }}>{it.icon}</div>
              </a>
            );
          })}
        </div>
      ) : (
        <div role="menu" aria-hidden={!open} style={{ position: "absolute", right: 0, bottom: 0, pointerEvents: open ? "auto" : "none", width: 1, height: 1 }}>
          {items.map((it, i) => {
            const t = items.length === 1 ? 0.5 : i / (items.length - 1);
            const deg = START_DEG + (END_DEG - START_DEG) * t;
            const x = Math.cos(toRad(deg)) * RADIUS;
            const y = Math.sin(toRad(deg)) * RADIUS;
            const delay = 20 + i * 35;
            const isExternal = /^https?:\/\//i.test(it.href);
            const isPdf = /\.pdf(\?|$)/i.test(it.href);
            const target = (isExternal || isPdf) ? "_blank" : undefined;
            return (
              <a key={it.label} href={it.href} target={target} rel={target ? "noopener noreferrer" : undefined} role="menuitem" aria-label={it.label} title={it.label} style={{ position: "absolute", right: 0, bottom: 0, transform: open ? `translate(${-x}px, ${-y}px) scale(1)` : `translate(0px, 0px) scale(0.6)`, opacity: open ? 1 : 0, transition: `transform 260ms cubic-bezier(.2,.7,.2,1), opacity 240ms ease`, transitionDelay: `${open ? delay : 0}ms`, display: "inline-flex", alignItems: "center", justifyContent: "center", width: btnSize, height: btnSize, borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.name === "dark" ? "rgba(12,14,16,0.60)" : "rgba(255,255,255,0.95)", color: theme.text, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", boxShadow: theme.name === "dark" ? "0 12px 28px rgba(0,0,0,0.40)" : "0 12px 28px rgba(0,0,0,0.14)", textDecoration: "none" }}>
                <div style={{ width: iconSize, height: iconSize, display: "grid", placeItems: "center" }}>{it.icon}</div>
              </a>
            );
          })}
        </div>
      )}

      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" aria-label={open ? "Close menu" : "Open menu"} style={{ width: triggerSize, height: triggerSize, borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.name === "dark" ? "rgba(12,14,16,0.70)" : "rgba(255,255,255,0.95)", color: theme.text, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", paddingBottom: "env(safe-area-inset-bottom)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
        <div style={{ width: 22, height: 22, display: "grid", placeItems: "center" }}>{Svg.plus}</div>
      </button>
    </div>
  );
}
