"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ── icons ─────────────────────────────────────────────────── */
function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const ic = {
  spark:   "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  quiz:    "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  brain:   "M12 2a5 5 0 0 1 5 5c0 1.2-.4 2.3-1.1 3.1L19 16h-3v4h-4v-4H9v4H5v-4H2l3.1-5.9A5 5 0 0 1 12 2z",
  lock:    "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  x:       "M18 6L6 18M6 6l12 12",
  copy:    "M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1",
  check:   "M20 6L9 17l-5-5",
  arrow:   "M5 12h14M12 5l7 7-7 7",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

type Tab = "summarize" | "questions" | "explain";

const TABS: { id: Tab; label: string; icon: string; color: string; grad: string }[] = [
  { id: "summarize", label: "Summarize",          icon: ic.book,  color: "#2563EB", grad: "linear-gradient(135deg,#2563EB,#3B82F6)" },
  { id: "questions", label: "Generate Questions", icon: ic.quiz,  color: "#7C3AED", grad: "linear-gradient(135deg,#7C3AED,#9333EA)" },
  { id: "explain",   label: "Explain Topic",      icon: ic.brain, color: "#F59E0B", grad: "linear-gradient(135deg,#D97706,#F59E0B)" },
];

const PLACEHOLDERS: Record<Tab, string> = {
  summarize: "Paste your notes, lecture content, or any text here…",
  questions: "Paste your notes or topic content to generate practice questions…",
  explain:   "Type a concept or paragraph you find confusing…",
};

const SAMPLES: Record<Tab, string> = {
  summarize: `Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water. It occurs in two stages: the light-dependent reactions and the Calvin cycle. Light reactions capture solar energy to produce ATP and NADPH. The Calvin cycle uses these to fix CO2 into glucose. Overall: 6CO2 + 6H2O + light → C6H12O6 + 6O2.`,
  questions: `The French Revolution began in 1789. Key causes: financial crisis, social inequality between the Three Estates, and Enlightenment ideas. It led to abolition of the monarchy, the Reign of Terror under Robespierre, and the rise of Napoleon. The Declaration of the Rights of Man was adopted in 1789.`,
  explain:   `Quantum entanglement is a phenomenon where two particles become correlated such that the quantum state of each cannot be described independently of the others, even when separated by large distances. Einstein called this "spooky action at a distance."`,
};

const DEMO: Record<Tab, string> = {
  summarize: `**Key Topic**
Photosynthesis converts light energy into chemical energy stored as glucose.

**Main Points**
- Occurs in chloroplasts using the pigment chlorophyll
- Two stages: light-dependent reactions and the Calvin Cycle
- Light reactions produce ATP and NADPH from solar energy
- Calvin Cycle uses ATP and NADPH to fix CO₂ into organic molecules

**Overall Equation**
- 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
- Oxygen is released as a byproduct`,

  questions: `1. What were the three main causes of the French Revolution?
2. What was the Reign of Terror and who led it?
3. How did Enlightenment ideas contribute to the revolution?
4. What rights did the Declaration of the Rights of Man guarantee?
5. How did the French Revolution lead to Napoleon's rise to power?
6. What were the Three Estates and how did inequality between them cause conflict?`,

  explain: `**Simple Analogy**
Imagine two magic coins. You flip one in Lagos, the other in London — the moment one lands heads, the other instantly becomes tails. Every single time.

**What Actually Happens**
- Two particles become "entangled" when they interact or are created together
- Measuring one particle instantly defines the state of the other
- This happens regardless of the distance between them

**Why Einstein Was Bothered**
- It appears to violate the idea that nothing travels faster than light
- No usable information is actually transmitted, so physics is preserved

**Why It Matters Today**
- Foundation of quantum computing and quantum cryptography
- Enables theoretically "unhackable" communication systems`,
};

const FREE_LIMIT = 3;
const STORAGE_KEY = "class5_trial_count";

/* ── Trial counter dots ─────────────────────────────────────── */
function TrialDots({ used, total }: { used: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
        Free trials:
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i < used ? "#EF4444" : "rgba(255,255,255,0.15)",
              boxShadow: i < used ? "0 0 6px rgba(239,68,68,0.4)" : "none",
            }} />
        ))}
      </div>
      <span className="text-xs font-semibold" style={{
        color: used >= total ? "#EF4444" : used === total - 1 ? "#F59E0B" : "#64748B",
        fontFamily: "var(--font-sora)",
      }}>
        {total - used} left
      </span>
    </div>
  );
}

/* ── Result block ───────────────────────────────────────────── */
function ResultBlock({ tab, result, onCopy, copied }: {
  tab: Tab; result: string; onCopy: () => void; copied: boolean;
}) {
  const color = tab === "summarize" ? "#2563EB" : tab === "questions" ? "#7C3AED" : "#F59E0B";
  const bullets = result.split("\n").filter(Boolean);

  return (
    <div className="rounded-2xl p-5 mt-5"
      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `${color}20`, color }}>
            <Icon d={tab === "summarize" ? ic.book : tab === "questions" ? ic.quiz : ic.brain} size={13} />
          </div>
          <span className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>
            {tab === "summarize" ? "AI Summary" : tab === "questions" ? "Practice Questions" : "Explanation"}
          </span>
        </div>
        <button onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
          style={{
            fontFamily: "var(--font-dm)",
            background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
            color: copied ? "#10B981" : "#64748B",
            border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)"}`,
          }}>
          <Icon d={copied ? ic.check : ic.copy} size={12} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="space-y-2.5">
        {bullets.map((line, i) => {
          const isSection = line.startsWith("**") && line.endsWith("**");
          const isQ = tab === "questions" && /^\d+\./.test(line.trim());
          const clean = isSection ? line.replace(/\*\*/g, "") : line.replace(/^[-•]\s*/, "");

          if (isSection) return (
            <p key={i} className="font-semibold text-sm mt-3 first:mt-0"
              style={{ color, fontFamily: "var(--font-sora)" }}>{clean}</p>
          );
          if (isQ) return (
            <div key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: `${color}15`, color, fontFamily: "var(--font-sora)" }}>
                {line.match(/^(\d+)/)?.[1]}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}>
                {line.replace(/^\d+\.\s*/, "")}
              </p>
            </div>
          );
          return (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}>{clean}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Redirect countdown overlay ─────────────────────────────── */
function RedirectOverlay({ countdown }: { countdown: number }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="relative w-full max-w-sm rounded-3xl p-8 text-center space-y-5"
        style={{
          background: "#0F172A",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}>

        {/* animated lock */}
        <div className="relative inline-flex">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
            style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", boxShadow: "0 8px 32px rgba(37,99,235,0.45)" }}>
            <Icon d={ic.lock} size={32} />
          </div>
          {/* pulse ring */}
          <div className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }} />
        </div>

        <div>
          <h2 className="text-white font-extrabold text-2xl mb-2" style={{ fontFamily: "var(--font-sora)" }}>
            You&apos;ve used all 3 free trials!
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            Create a free account to unlock unlimited summaries, explanations, quizzes, and more.
          </p>
        </div>

        {/* countdown ring */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#1E293B" strokeWidth="4" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="#2563EB" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - countdown / 3)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-xl"
              style={{ fontFamily: "var(--font-sora)" }}>
              {countdown}
            </span>
          </div>
          <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Redirecting to sign up in {countdown}s…
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs justify-center"
            style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            {["Free account", "No credit card", "Unlimited access"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <span style={{ color: "#10B981" }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping { 75%,100%{transform:scale(1.8);opacity:0} }
        .animate-ping { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════ */
export default function TryPage() {
  const router = useRouter();

  const [tab, setTab]         = useState<Tab>("summarize");
  const [notes, setNotes]     = useState("");
  const [result, setResult]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  // Trial tracking — persisted in localStorage so refreshing doesn't reset it
  const [trialCount, setTrialCount] = useState(0);
  const [showRedirect, setShowRedirect] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Load trial count from localStorage on mount
  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    setTrialCount(stored);
    // If already exhausted, show redirect immediately
    if (stored >= FREE_LIMIT) {
      triggerRedirect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown timer when redirect overlay is shown
  useEffect(() => {
    if (!showRedirect) return;
    if (countdown <= 0) {
      router.push("/signup");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showRedirect, countdown, router]);

  const triggerRedirect = () => {
    setShowRedirect(true);
    setCountdown(3);
  };

  const saveTrialCount = (n: number) => {
    setTrialCount(n);
    localStorage.setItem(STORAGE_KEY, String(n));
  };

  const handleRun = () => {
    if (!notes.trim() || loading) return;

    // Check if trials exhausted before running
    if (trialCount >= FREE_LIMIT) {
      triggerRedirect();
      return;
    }

    setResult(null);
    setLoading(true);

    setTimeout(() => {
      setResult(DEMO[tab]);
      setLoading(false);

      const newCount = trialCount + 1;
      saveTrialCount(newCount);

      // If this was the last trial, show redirect after result is visible
      if (newCount >= FREE_LIMIT) {
        setTimeout(() => triggerRedirect(), 1800);
      }
    }, 1600);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.replace(/\*\*/g, "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trialsLeft = FREE_LIMIT - trialCount;
  const tabCfg = TABS.find((t) => t.id === tab)!;

  return (
    <main className="min-h-screen" style={{ background: "#0F172A" }}>

      {/* redirect overlay */}
      {showRedirect && <RedirectOverlay countdown={countdown} />}

      {/* ── top nav ───────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={60} height={50} />
        </a>

        <div className="flex items-center gap-4">
          <TrialDots used={trialCount} total={FREE_LIMIT} />
          <button onClick={() => router.push("/signup")}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg,#2563EB,#7C3AED)",
              fontFamily: "var(--font-sora)",
              boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
            Sign Up Free
          </button>
        </div>
      </div>

      {/* ── content ───────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 pt-28 pb-16">

        {/* header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#2563EB", fontFamily: "var(--font-sora)" }}>
            <Icon d={ic.spark} size={12} /> Try Class5 AI Free — {trialsLeft} trial{trialsLeft !== 1 ? "s" : ""} remaining
          </div>
          <h1 className="text-white"
            style={{ fontFamily: "var(--font-sora)", fontWeight: 800, fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1.1 }}>
            Your AI Study{" "}
            <span style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Assistant
            </span>
          </h1>
          <p className="text-base" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            {trialsLeft > 0
              ? `Paste your notes below. You have ${trialsLeft} free use${trialsLeft !== 1 ? "s" : ""} — no account needed.`
              : "You've used all your free trials. Sign up to unlock unlimited access."}
          </p>
        </div>

        {/* trial progress bar */}
        <div className="mb-6 px-1">
          <div className="flex justify-between text-xs mb-2" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            <span>Free trials used</span>
            <span style={{ color: trialCount >= FREE_LIMIT ? "#EF4444" : "#2563EB", fontFamily: "var(--font-sora)", fontWeight: 600 }}>
              {trialCount} / {FREE_LIMIT}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(trialCount / FREE_LIMIT) * 100}%`,
                background: trialCount >= FREE_LIMIT
                  ? "linear-gradient(90deg,#EF4444,#F87171)"
                  : trialCount === FREE_LIMIT - 1
                  ? "linear-gradient(90deg,#F59E0B,#FBBF24)"
                  : "linear-gradient(90deg,#2563EB,#7C3AED)",
              }} />
          </div>
          {trialCount === FREE_LIMIT - 1 && (
            <p className="text-xs mt-1.5 text-center" style={{ color: "#F59E0B", fontFamily: "var(--font-dm)" }}>
              ⚠️ Last free trial — sign up to keep going after this
            </p>
          )}
        </div>

        {/* tab switcher */}
        <div className="flex gap-2 p-1.5 rounded-2xl mb-5" style={{ background: "#1E293B" }}>
          {TABS.map((t) => (
            <button key={t.id}
              onClick={() => { setTab(t.id); setResult(null); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora)",
                background: tab === t.id ? t.grad : "transparent",
                color: tab === t.id ? "#fff" : "#475569",
                boxShadow: tab === t.id ? `0 4px 14px ${t.color}50` : "none",
              }}>
              <span className="hidden sm:flex"><Icon d={t.icon} size={15} /></span>
              {t.label}
            </button>
          ))}
        </div>

        {/* textarea card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#1E293B", border: `1px solid ${tabCfg.color}30` }}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={PLACEHOLDERS[tab]}
            rows={9}
            disabled={trialCount >= FREE_LIMIT}
            className="w-full resize-none bg-transparent px-5 pt-5 pb-3 text-sm leading-relaxed outline-none placeholder:text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}
          />

          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                {notes.length} chars
              </span>
              <button onClick={() => setNotes(SAMPLES[tab])}
                className="text-xs flex items-center gap-1 transition-colors"
                style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                <Icon d={ic.refresh} size={11} /> Sample
              </button>
              {notes && (
                <button onClick={() => { setNotes(""); setResult(null); }}
                  className="text-xs flex items-center gap-1 transition-colors"
                  style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                  <Icon d={ic.x} size={11} /> Clear
                </button>
              )}
            </div>

            <button onClick={handleRun}
              disabled={!notes.trim() || loading || trialCount >= FREE_LIMIT}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all duration-300"
              style={{
                fontFamily: "var(--font-sora)",
                background: (!notes.trim() || loading || trialCount >= FREE_LIMIT) ? "#334155" : tabCfg.grad,
                cursor: (!notes.trim() || loading || trialCount >= FREE_LIMIT) ? "not-allowed" : "pointer",
                boxShadow: (notes.trim() && !loading && trialCount < FREE_LIMIT) ? `0 4px 20px ${tabCfg.color}40` : "none",
              }}
              onMouseEnter={(e) => { if (notes.trim() && !loading && trialCount < FREE_LIMIT) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              {loading ? (
                <>
                  <svg className="w-4 h-4 spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Processing…
                </>
              ) : (
                <>
                  <Icon d={tabCfg.icon} size={15} />
                  {tab === "summarize" ? "Summarize" : tab === "questions" ? "Generate Questions" : "Explain This"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* result */}
        {result && (
          <ResultBlock tab={tab} result={result} onCopy={handleCopy} copied={copied} />
        )}

        {/* after last trial — inline CTA below result */}
        {trialCount >= FREE_LIMIT && !showRedirect && (
          <div className="mt-5 rounded-2xl p-6 text-center relative overflow-hidden"
            style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(37,99,235,0.2)" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 70%)" }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(37,99,235,0.15)", color: "#2563EB" }}>
                <Icon d={ic.lock} size={22} />
              </div>
              <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "var(--font-sora)" }}>
                That&apos;s all 3 free trials used!
              </h3>
              <p className="text-sm mb-4 max-w-xs mx-auto" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                Sign up free to get unlimited summaries, explanations, quizzes, XP, and more.
              </p>
              <button onClick={() => router.push("/signup")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                  fontFamily: "var(--font-sora)",
                  boxShadow: "0 6px 24px rgba(37,99,235,0.35)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
                Create Free Account <Icon d={ic.arrow} size={16} />
              </button>
              <p className="text-xs mt-3" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                Free plan · No credit card · Cancel anytime
              </p>
            </div>
          </div>
        )}

        {/* feature chips */}
        {!result && trialCount < FREE_LIMIT && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: "Instant summaries",   color: "#2563EB" },
              { label: "Auto quiz questions", color: "#7C3AED" },
              { label: "Simple explanations", color: "#F59E0B" },
              { label: "All subjects",        color: "#10B981" },
            ].map((chip) => (
              <div key={chip.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: `${chip.color}14`, border: `1px solid ${chip.color}30`, color: chip.color, fontFamily: "var(--font-dm)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                {chip.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </main>
  );
}