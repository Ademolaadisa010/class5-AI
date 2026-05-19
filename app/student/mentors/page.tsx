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
  search:   "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check:    "M20 6L9 17l-5-5",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  filter:   "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
  badge:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  close:    "M18 6L6 18M6 6l12 12",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  globe:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
};

interface Mentor {
  id: string; name: string; title: string; subjects: string[];
  rating: number; reviews: number; rate: number; avatar: string;
  avatarColor: string; available: boolean; badges: string[];
  students: number; sessions: number; languages: string[];
  bio: string; nextSlot: string; responseTime: string;
}

interface BookingSlot { date: string; times: string[]; }

const SUBJECTS = ["All","Mathematics","Physics","Chemistry","Biology","English","History","Computer Science","Economics"];

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: "#F59E0B", Physics: "#2563EB", Chemistry: "#7C3AED",
  Biology: "#10B981", English: "#EC4899", History: "#F97316",
  "Computer Science": "#06B6D4", Economics: "#8B5CF6",
};

const MENTORS: Mentor[] = [
  { id:"m1", name:"Dr. Adewale Okafor", title:"Physics PhD · University of Lagos",
    subjects:["Physics","Mathematics"], rating:4.9, reviews:142, rate:3500,
    avatar:"AO", avatarColor:"linear-gradient(135deg,#2563EB,#3B82F6)", available:true,
    badges:["Top Rated","WAEC Expert","PhD"], students:340, sessions:890, languages:["English","Yoruba"],
    bio:"PhD in Theoretical Physics with 8 years teaching experience. 95% of students improve by at least one grade.",
    nextSlot:"Today 3:00 PM", responseTime:"< 1 hour" },
  { id:"m2", name:"Mrs. Fatima Bello", title:"Chemistry MSc · ABU Zaria",
    subjects:["Chemistry","Biology"], rating:4.8, reviews:98, rate:2800,
    avatar:"FB", avatarColor:"linear-gradient(135deg,#7C3AED,#9333EA)", available:true,
    badges:["Top Rated","JAMB Specialist"], students:210, sessions:620, languages:["English","Hausa"],
    bio:"MSc Biochemistry. Practical and exam-focused teaching style. I help students understand the 'why' behind every reaction.",
    nextSlot:"Today 5:00 PM", responseTime:"< 2 hours" },
  { id:"m3", name:"Mr. Emeka Nwosu", title:"Mathematics BSc · OAU Ile-Ife",
    subjects:["Mathematics","Computer Science"], rating:4.7, reviews:76, rate:2500,
    avatar:"EN", avatarColor:"linear-gradient(135deg,#F59E0B,#FBBF24)", available:false,
    badges:["JAMB Expert"], students:180, sessions:430, languages:["English","Igbo"],
    bio:"5 years tutoring Maths and CS. Specialist in JAMB/WAEC prep and data structures for undergraduates.",
    nextSlot:"Tomorrow 10:00 AM", responseTime:"< 3 hours" },
  { id:"m4", name:"Miss Chinwe Eze", title:"English & Literature · UNILAG",
    subjects:["English"], rating:4.9, reviews:115, rate:2200,
    avatar:"CE", avatarColor:"linear-gradient(135deg,#EC4899,#F43F5E)", available:true,
    badges:["Top Rated","Essay Coach"], students:290, sessions:710, languages:["English"],
    bio:"English specialist. Comprehension, essay writing, oral English. Students consistently score A1 in WAEC.",
    nextSlot:"Today 4:30 PM", responseTime:"< 1 hour" },
  { id:"m5", name:"Prof. Yusuf Ibrahim", title:"Economics PhD · BUK Kano",
    subjects:["Economics","Mathematics"], rating:4.6, reviews:54, rate:4000,
    avatar:"YI", avatarColor:"linear-gradient(135deg,#8B5CF6,#7C3AED)", available:true,
    badges:["PhD","University Lecturer"], students:120, sessions:280, languages:["English","Hausa"],
    bio:"University lecturer. 12+ years teaching and research in micro and macroeconomics at all levels.",
    nextSlot:"Tomorrow 2:00 PM", responseTime:"< 4 hours" },
  { id:"m6", name:"Miss Aisha Suleiman", title:"Biology MSc · UNIMAID",
    subjects:["Biology","Chemistry"], rating:4.8, reviews:87, rate:2600,
    avatar:"AS", avatarColor:"linear-gradient(135deg,#10B981,#059669)", available:false,
    badges:["WAEC Expert"], students:200, sessions:510, languages:["English","Hausa"],
    bio:"6 years tutoring Biology with real-world examples and visual learning. JAMB and WAEC specialist.",
    nextSlot:"Tomorrow 11:00 AM", responseTime:"< 2 hours" },
];

const BOOKING_SLOTS: BookingSlot[] = [
  { date:"Today",      times:["3:00 PM","3:30 PM","5:00 PM","6:00 PM"] },
  { date:"Tomorrow",   times:["9:00 AM","10:00 AM","11:30 AM","2:00 PM","4:00 PM"] },
  { date:"Wed 22 May", times:["8:00 AM","10:00 AM","1:00 PM","3:30 PM"] },
  { date:"Thu 23 May", times:["9:30 AM","11:00 AM","2:30 PM","5:00 PM"] },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={13} height={13} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.8}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Booking modal ──────────────────────────────────────── */
function BookingModal({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  const [selDate, setSelDate] = useState(0);
  const [selTime, setSelTime] = useState<string|null>(null);
  const [topic, setTopic]     = useState("");
  const [booked, setBooked]   = useState(false);
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    if (!selTime) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setBooked(true); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)" }}
      onClick={(e)=>e.target===e.currentTarget&&onClose()}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background:"#0F172A", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 32px 80px rgba(0,0,0,0.6)", maxHeight:"90vh", overflowY:"auto" }}>

        {/* header */}
        <div className="px-6 py-4 flex items-center gap-4"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(30,41,59,0.5)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background:mentor.avatarColor, fontFamily:"var(--font-sora)" }}>{mentor.avatar}</div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>{mentor.name}</p>
            <p className="text-xs truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{mentor.title}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white font-bold" style={{ fontFamily:"var(--font-sora)" }}>₦{mentor.rate.toLocaleString()}</p>
            <p className="text-xs" style={{ color:"#475569" }}>per session</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors ml-1">
            <Icon d={ic.close} size={18} />
          </button>
        </div>

        {booked ? (
          <div className="px-6 py-12 text-center space-y-4">
            <div className="text-5xl">🎉</div>
            <h3 className="text-white text-xl font-extrabold" style={{ fontFamily:"var(--font-sora)" }}>Session Booked!</h3>
            <p className="text-sm" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
              Your session with <strong className="text-white">{mentor.name}</strong> is confirmed for{" "}
              <strong className="text-white">{BOOKING_SLOTS[selDate].date}</strong> at{" "}
              <strong style={{ color:"#F59E0B" }}>{selTime}</strong>.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
              style={{ background:"rgba(37,99,235,0.1)", border:"1px solid rgba(37,99,235,0.2)", color:"#60A5FA", fontFamily:"var(--font-dm)" }}>
              <Icon d={ic.calendar} size={14} /> Added to your calendar
            </div>
            <br />
            <button onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl font-bold text-white text-sm"
              style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* date */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Select Date</p>
              <div className="grid grid-cols-4 gap-2">
                {BOOKING_SLOTS.map((slot,i) => (
                  <button key={slot.date} onClick={()=>{ setSelDate(i); setSelTime(null); }}
                    className="py-2.5 rounded-xl text-xs font-semibold text-center transition-all"
                    style={{ fontFamily:"var(--font-sora)",
                      background: selDate===i ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "rgba(30,41,59,0.6)",
                      color: selDate===i ? "#fff" : "#475569",
                      border:`1px solid ${selDate===i ? "transparent" : "rgba(255,255,255,0.06)"}`,
                      boxShadow: selDate===i ? "0 4px 14px rgba(37,99,235,0.3)" : "none" }}>
                    {slot.date}
                  </button>
                ))}
              </div>
            </div>
            {/* time */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Select Time</p>
              <div className="grid grid-cols-4 gap-2">
                {BOOKING_SLOTS[selDate].times.map((t) => (
                  <button key={t} onClick={()=>setSelTime(t)}
                    className="py-2.5 rounded-xl text-xs font-semibold text-center transition-all"
                    style={{ fontFamily:"var(--font-sora)",
                      background: selTime===t ? "rgba(37,99,235,0.18)" : "rgba(30,41,59,0.6)",
                      color: selTime===t ? "#60A5FA" : "#475569",
                      border:`1px solid ${selTime===t ? "#2563EB" : "rgba(255,255,255,0.06)"}` }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {/* topic */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>
                Topic <span style={{ color:"#334155", fontWeight:400 }}>(optional)</span>
              </p>
              <textarea value={topic} onChange={(e)=>setTopic(e.target.value)} rows={3}
                placeholder="e.g. I need help with electromagnetic waves and circuits…"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", color:"#CBD5E1", fontFamily:"var(--font-dm)" }} />
            </div>
            {/* summary */}
            {selTime && (
              <div className="rounded-xl p-4 space-y-2"
                style={{ background:"rgba(37,99,235,0.07)", border:"1px solid rgba(37,99,235,0.15)" }}>
                <p className="text-xs font-bold text-white" style={{ fontFamily:"var(--font-sora)" }}>Session Summary</p>
                {[
                  ["Tutor",    mentor.name],
                  ["Date",     BOOKING_SLOTS[selDate].date],
                  ["Time",     selTime],
                  ["Duration", "60 minutes"],
                  ["Cost",     `₦${mentor.rate.toLocaleString()}`],
                ].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-xs" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
                    <span>{l}</span><strong className="text-white">{v}</strong>
                  </div>
                ))}
              </div>
            )}
            <button onClick={confirm} disabled={!selTime||loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300"
              style={{ fontFamily:"var(--font-sora)",
                background: !selTime||loading ? "#1E293B" : "linear-gradient(135deg,#2563EB,#7C3AED)",
                cursor: !selTime||loading ? "not-allowed" : "pointer",
                boxShadow: selTime&&!loading ? "0 6px 24px rgba(37,99,235,0.35)" : "none" }}>
              {loading ? (
                <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  style={{ animation:"spin 0.8s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>Confirming…</>
              ) : (
                <><Icon d={ic.calendar} size={16}/>Confirm Booking</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Profile modal ──────────────────────────────────────── */
function ProfileModal({ mentor, onClose, onBook }: { mentor:Mentor; onClose:()=>void; onBook:()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)" }}
      onClick={(e)=>e.target===e.currentTarget&&onClose()}>
      <div className="w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ background:"#0F172A", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 32px 80px rgba(0,0,0,0.6)", maxHeight:"90vh", overflowY:"auto" }}>

        {/* hero */}
        <div className="relative h-24" style={{ background:"linear-gradient(135deg,#1E1B4B,#1E3A5F)" }}>
          <div className="absolute inset-0" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-white"
            style={{ background:"rgba(0,0,0,0.3)" }}>
            <Icon d={ic.close} size={16} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* avatar row */}
          <div className="flex items-end gap-4 -mt-9 mb-5">
            <div className="w-18 h-18 rounded-2xl flex items-center justify-center text-white text-xl font-bold border-4 flex-shrink-0"
              style={{ width:72, height:72, background:mentor.avatarColor, borderColor:"#0F172A", fontFamily:"var(--font-sora)" }}>
              {mentor.avatar}
            </div>
            <div className="pb-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-white font-extrabold text-lg" style={{ fontFamily:"var(--font-sora)" }}>{mentor.name}</h2>
                {mentor.available && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background:"rgba(16,185,129,0.15)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>Available
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{mentor.title}</p>
            </div>
          </div>

          {/* badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.badges.map((b)=>(
              <span key={b} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background:"rgba(37,99,235,0.1)", border:"1px solid rgba(37,99,235,0.2)", color:"#60A5FA", fontFamily:"var(--font-sora)" }}>
                <Icon d={ic.badge} size={11}/>{b}
              </span>
            ))}
          </div>

          {/* stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { val:mentor.rating.toString(),  label:"Rating",   color:"#F59E0B" },
              { val:mentor.reviews.toString(), label:"Reviews",  color:"#2563EB" },
              { val:mentor.students.toString(),label:"Students", color:"#7C3AED" },
              { val:mentor.sessions.toString(),label:"Sessions", color:"#10B981" },
            ].map((s)=>(
              <div key={s.label} className="text-center p-3 rounded-xl"
                style={{ background:"rgba(30,41,59,0.5)", border:"1px solid rgba(255,255,255,0.05)" }}>
                <p className="font-extrabold text-lg" style={{ color:s.color, fontFamily:"var(--font-sora)" }}>{s.val}</p>
                <p className="text-[11px]" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* bio */}
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>About</p>
            <p className="text-sm leading-relaxed" style={{ color:"#94A3B8", fontFamily:"var(--font-dm)" }}>{mentor.bio}</p>
          </div>

          {/* details grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon:ic.book,     label:"Subjects",       val:mentor.subjects.join(", ") },
              { icon:ic.globe,    label:"Languages",      val:mentor.languages.join(", ") },
              { icon:ic.clock,    label:"Response Time",  val:mentor.responseTime },
              { icon:ic.calendar, label:"Next Available", val:mentor.nextSlot },
            ].map((d)=>(
              <div key={d.label} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background:"rgba(30,41,59,0.4)", border:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color:"#475569", marginTop:1 }}><Icon d={d.icon} size={15}/></span>
                <div>
                  <p className="text-[11px] mb-0.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{d.label}</p>
                  <p className="text-xs font-semibold text-white" style={{ fontFamily:"var(--font-dm)" }}>{d.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background:"rgba(30,41,59,0.7)", border:"1px solid rgba(255,255,255,0.08)", fontFamily:"var(--font-sora)" }}>
              <Icon d={ic.message} size={16}/>Message
            </button>
            <button onClick={onBook}
              className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)", boxShadow:"0 4px 20px rgba(37,99,235,0.35)" }}>
              <Icon d={ic.calendar} size={16}/>Book — ₦{mentor.rate.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mentor card ────────────────────────────────────────── */
function MentorCard({ mentor, onView, onBook }: { mentor:Mentor; onView:()=>void; onBook:()=>void }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-250"
      style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(10px)" }}
      onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(37,99,235,0.25)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(37,99,235,0.1)"; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow="none"; }}>

      {/* top */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background:mentor.avatarColor, fontFamily:"var(--font-sora)" }}>{mentor.avatar}</div>
          {mentor.available && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{ background:"#10B981", borderColor:"#0F172A" }}/>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily:"var(--font-sora)" }}>{mentor.name}</p>
          <p className="text-xs mt-0.5 truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{mentor.title}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Stars rating={mentor.rating}/>
            <span className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{mentor.rating}</span>
            <span className="text-xs" style={{ color:"#334155" }}>({mentor.reviews})</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white font-extrabold text-sm" style={{ fontFamily:"var(--font-sora)" }}>₦{mentor.rate.toLocaleString()}</p>
          <p className="text-[10px]" style={{ color:"#475569" }}>/session</p>
        </div>
      </div>

      {/* subjects + badge */}
      <div className="flex flex-wrap gap-1.5">
        {mentor.subjects.map((s)=>(
          <span key={s} className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
            style={{ background:`${SUBJECT_COLORS[s]??'#64748B'}15`, color:SUBJECT_COLORS[s]??'#64748B', border:`1px solid ${SUBJECT_COLORS[s]??'#64748B'}25`, fontFamily:"var(--font-sora)" }}>{s}</span>
        ))}
        <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-semibold"
          style={{ background:"rgba(245,158,11,0.1)", color:"#F59E0B", border:"1px solid rgba(245,158,11,0.2)", fontFamily:"var(--font-sora)" }}>
          <Icon d={ic.badge} size={9}/>{mentor.badges[0]}
        </span>
      </div>

      {/* bio */}
      <p className="text-xs leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {mentor.bio}
      </p>

      {/* meta */}
      <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
        <span className="flex items-center gap-1"><Icon d={ic.user} size={12}/>{mentor.students} students</span>
        <span className="flex items-center gap-1"><Icon d={ic.clock} size={12}/>{mentor.responseTime}</span>
        <span className="flex items-center gap-1 ml-auto font-semibold"
          style={{ color:mentor.available?"#10B981":"#475569" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background:mentor.available?"#10B981":"#475569" }}/>
          {mentor.nextSlot}
        </span>
      </div>

      {/* actions */}
      <div className="flex gap-2 pt-1" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={onView}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-all"
          style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-sora)" }}
          onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(255,255,255,0.08)")}
          onMouseLeave={(e)=>(e.currentTarget.style.background="rgba(255,255,255,0.04)")}>
          View Profile
        </button>
        <button onClick={onBook}
          className="flex-[2] py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200"
          style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)", boxShadow:"0 4px 14px rgba(37,99,235,0.3)" }}
          onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(37,99,235,0.45)"; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(37,99,235,0.3)"; }}>
          Book Session
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function MentorsPage() {
  const [search, setSearch]               = useState("");
  const [activeSubject, setActiveSubject] = useState("All");
  const [sortBy, setSortBy]               = useState<"rating"|"price-low"|"price-high"|"reviews">("rating");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewMentor, setViewMentor]       = useState<Mentor|null>(null);
  const [bookMentor, setBookMentor]       = useState<Mentor|null>(null);

  const filtered = MENTORS
    .filter((m)=>{
      const matchSearch  = m.name.toLowerCase().includes(search.toLowerCase())
                        || m.subjects.some((s)=>s.toLowerCase().includes(search.toLowerCase()))
                        || m.title.toLowerCase().includes(search.toLowerCase());
      const matchSubject = activeSubject==="All" || m.subjects.includes(activeSubject);
      const matchAvail   = !availableOnly || m.available;
      return matchSearch && matchSubject && matchAvail;
    })
    .sort((a,b)=>{
      if (sortBy==="rating")     return b.rating-a.rating;
      if (sortBy==="reviews")    return b.reviews-a.reviews;
      if (sortBy==="price-low")  return a.rate-b.rate;
      if (sortBy==="price-high") return b.rate-a.rate;
      return 0;
    });

  return (
    <div className="px-5 py-6 max-w-7xl mx-auto">

      {viewMentor && !bookMentor && (
        <ProfileModal mentor={viewMentor} onClose={()=>setViewMentor(null)}
          onBook={()=>{ setBookMentor(viewMentor); setViewMentor(null); }}/>
      )}
      {bookMentor && <BookingModal mentor={bookMentor} onClose={()=>setBookMentor(null)}/>}

      {/* header */}
      <div className="mb-6">
        <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily:"var(--font-sora)" }}>Find a Tutor</h2>
        <p className="text-sm mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
          Book 1-on-1 sessions with verified expert tutors across all subjects.
        </p>
      </div>

      {/* search */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
            <Icon d={ic.search} size={17}/>
          </span>
          <input value={search} onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by name, subject, or qualification…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white outline-none"
            style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)", transition:"border-color 0.2s, box-shadow 0.2s" }}
            onFocus={(e)=>{ e.currentTarget.style.borderColor="#2563EB"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(37,99,235,0.15)"; }}
            onBlur={(e)=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow="none"; }}/>
        </div>

        {/* subject pills */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:"none" }}>
          {SUBJECTS.map((s)=>(
            <button key={s} onClick={()=>setActiveSubject(s)}
              className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{ fontFamily:"var(--font-sora)",
                background: activeSubject===s
                  ? s==="All" ? "linear-gradient(135deg,#2563EB,#7C3AED)" : `${SUBJECT_COLORS[s]??'#2563EB'}20`
                  : "rgba(30,41,59,0.6)",
                color: activeSubject===s ? s==="All"?"#fff":SUBJECT_COLORS[s]??'#fff' : "#475569",
                border:`1px solid ${activeSubject===s&&s!=="All" ? `${SUBJECT_COLORS[s]??'#2563EB'}40` : activeSubject===s ? "transparent" : "rgba(255,255,255,0.06)"}`,
                boxShadow: activeSubject===s&&s==="All" ? "0 4px 14px rgba(37,99,235,0.3)" : "none" }}>
              {s}
            </button>
          ))}
        </div>

        {/* sort + available */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs flex items-center gap-1.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
            <Icon d={ic.filter} size={13}/> Sort:
          </span>
          {([
            { val:"rating",     label:"Top Rated"   },
            { val:"reviews",    label:"Most Reviews"},
            { val:"price-low",  label:"Price ↑"     },
            { val:"price-high", label:"Price ↓"     },
          ] as { val: typeof sortBy; label: string }[]).map((opt)=>(
            <button key={opt.val} onClick={()=>setSortBy(opt.val)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{ fontFamily:"var(--font-sora)",
                background: sortBy===opt.val ? "rgba(37,99,235,0.15)" : "rgba(30,41,59,0.5)",
                color: sortBy===opt.val ? "#60A5FA" : "#475569",
                border:`1px solid ${sortBy===opt.val ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.05)"}` }}>
              {opt.label}
            </button>
          ))}
          <button onClick={()=>setAvailableOnly(!availableOnly)}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ fontFamily:"var(--font-sora)",
              background: availableOnly ? "rgba(16,185,129,0.12)" : "rgba(30,41,59,0.5)",
              color: availableOnly ? "#10B981" : "#475569",
              border:`1px solid ${availableOnly ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.05)"}` }}>
            <span className="w-2 h-2 rounded-full" style={{ background:availableOnly?"#10B981":"#475569" }}/>
            Available Now
          </button>
        </div>
      </div>

      {/* count */}
      <p className="text-xs mb-4" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
        Showing <strong className="text-white">{filtered.length}</strong> tutor{filtered.length!==1?"s":""}
        {activeSubject!=="All" && <> in <strong className="text-white">{activeSubject}</strong></>}
      </p>

      {/* grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((m)=>(
            <MentorCard key={m.id} mentor={m}
              onView={()=>setViewMentor(m)}
              onBook={()=>setBookMentor(m)}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-white font-bold" style={{ fontFamily:"var(--font-sora)" }}>No tutors found</h3>
          <p className="text-sm" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
            Try adjusting your filters or searching for a different subject.
          </p>
          <button onClick={()=>{ setSearch(""); setActiveSubject("All"); setAvailableOnly(false); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>
            Clear Filters
          </button>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}