"use client";

import { useState } from "react";
import Link from "next/link";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  arrow:    "M5 12h14M12 5l7 7-7 7",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  brain:    "M12 2a5 5 0 0 1 5 5 5 5 0 0 1-1.5 3.5L19 19h-3v3h-4v-3H9v3H5v-3H2l3.5-8.5A5 5 0 0 1 7 7a5 5 0 0 1 5-5z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  fire:     "M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-5-5-9-5-9zM9 17c0 1.66 1.34 3 3 3s3-1.34 3-3",
  check:    "M20 6L9 17l-5-5",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  quiz:     "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  play:     "M5 3l14 9-14 9V3z",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  trophy:   "M8 21h8M12 17v4M5 3H3v4c0 2.21 1.79 4 4 4s4-1.79 4-4V3H5zM19 3h-6v4c0 2.21 1.79 4 4 4s4-1.79 4-4V3z",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
};

/* ── tiny reusable card wrapper ───────────────────────────── */
function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{
        background: "rgba(30,41,59,0.55)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        ...style,
      }}>
      {children}
    </div>
  );
}

/* ── stat card ────────────────────────────────────────────── */
function StatCard({ label, value, sub, icon, color, trend }: {
  label: string; value: string; sub: string; icon: string; color: string; trend?: string;
}) {
  return (
    <Card className="p-5 flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-200 cursor-default">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color }}>
          <Icon d={icon} size={19} />
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontFamily: "var(--font-sora)" }}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="font-extrabold text-white" style={{ fontFamily: "var(--font-sora)", fontSize: "1.75rem", lineHeight: 1 }}>
          {value}
        </p>
        <p className="text-sm font-medium mt-0.5" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>{label}</p>
        <p className="text-xs mt-1" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{sub}</p>
      </div>
    </Card>
  );
}

/* ── quick action button ──────────────────────────────────── */
function QuickAction({ href, icon, label, sub, color, grad }: {
  href: string; icon: string; label: string; sub: string; color: string; grad: string;
}) {
  return (
    <Link href={href}
      className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-250 hover:scale-[1.02]"
      style={{
        background: "rgba(30,41,59,0.55)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.boxShadow = `0 4px 20px ${color}18`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ background: grad, boxShadow: `0 4px 16px ${color}40` }}>
        <Icon d={icon} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>{label}</p>
        <p className="text-xs truncate mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{sub}</p>
      </div>
      <span className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all">
        <Icon d={ic.arrow} size={16} />
      </span>
    </Link>
  );
}

/* ── activity item ────────────────────────────────────────── */
function ActivityItem({ icon, color, title, time, badge }: {
  icon: string; color: string; title: string; time: string; badge?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 group">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}14`, color }}>
        <Icon d={icon} size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate" style={{ fontFamily: "var(--font-dm)" }}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{time}</p>
      </div>
      {badge && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: `${color}18`, color, fontFamily: "var(--font-sora)" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

/* ── streak calendar strip ────────────────────────────────── */
function StreakCalendar() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const done  = [true, true, true, true, true, false, false];
  return (
    <div className="flex items-center gap-2">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all"
            style={{
              fontFamily: "var(--font-sora)",
              background: done[i] ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E293B",
              color: done[i] ? "#fff" : "#334155",
              boxShadow: done[i] ? "0 2px 10px rgba(37,99,235,0.35)" : "none",
            }}>
            {done[i] ? <Icon d={ic.check} size={13} /> : d}
          </div>
          <span className="text-[9px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{d}</span>
        </div>
      ))}
    </div>
  );
}

/* ── subject progress bar ─────────────────────────────────── */
function SubjectBar({ subject, score, color, max = 100 }: {
  subject: string; score: number; color: string; max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs"
        style={{ fontFamily: "var(--font-dm)", color: "#64748B" }}>
        <span className="text-slate-400">{subject}</span>
        <span style={{ color }} className="font-semibold">{score}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(score / max) * 100}%`, background: `linear-gradient(90deg,${color},${color}99)` }} />
      </div>
    </div>
  );
}

/* ── upcoming session card ────────────────────────────────── */
function SessionCard({ tutor, subject, time, avatar, color }: {
  tutor: string; subject: string; time: string; avatar: string; color: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        style={{ background: color, fontFamily: "var(--font-sora)" }}>
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "var(--font-sora)" }}>{tutor}</p>
        <p className="text-xs truncate" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{subject}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-semibold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>{time}</p>
        <button className="text-[10px] mt-1 px-2 py-0.5 rounded-full font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>
          Join
        </button>
      </div>
    </div>
  );
}

/* ── leaderboard row ──────────────────────────────────────── */
function LeaderRow({ rank, name, xp, avatar, color, isMe }: {
  rank: number; name: string; xp: number; avatar: string; color: string; isMe?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-xl transition-all"
      style={{
        background: isMe ? "rgba(37,99,235,0.1)" : "transparent",
        border: isMe ? "1px solid rgba(37,99,235,0.2)" : "1px solid transparent",
      }}>
      <span className="w-5 text-center text-xs font-bold flex-shrink-0"
        style={{
          color: rank === 1 ? "#F59E0B" : rank === 2 ? "#94A3B8" : rank === 3 ? "#CD7C3A" : "#334155",
          fontFamily: "var(--font-sora)",
        }}>
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
      </span>
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
        style={{ background: color, fontFamily: "var(--font-sora)" }}>
        {avatar}
      </div>
      <p className="flex-1 text-sm truncate" style={{ color: isMe ? "#F8FAFC" : "#94A3B8", fontFamily: "var(--font-dm)", fontWeight: isMe ? 600 : 400 }}>
        {name} {isMe && <span className="text-xs text-blue-400">(you)</span>}
      </p>
      <span className="text-xs font-bold flex-shrink-0" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
        {xp.toLocaleString()} XP
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN DASHBOARD PAGE
════════════════════════════════════════════════════════════ */
export default function StudentDashboard() {
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const stats = [
    { label: "XP Earned",     value: "4,820",  sub: "+480 today",    icon: ic.star,   color: "#F59E0B", trend: "+12%" },
    { label: "Day Streak",    value: "14",      sub: "Keep it up! 🔥", icon: ic.fire,  color: "#EF4444", trend: "🔥" },
    { label: "Quizzes Taken", value: "87",      sub: "23 this week",  icon: ic.quiz,   color: "#7C3AED", trend: "+5" },
    { label: "Summaries",     value: "34",      sub: "3 today",       icon: ic.book,   color: "#2563EB"  },
  ];

  const quickActions = [
    { href: "/student/ai-tools", icon: ic.book,    label: "Summarize Notes",    sub: "Paste or upload your notes",   color: "#2563EB", grad: "linear-gradient(135deg,#2563EB,#3B82F6)" },
    { href: "/student/ai-tools", icon: ic.quiz,    label: "Generate Quiz",      sub: "Test yourself on any topic",   color: "#7C3AED", grad: "linear-gradient(135deg,#7C3AED,#9333EA)" },
    { href: "/student/tutor",    icon: ic.brain,   label: "Ask AI Tutor",       sub: "Get instant explanations",     color: "#2563EB", grad: "linear-gradient(135deg,#1D4ED8,#7C3AED)" },
    { href: "/student/groups",   icon: ic.users,   label: "Study Groups",       sub: "Join or start a group session",color: "#10B981", grad: "linear-gradient(135deg,#059669,#10B981)" },
    { href: "/student/mentors",  icon: ic.calendar,label: "Book a Tutor",       sub: "1-on-1 expert sessions",       color: "#F59E0B", grad: "linear-gradient(135deg,#D97706,#F59E0B)" },
  ];

  const activity = [
    { icon: ic.book,    color: "#2563EB", title: "Summarised 'Chapter 5 — Cell Division'",    time: "2 hours ago",   badge: "+40 XP" },
    { icon: ic.quiz,    color: "#7C3AED", title: "Completed Biology Quiz — 18/20",             time: "4 hours ago",   badge: "+90 XP" },
    { icon: ic.brain,   color: "#2563EB", title: "AI Tutor session — Photosynthesis",          time: "Yesterday",     badge: "+20 XP" },
    { icon: ic.users,   color: "#10B981", title: "Joined 'Bio 200L Group Study' session",      time: "Yesterday",     badge: undefined },
    { icon: ic.calendar,color: "#F59E0B", title: "Booked session with Dr. Adewale — Physics",  time: "2 days ago",    badge: undefined },
    { icon: ic.trophy,  color: "#F59E0B", title: "Earned 'Quiz Master' badge 🏆",              time: "3 days ago",    badge: "Badge" },
  ];

  const subjects = [
    { subject: "Biology",  score: 82, color: "#10B981" },
    { subject: "Chemistry",score: 67, color: "#2563EB" },
    { subject: "Physics",  score: 74, color: "#7C3AED" },
    { subject: "Maths",    score: 91, color: "#F59E0B" },
    { subject: "English",  score: 78, color: "#EC4899" },
  ];

  const sessions = [
    { tutor: "Dr. Adewale",  subject: "Physics — Waves",      time: "Today 3pm",   avatar: "A", color: "#2563EB" },
    { tutor: "Mrs. Okafor",  subject: "Chemistry — Organics", time: "Tomorrow 2pm",avatar: "O", color: "#7C3AED" },
  ];

  const leaders = [
    { rank: 1, name: "Chukwuemeka I.", xp: 8420, avatar: "C", color: "#3B82F6" },
    { rank: 2, name: "Fatima K.",      xp: 7310, avatar: "F", color: "#F59E0B" },
    { rank: 3, name: "Tunde A.",       xp: 6890, avatar: "T", color: "#10B981" },
    { rank: 4, name: "Ada Okonkwo",    xp: 4820, avatar: "A", color: "#7C3AED", isMe: true },
    { rank: 5, name: "Rachael E.",     xp: 4100, avatar: "R", color: "#EC4899" },
  ];

  const quizOptions = ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"];

  return (
    <div className="px-5 py-6 max-w-7xl mx-auto space-y-6">

      {/* ── greeting banner ─────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden p-6"
        style={{ background: "linear-gradient(135deg,#1E1B4B 0%,#1E3A5F 50%,#0F172A 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full"
            style={{ width: 300, height: 300, top: "-30%", right: "-5%", background: "rgba(37,99,235,0.15)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full"
            style={{ width: 200, height: 200, bottom: "-20%", left: "30%", background: "rgba(124,58,237,0.12)", filter: "blur(50px)" }} />
        </div>
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-sm mb-1" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
              Good morning 👋
            </p>
            <h2 className="text-white font-extrabold mb-1"
              style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(1.3rem,2.5vw,1.75rem)" }}>
              Welcome back, Ada!
            </h2>
            <p className="text-sm" style={{ color: "#64748B)", fontFamily: "var(--font-dm)" }}>
              You&apos;re on a{" "}
              <span className="font-semibold" style={{ color: "#F59E0B" }}>14-day streak 🔥</span>
              {" "}— keep going!
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-2">
            <StreakCalendar />
            <p className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>This week</p>
          </div>
        </div>

        {/* xp progress */}
        <div className="relative mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between text-xs mb-2"
            style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            <span>Progress to Level 4</span>
            <span style={{ color: "#2563EB" }}>4,820 / 6,000 XP</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full rounded-full"
              style={{ width: "80%", background: "linear-gradient(90deg,#2563EB,#7C3AED)", boxShadow: "0 0 12px rgba(37,99,235,0.5)" }} />
          </div>
        </div>
      </div>

      {/* ── stats row ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── middle section ──────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* quick actions — takes 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-bold text-base" style={{ fontFamily: "var(--font-sora)" }}>Quick Actions</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickActions.map((a) => <QuickAction key={a.label} {...a} />)}
          </div>
        </div>

        {/* daily quiz card */}
        <Card className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-1"
                style={{ color: "#7C3AED", fontFamily: "var(--font-sora)" }}>Daily Quiz</div>
              <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
                Biology · Cell Biology
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
              style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontFamily: "var(--font-sora)", fontWeight: 600 }}>
              <Icon d={ic.star} size={11} /> +50 XP
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-4 flex-1"
            style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
            Which organelle is the powerhouse of the cell and produces ATP through cellular respiration?
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {quizOptions.map((opt, i) => (
              <button key={opt} onClick={() => setQuizAnswer(i)}
                className="py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all duration-200"
                style={{
                  fontFamily: "var(--font-dm)",
                  background: quizAnswer === i
                    ? i === 0 ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.15)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    quizAnswer === i
                      ? i === 0 ? "#10B981" : "#EF4444"
                      : "rgba(255,255,255,0.06)"
                  }`,
                  color: quizAnswer === i
                    ? i === 0 ? "#10B981" : "#F87171"
                    : "#64748B",
                }}>
                {opt}
              </button>
            ))}
          </div>

          {quizAnswer !== null && (
            <p className="text-xs text-center mb-3"
              style={{ color: quizAnswer === 0 ? "#10B981" : "#F87171", fontFamily: "var(--font-dm)" }}>
              {quizAnswer === 0 ? "✅ Correct! +50 XP earned" : "❌ Correct answer: Mitochondria"}
            </p>
          )}

          <Link href="/student/ai-tools"
            className="block text-center py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#7C3AED,#9333EA)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
            More Quizzes →
          </Link>
        </Card>
      </div>

      {/* ── bottom section ──────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* recent activity */}
        <div className="lg:col-span-1">
          <Card className="p-5">
            <h3 className="text-white font-bold text-sm mb-4" style={{ fontFamily: "var(--font-sora)" }}>
              Recent Activity
            </h3>
            <div className="space-y-0.5 divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              {activity.map((a, i) => <ActivityItem key={i} {...a} />)}
            </div>
          </Card>
        </div>

        {/* subject progress + upcoming sessions */}
        <div className="lg:col-span-1 space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
                Subject Progress
              </h3>
              <Link href="/student/profile" className="text-xs font-semibold transition-colors"
                style={{ color: "#2563EB", fontFamily: "var(--font-sora)" }}>
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {subjects.map((s) => <SubjectBar key={s.subject} {...s} />)}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
                Upcoming Sessions
              </h3>
              <Link href="/student/mentors" className="text-xs font-semibold transition-colors"
                style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                Book more
              </Link>
            </div>
            <div className="space-y-2.5">
              {sessions.map((s, i) => <SessionCard key={i} {...s} />)}
            </div>
          </Card>
        </div>

        {/* leaderboard */}
        <div className="lg:col-span-1">
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
                🏆 Leaderboard
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                This Week
              </span>
            </div>
            <div className="space-y-1">
              {leaders.map((l) => <LeaderRow key={l.rank} {...l} />)}
            </div>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs text-center" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                You&apos;re ranked <strong className="text-white">#4</strong> — earn{" "}
                <strong style={{ color: "#F59E0B" }}>2,070 XP</strong> to reach #3
              </p>
              <Link href="/student/ai-tools"
                className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
                Earn More XP <Icon d={ic.zap} size={13} />
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}