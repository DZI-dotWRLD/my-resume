// =============================
// File: src/pages/Story.jsx (resume-filled + projects rail w/ hidden scrollbar)
// - Real content from resume (skills, projects, education, tennis)
// - Interest in Agent AI & AI tools
// - Accent glow buttons, no borders, Apple-like spacing
// =============================
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ACCENT, LINKS } from "../theme";

const EASE = [0.2, 0.7, 0.2, 1];

// ---------- Variants
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const slowFadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const containerStagger = (stagger = 0.14, delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ---------------------------------------------------
   Button with ACCENT glow (no fill)
--------------------------------------------------- */
function GlowButton({ href, children, theme, style, ...rest }) {
  return (
    <a href={href} {...rest} style={{ textDecoration: "none", position: "relative" }}>
      <motion.span
        initial={false}
        whileHover={{
          y: -2,
          boxShadow: `0 0 0 1px ${ACCENT}, 0 0 24px ${ACCENT}66, 0 10px 28px rgba(0,0,0,0.28)`,
        }}
        transition={{ duration: 0.22, ease: EASE }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "transparent",
          border: "none",
          color: theme.text,
          borderRadius: 999,
          padding: "10px 16px",
          fontWeight: 600,
          letterSpacing: 0.2,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          transition: "box-shadow .2s ease, transform .2s ease",
          ...style,
        }}
      >
        {/* soft internal glow puddle */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: `radial-gradient(160px 160px at 50% 50%, ${ACCENT}33, transparent 60%)`,
            filter: "blur(18px)",
            opacity: 0,
            transition: "opacity .2s ease",
            pointerEvents: "none",
          }}
          className="btn-glow"
        />
        <style>{`.btn-glow:hover, .btn-glow:active{opacity:1}`}</style>
        {children}
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path d="M7 17l-3 3m0 0l3 3m-3-3h14a4 4 0 004-4V3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.span>
    </a>
  );
}

/* ---------------------------------------------------
   Hero (intro gate) — no borders, soft radial
--------------------------------------------------- */
function Hero({ theme, onIntroDone }) {
  const [finished, setFinished] = useState(false);
  useEffect(() => { if (finished) onIntroDone?.(); }, [finished, onIntroDone]);

  return (
    <header
      style={{
        minHeight: "62vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "96px 20px 40px",
        position: "relative",
        overflow: "hidden",
        border: "none", // ensure no border line
      }}
    >
      {/* Subtle radial accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-15% -25% auto -25%",
          height: 520,
          background: `radial-gradient(60% 60% at 50% 30%, ${ACCENT}33, transparent 70%)`,
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        variants={containerStagger(0.08, 0.05)}
        initial="hidden"
        animate="show"
        onAnimationComplete={() => setFinished(true)}
        style={{ maxWidth: 1000, width: "100%" }}
      >
        <motion.div variants={fadeUp} style={{ fontSize: "clamp(12px, 1.6vw, 14px)", opacity: 0.9, letterSpacing: 2, textTransform: "uppercase" }}>
          Story
        </motion.div>

        {/* Updated headline/subhead to be honest & motivated */}
        <motion.h1
          variants={fadeUp}
          style={{
            margin: "12px auto 12px",
            fontWeight: 900,
            lineHeight: 1.04,
            fontSize: "clamp(30px, 5.6vw, 64px)",
            color: theme.text,
            maxWidth: 900,
          }}
        >
          Where athletic grit meets tech precision
        </motion.h1>

        <motion.p
          variants={slowFadeUp}
          style={{
            margin: "0 auto",
            maxWidth: 820,
            lineHeight: 1.75,
            fontSize: "clamp(14px, 1.7vw, 18px)",
            color: theme.sub,
          }}
        >
          I’m <strong>Danila Ishchanka</strong> — a Computer Science student and former competitive tennis player. 
          I’m entering the tech industry with the same discipline I built on court: <strong>focus</strong>, <strong>persistence</strong>, and <strong>fast learning</strong>. 
          My strengths are in <strong>C++</strong>, <strong>OOP</strong>, <strong>DSA</strong>, <strong>Problem Solving</strong>, and improving steadily with each project. 
          I’m excited to apply these skills, keep growing, and contribute to real-world software teams.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <GlowButton theme={theme} href={LINKS.resume}>Resume</GlowButton>
          <GlowButton theme={theme} href={LINKS.github}>GitHub</GlowButton>
        </motion.div>
      </motion.div>
    </header>
  );
}

/* ---------------------------------------------------
   Snapshot — education + tennis + focus
--------------------------------------------------- */
function Snapshot({ theme }) {
  return (
    <section style={{ padding: "32px 20px 4px", border: "none" }}>
      <motion.div
        variants={containerStagger(0.14, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: theme.text, marginBottom: 10 }}>
          Snapshot
        </motion.h2>
        <motion.p variants={slowFadeUp} style={{ color: theme.sub, lineHeight: 1.8, margin: 0 }}>
         <strong>BS in Computer Science, LIU (GPA 3.6)</strong>. Recognized with ITA All-Academic and NEC honors as a student-athlete. 
         Competitive tennis background sharpened my discipline and teamwork. Building a foundation <strong>in databases, algorithms,
        and clean software design</strong> while developing practical tools that prioritize speed and simplicity.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------
   Interests — Agent AI / AI Tools (subtle, honest)
--------------------------------------------------- */
function Interests({ theme }) {
  return (
    <section style={{ padding: "10px 20px 6px", border: "none" }}>
      <motion.div
        variants={containerStagger(0.12, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <motion.h3 variants={fadeUp} style={{ fontSize: "clamp(18px, 2.6vw, 22px)", fontWeight: 800, color: theme.text, marginBottom: 6 }}>
          Interests/Tech Skills
        </motion.h3>
        <motion.p variants={slowFadeUp} style={{ color: theme.sub, lineHeight: 1.8, margin: 0 }}>
          Exploring <strong>Agent AI</strong> and practical <strong>AI tools</strong> for automation and developer productivity. 
          I see AI as the future of tech, so I’m preparing myself by gaining as much knowledge
          and hands-on experience as possible.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------
   Facts belt (skills → no borders)
--------------------------------------------------- */
function FactsBelt({ theme }) {
  const facts = useMemo(
    () => [
      "C++20",
      "Python (Automation, Aiogram,)",
      "SQL / MySQL",
      "Google APIs & Telegram API",
      "Object Oriented Programming",
      "Docker, GitHub",
      "Data Structures & Algorithms",
      "Agile / Scrum",
      "HTML • CSS • JS • React",
      "DevOps basics (CI/CD)",
    ],
    []
  );

  return (
    <section aria-label="Quick facts" style={{ padding: "16px 0 8px", border: "none" }}>
      <motion.ul
        className="facts-grid"
        variants={containerStagger(0.18, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          listStyle: "none",
          margin: "0 auto",
          padding: "0 20px",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <style>{`@media (min-width: 860px){ .facts-grid { grid-template-columns: repeat(6, 1fr); } }`}</style>
        {facts.map((f) => (
          <motion.li
            key={f}
            variants={slowFadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "none",
              color: theme.text,
            }}
          >
            <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: ACCENT, boxShadow: `0 0 12px ${ACCENT}66` }} />
            <span style={{ opacity: 0.95, fontSize: "clamp(13px, 1.5vw, 16px)" }}>{f}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

/* ---------------------------------------------------
   Projects Rail — centered cards (no hover glow)
--------------------------------------------------- */
function ProjectsRail({ theme }) {
  const items = [
    {
      t: "Vending Machine Simulation — C++20",
      d: "A classroom-to-reality project: designed a vending machine in C++20 with event-driven OOP. Custom EventManager handled coin insertion, product dispensing, and state transitions, while rigorous unit/integration testing kept it reliable.",
    },
    {
      t: "E-Commerce Platform — C++17",
      d: "A full simulation of an online shop: 500+ products managed with STL vectors/maps, a tax engine designed with SOLID principles and tested, and a command-line interface that stays clear and resilient under errors.",
    },
    {
      t: "Telegram Booking Bot — Python",
      d: "Built with Aiogram and Google Calendar API to automate tennis lesson scheduling. Supported async booking sessions with input validation, sent confirmation PDFs/invites, and cut down on double-bookings and missed lessons.",
    },
    {
      t: "GPU Mining Automation — Python/Linux",
      d: "Built scripts to keep mining rigs efficient: tracked hash rates, temps, and profitability, while auto-tuning power and network settings for steady uptime and reliable returns.",
    },
  ];

  return (
    <section style={{ padding: "22px 20px 8px", border: "none" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h3
          style={{
            fontSize: "clamp(18px, 2.8vw, 24px)",
            color: theme.text,
            fontWeight: 800,
            margin: "0 0 12px",
          }}
        >
          Projects
        </h3>

        <div
          className="no-scrollbar projects-rail"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "85%",
            gap: 16,
            paddingBottom: 8,
            border: "none",
          }}
        >
          <style>{`
            @media (min-width: 900px){
              .projects-rail { grid-auto-columns: 32%; }
            }
            .rail-card * { text-wrap: pretty; }
          `}</style>

          {items.map((it) => (
            <motion.article
              key={it.t}
              className="rail-card"
              whileHover={{
                y: -4,
                rotateX: 0.5,
                rotateY: -0.5,
              }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                scrollSnapAlign: "start",
                padding: 20,
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(255,255,255,0.08)`,
                color: theme.text,
                minHeight: 190,

                /* Center content fully */
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                gap: 12,

                boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
                willChange: "transform",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(17px, 2.4vw, 20px)", // slightly bigger
                }}
              >
                {it.t}
              </div>

              <div
                style={{
                  color: theme.sub,
                  lineHeight: 1.8,
                  fontSize: "clamp(14px, 1.7vw, 16px)", // slightly bigger
                }}
              >
                {it.d}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------------------------------------------------
   Strengths Narrative — humble & specific (no borders)
--------------------------------------------------- */
function StrengthsNarrative({ theme }) {
  const blocks = useMemo(
    () => [
      {
        h: "AI Focus",
        p: [
          "I see my future in AI — especially with AI agents and LLMs.",
          "I’ve started learning how they work, and I want to keep growing: not just experimenting with tools, but also understanding how they’re designed, trained, and applied in real-world products. My goal is to find opportunities where I can learn by doing, gain hands-on experience, and be part of building the next wave of AI systems.",
        ],
        bullets: ["Curious & growth-driven", "Competitive edge", "Business impact focus"],
      },
      {
        h: "Problem-Solving & Growth",
        p: [
          "I’m excited about using AI to improve how businesses work — automating processes, making decisions faster, and unlocking new value. Problem-solving drives me: breaking down challenges, exploring creative solutions, and building things that actually make an impact.",
        ],
        bullets: ["Problem-solving mindset", "Creative solutions", "Critical thinking"],
      },
      {
        h: "Collaboration & Communication",
        p: [
          "I care about being a clear communicator and strong teammate. I believe steady progress, transparency, and helping others move forward is just as important as technical skills.",
          "From tennis, I bring discipline, competitiveness, and resilience under pressure. Those habits fuel my learning in tech and keep me hungry for growth in AI.",
        ],
        bullets: ["Adaptable & coachable", "Collaboration", "Handle challenges without losing focus"],
      },
    ],
    []
  );

  return (
    <section style={{ padding: "26px 20px 10px", border: "none" }}>
      <motion.div
        variants={containerStagger(0.16, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        <motion.h3 variants={fadeUp} style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, color: theme.text, marginBottom: 8 }}>
          Personal Drive
        </motion.h3>

        <div className="strengths-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <style>{`@media (min-width: 960px){ .strengths-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }`}</style>

          {blocks.map((b) => (
            <motion.div
              key={b.h}
              variants={slowFadeUp}
              style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "none" }}
            >
              <div style={{ fontWeight: 900, color: theme.text, fontSize: "clamp(18px, 2.6vw, 22px)" }}>{b.h}</div>
              {b.p.map((para, idx) => (
                <p key={idx} style={{ color: theme.sub, lineHeight: 1.7, margin: "8px 0 0 0", fontSize: "clamp(13px, 1.6vw, 16px)" }}>
                  {para}
                </p>
              ))}

              <ul style={{ margin: "12px 0 0 0", padding: 0, listStyle: "none", color: theme.text }}>
                {b.bullets.map((li) => (
                  <li key={li} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "baseline", padding: "6px 0" }}>
                    <span aria-hidden style={{ width: 8, height: 8, marginTop: 4, borderRadius: 999, background: ACCENT, boxShadow: `0 0 12px ${ACCENT}66` }} />
                    <span style={{ opacity: 0.95, fontSize: "clamp(13px, 1.6vw, 16px)" }}>{li}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------
   CTA — honest ask
--------------------------------------------------- */
function CTA({ theme }) {
  return (
    <section style={{ padding: "26px 20px 72px", border: "none" }}>
      <motion.div
        variants={containerStagger(0.12, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}
      >
        <motion.h3 variants={fadeUp} style={{ fontSize: "clamp(20px, 3.2vw, 28px)", fontWeight: 900, color: theme.text, marginBottom: 10 }}>
          Eager to learn and contribute.
        </motion.h3>
        <motion.p variants={slowFadeUp} style={{ color: theme.sub, lineHeight: 1.85, marginBottom: 16 }}>
          If you think these skills could help your team,
          I’d appreciate the opportunity to gain experience.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <GlowButton theme={theme} href={LINKS.linkedin}>Get in touch</GlowButton>
          <GlowButton theme={theme} href={LINKS.resume}>Resume</GlowButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------
   Story Page (export) with intro gate
--------------------------------------------------- */
export default function Story({ theme }) {
  const [introDone, setIntroDone] = useState(false);
  const contentStyle = { visibility: introDone ? "visible" : "hidden" };

  return (
    <div style={{ position: "relative", zIndex: 1, color: theme.text, border: "none" }}>
      <Hero theme={theme} onIntroDone={() => setIntroDone(true)} />
      <div style={contentStyle}>
        <Snapshot theme={theme} />
        <Interests theme={theme} />
        <FactsBelt theme={theme} />
        <ProjectsRail theme={theme} />
        <StrengthsNarrative theme={theme} />
        <CTA theme={theme} />
      </div>
    </div>
  );
}
