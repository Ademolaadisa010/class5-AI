"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  check:    "M20 6L9 17l-5-5",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  back:     "M19 12H5M12 19l-7-7 7-7",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  camera:   "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  upload:   "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  file:     "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6",
  trash:    "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  bank:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  plus:     "M12 5v14M5 12h14",
  x:        "M18 6L6 18M6 6l12 12",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  globe:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
};

/* ── types ──────────────────────────────────────────────── */
interface UploadedFile { name: string; size: string; type: string; }

interface FormData {
  /* step 1 */
  firstName: string; lastName: string; email: string; phone: string;
  title: string; institution: string; yearsExp: string; bio: string;
  /* step 2 */
  subjects: string[]; levels: string[]; rate: string; languages: string[];
  /* step 3 */
  degreeDoc: UploadedFile | null; idDoc: UploadedFile | null;
  licenceDoc: UploadedFile | null; profilePhoto: UploadedFile | null;
  /* step 4 */
  availability: Record<string, string[]>;
  sessionDuration: string; autoAccept: boolean;
  /* step 5 */
  bankName: string; accountNumber: string; accountName: string;
  bvn: string;
}

/* ── constants ──────────────────────────────────────────── */
const SUBJECTS = ["Mathematics","Physics","Chemistry","Biology","English","History",
  "Computer Science","Economics","Geography","Literature","Further Maths","Government","Accounting"];

const LEVELS = ["Primary School","JSS 1-3","SS 1-3","JAMB/UTME","WAEC/NECO","100 Level","200 Level",
  "300 Level","400 Level","Postgraduate","Professional"];

const LANGUAGES = ["English","Yoruba","Hausa","Igbo","Pidgin","French"];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const TIME_SLOTS = ["6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM","9:00 PM"];

const BANKS = ["Access Bank","First Bank","GTBank","Zenith Bank","UBA","Fidelity Bank",
  "FCMB","Sterling Bank","Union Bank","Polaris Bank","Wema Bank","Kuda Bank","Opay","Palmpay"];

const DURATIONS = ["30 minutes","45 minutes","60 minutes","90 minutes","120 minutes"];

const STEPS = [
  { id: 1, title: "Personal Info",    desc: "Tell us about yourself",              icon: ic.user     },
  { id: 2, title: "Teaching Profile", desc: "Subjects, levels & rate",             icon: ic.book     },
  { id: 3, title: "Documents",        desc: "Upload your credentials",             icon: ic.shield   },
  { id: 4, title: "Availability",     desc: "Set your weekly schedule",            icon: ic.calendar },
  { id: 5, title: "Payout Setup",     desc: "Where you want to receive earnings",  icon: ic.bank     },
];

/* ── helpers ────────────────────────────────────────────── */
function fmtBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

/* ── shared UI ──────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5"
      style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", icon, error }: {
  value: string; onChange: (v: string) => void; placeholder: string;
  type?: string; icon?: string; error?: string;
}) {
  return (
    <div>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
            <Icon d={icon} size={15} />
          </span>
        )}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 rounded-xl text-sm text-white outline-none transition-all"
          style={{
            paddingLeft: icon ? "2.75rem" : "1rem", paddingRight: "1rem",
            background: "#1E293B",
            border: `1px solid ${error ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
            fontFamily: "var(--font-dm)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15)"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = error ? "#EF4444" : "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
      </div>
      {error && <p className="text-xs mt-1" style={{ color: "#F87171" }}>{error}</p>}
    </div>
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none transition-all"
      style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15)"; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
  );
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{
        background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)",
        color: value ? "#F8FAFC" : "#475569", fontFamily: "var(--font-dm)",
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15)"; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => <option key={o} value={o} style={{ background: "#1E293B" }}>{o}</option>)}
    </select>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className="relative inline-flex items-center rounded-full transition-all duration-300 flex-shrink-0"
      style={{ width: 44, height: 24, background: on ? "#F59E0B" : "#1E293B", border: `1px solid ${on ? "#F59E0B" : "rgba(255,255,255,0.1)"}`, boxShadow: on ? "0 0 12px rgba(245,158,11,0.4)" : "none" }}>
      <span className="inline-block rounded-full bg-white transition-all duration-300"
        style={{ width: 18, height: 18, transform: on ? "translateX(22px)" : "translateX(3px)", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </button>
  );
}

function PillToggle({ options, value, onChange, color = "#F59E0B", multi = false, selected, onToggle }: {
  options: string[]; value?: string; onChange?: (v: string) => void;
  color?: string; multi?: boolean; selected?: string[]; onToggle?: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = multi ? selected?.includes(opt) : value === opt;
        return (
          <button key={opt} type="button"
            onClick={() => { if (multi && onToggle) onToggle(opt); else if (onChange) onChange(opt); }}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              fontFamily: "var(--font-sora)",
              background: active ? `${color}18` : "rgba(30,41,59,0.6)",
              color: active ? color : "#475569",
              border: `1px solid ${active ? `${color}40` : "rgba(255,255,255,0.06)"}`,
              boxShadow: active ? `0 2px 8px ${color}25` : "none",
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ── file upload zone ───────────────────────────────────── */
function UploadZone({ label, desc, accept, file, onFile, required = false }: {
  label: string; desc: string; accept: string;
  file: UploadedFile | null; onFile: (f: UploadedFile | null) => void; required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => {
    onFile({ name: f.name, size: fmtBytes(f.size), type: f.type });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Label>{label}</Label>
        {required && <span className="text-xs" style={{ color: "#EF4444" }}>*</span>}
      </div>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
            <Icon d={ic.file} size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "var(--font-sora)" }}>{file.name}</p>
            <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{file.size}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>
              <Icon d={ic.check} size={13} /> Uploaded
            </span>
            <button type="button" onClick={() => onFile(null)}
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
              <Icon d={ic.trash} size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl cursor-pointer transition-all duration-200"
          style={{
            background: dragging ? "rgba(245,158,11,0.08)" : "rgba(30,41,59,0.4)",
            border: `2px dashed ${dragging ? "#F59E0B" : "rgba(255,255,255,0.1)"}`,
          }}
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
            <Icon d={ic.upload} size={20} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>
              Click to upload <span style={{ color: "#F59E0B" }}>or drag & drop</span>
            </p>
            <p className="text-xs mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{desc}</p>
          </div>
          <input ref={ref} type="file" accept={accept} className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}
    </div>
  );
}

/* ── step progress bar ──────────────────────────────────── */
function StepBar({ current }: { current: number }) {
  return (
    <div className="hidden lg:flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = current > step.id;
        const active  = current === step.id;
        const isLast  = i === STEPS.length - 1;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 relative">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: done ? "#F59E0B" : active ? "rgba(245,158,11,0.15)" : "#1E293B",
                  border: `2px solid ${done ? "#F59E0B" : active ? "#F59E0B" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: active ? "0 0 20px rgba(245,158,11,0.35)" : done ? "0 0 12px rgba(245,158,11,0.25)" : "none",
                  color: done ? "#0F172A" : active ? "#F59E0B" : "#334155",
                }}>
                {done ? <Icon d={ic.check} size={18} /> : <Icon d={step.icon} size={17} />}
              </div>
              <div className="text-center" style={{ minWidth: 90 }}>
                <p className="text-xs font-bold" style={{ color: active || done ? "#F8FAFC" : "#334155", fontFamily: "var(--font-sora)" }}>{step.title}</p>
                <p className="text-[10px]" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>{step.desc}</p>
              </div>
            </div>
            {!isLast && (
              <div className="flex-1 h-0.5 mx-2 mt-[-22px] transition-all duration-500"
                style={{ background: done ? "linear-gradient(90deg,#F59E0B,#F59E0B)" : "rgba(255,255,255,0.06)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── mobile step indicator ──────────────────────────────── */
function MobileStepBar({ current }: { current: number }) {
  const step = STEPS[current - 1];
  return (
    <div className="lg:hidden mb-6 flex items-center gap-4">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(245,158,11,0.15)", border: "2px solid #F59E0B", color: "#F59E0B", boxShadow: "0 0 16px rgba(245,158,11,0.3)" }}>
        <Icon d={step.icon} size={18} />
      </div>
      <div className="flex-1">
        <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
          Step {current} of {STEPS.length} — {step.title}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          {STEPS.map((s) => (
            <div key={s.id} className="flex-1 h-1 rounded-full transition-all duration-500"
              style={{ background: s.id <= current ? "#F59E0B" : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEPS
═══════════════════════════════════════════════════════════ */

/* STEP 1 — Personal Info */
function Step1({ data, update, errors }: { data: FormData; update: (k: keyof FormData, v: unknown) => void; errors: Record<string, string> }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>Personal Information</h2>
        <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>This is how students and admins will identify you.</p>
      </div>

      {/* photo upload */}
      <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: data.profilePhoto ? "rgba(245,158,11,0.2)" : "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)" }}>
            {data.profilePhoto ? <Icon d={ic.check} size={24} /> : (data.firstName?.[0] || "M")}
          </div>
          <button type="button"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{ background: "#F59E0B" }}>
            <Icon d={ic.camera} size={12} />
          </button>
        </div>
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>Profile Photo</p>
          <p className="text-xs mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>JPG or PNG · Max 5MB · Required</p>
          <button type="button"
            className="text-xs font-semibold mt-1.5 transition-colors"
            style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}
            onClick={() => update("profilePhoto", { name: "profile.jpg", size: "1.2 MB", type: "image/jpeg" })}>
            Upload photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div><Label>First Name *</Label><Input value={data.firstName} onChange={(v) => update("firstName", v)} placeholder="Ada" icon={ic.user} error={errors.firstName} /></div>
        <div><Label>Last Name *</Label><Input value={data.lastName} onChange={(v) => update("lastName", v)} placeholder="Okonkwo" icon={ic.user} error={errors.lastName} /></div>
      </div>

      <div><Label>Email Address *</Label><Input value={data.email} onChange={(v) => update("email", v)} placeholder="you@example.com" type="email" icon={ic.mail} error={errors.email} /></div>
      <div><Label>Phone Number *</Label><Input value={data.phone} onChange={(v) => update("phone", v)} placeholder="+234 800 000 0000" type="tel" icon={ic.phone} error={errors.phone} /></div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Professional Title *</Label>
          <Select value={data.title} onChange={(v) => update("title", v)} placeholder="Select title"
            options={["Mr.","Mrs.","Miss","Dr.","Prof."]} />
        </div>
        <div>
          <Label>Years of Experience *</Label>
          <Select value={data.yearsExp} onChange={(v) => update("yearsExp", v)} placeholder="Select years"
            options={["Less than 1 year","1–2 years","3–5 years","6–10 years","10+ years"]} />
        </div>
      </div>

      <div><Label>Institution / Organisation</Label><Input value={data.institution} onChange={(v) => update("institution", v)} placeholder="e.g. University of Lagos" icon={ic.globe} /></div>

      <div>
        <Label>Professional Bio * <span className="normal-case font-normal text-slate-500">({data.bio.length}/500)</span></Label>
        <Textarea value={data.bio} onChange={(v) => update("bio", v.slice(0,500))}
          placeholder="Tell students about your background, teaching style, and what makes you a great tutor. Be specific and genuine — this is what students read before booking." rows={5} />
        {errors.bio && <p className="text-xs mt-1" style={{ color: "#F87171" }}>{errors.bio}</p>}
      </div>
    </div>
  );
}

/* STEP 2 — Teaching Profile */
function Step2({ data, update, errors }: { data: FormData; update: (k: keyof FormData, v: unknown) => void; errors: Record<string, string> }) {
  const toggleArr = (key: "subjects" | "levels" | "languages", val: string) => {
    const arr = data[key] as string[];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>Teaching Profile</h2>
        <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Define your expertise so students can find you easily.</p>
      </div>

      <div>
        <Label>Subjects You Teach * <span className="normal-case font-normal text-slate-500">(select all that apply)</span></Label>
        <PillToggle options={SUBJECTS} multi selected={data.subjects} onToggle={(v) => toggleArr("subjects", v)} />
        {errors.subjects && <p className="text-xs mt-2" style={{ color: "#F87171" }}>{errors.subjects}</p>}
      </div>

      <div>
        <Label>Student Levels * <span className="normal-case font-normal text-slate-500">(select all that apply)</span></Label>
        <PillToggle options={LEVELS} multi selected={data.levels} onToggle={(v) => toggleArr("levels", v)} />
        {errors.levels && <p className="text-xs mt-2" style={{ color: "#F87171" }}>{errors.levels}</p>}
      </div>

      <div>
        <Label>Languages You Teach In</Label>
        <PillToggle options={LANGUAGES} multi selected={data.languages} onToggle={(v) => toggleArr("languages", v)} />
      </div>

      <div>
        <Label>Session Rate (₦ per hour) *</Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>₦</span>
          <input type="number" value={data.rate} onChange={(e) => update("rate", e.target.value)}
            placeholder="e.g. 3500"
            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
            style={{ background: "#1E293B", border: `1px solid ${errors.rate ? "#EF4444" : "rgba(255,255,255,0.07)"}`, fontFamily: "var(--font-dm)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = errors.rate ? "#EF4444" : "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>
        {errors.rate && <p className="text-xs mt-1" style={{ color: "#F87171" }}>{errors.rate}</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {["1500","2500","3500","5000"].map((v) => (
            <button key={v} type="button" onClick={() => update("rate", v)}
              className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
              style={{ background: data.rate === v ? "rgba(245,158,11,0.15)" : "rgba(30,41,59,0.6)", color: data.rate === v ? "#F59E0B" : "#475569", border: `1px solid ${data.rate === v ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.06)"}`, fontFamily: "var(--font-sora)" }}>
              ₦{v}
            </button>
          ))}
          <span className="text-xs self-center" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>per session</span>
        </div>
      </div>

      {/* rate info */}
      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}>
        <span style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }}><Icon d={ic.info} size={15} /></span>
        <p className="text-xs leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
          Class5 AI takes a <strong className="text-white">10% platform fee</strong> per session. If you charge ₦3,500, you receive ₦3,150 per session. You can update your rate anytime from your dashboard.
        </p>
      </div>
    </div>
  );
}

/* STEP 3 — Documents */
function Step3({ data, update }: { data: FormData; update: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>Upload Your Credentials</h2>
        <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          All documents are reviewed by our admin team and kept strictly confidential. Your profile goes live only after verification.
        </p>
      </div>

      {/* verification notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA" }}>
          <Icon d={ic.shield} size={18} />
        </div>
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>Why we need these documents</p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            We verify every mentor to protect students. Accepted formats: PDF, JPG, PNG. Max 10MB per file. Documents are encrypted and never shared publicly.
          </p>
        </div>
      </div>

      <UploadZone
        label="Degree / Qualification Certificate"
        desc="PDF, JPG or PNG · Max 10MB · Required"
        accept=".pdf,.jpg,.jpeg,.png"
        file={data.degreeDoc}
        onFile={(f) => update("degreeDoc", f)}
        required />

      <UploadZone
        label="Government-Issued ID"
        desc="National ID, Passport, Driver's Licence or Voter Card · Required"
        accept=".pdf,.jpg,.jpeg,.png"
        file={data.idDoc}
        onFile={(f) => update("idDoc", f)}
        required />

      <UploadZone
        label="Teaching Licence or TRCN Certificate"
        desc="If applicable — optional but boosts verification speed"
        accept=".pdf,.jpg,.jpeg,.png"
        file={data.licenceDoc}
        onFile={(f) => update("licenceDoc", f)} />

      <div className="p-4 rounded-xl space-y-2" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
        <p className="text-xs font-bold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>Document Checklist</p>
        {[
          { label: "Degree Certificate", done: !!data.degreeDoc, required: true  },
          { label: "Government ID",       done: !!data.idDoc,     required: true  },
          { label: "Teaching Licence",    done: !!data.licenceDoc, required: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs" style={{ color: item.done ? "#10B981" : item.required ? "#F87171" : "#475569", fontFamily: "var(--font-dm)" }}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0`}
              style={{ background: item.done ? "rgba(16,185,129,0.2)" : item.required ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)", color: item.done ? "#10B981" : item.required ? "#EF4444" : "#334155" }}>
              {item.done ? <Icon d={ic.check} size={10} /> : <span style={{ fontSize: 10 }}>{item.required ? "!" : "?"}</span>}
            </span>
            {item.label} {!item.required && "(optional)"}
          </div>
        ))}
      </div>
    </div>
  );
}

/* STEP 4 — Availability */
function Step4({ data, update }: { data: FormData; update: (k: keyof FormData, v: unknown) => void }) {
  const toggleSlot = (day: string, time: string) => {
    const current = data.availability[day] ?? [];
    const next    = current.includes(time) ? current.filter((t) => t !== time) : [...current, time];
    update("availability", { ...data.availability, [day]: next });
  };

  const totalSlots = Object.values(data.availability).flat().length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>Set Your Availability</h2>
        <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          Students book from your available slots. Select all times you can teach each day.
        </p>
      </div>

      {/* session settings */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Session Duration</Label>
          <Select value={data.sessionDuration} onChange={(v) => update("sessionDuration", v)} options={DURATIONS} />
        </div>
        <div className="flex items-end pb-0.5">
          <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl"
            style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>Auto-Accept</p>
              <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Auto confirm bookings</p>
            </div>
            <Toggle on={data.autoAccept} onChange={() => update("autoAccept", !data.autoAccept)} />
          </div>
        </div>
      </div>

      {/* summary */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
        style={{ background: totalSlots > 0 ? "rgba(16,185,129,0.08)" : "rgba(30,41,59,0.5)", border: `1px solid ${totalSlots > 0 ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)"}` }}>
        <Icon d={ic.clock} size={14} />
        <p className="text-xs font-semibold" style={{ color: totalSlots > 0 ? "#10B981" : "#475569", fontFamily: "var(--font-sora)" }}>
          {totalSlots > 0 ? `${totalSlots} time slot${totalSlots > 1 ? "s" : ""} selected across ${Object.values(data.availability).filter((s) => s.length > 0).length} day${Object.values(data.availability).filter((s) => s.length > 0).length !== 1 ? "s" : ""}` : "No slots selected yet — pick at least 3 slots"}
        </p>
      </div>

      {/* day grid */}
      <div className="space-y-4">
        {DAYS.map((day) => {
          const selected = data.availability[day] ?? [];
          return (
            <div key={day}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>{day}</p>
                {selected.length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                    {selected.length} slot{selected.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TIME_SLOTS.map((time) => {
                  const on = selected.includes(time);
                  return (
                    <button key={time} type="button" onClick={() => toggleSlot(day, time)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
                      style={{
                        fontFamily: "var(--font-sora)",
                        background: on ? "rgba(245,158,11,0.18)" : "rgba(30,41,59,0.5)",
                        color: on ? "#F59E0B" : "#334155",
                        border: `1px solid ${on ? "rgba(245,158,11,0.35)" : "rgba(255,255,255,0.05)"}`,
                      }}>
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* STEP 5 — Payout */
function Step5({ data, update, errors }: { data: FormData; update: (k: keyof FormData, v: unknown) => void; errors: Record<string, string> }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>Payout Setup</h2>
        <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          Add your bank account to receive earnings from sessions. Payouts are processed every Friday.
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
          <Icon d={ic.bank} size={18} />
        </div>
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>Bank Transfer via Paystack</p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            Your earnings are securely transferred to your Nigerian bank account. Minimum payout is ₦1,000. Account details are encrypted.
          </p>
        </div>
      </div>

      <div>
        <Label>Bank Name *</Label>
        <Select value={data.bankName} onChange={(v) => update("bankName", v)} placeholder="Select your bank" options={BANKS} />
        {errors.bankName && <p className="text-xs mt-1" style={{ color: "#F87171" }}>{errors.bankName}</p>}
      </div>

      <div>
        <Label>Account Number *</Label>
        <Input value={data.accountNumber} onChange={(v) => update("accountNumber", v.replace(/\D/g,"").slice(0,10))}
          placeholder="10-digit NUBAN account number" icon={ic.bank} error={errors.accountNumber} />
      </div>

      <div>
        <Label>Account Name *</Label>
        <Input value={data.accountName} onChange={(v) => update("accountName", v)}
          placeholder="As it appears on your bank statement" icon={ic.user} error={errors.accountName} />
        <p className="text-xs mt-1.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
          This must match your bank records exactly for transfers to succeed.
        </p>
      </div>

      <div>
        <Label>BVN (Bank Verification Number)</Label>
        <Input value={data.bvn} onChange={(v) => update("bvn", v.replace(/\D/g,"").slice(0,11))}
          placeholder="11-digit BVN" icon={ic.shield} />
        <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
          Your BVN is used only for identity verification and is never stored in plain text. It is not mandatory but speeds up your first payout.
        </p>
      </div>

      {/* payout schedule */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Platform Fee",  val: "10%",    color: "#EF4444" },
          { label: "Payout Day",    val: "Friday", color: "#10B981" },
          { label: "Min. Payout",   val: "₦1,000", color: "#F59E0B" },
        ].map((s) => (
          <div key={s.label} className="text-center p-3 rounded-xl"
            style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="font-extrabold text-lg" style={{ color: s.color, fontFamily: "var(--font-sora)" }}>{s.val}</p>
            <p className="text-[11px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── done screen ────────────────────────────────────────── */
function DoneScreen() {
  const router = useRouter();
  return (
    <div className="text-center py-8 space-y-6">
      <div className="relative inline-flex">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
          style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.05))", border: "2px solid rgba(245,158,11,0.3)", boxShadow: "0 0 40px rgba(245,158,11,0.2)" }}>
          🎉
        </div>
        <div className="absolute inset-0 rounded-3xl animate-ping opacity-10"
          style={{ background: "#F59E0B" }} />
      </div>

      <div>
        <h2 className="text-white font-extrabold text-2xl mb-2" style={{ fontFamily: "var(--font-sora)" }}>
          Application Submitted!
        </h2>
        <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
          Your mentor profile and documents are under review by our admin team. This usually takes <strong className="text-white">24–48 hours</strong>. You&apos;ll get an email once approved.
        </p>
      </div>

      {/* review timeline */}
      <div className="max-w-sm mx-auto space-y-3 text-left">
        {[
          { icon: ic.check,   color: "#10B981", label: "Application received",            status: "Done"        },
          { icon: ic.shield,  color: "#F59E0B", label: "Document verification",            status: "In Progress" },
          { icon: ic.star,    color: "#334155",  label: "Admin approval",                  status: "Pending"     },
          { icon: ic.globe,   color: "#334155",  label: "Profile goes live on marketplace", status: "Pending"     },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18`, color: s.color }}>
              <Icon d={s.icon} size={15} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>{s.label}</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: s.status === "Done" ? "rgba(16,185,129,0.12)" : s.status === "In Progress" ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.05)",
                color: s.status === "Done" ? "#10B981" : s.status === "In Progress" ? "#F59E0B" : "#334155",
                fontFamily: "var(--font-sora)",
              }}>
              {s.status}
            </span>
          </div>
        ))}
      </div>

      <button onClick={() => router.push("/mentor/pending")}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all"
        style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)", boxShadow: "0 6px 24px rgba(245,158,11,0.35)" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(245,158,11,0.45)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,158,11,0.35)"; }}>
        Go to My Dashboard <Icon d={ic.arrow} size={16} />
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
const INITIAL: FormData = {
  firstName:"", lastName:"", email:"", phone:"",
  title:"", institution:"", yearsExp:"", bio:"",
  subjects:[], levels:[], rate:"", languages:["English"],
  degreeDoc:null, idDoc:null, licenceDoc:null, profilePhoto:null,
  availability:{}, sessionDuration:"60 minutes", autoAccept:true,
  bankName:"", accountNumber:"", accountName:"", bvn:"",
};

export default function MentorOnboarding() {
  const [step, setStep]     = useState(1);
  const [data, setData]     = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]     = useState(false);

  const update = (key: keyof FormData, value: unknown) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key as string]; return n; });
  };

  /* validation per step */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.firstName.trim()) e.firstName = "Required";
      if (!data.lastName.trim())  e.lastName  = "Required";
      if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = "Valid email required";
      if (!data.phone.trim())     e.phone     = "Required";
      if (!data.title)            e.title     = "Required";
      if (!data.yearsExp)         e.yearsExp  = "Required";
      if (!data.bio.trim() || data.bio.length < 50) e.bio = "Please write at least 50 characters";
    }
    if (step === 2) {
      if (data.subjects.length === 0) e.subjects = "Select at least one subject";
      if (data.levels.length === 0)   e.levels   = "Select at least one level";
      if (!data.rate || parseInt(data.rate) < 500) e.rate = "Minimum rate is ₦500";
    }
    if (step === 3) {
      if (!data.degreeDoc) e.degreeDoc = "Degree certificate is required";
      if (!data.idDoc)     e.idDoc     = "Government ID is required";
    }
    if (step === 5) {
      if (!data.bankName)                                   e.bankName      = "Select your bank";
      if (!data.accountNumber || data.accountNumber.length < 10) e.accountNumber = "Enter a valid 10-digit account number";
      if (!data.accountName.trim())                         e.accountName   = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < 5) { setStep((s) => s + 1); window.scrollTo(0, 0); }
    else {
      setSubmitting(true);
      setTimeout(() => { setSubmitting(false); setDone(true); }, 2000);
    }
  };

  const handleBack = () => { setStep((s) => s - 1); setErrors({}); window.scrollTo(0, 0); };

  return (
    <main className="min-h-screen" style={{ background: "#0F172A" }}>

      {/* top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(15,23,42,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)" }}>C5</div>
          <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-sora)" }}>Class5 AI</span>
          <span className="hidden sm:block text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.2)", fontFamily: "var(--font-sora)" }}>
            Mentor Onboarding
          </span>
        </div>
        {!done && (
          <div className="flex items-center gap-2 text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            <span className="hidden sm:inline">Step {step} of {STEPS.length}</span>
            <div className="flex gap-1">
              {STEPS.map((s) => (
                <div key={s.id} className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: s.id <= step ? 20 : 8, background: s.id <= step ? "#F59E0B" : "rgba(255,255,255,0.08)" }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8">
        {!done && <StepBar current={step} />}
        {!done && <MobileStepBar current={step} />}

        <div className="rounded-3xl p-6 sm:p-8"
          style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>

          {done ? <DoneScreen /> : (
            <>
              {step === 1 && <Step1 data={data} update={update} errors={errors} />}
              {step === 2 && <Step2 data={data} update={update} errors={errors} />}
              {step === 3 && <Step3 data={data} update={update} />}
              {step === 4 && <Step4 data={data} update={update} />}
              {step === 5 && <Step5 data={data} update={update} errors={errors} />}

              {/* nav buttons */}
              <div className="flex items-center gap-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {step > 1 && (
                  <button type="button" onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#253347"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#1E293B"; }}>
                    <Icon d={ic.back} size={15} /> Back
                  </button>
                )}

                <button type="button" onClick={handleNext} disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                  style={{
                    background: submitting ? "#1E293B" : "linear-gradient(135deg,#D97706,#F59E0B)",
                    color: submitting ? "#475569" : "#0F172A",
                    fontFamily: "var(--font-sora)",
                    boxShadow: submitting ? "none" : "0 6px 24px rgba(245,158,11,0.4)",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(245,158,11,0.5)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; if (!submitting) e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,158,11,0.4)"; }}>
                  {submitting ? (
                    <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                      style={{ animation: "spin 0.8s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>Submitting…</>
                  ) : step === 5 ? (
                    <><Icon d={ic.shield} size={16} />Submit for Review</>
                  ) : (
                    <>Continue <Icon d={ic.arrow} size={16} /></>
                  )}
                </button>

                {step === 4 && (
                  <button type="button" onClick={() => { setStep(5); window.scrollTo(0, 0); }}
                    className="px-5 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                    Skip for now
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* help text */}
        {!done && (
          <p className="text-center text-xs mt-4" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>
            Need help? Contact us at{" "}
            <a href="mailto:support@class5.ai" style={{ color: "#475569" }}>support@class5.ai</a>
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes ping  { 75%,100%{transform:scale(2);opacity:0} }
        .animate-ping { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </main>
  );
}