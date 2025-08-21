// =============================
// File: src/components/Logo.jsx
// =============================
import React from "react";

export default function Logo({ theme }) {
  return (
    <div
      style={{
        position: "fixed", top: 16, left: 20, zIndex: 3,
        fontWeight: 800, letterSpacing: 0.5,
        padding: "10px 12px", borderRadius: 12,
        border: `1px solid ${theme.border}`, color: theme.text,
        background: theme.name === "dark" ? "rgba(12,14,16,0.55)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)"
      }}
      title="Danila Ishcanka"
    >
      DI
    </div>
  );
}
