"use client";

import { useState, useRef, useCallback } from "react";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  quiz:     "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  brain:    "M12 2a5 5 0 0 1 5 5 5 5 0 0 1-1.5 3.5L19 19h-3v3h-4v-3H9v3H5v-3H2l3.5-8.5A5 5 0 0 1 7 7a5 5 0 0 1 5-5z",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  upload:   "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  copy:     "M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1",
  check:    "M20 6L9 17l-5-5",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  x:        "M18 6L6 18M6 6l12 12",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  trophy:   "M8 21h8M12 17v4M5 3H3v4c0 2.21 1.79 4 4 4s4-1.79 4-4V3H5zM19 3h-6v4c0 2.21 1.79 4 4 4s4-1.79 4-4V3z",
  sparkle:  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.36-6.36-.71.71M6.34 17.66l-.71.71M17.66 17.66l.71.71M6.34 6.34l.71.71M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  pdf:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
};

type Tab = "summarize" | "explain" | "quiz";

/* ── XP toast ──────────────────────────────────────────── */
function XPToast({ xp, onDone }: { xp: number; onDone: () => void }) {
  return (
    <div className="fixed top-6 right-6 z-[999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
      style={{
        background: "linear-gradient(135deg,#1E293B,#0F172A)",
        border: "1px solid rgba(245,158,11,0.4)",
        boxShadow: "0 8px 32px rgba(245,158,11,0.25)",
        animation: "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
        <Icon d={ic.star} size={20} />
      </div>
      <div>
        <p className="font-extrabold text-white text-lg leading-none" style={{ fontFamily: "var(--font-sora)" }}>
          +{xp} XP
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>Added to your total</p>
      </div>
      <button onClick={onDone} className="ml-2 text-slate-600 hover:text-white transition-colors">
        <Icon d={ic.x} size={14} />
      </button>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(60px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── XP badge pill ─────────────────────────────────────── */
function XPBadge({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
      style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontFamily: "var(--font-sora)", border: "1px solid rgba(245,158,11,0.2)" }}>
      <Icon d={ic.star} size={10} /> +{xp} XP
    </span>
  );
}

/* ── result block ──────────────────────────────────────── */
function ResultBlock({ tab, result, onCopy, copied }: {
  tab: Tab; result: string; onCopy: () => void; copied: boolean;
}) {
  const color = tab === "summarize" ? "#2563EB" : tab === "explain" ? "#F59E0B" : "#7C3AED";
  const lines = result.split("\n").filter(Boolean);

  return (
    <div className="rounded-2xl p-5 mt-4"
      style={{ background: "rgba(30,41,59,0.7)", border: `1px solid ${color}25`, backdropFilter: "blur(12px)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `${color}20`, color }}>
            <Icon d={tab === "summarize" ? ic.book : tab === "explain" ? ic.brain : ic.quiz} size={13} />
          </div>
          <span className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora)" }}>
            {tab === "summarize" ? "AI Summary" : tab === "explain" ? "Explanation" : "Practice Questions"}
          </span>
        </div>
        <button onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
          style={{
            background: copied ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
            color: copied ? "#10B981" : "#64748B",
            border: `1px solid ${copied ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.07)"}`,
            fontFamily: "var(--font-dm)",
          }}>
          <Icon d={copied ? ic.check : ic.copy} size={12} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="space-y-2.5">
        {lines.map((line, i) => {
          const isSection = line.startsWith("**") && line.endsWith("**");
          const isQ = tab === "quiz" && /^\d+\./.test(line.trim());
          const clean = isSection ? line.replace(/\*\*/g, "") : line.replace(/^[-•]\s*/, "");

          if (isSection) return (
            <p key={i} className="font-bold text-sm pt-2 first:pt-0" style={{ color, fontFamily: "var(--font-sora)" }}>{clean}</p>
          );
          if (isQ) return (
            <div key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: `${color}18`, color, fontFamily: "var(--font-sora)" }}>
                {line.match(/^(\d+)/)?.[1]}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}>
                {line.replace(/^\d+\.\s*/, "")}
              </p>
            </div>
          );
          return (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: color }} />
              <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}>{clean}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── quiz interactive ──────────────────────────────────── */
function QuizBlock({ questions, onXP }: {
  questions: { q: string; options: string[]; answer: number }[];
  onXP: (xp: number) => void;
}) {
  const [current, setCurrent]   = useState(0);
  const [picked, setPicked]     = useState<number | null>(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpGiven, setXpGiven]   = useState(false);

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === questions[current].answer;
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setPicked(null);
    } else {
      setFinished(true);
      if (!xpGiven) {
        const earned = score * 20 + (picked === questions[current].answer ? 20 : 0);
        onXP(earned);
        setXpGiven(true);
      }
    }
  };

  if (finished) {
    const finalScore = score + (picked === questions[current].answer ? 1 : 0);
    return (
      <div className="rounded-2xl p-6 mt-4 text-center space-y-4"
        style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="text-4xl">
          {finalScore === questions.length ? "🏆" : finalScore >= questions.length / 2 ? "🎉" : "📚"}
        </div>
        <div>
          <p className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>
            {finalScore}/{questions.length}
          </p>
          <p className="text-sm mt-1" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            {finalScore === questions.length ? "Perfect score! Outstanding work!" : finalScore >= questions.length / 2 ? "Great effort! Keep practising." : "Keep studying — you've got this!"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-bold"
          style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
          <Icon d={ic.star} size={16} />
          {finalScore * 20} XP earned this quiz!
        </div>
        <button onClick={() => { setCurrent(0); setPicked(null); setScore(0); setFinished(false); setXpGiven(false); }}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: "linear-gradient(135deg,#7C3AED,#9333EA)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
          <Icon d={ic.refresh} size={15} /> Try Again
        </button>
      </div>
    );
  }

  const q = questions[current];
  const optColors = ["#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

  return (
    <div className="rounded-2xl p-5 mt-4"
      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(124,58,237,0.2)", backdropFilter: "blur(12px)" }}>
      {/* progress */}
      <div className="flex items-center justify-between mb-3 text-xs"
        style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
        <span>Question {current + 1} of {questions.length}</span>
        <div className="flex items-center gap-1 font-semibold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
          <Icon d={ic.star} size={11} /> {score * 20} XP so far
        </div>
      </div>
      <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: "#1E293B" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%`, background: "linear-gradient(90deg,#7C3AED,#9333EA)" }} />
      </div>

      <p className="text-white text-sm font-semibold leading-relaxed mb-4" style={{ fontFamily: "var(--font-sora)" }}>
        {q.q}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isPicked  = i === picked;
          let bg = "rgba(255,255,255,0.03)";
          let border = "rgba(255,255,255,0.07)";
          let color = "#64748B";
          if (picked !== null) {
            if (isCorrect)      { bg = "rgba(16,185,129,0.15)"; border = "#10B981"; color = "#10B981"; }
            else if (isPicked)  { bg = "rgba(239,68,68,0.12)"; border = "#EF4444"; color = "#F87171"; }
          } else if (isPicked) { bg = `${optColors[i]}18`; border = optColors[i]; color = "#fff"; }

          return (
            <button key={opt} onClick={() => handlePick(i)}
              className="flex items-center gap-3 p-3 rounded-xl text-sm text-left transition-all duration-200"
              style={{
                background: bg, border: `1px solid ${border}`, color,
                fontFamily: "var(--font-dm)",
                cursor: picked !== null ? "default" : "pointer",
              }}>
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${optColors[i]}20`, color: optColors[i], fontFamily: "var(--font-sora)" }}>
                {["A","B","C","D"][i]}
              </span>
              {opt}
              {picked !== null && isCorrect && <Icon d={ic.check} size={14} />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <button onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: "linear-gradient(135deg,#7C3AED,#9333EA)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
          {current < questions.length - 1 ? "Next Question" : "See Results"}
          <Icon d={ic.arrow} size={15} />
        </button>
      )}
    </div>
  );
}

/* ── demo content ──────────────────────────────────────── */
const SAMPLES: Record<Tab, string> = {
  summarize: `Mitosis is a type of cell division resulting in two daughter cells with the same number of chromosomes as the parent cell. It consists of four phases: Prophase, Metaphase, Anaphase, and Telophase (PMAT). During Prophase, chromatin condenses into chromosomes and the mitotic spindle forms. In Metaphase, chromosomes align at the cell's equator. During Anaphase, sister chromatids are pulled apart to opposite poles. Telophase sees the formation of two new nuclei. Cytokinesis then divides the cytoplasm to produce two genetically identical daughter cells.`,
  explain:   `Quantum entanglement is a phenomenon where two particles become correlated in such a way that the state of one instantly influences the other, regardless of the distance between them. Einstein called this "spooky action at a distance."`,
  quiz:      `Mitosis is a type of cell division resulting in two daughter cells. The phases are Prophase, Metaphase, Anaphase, and Telophase. Chromosomes align at the equator during Metaphase. Sister chromatids separate during Anaphase. Two genetically identical daughter cells are produced at the end.`,
};

const DEMO_RESULTS: Record<Tab, string> = {
  summarize: `**Key Concept**
Mitosis is a cell division process that produces two genetically identical daughter cells.

**The Four Phases (PMAT)**
- Prophase — Chromatin condenses into chromosomes; mitotic spindle begins to form
- Metaphase — Chromosomes line up at the equatorial plate (cell's centre)
- Anaphase — Sister chromatids pulled to opposite poles of the cell
- Telophase — Two new nuclei form around the separated chromosomes

**Outcome**
- Cytokinesis divides the cytoplasm after telophase
- Result: two genetically identical daughter cells with the same chromosome count as the parent`,

  explain: `**Simple Analogy First**
Imagine two magic dice. You roll them in separate rooms — the moment one lands on 6, the other instantly becomes 1. Every single time. No matter how far apart they are.

**What Actually Happens**
- Two particles (like electrons) are "entangled" when they interact or are created together
- After entanglement, measuring one particle instantly defines the state of the other
- This happens faster than light — but no information is actually "sent"

**Why Einstein Was Bothered**
- It seems to violate the idea that nothing travels faster than light
- But no usable information is transmitted, so the laws of physics are preserved

**Why It Matters Today**
- Foundation of quantum computing and quantum cryptography
- Used in "unhackable" communication systems being developed right now`,

  quiz: `1. What type of cell division does mitosis represent?
2. Name the four phases of mitosis in the correct order.
3. During which phase do chromosomes align at the cell's equatorial plate?
4. What happens to sister chromatids during Anaphase?
5. What is the name of the process that divides the cytoplasm after Telophase?
6. How many daughter cells are produced at the end of mitosis, and are they genetically identical?`,
};

const DEMO_QUIZ = [
  { q: "What is the correct order of mitosis phases?", options: ["PMAT","MPTA","ATPM","TAMP"], answer: 0 },
  { q: "During which phase do chromosomes align at the cell's equator?", options: ["Prophase","Telophase","Metaphase","Anaphase"], answer: 2 },
  { q: "What does cytokinesis divide?", options: ["The nucleus","The chromosomes","The DNA","The cytoplasm"], answer: 3 },
  { q: "How many daughter cells does mitosis produce?", options: ["4","1","3","2"], answer: 3 },
  { q: "What happens to sister chromatids in Anaphase?", options: ["They fuse","They duplicate","They are pulled apart","They dissolve"], answer: 2 },
];

/* ── XP rules ──────────────────────────────────────────── */
const XP_RULES: Record<Tab, number> = { summarize: 40, explain: 30, quiz: 0 /* dynamic */ };

const TAB_CONFIG = [
  { id: "summarize" as Tab, label: "Summarize",   icon: ic.book,  color: "#2563EB", grad: "linear-gradient(135deg,#2563EB,#3B82F6)", xp: 40,  desc: "Paste notes or upload a PDF for an instant AI summary" },
  { id: "explain"   as Tab, label: "Explain",     icon: ic.brain, color: "#F59E0B", grad: "linear-gradient(135deg,#D97706,#F59E0B)", xp: 30,  desc: "Get a simple, clear explanation of any concept" },
  { id: "quiz"      as Tab, label: "Quiz",         icon: ic.quiz,  color: "#7C3AED", grad: "linear-gradient(135deg,#7C3AED,#9333EA)", xp: 100, desc: "Auto-generate practice questions and earn XP per correct answer" },
];

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function AIToolsPage() {
  const [tab, setTab]         = useState<Tab>("summarize");
  const [notes, setNotes]     = useState("");
  const [result, setResult]   = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [totalXP, setTotalXP] = useState(4820);
  const [toast, setToast]     = useState<number | null>(null);
  const [sessionXP, setSessionXP] = useState(0);
  const [usageCount, setUsageCount] = useState<Record<Tab, number>>({ summarize: 0, explain: 0, quiz: 0 });
  const fileRef = useRef<HTMLInputElement>(null);

  const tabCfg = TAB_CONFIG.find((t) => t.id === tab)!;

  const awardXP = useCallback((xp: number) => {
    setTotalXP((v) => v + xp);
    setSessionXP((v) => v + xp);
    setToast(xp);
  }, []);

  const handleRun = () => {
    if (!notes.trim()) return;
    setResult(null);
    setQuizMode(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(DEMO_RESULTS[tab]);
      setUsageCount((p) => ({ ...p, [tab]: p[tab] + 1 }));
      if (tab !== "quiz") awardXP(XP_RULES[tab]);
      else setQuizMode(true);
    }, 1600);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.replace(/\*\*/g, "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotes(`[PDF uploaded: ${file.name}]\n\nContent extracted from ${file.name} will be processed here. This is a demo — paste your notes below to try the full AI experience.`);
  };

  return (
    <div className="px-5 py-6 max-w-4xl mx-auto">

      {/* XP toast */}
      {toast !== null && <XPToast xp={toast} onDone={() => setToast(null)} />}

      {/* ── page header ───────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>
            AI Tools
          </h2>
          <p className="text-sm mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Summarize notes, understand concepts, and practice with quizzes — earn XP for every action.
          </p>
        </div>

        {/* session xp pill */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.2)", color: "#F59E0B" }}>
              <Icon d={ic.star} size={15} />
            </div>
            <div>
              <p className="text-white font-extrabold text-sm leading-none" style={{ fontFamily: "var(--font-sora)" }}>
                {totalXP.toLocaleString()} XP
              </p>
              {sessionXP > 0 && (
                <p className="text-[10px] mt-0.5 font-semibold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                  +{sessionXP} this session
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── XP reward guide ───────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {TAB_CONFIG.map((t) => (
          <div key={t.id}
            className="rounded-xl p-3 text-center transition-all duration-200 cursor-pointer"
            style={{
              background: tab === t.id ? `${t.color}12` : "rgba(30,41,59,0.4)",
              border: `1px solid ${tab === t.id ? `${t.color}30` : "rgba(255,255,255,0.05)"}`,
            }}
            onClick={() => { setTab(t.id); setResult(null); setQuizMode(false); }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
              style={{ background: t.grad, boxShadow: `0 4px 12px ${t.color}35` }}>
              <Icon d={t.icon} size={16} />
            </div>
            <p className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-sora)" }}>{t.label}</p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <Icon d={ic.star} size={10} />
              <span className="text-[10px] font-semibold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                {t.id === "quiz" ? "20 XP / answer" : `+${t.xp} XP`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── tab switcher ──────────────────────────────── */}
      <div className="flex gap-2 p-1.5 rounded-2xl mb-5"
        style={{ background: "#1E293B" }}>
        {TAB_CONFIG.map((t) => (
          <button key={t.id}
            onClick={() => { setTab(t.id); setResult(null); setQuizMode(false); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250"
            style={{
              fontFamily: "var(--font-sora)",
              background: tab === t.id ? t.grad : "transparent",
              color: tab === t.id ? "#fff" : "#475569",
              boxShadow: tab === t.id ? `0 4px 14px ${t.color}40` : "none",
            }}>
            <span className="hidden sm:flex"><Icon d={t.icon} size={15} /></span>
            {t.label}
            {usageCount[t.id] > 0 && (
              <span className="hidden sm:flex text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                {usageCount[t.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── textarea card ─────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden"
        style={{
          background: "#1E293B",
          border: `1px solid ${tabCfg.color}30`,
        }}>

        {/* upload bar */}
        <div className="flex items-center gap-3 px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: `${tabCfg.color}14`,
              color: tabCfg.color,
              border: `1px solid ${tabCfg.color}25`,
              fontFamily: "var(--font-sora)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${tabCfg.color}25`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `${tabCfg.color}14`; }}>
            <Icon d={ic.pdf} size={13} />
            Upload PDF
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.txt,.doc,.docx" className="hidden" onChange={handleFileUpload} />
          <span className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            or paste your notes below
          </span>
          <div className="ml-auto">
            <XPBadge xp={tab === "quiz" ? 20 : tabCfg.xp} />
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            tab === "summarize"
              ? "Paste your lecture notes, textbook chapter, or any text here…"
              : tab === "explain"
              ? "Type a concept, topic, or paragraph you find confusing…"
              : "Paste your notes or topic content — AI will generate quiz questions from it…"
          }
          rows={8}
          className="w-full resize-none bg-transparent px-5 pt-4 pb-3 text-sm leading-relaxed outline-none"
          style={{ color: "#CBD5E1", fontFamily: "var(--font-dm)" }}
        />

        {/* toolbar */}
        <div className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
              {notes.length} chars
            </span>
            <button onClick={() => { setNotes(SAMPLES[tab]); setResult(null); setQuizMode(false); }}
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
              <Icon d={ic.refresh} size={11} /> Sample text
            </button>
            {notes && (
              <button onClick={() => { setNotes(""); setResult(null); setQuizMode(false); }}
                className="text-xs flex items-center gap-1 transition-colors"
                style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                <Icon d={ic.x} size={11} /> Clear
              </button>
            )}
          </div>

          <button onClick={handleRun}
            disabled={!notes.trim() || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-300"
            style={{
              fontFamily: "var(--font-sora)",
              background: !notes.trim() || loading ? "#334155" : tabCfg.grad,
              cursor: !notes.trim() || loading ? "not-allowed" : "pointer",
              boxShadow: notes.trim() && !loading ? `0 4px 20px ${tabCfg.color}40` : "none",
            }}
            onMouseEnter={(e) => { if (notes.trim() && !loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
            {loading ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  style={{ animation: "spin 0.8s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Processing…
              </>
            ) : (
              <>
                <Icon d={tabCfg.icon} size={15} />
                {tab === "summarize" ? "Summarize" : tab === "explain" ? "Explain This" : "Generate Quiz"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── result / quiz output ───────────────────────── */}
      {result && !quizMode && (
        <ResultBlock tab={tab} result={result} onCopy={handleCopy} copied={copied} />
      )}

      {result && quizMode && tab === "quiz" && (
        <div>
          <div className="flex items-center justify-between mt-4 mb-1">
            <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>
              Practice Quiz — {DEMO_QUIZ.length} questions
            </p>
            <XPBadge xp={20} />
          </div>
          <p className="text-xs mb-2" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Earn +20 XP for each correct answer
          </p>
          <QuizBlock questions={DEMO_QUIZ} onXP={awardXP} />
        </div>
      )}

      {/* ── tips strip ────────────────────────────────── */}
      {!result && (
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { icon: ic.sparkle, color: "#2563EB", tip: "Earn 40 XP every time you summarize a set of notes" },
            { icon: ic.trophy,  color: "#F59E0B", tip: "Score 5/5 on a quiz to earn a streak bonus" },
            { icon: ic.zap,     color: "#7C3AED", tip: "Use the AI Tutor for deeper explanations after summarizing" },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl"
              style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: t.color, flexShrink: 0, marginTop: 1 }}><Icon d={t.icon} size={15} /></span>
              <p className="text-xs leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>{t.tip}</p>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}