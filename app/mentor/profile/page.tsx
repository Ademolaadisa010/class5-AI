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
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  camera:   "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  globe:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  plus:     "M12 5v14M5 12h14",
  trash:    "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  share:    "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  award:    "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  link:     "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
};

/* ── constants ───────────────────────────────────────────── */
const ALL_SUBJECTS  = ["Mathematics","Physics","Chemistry","Biology","English","History","Computer Science","Economics","Geography","Further Maths","Literature","Government","Accounting"];
const ALL_LEVELS    = ["Primary School","JSS 1–3","SS 1–3","JAMB/UTME","WAEC/NECO","100 Level","200 Level","300 Level","400 Level","Postgraduate","Professional"];
const ALL_LANGUAGES = ["English","Yoruba","Hausa","Igbo","Pidgin","French"];
const DAYS          = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const TIME_SLOTS    = ["6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM"];

const SUBJECT_COLORS: Record<string,string> = {
  Mathematics:"#F59E0B", Physics:"#2563EB", Chemistry:"#7C3AED",
  Biology:"#10B981", English:"#EC4899", History:"#F97316",
  "Computer Science":"#06B6D4", Economics:"#8B5CF6",
};

const REVIEWS = [
  { student:"Ada Okonkwo",   avatar:"A", color:"#7C3AED", rating:5, time:"2h ago",   text:"Dr. Okonkwo explained electromagnetic waves so clearly! I finally understand after weeks of confusion." },
  { student:"Tunde Adeola",  avatar:"T", color:"#10B981", rating:5, time:"1d ago",   text:"Best Physics tutor on the platform. Patient, clear, and very knowledgeable. JAMB score improved from 210 to 268." },
  { student:"David Eze",     avatar:"D", color:"#2563EB", rating:4, time:"3d ago",   text:"Excellent sessions on calculus. Would love slightly longer sessions but very helpful overall." },
  { student:"Fatima Bello",  avatar:"F", color:"#F59E0B", rating:5, time:"5d ago",   text:"Chemistry sessions are amazing. She makes organic chemistry so simple. Highly recommended!" },
];

/* ── helpers ─────────────────────────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(10px)" }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>{children}</p>
      {action}
    </div>
  );
}

function SaveBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
      style={{ background: saved ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg,#D97706,#F59E0B)", color: saved ? "#10B981" : "#0F172A", fontFamily:"var(--font-sora)", boxShadow: saved ? "none" : "0 4px 16px rgba(245,158,11,0.3)" }}>
      {saved ? <><Icon d={ic.check} size={15}/> Saved!</> : "Save Changes"}
    </button>
  );
}

function PillToggle({ options, selected, onToggle, colorMap }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void;
  colorMap?: Record<string,string>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        const color  = colorMap?.[opt] ?? "#F59E0B";
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{ fontFamily:"var(--font-sora)", background: active ? `${color}18` : "rgba(30,41,59,0.6)", color: active ? color : "#475569", border:`1px solid ${active ? `${color}35` : "rgba(255,255,255,0.06)"}` }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Stars({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={interactive ? 22 : 13} height={interactive ? 22 : 13} viewBox="0 0 24 24"
          fill={s <= (hover || rating) ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.8}
          style={{ cursor: interactive ? "pointer" : "default", transition:"transform 0.1s", transform: interactive && s <= hover ? "scale(1.15)" : "scale(1)" }}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate?.(s)}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── public profile preview card ────────────────────────── */
function PublicPreview({ data }: { data: typeof INIT }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background:"rgba(30,41,59,0.8)", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
      {/* banner */}
      <div className="h-16 relative"
        style={{ background:"linear-gradient(135deg,#1C1507,#1a1040)" }}>
        <div className="absolute inset-0"
          style={{ backgroundImage:"linear-gradient(rgba(245,158,11,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.05) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
      </div>

      <div className="px-5 pb-5">
        {/* avatar */}
        <div className="flex items-end gap-3 -mt-7 mb-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold border-3 flex-shrink-0"
            style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", borderColor:"rgba(30,41,59,0.8)", fontFamily:"var(--font-sora)", boxShadow:"0 4px 16px rgba(245,158,11,0.35)" }}>
            {data.firstName?.[0] ?? "A"}
          </div>
          <div className="pb-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white font-bold text-sm truncate" style={{ fontFamily:"var(--font-sora)" }}>
                {[data.title, data.firstName, data.lastName].filter(Boolean).join(" ") || "Your Name"}
              </p>
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold"
                style={{ background:"rgba(16,185,129,0.12)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>Verified
              </span>
            </div>
            <p className="text-xs truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
              {data.institution || "Your Institution"}
            </p>
          </div>
        </div>

        {/* subjects */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {data.subjects.slice(0,3).map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background:`${SUBJECT_COLORS[s]??'#64748B'}14`, color:SUBJECT_COLORS[s]??'#64748B', border:`1px solid ${SUBJECT_COLORS[s]??'#64748B'}25`, fontFamily:"var(--font-sora)" }}>
              {s}
            </span>
          ))}
          {data.subjects.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background:"rgba(255,255,255,0.05)", color:"#475569", fontFamily:"var(--font-sora)" }}>
              +{data.subjects.length - 3} more
            </span>
          )}
        </div>

        {/* bio preview */}
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
          {data.bio || "Your professional bio will appear here."}
        </p>

        {/* meta */}
        <div className="flex items-center gap-3 text-xs flex-wrap mb-4" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
          <span className="flex items-center gap-1"><Icon d={ic.users} size={12}/>234 students</span>
          <span className="flex items-center gap-1"><Icon d={ic.clock} size={12}/>{"< 1 hour"}</span>
          <span className="flex items-center gap-1 ml-auto font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
            ₦{data.rate ? parseInt(data.rate).toLocaleString() : "—"}<span className="font-normal text-slate-500">/session</span>
          </span>
        </div>

        {/* stars */}
        <div className="flex items-center gap-2 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <Stars rating={4.9} />
          <span className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>4.9</span>
          <span className="text-xs" style={{ color:"#334155" }}>(142 reviews)</span>
        </div>
      </div>
    </div>
  );
}

/* ── availability grid ───────────────────────────────────── */
function AvailabilityGrid({ availability, onChange }: {
  availability: Record<string, string[]>;
  onChange: (av: Record<string, string[]>) => void;
}) {
  const toggle = (day: string, time: string) => {
    const cur = availability[day] ?? [];
    onChange({ ...availability, [day]: cur.includes(time) ? cur.filter((t) => t !== time) : [...cur, time] });
  };
  const total = Object.values(availability).flat().length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: total > 0 ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)", color: total > 0 ? "#10B981" : "#334155", fontFamily:"var(--font-sora)" }}>
          {total} slot{total !== 1 ? "s" : ""} selected
        </span>
      </div>
      {DAYS.map((day) => {
        const sel = availability[day] ?? [];
        return (
          <div key={day}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-semibold text-white" style={{ fontFamily:"var(--font-sora)" }}>{day}</p>
              {sel.length > 0 && (
                <span className="text-[10px] font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{sel.length} slot{sel.length>1?"s":""}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TIME_SLOTS.map((time) => {
                const on = sel.includes(time);
                return (
                  <button key={time} type="button" onClick={() => toggle(day, time)}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
                    style={{ fontFamily:"var(--font-sora)", background: on ? "rgba(245,158,11,0.18)" : "rgba(30,41,59,0.5)", color: on ? "#F59E0B" : "#334155", border:`1px solid ${on ? "rgba(245,158,11,0.35)" : "rgba(255,255,255,0.05)"}` }}>
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── edit tabs ───────────────────────────────────────────── */
type EditTab = "basic" | "teaching" | "availability" | "faq";

/* ── INIT data ───────────────────────────────────────────── */
const INIT = {
  title: "Dr.", firstName: "Ada", lastName: "Okonkwo",
  institution: "University of Lagos",
  yearsExp: "6–10 years",
  bio: "PhD in Theoretical Physics with over 8 years of teaching and tutoring experience. I specialise in making complex physics and mathematics concepts simple and accessible. 95% of my students improve by at least one grade. I use relatable real-world examples and focus heavily on exam techniques.",
  subjects: ["Physics", "Mathematics"],
  levels: ["SS 1–3", "JAMB/UTME", "WAEC/NECO", "100 Level"],
  languages: ["English", "Yoruba"],
  rate: "3500",
  availability: {
    Monday:    ["3 PM","4 PM","5 PM"],
    Tuesday:   ["3 PM","4 PM","5 PM"],
    Wednesday: ["3 PM","4 PM","5 PM"],
    Thursday:  ["3 PM","4 PM"],
    Friday:    ["4 PM","5 PM","6 PM"],
    Saturday:  ["9 AM","10 AM","11 AM","12 PM","2 PM","3 PM"],
    Sunday:    [],
  } as Record<string, string[]>,
  faqs: [
    { q: "How do I prepare for our first session?", a: "Come with specific topics or questions you want to cover. Review your class notes beforehand so we can focus on gaps." },
    { q: "Do you provide study materials?",         a: "Yes — I share past questions, formula sheets, and summary notes relevant to what we cover." },
  ],
};

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function MentorProfilePage() {
  const [data, setData]       = useState({ ...INIT });
  const [editTab, setEditTab] = useState<EditTab>("basic");
  const [saved, setSaved]     = useState<Record<EditTab, boolean>>({ basic:false, teaching:false, availability:false, faq:false });
  const [showPreview, setShowPreview] = useState(false);
  const [faqQ, setFaqQ]       = useState("");
  const [faqA, setFaqA]       = useState("");

  const set = (k: keyof typeof INIT, v: unknown) => setData((d) => ({ ...d, [k]: v }));
  const toggleArr = (key: "subjects"|"levels"|"languages", val: string) => {
    const arr = data[key] as string[];
    set(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const save = (tab: EditTab) => {
    setSaved((s) => ({ ...s, [tab]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [tab]: false })), 2500);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all";
  const inputStyle = { background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)" } as React.CSSProperties;
  const focus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    e.currentTarget.style.borderColor="#F59E0B";
    e.currentTarget.style.boxShadow="0 0 0 3px rgba(245,158,11,0.12)";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";
    e.currentTarget.style.boxShadow="none";
  };

  const EDIT_TABS: { id: EditTab; label: string }[] = [
    { id:"basic",        label:"Basic Info"   },
    { id:"teaching",     label:"Teaching"     },
    { id:"availability", label:"Availability" },
    { id:"faq",          label:"FAQs"         },
  ];

  return (
    <div className="px-5 py-6 max-w-6xl mx-auto">

      {/* header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily:"var(--font-sora)" }}>My Profile</h2>
          <p className="text-sm mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
            Manage how students see you on the marketplace.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: showPreview ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)", border:`1px solid ${showPreview ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)"}`, fontFamily:"var(--font-sora)" }}>
            <Icon d={ic.eye} size={15}/> {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", fontFamily:"var(--font-sora)" }}>
            <Icon d={ic.link} size={15}/> Share Profile
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── left col: stats + preview ───────────── */}
        <div className="space-y-5">

          {/* hero card */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="h-24 relative"
              style={{ background:"linear-gradient(135deg,#1C1507,#1a1040)" }}>
              <div className="absolute inset-0"
                style={{ backgroundImage:"linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
            </div>
            <div className="px-5 pb-5"
              style={{ background:"rgba(15,23,42,0.95)" }}>
              <div className="flex items-end gap-3 -mt-8 mb-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4"
                    style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", borderColor:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 4px 20px rgba(245,158,11,0.4)" }}>
                    A
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background:"#F59E0B", color:"#0F172A" }}>
                    <Icon d={ic.camera} size={12}/>
                  </button>
                </div>
                <div className="pb-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-extrabold" style={{ fontFamily:"var(--font-sora)" }}>Dr. Ada Okonkwo</p>
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ background:"rgba(16,185,129,0.12)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
                      <Icon d={ic.shield} size={9}/> Verified
                    </span>
                  </div>
                  <p className="text-xs" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>Physics · Mathematics</p>
                </div>
              </div>

              {/* stat pills */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { val:"4.9",  label:"Rating",   color:"#F59E0B" },
                  { val:"142",  label:"Reviews",  color:"#2563EB" },
                  { val:"234",  label:"Students", color:"#10B981" },
                ].map((s) => (
                  <div key={s.label} className="text-center py-2.5 rounded-xl"
                    style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }}>
                    <p className="font-extrabold text-base" style={{ color:s.color, fontFamily:"var(--font-sora)" }}>{s.val}</p>
                    <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* profile completion */}
              <div>
                <div className="flex justify-between text-xs mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                  <span>Profile Completion</span>
                  <span style={{ color:"#F59E0B", fontFamily:"var(--font-sora)", fontWeight:700 }}>88%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
                  <div className="h-full rounded-full" style={{ width:"88%", background:"linear-gradient(90deg,#D97706,#F59E0B)" }}/>
                </div>
                <p className="text-[10px] mt-1.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
                  Add 2 FAQs to reach 100%
                </p>
              </div>
            </div>
          </div>

          {/* public preview */}
          {showPreview && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>
                <Icon d={ic.eye} size={11}/> How students see you
              </p>
              <PublicPreview data={data} />
            </div>
          )}

          {/* reviews summary */}
          <Card className="p-5">
            <SectionTitle>Recent Reviews</SectionTitle>
            <div className="space-y-4">
              {REVIEWS.map((r, i) => (
                <div key={i} className="space-y-2 pb-4" style={{ borderBottom: i < REVIEWS.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background:r.color, fontFamily:"var(--font-sora)" }}>{r.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold" style={{ fontFamily:"var(--font-sora)" }}>{r.student}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Stars rating={r.rating} />
                      <span className="text-[10px]" style={{ color:"#334155" }}>{r.time}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── right col: edit form ─────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* edit tab switcher */}
          <div className="flex gap-1.5 p-1.5 rounded-2xl" style={{ background:"#1E293B" }}>
            {EDIT_TABS.map((t) => (
              <button key={t.id} onClick={() => setEditTab(t.id)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{ fontFamily:"var(--font-sora)", background: editTab===t.id ? "linear-gradient(135deg,#D97706,#F59E0B)" : "transparent", color: editTab===t.id ? "#0F172A" : "#475569", boxShadow: editTab===t.id ? "0 4px 12px rgba(245,158,11,0.3)" : "none" }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── BASIC INFO ───────────────────────────── */}
          {editTab === "basic" && (
            <Card className="p-6 space-y-5">
              <SectionTitle>Basic Information</SectionTitle>

              {/* photo */}
              <div className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)" }}>
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                    style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", fontFamily:"var(--font-sora)" }}>A</div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background:"#F59E0B", color:"#0F172A" }}>
                    <Icon d={ic.camera} size={11}/>
                  </button>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily:"var(--font-sora)" }}>Profile Photo</p>
                  <p className="text-xs mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>JPG or PNG · Max 5MB · Shown to all students</p>
                  <button className="text-xs font-semibold mt-1" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>Change photo</button>
                </div>
              </div>

              {/* name row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Title</label>
                  <select value={data.title} onChange={(e) => set("title", e.target.value)}
                    className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                    {["Mr.","Mrs.","Miss","Dr.","Prof."].map((t) => <option key={t} style={{ background:"#1E293B" }}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>First Name</label>
                  <input value={data.firstName} onChange={(e) => set("firstName", e.target.value)}
                    className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Last Name</label>
                  <input value={data.lastName} onChange={(e) => set("lastName", e.target.value)}
                    className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Institution / Organisation</label>
                <input value={data.institution} onChange={(e) => set("institution", e.target.value)}
                  placeholder="e.g. University of Lagos" className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>
                  Professional Bio <span className="normal-case font-normal text-slate-600">({data.bio.length}/600)</span>
                </label>
                <textarea value={data.bio} onChange={(e) => set("bio", e.target.value.slice(0,600))}
                  rows={6} placeholder="Describe your background, teaching style, and what makes you a great tutor…"
                  className={`${inputCls} resize-none`} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Years of Experience</label>
                  <select value={data.yearsExp} onChange={(e) => set("yearsExp", e.target.value)}
                    className={inputCls} style={{ ...inputStyle, color:"#F8FAFC" }} onFocus={focus} onBlur={blur}>
                    {["Less than 1 year","1–2 years","3–5 years","6–10 years","10+ years"].map((o) => <option key={o} style={{ background:"#1E293B" }}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Session Rate (₦)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color:"#475569" }}>₦</span>
                    <input type="number" value={data.rate} onChange={(e) => set("rate", e.target.value)}
                      className={inputCls} style={{ ...inputStyle, paddingLeft:"1.75rem" }} onFocus={focus} onBlur={blur} />
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {["1500","2500","3500","5000"].map((v) => (
                      <button key={v} type="button" onClick={() => set("rate", v)}
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold transition-all"
                        style={{ background: data.rate===v ? "rgba(245,158,11,0.15)" : "rgba(30,41,59,0.6)", color: data.rate===v ? "#F59E0B" : "#475569", border:`1px solid ${data.rate===v ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.05)"}`, fontFamily:"var(--font-sora)" }}>
                        ₦{v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <SaveBtn onClick={() => save("basic")} saved={saved.basic} />
              </div>
            </Card>
          )}

          {/* ── TEACHING ─────────────────────────────── */}
          {editTab === "teaching" && (
            <Card className="p-6 space-y-6">
              <SectionTitle>Teaching Details</SectionTitle>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>
                  Subjects <span className="normal-case font-normal text-slate-600">({data.subjects.length} selected)</span>
                </label>
                <PillToggle options={ALL_SUBJECTS} selected={data.subjects} onToggle={(v) => toggleArr("subjects", v)} colorMap={SUBJECT_COLORS} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>
                  Student Levels
                </label>
                <PillToggle options={ALL_LEVELS} selected={data.levels} onToggle={(v) => toggleArr("levels", v)} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>
                  Teaching Languages
                </label>
                <PillToggle options={ALL_LANGUAGES} selected={data.languages} onToggle={(v) => toggleArr("languages", v)} />
              </div>

              {/* platform fee note */}
              <div className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background:"rgba(37,99,235,0.07)", border:"1px solid rgba(37,99,235,0.15)" }}>
                <span style={{ color:"#60A5FA", flexShrink:0, marginTop:1 }}><Icon d={ic.info} size={14}/></span>
                <p className="text-xs leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
                  Class5 AI deducts a <strong className="text-white">10% platform fee</strong> per session. Setting a rate of ₦{data.rate ? parseInt(data.rate).toLocaleString() : "—"} means you receive{" "}
                  <strong style={{ color:"#10B981" }}>₦{data.rate ? (parseInt(data.rate) * 0.9).toLocaleString() : "—"}</strong> per session.
                </p>
              </div>

              <div className="flex justify-end">
                <SaveBtn onClick={() => save("teaching")} saved={saved.teaching} />
              </div>
            </Card>
          )}

          {/* ── AVAILABILITY ─────────────────────────── */}
          {editTab === "availability" && (
            <Card className="p-6 space-y-5">
              <SectionTitle>Weekly Availability</SectionTitle>
              <p className="text-xs -mt-2 mb-2" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                Select the times you&apos;re available to teach each week. Students can only book from these slots.
              </p>
              <AvailabilityGrid
                availability={data.availability}
                onChange={(av) => set("availability", av)}
              />
              <div className="flex justify-end pt-2">
                <SaveBtn onClick={() => save("availability")} saved={saved.availability} />
              </div>
            </Card>
          )}

          {/* ── FAQs ─────────────────────────────────── */}
          {editTab === "faq" && (
            <Card className="p-6 space-y-5">
              <SectionTitle>Frequently Asked Questions</SectionTitle>
              <p className="text-xs -mt-2" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                Add answers to questions students commonly ask. This boosts your booking rate by up to 40%.
              </p>

              {/* existing FAQs */}
              <div className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-2xl space-y-2 group"
                    style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-white text-sm font-semibold flex-1" style={{ fontFamily:"var(--font-sora)" }}>{faq.q}</p>
                      <button
                        onClick={() => set("faqs", data.faqs.filter((_,j) => j !== i))}
                        className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100">
                        <Icon d={ic.trash} size={14} />
                      </button>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* add new */}
              <div className="p-4 rounded-2xl space-y-3"
                style={{ background:"rgba(245,158,11,0.04)", border:"1px dashed rgba(245,158,11,0.2)" }}>
                <p className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>Add a New FAQ</p>
                <div className="space-y-2">
                  <input value={faqQ} onChange={(e) => setFaqQ(e.target.value)}
                    placeholder="Question (e.g. Do you provide past questions?)"
                    className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                  <textarea value={faqA} onChange={(e) => setFaqA(e.target.value)} rows={3}
                    placeholder="Your answer…"
                    className={`${inputCls} resize-none`} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <button disabled={!faqQ.trim() || !faqA.trim()}
                  onClick={() => {
                    if (!faqQ.trim() || !faqA.trim()) return;
                    set("faqs", [...data.faqs, { q: faqQ, a: faqA }]);
                    setFaqQ(""); setFaqA("");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                  style={{ background: faqQ&&faqA ? "rgba(245,158,11,0.15)" : "#1E293B", color: faqQ&&faqA ? "#F59E0B" : "#475569", border:`1px solid ${faqQ&&faqA ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.06)"}`, fontFamily:"var(--font-sora)", cursor: faqQ&&faqA ? "pointer" : "not-allowed" }}>
                  <Icon d={ic.plus} size={13}/> Add FAQ
                </button>
              </div>

              <div className="flex justify-end">
                <SaveBtn onClick={() => save("faq")} saved={saved.faq} />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}