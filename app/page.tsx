"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/* ─── Tiny SVG icon helper ─────────────────────────────────── */
function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const ic = {
  arrow:    "M5 12h14M12 5l7 7-7 7",
  check:    "M20 6L9 17l-5-5",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  brain:    "M9.5 2A6.5 6.5 0 0 1 16 8.5c0 1.63-.6 3.12-1.6 4.26L20 18.38 18.38 20l-5.62-5.6A6.5 6.5 0 1 1 9.5 2z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  quiz:     "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  menu:     "M3 12h18M3 6h18M3 18h18",
  x:        "M18 6L6 18M6 6l12 12",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

/* ─── Navbar ───────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Features", "How It Works", "Pricing", "Tutors"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(15,23,42,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
         <Image src="/logo.png" alt="logo" width={60} height={50} />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F8FAFC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              border: "1.5px solid rgba(37,99,235,0.4)",
              fontFamily: "var(--font-sora)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#2563EB";
              e.currentTarget.style.background = "rgba(37,99,235,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Log In
          </a>
          <a
            href="#signup"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
              fontFamily: "var(--font-sora)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,99,235,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.35)";
            }}
          >
            Try App
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
          <Icon d={open ? ic.x : ic.menu} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-4 mt-1"
          style={{
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-base"
              style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <a
            href="#signup"
            className="px-5 py-3 rounded-xl text-sm font-semibold text-white text-center mt-1"
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
              fontFamily: "var(--font-sora)",
            }}
          >
            Get Started Free
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            top: "10%", left: "5%",
            width: 520, height: 520,
            background: "rgba(37,99,235,0.18)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "25%", right: "4%",
            width: 420, height: 420,
            background: "rgba(124,58,237,0.22)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "8%", left: "38%",
            width: 300, height: 300,
            background: "rgba(245,158,11,0.08)",
            filter: "blur(80px)",
          }}
        />
        {/* grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(30,41,59,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#F59E0B", animation: "pulse 2s infinite" }}
            />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                fontFamily: "var(--font-sora)",
                background: "linear-gradient(90deg,#F59E0B,#FBBF24,#F59E0B)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}
            >
              AI-Powered Academic Ecosystem
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-sora)", lineHeight: 1.05 }}>
            <span className="block text-white" style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", fontWeight: 800 }}>
              Study Smarter.
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(2.8rem,6vw,4.5rem)",
                fontWeight: 800,
                background: "linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Achieve More.
            </span>
          </h1>

          <p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}
          >
            Class5 AI brings together AI-powered summaries, instant explanations,
            quiz generation, study groups, and a tutor marketplace — everything you
            need to excel academically.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#signup"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-white text-base transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)",
                fontFamily: "var(--font-sora)",
                boxShadow: "0 8px 30px rgba(37,99,235,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(37,99,235,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,99,235,0.4)";
              }}
            >
              Start Learning Free <Icon d={ic.arrow} size={18} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-white text-base transition-all duration-300"
              style={{
                border: "1.5px solid rgba(37,99,235,0.45)",
                fontFamily: "var(--font-sora)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37,99,235,0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Icon d={ic.zap} size={18} /> Try App
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-5 pt-1">
            <div className="flex -space-x-3">
              {[
                ["A", "#3B82F6"],
                ["S", "#8B5CF6"],
                ["K", "#F59E0B"],
                ["T", "#10B981"],
                ["R", "#EC4899"],
              ].map(([letter, bg], i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    background: bg,
                    border: "2px solid #0F172A",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1" style={{ color: "#F59E0B" }}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} d={ic.star} size={13} />
                ))}
              </div>
              <p className="text-sm" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                Loved by <strong className="text-white">12,000+</strong> students
              </p>
            </div>
          </div>
        </div>

        {/* Right — mockup */}
        <div
          className="flex justify-center"
          style={{ animation: "float 5s ease-in-out infinite" }}
        >
          <div
            className="w-full max-w-md rounded-3xl p-5 shadow-2xl"
            style={{
              background: "rgba(30,41,59,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 60px rgba(124,58,237,0.25)",
            }}
          >
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: "#F87171" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#FBBF24" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#34D399" }} />
              <div
                className="ml-3 flex-1 h-5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "XP Today", val: "480", color: "#2563EB" },
                { label: "Streak",   val: "14d", color: "#F59E0B" },
                { label: "Quizzes",  val: "23",  color: "#7C3AED" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="font-bold text-xl"
                    style={{ color: s.color, fontFamily: "var(--font-sora)" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* AI chat bubble */}
            <div
              className="rounded-2xl p-4 mb-4 space-y-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                  style={{
                    background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  AI
                </div>
                <div
                  className="rounded-2xl rounded-tl-none px-4 py-2.5 text-sm leading-relaxed"
                  style={{
                    background: "#1E293B",
                    color: "#CBD5E1",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  Here&apos;s a summary of Chapter 4 —{" "}
                  <span style={{ color: "#F59E0B", fontWeight: 500 }}>Photosynthesis</span>.
                  Light energy is converted to chemical energy stored in glucose…
                </div>
              </div>
              <div className="flex items-center gap-2 ml-10">
                <div className="h-1.5 flex-1 rounded-full" style={{ background: "#1E293B" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "75%",
                      background: "linear-gradient(90deg,#2563EB,#7C3AED)",
                    }}
                  />
                </div>
                <span className="text-xs" style={{ color: "#475569" }}>75%</span>
              </div>
            </div>

            {/* Quiz */}
            <div
              className="rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-semibold text-sm text-white"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Quick Quiz — Biology
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "#F59E0B",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  Live
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                Which organelle is responsible for photosynthesis?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Nucleus", "Chloroplast", "Mitochondria", "Ribosome"].map((opt, i) => (
                  <div
                    key={opt}
                    className="rounded-xl px-3 py-2 text-xs cursor-pointer transition-all"
                    style={
                      i === 1
                        ? {
                            background: "rgba(37,99,235,0.25)",
                            border: "1px solid rgba(37,99,235,0.5)",
                            color: "#fff",
                            fontFamily: "var(--font-dm)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "#64748B",
                            fontFamily: "var(--font-dm)",
                          }
                    }
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.4; }
        }
      `}</style>
    </section>
  );
}

/* ─── Features ─────────────────────────────────────────────── */
function Features() {
  const features = [
    { icon: ic.book,     grad: "135deg,#2563EB,#3B82F6", glow: "rgba(37,99,235,0.3)",   tag:"AI Core",       title:"PDF & Note Summarizer",    desc:"Upload any PDF or lecture note and get instant AI summaries, key points, and study highlights." },
    { icon: ic.brain,    grad: "135deg,#7C3AED,#9333EA", glow: "rgba(124,58,237,0.3)",  tag:"Smart Learning",title:"Concept Explainer",          desc:"Class5 AI breaks down complex topics into clear, simple explanations tailored to your level." },
    { icon: ic.quiz,     grad: "135deg,#F59E0B,#FBBF24", glow: "rgba(245,158,11,0.3)",  tag:"Practice",      title:"Quiz Generator",             desc:"Auto-generate MCQs, fill-in-the-blanks, and true/false questions from any topic or content." },
    { icon: ic.message,  grad: "135deg,#06B6D4,#0EA5E9", glow: "rgba(6,182,212,0.3)",   tag:"24/7 Support",  title:"AI Academic Chat",           desc:"Ask anything — homework, exam prep, essay guidance — and get instant, accurate answers." },
    { icon: ic.users,    grad: "135deg,#10B981,#34D399", glow: "rgba(16,185,129,0.3)",  tag:"Collaboration", title:"Study Groups",                desc:"Create or join subject-specific groups, share notes, collaborate on quizzes with classmates." },
    { icon: ic.chart,    grad: "135deg,#EC4899,#F43F5E", glow: "rgba(236,72,153,0.3)",  tag:"Analytics",     title:"Progress Dashboard",         desc:"Track XP, streaks, and quiz scores on a personalised dashboard. Stay motivated." },
    { icon: ic.calendar, grad: "135deg,#F59E0B,#7C3AED", glow: "rgba(124,58,237,0.25)", tag:"Tutoring",      title:"Tutor Marketplace",          desc:"Browse vetted tutors by subject and availability. Book one-on-one coaching sessions." },
    { icon: ic.shield,   grad: "135deg,#2563EB,#7C3AED", glow: "rgba(37,99,235,0.25)",  tag:"Multi-Role",    title:"Role-Based Dashboards",      desc:"Separate dashboards for Students, Tutors, and Admins with dedicated tools and analytics." },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#2563EB",
              fontFamily: "var(--font-sora)",
            }}
          >
            Everything You Need
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.75rem)",
              lineHeight: 1.1,
              color: "#F8FAFC",
            }}
          >
            One Platform.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Infinite Possibilities.
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}
          >
            From AI summaries to live tutor sessions — every tool a student needs under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 cursor-default transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(30,41,59,0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4"
                style={{
                  background: `linear-gradient(${f.grad})`,
                  boxShadow: `0 8px 24px ${f.glow}`,
                }}
              >
                <Icon d={f.icon} size={22} />
              </div>
              <div
                className="text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: "#475569", fontFamily: "var(--font-sora)" }}
              >
                {f.tag}
              </div>
              <h3
                className="font-bold text-white text-base mb-2 leading-snug"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─────────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { val: "12K+", label: "Active Students",  color: "#2563EB" },
    { val: "500+", label: "Expert Tutors",     color: "#7C3AED" },
    { val: "98%",  label: "Satisfaction Rate", color: "#F59E0B" },
    { val: "2M+",  label: "Quizzes Taken",     color: "#10B981" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden"
          style={{
            background: "rgba(30,41,59,0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(124,58,237,0.06) 100%)",
            }}
          />
          {stats.map((s) => (
            <div key={s.label} className="relative">
              <div
                style={{
                  fontFamily: "var(--font-sora)",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem,5vw,3.75rem)",
                  color: s.color,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {s.val}
              </div>
              <div className="text-sm" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Create Your Account",    desc: "Sign up free and select your education level — primary, secondary, or university." },
    { num: "02", title: "Upload or Ask Anything", desc: "Drop in your notes or PDFs, or simply type a question to get instant AI help." },
    { num: "03", title: "Practice & Collaborate", desc: "Take quizzes, join study groups, and reinforce learning through spaced repetition." },
    { num: "04", title: "Track Your Progress",    desc: "Watch your XP grow, maintain streaks, and hit your goals with real analytics." },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: 0, top: "40%",
          width: 400, height: 400,
          background: "rgba(37,99,235,0.08)",
          filter: "blur(120px)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B",
              fontFamily: "var(--font-sora)",
            }}
          >
            Simple Onboarding
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.75rem)",
              color: "#F8FAFC",
            }}
          >
            Up &amp; Running{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F59E0B,#FBBF24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in Minutes
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="text-center group">
              <div className="relative inline-flex mb-6">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                    fontFamily: "var(--font-sora)",
                    fontWeight: 900,
                    fontSize: "1.75rem",
                    boxShadow: "0 12px 32px rgba(37,99,235,0.4)",
                  }}
                >
                  {s.num}
                </div>
              </div>
              <h3
                className="font-bold text-white text-lg mb-2"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ───────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₦0",
      period: "forever",
      features: ["5 AI summaries/month", "10 quiz questions/day", "Basic AI chat", "5 study group", "Progress tracking"],
      cta: "Get Started Free",
      highlight: false,
    },
    {
      name: "Student Premium",
      price: "₦2,500",
      period: "per month",
      badge: "Most Popular",
      features: ["Unlimited AI summaries", "Unlimited quizzes", "Priority AI chat", "Unlimited study groups", "Advanced analytics",],
      cta: "Start Plan",
      highlight: true,
    },
    {
      name: "Student Pro",
      price: "₦5,000",
      period: "per month",
      features: ["Everything in Premium", "AI Voice Tutor", "Access to Resources", "Bulk student onboarding", "20% tutor session discount", "Downloadable study packs"],
      cta: "Start Pro Plan",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          right: 0, top: "30%",
          width: 400, height: 400,
          background: "rgba(124,58,237,0.1)",
          filter: "blur(120px)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#2563EB",
              fontFamily: "var(--font-sora)",
            }}
          >
            Pricing
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.75rem)",
              color: "#F8FAFC",
            }}
          >
            Plans for{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every Student
            </span>
          </h2>
          <p className="text-lg" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className="relative rounded-3xl p-8 flex flex-col"
              style={
                p.highlight
                  ? {
                      background: "linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)",
                      boxShadow: "0 20px 60px rgba(37,99,235,0.4)",
                      transform: "scale(1.03)",
                    }
                  : {
                      background: "rgba(30,41,59,0.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
            >
              {p.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide"
                  style={{
                    background: "#F59E0B",
                    color: "#0F172A",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {p.badge}
                </div>
              )}

              <div className="mb-6">
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{
                    color: p.highlight ? "rgba(219,234,254,0.8)" : "#475569",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontWeight: 900,
                    fontSize: "3rem",
                    color: "#F8FAFC",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {p.price}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: p.highlight ? "rgba(219,234,254,0.7)" : "#475569",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {p.period}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{
                      color: p.highlight ? "rgba(219,234,254,0.9)" : "#94A3B8",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: p.highlight ? "#F59E0B" : "#2563EB" }}
                    >
                      <Icon d={ic.check} size={16} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#signup"
                className="block text-center py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300"
                style={
                  p.highlight
                    ? {
                        background: "#ffffff",
                        color: "#2563EB",
                        fontFamily: "var(--font-sora)",
                      }
                    : {
                        background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                        color: "#fff",
                        fontFamily: "var(--font-sora)",
                      }
                }
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    { name: "Amara O.",        role: "200L Biology, OAU",          avatar: "A", color: "#3B82F6", text: "Class5 AI saved my exam. I uploaded my notes the night before and had a full summary and quiz in minutes. My score jumped from C to A." },
    { name: "Chukwuemeka I.",  role: "SS3 Student, Lagos",         avatar: "C", color: "#8B5CF6", text: "The AI explains things better than some of my teachers. I asked it to simplify photosynthesis 3 times and it kept adapting. Incredible." },
    { name: "Fatima K.",       role: "HND Accounting, Kano",       avatar: "F", color: "#F59E0B", text: "My classmates and I use study groups every weekend. We quiz each other with auto-generated questions. Our GPA improved as a whole group." },
    { name: "David E.",        role: "300L CS, Covenant University",avatar: "D", color: "#10B981", text: "Booked a tutor through the marketplace for Data Structures. The session was seamless and top-tier. Worth every naira of the Pro plan." },
  ];

  return (
    <section className="py-24 relative">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B",
              fontFamily: "var(--font-sora)",
            }}
          >
            Student Love
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.75rem)",
              color: "#F8FAFC",
            }}
          >
            Real Results.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F59E0B,#FBBF24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Real Students.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl p-6 flex flex-col gap-4 transition-transform duration-300 hover:scale-[1.02] cursor-default"
              style={{
                background: "rgba(30,41,59,0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex gap-0.5" style={{ color: "#F59E0B" }}>
                {[...Array(5)].map((_, i) => <Icon key={i} d={ic.star} size={13} />)}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div
                className="flex items-center gap-3 pt-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: r.color, fontFamily: "var(--font-sora)" }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
                    {r.name}
                  </div>
                  <div className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                    {r.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="relative rounded-3xl px-10 py-16 text-center space-y-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg,#2563EB 0%,#4F46E5 50%,#7C3AED 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 25% 50%, rgba(245,158,11,0.2) 0%, transparent 55%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.1) 0%, transparent 40%)",
            }}
          />
          <div className="relative">
            <div
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}
            >
              🚀 Free for Students
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sora)",
                fontWeight: 800,
                fontSize: "clamp(2rem,5vw,3.5rem)",
                color: "#F8FAFC",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Your Academic Edge<br />Starts Today
            </h2>
            <p
              className="text-lg max-w-xl mx-auto mb-8"
              style={{ color: "rgba(219,234,254,0.85)", fontFamily: "var(--font-dm)" }}
            >
              Join 12,000+ students already using Class5 AI to ace their exams,
              understand complex topics, and study smarter every day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#signup"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300"
                style={{
                  background: "#ffffff",
                  color: "#2563EB",
                  fontFamily: "var(--font-sora)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
                }}
              >
                Start Learning Free <Icon d={ic.arrow} size={18} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-300"
                style={{
                  border: "2px solid rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-sora)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Explore Features
              </a>
            </div>
            <p className="text-sm mt-5" style={{ color: "rgba(191,219,254,0.7)", fontFamily: "var(--font-dm)" }}>
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { heading: "Product", links: ["Features", "Pricing", "Tutor Marketplace", "Study Groups", "Mobile App"] },
    { heading: "Company", links: ["About Us", "Blog", "Careers", "Press", "Contact"] },
    { heading: "Support", links: ["Help Centre", "Terms of Service", "Privacy Policy", "Cookie Policy", "Status"] },
  ];

  return (
    <footer
      className="pt-16 pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="logo" width={60} height={50} />
              
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
              The AI-powered academic ecosystem helping students of all levels
              study smarter and achieve more.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((c) => (
            <div key={c.heading}>
              <h4
                className="font-semibold text-white text-sm mb-5 tracking-wide"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {c.heading}
              </h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F8FAFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-sm" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            &copy; 2026 Class5 AI. All rights reserved. Made by Abdulmalik with ❤️ for students.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#34D399", animation: "pulse 2s infinite" }}
            />
            <span className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}