"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // ← adjust path if needed

/* ── icon helper ─────────────────────────────────────── */
function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const ic = {
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeoff:   "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  check:    "M20 6L9 17l-5-5",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  award:    "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  briefcase:"M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0-2 2v2",
};

type Role = "student" | "mentor";

const roleCfg = {
  student: {
    label:   "Student",
    emoji:   "🎓",
    color:   "#2563EB",
    accent:  "#7C3AED",
    grad:    "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
    glow:    "rgba(37,99,235,0.35)",
    panelBg: "linear-gradient(160deg, #0F172A 0%, #1E1B4B 55%, #0F172A 100%)",
    perks: [
      { icon: ic.book,  text: "Unlimited AI summaries & quizzes" },
      { icon: ic.star,  text: "Personalised learning dashboard" },
      { icon: ic.award, text: "Track streaks and earn XP" },
    ],
    levels: ["Primary School","Secondary School","Undergraduate","Postgraduate","Other"],
  },
  mentor: {
    label:   "Mentor",
    emoji:   "🏫",
    color:   "#F59E0B",
    accent:  "#D97706",
    grad:    "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%)",
    glow:    "rgba(245,158,11,0.35)",
    panelBg: "linear-gradient(160deg, #0F172A 0%, #1C1507 55%, #0F172A 100%)",
    perks: [
      { icon: ic.briefcase, text: "List your services & set your rates" },
      { icon: ic.star,      text: "Build reputation with reviews" },
      { icon: ic.award,     text: "Dashboard to manage all sessions" },
    ],
    subjects: ["Mathematics","Physics","Chemistry","Biology","English","History","Computer Science","Economics","Geography","Other"],
  },
};

/* ── Step indicator ──────────────────────────────────── */
function Steps({ current, total, color }: { current: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
            style={{
              fontFamily: "var(--font-sora)",
              background: i < current ? color : i === current ? `${color}22` : "#1E293B",
              border: `1.5px solid ${i <= current ? color : "rgba(255,255,255,0.07)"}`,
              color: i < current ? "#fff" : i === current ? color : "#334155",
            }}>
            {i < current ? <Icon d={ic.check} size={12} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className="w-8 h-px transition-all duration-500"
              style={{ background: i < current ? color : "#1E293B" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Input wrapper ───────────────────────────────────── */
function Field({
  label, error, icon, children,
}: {
  label: string; error?: string; icon: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest"
        style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
          <Icon d={icon} size={16} />
        </span>
        {children}
      </div>
      {error && <p className="text-xs" style={{ color: "#F87171" }}>{error}</p>}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const cfg = roleCfg[role];

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    password: "", confirm: "",
    level: "",
    subject: "",
    experience: "",
    bio: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const inputStyle = (err?: string) => ({
    background: "#1E293B",
    border: `1px solid ${err ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
    fontFamily: "var(--font-dm)",
    paddingLeft: "2.75rem",
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    color: "#F8FAFC",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  } as React.CSSProperties);

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = cfg.color;
    e.currentTarget.style.boxShadow = `0 0 0 3px ${cfg.color}22`;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
    e.currentTarget.style.boxShadow = "none";
  };

  const validate1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (role === "student" && !form.level)      e.level      = "Pick your level";
    if (role === "mentor"  && !form.subject)    e.subject    = "Pick a subject";
    if (role === "mentor"  && !form.experience) e.experience = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate2 = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim())                     e.email    = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email    = "Enter a valid email";
    if (!form.password)                         e.password = "Required";
    else if (form.password.length < 8)          e.password = "At least 8 characters";
    if (form.password !== form.confirm)         e.confirm  = "Passwords do not match";
    if (!form.agree)                            e.agree    = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate1()) { setErrors({}); setStep(2); } };
  const handleBack = () => { setErrors({}); setStep(1); };

  /* ── Firebase: email/password signup ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate2()) return;
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

      await updateProfile(user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        role,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || null,
        ...(role === "student"
          ? { level: form.level }
          : {
              subject: form.subject,
              experience: form.experience,
              bio: form.bio || null,
            }),
        createdAt: serverTimestamp(),
      });

      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered. Try logging in." });
        setStep(2);
      } else if (code === "auth/weak-password") {
        setErrors({ password: "Password is too weak." });
      } else {
        setErrors({ email: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Firebase: Google signup ── */
  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          role,
          firstName: user.displayName?.split(" ")[0] ?? "",
          lastName: user.displayName?.split(" ").slice(1).join(" ") ?? "",
          email: user.email,
          phone: user.phoneNumber || null,
          ...(role === "student"
            ? { level: form.level || null }
            : {
                subject: form.subject || null,
                experience: form.experience || null,
                bio: form.bio || null,
              }),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      setForm((f) => ({
        ...f,
        firstName: user.displayName?.split(" ")[0] ?? f.firstName,
      }));

      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code !== "auth/popup-closed-by-user") {
        setErrors({ email: "Google sign-in failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 0: role selection ──────────────────────────── */
  const RolePicker = () => (
    <div className="space-y-6 animate-fadeUp">
      <div>
        <h1 className="text-white font-extrabold mb-1"
          style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(1.6rem,3vw,2rem)" }}>
          Create your account
        </h1>
        <p className="text-sm" style={{ color: "#475569" }}>
          Tell us who you are — we&apos;ll personalise your experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {(["student","mentor"] as Role[]).map((r) => {
          const c = roleCfg[r];
          const active = role === r;
          return (
            <button key={r} onClick={() => setRole(r)}
              className="relative flex flex-col items-center gap-3 p-6 rounded-2xl text-center transition-all duration-300"
              style={{
                background: active ? `${c.color}14` : "#1E293B",
                border: `1.5px solid ${active ? c.color : "rgba(255,255,255,0.07)"}`,
                boxShadow: active ? `0 6px 24px ${c.glow}` : "none",
                transform: active ? "scale(1.02)" : "scale(1)",
              }}>
              {active && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: c.color }}>
                  <Icon d={ic.check} size={10} />
                </div>
              )}
              <span className="text-4xl">{c.emoji}</span>
              <div>
                <p className="font-bold text-white text-base" style={{ fontFamily: "var(--font-sora)" }}>{c.label}</p>
                <p className="text-xs mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                  {r === "student" ? "I want to learn" : "I want to teach"}
                </p>
              </div>
              <ul className="text-left w-full space-y-2 mt-1">
                {c.perks.map((p) => (
                  <li key={p.text} className="flex items-start gap-2 text-xs"
                    style={{ color: active ? "#94A3B8" : "#334155", fontFamily: "var(--font-dm)" }}>
                    <span style={{ color: active ? c.color : "#334155", marginTop: 1 }}>
                      <Icon d={p.icon} size={11} />
                    </span>
                    {p.text}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <button onClick={() => setStep(1)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300"
        style={{
          background: cfg.grad,
          fontFamily: "var(--font-sora)",
          boxShadow: `0 6px 24px ${cfg.glow}`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${cfg.glow}`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 24px ${cfg.glow}`; }}>
        Continue as {cfg.label} {cfg.emoji} <Icon d={ic.arrow} size={16} />
      </button>

      <p className="text-sm text-center" style={{ color: "#475569" }}>
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:text-white transition-colors"
          style={{ color: cfg.color, fontFamily: "var(--font-sora)" }}>
          Log in
        </Link>
      </p>
    </div>
  );

  /* ── Step 1: personal info ───────────────────────────── */
  const PersonalInfo = () => (
    <div className="space-y-5 animate-fadeUp">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-extrabold text-xl" style={{ fontFamily: "var(--font-sora)" }}>
            Personal Details
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#475569" }}>Tell us a bit about yourself</p>
        </div>
        <Steps current={1} total={2} color={cfg.color} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(["firstName","lastName"] as const).map((k) => (
          <Field key={k} label={k === "firstName" ? "First Name" : "Last Name"} error={errors[k]} icon={ic.user}>
            <input value={form[k]} onChange={(e) => set(k, e.target.value)}
              placeholder={k === "firstName" ? "Ada" : "Obi"}
              style={inputStyle(errors[k])} onFocus={onFocus} onBlur={onBlur} />
          </Field>
        ))}
      </div>

      <Field label="Phone (optional)" icon={ic.phone}>
        <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
          placeholder="+234 800 000 0000"
          style={{ ...inputStyle(), paddingLeft: "2.75rem" }} onFocus={onFocus} onBlur={onBlur} />
      </Field>

      {role === "student" && (
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
            Education Level
          </label>
          <select value={form.level} onChange={(e) => set("level", e.target.value)}
            className="w-full py-3 px-4 rounded-xl text-sm outline-none"
            style={{
              background: "#1E293B",
              border: `1px solid ${errors.level ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
              color: form.level ? "#F8FAFC" : "#475569",
              fontFamily: "var(--font-dm)",
            }}
            onFocus={onFocus} onBlur={onBlur}>
            <option value="" disabled>Select your level</option>
            {roleCfg.student.levels.map((l) => (
              <option key={l} value={l} style={{ background: "#1E293B" }}>{l}</option>
            ))}
          </select>
          {errors.level && <p className="text-xs" style={{ color: "#F87171" }}>{errors.level}</p>}
        </div>
      )}

      {role === "mentor" && (
        <>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
              Primary Subject
            </label>
            <select value={form.subject} onChange={(e) => set("subject", e.target.value)}
              className="w-full py-3 px-4 rounded-xl text-sm outline-none"
              style={{
                background: "#1E293B",
                border: `1px solid ${errors.subject ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
                color: form.subject ? "#F8FAFC" : "#475569",
                fontFamily: "var(--font-dm)",
              }}
              onFocus={onFocus} onBlur={onBlur}>
              <option value="" disabled>Select a subject</option>
              {roleCfg.mentor.subjects.map((s) => (
                <option key={s} value={s} style={{ background: "#1E293B" }}>{s}</option>
              ))}
            </select>
            {errors.subject && <p className="text-xs" style={{ color: "#F87171" }}>{errors.subject}</p>}
          </div>

          <Field label="Years of Experience" error={errors.experience} icon={ic.briefcase}>
            <input value={form.experience} onChange={(e) => set("experience", e.target.value)}
              placeholder="e.g. 3 years"
              style={inputStyle(errors.experience)} onFocus={onFocus} onBlur={onBlur} />
          </Field>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
              Short Bio (optional)
            </label>
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)}
              rows={3} placeholder="Tell students about your teaching style and experience…"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{
                background: "#1E293B",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#CBD5E1",
                fontFamily: "var(--font-dm)",
              }}
              onFocus={onFocus} onBlur={onBlur} />
          </div>
        </>
      )}

      <div className="flex gap-3 pt-1">
        <button onClick={() => { setErrors({}); setStep(0); }}
          className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: "#1E293B",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#94A3B8",
            fontFamily: "var(--font-sora)",
          }}>
          Back
        </button>
        <button onClick={handleNext}
          className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300"
          style={{
            background: cfg.grad,
            fontFamily: "var(--font-sora)",
            boxShadow: `0 6px 24px ${cfg.glow}`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
          Continue <Icon d={ic.arrow} size={16} />
        </button>
      </div>
    </div>
  );

  /* ── Step 2: account credentials ────────────────────── */
  const AccountDetails = () => (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fadeUp" noValidate>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-extrabold text-xl" style={{ fontFamily: "var(--font-sora)" }}>
            Account Setup
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#475569" }}>Secure your Class5 AI account</p>
        </div>
        <Steps current={2} total={2} color={cfg.color} />
      </div>

      {/* Google */}
      <button type="button" onClick={handleGoogleSignup} disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
        style={{
          background: "#1E293B",
          border: "1px solid rgba(255,255,255,0.07)",
          fontFamily: "var(--font-sora)",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "#253347"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#1E293B"; }}>
        <svg width={18} height={18} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign up with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "#1E293B" }} />
        <span className="text-xs" style={{ color: "#334155" }}>or with email</span>
        <div className="flex-1 h-px" style={{ background: "#1E293B" }} />
      </div>

      {/* email */}
      <Field label="Email Address" error={errors.email} icon={ic.mail}>
        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          style={inputStyle(errors.email)} onFocus={onFocus} onBlur={onBlur} />
      </Field>

      {/* password */}
      <Field label="Password" error={errors.password} icon={ic.lock}>
        <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)}
          placeholder="Min. 8 characters"
          style={{ ...inputStyle(errors.password), paddingRight: "3rem" }}
          onFocus={onFocus} onBlur={onBlur} />
        <button type="button" onClick={() => setShowPass(!showPass)}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
          <Icon d={showPass ? ic.eyeoff : ic.eye} size={16} />
        </button>
      </Field>

      {/* strength indicator */}
      {form.password.length > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1,2,3,4].map((s) => {
              const strength = form.password.length < 4 ? 1 : form.password.length < 8 ? 2 : form.password.length < 12 ? 3 : 4;
              return (
                <div key={s} className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{ background: s <= strength ? (strength < 2 ? "#EF4444" : strength < 3 ? "#F59E0B" : "#10B981") : "#1E293B" }} />
              );
            })}
          </div>
          <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            {form.password.length < 4 ? "Weak" : form.password.length < 8 ? "Fair" : form.password.length < 12 ? "Good" : "Strong"} password
          </p>
        </div>
      )}

      {/* confirm */}
      <Field label="Confirm Password" error={errors.confirm} icon={ic.lock}>
        <input type="password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)}
          placeholder="Repeat your password"
          style={inputStyle(errors.confirm)} onFocus={onFocus} onBlur={onBlur} />
      </Field>

      {/* agree */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
            style={{
              background: form.agree ? cfg.color : "#1E293B",
              border: `1.5px solid ${form.agree ? cfg.color : errors.agree ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
            }}
            onClick={() => set("agree", !form.agree)}>
            {form.agree && <Icon d={ic.check} size={11} />}
          </div>
          <span className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
            I agree to the{" "}
            <a href="#" className="hover:text-white transition-colors" style={{ color: cfg.color }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="hover:text-white transition-colors" style={{ color: cfg.color }}>Privacy Policy</a>
          </span>
        </label>
        {errors.agree && <p className="text-xs mt-1" style={{ color: "#F87171" }}>{errors.agree}</p>}
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={handleBack}
          className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: "#1E293B",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#94A3B8",
            fontFamily: "var(--font-sora)",
          }}>
          Back
        </button>
        <button type="submit" disabled={loading}
          className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300"
          style={{
            background: loading ? "#1E293B" : cfg.grad,
            fontFamily: "var(--font-sora)",
            boxShadow: loading ? "none" : `0 6px 24px ${cfg.glow}`,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Creating account…
            </>
          ) : (
            <> Create {cfg.label} Account <Icon d={ic.arrow} size={16} /> </>
          )}
        </button>
      </div>
    </form>
  );

  /* ── Done state ──────────────────────────────────────── */
  const DoneState = () => (
    <div className="text-center py-10 space-y-5 animate-fadeUp">
      <div className="relative inline-flex">
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: `${cfg.color}20`, color: cfg.color }}>
          <Icon d={ic.check} size={32} />
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: cfg.color }} />
      </div>
      <div>
        <h2 className="text-white text-2xl font-extrabold mb-2" style={{ fontFamily: "var(--font-sora)" }}>
          You&apos;re in, {form.firstName || cfg.label}! {cfg.emoji}
        </h2>
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
          Your {cfg.label.toLowerCase()} account is ready. Redirecting to your dashboard…
        </p>
      </div>
      <div className="flex justify-center gap-3 pt-2">
        {["Setting up workspace", "Personalising feed", "Almost ready"].map((t, i) => (
          <div key={t} className="flex items-center gap-1.5 text-xs"
            style={{ color: cfg.color, fontFamily: "var(--font-dm)", animationDelay: `${i * 0.3}s` }}>
            <Icon d={ic.check} size={11} /> {t}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "var(--font-dm)" }}>

      {/* ── LEFT decorative panel ─────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12"
        style={{ background: cfg.panelBg }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{
            width: 450, height: 450, top: "5%", left: "-15%",
            background: role === "student" ? "rgba(37,99,235,0.14)" : "rgba(245,158,11,0.11)",
            filter: "blur(100px)", animation: "drift1 9s ease-in-out infinite",
          }} />
          <div className="absolute rounded-full" style={{
            width: 350, height: 350, bottom: "5%", right: "-8%",
            background: role === "student" ? "rgba(124,58,237,0.16)" : "rgba(245,158,11,0.13)",
            filter: "blur(90px)", animation: "drift2 11s ease-in-out infinite",
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
        </div>

        <div className="relative flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={60} height={50} />
        </div>

        <div className="relative space-y-6">
          <div>
            <h2 className="text-white font-extrabold leading-tight mb-3"
              style={{ fontFamily: "var(--font-sora)", fontSize: "2.4rem" }}>
              Join as a<br />
              <span style={{ background: cfg.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {cfg.label}
              </span>
            </h2>
            <p style={{ color: "#475569", fontFamily: "var(--font-dm)", lineHeight: 1.7 }}>
              {role === "student"
                ? "Access AI-powered study tools, connect with top tutors, and achieve your academic goals."
                : "Share your expertise, earn from your knowledge, and help thousands of students succeed."}
            </p>
          </div>

          <div className="space-y-3">
            {(step === 0
              ? ["Choose your role","Add personal details","Set up your account"]
              : step === 1
              ? ["Role selected ✓","Add personal details","Set up your account"]
              : ["Role selected ✓","Details added ✓","Set up your account"]
            ).map((s, i) => (
              <div key={s} className="flex items-center gap-3 text-sm"
                style={{ color: i < step ? cfg.color : i === step ? "#94A3B8" : "#334155", fontFamily: "var(--font-dm)" }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: i < step ? cfg.color : i === step ? "#94A3B8" : "#334155" }} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex -space-x-3 mb-3">
            {["#3B82F6","#8B5CF6","#F59E0B","#10B981","#EC4899"].map((c,i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                style={{ background: c, borderColor: "#0F172A", fontFamily: "var(--font-sora)" }}>
                {["A","K","T","S","R"][i]}
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            Join <strong className="text-white">12,000+</strong> students & mentors already on Class5 AI
          </p>
        </div>
      </div>

      {/* ── RIGHT form panel ──────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${cfg.color}07 0%, transparent 70%)`,
        }} />

        <div className="relative w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: cfg.grad, fontFamily: "var(--font-sora)" }}>C5</div>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Class5 AI</span>
          </div>

          {done ? <DoneState /> : step === 0 ? <RolePicker /> : step === 1 ? <PersonalInfo /> : <AccountDetails />}
        </div>
      </div>

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes drift1{ 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        @keyframes drift2{ 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,15px)} }
        @keyframes ping  { 75%,100%{transform:scale(2);opacity:0} }
        @keyframes fadeUp{ from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .animate-spin   { animation: spin 0.9s linear infinite; }
        .animate-ping   { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
        .animate-fadeUp { animation: fadeUp 0.4s ease forwards; }
      `}</style>
    </main>
  );
}