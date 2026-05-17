"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeoff: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  arrow:  "M5 12h14M12 5l7 7-7 7",
  check:  "M20 6L9 17l-5-5",
  mail:   "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  lock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  google: "M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z",
};

type Role = "student" | "mentor";

const roleConfig = {
  student: {
    label:    "Student",
    emoji:    "🎓",
    tagline:  "Learn smarter every day",
    color:    "#2563EB",
    grad:     "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
    glow:     "rgba(37,99,235,0.35)",
    panelBg:  "linear-gradient(160deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
    accent:   "#7C3AED",
    feature:  ["AI-powered summaries","Smart quiz generation","Study groups","Progress tracking"],
  },
  mentor: {
    label:    "Mentor",
    emoji:    "🏫",
    tagline:  "Inspire the next generation",
    color:    "#F59E0B",
    grad:     "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%)",
    glow:     "rgba(245,158,11,0.35)",
    panelBg:  "linear-gradient(160deg, #0F172A 0%, #1C1507 50%, #0F172A 100%)",
    accent:   "#F59E0B",
    feature:  ["Manage student sessions","Track learner progress","Earn from expertise","Build your reputation"],
  },
};

export default function LoginPage() {
  const [role, setRole]         = useState<Role>("student");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});

  const cfg = roleConfig[role];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim())                       e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))   e.email    = "Enter a valid email";
    if (!password)                           e.password = "Password is required";
    else if (password.length < 6)           e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1600);
  };

  return (
    <main className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "var(--font-dm)" }}>

      {/* ── LEFT PANEL (decorative) ─────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden p-12"
        style={{ background: cfg.panelBg }}
      >
        {/* animated orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{
            width: 420, height: 420, top: "5%", left: "-10%",
            background: role === "student" ? "rgba(37,99,235,0.15)" : "rgba(245,158,11,0.12)",
            filter: "blur(90px)", animation: "drift1 8s ease-in-out infinite",
          }} />
          <div className="absolute rounded-full" style={{
            width: 300, height: 300, bottom: "10%", right: "-5%",
            background: role === "student" ? "rgba(124,58,237,0.18)" : "rgba(245,158,11,0.15)",
            filter: "blur(80px)", animation: "drift2 10s ease-in-out infinite",
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
        </div>

        {/* logo */}
        <div className="relative flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={60} height={50} />
          
        </div>

        {/* centre copy */}
        <div className="relative space-y-8">
          <div>
            <div className="text-6xl mb-4">{cfg.emoji}</div>
            <h2 className="text-white font-extrabold leading-tight mb-3"
              style={{ fontFamily: "var(--font-sora)", fontSize: "2.4rem" }}>
              Welcome back,<br />
              <span style={{
                background: cfg.grad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{cfg.label}</span>
            </h2>
            <p style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>{cfg.tagline}</p>
          </div>

          <ul className="space-y-3">
            {cfg.feature.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cfg.color}22`, color: cfg.color }}>
                  <Icon d={ic.check} size={11} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* bottom quote */}
        <div className="relative">
          <p className="text-sm italic" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            &ldquo;Education is the most powerful weapon you can use to change the world.&rdquo;
          </p>
          <p className="text-xs mt-1" style={{ color: "#1E293B" }}>— Nelson Mandela</p>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ──────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
        {/* subtle bg glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${cfg.color}09 0%, transparent 70%)`,
        }} />

        <div className="relative w-full max-w-md space-y-7">

          {/* mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: cfg.grad, fontFamily: "var(--font-sora)" }}>C5</div>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Class5 AI</span>
          </div>

          {/* heading */}
          <div>
            <h1 className="text-white font-extrabold mb-1"
              style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(1.6rem,3vw,2rem)" }}>
              Log In
            </h1>
            <p className="text-sm" style={{ color: "#475569" }}>
              Sign in to your Class5 AI account
            </p>
          </div>

          {/* role toggle */}
          <div className="flex gap-2 p-1.5 rounded-2xl" style={{ background: "#1E293B" }}>
            {(["student","mentor"] as Role[]).map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250"
                style={{
                  fontFamily: "var(--font-sora)",
                  background: role === r ? roleConfig[r].grad : "transparent",
                  color: role === r ? "#fff" : "#475569",
                  boxShadow: role === r ? `0 4px 16px ${roleConfig[r].glow}` : "none",
                }}>
                <span>{roleConfig[r].emoji}</span>
                {roleConfig[r].label}
              </button>
            ))}
          </div>

          {/* success state */}
          {done ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{ background: `${cfg.color}20`, color: cfg.color }}>
                <Icon d={ic.check} size={28} />
              </div>
              <h3 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-sora)" }}>
                Welcome back! 👋
              </h3>
              <p className="text-sm" style={{ color: "#64748B" }}>Redirecting to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Google */}
              <button type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "#253347"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#1E293B"; }}>
                <svg width={18} height={18} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "#1E293B" }} />
                <span className="text-xs" style={{ color: "#334155" }}>or continue with email</span>
                <div className="flex-1 h-px" style={{ background: "#1E293B" }} />
              </div>

              {/* email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#334155" }}>
                    <Icon d={ic.mail} size={16} />
                  </span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: "#1E293B",
                      border: `1px solid ${errors.email ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
                      fontFamily: "var(--font-dm)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = cfg.color; e.currentTarget.style.boxShadow = `0 0 0 3px ${cfg.color}22`; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = errors.email ? "#EF4444" : "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
                    Password
                  </label>
                  <a href="#" className="text-xs hover:text-white transition-colors" style={{ color: "#334155" }}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#334155" }}>
                    <Icon d={ic.lock} size={16} />
                  </span>
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: "#1E293B",
                      border: `1px solid ${errors.password ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
                      fontFamily: "var(--font-dm)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = cfg.color; e.currentTarget.style.boxShadow = `0 0 0 3px ${cfg.color}22`; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = errors.password ? "#EF4444" : "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#475569" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                    <Icon d={showPass ? ic.eyeoff : ic.eye} size={16} />
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
              </div>

              {/* submit */}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 mt-2"
                style={{
                  background: loading ? "#1E293B" : cfg.grad,
                  fontFamily: "var(--font-sora)",
                  boxShadow: loading ? "none" : `0 6px 24px ${cfg.glow}`,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${cfg.glow}`; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : `0 6px 24px ${cfg.glow}`; }}>
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                    Signing in…
                  </>
                ) : (
                  <> Log In as {cfg.label} <Icon d={ic.arrow} size={16} /> </>
                )}
              </button>

              <p className="text-sm text-center" style={{ color: "#475569" }}>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold hover:text-white transition-colors"
                  style={{ color: cfg.color, fontFamily: "var(--font-sora)" }}>
                  Sign up free
                </Link>
              </p>

            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,15px)} }
        .animate-spin { animation: spin 0.9s linear infinite; }
      `}</style>
    </main>
  );
}