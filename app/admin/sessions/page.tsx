"use client";

import { useState, useEffect } from "react";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  search:   "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  video:    "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  flag:     "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  close:    "M18 6L6 18M6 6l12 12",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  alert:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  sort:     "M3 6h18M7 12h10M11 18h4",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  send:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

type SessionStatus = "live" | "completed" | "cancelled" | "flagged";
type SessionType   = "video" | "voice";

interface Session {
  id: string;
  student: string;  studentAvatar: string;  studentColor: string;
  mentor: string;   mentorAvatar: string;   mentorColor: string;
  subject: string;  topic: string;
  type: SessionType; status: SessionStatus;
  date: string;     time: string;
  duration: string; amount: number;
  rating?: number;  flagReason?: string;
  startedAt?: string;
}

/* ── data ────────────────────────────────────────────────── */
const SESSIONS: Session[] = [
  { id:"ss1",  student:"Ada Okonkwo",    studentAvatar:"A", studentColor:"#7C3AED", mentor:"Dr. Adewale",   mentorAvatar:"DA", mentorColor:"#2563EB", subject:"Physics",     topic:"Electromagnetic Waves",    type:"video", status:"live",      date:"Today",        time:"3:00 PM",  duration:"18:32", amount:3500, startedAt:"2:59 PM" },
  { id:"ss2",  student:"Tunde Adeola",   studentAvatar:"T", studentColor:"#10B981", mentor:"Mrs. Bello",    mentorAvatar:"MB", mentorColor:"#7C3AED", subject:"Chemistry",   topic:"Organic Chemistry",       type:"voice", status:"live",      date:"Today",        time:"3:30 PM",  duration:"08:14", amount:3500, startedAt:"3:29 PM" },
  { id:"ss3",  student:"Emeka Nwosu",    studentAvatar:"E", studentColor:"#3B82F6", mentor:"Mr. Ibrahim",   mentorAvatar:"YI", mentorColor:"#F59E0B", subject:"Mathematics", topic:"Calculus — Integration",  type:"video", status:"live",      date:"Today",        time:"2:00 PM",  duration:"42:07", amount:5000, startedAt:"1:58 PM" },
  { id:"ss4",  student:"Ngozi Eze",      studentAvatar:"N", studentColor:"#EC4899", mentor:"Miss Chinwe",   mentorAvatar:"CE", mentorColor:"#EC4899", subject:"English",     topic:"Essay Writing",           type:"video", status:"live",      date:"Today",        time:"3:00 PM",  duration:"05:50", amount:2500, startedAt:"3:00 PM", flagReason:"Student reported audio issue" },
  { id:"ss5",  student:"Fatima Bello",   studentAvatar:"F", studentColor:"#F59E0B", mentor:"Dr. Adewale",   mentorAvatar:"DA", mentorColor:"#2563EB", subject:"Physics",     topic:"Mechanics — Newton",      type:"video", status:"flagged",   date:"Today",        time:"1:00 PM",  duration:"60 min", amount:3500, flagReason:"Student reported inappropriate conduct by mentor" },
  { id:"ss6",  student:"David Eze",      studentAvatar:"D", studentColor:"#2563EB", mentor:"Prof. Ibrahim", mentorAvatar:"YI", mentorColor:"#F59E0B", subject:"Mathematics", topic:"Trigonometry",            type:"voice", status:"completed", date:"Today",        time:"11:00 AM", duration:"60 min", amount:3500, rating:5 },
  { id:"ss7",  student:"Ada Okonkwo",    studentAvatar:"A", studentColor:"#7C3AED", mentor:"Dr. Adewale",   mentorAvatar:"DA", mentorColor:"#2563EB", subject:"Physics",     topic:"Electric Fields",         type:"video", status:"completed", date:"Mon 19 May",   time:"3:00 PM",  duration:"60 min", amount:3500, rating:5 },
  { id:"ss8",  student:"Sola Bello",     studentAvatar:"S", studentColor:"#06B6D4", mentor:"Mr. Nwosu",     mentorAvatar:"EN", mentorColor:"#10B981", subject:"CS",          topic:"Binary Search Algo",      type:"video", status:"completed", date:"Mon 19 May",   time:"5:00 PM",  duration:"90 min", amount:5000, rating:5 },
  { id:"ss9",  student:"Rasheed Kazeem", studentAvatar:"R", studentColor:"#F97316", mentor:"Dr. Adewale",   mentorAvatar:"DA", mentorColor:"#2563EB", subject:"Physics",     topic:"Electricity",             type:"video", status:"cancelled", date:"Sun 18 May",   time:"4:00 PM",  duration:"—",     amount:0 },
  { id:"ss10", student:"Chukwuemeka I.", studentAvatar:"C", studentColor:"#3B82F6", mentor:"Mrs. Okafor",   mentorAvatar:"FO", mentorColor:"#8B5CF6", subject:"Economics",   topic:"Micro — Supply & Demand", type:"voice", status:"completed", date:"Sun 18 May",   time:"2:00 PM",  duration:"60 min", amount:3500, rating:4 },
  { id:"ss11", student:"Ngozi Eze",      studentAvatar:"N", studentColor:"#EC4899", mentor:"Miss Chinwe",   mentorAvatar:"CE", mentorColor:"#EC4899", subject:"English",     topic:"Comprehension Skills",    type:"voice", status:"completed", date:"Sat 17 May",   time:"6:00 PM",  duration:"45 min", amount:2250, rating:4 },
  { id:"ss12", student:"Fatima Bello",   studentAvatar:"F", studentColor:"#F59E0B", mentor:"Mrs. Bello",    mentorAvatar:"MB", mentorColor:"#7C3AED", subject:"Chemistry",   topic:"Bonding & Structure",     type:"video", status:"completed", date:"Fri 16 May",   time:"4:00 PM",  duration:"60 min", amount:3500, rating:5 },
];

/* ── live timer ──────────────────────────────────────────── */
function LiveTimer({ start }: { start: string }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const total = secs;
  const m = Math.floor(total / 60); const s = total % 60;
  return <span>{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>;
}

/* ── session detail modal ────────────────────────────────── */
function SessionModal({ session, onClose, onFlag, onResolve }: {
  session: Session; onClose: () => void;
  onFlag: (id: string, reason: string) => void;
  onResolve: (id: string) => void;
}) {
  const [flagReason, setFlagReason] = useState(session.flagReason ?? "");
  const [flagging, setFlagging]     = useState(false);
  const [note, setNote]             = useState("");

  const statusStyle: Record<SessionStatus, { bg:string; color:string; label:string }> = {
    live:      { bg:"rgba(239,68,68,0.1)",   color:"#F87171", label:"Live"      },
    completed: { bg:"rgba(16,185,129,0.1)",  color:"#10B981", label:"Completed" },
    cancelled: { bg:"rgba(100,116,139,0.1)", color:"#64748B", label:"Cancelled" },
    flagged:   { bg:"rgba(245,158,11,0.12)", color:"#F59E0B", label:"Flagged"   },
  };
  const badge = statusStyle[session.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background:"#0B1120", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 32px 80px rgba(0,0,0,0.7)", maxHeight:"90vh", overflowY:"auto" }}>

        {/* header */}
        <div className="px-6 py-5 flex items-center justify-between gap-4"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(30,41,59,0.5)" }}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[{ av:session.studentAvatar, c:session.studentColor },{ av:session.mentorAvatar, c:session.mentorColor }].map((a,i)=>(
                <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold border-2"
                  style={{ background:a.c, borderColor:"#0B1120", fontFamily:"var(--font-sora)" }}>{a.av}</div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>
                {session.student} ↔ {session.mentor}
              </p>
              <p className="text-xs" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                {session.subject} · {session.topic}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background:badge.bg, color:badge.color, fontFamily:"var(--font-sora)" }}>
              {session.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>}
              {badge.label}
            </span>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <Icon d={ic.close} size={18}/>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* details */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:"Date",     val:session.date   },
              { label:"Time",     val:session.time   },
              { label:"Duration", val:session.duration },
              { label:"Type",     val:session.type === "video" ? "📹 Video" : "🎙 Voice" },
              { label:"Amount",   val:session.amount > 0 ? `₦${session.amount.toLocaleString()}` : "—" },
              { label:"Rating",   val:session.rating ? `⭐ ${session.rating}/5` : "—" },
            ].map((r) => (
              <div key={r.label} className="p-3 rounded-xl"
                style={{ background:"rgba(30,41,59,0.4)", border:"1px solid rgba(255,255,255,0.04)" }}>
                <p className="text-[10px] mb-0.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{r.label}</p>
                <p className="text-xs font-semibold text-white" style={{ fontFamily:"var(--font-sora)" }}>{r.val}</p>
              </div>
            ))}
          </div>

          {/* participants */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Participants</p>
            <div className="space-y-2">
              {[
                { label:"Student", name:session.student, avatar:session.studentAvatar, color:session.studentColor },
                { label:"Mentor",  name:session.mentor,  avatar:session.mentorAvatar,  color:session.mentorColor  },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background:p.color, fontFamily:"var(--font-sora)" }}>{p.avatar}</div>
                  <div>
                    <p className="text-white text-xs font-semibold" style={{ fontFamily:"var(--font-sora)" }}>{p.name}</p>
                    <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{p.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* flag info */}
          {session.status === "flagged" && (
            <div className="p-4 rounded-2xl space-y-3"
              style={{ background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)" }}>
              <div className="flex items-center gap-2">
                <Icon d={ic.flag} size={16}/>
                <p className="text-sm font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>Session Flagged</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color:"#94A3B8", fontFamily:"var(--font-dm)" }}>
                {session.flagReason}
              </p>
              <div className="space-y-2">
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
                  placeholder="Admin resolution note… (sent to both parties)"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
                  style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)" }}
                  onFocus={(e)=>{ e.currentTarget.style.borderColor="#F59E0B"; }}
                  onBlur={(e)=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}/>
                <div className="flex gap-2">
                  <button onClick={() => { onResolve(session.id); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background:"rgba(16,185,129,0.12)", color:"#10B981", border:"1px solid rgba(16,185,129,0.25)", fontFamily:"var(--font-sora)" }}>
                    <Icon d={ic.check} size={13}/> Mark Resolved
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background:"rgba(239,68,68,0.1)", color:"#F87171", border:"1px solid rgba(239,68,68,0.2)", fontFamily:"var(--font-sora)" }}>
                    <Icon d={ic.shield} size={13}/> Escalate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* flag action for non-flagged */}
          {session.status !== "flagged" && session.status !== "cancelled" && (
            <div>
              {!flagging ? (
                <button onClick={() => setFlagging(true)}
                  className="flex items-center gap-2 text-xs font-semibold transition-colors"
                  style={{ color:"#475569", fontFamily:"var(--font-dm)" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color="#F59E0B")}
                  onMouseLeave={(e)=>(e.currentTarget.style.color="#475569")}>
                  <Icon d={ic.flag} size={14}/> Flag this session
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>Flag Reason</p>
                  <textarea value={flagReason} onChange={(e) => setFlagReason(e.target.value)} rows={2}
                    placeholder="Describe the reason for flagging…"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none"
                    style={{ background:"#1E293B", border:"1px solid rgba(245,158,11,0.3)", fontFamily:"var(--font-dm)" }}/>
                  <div className="flex gap-2">
                    <button onClick={() => setFlagging(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
                      style={{ background:"rgba(255,255,255,0.05)", fontFamily:"var(--font-sora)" }}>
                      Cancel
                    </button>
                    <button disabled={!flagReason.trim()} onClick={() => { onFlag(session.id, flagReason); onClose(); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all"
                      style={{ background: flagReason.trim()?"rgba(245,158,11,0.15)":"#1E293B", color: flagReason.trim()?"#F59E0B":"#475569", border:`1px solid ${flagReason.trim()?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.06)"}`, fontFamily:"var(--font-sora)", cursor: flagReason.trim()?"pointer":"not-allowed" }}>
                      <Icon d={ic.flag} size={13}/> Submit Flag
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── session row ─────────────────────────────────────────── */
function SessionRow({ session, onView }: { session: Session; onView: () => void }) {
  const statusStyle: Record<SessionStatus, { bg:string; color:string; label:string }> = {
    live:      { bg:"rgba(239,68,68,0.1)",   color:"#F87171", label:"Live"      },
    completed: { bg:"rgba(16,185,129,0.1)",  color:"#10B981", label:"Completed" },
    cancelled: { bg:"rgba(100,116,139,0.1)", color:"#64748B", label:"Cancelled" },
    flagged:   { bg:"rgba(245,158,11,0.12)", color:"#F59E0B", label:"Flagged"   },
  };
  const s = statusStyle[session.status];

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 cursor-pointer group transition-all"
      style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
      onClick={onView}
      onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.02)"; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.background="transparent"; }}>

      {/* avatars */}
      <div className="flex -space-x-2 flex-shrink-0">
        {[{ av:session.studentAvatar, c:session.studentColor },{ av:session.mentorAvatar, c:session.mentorColor }].map((a,i)=>(
          <div key={i} className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-bold border-2"
            style={{ background:a.c, borderColor:"#0A1120", fontFamily:"var(--font-sora)" }}>{a.av}</div>
        ))}
      </div>

      {/* participants + topic */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>
          {session.student} ↔ {session.mentor}
        </p>
        <p className="text-xs truncate mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
          {session.subject} · {session.topic}
        </p>
      </div>

      {/* type badge */}
      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0 text-xs"
        style={{ color: session.type==="video"?"#60A5FA":"#10B981", fontFamily:"var(--font-dm)" }}>
        <Icon d={session.type==="video"?ic.video:ic.phone} size={13}/>
        <span className="hidden md:inline capitalize">{session.type}</span>
      </div>

      {/* date/time */}
      <div className="hidden md:block text-xs flex-shrink-0" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
        <p>{session.date}</p>
        <p>{session.time}</p>
      </div>

      {/* duration */}
      <div className="hidden lg:flex items-center gap-1 text-xs flex-shrink-0"
        style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
        <Icon d={ic.clock} size={12}/>
        {session.status === "live" ? (
          <span className="text-red-400 font-semibold"><LiveTimer start={session.startedAt!}/></span>
        ) : (
          <span>{session.duration}</span>
        )}
      </div>

      {/* amount */}
      <div className="hidden lg:block text-right flex-shrink-0">
        {session.amount > 0 ? (
          <p className="text-xs font-bold" style={{ color:"#10B981", fontFamily:"var(--font-sora)" }}>
            ₦{session.amount.toLocaleString()}
          </p>
        ) : (
          <p className="text-xs" style={{ color:"#334155" }}>—</p>
        )}
      </div>

      {/* rating */}
      <div className="hidden xl:flex items-center gap-0.5 flex-shrink-0">
        {session.rating ? (
          <>
            {[1,2,3,4,5].map((s)=>(
              <svg key={s} width={11} height={11} viewBox="0 0 24 24"
                fill={s<=session.rating!?"#F59E0B":"none"} stroke="#F59E0B" strokeWidth={1.8}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </>
        ) : <span className="text-xs" style={{ color:"#1E293B" }}>—</span>}
      </div>

      {/* status */}
      <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
        style={{ background:s.bg, color:s.color, fontFamily:"var(--font-sora)", border:`1px solid ${s.color}25` }}>
        {session.status==="live" && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>}
        {session.status==="flagged" && <Icon d={ic.flag} size={9}/>}
        {s.label}
      </span>

      {/* view */}
      <button onClick={(e)=>{ e.stopPropagation(); onView(); }}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
        style={{ background:"rgba(37,99,235,0.1)", color:"#60A5FA", border:"1px solid rgba(37,99,235,0.2)" }}>
        <Icon d={ic.eye} size={13}/>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function AdminSessionsPage() {
  const [sessions, setSessions]   = useState<Session[]>(SESSIONS);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState<"all"|SessionStatus>("all");
  const [filterType,   setType]   = useState<"all"|SessionType>("all");
  const [sortBy,       setSort]   = useState<"recent"|"amount"|"duration">("recent");
  const [viewing,      setViewing] = useState<Session|null>(null);
  const [tick, setTick]           = useState(0);

  /* refresh live durations every second */
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const handleFlag = (id: string, reason: string) => {
    setSessions((prev) => prev.map((s) => s.id===id ? { ...s, status:"flagged", flagReason:reason } : s));
  };
  const handleResolve = (id: string) => {
    setSessions((prev) => prev.map((s) => s.id===id ? { ...s, status:"completed" } : s));
  };

  const filtered = sessions.filter((s) => {
    const matchSearch = s.student.toLowerCase().includes(search.toLowerCase()) ||
                        s.mentor.toLowerCase().includes(search.toLowerCase()) ||
                        s.subject.toLowerCase().includes(search.toLowerCase()) ||
                        s.topic.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus==="all" || s.status===filterStatus;
    const matchType   = filterType==="all"   || s.type===filterType;
    return matchSearch && matchStatus && matchType;
  }).sort((a,b) => {
    if (sortBy==="amount") return b.amount - a.amount;
    return 0;
  });

  const counts = {
    all:       sessions.length,
    live:      sessions.filter((s)=>s.status==="live").length,
    completed: sessions.filter((s)=>s.status==="completed").length,
    flagged:   sessions.filter((s)=>s.status==="flagged").length,
    cancelled: sessions.filter((s)=>s.status==="cancelled").length,
  };

  const totalRevenue = sessions.filter((s)=>s.status==="completed").reduce((a,s)=>a+s.amount,0);
  const avgRating    = (sessions.filter((s)=>s.rating).reduce((a,s)=>a+(s.rating??0),0) / sessions.filter((s)=>s.rating).length).toFixed(1);

  const TABS: { id:"all"|SessionStatus; label:string; color:string }[] = [
    { id:"all",       label:`All (${counts.all})`,             color:"#2563EB" },
    { id:"live",      label:`Live (${counts.live})`,           color:"#EF4444" },
    { id:"completed", label:`Completed (${counts.completed})`, color:"#10B981" },
    { id:"flagged",   label:`Flagged (${counts.flagged})`,     color:"#F59E0B" },
    { id:"cancelled", label:`Cancelled (${counts.cancelled})`, color:"#64748B" },
  ];

  return (
    <div className="px-5 py-6 max-w-6xl mx-auto">
      {viewing && (
        <SessionModal session={viewing} onClose={() => setViewing(null)}
          onFlag={handleFlag} onResolve={handleResolve}/>
      )}

      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily:"var(--font-sora)" }}>Sessions</h2>
          <p className="text-sm mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
            Monitor all platform sessions in real time, review flags, and track performance.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {counts.live > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)" }}>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"/>
              <span className="text-xs font-bold" style={{ color:"#F87171", fontFamily:"var(--font-sora)" }}>
                {counts.live} live now
              </span>
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", fontFamily:"var(--font-sora)" }}>
            <Icon d={ic.download} size={14}/> Export
          </button>
        </div>
      </div>

      {/* summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Live Sessions",    val:counts.live.toString(),        color:"#EF4444", icon:ic.video,   pulse:true  },
          { label:"Completed Today",  val:counts.completed.toString(),   color:"#10B981", icon:ic.check               },
          { label:"Revenue Today",    val:`₦${(totalRevenue/1000).toFixed(0)}k`, color:"#F59E0B", icon:ic.wallet },
          { label:"Avg Rating",       val:avgRating,                     color:"#F59E0B", icon:ic.star                },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background:`${s.color}18`, color:s.color }}>
              <Icon d={s.icon} size={17}/>
              {s.pulse && counts.live > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"/>
              )}
            </div>
            <div>
              <p className="font-extrabold text-white text-xl leading-none" style={{ fontFamily:"var(--font-sora)" }}>{s.val}</p>
              <p className="text-xs mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* search + filters */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
            <Icon d={ic.search} size={16}/>
          </span>
          <input value={search} onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by student, mentor, subject, or topic…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white outline-none"
            style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)", transition:"border-color 0.2s" }}
            onFocus={(e)=>{ e.currentTarget.style.borderColor="#2563EB"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(37,99,235,0.12)"; }}
            onBlur={(e)=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow="none"; }}/>
        </div>

        {/* status tabs */}
        <div className="flex gap-1.5 p-1.5 rounded-2xl overflow-x-auto" style={{ background:"#1E293B", scrollbarWidth:"none" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setFilter(t.id)}
              className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ fontFamily:"var(--font-sora)", background: filterStatus===t.id?`${t.color}18`:"transparent", color: filterStatus===t.id?t.color:"#475569", border:`1px solid ${filterStatus===t.id?`${t.color}30`:"transparent"}` }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* type + sort row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>Type:</span>
          {(["all","video","voice"] as const).map((t) => (
            <button key={t} onClick={() => setType(t)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{ fontFamily:"var(--font-sora)",
                background: filterType===t?"rgba(37,99,235,0.12)":"rgba(30,41,59,0.5)",
                color: filterType===t?"#60A5FA":"#475569",
                border:`1px solid ${filterType===t?"rgba(37,99,235,0.25)":"rgba(255,255,255,0.05)"}` }}>
              {t!=="all" && <Icon d={t==="video"?ic.video:ic.phone} size={12}/>}
              {t==="all"?"All Types":t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs flex items-center gap-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
              <Icon d={ic.sort} size={12}/> Sort:
            </span>
            {([
              { val:"recent", label:"Most Recent" },
              { val:"amount", label:"Highest Paid"},
            ] as { val:typeof sortBy; label:string }[]).map((opt) => (
              <button key={opt.val} onClick={() => setSort(opt.val)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ fontFamily:"var(--font-sora)", background: sortBy===opt.val?"rgba(37,99,235,0.12)":"rgba(30,41,59,0.5)", color: sortBy===opt.val?"#60A5FA":"#475569", border:`1px solid ${sortBy===opt.val?"rgba(37,99,235,0.25)":"rgba(255,255,255,0.05)"}` }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* results count */}
      <p className="text-xs mb-3" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
        Showing <strong className="text-white">{filtered.length}</strong> session{filtered.length!==1?"s":""}
        {counts.flagged>0 && (
          <span className="ml-3 font-semibold" style={{ color:"#F59E0B" }}>
            ⚑ {counts.flagged} flagged
          </span>
        )}
      </p>

      {/* table */}
      {filtered.length > 0 ? (
        <div className="rounded-2xl overflow-hidden"
          style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)" }}>
          {/* col headers */}
          <div className="hidden lg:grid items-center gap-4 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.05)", color:"#334155", fontFamily:"var(--font-sora)",
              gridTemplateColumns:"3.5rem 1fr auto auto auto auto auto auto auto" }}>
            <span/>
            <span>Participants / Topic</span>
            <span>Type</span>
            <span>Date & Time</span>
            <span>Duration</span>
            <span>Amount</span>
            <span>Rating</span>
            <span>Status</span>
            <span/>
          </div>
          {filtered.map((s) => (
            <SessionRow key={s.id} session={s} onView={() => setViewing(s)}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-white font-bold" style={{ fontFamily:"var(--font-sora)" }}>No sessions found</h3>
          <p className="text-sm" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>Try adjusting your search or filters.</p>
          <button onClick={() => { setSearch(""); setFilter("all"); setType("all"); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", color:"#fff", fontFamily:"var(--font-sora)" }}>
            Clear Filters
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}