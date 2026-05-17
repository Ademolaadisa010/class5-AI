"use client";

import { useState } from "react";

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
  check:   "M20 6L9 17l-5-5",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  eyeoff:  "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  arrow:   "M5 12h14M12 5l7 7-7 7",
  copy:    "M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

type Tab = "summarize" | "questions" | "explain";

const TABS: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: "summarize", label: "Summarize",        icon: ic.book,  color: "#2563EB" },
  { id: "questions", label: "Generate Questions", icon: ic.quiz,  color: "#7C3AED" },
  { id: "explain",   label: "Explain Topic",     icon: ic.brain, color: "#F59E0B" },
];

const PLACEHOLDERS: Record<Tab, string> = {
  summarize: "Paste your notes, lecture content, or any text here and Class5 AI will generate a clear, structured summary for you…",
  questions: "Paste your notes or topic content here and Class5 AI will generate practice questions to test your understanding…",
  explain:   "Paste or type a concept, topic, or paragraph you find confusing and Class5 AI will explain it in simple terms…",
};

const SAMPLES: Record<Tab, string> = {
  summarize: `Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct. The process occurs in two stages: the light-dependent reactions and the Calvin cycle. During the light-dependent reactions, solar energy is captured and used to produce ATP and NADPH. The Calvin cycle uses the ATP and NADPH produced by the light reactions to fix CO2 into organic molecules. The overall reaction is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2.`,
  questions: `The French Revolution began in 1789 with the storming of the Bastille. Key causes included financial crisis, social inequality between the Three Estates, and Enlightenment ideas. The revolution led to the abolition of the monarchy, the Reign of Terror under Robespierre, and ultimately the rise of Napoleon Bonaparte. The Declaration of the Rights of Man and Citizen was adopted in 1789, inspired by Enlightenment philosophy and the American Declaration of Independence.`,
  explain:   `Quantum entanglement is a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances. Einstein famously called this "spooky action at a distance."`,
};

/* ── Login Modal ────────────────────────────────────────────── */
function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => onSuccess(), 900);
    }, 1400);
  };

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-8"
        style={{
          background: "#0F172A",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
        >
          <Icon d={ic.x} size={18} />
        </button>

        {/* lock badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}
          >
            <Icon d={ic.lock} size={24} />
          </div>
        </div>

        <h2 className="text-center font-bold text-white text-2xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>
          {done ? "Welcome aboard! 🎉" : mode === "login" ? "Welcome back" : "Start your free trial"}
        </h2>
        <p className="text-center text-sm mb-6" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
          {done ? "Unlocking your AI tools…" : mode === "login" ? "Log in to unlock all AI features" : "Free — no credit card needed"}
        </p>

        {!done && (
          <>
            {/* tabs */}
            <div
              className="flex rounded-xl p-1 mb-5"
              style={{ background: "#1E293B" }}
            >
              {(["login","signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-sora)",
                    background: mode === m ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "transparent",
                    color: mode === m ? "#fff" : "#64748B",
                  }}
                >
                  {m === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.07)",
                    fontFamily: "var(--font-dm)",
                  }}
                />
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                style={{
                  background: "#1E293B",
                  border: "1px solid rgba(255,255,255,0.07)",
                  fontFamily: "var(--font-dm)",
                }}
              />
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none pr-11"
                  style={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.07)",
                    fontFamily: "var(--font-dm)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <Icon d={showPass ? ic.eyeoff : ic.eye} size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-5 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300"
              style={{
                background: loading ? "#334155" : "linear-gradient(135deg,#2563EB,#7C3AED)",
                fontFamily: "var(--font-sora)",
                boxShadow: loading ? "none" : "0 6px 24px rgba(37,99,235,0.4)",
              }}
            >
              {loading ? "Verifying…" : mode === "login" ? "Log In & Continue" : "Create Free Account"}
            </button>

            <p className="text-center text-xs mt-4" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
              By continuing you agree to our Terms of Service & Privacy Policy.
            </p>
          </>
        )}

        {done && (
          <div className="flex justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}
            >
              <Icon d={ic.check} size={22} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Result block ───────────────────────────────────────────── */
function ResultBlock({
  tab, result, onCopy, copied,
}: {
  tab: Tab; result: string; onCopy: () => void; copied: boolean;
}) {
  const bullets = result.split("\n").filter(Boolean);

  return (
    <div
      className="rounded-2xl p-5 mt-5"
      style={{
        background: "rgba(30,41,59,0.7)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{
              background:
                tab === "summarize" ? "rgba(37,99,235,0.2)"
                : tab === "questions" ? "rgba(124,58,237,0.2)"
                : "rgba(245,158,11,0.2)",
              color:
                tab === "summarize" ? "#2563EB"
                : tab === "questions" ? "#7C3AED"
                : "#F59E0B",
            }}
          >
            <Icon d={tab === "summarize" ? ic.book : tab === "questions" ? ic.quiz : ic.brain} size={13} />
          </div>
          <span className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>
            {tab === "summarize" ? "AI Summary" : tab === "questions" ? "Practice Questions" : "Explanation"}
          </span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
          style={{
            fontFamily: "var(--font-dm)",
            background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
            color: copied ? "#10B981" : "#64748B",
            border: "1px solid",
            borderColor: copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)",
          }}
        >
          <Icon d={copied ? ic.check : ic.copy} size={12} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="space-y-2.5">
        {bullets.map((line, i) => {
          const isQ = tab === "questions" && /^\d+\./.test(line.trim());
          const isSection = line.startsWith("**") && line.endsWith("**");
          const clean = isSection ? line.replace(/\*\*/g, "") : line.replace(/^[-•]\s*/, "");

          return (
            <div key={i}>
              {isSection ? (
                <p
                  className="font-semibold text-sm mt-3 first:mt-0"
                  style={{
                    color:
                      tab === "summarize" ? "#2563EB"
                      : tab === "questions" ? "#7C3AED"
                      : "#F59E0B",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {clean}
                </p>
              ) : isQ ? (
                <div className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(124,58,237,0.15)", color: "#7C3AED", fontFamily: "var(--font-sora)" }}
                  >
                    {line.match(/^(\d+)/)?.[1]}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}>
                    {line.replace(/^\d+\.\s*/, "")}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2.5 items-start">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background:
                        tab === "summarize" ? "#2563EB"
                        : tab === "questions" ? "#7C3AED"
                        : "#F59E0B",
                    }}
                  />
                  <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}>
                    {clean}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Upgrade gate ───────────────────────────────────────────── */
function UpgradeGate({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="mt-5 rounded-2xl p-6 text-center relative overflow-hidden"
      style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
          style={{ background: "rgba(37,99,235,0.15)", color: "#2563EB" }}
        >
          <Icon d={ic.lock} size={22} />
        </div>
        <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "var(--font-sora)" }}>
          Unlock Full Access
        </h3>
        <p className="text-sm mb-4 max-w-xs mx-auto" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
          You&apos;ve used your free preview. Log in or sign up to get your free trial — no credit card needed.
        </p>
        <button
          onClick={onLogin}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300"
          style={{
            background: "linear-gradient(135deg,#2563EB,#7C3AED)",
            fontFamily: "var(--font-sora)",
            boxShadow: "0 6px 24px rgba(37,99,235,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 10px 32px rgba(37,99,235,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,99,235,0.35)";
          }}
        >
          Log In / Sign Up Free <Icon d={ic.arrow} size={16} />
        </button>
        <p className="text-xs mt-3" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
          Free plan · No credit card · Cancel anytime
        </p>
      </div>
    </div>
  );
}

/* ── DEMO responses ─────────────────────────────────────────── */
const DEMO: Record<Tab, string> = {
  summarize: `**Key Topic**
Photosynthesis is the biological process by which plants convert light energy into chemical energy stored as glucose.

**Main Points**
- Occurs inside chloroplasts using the green pigment chlorophyll
- Takes place in two stages: light-dependent reactions and the Calvin Cycle
- Light reactions capture solar energy and produce ATP and NADPH
- The Calvin Cycle uses ATP and NADPH to fix CO₂ into organic molecules

**Overall Equation**
- 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
- Oxygen is released as a byproduct of the light reactions`,

  questions: `1. What is the primary function of chlorophyll in photosynthesis?
2. Name the two main stages of photosynthesis and describe what happens in each.
3. What are ATP and NADPH, and why are they important to the Calvin Cycle?
4. Write the overall balanced equation for photosynthesis and identify the reactants and products.
5. Why is photosynthesis essential for life on Earth beyond just feeding plants?
6. Where exactly in the plant cell does photosynthesis take place?`,

  explain: `**What is Quantum Entanglement?**
Imagine you have two magical coins. You put one in a box in Lagos and send the other to London without looking at either.

**The Strange Part**
- The moment you open the Lagos box and see "heads", the London coin instantly becomes "tails" — every single time
- This happens no matter how far apart the coins are — even across galaxies
- Einstein found this deeply uncomfortable and called it "spooky action at a distance"

**Why It Matters**
- It does NOT allow faster-than-light communication (you can't control which side you get)
- It is the foundation of quantum computing and quantum cryptography
- It proves that quantum particles share a hidden connection that defies classical physics`,
};

/* ── Main Page ──────────────────────────────────────────────── */
export default function TryPage() {
  const [tab, setTab] = useState<Tab>("summarize");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usedFree, setUsedFree] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  const FREE_LIMIT = 1;

  const handleRun = () => {
    if (!notes.trim()) return;

    /* gate after free usage if not logged in */
    if (!loggedIn && usageCount >= FREE_LIMIT) {
      setUsedFree(true);
      setShowLogin(true);
      return;
    }

    setResult(null);
    setLoading(true);
    setUsedFree(false);

    setTimeout(() => {
      setResult(DEMO[tab]);
      setLoading(false);
      if (!loggedIn) setUsageCount((c) => c + 1);
    }, 1800);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.replace(/\*\*/g, "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLogin(false);
    setUsedFree(false);
    /* auto-run after login */
    if (notes.trim()) {
      setLoading(true);
      setTimeout(() => {
        setResult(DEMO[tab]);
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{ background: "#0F172A" }}
    >
      {/* top nav strip */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <a href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}
          >
            C5
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-sora)" }}>
            Class5 AI
          </span>
        </a>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400" style={{ fontFamily: "var(--font-sora)" }}>
                Free Trial Active
              </span>
            </div>
          ) : (
            <>
              <span className="text-xs hidden sm:block" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                {FREE_LIMIT - usageCount > 0 ? `${FREE_LIMIT - usageCount} free use left` : "Free uses exhausted"}
              </span>
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                  fontFamily: "var(--font-sora)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                }}
              >
                Log In / Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* content */}
      <div className="max-w-3xl mx-auto px-5 pt-28 pb-16">
        {/* header */}
        <div className="text-center mb-10 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#2563EB",
              fontFamily: "var(--font-sora)",
            }}
          >
            <Icon d={ic.spark} size={12} /> Try Class5 AI Free
          </div>
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 800,
              fontSize: "clamp(2rem,5vw,3rem)",
              lineHeight: 1.1,
            }}
          >
            Your AI Study
            {" "}<span style={{
              background: "linear-gradient(135deg,#2563EB,#7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Assistant</span>
          </h1>
          <p className="text-base" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            Paste your notes below and choose what you need.
          </p>
        </div>

        {/* tab switcher */}
        <div
          className="flex gap-2 p-1.5 rounded-2xl mb-5"
          style={{ background: "#1E293B" }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setResult(null); setUsedFree(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250"
              style={{
                fontFamily: "var(--font-sora)",
                background: tab === t.id
                  ? t.id === "summarize"
                    ? "linear-gradient(135deg,#2563EB,#2563EB)"
                    : t.id === "questions"
                    ? "linear-gradient(135deg,#7C3AED,#7C3AED)"
                    : "linear-gradient(135deg,#F59E0B,#F59E0B)"
                  : "transparent",
                color: tab === t.id ? "#fff" : "#475569",
                boxShadow: tab === t.id ? `0 4px 14px ${t.color}55` : "none",
              }}
            >
              <span className="hidden sm:flex"><Icon d={t.icon} size={15} /></span>
              {t.label}
            </button>
          ))}
        </div>

        {/* textarea card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#1E293B",
            border: `1px solid ${
              tab === "summarize" ? "rgba(37,99,235,0.25)"
              : tab === "questions" ? "rgba(124,58,237,0.25)"
              : "rgba(245,158,11,0.25)"
            }`,
          }}
        >
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={PLACEHOLDERS[tab]}
            rows={9}
            className="w-full resize-none bg-transparent px-5 pt-5 pb-3 text-sm leading-relaxed outline-none placeholder:text-slate-600"
            style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}
          />

          {/* toolbar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                {notes.length} chars
              </span>
              <button
                onClick={() => setNotes(SAMPLES[tab])}
                className="text-xs flex items-center gap-1 transition-colors"
                style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                <Icon d={ic.refresh} size={11} /> Try a sample
              </button>
              {notes && (
                <button
                  onClick={() => { setNotes(""); setResult(null); setUsedFree(false); }}
                  className="text-xs flex items-center gap-1 transition-colors"
                  style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  <Icon d={ic.x} size={11} /> Clear
                </button>
              )}
            </div>

            <button
              onClick={handleRun}
              disabled={!notes.trim() || loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all duration-300"
              style={{
                fontFamily: "var(--font-sora)",
                background:
                  !notes.trim() || loading
                    ? "#334155"
                    : tab === "summarize"
                    ? "linear-gradient(135deg,#2563EB,#3B82F6)"
                    : tab === "questions"
                    ? "linear-gradient(135deg,#7C3AED,#9333EA)"
                    : "linear-gradient(135deg,#F59E0B,#FBBF24)",
                cursor: !notes.trim() || loading ? "not-allowed" : "pointer",
                boxShadow:
                  notes.trim() && !loading
                    ? `0 4px 20px ${
                        tab === "summarize" ? "rgba(37,99,235,0.4)"
                        : tab === "questions" ? "rgba(124,58,237,0.4)"
                        : "rgba(245,158,11,0.4)"
                      }`
                    : "none",
              }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Processing…
                </>
              ) : (
                <>
                  <Icon d={
                    tab === "summarize" ? ic.book
                    : tab === "questions" ? ic.quiz
                    : ic.brain
                  } size={15} />
                  {tab === "summarize" ? "Summarize" : tab === "questions" ? "Generate Questions" : "Explain This"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* result or gate */}
        {result && !usedFree && (
          <ResultBlock tab={tab} result={result} onCopy={handleCopy} copied={copied} />
        )}
        {usedFree && !loggedIn && (
          <UpgradeGate onLogin={() => setShowLogin(true)} />
        )}

        {/* feature chips */}
        {!result && !usedFree && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: "Instant summaries",   color: "#2563EB" },
              { label: "Auto quiz questions", color: "#7C3AED" },
              { label: "Simple explanations", color: "#F59E0B" },
              { label: "All subjects",        color: "#10B981" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${chip.color}14`,
                  border: `1px solid ${chip.color}30`,
                  color: chip.color,
                  fontFamily: "var(--font-dm)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                {chip.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* login modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </main>
  );
}