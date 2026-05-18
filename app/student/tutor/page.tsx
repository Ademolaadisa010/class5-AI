"use client";

import { useState, useRef, useEffect, useCallback } from "react";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  send:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  copy:     "M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1",
  check:    "M20 6L9 17l-5-5",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  trash:    "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  quiz:     "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  chevron:  "M9 18l6-6-6-6",
  sparkle:  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.36-6.36-.71.71M6.34 17.66l-.71.71M17.66 17.66l.71.71M6.34 6.34l.71.71M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  mic:      "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  close:    "M18 6L6 18M6 6l12 12",
  history:  "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  arrow:    "M5 12h14M12 5l7 7-7 7",
};

/* ── types ─────────────────────────────────────────────── */
type Role = "user" | "ai";
interface Message {
  id: string;
  role: Role;
  text: string;
  ts: Date;
  xp?: number;
  copied?: boolean;
}
interface Conversation {
  id: string;
  title: string;
  preview: string;
  ts: Date;
  xp: number;
}

/* ── XP toast ──────────────────────────────────────────── */
function XPToast({ xp, onDone }: { xp: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed top-6 right-6 z-[999] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl"
      style={{
        background: "linear-gradient(135deg,#1E293B,#0F172A)",
        border: "1px solid rgba(245,158,11,0.4)",
        boxShadow: "0 8px 32px rgba(245,158,11,0.2)",
        animation: "toastSlide 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
        <Icon d={ic.star} size={18} />
      </div>
      <div>
        <p className="font-extrabold text-white text-base leading-none" style={{ fontFamily: "var(--font-sora)" }}>
          +{xp} XP
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
          For asking a great question!
        </p>
      </div>
    </div>
  );
}

/* ── typing dots ───────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>
        AI
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5"
        style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full"
            style={{
              background: "#475569",
              animation: `dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
        ))}
      </div>
    </div>
  );
}

/* ── message bubble ────────────────────────────────────── */
function Bubble({ msg, onCopy }: { msg: Message; onCopy: (id: string) => void }) {
  const isAI = msg.role === "ai";
  const lines = msg.text.split("\n").filter(Boolean);

  return (
    <div className={`flex items-end gap-3 mb-4 ${isAI ? "" : "flex-row-reverse"}`}>
      {/* avatar */}
      {isAI ? (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>
          AI
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#7C3AED,#9333EA)", fontFamily: "var(--font-sora)" }}>
          A
        </div>
      )}

      <div className={`max-w-[78%] group ${isAI ? "" : "items-end flex flex-col"}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isAI ? "rounded-bl-none" : "rounded-br-none"
        }`}
          style={{
            background: isAI ? "rgba(30,41,59,0.85)" : "linear-gradient(135deg,#2563EB,#7C3AED)",
            border: isAI ? "1px solid rgba(255,255,255,0.07)" : "none",
            color: "#F8FAFC",
            fontFamily: "var(--font-dm)",
          }}>
          {/* render AI messages with section headings */}
          {isAI ? (
            <div className="space-y-2">
              {lines.map((line, i) => {
                const isSection = line.startsWith("**") && line.endsWith("**");
                const isBullet  = line.startsWith("- ") || line.startsWith("• ");
                const clean = isSection ? line.replace(/\*\*/g, "") : line.replace(/^[-•]\s*/, "");
                if (isSection) return (
                  <p key={i} className="font-bold text-sm pt-1 first:pt-0"
                    style={{ color: "#60A5FA", fontFamily: "var(--font-sora)" }}>{clean}</p>
                );
                if (isBullet) return (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: "#2563EB" }} />
                    <p className="text-sm" style={{ color: "#CBD5E1" }}>{clean}</p>
                  </div>
                );
                return <p key={i} className="text-sm" style={{ color: "#CBD5E1" }}>{line}</p>;
              })}
            </div>
          ) : (
            <p>{msg.text}</p>
          )}
        </div>

        {/* meta row */}
        <div className={`flex items-center gap-2 mt-1.5 px-1 ${isAI ? "" : "flex-row-reverse"}`}>
          <span className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            {msg.ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isAI && (
            <button onClick={() => onCopy(msg.id)}
              className="flex items-center gap-1 text-[10px] transition-colors opacity-0 group-hover:opacity-100"
              style={{ color: msg.copied ? "#10B981" : "#334155", fontFamily: "var(--font-dm)" }}>
              <Icon d={msg.copied ? ic.check : ic.copy} size={11} />
              {msg.copied ? "Copied" : "Copy"}
            </button>
          )}
          {msg.xp && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
              <Icon d={ic.star} size={9} />+{msg.xp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── AI responses ──────────────────────────────────────── */
const AI_RESPONSES: string[] = [
  `**Great question!**
Let me break this down simply.

**The Core Idea**
- Think of it like a factory with two assembly lines running at the same time
- Each line processes different inputs but contributes to the same final product

**Step by Step**
- First, the inputs are collected and prepared
- Then each stage transforms them into something more useful
- Finally, the outputs are combined to give you the result

**Why This Matters**
Understanding this process deeply will help you answer exam questions from multiple angles. Try explaining it back to me in your own words — that's the fastest way to truly learn it!`,

  `**Absolutely!** Here's a clear explanation.

**The Key Principle**
This concept is built on a few foundational rules that everything else flows from.

**Real-World Analogy**
Imagine you're organising a library. Each book has a place based on a system — topic, author, year. The "system" is what makes retrieval fast and reliable.

**Common Exam Angle**
- Examiners love to test whether you understand the *why*, not just the *what*
- Try to connect this to examples from your syllabus
- Draw a diagram if it's a process — visual memory is powerful

**Quick Summary**
The concept works because of [the underlying mechanism]. Apply it to [related topic] and you'll see the same pattern. Want me to generate practice questions on this?`,

  `**Let me explain this clearly.**

**Definition**
At its core, this is about the relationship between cause and effect in a specific system.

**Breaking It Down**
- Stage 1 — The initial condition or input is established
- Stage 2 — A transformation or process occurs
- Stage 3 — The output or result is produced and can be measured

**Exam Tip 🎯**
When answering questions on this topic, always:
1. State the principle clearly
2. Apply it to the specific scenario in the question
3. Use correct terminology from your syllabus

**Remember**
This topic often appears alongside [related concept]. Make sure you understand how they interact. Would you like me to compare the two?`,

  `**Good thinking!** That's a really important concept.

**Why Students Find This Hard**
Most people mix this up because the terms look similar but mean very different things.

**The Distinction**
- Term A refers to the *structure* — how something is arranged
- Term B refers to the *function* — what something does
- They are related but never interchangeable in academic writing

**A Memory Trick**
"Structure is the SHAPE, Function is the GAME" — if you can remember that, you'll never confuse them again.

**Practice Question**
Can you write one sentence using both terms correctly? Drop it in the chat and I'll give you feedback right away.`,
];

let aiResponseIndex = 0;
const getAIResponse = () => {
  const r = AI_RESPONSES[aiResponseIndex % AI_RESPONSES.length];
  aiResponseIndex++;
  return r;
};

/* ── suggested prompts ─────────────────────────────────── */
const SUGGESTED = [
  { label: "Explain photosynthesis",             subject: "Biology"   },
  { label: "What is Newton's 3rd law?",          subject: "Physics"   },
  { label: "Simplify ionic bonding",             subject: "Chemistry" },
  { label: "Summarise the French Revolution",    subject: "History"   },
  { label: "How does binary search work?",       subject: "CS"        },
  { label: "What is opportunity cost?",          subject: "Economics" },
  { label: "Explain trigonometric identities",   subject: "Maths"     },
  { label: "What caused World War I?",           subject: "History"   },
];

const SUBJECT_COLORS: Record<string, string> = {
  Biology: "#10B981", Physics: "#2563EB", Chemistry: "#7C3AED",
  History: "#F59E0B", CS: "#06B6D4", Economics: "#EC4899", Maths: "#F97316",
};

/* ── past conversations ────────────────────────────────── */
const PAST_CONVOS: Conversation[] = [
  { id: "c1", title: "Cell Division & Mitosis",       preview: "Explained the 4 phases of mitosis with diagrams...", ts: new Date(Date.now() - 86400000),     xp: 40 },
  { id: "c2", title: "Quantum Mechanics Basics",      preview: "Broke down wave-particle duality simply...",         ts: new Date(Date.now() - 86400000 * 2), xp: 60 },
  { id: "c3", title: "French Revolution Causes",      preview: "Covered financial crisis, social inequality...",     ts: new Date(Date.now() - 86400000 * 3), xp: 20 },
  { id: "c4", title: "Newton's Laws of Motion",       preview: "Walked through all 3 laws with examples...",         ts: new Date(Date.now() - 86400000 * 5), xp: 40 },
];

const timeAgo = (d: Date) => {
  const diff = Date.now() - d.getTime();
  if (diff < 86400000) return "Today";
  if (diff < 172800000) return "Yesterday";
  return `${Math.floor(diff / 86400000)}d ago`;
};

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function AITutorPage() {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [totalXP, setTotalXP]     = useState(4820);
  const [sessionXP, setSessionXP] = useState(0);
  const [toast, setToast]         = useState(false);
  const [toastXP, setToastXP]     = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [msgCount, setMsgCount]   = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* auto-resize textarea */
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  const awardXP = useCallback((xp: number) => {
    setTotalXP((v) => v + xp);
    setSessionXP((v) => v + xp);
    setToastXP(xp);
    setToast(true);
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || typing) return;
    const id = Date.now().toString();
    const count = msgCount + 1;
    setMsgCount(count);

    /* XP: 10 per question, bonus every 5 questions */
    const xp = count % 5 === 0 ? 30 : 10;

    const userMsg: Message = { id, role: "user", text: text.trim(), ts: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    if (textareaRef.current) { textareaRef.current.style.height = "auto"; }

    setTyping(true);
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const aiText = getAIResponse();
      const aiMsg: Message = { id: id + "-ai", role: "ai", text: aiText, ts: new Date(), xp };
      setMessages((m) => [...m, aiMsg]);
      setTyping(false);
      awardXP(xp);
    }, delay);
  }, [typing, msgCount, awardXP]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const handleCopy = (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    navigator.clipboard.writeText(msg.text.replace(/\*\*/g, "")).catch(() => {});
    setMessages((m) => m.map((msg) => msg.id === id ? { ...msg, copied: true } : msg));
    setTimeout(() => setMessages((m) => m.map((msg) => msg.id === id ? { ...msg, copied: false } : msg)), 2000);
  };

  const clearChat = () => { setMessages([]); setMsgCount(0); };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden" style={{ fontFamily: "var(--font-dm)" }}>

      {/* XP toast */}
      {toast && <XPToast xp={toastXP} onDone={() => setToast(false)} />}

      {/* ── history sidebar (desktop) ────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0"
        style={{ background: "#0B1120", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="px-4 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
            Chat History
          </h3>
          <button onClick={clearChat}
            className="flex items-center gap-1 text-xs transition-colors px-2 py-1 rounded-lg"
            style={{ color: "#334155", fontFamily: "var(--font-dm)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}>
            <Icon d={ic.trash} size={12} /> Clear
          </button>
        </div>

        {/* new chat button */}
        <div className="px-3 py-3">
          <button onClick={clearChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
            <Icon d={ic.sparkle} size={15} /> New Conversation
          </button>
        </div>

        {/* past convos */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {PAST_CONVOS.map((c) => (
            <button key={c.id}
              className="w-full text-left px-3 py-3 rounded-xl transition-all group"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-white text-xs font-semibold leading-snug truncate"
                  style={{ fontFamily: "var(--font-sora)" }}>{c.title}</p>
                <span className="text-[10px] flex-shrink-0" style={{ color: "#334155" }}>{timeAgo(c.ts)}</span>
              </div>
              <p className="text-xs truncate" style={{ color: "#334155" }}>{c.preview}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <Icon d={ic.star} size={10} />
                <span className="text-[10px] font-semibold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                  +{c.xp} XP
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* session xp */}
        <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between text-xs mb-2"
            style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            <span>Session XP</span>
            <span style={{ color: "#F59E0B", fontFamily: "var(--font-sora)", fontWeight: 700 }}>+{sessionXP}</span>
          </div>
          <div className="flex items-center justify-between text-xs"
            style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            <span>Total XP</span>
            <span className="font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>
              {totalXP.toLocaleString()}
            </span>
          </div>
        </div>
      </aside>

      {/* ── main chat ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* chat topbar */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(11,17,32,0.6)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>AI</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                style={{ background: "#10B981", borderColor: "#0B1120" }} />
            </div>
            <div>
              <p className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora)" }}>Class5 AI Tutor</p>
              <p className="text-xs" style={{ color: "#10B981", fontFamily: "var(--font-dm)" }}>
                Online · Answers instantly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* XP pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <Icon d={ic.star} size={13} />
              <span className="text-xs font-bold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                {totalXP.toLocaleString()} XP
              </span>
            </div>
            {/* mobile history toggle */}
            <button onClick={() => setShowHistory(!showHistory)}
              className="lg:hidden flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{ background: showHistory ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.05)", color: showHistory ? "#60A5FA" : "#64748B", fontFamily: "var(--font-sora)" }}>
              <Icon d={ic.history} size={14} /> History
            </button>
            {messages.length > 0 && (
              <button onClick={clearChat}
                className="p-2 rounded-xl transition-all"
                style={{ color: "#334155" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}>
                <Icon d={ic.trash} size={16} />
              </button>
            )}
          </div>
        </div>

        {/* mobile history drawer */}
        {showHistory && (
          <div className="lg:hidden flex-shrink-0 px-3 py-2 space-y-1 max-h-52 overflow-y-auto"
            style={{ background: "#0B1120", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {PAST_CONVOS.map((c) => (
              <button key={c.id} onClick={() => setShowHistory(false)}
                className="w-full text-left px-3 py-2.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{c.title}</p>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: "#334155" }}>{c.preview}</p>
              </button>
            ))}
          </div>
        )}

        {/* messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          {/* empty state */}
          {isEmpty && (
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
                  style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", boxShadow: "0 8px 32px rgba(37,99,235,0.3)", fontFamily: "var(--font-sora)" }}>AI</div>
                <h2 className="text-white font-extrabold text-xl mb-2" style={{ fontFamily: "var(--font-sora)" }}>
                  Hi Ada! I&apos;m your AI Tutor 👋
                </h2>
                <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "#475569" }}>
                  Ask me anything — concepts, exam questions, essay help, or just "explain this simply."
                  I&apos;ll respond instantly, and you earn <strong className="text-yellow-400">XP</strong> for every question you ask!
                </p>
              </div>

              {/* XP info cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Per question", xp: "+10 XP", color: "#2563EB" },
                  { label: "Every 5 questions", xp: "+30 XP", color: "#7C3AED" },
                  { label: "Daily streak", xp: "+50 XP", color: "#F59E0B" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(30,41,59,0.5)", border: `1px solid ${item.color}20` }}>
                    <p className="font-extrabold text-lg" style={{ color: item.color, fontFamily: "var(--font-sora)" }}>
                      {item.xp}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#475569" }}>{item.label}</p>
                  </div>
                ))}
              </div>

              {/* suggested prompts */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>
                  Try asking…
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED.map((s) => (
                    <button key={s.label} onClick={() => sendMessage(s.label)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: "rgba(30,41,59,0.6)",
                        border: `1px solid ${SUBJECT_COLORS[s.subject] ?? "#334155"}25`,
                        color: "#94A3B8",
                        fontFamily: "var(--font-dm)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${SUBJECT_COLORS[s.subject]}55`;
                        e.currentTarget.style.color = "#F8FAFC";
                        e.currentTarget.style.background = `${SUBJECT_COLORS[s.subject]}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${SUBJECT_COLORS[s.subject] ?? "#334155"}25`;
                        e.currentTarget.style.color = "#94A3B8";
                        e.currentTarget.style.background = "rgba(30,41,59,0.6)";
                      }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: SUBJECT_COLORS[s.subject] ?? "#64748B" }} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* messages */}
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} onCopy={handleCopy} />
            ))}
            {typing && <TypingDots />}

            {/* follow-up suggestions after last AI message */}
            {!typing && messages.length > 0 && messages[messages.length - 1].role === "ai" && (
              <div className="flex flex-wrap gap-2 mb-4 mt-1 ml-11">
                {["Ask a follow-up question", "Generate a quiz on this", "Give me a simpler explanation"].map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#60A5FA", fontFamily: "var(--font-dm)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.18)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.1)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* ── input bar ──────────────────────────────── */}
        <div className="flex-shrink-0 px-4 pb-4 pt-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(11,17,32,0.7)", backdropFilter: "blur(10px)" }}>
          <div className="max-w-3xl mx-auto">
            {/* XP reminder */}
            <p className="text-[10px] text-center mb-2" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>
              {msgCount > 0
                ? `${5 - (msgCount % 5)} more question${5 - (msgCount % 5) === 1 ? "" : "s"} for a +30 XP bonus`
                : "Ask a question to earn +10 XP"}
            </p>

            <div className="flex items-end gap-3 p-3 rounded-2xl"
              style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)" }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything… (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
                style={{
                  color: "#F8FAFC",
                  fontFamily: "var(--font-dm)",
                  minHeight: "24px",
                  maxHeight: "140px",
                }}
              />

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* mic button */}
                <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", color: "#475569" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                  <Icon d={ic.mic} size={16} />
                </button>

                {/* send */}
                <button onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0"
                  style={{
                    background: input.trim() && !typing ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E3A5F",
                    color: input.trim() && !typing ? "#fff" : "#334155",
                    boxShadow: input.trim() && !typing ? "0 4px 16px rgba(37,99,235,0.4)" : "none",
                    cursor: input.trim() && !typing ? "pointer" : "not-allowed",
                  }}
                  onMouseEnter={(e) => { if (input.trim() && !typing) e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
                  <Icon d={ic.send} size={15} />
                </button>
              </div>
            </div>

            <p className="text-center text-[10px] mt-2" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>
              Class5 AI can make mistakes. Always verify important information.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes toastSlide {
          from { opacity: 0; transform: translateX(60px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}