// =============================
// File: src/hooks.js
// =============================
export const TEST_CHARS = "!<>-_\/[]{}—=+*^?#";

import { useEffect, useState } from "react";

export function useMedia(query, initial = false) {
  const [matches, set] = useState(initial);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => set(m.matches);
    on();
    m.addEventListener ? m.addEventListener("change", on) : m.addListener(on);
    return () => {
      m.removeEventListener ? m.removeEventListener("change", on) : m.removeListener(on);
    };
  }, [query]);
  return matches;
}

export function useWindowSize() {
  const [s, set] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const on = () => set({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return s;
}

export function calcScrambleFrame(target, progress) {
  const p = Math.max(0, Math.min(1, progress || 0));
  const solid = Math.floor(target.length * p);
  let out = "";
  for (let i = 0; i < target.length; i++) {
    out += i < solid ? target[i] : TEST_CHARS[(i + 7) % TEST_CHARS.length];
  }
  return out;
}