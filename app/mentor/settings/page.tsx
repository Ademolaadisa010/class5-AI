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
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  bell:    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  wallet:  "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  calendar:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  lock:    "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  shield:  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  globe:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  bank:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  logout:  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  check:   "M20 6L9 17l-5-5",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeoff:  "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  mail:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:   "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  x:       "M18 6L6 18M6 6l12 12",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  info:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  video:   "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

type Section = "account" | "session" | "payout" | "notifications" | "security" | "privacy";

/* ── shared UI ───────────────────────────────────────────── */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(10px)" }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, desc }: { title:string; desc:string }) {
  return (
    <div className="px-6 py-5" style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
      <h2 className="text-white font-bold text-lg" style={{ fontFamily:"var(--font-sora)" }}>{title}</h2>
      <p className="text-sm mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{desc}</p>
    </div>
  );
}

function Row({ label, desc, children, danger=false }: { label:string; desc?:string; children:React.ReactNode; danger?:boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4"
      style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: danger?"#F87171":"#F8FAFC", fontFamily:"var(--font-sora)" }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on, onChange, color="#F59E0B" }: { on:boolean; onChange:()=>void; color?:string }) {
  return (
    <button onClick={onChange}
      className="relative inline-flex items-center rounded-full transition-all duration-300 flex-shrink-0"
      style={{ width:44, height:24, background:on?color:"#1E293B", border:`1px solid ${on?color:"rgba(255,255,255,0.1)"}`, boxShadow:on?`0 0 12px ${color}55`:"none" }}>
      <span className="inline-block rounded-full bg-white transition-all duration-300"
        style={{ width:18, height:18, transform:on?"translateX(22px)":"translateX(3px)", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }}/>
    </button>
  );
}

function Select({ value, onChange, options }: { value:string; onChange:(v:string)=>void; options:string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-xl text-sm text-white outline-none transition-all"
      style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.1)", fontFamily:"var(--font-dm)", minWidth:150 }}
      onFocus={(e) => { e.currentTarget.style.borderColor="#F59E0B"; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
      {options.map((o) => <option key={o} value={o} style={{ background:"#1E293B" }}>{o}</option>)}
    </select>
  );
}

function Input({ value, onChange, placeholder, type="text", icon }: {
  value:string; onChange:(v:string)=>void; placeholder:string; type?:string; icon?:string;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
          <Icon d={icon} size={15}/>
        </span>
      )}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 rounded-xl text-sm text-white outline-none transition-all"
        style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)", paddingLeft: icon?"2.75rem":"1rem", paddingRight:"1rem" }}
        onFocus={(e) => { e.currentTarget.style.borderColor="#F59E0B"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(245,158,11,0.12)"; }}
        onBlur={(e)  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow="none"; }}/>
    </div>
  );
}

function PasswordInput({ placeholder, value, onChange }: { placeholder:string; value:string; onChange:(v:string)=>void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
        <Icon d={ic.lock} size={15}/>
      </span>
      <input type={show?"text":"password"} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 rounded-xl text-sm text-white outline-none transition-all pr-10"
        style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)", paddingLeft:"2.75rem" }}
        onFocus={(e) => { e.currentTarget.style.borderColor="#F59E0B"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(245,158,11,0.12)"; }}
        onBlur={(e)  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow="none"; }}/>
      <button type="button" onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color:"#475569" }}
        onMouseEnter={(e) => (e.currentTarget.style.color="#94A3B8")}
        onMouseLeave={(e) => (e.currentTarget.style.color="#475569")}>
        <Icon d={show?ic.eyeoff:ic.eye} size={15}/>
      </button>
    </div>
  );
}

function SaveBtn({ onClick, saved }: { onClick:()=>void; saved:boolean }) {
  return (
    <div className="flex justify-end px-6 py-4">
      <button onClick={onClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
        style={{ background: saved?"rgba(16,185,129,0.15)":"linear-gradient(135deg,#D97706,#F59E0B)", color: saved?"#10B981":"#0F172A", fontFamily:"var(--font-sora)", boxShadow: saved?"none":"0 4px 16px rgba(245,158,11,0.3)" }}>
        {saved ? <><Icon d={ic.check} size={15}/>Saved!</> : "Save Changes"}
      </button>
    </div>
  );
}

/* ── confirm modal ───────────────────────────────────────── */
function ConfirmModal({ title, message, confirmLabel, danger=false, onConfirm, onClose }: {
  title:string; message:string; confirmLabel:string; danger?:boolean; onConfirm:()=>void; onClose:()=>void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)" }}
      onClick={(e) => e.target===e.currentTarget && onClose()}>
      <div className="w-full max-w-sm rounded-3xl p-6 space-y-4"
        style={{ background:"#0F172A", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 32px 80px rgba(0,0,0,0.6)" }}>
        <div className="flex items-start justify-between">
          <h3 className="text-white font-bold" style={{ fontFamily:"var(--font-sora)" }}>{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors ml-4">
            <Icon d={ic.x} size={16}/>
          </button>
        </div>
        <p className="text-sm leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>{message}</p>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-sora)" }}>
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: danger?"#EF4444":"linear-gradient(135deg,#D97706,#F59E0B)", color: danger?"#fff":"#0F172A", fontFamily:"var(--font-sora)", boxShadow: danger?"0 4px 16px rgba(239,68,68,0.35)":"0 4px 16px rgba(245,158,11,0.35)" }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── saved toast ─────────────────────────────────────────── */
function SavedToast({ onDone }: { onDone:()=>void }) {
  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{ background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.25)", boxShadow:"0 8px 32px rgba(16,185,129,0.15)", animation:"slideUp 0.35s ease" }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background:"#10B981", color:"#fff" }}>
        <Icon d={ic.check} size={13}/>
      </div>
      <p className="text-sm font-semibold text-white" style={{ fontFamily:"var(--font-sora)" }}>Settings saved</p>
      <button onClick={onDone} style={{ color:"#475569" }}><Icon d={ic.x} size={14}/></button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function MentorSettingsPage() {
  const [active, setActive]   = useState<Section>("account");
  const [saved, setSaved]     = useState(false);
  const [modal, setModal]     = useState<null|"logout"|"deactivate"|"delete">(null);

  /* account */
  const [name,   setName]   = useState("Ada Okonkwo");
  const [email,  setEmail]  = useState("ada.okonkwo@email.com");
  const [phone,  setPhone]  = useState("+234 801 234 5678");

  /* session prefs */
  const [autoAccept,   setAutoAccept]   = useState(true);
  const [duration,     setDuration]     = useState("60 minutes");
  const [cancelPolicy, setCancelPolicy] = useState("24 hours");
  const [maxPerDay,    setMaxPerDay]    = useState("4");
  const [bufferTime,   setBufferTime]   = useState("15 minutes");
  const [videoTool,    setVideoTool]    = useState("Class5 AI Built-in");

  /* payout */
  const [bankName,   setBankName]   = useState("GTBank");
  const [accNumber,  setAccNumber]  = useState("0123456789");
  const [accName,    setAccName]    = useState("Ada Okonkwo");
  const [bvn,        setBvn]        = useState("");

  /* notifications */
  const [notifs, setNotifs] = useState({
    newBooking:      true,
    sessionReminder: true,
    cancellation:    true,
    studentMessage:  true,
    payoutReceived:  true,
    weeklyReport:    true,
    platformUpdates: false,
    smsAlerts:       false,
  });

  /* security */
  const [twoFA,       setTwoFA]       = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [currentPw,   setCurrentPw]   = useState("");
  const [newPw,       setNewPw]       = useState("");
  const [confirmPw,   setConfirmPw]   = useState("");

  /* privacy */
  const [privacy, setPrivacy] = useState({
    showRating:    true,
    showReviews:   true,
    showStudents:  true,
    showEarnings:  false,
    indexProfile:  true,
  });

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };
  const toggleNotif = (k: keyof typeof notifs) => setNotifs((p) => ({ ...p, [k]: !p[k] }));
  const togglePrivacy = (k: keyof typeof privacy) => setPrivacy((p) => ({ ...p, [k]: !p[k] }));

  const BANKS = ["Access Bank","First Bank","GTBank","Zenith Bank","UBA","Fidelity Bank","FCMB","Sterling Bank","Union Bank","Kuda Bank","Opay","Palmpay"];

  const NAV: { id:Section; label:string; icon:string; color:string }[] = [
    { id:"account",       label:"Account",        icon:ic.user,     color:"#F59E0B" },
    { id:"session",       label:"Session Prefs",  icon:ic.video,    color:"#2563EB" },
    { id:"payout",        label:"Payout",         icon:ic.wallet,   color:"#10B981" },
    { id:"notifications", label:"Notifications",  icon:ic.bell,     color:"#F59E0B" },
    { id:"security",      label:"Security",       icon:ic.lock,     color:"#EF4444" },
    { id:"privacy",       label:"Privacy",        icon:ic.shield,   color:"#10B981" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      {saved && <SavedToast onDone={() => setSaved(false)} />}

      {modal === "logout"     && <ConfirmModal title="Log Out" message="Are you sure you want to log out of your mentor account?" confirmLabel="Log Out" onConfirm={() => {}} onClose={() => setModal(null)} />}
      {modal === "deactivate" && <ConfirmModal title="Deactivate Account" message="Your listing will be hidden from students. You can reactivate anytime." confirmLabel="Deactivate" danger onConfirm={() => {}} onClose={() => setModal(null)} />}
      {modal === "delete"     && <ConfirmModal title="Delete Account" message="This permanently deletes your profile, all session history, earnings records, and reviews. This cannot be undone." confirmLabel="Delete Forever" danger onConfirm={() => {}} onClose={() => setModal(null)} />}

      {/* ── side nav (desktop) ───────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 px-3 py-5 space-y-0.5"
        style={{ background:"#0B1120", borderRight:"1px solid rgba(255,255,255,0.05)" }}>
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest"
          style={{ color:"#334155", fontFamily:"var(--font-sora)" }}>Settings</p>
        {NAV.map((item) => (
          <button key={item.id} onClick={() => setActive(item.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full transition-all duration-200"
            style={{ fontFamily:"var(--font-dm)", background: active===item.id?`${item.color}12`:"transparent", color: active===item.id?"#F8FAFC":"#475569", borderLeft:`2px solid ${active===item.id?item.color:"transparent"}` }}>
            <span style={{ color: active===item.id?item.color:"#334155" }}><Icon d={item.icon} size={16}/></span>
            {item.label}
          </button>
        ))}
        <div className="pt-4 mt-4" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setModal("logout")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all"
            style={{ color:"#475569", fontFamily:"var(--font-dm)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color="#F87171"; e.currentTarget.style.background="rgba(239,68,68,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color="#475569"; e.currentTarget.style.background="transparent"; }}>
            <Icon d={ic.logout} size={16}/> Log Out
          </button>
        </div>
      </aside>

      {/* mobile section tabs */}
      <div className="lg:hidden flex overflow-x-auto px-5 pt-4 pb-2 gap-2" style={{ scrollbarWidth:"none" }}>
        {NAV.map((item) => (
          <button key={item.id} onClick={() => setActive(item.id)}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ fontFamily:"var(--font-sora)", background: active===item.id?`${item.color}18`:"rgba(30,41,59,0.6)", color: active===item.id?item.color:"#475569", border:`1px solid ${active===item.id?`${item.color}30`:"rgba(255,255,255,0.06)"}` }}>
            <Icon d={item.icon} size={13}/> {item.label}
          </button>
        ))}
      </div>

      {/* ── main content ─────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 lg:py-6 max-w-2xl">

        {/* ACCOUNT */}
        {active === "account" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Account Details" desc="Your personal information and contact details." />
              <div className="px-6 py-5 space-y-4">
                {/* avatar */}
                <div className="flex items-center gap-4 pb-4" style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                      style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", fontFamily:"var(--font-sora)" }}>A</div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white"
                      style={{ background:"#F59E0B", color:"#0F172A" }}>
                      <Icon d={ic.user} size={12}/>
                    </button>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily:"var(--font-sora)" }}>Profile Photo</p>
                    <p className="text-xs mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>JPG or PNG · Max 5MB</p>
                    <button className="text-xs font-semibold mt-1.5 transition-colors" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
                      Upload new photo
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Full Name</label>
                  <Input value={name} onChange={setName} placeholder="Your full name" icon={ic.user} />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Email Address</label>
                  <Input value={email} onChange={setEmail} placeholder="you@email.com" type="email" icon={ic.mail} />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Phone Number</label>
                  <Input value={phone} onChange={setPhone} placeholder="+234 800 000 0000" type="tel" icon={ic.phone} />
                </div>

                <button onClick={showSaved}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all mt-2"
                  style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 6px 24px rgba(245,158,11,0.35)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(245,158,11,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(245,158,11,0.35)"; }}>
                  Save Account Details
                </button>
              </div>
            </Card>

            <Card>
              <SectionHeader title="Danger Zone" desc="Irreversible actions — proceed with care." />
              <Row label="Deactivate Account" desc="Hide your listing from students. Reactivate anytime.">
                <button onClick={() => setModal("deactivate")}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
                  Deactivate
                </button>
              </Row>
              <Row label="Delete Account" desc="Permanently delete profile, sessions, earnings and reviews." danger>
                <button onClick={() => setModal("delete")}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#F87171", fontFamily:"var(--font-sora)" }}>
                  Delete
                </button>
              </Row>
            </Card>
          </div>
        )}

        {/* SESSION PREFERENCES */}
        {active === "session" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Session Preferences" desc="Control how students book and experience sessions with you." />
              <Row label="Auto-Accept Bookings" desc="Automatically confirm new booking requests without manual approval.">
                <Toggle on={autoAccept} onChange={() => setAutoAccept(!autoAccept)} />
              </Row>
              <Row label="Default Session Duration">
                <Select value={duration} onChange={setDuration}
                  options={["30 minutes","45 minutes","60 minutes","90 minutes","120 minutes"]} />
              </Row>
              <Row label="Buffer Time Between Sessions" desc="Minimum break required between back-to-back sessions.">
                <Select value={bufferTime} onChange={setBufferTime}
                  options={["No buffer","10 minutes","15 minutes","30 minutes","60 minutes"]} />
              </Row>
              <Row label="Max Sessions Per Day" desc="Limit how many sessions you can have in a single day.">
                <Select value={maxPerDay} onChange={setMaxPerDay}
                  options={["1","2","3","4","5","6","Unlimited"]} />
              </Row>
              <Row label="Cancellation Policy" desc="How much notice a student must give to cancel without penalty.">
                <Select value={cancelPolicy} onChange={setCancelPolicy}
                  options={["No policy","6 hours","12 hours","24 hours","48 hours"]} />
              </Row>
              <Row label="Video Call Tool" desc="Platform used for live sessions.">
                <Select value={videoTool} onChange={setVideoTool}
                  options={["Class5 AI Built-in","Google Meet","Zoom","Microsoft Teams"]} />
              </Row>
              <SaveBtn onClick={showSaved} saved={saved} />
            </Card>

            {/* info notice */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-2xl"
              style={{ background:"rgba(37,99,235,0.06)", border:"1px solid rgba(37,99,235,0.12)" }}>
              <span style={{ color:"#60A5FA", flexShrink:0, marginTop:1 }}><Icon d={ic.info} size={14}/></span>
              <p className="text-xs leading-relaxed" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                Students are notified of your cancellation policy before booking. Changes to these settings take effect for new bookings only — existing sessions are not affected.
              </p>
            </div>
          </div>
        )}

        {/* PAYOUT */}
        {active === "payout" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Payout Settings" desc="Manage where your earnings are sent every Friday." />
              <div className="px-6 py-5 space-y-4">
                {/* current account display */}
                <div className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{ background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:"rgba(245,158,11,0.15)", color:"#F59E0B" }}>
                    <Icon d={ic.bank} size={18}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold" style={{ fontFamily:"var(--font-sora)" }}>GTBank ••••4821</p>
                    <p className="text-xs" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>Ada Okonkwo · Primary Account</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background:"rgba(16,185,129,0.12)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
                    Active
                  </span>
                </div>

                {/* edit fields */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Bank Name</label>
                  <select value={bankName} onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                    style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor="#F59E0B"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
                    {BANKS.map((b) => <option key={b} style={{ background:"#1E293B" }}>{b}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Account Number</label>
                  <Input value={accNumber} onChange={(v) => setAccNumber(v.replace(/\D/g,"").slice(0,10))}
                    placeholder="10-digit NUBAN" icon={ic.bank} />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>Account Name</label>
                  <Input value={accName} onChange={setAccName} placeholder="As on bank statement" icon={ic.user} />
                  <p className="text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>Must match your bank records exactly.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>BVN (optional)</label>
                  <Input value={bvn} onChange={(v) => setBvn(v.replace(/\D/g,"").slice(0,11))}
                    placeholder="11-digit BVN" icon={ic.shield} />
                  <p className="text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>Used for identity verification only. Encrypted and never stored in plain text.</p>
                </div>

                <button onClick={showSaved}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 6px 24px rgba(245,158,11,0.35)" }}>
                  Update Payout Account
                </button>
              </div>
            </Card>

            <Card>
              <SectionHeader title="Payout Schedule" desc="How and when your earnings are transferred." />
              <Row label="Payout Day" desc="Earnings are automatically sent every Friday.">
                <span className="text-sm font-bold" style={{ color:"#10B981", fontFamily:"var(--font-sora)" }}>Every Friday</span>
              </Row>
              <Row label="Platform Fee" desc="Class5 AI deducts this from each session before payout.">
                <span className="text-sm font-bold" style={{ color:"#F87171", fontFamily:"var(--font-sora)" }}>10%</span>
              </Row>
              <Row label="Minimum Payout" desc="Earnings below this amount roll over to the next week.">
                <span className="text-sm font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>₦1,000</span>
              </Row>
              <Row label="Download Tax Report" desc="Export your annual earnings for tax purposes.">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background:"rgba(37,99,235,0.1)", border:"1px solid rgba(37,99,235,0.2)", color:"#60A5FA", fontFamily:"var(--font-sora)" }}>
                  <Icon d={ic.download} size={13}/> Export
                </button>
              </Row>
            </Card>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {active === "notifications" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Session Notifications" desc="Alerts related to your bookings and sessions." />
              {[
                { key:"newBooking",      label:"New Booking",         desc:"When a student books a session with you"         },
                { key:"sessionReminder", label:"Session Reminder",    desc:"30-minute reminder before each session starts"  },
                { key:"cancellation",   label:"Cancellation Alert",  desc:"When a student cancels a booked session"         },
                { key:"studentMessage", label:"Student Messages",    desc:"New messages from students in your inbox"        },
              ].map((item) => (
                <Row key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} />
                </Row>
              ))}
            </Card>

            <Card>
              <SectionHeader title="Financial Notifications" desc="Updates about your earnings and payouts." />
              {[
                { key:"payoutReceived",  label:"Payout Received",     desc:"When a weekly payout is sent to your bank"      },
                { key:"weeklyReport",   label:"Weekly Earnings Report",desc:"A summary of your earnings every Monday"       },
              ].map((item) => (
                <Row key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} />
                </Row>
              ))}
            </Card>

            <Card>
              <SectionHeader title="Platform Updates" desc="News and updates from Class5 AI." />
              {[
                { key:"platformUpdates", label:"Platform Updates",   desc:"New features, announcements, and platform news" },
                { key:"smsAlerts",       label:"SMS Alerts",         desc:"Critical alerts via text message"               },
              ].map((item) => (
                <Row key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} color="#F59E0B" />
                </Row>
              ))}
            </Card>

            <div className="flex justify-end">
              <button onClick={showSaved}
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 4px 16px rgba(245,158,11,0.3)" }}>
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* SECURITY */}
        {active === "security" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Change Password" desc="Update your login password." />
              <div className="px-6 py-5 space-y-4">
                {[
                  { label:"Current Password", val:currentPw, set:setCurrentPw, placeholder:"Enter current password"   },
                  { label:"New Password",      val:newPw,      set:setNewPw,     placeholder:"Min. 8 characters"       },
                  { label:"Confirm Password",  val:confirmPw,  set:setConfirmPw, placeholder:"Repeat new password"     },
                ].map((f) => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-widest" style={{ color:"#475569", fontFamily:"var(--font-sora)" }}>{f.label}</label>
                    <PasswordInput placeholder={f.placeholder} value={f.val} onChange={f.set} />
                  </div>
                ))}

                {newPw.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1,2,3,4].map((s) => {
                        const strength = newPw.length<4?1:newPw.length<8?2:newPw.length<12?3:4;
                        return <div key={s} className="flex-1 h-1 rounded-full transition-all" style={{ background: s<=strength?(strength<2?"#EF4444":strength<3?"#F59E0B":"#10B981"):"#1E293B" }}/>;
                      })}
                    </div>
                    <p className="text-xs" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                      {newPw.length<4?"Weak":newPw.length<8?"Fair":newPw.length<12?"Good":"Strong"} password
                    </p>
                  </div>
                )}

                <button onClick={showSaved}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 6px 24px rgba(245,158,11,0.35)" }}>
                  Update Password
                </button>
              </div>
            </Card>

            <Card>
              <SectionHeader title="Account Security" desc="Additional security measures for your account." />
              <Row label="Two-Factor Authentication" desc="Require a code from your phone at login.">
                <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} color="#EF4444" />
              </Row>
              <Row label="Login Alerts" desc="Get an email whenever a new device logs in.">
                <Toggle on={loginAlerts} onChange={() => setLoginAlerts(!loginAlerts)} color="#EF4444" />
              </Row>
              <Row label="Active Sessions" desc="View and manage all devices logged into your account.">
                <button className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", color:"#F87171", fontFamily:"var(--font-sora)" }}>
                  View Sessions
                </button>
              </Row>
            </Card>
          </div>
        )}

        {/* PRIVACY */}
        {active === "privacy" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Public Profile Visibility" desc="Control what students and other users can see on your listing." />
              {[
                { key:"showRating",   label:"Show Rating & Reviews",  desc:"Display your star rating and student reviews publicly"      },
                { key:"showReviews",  label:"Show Review Count",       desc:"Show the number of reviews on your marketplace card"        },
                { key:"showStudents", label:"Show Student Count",      desc:"Display how many students you have tutored"                  },
                { key:"showEarnings", label:"Show Earnings Badge",     desc:"Show an earnings milestone badge on your public profile"     },
                { key:"indexProfile", label:"Appear in Search Results",desc:"Allow your profile to appear in Class5 AI marketplace search"},
              ].map((item) => (
                <Row key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={privacy[item.key as keyof typeof privacy]} onChange={() => togglePrivacy(item.key as keyof typeof privacy)} color="#10B981" />
                </Row>
              ))}
            </Card>

            <Card>
              <SectionHeader title="Data Management" desc="Manage your data on the Class5 AI platform." />
              <Row label="Download My Data" desc="Export a copy of all your Class5 AI account data.">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background:"rgba(37,99,235,0.1)", border:"1px solid rgba(37,99,235,0.2)", color:"#60A5FA", fontFamily:"var(--font-sora)" }}>
                  <Icon d={ic.download} size={13}/> Export
                </button>
              </Row>
            </Card>

            <div className="flex justify-end">
              <button onClick={showSaved}
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 4px 16px rgba(245,158,11,0.3)" }}>
                Save Privacy Settings
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}