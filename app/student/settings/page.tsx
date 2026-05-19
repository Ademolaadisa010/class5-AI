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
  user:      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  bell:      "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  lock:      "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  palette:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20",
  globe:     "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  credit:    "M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM1 10h22",
  logout:    "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  trash:     "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  check:     "M20 6L9 17l-5-5",
  chevron:   "M9 18l6-6-6-6",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeoff:    "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  zap:       "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  mail:      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone:     "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  download:  "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  info:      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  x:         "M18 6L6 18M6 6l12 12",
};

type Section = "account" | "notifications" | "appearance" | "privacy" | "subscription" | "security" | "data";

/* ── reusable components ────────────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-sora)" }}>{title}</h2>
      <p className="text-sm mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{desc}</p>
    </div>
  );
}

function SettingRow({ label, desc, children, danger = false }: {
  label: string; desc?: string; children: React.ReactNode; danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: danger ? "#F87171" : "#F8FAFC", fontFamily: "var(--font-sora)" }}>{label}</p>
        {desc && <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

/* ── toggle switch ──────────────────────────────────────── */
function Toggle({ on, onChange, color = "#2563EB" }: { on: boolean; onChange: () => void; color?: string }) {
  return (
    <button onClick={onChange}
      className="relative inline-flex items-center rounded-full transition-all duration-300 flex-shrink-0"
      style={{ width: 44, height: 24, background: on ? color : "#1E293B", border: `1px solid ${on ? color : "rgba(255,255,255,0.1)"}`, boxShadow: on ? `0 0 12px ${color}55` : "none" }}>
      <span className="inline-block rounded-full bg-white transition-all duration-300"
        style={{ width: 18, height: 18, transform: on ? "translateX(22px)" : "translateX(3px)", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </button>
  );
}

/* ── select dropdown ────────────────────────────────────── */
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-xl text-sm text-white outline-none"
      style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-dm)", minWidth: 140 }}>
      {options.map((o) => <option key={o} value={o} style={{ background: "#1E293B" }}>{o}</option>)}
    </select>
  );
}

/* ── password input ─────────────────────────────────────── */
function PasswordInput({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none pr-10"
        style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.15)"; }}
        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
      <button type="button" onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color: "#475569" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
        <Icon d={show ? ic.eyeoff : ic.eye} size={15} />
      </button>
    </div>
  );
}

/* ── confirm modal ──────────────────────────────────────── */
function ConfirmModal({ title, message, confirmLabel, danger = false, onConfirm, onClose }: {
  title: string; message: string; confirmLabel: string; danger?: boolean; onConfirm: () => void; onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm rounded-3xl p-6 space-y-4"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
        <div className="flex items-start justify-between">
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors ml-4">
            <Icon d={ic.x} size={16} />
          </button>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>{message}</p>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}>
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: danger ? "#EF4444" : "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: danger ? "0 4px 16px rgba(239,68,68,0.35)" : "0 4px 16px rgba(37,99,235,0.35)" }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── saved toast ────────────────────────────────────────── */
function SavedToast({ onDone }: { onDone: () => void }) {
  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl"
      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 8px 32px rgba(16,185,129,0.15)", animation: "slideUp 0.35s ease" }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#10B981", color: "#fff" }}>
        <Icon d={ic.check} size={13} />
      </div>
      <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>Settings saved</p>
      <button onClick={onDone} style={{ color: "#475569" }}><Icon d={ic.x} size={14} /></button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("account");
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState<null | "logout" | "delete" | "deactivate">(null);

  /* account */
  const [name, setName]   = useState("Ada Okonkwo");
  const [email, setEmail] = useState("ada.okonkwo@email.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [level, setLevel] = useState("200 Level");
  const [school, setSchool] = useState("Obafemi Awolowo University");

  /* notifications */
  const [notifs, setNotifs] = useState({
    studyReminders: true, quizResults: true, groupMessages: true, tutorUpdates: true,
    weeklyReport: true, aiSuggestions: false, marketingEmails: false, smsAlerts: false,
  });

  /* appearance */
  const [theme, setTheme]         = useState("Dark");
  const [accentColor, setAccent]  = useState("#2563EB");
  const [fontSize, setFontSize]   = useState("Medium");
  const [compactMode, setCompact] = useState(false);
  const [animations, setAnimations] = useState(true);

  /* privacy */
  const [privacy, setPrivacy] = useState({
    showProfile: true, showStreak: true, showXP: true,
    showGroups: false, allowMessages: true, dataTracking: true,
  });

  /* security */
  const [twoFA, setTwoFA]           = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [currentPw, setCurrentPw]   = useState("");
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");

  /* ai */
  const [aiPrefs, setAiPrefs] = useState({
    saveHistory: true, personaliseResponses: true, suggestTopics: true, autoSummarise: false,
  });
  const [aiLevel, setAiLevel]   = useState("University");
  const [language, setLanguage] = useState("English");

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const toggleNotif = (key: keyof typeof notifs) => setNotifs((p) => ({ ...p, [key]: !p[key] }));
  const togglePrivacy = (key: keyof typeof privacy) => setPrivacy((p) => ({ ...p, [key]: !p[key] }));
  const toggleAI = (key: keyof typeof aiPrefs) => setAiPrefs((p) => ({ ...p, [key]: !p[key] }));

  const ACCENT_COLORS = ["#2563EB","#7C3AED","#10B981","#F59E0B","#EC4899","#06B6D4","#F97316","#EF4444"];

  const NAV_ITEMS: { id: Section; label: string; icon: string; color: string }[] = [
    { id:"account",      label:"Account",       icon: ic.user,    color:"#2563EB" },
    { id:"notifications",label:"Notifications",  icon: ic.bell,    color:"#F59E0B" },
    { id:"appearance",   label:"Appearance",     icon: ic.palette, color:"#7C3AED" },
    { id:"privacy",      label:"Privacy",        icon: ic.shield,  color:"#10B981" },
    { id:"security",     label:"Security",       icon: ic.lock,    color:"#EF4444" },
    { id:"subscription", label:"Subscription",   icon: ic.star,    color:"#F59E0B" },
    { id:"data",         label:"AI & Data",      icon: ic.zap,     color:"#06B6D4" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      {saved && <SavedToast onDone={() => setSaved(false)} />}

      {modal === "logout" && (
        <ConfirmModal title="Log Out" message="Are you sure you want to log out of your Class5 AI account?" confirmLabel="Log Out" onConfirm={() => {}} onClose={() => setModal(null)} />
      )}
      {modal === "deactivate" && (
        <ConfirmModal title="Deactivate Account" message="Your account will be paused. You can reactivate at any time by logging back in." confirmLabel="Deactivate" danger onConfirm={() => {}} onClose={() => setModal(null)} />
      )}
      {modal === "delete" && (
        <ConfirmModal title="Delete Account" message="This will permanently delete your account, all XP, badges, and progress. This action cannot be undone." confirmLabel="Delete Forever" danger onConfirm={() => {}} onClose={() => setModal(null)} />
      )}

      {/* ── side nav ──────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 px-3 py-5 space-y-0.5"
        style={{ background: "#0B1120", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Settings</p>
        {NAV_ITEMS.map((item) => (
          <button key={item.id} onClick={() => setActiveSection(item.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 w-full group"
            style={{
              fontFamily: "var(--font-dm)",
              background: activeSection === item.id ? `${item.color}12` : "transparent",
              color: activeSection === item.id ? "#F8FAFC" : "#475569",
              borderLeft: `2px solid ${activeSection === item.id ? item.color : "transparent"}`,
            }}>
            <span style={{ color: activeSection === item.id ? item.color : "#334155" }}>
              <Icon d={item.icon} size={16} />
            </span>
            {item.label}
          </button>
        ))}

        <div className="pt-4 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setModal("logout")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all"
            style={{ color: "#475569", fontFamily: "var(--font-dm)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#F87171"; e.currentTarget.style.background = "rgba(239,68,68,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "transparent"; }}>
            <Icon d={ic.logout} size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* ── mobile section tabs ──────────────────── */}
      <div className="lg:hidden flex overflow-x-auto px-5 pt-4 pb-2 gap-2" style={{ scrollbarWidth: "none" }}>
        {NAV_ITEMS.map((item) => (
          <button key={item.id} onClick={() => setActiveSection(item.id)}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ fontFamily: "var(--font-sora)", background: activeSection === item.id ? `${item.color}18` : "rgba(30,41,59,0.6)", color: activeSection === item.id ? item.color : "#475569", border: `1px solid ${activeSection === item.id ? `${item.color}30` : "rgba(255,255,255,0.06)"}` }}>
            <Icon d={item.icon} size={13} /> {item.label}
          </button>
        ))}
      </div>

      {/* ── main content ──────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 lg:py-6 max-w-2xl">

        {/* ── ACCOUNT ─────────────────────────────── */}
        {activeSection === "account" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Account Details" desc="Update your personal information and profile." />
              <div className="px-6 py-5 space-y-4">
                {/* avatar */}
                <div className="flex items-center gap-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                      style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>A</div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white"
                      style={{ background: "#2563EB" }}>
                      <Icon d={ic.user} size={12} />
                    </button>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-sora)" }}>Profile Photo</p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>JPG, PNG or GIF · Max 5MB</p>
                    <button className="text-xs font-semibold mt-1.5 transition-colors" style={{ color: "#2563EB", fontFamily: "var(--font-sora)" }}>
                      Upload new photo
                    </button>
                  </div>
                </div>

                {[
                  { label: "Full Name",        val: name,   set: setName,   type: "text",  icon: ic.user },
                  { label: "Email Address",    val: email,  set: setEmail,  type: "email", icon: ic.mail },
                  { label: "Phone Number",     val: phone,  set: setPhone,  type: "tel",   icon: ic.phone },
                  { label: "Institution",      val: school, set: setSchool, type: "text",  icon: ic.globe },
                  { label: "Level / Year",     val: level,  set: setLevel,  type: "text",  icon: ic.info },
                ].map((f) => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>{f.label}</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
                        <Icon d={f.icon} size={15} />
                      </span>
                      <input type={f.type} value={f.val} onChange={(e) => f.set(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all"
                        style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.15)"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
                    </div>
                  </div>
                ))}

                <button onClick={showSaved}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all mt-2"
                  style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 6px 24px rgba(37,99,235,0.35)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(37,99,235,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,99,235,0.35)"; }}>
                  Save Changes
                </button>
              </div>
            </Card>

            {/* danger zone */}
            <Card>
              <SectionHeader title="Danger Zone" desc="Irreversible account actions. Proceed with care." />
              <SettingRow label="Deactivate Account" desc="Temporarily pause your account. You can reactivate anytime.">
                <button onClick={() => setModal("deactivate")}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                  Deactivate
                </button>
              </SettingRow>
              <SettingRow label="Delete Account" desc="Permanently delete all data, XP, and progress. Cannot be undone." danger>
                <button onClick={() => setModal("delete")}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#F87171", fontFamily: "var(--font-sora)" }}>
                  Delete
                </button>
              </SettingRow>
            </Card>
          </div>
        )}

        {/* ── NOTIFICATIONS ───────────────────────── */}
        {activeSection === "notifications" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Notifications" desc="Choose what you want to be notified about." />
              {[
                { key:"studyReminders",    label:"Study Reminders",     desc:"Daily reminders to keep your streak alive" },
                { key:"quizResults",       label:"Quiz Results",         desc:"Get notified when quiz scores are ready" },
                { key:"groupMessages",     label:"Group Messages",       desc:"New messages in your study groups" },
                { key:"tutorUpdates",      label:"Tutor Session Updates",desc:"Booking confirmations and session reminders" },
                { key:"weeklyReport",      label:"Weekly Progress Report",desc:"A summary of your learning each week" },
                { key:"aiSuggestions",     label:"AI Topic Suggestions", desc:"Personalised study topic recommendations" },
              ].map((item) => (
                <SettingRow key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} />
                </SettingRow>
              ))}
            </Card>

            <Card>
              <SectionHeader title="Communication Channels" desc="How you receive notifications." />
              {[
                { key:"marketingEmails", label:"Marketing Emails",  desc:"News, tips and product updates from Class5 AI" },
                { key:"smsAlerts",       label:"SMS Alerts",        desc:"Important alerts sent via text message" },
              ].map((item) => (
                <SettingRow key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} color="#F59E0B" />
                </SettingRow>
              ))}
            </Card>

            <div className="flex justify-end">
              <button onClick={showSaved}
                className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* ── APPEARANCE ──────────────────────────── */}
        {activeSection === "appearance" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Appearance" desc="Customise how Class5 AI looks for you." />

              <SettingRow label="Theme" desc="Choose between light, dark, or system default.">
                <Select value={theme} onChange={setTheme} options={["Dark","Light","System"]} />
              </SettingRow>

              <SettingRow label="Font Size" desc="Adjust text size across the platform.">
                <Select value={fontSize} onChange={setFontSize} options={["Small","Medium","Large"]} />
              </SettingRow>

              <SettingRow label="Compact Mode" desc="Reduce spacing for a denser layout.">
                <Toggle on={compactMode} onChange={() => setCompact(!compactMode)} color="#7C3AED" />
              </SettingRow>

              <SettingRow label="Animations" desc="Enable smooth transitions and effects.">
                <Toggle on={animations} onChange={() => setAnimations(!animations)} />
              </SettingRow>

              {/* accent colour */}
              <div className="px-6 py-4">
                <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>Accent Colour</p>
                <p className="text-xs mb-3" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Choose your highlight colour for buttons, XP bars, and tabs.</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {ACCENT_COLORS.map((c) => (
                    <button key={c} onClick={() => setAccent(c)}
                      className="w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center"
                      style={{ background: c, boxShadow: accentColor === c ? `0 0 0 3px #0F172A, 0 0 0 5px ${c}` : "none", transform: accentColor === c ? "scale(1.15)" : "scale(1)" }}>
                      {accentColor === c && <Icon d={ic.check} size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <button onClick={showSaved}
                className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>
                Save Appearance
              </button>
            </div>
          </div>
        )}

        {/* ── PRIVACY ─────────────────────────────── */}
        {activeSection === "privacy" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Profile Visibility" desc="Control what others can see on your profile." />
              {[
                { key:"showProfile",  label:"Public Profile",      desc:"Allow other students to view your profile" },
                { key:"showStreak",   label:"Show Streak",          desc:"Display your day streak on your profile" },
                { key:"showXP",       label:"Show XP & Level",      desc:"Show your XP total and level on your profile" },
                { key:"showGroups",   label:"Show Study Groups",    desc:"Display groups you belong to" },
                { key:"allowMessages",label:"Allow Direct Messages",desc:"Let other students message you directly" },
              ].map((item) => (
                <SettingRow key={item.key} label={item.label} desc={item.desc}>
                  <Toggle on={privacy[item.key as keyof typeof privacy]} onChange={() => togglePrivacy(item.key as keyof typeof privacy)} color="#10B981" />
                </SettingRow>
              ))}
            </Card>

            <Card>
              <SectionHeader title="Data & Analytics" desc="Manage how your usage data is used." />
              <SettingRow label="Usage Analytics" desc="Help improve Class5 AI by sharing anonymised usage data.">
                <Toggle on={privacy.dataTracking} onChange={() => togglePrivacy("dataTracking")} color="#10B981" />
              </SettingRow>
              <SettingRow label="Download My Data" desc="Get a copy of all your Class5 AI data.">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                  style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60A5FA", fontFamily: "var(--font-sora)" }}>
                  <Icon d={ic.download} size={13} /> Export
                </button>
              </SettingRow>
            </Card>

            <div className="flex justify-end">
              <button onClick={showSaved}
                className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>
                Save Privacy Settings
              </button>
            </div>
          </div>
        )}

        {/* ── SECURITY ────────────────────────────── */}
        {activeSection === "security" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="Change Password" desc="Update your account password." />
              <div className="px-6 py-5 space-y-4">
                {[
                  { label:"Current Password",  val:currentPw,  set:setCurrentPw,  placeholder:"Enter current password" },
                  { label:"New Password",       val:newPw,      set:setNewPw,      placeholder:"Min. 8 characters" },
                  { label:"Confirm Password",   val:confirmPw,  set:setConfirmPw,  placeholder:"Repeat new password" },
                ].map((f) => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>{f.label}</label>
                    <PasswordInput placeholder={f.placeholder} value={f.val} onChange={f.set} />
                  </div>
                ))}
                {newPw.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1,2,3,4].map((s) => {
                        const strength = newPw.length < 4 ? 1 : newPw.length < 8 ? 2 : newPw.length < 12 ? 3 : 4;
                        return (
                          <div key={s} className="flex-1 h-1 rounded-full transition-all"
                            style={{ background: s <= strength ? (strength < 2 ? "#EF4444" : strength < 3 ? "#F59E0B" : "#10B981") : "#1E293B" }} />
                        );
                      })}
                    </div>
                    <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                      {newPw.length < 4 ? "Weak" : newPw.length < 8 ? "Fair" : newPw.length < 12 ? "Good" : "Strong"} password
                    </p>
                  </div>
                )}
                <button onClick={showSaved}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all"
                  style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 6px 24px rgba(37,99,235,0.35)" }}>
                  Update Password
                </button>
              </div>
            </Card>

            <Card>
              <SectionHeader title="Account Security" desc="Additional security settings for your account." />
              <SettingRow label="Two-Factor Authentication" desc="Require a code from your phone when logging in.">
                <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} color="#EF4444" />
              </SettingRow>
              <SettingRow label="Login Alerts" desc="Get an email whenever a new device logs in.">
                <Toggle on={loginAlerts} onChange={() => setLoginAlerts(!loginAlerts)} color="#EF4444" />
              </SettingRow>
              <SettingRow label="Active Sessions" desc="See and manage all devices logged into your account.">
                <button className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", fontFamily: "var(--font-sora)" }}>
                  View Sessions
                </button>
              </SettingRow>
            </Card>
          </div>
        )}

        {/* ── SUBSCRIPTION ────────────────────────── */}
        {activeSection === "subscription" && (
          <div className="space-y-4">
            {/* current plan */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", boxShadow: "0 8px 32px rgba(37,99,235,0.3)" }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-sora)" }}>Current Plan</p>
                    <h3 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>Free Plan</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontFamily: "var(--font-sora)" }}>Active</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label:"AI Summaries", val:"5/month" },
                    { label:"Quiz Questions",val:"10/day"  },
                    { label:"Study Groups",  val:"1 group" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>{s.val}</p>
                      <p className="text-blue-200 text-[10px]" style={{ fontFamily: "var(--font-dm)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* upgrade */}
            <Card>
              <SectionHeader title="Upgrade to Pro" desc="Unlock unlimited access to all Class5 AI features." />
              <div className="px-6 py-5 space-y-3">
                {[
                  "Unlimited AI summaries & explanations",
                  "Unlimited quiz generation",
                  "Priority AI Tutor responses",
                  "Unlimited study groups",
                  "Advanced learning analytics",
                  "20% discount on tutor sessions",
                  "Downloadable study packs",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.15)", color: "#2563EB" }}>
                      <Icon d={ic.check} size={11} />
                    </span>
                    {f}
                  </div>
                ))}
                <div className="pt-3">
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all"
                    style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 6px 24px rgba(37,99,235,0.35)" }}>
                    <Icon d={ic.star} size={16} /> Upgrade to Pro — ₦3,500/month
                  </button>
                  <p className="text-center text-xs mt-2" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                    No credit card required · Cancel anytime
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── AI & DATA ───────────────────────────── */}
        {activeSection === "data" && (
          <div className="space-y-4">
            <Card>
              <SectionHeader title="AI Preferences" desc="Customise how your AI Tutor and tools work for you." />

              <SettingRow label="Save Chat History" desc="Keep a record of all your AI Tutor conversations.">
                <Toggle on={aiPrefs.saveHistory} onChange={() => toggleAI("saveHistory")} color="#06B6D4" />
              </SettingRow>
              <SettingRow label="Personalised Responses" desc="AI adapts explanations based on your level and past questions.">
                <Toggle on={aiPrefs.personaliseResponses} onChange={() => toggleAI("personaliseResponses")} color="#06B6D4" />
              </SettingRow>
              <SettingRow label="Topic Suggestions" desc="AI suggests topics to study based on your activity.">
                <Toggle on={aiPrefs.suggestTopics} onChange={() => toggleAI("suggestTopics")} color="#06B6D4" />
              </SettingRow>
              <SettingRow label="Auto-Summarise Uploads" desc="Automatically generate a summary when you upload a PDF.">
                <Toggle on={aiPrefs.autoSummarise} onChange={() => toggleAI("autoSummarise")} color="#06B6D4" />
              </SettingRow>

              <div className="px-6 py-4 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>Education Level</p>
                  <p className="text-xs mb-2" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>AI calibrates explanations to your academic level.</p>
                  <Select value={aiLevel} onChange={setAiLevel}
                    options={["Primary School","Secondary School","Undergraduate","Postgraduate","Professional"]} />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>Response Language</p>
                  <p className="text-xs mb-2" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Preferred language for AI explanations.</p>
                  <Select value={language} onChange={setLanguage}
                    options={["English","Yoruba","Hausa","Igbo","Pidgin"]} />
                </div>
              </div>
            </Card>

            <Card>
              <SectionHeader title="Data Management" desc="Manage your stored learning data." />
              <SettingRow label="Clear AI Chat History" desc="Delete all saved AI Tutor conversations.">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                  <Icon d={ic.trash} size={13} /> Clear
                </button>
              </SettingRow>
              <SettingRow label="Reset Learning Progress" desc="Clear all XP, badges, streaks, and quiz history.">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", fontFamily: "var(--font-sora)" }}>
                  <Icon d={ic.trash} size={13} /> Reset
                </button>
              </SettingRow>
            </Card>

            <div className="flex justify-end">
              <button onClick={showSaved}
                className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>
                Save AI Settings
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}