"use client";

import { useState } from "react";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  search:    "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  filter:    "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  message:   "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  calendar:  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  video:     "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  clock:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  x:         "M18 6L6 18M6 6l12 12",
  check:     "M20 6L9 17l-5-5",
  arrow:     "M5 12h14M12 5l7 7-7 7",
  chevron:   "M9 18l6-6-6-6",
  trending:  "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  book:      "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  wallet:    "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  user:      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  note:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  send:      "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  sort:      "M3 6h18M7 12h10M11 18h4",
};

/* ── types ──────────────────────────────────────────────── */
interface PastSession {
  subject: string; topic: string; date: string; rating: number; amount: number;
}
interface Student {
  id: string; name: string; avatar: string; color: string;
  email: string; phone: string; level: string; school: string;
  subjects: string[]; totalSessions: number; totalSpent: number;
  avgRating: number; lastSession: string; firstSession: string;
  status: "active" | "inactive"; notes: string;
  sessions: PastSession[];
}

/* ── data ───────────────────────────────────────────────── */
const SUBJECT_COLORS: Record<string, string> = {
  Physics: "#2563EB", Mathematics: "#F59E0B", Chemistry: "#7C3AED",
  Biology: "#10B981", English: "#EC4899", History: "#F97316",
};

const STUDENTS: Student[] = [
  {
    id: "st1", name: "Ada Okonkwo", avatar: "A", color: "#7C3AED",
    email: "ada.okonkwo@email.com", phone: "+234 801 234 5678",
    level: "200 Level", school: "Obafemi Awolowo University",
    subjects: ["Physics", "Mathematics"], totalSessions: 12, totalSpent: 37800,
    avgRating: 5.0, lastSession: "Today", firstSession: "Jan 2025", status: "active",
    notes: "Very dedicated student. Asks great questions. Improving rapidly in electromagnetism.",
    sessions: [
      { subject: "Physics",     topic: "Electromagnetic Waves",  date: "Today",        rating: 5, amount: 3150 },
      { subject: "Physics",     topic: "Electric Fields",        date: "Mon 19 May",   rating: 5, amount: 3150 },
      { subject: "Physics",     topic: "Capacitors & Circuits",  date: "Mon 12 May",   rating: 5, amount: 3150 },
      { subject: "Mathematics", topic: "Integration",            date: "Thu 8 May",    rating: 5, amount: 3150 },
      { subject: "Physics",     topic: "Newton's Laws",          date: "Mon 5 May",    rating: 5, amount: 3150 },
    ],
  },
  {
    id: "st2", name: "Tunde Adeola", avatar: "T", color: "#10B981",
    email: "tunde.adeola@email.com", phone: "+234 802 345 6789",
    level: "SS3", school: "King's College Lagos",
    subjects: ["Physics"], totalSessions: 8, totalSpent: 25200,
    avgRating: 4.9, lastSession: "Sun 18 May", firstSession: "Feb 2025", status: "active",
    notes: "JAMB candidate preparing for Physics. Scored 210 before tutoring. Target is 280+.",
    sessions: [
      { subject: "Physics", topic: "Mechanics & Motion",  date: "Sun 18 May",  rating: 5, amount: 3150 },
      { subject: "Physics", topic: "Waves & Sound",       date: "Sun 11 May",  rating: 5, amount: 3150 },
      { subject: "Physics", topic: "Optics",              date: "Mon 5 May",   rating: 4, amount: 3150 },
      { subject: "Physics", topic: "Heat & Temperature",  date: "Mon 28 Apr",  rating: 5, amount: 3150 },
    ],
  },
  {
    id: "st3", name: "Fatima Bello", avatar: "F", color: "#F59E0B",
    email: "fatima.bello@email.com", phone: "+234 803 456 7890",
    level: "100 Level", school: "ABU Zaria",
    subjects: ["Chemistry", "Physics"], totalSessions: 6, totalSpent: 18900,
    avgRating: 5.0, lastSession: "Fri 16 May", firstSession: "Mar 2025", status: "active",
    notes: "First year university student. Strong in theory but needs practical application work.",
    sessions: [
      { subject: "Chemistry", topic: "Organic Chemistry Basics", date: "Fri 16 May",  rating: 5, amount: 3150 },
      { subject: "Chemistry", topic: "Bonding & Structure",      date: "Fri 9 May",   rating: 5, amount: 3150 },
      { subject: "Physics",   topic: "Vectors & Scalars",        date: "Wed 7 May",   rating: 5, amount: 3150 },
    ],
  },
  {
    id: "st4", name: "David Eze", avatar: "D", color: "#2563EB",
    email: "david.eze@email.com", phone: "+234 804 567 8901",
    level: "300 Level", school: "Covenant University",
    subjects: ["Mathematics"], totalSessions: 9, totalSpent: 31500,
    avgRating: 4.7, lastSession: "Thu 15 May", firstSession: "Nov 2024", status: "active",
    notes: "CS student who needs strong maths foundation. Working through calculus and discrete maths.",
    sessions: [
      { subject: "Mathematics", topic: "Trigonometric Identities", date: "Thu 15 May",  rating: 5, amount: 3150 },
      { subject: "Mathematics", topic: "Sequences & Series",       date: "Thu 8 May",   rating: 4, amount: 3150 },
      { subject: "Mathematics", topic: "Quadratic Equations",      date: "Wed 7 May",   rating: 5, amount: 4500 },
    ],
  },
  {
    id: "st5", name: "Ngozi Eze", avatar: "N", color: "#EC4899",
    email: "ngozi.eze@email.com", phone: "+234 805 678 9012",
    level: "SS2", school: "Federal Government College Enugu",
    subjects: ["Physics", "Chemistry"], totalSessions: 4, totalSpent: 12600,
    avgRating: 4.5, lastSession: "Wed 14 May", firstSession: "Apr 2025", status: "active",
    notes: "New student. Quiet but very focused. Needs encouragement to ask questions.",
    sessions: [
      { subject: "Physics",   topic: "Optics & Refraction", date: "Wed 14 May",  rating: 4, amount: 3150 },
      { subject: "Physics",   topic: "Vectors & Scalars",   date: "Wed 7 May",   rating: 5, amount: 3150 },
    ],
  },
  {
    id: "st6", name: "Emeka Nwosu", avatar: "E", color: "#3B82F6",
    email: "emeka.nwosu@email.com", phone: "+234 806 789 0123",
    level: "200 Level", school: "University of Nigeria Nsukka",
    subjects: ["Mathematics"], totalSessions: 7, totalSpent: 26250,
    avgRating: 4.8, lastSession: "Wed 14 May", firstSession: "Dec 2024", status: "active",
    notes: "Strong in algebra. Working on calculus — integration is the current focus.",
    sessions: [
      { subject: "Mathematics", topic: "Integration by Parts",    date: "Tomorrow",    rating: 5, amount: 4500 },
      { subject: "Mathematics", topic: "Differential Equations",  date: "Wed 14 May",  rating: 5, amount: 4500 },
      { subject: "Mathematics", topic: "Limits & Continuity",     date: "Wed 7 May",   rating: 5, amount: 3150 },
    ],
  },
  {
    id: "st7", name: "Rasheed Kazeem", avatar: "R", color: "#F97316",
    email: "rasheed.kazeem@email.com", phone: "+234 807 890 1234",
    level: "SS3", school: "Government Secondary School Kano",
    subjects: ["Physics"], totalSessions: 2, totalSpent: 7875,
    avgRating: 4.5, lastSession: "Apr 2025", firstSession: "Apr 2025", status: "inactive",
    notes: "Booked 2 sessions then paused. May return before WAEC. Good potential.",
    sessions: [
      { subject: "Physics", topic: "Electricity & Magnetism", date: "Fri 24 May",  rating: 5, amount: 4500 },
    ],
  },
];

/* ── stars ───────────────────────────────────────────────── */
function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B" strokeWidth={1.8}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── subject pill ────────────────────────────────────────── */
function SubjectPill({ subject }: { subject: string }) {
  const color = SUBJECT_COLORS[subject] ?? "#64748B";
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
      style={{ background: `${color}14`, color, border: `1px solid ${color}25`, fontFamily: "var(--font-sora)" }}>
      {subject}
    </span>
  );
}

/* ── message modal ───────────────────────────────────────── */
function MessageModal({ student, onClose }: { student: Student; onClose: () => void }) {
  const [msg, setMsg]   = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
        <div className="px-6 py-4 flex items-center gap-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(30,41,59,0.5)" }}>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: student.color, fontFamily: "var(--font-sora)" }}>{student.avatar}</div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>{student.name}</p>
            <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{student.email}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <Icon d={ic.x} size={18} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {sent ? (
            <div className="text-center py-6 space-y-3">
              <div className="text-4xl">✉️</div>
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Message sent!</p>
              <p className="text-sm" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                {student.name} will receive your message shortly.
              </p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)" }}>
                Done
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Message</label>
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5}
                  placeholder={`Write a message to ${student.name.split(" ")[0]}…`}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
                  style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}>
                  Cancel
                </button>
                <button disabled={!msg.trim()} onClick={() => setSent(true)}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background: msg.trim() ? "linear-gradient(135deg,#D97706,#F59E0B)" : "#1E293B", color: msg.trim() ? "#0F172A" : "#475569", fontFamily: "var(--font-sora)", cursor: msg.trim() ? "pointer" : "not-allowed", boxShadow: msg.trim() ? "0 4px 16px rgba(245,158,11,0.3)" : "none" }}>
                  <Icon d={ic.send} size={15} /> Send Message
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── student detail drawer ───────────────────────────────── */
function StudentDrawer({ student, onClose, onMessage, onBook }: {
  student: Student; onClose: () => void; onMessage: () => void; onBook: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "notes">("overview");
  const [notes, setNotes]         = useState(student.notes);
  const [notesSaved, setNotesSaved] = useState(false);

  const saveNotes = () => { setNotesSaved(true); setTimeout(() => setNotesSaved(false), 2000); };

  return (
    <div className="fixed inset-0 z-40 flex justify-end"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md h-full flex flex-col overflow-hidden"
        style={{ background: "#0B1120", borderLeft: "1px solid rgba(255,255,255,0.08)", boxShadow: "-20px 0 60px rgba(0,0,0,0.5)", animation: "slideIn 0.3s ease" }}>

        {/* header */}
        <div className="relative overflow-hidden flex-shrink-0">
          <div className="h-20"
            style={{ background: "linear-gradient(135deg,#1C1507,#1a1040)" }}>
            <div className="absolute inset-0"
              style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-white"
            style={{ background: "rgba(0,0,0,0.3)" }}>
            <Icon d={ic.x} size={16} />
          </button>

          <div className="px-6 pb-5 -mt-8">
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 flex-shrink-0"
                style={{ background: student.color, borderColor: "#0B1120", fontFamily: "var(--font-sora)", boxShadow: `0 4px 20px ${student.color}50` }}>
                {student.avatar}
              </div>
              <div className="pb-1">
                <h2 className="text-white font-extrabold text-lg" style={{ fontFamily: "var(--font-sora)" }}>
                  {student.name}
                </h2>
                <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                  {student.level} · {student.school}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* status + subjects */}
        <div className="px-6 pb-4 flex-shrink-0 space-y-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold"
              style={{ background: student.status === "active" ? "rgba(16,185,129,0.12)" : "rgba(100,116,139,0.12)", color: student.status === "active" ? "#10B981" : "#64748B", fontFamily: "var(--font-sora)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: student.status === "active" ? "#10B981" : "#64748B" }} />
              {student.status === "active" ? "Active" : "Inactive"}
            </span>
            {student.subjects.map((s) => <SubjectPill key={s} subject={s} />)}
          </div>

          {/* quick stats */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: "Sessions",    val: student.totalSessions.toString(), color: "#2563EB" },
              { label: "Total Spent", val: `₦${(student.totalSpent/1000).toFixed(0)}k`, color: "#F59E0B" },
              { label: "Avg Rating",  val: student.avgRating.toFixed(1), color: "#F59E0B" },
            ].map((s) => (
              <div key={s.label} className="text-center p-2.5 rounded-xl"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="font-extrabold text-base" style={{ color: s.color, fontFamily: "var(--font-sora)" }}>{s.val}</p>
                <p className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* action buttons */}
          <div className="flex gap-2 pt-1">
            <button onClick={onMessage}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-sora)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
              <Icon d={ic.message} size={14} /> Message
            </button>
            <button onClick={onBook}
              className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)", boxShadow: "0 4px 14px rgba(245,158,11,0.3)" }}>
              <Icon d={ic.calendar} size={14} /> Schedule Session
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="flex gap-1 px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {(["overview", "sessions", "notes"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{ fontFamily: "var(--font-sora)", background: activeTab === t ? "rgba(245,158,11,0.15)" : "transparent", color: activeTab === t ? "#F59E0B" : "#475569", border: `1px solid ${activeTab === t ? "rgba(245,158,11,0.25)" : "transparent"}` }}>
              {t}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* contact */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Contact</p>
                <div className="space-y-2">
                  {[
                    { label: "Email",   val: student.email              },
                    { label: "Phone",   val: student.phone              },
                    { label: "School",  val: student.school             },
                    { label: "Level",   val: student.level              },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center py-1.5 text-xs"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#64748B", fontFamily: "var(--font-dm)" }}>
                      <span>{r.label}</span>
                      <span className="text-white font-medium text-right max-w-[180px] truncate" style={{ fontFamily: "var(--font-dm)" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* timeline */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Timeline</p>
                <div className="space-y-2">
                  {[
                    { label: "First session", val: student.firstSession },
                    { label: "Last session",  val: student.lastSession  },
                    { label: "Total sessions",val: `${student.totalSessions} sessions` },
                    { label: "Total earned",  val: `₦${student.totalSpent.toLocaleString()}` },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between text-xs py-1.5"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#64748B", fontFamily: "var(--font-dm)" }}>
                      <span>{r.label}</span>
                      <strong className="text-white" style={{ fontFamily: "var(--font-sora)" }}>{r.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* subject breakdown */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Subjects</p>
                {student.subjects.map((sub) => {
                  const count = student.sessions.filter((s) => s.subject === sub).length;
                  const color = SUBJECT_COLORS[sub] ?? "#64748B";
                  return (
                    <div key={sub} className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs"
                        style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                        <span style={{ color }}>{sub}</span>
                        <span>{count} session{count !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min((count / student.totalSessions) * 100, 100)}%`, background: `linear-gradient(90deg,${color},${color}88)` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SESSIONS */}
          {activeTab === "sessions" && (
            <div className="space-y-2.5">
              {student.sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${SUBJECT_COLORS[s.subject] ?? "#64748B"}14`, color: SUBJECT_COLORS[s.subject] ?? "#64748B" }}>
                    <Icon d={ic.book} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>{s.topic}</p>
                    <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                      {s.subject} · {s.date}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>₦{s.amount.toLocaleString()}</p>
                    <Stars rating={s.rating} size={11} />
                  </div>
                </div>
              ))}
              {student.sessions.length < student.totalSessions && (
                <p className="text-center text-xs py-2" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                  +{student.totalSessions - student.sessions.length} more sessions
                </p>
              )}
            </div>
          )}

          {/* NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <p className="text-xs leading-relaxed" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                Private notes visible only to you. Use this to track student progress, areas of weakness, or session reminders.
              </p>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={10}
                placeholder="Write notes about this student…"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
              <button onClick={saveNotes}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: notesSaved ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg,#D97706,#F59E0B)", color: notesSaved ? "#10B981" : "#0F172A", fontFamily: "var(--font-sora)", boxShadow: notesSaved ? "none" : "0 4px 14px rgba(245,158,11,0.25)" }}>
                {notesSaved ? <><Icon d={ic.check} size={15} /> Saved!</> : "Save Notes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── student card (list view) ────────────────────────────── */
function StudentCard({ student, onView, onMessage }: {
  student: Student; onView: () => void; onMessage: () => void;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 group transition-all duration-200 cursor-pointer"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      onClick={onView}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>

      {/* avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
          style={{ background: student.color, fontFamily: "var(--font-sora)" }}>
          {student.avatar}
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
          style={{ background: student.status === "active" ? "#10B981" : "#475569", borderColor: "#0B1120" }} />
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{student.name}</p>
        <p className="text-xs truncate" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          {student.level} · {student.school}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {student.subjects.map((s) => <SubjectPill key={s} subject={s} />)}
        </div>
      </div>

      {/* stats — hidden on small */}
      <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
        <div className="text-center">
          <p className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora)" }}>{student.totalSessions}</p>
          <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>Sessions</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-sm" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>
            ₦{(student.totalSpent / 1000).toFixed(0)}k
          </p>
          <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>Earned</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <svg width={12} height={12} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth={1.5}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <p className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-sora)" }}>{student.avgRating.toFixed(1)}</p>
          </div>
          <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>Rating</p>
        </div>
        <div className="text-right">
          <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{student.lastSession}</p>
          <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>Last session</p>
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <button onClick={onMessage}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          style={{ background: "rgba(255,255,255,0.05)", color: "#64748B", border: "1px solid rgba(255,255,255,0.07)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#F8FAFC"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
          <Icon d={ic.message} size={14} />
        </button>
        <Icon d={ic.chevron} size={16} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function StudentsPage() {
  const [search, setSearch]           = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterStatus, setFilterStatus]   = useState("All");
  const [sortBy, setSortBy]           = useState<"name" | "sessions" | "earned" | "rating" | "recent">("recent");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [messagingStudent, setMessagingStudent] = useState<Student | null>(null);

  const allSubjects = ["All", ...Array.from(new Set(STUDENTS.flatMap((s) => s.subjects)))];

  const filtered = STUDENTS
    .filter((s) => {
      const matchSearch  = s.name.toLowerCase().includes(search.toLowerCase()) ||
                           s.subjects.some((sub) => sub.toLowerCase().includes(search.toLowerCase())) ||
                           s.school.toLowerCase().includes(search.toLowerCase());
      const matchSubject = filterSubject === "All" || s.subjects.includes(filterSubject);
      const matchStatus  = filterStatus === "All" || s.status === filterStatus.toLowerCase();
      return matchSearch && matchSubject && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "sessions") return b.totalSessions - a.totalSessions;
      if (sortBy === "earned")   return b.totalSpent - a.totalSpent;
      if (sortBy === "rating")   return b.avgRating - a.avgRating;
      if (sortBy === "name")     return a.name.localeCompare(b.name);
      return 0; // recent — keep default order
    });

  const totalEarned   = STUDENTS.reduce((a, s) => a + s.totalSpent, 0);
  const totalSessions = STUDENTS.reduce((a, s) => a + s.totalSessions, 0);
  const activeCount   = STUDENTS.filter((s) => s.status === "active").length;
  const avgRating     = (STUDENTS.reduce((a, s) => a + s.avgRating, 0) / STUDENTS.length).toFixed(1);

  return (
    <div className="px-5 py-6 max-w-5xl mx-auto">
      {messagingStudent && (
        <MessageModal student={messagingStudent} onClose={() => setMessagingStudent(null)} />
      )}
      {selectedStudent && (
        <StudentDrawer
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onMessage={() => { setSelectedStudent(null); setMessagingStudent(selectedStudent); }}
          onBook={() => setSelectedStudent(null)}
        />
      )}

      {/* header */}
      <div className="mb-6">
        <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>My Students</h2>
        <p className="text-sm mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          All students who have booked sessions with you.
        </p>
      </div>

      {/* summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students",   val: STUDENTS.length.toString(),        icon: ic.user,     color: "#2563EB" },
          { label: "Active Students",  val: activeCount.toString(),             icon: ic.trending, color: "#10B981" },
          { label: "Total Earned",     val: `₦${(totalEarned/1000).toFixed(0)}k`, icon: ic.wallet, color: "#F59E0B" },
          { label: "Avg Rating",       val: avgRating,                          icon: ic.star,     color: "#F59E0B" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18`, color: s.color }}>
              <Icon d={s.icon} size={17} />
            </div>
            <div>
              <p className="font-extrabold text-white text-lg leading-none" style={{ fontFamily: "var(--font-sora)" }}>{s.val}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* filters */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
            <Icon d={ic.search} size={16} />
          </span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, subject, or school…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white outline-none"
            style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)", transition: "border-color 0.2s" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          {/* subject filter */}
          <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {allSubjects.map((sub) => (
              <button key={sub} onClick={() => setFilterSubject(sub)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                  fontFamily: "var(--font-sora)",
                  background: filterSubject === sub
                    ? sub === "All" ? "linear-gradient(135deg,#D97706,#F59E0B)" : `${SUBJECT_COLORS[sub] ?? "#64748B"}18`
                    : "rgba(30,41,59,0.6)",
                  color: filterSubject === sub
                    ? sub === "All" ? "#0F172A" : SUBJECT_COLORS[sub] ?? "#fff"
                    : "#475569",
                  border: `1px solid ${filterSubject === sub && sub !== "All" ? `${SUBJECT_COLORS[sub] ?? "#64748B"}35` : filterSubject === sub ? "transparent" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: filterSubject === sub && sub === "All" ? "0 4px 12px rgba(245,158,11,0.3)" : "none",
                }}>
                {sub}
              </button>
            ))}
          </div>

          {/* status + sort */}
          <div className="flex gap-2 ml-auto">
            {(["All","Active","Inactive"] as const).map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ fontFamily: "var(--font-sora)", background: filterStatus === s ? "rgba(16,185,129,0.12)" : "rgba(30,41,59,0.5)", color: filterStatus === s ? "#10B981" : "#475569", border: `1px solid ${filterStatus === s ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.05)"}` }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* sort row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs flex items-center gap-1.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            <Icon d={ic.sort} size={13} /> Sort:
          </span>
          {([
            { val: "recent",   label: "Most Recent"   },
            { val: "sessions", label: "Most Sessions" },
            { val: "earned",   label: "Most Earned"   },
            { val: "rating",   label: "Top Rated"     },
            { val: "name",     label: "A → Z"         },
          ] as { val: typeof sortBy; label: string }[]).map((opt) => (
            <button key={opt.val} onClick={() => setSortBy(opt.val)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{ fontFamily: "var(--font-sora)", background: sortBy === opt.val ? "rgba(245,158,11,0.12)" : "rgba(30,41,59,0.5)", color: sortBy === opt.val ? "#F59E0B" : "#475569", border: `1px solid ${sortBy === opt.val ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.05)"}` }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* results count */}
      <p className="text-xs mb-3" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
        Showing <strong className="text-white">{filtered.length}</strong> of{" "}
        <strong className="text-white">{STUDENTS.length}</strong> students
      </p>

      {/* list */}
      {filtered.length > 0 ? (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={() => setSelectedStudent(student)}
              onMessage={() => setMessagingStudent(student)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>No students found</h3>
          <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Try adjusting your search or filters.
          </p>
          <button onClick={() => { setSearch(""); setFilterSubject("All"); setFilterStatus("All"); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)" }}>
            Clear Filters
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}