// =============================
// File: src/App.jsx (updated)
// =============================
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DARK, LIGHT } from "./theme";
import { useMedia } from "./hooks";
import Home from "./pages/Home";
import Story from "./pages/Story";
import BackgroundFX from "./components/BackgroundFX";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import TopNav from "./components/TopNav";
import { LinkColumn, RadialMenu } from "./components/Links";

/* Route transitions */
const ROUTE_EASE = [0.2, 0.7, 0.2, 1];
const routeVariants = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: ROUTE_EASE } },
  exit:    { opacity: 0, y: -14, scale: 0.985, transition: { duration: 0.28, ease: ROUTE_EASE } },
};

function RouteTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={routeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: "relative" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const [themeName, setThemeName] = useState(prefersDark ? "dark" : "light");
  const theme = themeName === "dark" ? DARK : LIGHT;
  const isSmall = useMedia("(max-width: 899px)", false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.fontFamily =
      `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"`;
    return () => {
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Global styles: hide scrollbars (but keep scrolling), dynamic viewport, and motion guard */}
      <style>{`
        html, body { height: 100%; }
        #root { min-height: 100%; }

        /* Dynamic viewport for mobile address bar changes */
        .app-root { min-height: 100svh; position: relative; }

        /* Keep scrolling but hide scrollbars cross-browser */
        html, body {
          -ms-overflow-style: none;       /* IE/Edge */
          scrollbar-width: none;          /* Firefox */
          overscroll-behavior-y: none;    /* reduce rubber-banding */
          background: ${theme?.bg ?? "#0b0b0f"};
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar { display: none; }

        /* Utility: hide a container's own scrollbar */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        /* Avoid subtle horizontal overflow from transforms/filters */
        main, #app-shell { overflow-x: clip; }

        /* Respect reduced-motion for accessibility/perf */
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <div id="app-shell" className="app-root" style={{ position: "relative", minHeight: "100vh", color: theme.text }}>
        <BackgroundFX theme={theme} big={3} stars={110} />
        <Logo theme={theme} />
        <ThemeToggle theme={theme} setThemeName={setThemeName} />
        <TopNav theme={theme} />
        {isSmall ? <RadialMenu theme={theme} /> : <LinkColumn theme={theme} />}

        <RouteTransition>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/story" element={<Story theme={theme} />} />
          </Routes>
        </RouteTransition>
      </div>
    </BrowserRouter>
  );
}

