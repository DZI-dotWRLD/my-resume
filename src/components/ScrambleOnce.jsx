// =============================
// File: src/components/ScrambleOnce.jsx
// =============================
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TEST_CHARS } from "../hooks";

export default function ScrambleOnce({ text, duration = 3000, style }) {
  const [out, setOut] = useState(text);
  const targetRef = useRef(text);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const CHARS = useMemo(() => TEST_CHARS.split(""), []);
  useEffect(() => {
    const step = () => {
      const frames = Math.max(1, Math.round(duration / 16.6));
      const progress = Math.min(1, frameRef.current / frames);
      const n = targetRef.current.length;
      let s = "";
      for (let i = 0; i < n; i++) {
        if (i < Math.floor(n * progress)) s += targetRef.current[i];
        else s += CHARS[(i + Math.floor(Math.random() * CHARS.length)) % CHARS.length];
      }
      setOut(s);
      frameRef.current += 1;
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    targetRef.current = text;
    cancelAnimationFrame(rafRef.current);
    frameRef.current = 0;
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, duration, CHARS]);
  return <span style={style} aria-label={text}>{out}</span>;
}
