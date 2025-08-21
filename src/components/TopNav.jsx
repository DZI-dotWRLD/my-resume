import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ACCENT } from "../theme";

export default function TopNav({ theme }) {
  const location = useLocation();
  const linkBase = {
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    transition: "box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease",
    color: theme.text,
  };
  const styleFor = (active) => ({
    ...linkBase,
    border: `1px solid ${active ? ACCENT : theme.border}`,
    background: active
      ? (theme.name === "dark" ? "rgba(208,93,154,0.14)" : "rgba(208,93,154,0.12)")
      : (theme.name === "dark" ? "rgba(12,14,16,0.55)" : "rgba(255,255,255,0.85)"),
    boxShadow: active ? "0 10px 24px rgba(208,93,154,0.35)" : "0 10px 24px rgba(0,0,0,0.12)",
  });

  const onHover = (e) => {
    e.currentTarget.style.borderColor = ACCENT;
    e.currentTarget.style.boxShadow = "0 12px 28px rgba(208,93,154,0.45)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.12)";
  };

  return (
    <nav
      aria-label="Primary"
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        display: "flex",
        gap: 10,
      }}
    >
      <Link
        to="/"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={styleFor(location.pathname === "/")}
      >
        Home
      </Link>
      <Link
        to="/story"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={styleFor(location.pathname === "/story")}
      >
        My Story
      </Link>
    </nav>
  );
}
