// =============================
// File: src/components/ThemeToggle.jsx
// =============================
import React from "react";

const Sun = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 11h3v2H1v-2zm10-10h2v3h-2V1zm7.07 2.05l1.79 1.79-1.79 1.79-1.79-1.79 1.79-1.79zM20 11h3v2h-3v-2zm-9 9h2v3h-2v-3zM6.76 19.16l-1.8 1.8-1.79-1.8 1.79-1.79 1.8 1.79zM19.04 19.16l1.79 1.8 1.79-1.8-1.79-1.79-1.79 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z"/>
  </svg>
);
const Moon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M21.75 14.5A9.75 9.75 0 1110.5 2.25 7.5 7.5 0 0021.75 14.5z"/>
  </svg>
);

export default function ThemeToggle({ theme, setThemeName }) {
  const isDark = theme.name === "dark";
  return (
    <button
      onClick={() => setThemeName(isDark ? "light" : "dark")}
      aria-label="Toggle day/night"
      style={{
        position: "fixed", top: 16, right: 20, zIndex: 3,
        background: isDark ? "rgba(12,14,16,0.55)" : "rgba(255,255,255,0.9)",
        color: theme.text, border: `1px solid ${theme.border}`,
        borderRadius: 12, padding: "10px 12px", cursor: "pointer",
        fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8,
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)"
      }}
    >
      {isDark ? <Sun /> : <Moon />} {isDark ? "Day" : "Night"}
    </button>
  );
}