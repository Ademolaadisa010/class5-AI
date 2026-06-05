"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // ← adjust path if needed

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
  mail:   "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  lock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  arrow:  "M5 12h14M12 5l7 7-7 7",
  check:  "M20 6L9 17l-5-5",
  back:   "M19 12H5M12 19l-7-7 7-7",
  send:   "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
};

type View = "login" | "forgot" | "sent";

export default function LoginPage() {
  const router = useRouter();
  const [view, setView]             = useState<View>("login");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});

  /* ── validation ──────────────────────────────────────── */
  const validateLogin = () => {
    const e: Record<string, string> = {};
    if (!email.trim())                     e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email address";
    if (!password)                         e.password = "Password is required";
    else if (password.length < 6)         e.password = "At least 6 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  /* ── Firebase: email/password login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setDone(true);
      setTimeout(() => router.push("/student/dashboard"), 1800);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        setErrors({ password: "Incorrect email or password." });
      } else if (code === "auth/too-many-requests") {
        setErrors({ password: "Too many attempts. Please try again later." });
      } else if (code === "auth/user-disabled") {
        setErrors({ email: "This account has been disabled." });
      } else {
        setErrors({ password: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Firebase: Google login ── */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setDone(true);
      setTimeout(() => router.push("/student/dashboard"), 1800);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code !== "auth/popup-closed-by-user") {
        setErrors({ password: "Google sign-in failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Firebase: password reset ── */
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !/\S+@\S+\.\S+/.test(resetEmail)) {
      setErrors({ resetEmail: "Enter a valid email address" });
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setView("sent");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/user-not-found") {
        // Don't reveal if email exists — still show "sent" for security
        setView("sent");
      } else {
        setErrors({ resetEmail: "Failed to send reset email. Try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── shared input style ──────────────────────────────── */
  const baseInput = (hasError?: boolean): React.CSSProperties => ({
    width: "100%",
    background: "#1E293B",
    border: `1px solid ${hasError ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "14px",
    padding: "13px 16px 13px 44px",
    fontSize: "0.9rem",
    color: "#F8FAFC",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "var(--font-dm)",
  });

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#2563EB";
    e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(37,99,235,0.16)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>, hasErr?: boolean) => {
    e.currentTarget.style.borderColor = hasErr ? "#EF4444" : "rgba(255,255,255,0.07)";
    e.currentTarget.style.boxShadow   = "none";
  };

  const features = [
    { emoji: "🧠", text: "AI summaries & instant explanations" },
    { emoji: "📝", text: "Auto-generate quizzes from your notes"  },
    { emoji: "👥", text: "Collaborate in live study groups"        },
    { emoji: "🏫", text: "Book 1-on-1 sessions with expert tutors" },
  ];

  return (
    <main className="min-h-screen flex" style={{ background: "#0F172A", fontFamily: "var(--font-dm)" }}>

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden p-12"
        style={{ background: "linear-gradient(160deg,#0F172A 0%,#1E1B4B 55%,#0F172A 100%)" }}>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width:500,height:500,top:"-5%",left:"-18%",background:"rgba(37,99,235,0.15)",filter:"blur(110px)",animation:"drift1 9s ease-in-out infinite" }} />
          <div className="absolute rounded-full" style={{ width:380,height:380,bottom:"0%",right:"-10%",background:"rgba(124,58,237,0.18)",filter:"blur(90px)",animation:"drift2 12s ease-in-out infinite" }} />
          <div className="absolute rounded-full" style={{ width:200,height:200,top:"52%",left:"62%",background:"rgba(245,158,11,0.06)",filter:"blur(60px)" }} />
          <div className="absolute inset-0" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"52px 52px" }} />
        </div>

        <div className="relative flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={60} height={50} />
        </div>

        <div className="relative space-y-10">
          <div>
            <h2 className="font-extrabold text-white leading-tight mb-3"
              style={{ fontFamily:"var(--font-sora)",fontSize:"2.5rem" }}>
              Your smartest<br />
              <span style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                study partner.
              </span>
            </h2>
            <p style={{ color:"#64748B",lineHeight:1.75,maxWidth:340 }}>
              Class5 AI gives every student and mentor the tools they need to learn faster, teach better, and go further.
            </p>
          </div>

          <ul className="space-y-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-4"
                style={{ animation:`fadeUp 0.5s ease ${i * 0.1}s both` }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background:"rgba(37,99,235,0.1)",border:"1px solid rgba(37,99,235,0.18)" }}>
                  {f.emoji}
                </div>
                <span className="text-sm" style={{ color:"#94A3B8" }}>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="flex -space-x-3 mb-3">
            {[["A","#3B82F6"],["S","#8B5CF6"],["K","#F59E0B"],["T","#10B981"],["R","#EC4899"]].map(([l,c],i)=>(
              <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background:c,border:"2px solid #0F172A",fontFamily:"var(--font-sora)" }}>{l}</div>
            ))}
          </div>
          <p className="text-xs" style={{ color:"#334155" }}>
            Trusted by <strong className="text-slate-400">12,000+</strong> students & mentors
          </p>
        </div>
      </div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-14 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          background:"radial-gradient(ellipse 65% 45% at 50% 25%,rgba(37,99,235,0.07) 0%,transparent 70%)",
        }} />

        <div className="relative w-full max-w-[420px]">

          {/* mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)",fontFamily:"var(--font-sora)" }}>C5</div>
            <span className="text-white font-bold text-lg" style={{ fontFamily:"var(--font-sora)" }}>Class5 AI</span>
          </div>

          {/* ─── VIEW: LOGIN ─────────────────────────── */}
          {view === "login" && !done && (
            <div style={{ animation:"fadeUp 0.4s ease both" }}>
              <div className="mb-8">
                <h1 className="text-white font-extrabold mb-1.5"
                  style={{ fontFamily:"var(--font-sora)",fontSize:"clamp(1.75rem,3vw,2.1rem)" }}>
                  Welcome back
                </h1>
                <p className="text-sm" style={{ color:"#475569" }}>
                  Log in to continue with Class5 AI
                </p>
              </div>

              {/* Google */}
              <button type="button" onClick={handleGoogleLogin} disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-sm font-semibold text-white mb-6 transition-all duration-200"
                style={{
                  background:"#1E293B",
                  border:"1px solid rgba(255,255,255,0.08)",
                  fontFamily:"var(--font-sora)",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e)=>{ if (!loading) { e.currentTarget.style.background="#253347"; e.currentTarget.style.borderColor="rgba(255,255,255,0.16)"; } }}
                onMouseLeave={(e)=>{ e.currentTarget.style.background="#1E293B"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
                <svg width={18} height={18} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px" style={{ background:"rgba(255,255,255,0.06)" }} />
                <span className="text-xs" style={{ color:"#334155" }}>or continue with email</span>
                <div className="flex-1 h-px" style={{ background:"rgba(255,255,255,0.06)" }} />
              </div>

              <form onSubmit={handleLogin} noValidate className="space-y-4">

                {/* email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold tracking-widest uppercase"
                    style={{ color:"#475569",fontFamily:"var(--font-sora)" }}>Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
                      <Icon d={ic.mail} size={16} />
                    </span>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={baseInput(!!errors.email)}
                      onFocus={onFocus} onBlur={(e)=>onBlur(e,!!errors.email)} />
                  </div>
                  {errors.email && <p className="text-xs" style={{ color:"#F87171" }}>{errors.email}</p>}
                </div>

                {/* password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color:"#475569",fontFamily:"var(--font-sora)" }}>Password</label>
                    <button type="button"
                      onClick={()=>{ setResetEmail(email); setView("forgot"); setErrors({}); }}
                      className="text-xs font-medium transition-colors"
                      style={{ color:"#2563EB",fontFamily:"var(--font-dm)" }}
                      onMouseEnter={(e)=>(e.currentTarget.style.color="#60A5FA")}
                      onMouseLeave={(e)=>(e.currentTarget.style.color="#2563EB")}>
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
                      <Icon d={ic.lock} size={16} />
                    </span>
                    <input type={showPass?"text":"password"} value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ ...baseInput(!!errors.password),paddingRight:"3rem" }}
                      onFocus={onFocus} onBlur={(e)=>onBlur(e,!!errors.password)} />
                    <button type="button" onClick={()=>setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color:"#475569" }}
                      onMouseEnter={(e)=>(e.currentTarget.style.color="#94A3B8")}
                      onMouseLeave={(e)=>(e.currentTarget.style.color="#475569")}>
                      <Icon d={showPass?ic.eyeoff:ic.eye} size={16} />
                    </button>
                  </div>
                  {errors.password && <p className="text-xs" style={{ color:"#F87171" }}>{errors.password}</p>}
                </div>

                {/* remember me */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div onClick={()=>setRemember(!remember)}
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: remember ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E293B",
                      border: `1.5px solid ${remember ? "#2563EB" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: remember ? "0 2px 10px rgba(37,99,235,0.3)" : "none",
                    }}>
                    {remember && <Icon d={ic.check} size={11} />}
                  </div>
                  <span className="text-sm" style={{ color:"#64748B" }}>Keep me logged in</span>
                </label>

                {/* submit */}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-white text-sm mt-1 transition-all duration-300"
                  style={{
                    background: loading ? "#1E293B" : "linear-gradient(135deg,#2563EB,#7C3AED)",
                    fontFamily: "var(--font-sora)",
                    boxShadow: loading ? "none" : "0 6px 26px rgba(37,99,235,0.4)",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e)=>{ if(!loading){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 34px rgba(37,99,235,0.52)"; } }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; if(!loading) e.currentTarget.style.boxShadow="0 6px 26px rgba(37,99,235,0.4)"; }}>
                  {loading ? (
                    <><svg className="w-4 h-4 spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Signing in…</>
                  ) : (
                    <>Log In <Icon d={ic.arrow} size={16} /></>
                  )}
                </button>

                <p className="text-sm text-center pt-1" style={{ color:"#475569" }}>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-semibold transition-colors"
                    style={{ color:"#2563EB",fontFamily:"var(--font-sora)" }}
                    onMouseEnter={(e)=>(e.currentTarget.style.color="#60A5FA")}
                    onMouseLeave={(e)=>(e.currentTarget.style.color="#2563EB")}>
                    Sign up free
                  </Link>
                </p>
              </form>
            </div>
          )}

          {/* ─── VIEW: LOGIN SUCCESS ──────────────────── */}
          {view === "login" && done && (
            <div className="text-center py-10 space-y-5" style={{ animation:"fadeUp 0.4s ease both" }}>
              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background:"rgba(37,99,235,0.15)",color:"#2563EB" }}>
                  <Icon d={ic.check} size={32} />
                </div>
                <div className="absolute inset-0 rounded-full ping" style={{ background:"rgba(37,99,235,0.22)" }} />
              </div>
              <div>
                <h2 className="text-white text-2xl font-extrabold mb-2" style={{ fontFamily:"var(--font-sora)" }}>
                  You&apos;re in! 👋
                </h2>
                <p className="text-sm" style={{ color:"#64748B" }}>Redirecting to your dashboard…</p>
              </div>
            </div>
          )}

          {/* ─── VIEW: FORGOT PASSWORD ────────────────── */}
          {view === "forgot" && (
            <div style={{ animation:"fadeUp 0.4s ease both" }}>
              <button onClick={()=>{ setView("login"); setErrors({}); }}
                className="flex items-center gap-2 text-sm mb-8 transition-colors"
                style={{ color:"#475569" }}
                onMouseEnter={(e)=>(e.currentTarget.style.color="#F8FAFC")}
                onMouseLeave={(e)=>(e.currentTarget.style.color="#475569")}>
                <Icon d={ic.back} size={15} /> Back to login
              </button>

              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background:"rgba(37,99,235,0.1)",border:"1px solid rgba(37,99,235,0.2)",color:"#2563EB" }}>
                  <Icon d={ic.mail} size={24} />
                </div>
                <h1 className="text-white font-extrabold mb-2"
                  style={{ fontFamily:"var(--font-sora)",fontSize:"clamp(1.6rem,3vw,2rem)" }}>
                  Reset your password
                </h1>
                <p className="text-sm leading-relaxed" style={{ color:"#475569",maxWidth:340 }}>
                  Enter your account email and we&apos;ll send you a secure reset link right away.
                </p>
              </div>

              <form onSubmit={handleForgot} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold tracking-widest uppercase"
                    style={{ color:"#475569",fontFamily:"var(--font-sora)" }}>Email address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
                      <Icon d={ic.mail} size={16} />
                    </span>
                    <input type="email" value={resetEmail} onChange={(e)=>setResetEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={baseInput(!!errors.resetEmail)}
                      onFocus={onFocus} onBlur={(e)=>onBlur(e,!!errors.resetEmail)} />
                  </div>
                  {errors.resetEmail && <p className="text-xs" style={{ color:"#F87171" }}>{errors.resetEmail}</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-white text-sm transition-all duration-300"
                  style={{
                    background: loading ? "#1E293B" : "linear-gradient(135deg,#2563EB,#7C3AED)",
                    fontFamily: "var(--font-sora)",
                    boxShadow: loading ? "none" : "0 6px 26px rgba(37,99,235,0.4)",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e)=>{ if(!loading){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 34px rgba(37,99,235,0.52)"; } }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; if(!loading) e.currentTarget.style.boxShadow="0 6px 26px rgba(37,99,235,0.4)"; }}>
                  {loading ? (
                    <><svg className="w-4 h-4 spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Sending…</>
                  ) : (
                    <>Send Reset Link <Icon d={ic.send} size={15} /></>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ─── VIEW: EMAIL SENT ─────────────────────── */}
          {view === "sent" && (
            <div className="text-center space-y-6 py-6" style={{ animation:"fadeUp 0.4s ease both" }}>
              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background:"rgba(37,99,235,0.12)",color:"#2563EB" }}>
                  <Icon d={ic.mail} size={32} />
                </div>
                <div className="absolute inset-0 rounded-full ping" style={{ background:"rgba(37,99,235,0.18)" }} />
              </div>

              <div>
                <h2 className="text-white text-2xl font-extrabold mb-2" style={{ fontFamily:"var(--font-sora)" }}>
                  Check your inbox
                </h2>
                <p className="text-sm leading-relaxed" style={{ color:"#64748B",maxWidth:320,margin:"0 auto" }}>
                  We sent a reset link to{" "}
                  <strong className="text-slate-300">{resetEmail}</strong>.{" "}
                  Check your spam folder if it doesn&apos;t show up.
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl text-sm"
                style={{ background:"rgba(37,99,235,0.08)",border:"1px solid rgba(37,99,235,0.15)",color:"#64748B" }}>
                Didn&apos;t receive it?{" "}
                <button onClick={()=>{ setView("forgot"); setLoading(false); }}
                  className="font-semibold transition-colors"
                  style={{ color:"#2563EB" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color="#60A5FA")}
                  onMouseLeave={(e)=>(e.currentTarget.style.color="#2563EB")}>
                  Resend email
                </button>
              </div>

              <button onClick={()=>{ setView("login"); setErrors({}); }}
                className="flex items-center gap-2 mx-auto text-sm transition-colors"
                style={{ color:"#475569" }}
                onMouseEnter={(e)=>(e.currentTarget.style.color="#F8FAFC")}
                onMouseLeave={(e)=>(e.currentTarget.style.color="#475569")}>
                <Icon d={ic.back} size={15} /> Back to login
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-18px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-16px,16px)} }
        @keyframes ping   { 75%,100%{transform:scale(2.2);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .spin { animation: spin 0.85s linear infinite; }
        .ping { animation: ping 1.3s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </main>
  );
}