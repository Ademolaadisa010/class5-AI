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
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  fire:    "M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-5-5-9-5-9zM9.5 14.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  quiz:    "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chart:   "M18 20V10M12 20V4M6 20v-6",
  trophy:  "M8 21h8M12 17v4M5 3H3v4c0 2.21 1.79 4 4 4s4-1.79 4-4V3H5zM19 3h-6v4c0 2.21 1.79 4 4 4s4-1.79 4-4V3z",
  check:   "M20 6L9 17l-5-5",
  camera:  "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  zap:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  lock:    "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  share:   "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  mail:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  x:       "M18 6L6 18M6 6l12 12",
};

/* ── tiny helpers ───────────────────────────────────────── */
function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3"
      style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>{children}</p>
  );
}

/* ── edit modal ─────────────────────────────────────────── */
function EditModal({ onClose }: { onClose: () => void }) {
  const [name, setName]     = useState("Ada Okonkwo");
  const [bio, setBio]       = useState("200L Biology student at OAU. Passionate about cell biology and genetics. Always studying smarter with AI 🧠");
  const [school, setSchool] = useState("Obafemi Awolowo University");
  const [level, setLevel]   = useState("200 Level");
  const [saved, setSaved]   = useState(false);

  const save = () => { setSaved(true); setTimeout(onClose, 900); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Edit Profile</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><Icon d={ic.x} size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {/* avatar change */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>A</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#2563EB", color: "#fff" }}>
                <Icon d={ic.camera} size={13} />
              </button>
            </div>
            <div>
              <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>Profile Photo</p>
              <p className="text-xs mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Click the camera to change</p>
            </div>
          </div>

          {[
            { label: "Full Name",   val: name,   set: setName,   placeholder: "Your full name" },
            { label: "School",      val: school, set: setSchool, placeholder: "Your institution" },
            { label: "Level / Year",val: level,  set: setLevel,  placeholder: "e.g. 200 Level" },
          ].map((f) => (
            <div key={f.label} className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>{f.label}</label>
              <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.15)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
              style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.15)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>

          <button onClick={save}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all"
            style={{ background: saved ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: saved ? "none" : "0 6px 24px rgba(37,99,235,0.35)", color: saved ? "#10B981" : "#fff" }}>
            {saved ? <><Icon d={ic.check} size={16} /> Saved!</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── badge card ─────────────────────────────────────────── */
function BadgeCard({ emoji, label, desc, earned, color }: { emoji: string; label: string; desc: string; earned: boolean; color: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl transition-all"
      style={{ background: earned ? `${color}10` : "rgba(255,255,255,0.02)", border: `1px solid ${earned ? `${color}25` : "rgba(255,255,255,0.05)"}`, opacity: earned ? 1 : 0.45 }}>
      <div className="text-2xl flex-shrink-0" style={{ filter: earned ? "none" : "grayscale(1)" }}>{emoji}</div>
      <div className="min-w-0">
        <p className="text-white text-xs font-bold truncate" style={{ fontFamily: "var(--font-sora)" }}>{label}</p>
        <p className="text-[10px] mt-0.5 truncate" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{desc}</p>
      </div>
      {earned && (
        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: color }}>
          <Icon d={ic.check} size={11} />
        </div>
      )}
      {!earned && (
        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
          <Icon d={ic.lock} size={11} />
        </div>
      )}
    </div>
  );
}

/* ── activity heatmap (simplified) ─────────────────────── */
function Heatmap() {
  const weeks = 12;
  const days  = 7;
  const data  = Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5));
  const labels = ["","Mon","","Wed","","Fri",""];
  const months = ["Apr","","","","May","","","","","Jun","",""];

  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        {months.map((m, i) => (
          <div key={i} className="flex-1 text-[9px] text-center" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>{m}</div>
        ))}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1">
          {labels.map((l, i) => (
            <div key={i} className="h-3 text-[9px] flex items-center" style={{ color: "#1E293B", fontFamily: "var(--font-dm)", width: 20 }}>{l}</div>
          ))}
        </div>
        <div className="flex gap-1 flex-1">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1 flex-1">
              {Array.from({ length: days }).map((_, d) => {
                const v = data[w * days + d];
                return (
                  <div key={d} className="h-3 rounded-sm"
                    style={{ background: v === 0 ? "#1E293B" : v === 1 ? "#1E3A5F" : v === 2 ? "#1D4ED8" : v === 3 ? "#2563EB" : "#60A5FA" }} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5 mt-2">
        <span className="text-[9px]" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>Less</span>
        {["#1E293B","#1E3A5F","#1D4ED8","#2563EB","#60A5FA"].map((c) => (
          <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[9px]" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>More</span>
      </div>
    </div>
  );
}

/* ── subject bar ────────────────────────────────────────── */
function SubjectBar({ subject, score, sessions, color }: { subject: string; score: number; sessions: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-sm text-white" style={{ fontFamily: "var(--font-dm)" }}>{subject}</span>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          <span>{sessions} sessions</span>
          <span className="font-bold" style={{ color }}>{score}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: `linear-gradient(90deg,${color},${color}88)` }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview"|"subjects"|"badges"|"activity">("overview");

  const stats = [
    { label: "Total XP",    value: "4,820",  icon: ic.star,   color: "#F59E0B" },
    { label: "Day Streak",  value: "14",     icon: ic.fire,   color: "#EF4444" },
    { label: "Quizzes",     value: "87",     icon: ic.quiz,   color: "#7C3AED" },
    { label: "Summaries",   value: "34",     icon: ic.book,   color: "#2563EB" },
    { label: "AI Sessions", value: "52",     icon: ic.zap,    color: "#06B6D4" },
    { label: "Groups",      value: "3",      icon: ic.users,  color: "#10B981" },
  ];

  const recentActivity = [
    { icon: ic.quiz,   color: "#7C3AED", label: "Completed Biology Quiz — 18/20",   xp: "+90 XP", time: "2h ago"  },
    { icon: ic.book,   color: "#2563EB", label: "Summarised Chapter 5 — Cell Div.", xp: "+40 XP", time: "4h ago"  },
    { icon: ic.zap,    color: "#06B6D4", label: "AI Tutor — Photosynthesis",         xp: "+20 XP", time: "1d ago"  },
    { icon: ic.trophy, color: "#F59E0B", label: "Earned 'Quiz Master' badge 🏆",     xp: "",       time: "2d ago"  },
    { icon: ic.users,  color: "#10B981", label: "Joined 'Bio 200L Crew' study call", xp: "",       time: "3d ago"  },
  ];

  const subjects = [
    { subject: "Biology",       score: 82, sessions: 18, color: "#10B981" },
    { subject: "Chemistry",     score: 67, sessions: 12, color: "#7C3AED" },
    { subject: "Physics",       score: 74, sessions: 10, color: "#2563EB" },
    { subject: "Mathematics",   score: 91, sessions: 8,  color: "#F59E0B" },
    { subject: "English",       score: 78, sessions: 6,  color: "#EC4899" },
  ];

  const badges = [
    { emoji:"🏆", label:"Quiz Master",    desc:"Score 100% on 5 quizzes",       earned:true,  color:"#F59E0B" },
    { emoji:"🔥", label:"Streak King",    desc:"Maintain a 14-day streak",       earned:true,  color:"#EF4444" },
    { emoji:"🧠", label:"Deep Thinker",   desc:"Ask 50 AI Tutor questions",       earned:true,  color:"#2563EB" },
    { emoji:"📚", label:"Note Ninja",     desc:"Summarise 30 sets of notes",      earned:true,  color:"#7C3AED" },
    { emoji:"👥", label:"Team Player",    desc:"Join 3 study groups",             earned:true,  color:"#10B981" },
    { emoji:"⚡", label:"Speed Learner",  desc:"Complete 5 AI tools in one day",  earned:false, color:"#06B6D4" },
    { emoji:"🌟", label:"Top Student",    desc:"Reach Level 5",                   earned:false, color:"#F59E0B" },
    { emoji:"🎯", label:"Precision Pro",  desc:"Score 95%+ on 10 quizzes",        earned:false, color:"#EC4899" },
    { emoji:"🚀", label:"Rocket Start",   desc:"Complete onboarding in 24h",      earned:false, color:"#8B5CF6" },
  ];

  const TABS = ["overview","subjects","badges","activity"] as const;

  return (
    <div className="px-5 py-6 max-w-5xl mx-auto">
      {editing && <EditModal onClose={() => setEditing(false)} />}

      {/* ── profile hero ────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden mb-6">
        {/* banner */}
        <div className="h-36 relative"
          style={{ background: "linear-gradient(135deg,#1E1B4B 0%,#1E3A5F 50%,#0F172A 100%)" }}>
          <div className="absolute inset-0"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
          <div className="absolute rounded-full"
            style={{ width:300, height:300, top:"-40%", right:"5%", background:"rgba(37,99,235,0.15)", filter:"blur(60px)" }} />
          <div className="absolute rounded-full"
            style={{ width:200, height:200, top:"-20%", left:"20%", background:"rgba(124,58,237,0.12)", filter:"blur(50px)" }} />

          {/* edit button */}
          <button onClick={() => setEditing(true)}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", fontFamily:"var(--font-sora)", backdropFilter:"blur(8px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}>
            <Icon d={ic.edit} size={14} /> Edit Profile
          </button>
        </div>

        {/* info section */}
        <div className="px-6 pb-6" style={{ background:"rgba(15,23,42,0.95)" }}>
          <div className="flex items-end gap-4 -mt-10 mb-4 flex-wrap">
            {/* avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold border-4"
                style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", borderColor:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 8px 32px rgba(37,99,235,0.4)" }}>A</div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ background:"#10B981", borderColor:"#0F172A" }} />
            </div>

            <div className="flex-1 min-w-0 pb-1 pt-12 sm:pt-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-white font-extrabold text-xl" style={{ fontFamily:"var(--font-sora)" }}>Ada Okonkwo</h1>
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold"
                  style={{ background:"rgba(245,158,11,0.12)", color:"#F59E0B", border:"1px solid rgba(245,158,11,0.2)", fontFamily:"var(--font-sora)" }}>
                  <Icon d={ic.star} size={11}/> Level 3
                </span>
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background:"rgba(239,68,68,0.1)", color:"#F87171", border:"1px solid rgba(239,68,68,0.2)", fontFamily:"var(--font-sora)" }}>
                  🔥 14-day streak
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                200L · Biology · Obafemi Awolowo University
              </p>
              <p className="text-sm mt-1.5 max-w-xl leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
                200L Biology student at OAU. Passionate about cell biology and genetics. Always studying smarter with AI 🧠
              </p>
            </div>

            {/* share */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all flex-shrink-0"
              style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", fontFamily:"var(--font-sora)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}>
              <Icon d={ic.share} size={14}/> Share
            </button>
          </div>

          {/* XP progress */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-2" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
              <span>Level 3 · 4,820 XP</span>
              <span style={{ color:"#2563EB" }}>6,000 XP to Level 4</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
              <div className="h-full rounded-full"
                style={{ width:"80%", background:"linear-gradient(90deg,#2563EB,#7C3AED)", boxShadow:"0 0 12px rgba(37,99,235,0.5)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── stats row ───────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 text-center"
            style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
              style={{ background:`${s.color}18`, color:s.color }}>
              <Icon d={s.icon} size={16}/>
            </div>
            <p className="font-extrabold text-white text-lg leading-none" style={{ fontFamily:"var(--font-sora)" }}>{s.value}</p>
            <p className="text-[10px] mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── tabs ────────────────────────────────────── */}
      <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background:"#1E293B" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
            style={{
              fontFamily:"var(--font-sora)",
              background: activeTab===t ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "transparent",
              color: activeTab===t ? "#fff" : "#475569",
              boxShadow: activeTab===t ? "0 4px 14px rgba(37,99,235,0.3)" : "none",
            }}>
            {t === "overview" ? "Overview" : t === "subjects" ? "Subjects" : t === "badges" ? `Badges (${badges.filter(b=>b.earned).length})` : "Activity"}
          </button>
        ))}
      </div>

      {/* ── tab content ─────────────────────────────── */}

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* recent activity */}
          <Card className="p-5 lg:col-span-2">
            <SectionTitle>Recent Activity</SectionTitle>
            <div className="space-y-1 divide-y" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${a.color}14`, color:a.color }}>
                    <Icon d={a.icon} size={15}/>
                  </div>
                  <p className="flex-1 text-sm text-white truncate" style={{ fontFamily:"var(--font-dm)" }}>{a.label}</p>
                  <div className="text-right flex-shrink-0">
                    {a.xp && <p className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{a.xp}</p>}
                    <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* leaderboard rank */}
          <Card className="p-5">
            <SectionTitle>My Ranking</SectionTitle>
            <div className="text-center py-4">
              <div className="text-5xl mb-2">🏅</div>
              <p className="text-white font-extrabold text-4xl" style={{ fontFamily:"var(--font-sora)" }}>#4</p>
              <p className="text-sm mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>Weekly Leaderboard</p>
              <div className="mt-4 space-y-2">
                {[
                  { rank:"#1", name:"Chukwuemeka", xp:"8,420", color:"#F59E0B" },
                  { rank:"#2", name:"Fatima K.",   xp:"7,310", color:"#94A3B8" },
                  { rank:"#3", name:"Tunde A.",    xp:"6,890", color:"#CD7C3A" },
                  { rank:"#4", name:"Ada (You)",   xp:"4,820", color:"#2563EB", me:true },
                ].map((r) => (
                  <div key={r.rank} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs"
                    style={{ background:r.me?"rgba(37,99,235,0.1)":"rgba(255,255,255,0.02)", border:`1px solid ${r.me?"rgba(37,99,235,0.2)":"transparent"}` }}>
                    <span style={{ color:r.color, fontFamily:"var(--font-sora)", fontWeight:700, minWidth:24 }}>{r.rank}</span>
                    <span className="flex-1 text-left" style={{ color:r.me?"#F8FAFC":"#64748B", fontFamily:"var(--font-dm)" }}>{r.name}</span>
                    <span style={{ color:"#F59E0B", fontFamily:"var(--font-sora)", fontWeight:700 }}>{r.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* SUBJECTS */}
      {activeTab === "subjects" && (
        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <SectionTitle>Subject Performance</SectionTitle>
            <div className="space-y-5">
              {subjects.map((s) => <SubjectBar key={s.subject} {...s} />)}
            </div>
          </Card>
          <Card className="p-5">
            <SectionTitle>Study Activity</SectionTitle>
            <Heatmap />
            <div className="grid grid-cols-2 gap-3 mt-5">
              {[
                { label:"Best Subject",   val:"Mathematics", color:"#F59E0B" },
                { label:"Most Sessions",  val:"Biology",     color:"#10B981" },
                { label:"Avg Quiz Score", val:"79%",         color:"#7C3AED" },
                { label:"Study Streak",   val:"14 days",     color:"#EF4444" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl"
                  style={{ background:`${s.color}0D`, border:`1px solid ${s.color}20` }}>
                  <p className="text-xs mb-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{s.label}</p>
                  <p className="font-bold text-sm" style={{ color:s.color, fontFamily:"var(--font-sora)" }}>{s.val}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* BADGES */}
      {activeTab === "badges" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
              <strong className="text-white">{badges.filter(b=>b.earned).length}</strong> of{" "}
              <strong className="text-white">{badges.length}</strong> badges earned
            </p>
            <div className="h-1.5 w-36 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
              <div className="h-full rounded-full" style={{ width:`${(badges.filter(b=>b.earned).length/badges.length)*100}%`, background:"linear-gradient(90deg,#2563EB,#7C3AED)" }} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {badges.map((b) => <BadgeCard key={b.label} {...b} />)}
          </div>
        </div>
      )}

      {/* ACTIVITY */}
      {activeTab === "activity" && (
        <div className="space-y-5">
          <Card className="p-5">
            <SectionTitle>Study Heatmap — Last 12 Weeks</SectionTitle>
            <Heatmap />
          </Card>
          <Card className="p-5">
            <SectionTitle>Full Activity Log</SectionTitle>
            <div className="space-y-0.5 divide-y" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
              {[...recentActivity, ...recentActivity].map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${a.color}14`, color:a.color }}>
                    <Icon d={a.icon} size={15}/>
                  </div>
                  <p className="flex-1 text-sm text-white" style={{ fontFamily:"var(--font-dm)" }}>{a.label}</p>
                  <div className="text-right flex-shrink-0">
                    {a.xp && <p className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{a.xp}</p>}
                    <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}