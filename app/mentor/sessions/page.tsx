"use client";

import { useState, useEffect, useRef } from "react";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  video:     "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  phone:     "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  check:     "M20 6L9 17l-5-5",
  x:         "M18 6L6 18M6 6l12 12",
  clock:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar:  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  message:   "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  search:    "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  filter:    "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  download:  "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  mic:       "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  micoff:    "M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v4M8 23h8",
  videooff:  "M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10M1 1l22 22",
  phoneoff:  "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91M1 1l22 22",
  screen:    "M2 3h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 21h8M12 17v4",
  hand:      "M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M6 14v0a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3",
  note:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  close:     "M18 6L6 18M6 6l12 12",
  arrow:     "M5 12h14M12 5l7 7-7 7",
  wallet:    "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  edit:      "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

/* ── types ──────────────────────────────────────────────── */
type Tab      = "upcoming" | "requests" | "past";
type CallMode = "idle" | "voice" | "video";

interface Session {
  id: string;
  student: string;
  avatar: string;
  avatarColor: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "pending" | "completed" | "cancelled";
  amount: number;
  rating?: number;
  notes?: string;
  isNext?: boolean;
}

/* ── data ───────────────────────────────────────────────── */
const SESSIONS: Session[] = [
  { id:"s1",  student:"Ada Okonkwo",    avatar:"A", avatarColor:"#7C3AED",  subject:"Physics",     topic:"Electromagnetic Waves",     date:"Today",        time:"3:00 PM",  duration:"60 min", status:"upcoming",  amount:3150, isNext:true },
  { id:"s2",  student:"Tunde Adeola",   avatar:"T", avatarColor:"#10B981",  subject:"Physics",     topic:"Mechanics & Motion",        date:"Today",        time:"5:30 PM",  duration:"60 min", status:"upcoming",  amount:3150 },
  { id:"s3",  student:"Emeka Nwosu",    avatar:"E", avatarColor:"#3B82F6",  subject:"Mathematics", topic:"Integration by Parts",      date:"Tomorrow",     time:"10:00 AM", duration:"90 min", status:"upcoming",  amount:4500 },
  { id:"s4",  student:"Fatima Bello",   avatar:"F", avatarColor:"#F59E0B",  subject:"Chemistry",   topic:"Organic Chemistry Basics",  date:"Tomorrow",     time:"2:00 PM",  duration:"60 min", status:"upcoming",  amount:3150 },
  { id:"s5",  student:"David Eze",      avatar:"D", avatarColor:"#2563EB",  subject:"Mathematics", topic:"Trigonometric Identities",  date:"Wed 22 May",   time:"4:00 PM",  duration:"60 min", status:"upcoming",  amount:3150 },
  { id:"s6",  student:"Ngozi Eze",      avatar:"N", avatarColor:"#EC4899",  subject:"Physics",     topic:"Optics & Refraction",       date:"Wed 22 May",   time:"6:00 PM",  duration:"45 min", status:"upcoming",  amount:2250 },
  /* pending requests */
  { id:"r1",  student:"Amara Okonkwo",  avatar:"A", avatarColor:"#8B5CF6",  subject:"Physics",     topic:"Waves & Sound",             date:"Thu 23 May",   time:"4:00 PM",  duration:"60 min", status:"pending",   amount:3150 },
  { id:"r2",  student:"Sola Bello",     avatar:"S", avatarColor:"#06B6D4",  subject:"Mathematics", topic:"Calculus — Differentiation", date:"Fri 24 May",  time:"11:00 AM", duration:"60 min", status:"pending",   amount:3150 },
  { id:"r3",  student:"Rasheed Kazeem", avatar:"R", avatarColor:"#F97316",  subject:"Physics",     topic:"Electricity & Magnetism",   date:"Fri 24 May",   time:"3:00 PM",  duration:"90 min", status:"pending",   amount:4500 },
  /* past sessions */
  { id:"p1",  student:"Ada Okonkwo",    avatar:"A", avatarColor:"#7C3AED",  subject:"Physics",     topic:"Electric Fields",           date:"Mon 19 May",   time:"3:00 PM",  duration:"60 min", status:"completed", amount:3150, rating:5, notes:"Covered Coulomb's law and field lines. Student did very well." },
  { id:"p2",  student:"Tunde Adeola",   avatar:"T", avatarColor:"#10B981",  subject:"Physics",     topic:"Newton's Laws",             date:"Sun 18 May",   time:"5:00 PM",  duration:"60 min", status:"completed", amount:3150, rating:5 },
  { id:"p3",  student:"David Eze",      avatar:"D", avatarColor:"#2563EB",  subject:"Mathematics", topic:"Sequences & Series",        date:"Sat 17 May",   time:"2:00 PM",  duration:"60 min", status:"completed", amount:3150, rating:4 },
  { id:"p4",  student:"Fatima Bello",   avatar:"F", avatarColor:"#F59E0B",  subject:"Chemistry",   topic:"Bonding & Structure",       date:"Fri 16 May",   time:"4:00 PM",  duration:"60 min", status:"completed", amount:3150, rating:5 },
  { id:"p5",  student:"Emeka Nwosu",    avatar:"E", avatarColor:"#3B82F6",  subject:"Mathematics", topic:"Quadratic Equations",       date:"Thu 15 May",   time:"10:00 AM", duration:"90 min", status:"completed", amount:4500, rating:5 },
  { id:"p6",  student:"Ngozi Eze",      avatar:"N", avatarColor:"#EC4899",  subject:"Physics",     topic:"Vectors & Scalars",         date:"Wed 14 May",   time:"6:00 PM",  duration:"45 min", status:"cancelled", amount:0 },
];

/* ── call overlay ────────────────────────────────────────── */
function CallOverlay({ session, mode, onEnd }: { session: Session; mode: CallMode; onEnd: () => void }) {
  const [micOn,   setMicOn]   = useState(true);
  const [camOn,   setCamOn]   = useState(mode === "video");
  const [screen,  setScreen]  = useState(false);
  const [hand,    setHand]    = useState(false);
  const [duration, setDuration] = useState(0);
  const [notes,   setNotes]   = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [speaking, setSpeaking] = useState(true);

  useEffect(() => {
    const t = setInterval(() => { setDuration((d) => d + 1); setSpeaking((s) => !s); }, 3000);
    const dur = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => { clearInterval(t); clearInterval(dur); };
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#070D1A" }}>
      {/* top bar */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)" }}>C5</div>
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
              {session.student} · {session.subject}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span style={{ color: "#EF4444", fontFamily: "var(--font-sora)", fontWeight: 600 }}>
                {mode === "video" ? "Video" : "Voice"} Call
              </span>
              <span style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>· {fmt(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowNotes(!showNotes)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ background: showNotes ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)", color: showNotes ? "#F59E0B" : "#64748B", border: `1px solid ${showNotes ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`, fontFamily: "var(--font-sora)" }}>
            <Icon d={ic.note} size={13} /> Session Notes
          </button>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />2 in call
          </div>
        </div>
      </div>

      {/* main area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* video/voice area */}
        <div className="flex-1 flex items-center justify-center p-6 relative">
          {mode === "video" ? (
            <div className="w-full max-w-4xl h-full grid grid-cols-2 gap-4">
              {/* student tile */}
              <div className="relative rounded-3xl overflow-hidden flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#1E293B,#0F172A)", border: `2px solid ${speaking ? session.avatarColor : "rgba(255,255,255,0.06)"}`, boxShadow: speaking ? `0 0 24px ${session.avatarColor}50` : "none", transition: "all 0.4s" }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(circle at 50% 35%, ${session.avatarColor}, transparent 70%)` }} />
                <div className="text-center relative z-10">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3 transition-all duration-300 ${speaking ? "scale-110" : ""}`}
                    style={{ background: session.avatarColor, fontFamily: "var(--font-sora)", boxShadow: speaking ? `0 0 32px ${session.avatarColor}80` : "none" }}>
                    {session.avatar}
                  </div>
                  {speaking && (
                    <div className="flex items-end justify-center gap-1 h-5 mb-2">
                      {[3,5,4,6,3,5].map((h, i) => (
                        <div key={i} className="w-1 rounded-full" style={{ height: h * 2, background: session.avatarColor, animation: `bar ${0.3 + i * 0.1}s ease-in-out infinite alternate` }} />
                      ))}
                    </div>
                  )}
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{session.student}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>Student</p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{session.student}</span>
                  <span style={{ color: "#64748B" }}><Icon d={ic.mic} size={13} /></span>
                </div>
              </div>

              {/* mentor tile (you) */}
              <div className="relative rounded-3xl overflow-hidden flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#1a1040,#0a1628)", border: `2px solid ${!speaking ? "#F59E0B" : "rgba(255,255,255,0.06)"}`, boxShadow: !speaking ? "0 0 24px rgba(245,158,11,0.4)" : "none", transition: "all 0.4s" }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ background: "radial-gradient(circle at 50% 35%, #F59E0B, transparent 70%)" }} />
                <div className="text-center relative z-10">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3 transition-all duration-300 ${!speaking ? "scale-110" : ""}`}
                    style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)", boxShadow: !speaking ? "0 0 32px rgba(245,158,11,0.6)" : "none" }}>
                    A
                  </div>
                  {!speaking && (
                    <div className="flex items-end justify-center gap-1 h-5 mb-2">
                      {[4,6,5,7,4,6].map((h, i) => (
                        <div key={i} className="w-1 rounded-full" style={{ height: h * 2, background: "#F59E0B", animation: `bar ${0.3 + i * 0.1}s ease-in-out infinite alternate` }} />
                      ))}
                    </div>
                  )}
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>You (Mentor)</p>
                  {!camOn && <p className="text-xs" style={{ color: "#64748B" }}>Camera off</p>}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-sora)" }}>You</span>
                  <span style={{ color: !micOn ? "#EF4444" : "#64748B" }}><Icon d={!micOn ? ic.micoff : ic.mic} size={13} /></span>
                </div>
              </div>
            </div>
          ) : (
            /* voice only */
            <div className="text-center space-y-8">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>
                Voice Call · {session.subject}
              </p>
              <div className="flex items-center justify-center gap-16">
                {[
                  { name: session.student, avatar: session.avatar, color: session.avatarColor, active: speaking },
                  { name: "You",           avatar: "A",             color: "#F59E0B",          active: !speaking },
                ].map((p) => (
                  <div key={p.name} className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold transition-all duration-300 ${p.active ? "scale-110" : ""}`}
                        style={{ background: p.color, fontFamily: "var(--font-sora)", boxShadow: p.active ? `0 0 40px ${p.color}70` : "none" }}>
                        {p.avatar}
                      </div>
                      {p.active && (
                        <>
                          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: p.color }} />
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-5">
                            {[2, 4, 3, 5, 2, 4].map((h, i) => (
                              <div key={i} className="w-1 rounded-full" style={{ height: h * 2, background: p.color, animation: `bar ${0.3 + i * 0.1}s ease-in-out infinite alternate` }} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-white font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{p.name}</p>
                    {p.active && <p className="text-xs font-semibold" style={{ color: p.color }}>Speaking…</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* notes panel */}
        {showNotes && (
          <div className="w-72 flex-shrink-0 flex flex-col"
            style={{ background: "#0B1120", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora)" }}>Session Notes</p>
              <button onClick={() => setShowNotes(false)} style={{ color: "#475569" }}>
                <Icon d={ic.close} size={15} />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="text-xs p-3 rounded-xl space-y-1"
                style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <p className="font-bold" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>Session Info</p>
                <p style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>{session.student}</p>
                <p style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>{session.subject} · {session.topic}</p>
                <p style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>{session.date} · {session.time}</p>
              </div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Take session notes here… Topics covered, student progress, homework assigned…"
                className="flex-1 w-full px-3 py-3 rounded-xl text-xs text-white outline-none resize-none"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)", minHeight: 200 }} />
              <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all"
                style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.25)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                Save Notes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* controls */}
      <div className="flex-shrink-0 px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { icon: micOn ? ic.mic : ic.micoff,   label: micOn ? "Mute" : "Unmute", action: () => setMicOn(!micOn),   bg: micOn ? "rgba(255,255,255,0.08)" : "#EF4444", color: "#fff" },
            ...(mode === "video" ? [{ icon: camOn ? ic.video : ic.videooff, label: camOn ? "Stop Cam" : "Start Cam", action: () => setCamOn(!camOn), bg: camOn ? "rgba(255,255,255,0.08)" : "#EF4444", color: "#fff" }] : []),
            { icon: ic.screen, label: screen ? "Sharing" : "Share",     action: () => setScreen(!screen),   bg: screen ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.08)", color: screen ? "#60A5FA" : "#fff" },
            { icon: ic.note,   label: "Notes",                            action: () => setShowNotes(!showNotes), bg: showNotes ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)", color: showNotes ? "#F59E0B" : "#fff" },
            { icon: ic.hand,   label: hand ? "Lower" : "Raise",          action: () => setHand(!hand),       bg: hand ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)", color: hand ? "#F59E0B" : "#fff" },
          ].map((btn) => (
            <button key={btn.label} onClick={btn.action}
              className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
                style={{ background: btn.bg, color: btn.color }}>
                <Icon d={btn.icon} size={20} />
              </div>
              <span className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{btn.label}</span>
            </button>
          ))}

          {/* end call */}
          <button onClick={onEnd} className="flex flex-col items-center gap-1.5 ml-4">
            <div className="w-14 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{ background: "#EF4444", color: "#fff", boxShadow: "0 4px 20px rgba(239,68,68,0.45)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
              <Icon d={mode === "video" ? ic.videooff : ic.phoneoff} size={22} />
            </div>
            <span className="text-[10px]" style={{ color: "#F87171", fontFamily: "var(--font-dm)" }}>End</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bar { from { transform: scaleY(0.5); } to { transform: scaleY(1.2); } }
        @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
        .animate-ping { animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </div>
  );
}

/* ── session detail modal ────────────────────────────────── */
function SessionModal({ session, onClose, onStartCall }: {
  session: Session; onClose: () => void; onStartCall: (mode: CallMode) => void;
}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", maxHeight: "90vh", overflowY: "auto" }}>

        {/* header */}
        <div className="px-6 py-5 flex items-center gap-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(30,41,59,0.5)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: session.avatarColor, fontFamily: "var(--font-sora)" }}>
            {session.avatar}
          </div>
          <div className="flex-1">
            <p className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>{session.student}</p>
            <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{session.subject} · {session.topic}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <Icon d={ic.close} size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* session info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Date",     val: session.date       },
              { label: "Time",     val: session.time       },
              { label: "Duration", val: session.duration   },
              { label: "Amount",   val: session.amount > 0 ? `₦${session.amount.toLocaleString()}` : "—" },
            ].map((r) => (
              <div key={r.label} className="p-3 rounded-xl"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-[11px] mb-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{r.label}</p>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>{r.val}</p>
              </div>
            ))}
          </div>

          {/* status badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: session.status === "completed" ? "rgba(16,185,129,0.12)" : session.status === "upcoming" ? "rgba(37,99,235,0.12)" : session.status === "pending" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.1)",
                color: session.status === "completed" ? "#10B981" : session.status === "upcoming" ? "#60A5FA" : session.status === "pending" ? "#F59E0B" : "#F87171",
                fontFamily: "var(--font-sora)",
              }}>
              {session.status === "completed" ? "✓ Completed" : session.status === "upcoming" ? "📅 Upcoming" : session.status === "pending" ? "⏳ Pending" : "✗ Cancelled"}
            </span>
            {session.rating && (
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width={14} height={14} viewBox="0 0 24 24"
                    fill={s<=session.rating! ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.8}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            )}
          </div>

          {/* notes (if any) */}
          {session.notes && (
            <div className="p-3 rounded-xl"
              style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>Session Notes</p>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>{session.notes}</p>
            </div>
          )}

          {/* rate student (completed, no rating yet) */}
          {session.status === "completed" && !session.rating && !saved && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>Rate this student</p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} onClick={() => setRating(s)}
                    className="transition-all duration-150">
                    <svg width={28} height={28} viewBox="0 0 24 24"
                      fill={s<=rating ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.8}
                      style={{ transform: s<=rating ? "scale(1.1)" : "scale(1)", transition: "transform 0.15s" }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={2}
                placeholder="Leave a note about the student's progress…"
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }} />
              <button disabled={!rating} onClick={() => setSaved(true)}
                className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: rating ? "linear-gradient(135deg,#D97706,#F59E0B)" : "#1E293B", color: rating ? "#0F172A" : "#475569", fontFamily: "var(--font-sora)", cursor: rating ? "pointer" : "not-allowed" }}>
                Submit Rating
              </button>
            </div>
          )}
          {saved && (
            <div className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>
              <Icon d={ic.check} size={16} /> Rating saved!
            </div>
          )}

          {/* actions */}
          <div className="flex gap-3 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {session.status === "upcoming" && (
              <>
                <button onClick={() => onStartCall("voice")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: "rgba(16,185,129,0.14)", border: "1px solid rgba(16,185,129,0.25)", color: "#10B981", fontFamily: "var(--font-sora)" }}>
                  <Icon d={ic.phone} size={15} /> Voice
                </button>
                <button onClick={() => onStartCall("video")}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(245,158,11,0.3)" }}>
                  <Icon d={ic.video} size={15} /> Join Video Call
                </button>
              </>
            )}
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}>
              <Icon d={ic.message} size={15} /> Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── session row card ────────────────────────────────────── */
function SessionCard({ session, onView, onAccept, onDecline, onCall }: {
  session: Session;
  onView: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onCall?: (mode: CallMode) => void;
}) {
  const [reqStatus, setReqStatus] = useState<"pending"|"accepted"|"declined">("pending");

  const statusStyle = {
    upcoming:  { bg: "rgba(37,99,235,0.1)",  color: "#60A5FA",  label: "Upcoming"  },
    pending:   { bg: "rgba(245,158,11,0.1)", color: "#F59E0B",  label: "Pending"   },
    completed: { bg: "rgba(16,185,129,0.1)", color: "#10B981",  label: "Completed" },
    cancelled: { bg: "rgba(239,68,68,0.08)", color: "#F87171",  label: "Cancelled" },
  }[session.status];

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-200 cursor-pointer"
      style={{ background: session.isNext ? "rgba(245,158,11,0.06)" : "rgba(30,41,59,0.5)", border: `1px solid ${session.isNext ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)"}` }}
      onClick={onView}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = session.isNext ? "rgba(245,158,11,0.35)" : "rgba(255,255,255,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = session.isNext ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)"; }}>

      {/* avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
          style={{ background: session.avatarColor, fontFamily: "var(--font-sora)" }}>
          {session.avatar}
        </div>
        {session.isNext && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 bg-emerald-400"
            style={{ borderColor: "#0F172A" }} />
        )}
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{session.student}</p>
          {session.isNext && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>Next Up</span>
          )}
        </div>
        <p className="text-xs truncate" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          {session.subject} · {session.topic}
        </p>
        <div className="flex items-center gap-3 mt-1 text-[11px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
          <span className="flex items-center gap-1"><Icon d={ic.calendar} size={11} />{session.date}</span>
          <span className="flex items-center gap-1"><Icon d={ic.clock} size={11} />{session.time}</span>
          <span>{session.duration}</span>
        </div>
      </div>

      {/* right side */}
      <div className="flex items-center gap-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        {session.status === "completed" && session.amount > 0 && (
          <p className="text-sm font-bold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>
            ₦{session.amount.toLocaleString()}
          </p>
        )}

        {session.status === "completed" && session.rating && (
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width={12} height={12} viewBox="0 0 24 24"
                fill={s<=session.rating! ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.8}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        )}

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: statusStyle.bg, color: statusStyle.color, fontFamily: "var(--font-sora)" }}>
          {statusStyle.label}
        </span>

        {/* request actions */}
        {session.status === "pending" && reqStatus === "pending" && (
          <div className="flex gap-1.5">
            <button onClick={(e) => { e.stopPropagation(); setReqStatus("declined"); onDecline?.(); }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "rgba(239,68,68,0.1)", color: "#F87171" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}>
              <Icon d={ic.x} size={14} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setReqStatus("accepted"); onAccept?.(); }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.22)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.12)"; }}>
              <Icon d={ic.check} size={14} />
            </button>
          </div>
        )}

        {session.status === "pending" && reqStatus !== "pending" && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: reqStatus === "accepted" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)", color: reqStatus === "accepted" ? "#10B981" : "#F87171", fontFamily: "var(--font-sora)" }}>
            {reqStatus === "accepted" ? "Accepted" : "Declined"}
          </span>
        )}

        {/* join buttons for upcoming */}
        {session.status === "upcoming" && (
          <div className="flex gap-1.5">
            <button onClick={(e) => { e.stopPropagation(); onCall?.("voice"); }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
              title="Voice call">
              <Icon d={ic.phone} size={14} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onCall?.("video"); }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: session.isNext ? "rgba(245,158,11,0.18)" : "rgba(37,99,235,0.12)", color: session.isNext ? "#F59E0B" : "#60A5FA" }}
              title="Video call">
              <Icon d={ic.video} size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function SessionsPage() {
  const [tab, setTab]               = useState<Tab>("upcoming");
  const [search, setSearch]         = useState("");
  const [callSession, setCallSession] = useState<Session | null>(null);
  const [callMode, setCallMode]     = useState<CallMode>("idle");
  const [viewSession, setViewSession] = useState<Session | null>(null);

  const upcoming  = SESSIONS.filter((s) => s.status === "upcoming");
  const requests  = SESSIONS.filter((s) => s.status === "pending");
  const past      = SESSIONS.filter((s) => s.status === "completed" || s.status === "cancelled");

  const filterSessions = (list: Session[]) =>
    list.filter((s) =>
      s.student.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase()) ||
      s.topic.toLowerCase().includes(search.toLowerCase())
    );

  const startCall = (session: Session, mode: CallMode) => {
    setCallSession(session);
    setCallMode(mode);
    setViewSession(null);
  };

  const TAB_COUNTS = { upcoming: upcoming.length, requests: requests.length, past: past.length };
  const CURRENT_LIST = filterSessions(tab === "upcoming" ? upcoming : tab === "requests" ? requests : past);

  const upcomingEarnings = upcoming.reduce((a, s) => a + s.amount, 0);
  const completedEarnings = past.filter((s) => s.status === "completed").reduce((a, s) => a + s.amount, 0);

  return (
    <div className="px-5 py-6 max-w-5xl mx-auto">

      {callMode !== "idle" && callSession && (
        <CallOverlay session={callSession} mode={callMode} onEnd={() => { setCallMode("idle"); setCallSession(null); }} />
      )}
      {viewSession && (
        <SessionModal session={viewSession} onClose={() => setViewSession(null)}
          onStartCall={(mode) => startCall(viewSession, mode)} />
      )}

      {/* ── header ──────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>Sessions</h2>
          <p className="text-sm mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Manage your upcoming sessions, review requests, and track past sessions.
          </p>
        </div>

        {/* earnings pills */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <div className="px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>Upcoming</p>
            <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>₦{upcomingEarnings.toLocaleString()}</p>
          </div>
          <div className="px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>Earned</p>
            <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>₦{completedEarnings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ── search ──────────────────────────────── */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
          <Icon d={ic.search} size={16} />
        </span>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student, subject, or topic…"
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white outline-none transition-all"
          style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
      </div>

      {/* ── tabs ────────────────────────────────── */}
      <div className="flex gap-2 p-1.5 rounded-2xl mb-5" style={{ background: "#1E293B" }}>
        {(["upcoming","requests","past"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-250"
            style={{
              fontFamily: "var(--font-sora)",
              background: tab === t ? "linear-gradient(135deg,#D97706,#F59E0B)" : "transparent",
              color: tab === t ? "#0F172A" : "#475569",
              boxShadow: tab === t ? "0 4px 14px rgba(245,158,11,0.35)" : "none",
            }}>
            {t === "upcoming" ? "Upcoming" : t === "requests" ? "Requests" : "Past"}
            {TAB_COUNTS[t] > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: tab === t ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.08)", color: tab === t ? "#0F172A" : "#64748B", fontFamily: "var(--font-sora)" }}>
                {TAB_COUNTS[t]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── session list ────────────────────────── */}
      {CURRENT_LIST.length > 0 ? (
        <div className="space-y-3">
          {/* group upcoming by date */}
          {tab === "upcoming" ? (() => {
            const byDate: Record<string, Session[]> = {};
            filterSessions(upcoming).forEach((s) => {
              if (!byDate[s.date]) byDate[s.date] = [];
              byDate[s.date].push(s);
            });
            return Object.entries(byDate).map(([date, sessions]) => (
              <div key={date}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2 px-1"
                  style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>{date}</p>
                <div className="space-y-2.5">
                  {sessions.map((s) => (
                    <SessionCard key={s.id} session={s}
                      onView={() => setViewSession(s)}
                      onCall={(mode) => startCall(s, mode)} />
                  ))}
                </div>
              </div>
            ));
          })() : CURRENT_LIST.map((s) => (
            <SessionCard key={s.id} session={s}
              onView={() => setViewSession(s)}
              onAccept={() => {}}
              onDecline={() => {}}
              onCall={(mode) => startCall(s, mode)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <div className="text-4xl">{tab === "upcoming" ? "📅" : tab === "requests" ? "📬" : "📋"}</div>
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>
            {tab === "upcoming" ? "No upcoming sessions" : tab === "requests" ? "No pending requests" : "No past sessions"}
          </h3>
          <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            {search ? "No results match your search." : tab === "upcoming" ? "Your schedule is clear." : tab === "requests" ? "You're all caught up!" : "Completed sessions will appear here."}
          </p>
          {search && (
            <button onClick={() => setSearch("")}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)" }}>
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}