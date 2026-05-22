"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check:    "M20 6L9 17l-5-5",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  file:     "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  upload:   "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  alert:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  x:        "M18 6L6 18M6 6l12 12",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
  phone2:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
};

/* ── types ──────────────────────────────────────────────── */
type Status = "pending_review" | "info_required" | "rejected";

interface DocStatus { label: string; uploaded: boolean; issue?: string; }

/* ── demo — change this to see different states ─────────── */
const DEMO_STATUS: Status = "pending_review"; // "pending_review" | "info_required" | "rejected"

const SUBMITTED_DOCS: DocStatus[] = [
  { label: "Degree Certificate",    uploaded: true  },
  { label: "Government-Issued ID",  uploaded: true  },
  { label: "Teaching Licence",      uploaded: false },
];

const INFO_REQUIRED_DOCS: DocStatus[] = [
  { label: "Degree Certificate",    uploaded: true  },
  { label: "Government-Issued ID",  uploaded: true,  issue: "Image is blurry — please re-upload a clearer scan" },
  { label: "Teaching Licence",      uploaded: false },
];

/* ── helpers ────────────────────────────────────────────── */
function formatTimeAgo(ms: number) {
  const h = Math.floor(ms / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/* ── animated orb background ───────────────────────────── */
function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute rounded-full"
        style={{ width: 500, height: 500, top: "-10%", left: "-10%", background: "rgba(217,119,6,0.08)", filter: "blur(120px)", animation: "drift1 12s ease-in-out infinite" }} />
      <div className="absolute rounded-full"
        style={{ width: 400, height: 400, bottom: "-5%", right: "-5%", background: "rgba(245,158,11,0.06)", filter: "blur(100px)", animation: "drift2 15s ease-in-out infinite" }} />
      <div className="absolute rounded-full"
        style={{ width: 300, height: 300, top: "50%", left: "50%", background: "rgba(37,99,235,0.05)", filter: "blur(80px)" }} />
      <div className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
    </div>
  );
}

/* ── step timeline ──────────────────────────────────────── */
function Timeline({ status }: { status: Status }) {
  const steps = [
    {
      id: 1,
      label: "Application Submitted",
      desc: "Your profile and documents have been received.",
      state: "done",
    },
    {
      id: 2,
      label: "Document Verification",
      desc: status === "info_required"
        ? "Some documents need attention — see below."
        : status === "rejected"
        ? "Verification could not be completed."
        : "Our team is reviewing your uploaded credentials.",
      state: status === "pending_review" ? "active"
           : status === "info_required"  ? "warning"
           : "error",
    },
    {
      id: 3,
      label: "Admin Approval",
      desc: "A Class5 AI admin will approve your profile.",
      state: status === "pending_review" || status === "info_required" || status === "rejected" ? "pending" : "done",
    },
    {
      id: 4,
      label: "Profile Goes Live",
      desc: "Your profile will be visible to students on the marketplace.",
      state: "pending",
    },
  ];

  const stateStyles: Record<string, { bg: string; border: string; color: string; icon?: string }> = {
    done:    { bg: "rgba(16,185,129,0.15)",  border: "#10B981", color: "#10B981",  icon: ic.check  },
    active:  { bg: "rgba(245,158,11,0.15)",  border: "#F59E0B", color: "#F59E0B",  icon: ic.clock  },
    warning: { bg: "rgba(245,158,11,0.15)",  border: "#F59E0B", color: "#F59E0B",  icon: ic.alert  },
    error:   { bg: "rgba(239,68,68,0.12)",   border: "#EF4444", color: "#F87171",  icon: ic.x      },
    pending: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", color: "#334155" },
  };

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const s = stateStyles[step.state];
        const isLast = i === steps.length - 1;
        return (
          <div key={step.id} className="flex gap-4">
            {/* dot + line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{ background: s.bg, border: `2px solid ${s.border}`, color: s.color, boxShadow: step.state !== "pending" ? `0 0 16px ${s.border}40` : "none" }}>
                {step.state === "active" ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    style={{ animation: "spin 1.2s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ) : s.icon ? (
                  <Icon d={s.icon} size={17} />
                ) : (
                  <span className="text-sm font-bold" style={{ fontFamily: "var(--font-sora)" }}>{step.id}</span>
                )}
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 my-1 rounded-full"
                  style={{ background: step.state === "done" ? "#10B981" : "rgba(255,255,255,0.06)", minHeight: 28 }} />
              )}
            </div>

            {/* content */}
            <div className={`pb-6 ${isLast ? "" : ""}`}>
              <p className="text-sm font-bold mt-2"
                style={{ color: step.state === "pending" ? "#334155" : "#F8FAFC", fontFamily: "var(--font-sora)" }}>
                {step.label}
              </p>
              <p className="text-xs mt-0.5 leading-relaxed"
                style={{ color: step.state === "pending" ? "#1E293B" : "#64748B", fontFamily: "var(--font-dm)" }}>
                {step.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── document status card ───────────────────────────────── */
function DocCard({ doc, showIssue = false }: { doc: DocStatus; showIssue?: boolean }) {
  const [reUploaded, setReUploaded] = useState(false);

  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl transition-all"
      style={{
        background: doc.issue && !reUploaded ? "rgba(239,68,68,0.06)" : doc.uploaded ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${doc.issue && !reUploaded ? "rgba(239,68,68,0.2)" : doc.uploaded ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)"}`,
      }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: doc.issue && !reUploaded ? "rgba(239,68,68,0.12)" : doc.uploaded ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)",
          color: doc.issue && !reUploaded ? "#F87171" : doc.uploaded ? "#10B981" : "#334155",
        }}>
        <Icon d={doc.issue && !reUploaded ? ic.alert : doc.uploaded ? ic.file : ic.upload} size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>{doc.label}</p>
        {doc.issue && !reUploaded ? (
          <>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#F87171", fontFamily: "var(--font-dm)" }}>{doc.issue}</p>
            {showIssue && (
              <button onClick={() => setReUploaded(true)}
                className="mt-2 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.25)", fontFamily: "var(--font-sora)" }}>
                <Icon d={ic.upload} size={12} /> Re-upload Document
              </button>
            )}
          </>
        ) : reUploaded ? (
          <p className="text-xs mt-0.5" style={{ color: "#10B981", fontFamily: "var(--font-dm)" }}>✓ Re-uploaded — pending admin review</p>
        ) : doc.uploaded ? (
          <p className="text-xs mt-0.5" style={{ color: "#10B981", fontFamily: "var(--font-dm)" }}>Uploaded successfully</p>
        ) : (
          <p className="text-xs mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>Not uploaded</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {reUploaded ? (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", fontFamily: "var(--font-sora)" }}>Under Review</span>
        ) : doc.issue ? (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#F87171", fontFamily: "var(--font-sora)" }}>Action Needed</span>
        ) : doc.uploaded ? (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontFamily: "var(--font-sora)" }}>Verified</span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#334155", fontFamily: "var(--font-sora)" }}>Optional</span>
        )}
      </div>
    </div>
  );
}

/* ── tip card ───────────────────────────────────────────── */
function TipCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl"
      style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}14`, color }}>
        <Icon d={icon} size={17} />
      </div>
      <div>
        <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{title}</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{desc}</p>
      </div>
    </div>
  );
}

/* ── countdown timer ────────────────────────────────────── */
function Countdown() {
  /* simulate 47h remaining */
  const [remaining, setRemaining] = useState(47 * 3600 + 23 * 60 + 15);

  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-3">
      {[{ val: pad(h), label: "HRS" }, { val: pad(m), label: "MIN" }, { val: pad(s), label: "SEC" }].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-2xl text-white"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(245,158,11,0.1)" }}>
              {unit.val}
            </div>
            <p className="text-[9px] font-bold mt-1 tracking-widest" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>{unit.label}</p>
          </div>
          {i < 2 && <span className="text-xl font-bold pb-4" style={{ color: "#F59E0B" }}>:</span>}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function MentorPendingPage() {
  const status = DEMO_STATUS;
  const [contactVisible, setContactVisible] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState("");

  const docs = status === "info_required" ? INFO_REQUIRED_DOCS : SUBMITTED_DOCS;

  const statusConfig = {
    pending_review: {
      badge:    { bg: "rgba(245,158,11,0.12)", color: "#F59E0B", border: "rgba(245,158,11,0.25)", label: "Under Review" },
      headline: "Your application is under review",
      subline:  "Our admin team is carefully reviewing your documents and profile. You'll be notified by email once a decision is made.",
      icon:     ic.clock,
      iconBg:   "rgba(245,158,11,0.12)",
      iconColor:"#F59E0B",
    },
    info_required: {
      badge:    { bg: "rgba(239,68,68,0.1)", color: "#F87171", border: "rgba(239,68,68,0.2)", label: "Action Required" },
      headline: "We need a little more information",
      subline:  "Some of your uploaded documents need attention. Please review the issues below and re-upload the required files.",
      icon:     ic.alert,
      iconBg:   "rgba(239,68,68,0.1)",
      iconColor:"#F87171",
    },
    rejected: {
      badge:    { bg: "rgba(239,68,68,0.1)", color: "#F87171", border: "rgba(239,68,68,0.2)", label: "Not Approved" },
      headline: "Your application was not approved",
      subline:  "Unfortunately we were unable to verify your credentials at this time. Please review the reason below and re-apply.",
      icon:     ic.x,
      iconBg:   "rgba(239,68,68,0.1)",
      iconColor:"#F87171",
    },
  };

  const cfg = statusConfig[status];

  return (
    <main className="min-h-screen relative" style={{ background: "#0F172A", fontFamily: "var(--font-dm)" }}>
      <Background />

      {/* top nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)" }}>C5</div>
          <span className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Class5 AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/mentor/onboarding"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
            style={{ color: "#475569", fontFamily: "var(--font-sora)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F8FAFC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
            <Icon d={ic.edit} size={13} /> Edit Application
          </Link>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
            style={{ color: "#475569", fontFamily: "var(--font-sora)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
            <Icon d={ic.logout} size={13} /> Log Out
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-5 py-8">

        {/* ── status banner ───────────────────────── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ background: cfg.iconBg, border: `2px solid ${cfg.iconColor}40`, color: cfg.iconColor, boxShadow: `0 0 40px ${cfg.iconColor}30` }}>
                {status === "pending_review" ? (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
                    style={{ animation: "spin 3s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ) : (
                  <Icon d={cfg.icon} size={32} />
                )}
              </div>
              {status === "pending_review" && (
                <div className="absolute inset-0 rounded-3xl animate-ping opacity-10" style={{ background: "#F59E0B" }} />
              )}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: cfg.badge.bg, border: `1px solid ${cfg.badge.border}` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: cfg.badge.color, animation: status === "pending_review" ? "pulse 2s infinite" : "none" }} />
            <span className="text-xs font-bold tracking-wide" style={{ color: cfg.badge.color, fontFamily: "var(--font-sora)" }}>
              {cfg.badge.label}
            </span>
          </div>

          <h1 className="text-white font-extrabold mb-3"
            style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(1.5rem,3vw,2rem)" }}>
            {cfg.headline}
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#64748B" }}>
            {cfg.subline}
          </p>
        </div>

        {/* ── main grid ───────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* left col — timeline + docs */}
          <div className="lg:col-span-2 space-y-5">

            {/* timeline */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Verification Progress</p>
              <Timeline status={status} />
            </div>

            {/* document status */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Submitted Documents</p>
                {status === "info_required" && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "var(--font-sora)" }}>
                    1 issue found
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {docs.map((doc) => (
                  <DocCard key={doc.label} doc={doc} showIssue={status === "info_required"} />
                ))}
              </div>

              {status === "info_required" && (
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs mb-3" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                    After re-uploading, our team will review your documents again within <strong className="text-white">12–24 hours</strong>.
                  </p>
                  <Link href="/mentor/onboarding"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(245,158,11,0.3)" }}>
                    <Icon d={ic.upload} size={15} /> Go to Application & Re-upload
                  </Link>
                </div>
              )}

              {status === "rejected" && (
                <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="p-4 rounded-xl"
                    style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <p className="text-xs font-bold mb-1" style={{ color: "#F87171", fontFamily: "var(--font-sora)" }}>Reason for Rejection</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
                      We were unable to verify the credentials provided. The degree certificate uploaded does not appear to be a valid academic document. Please re-apply with an authentic, clearly scanned certificate.
                    </p>
                  </div>
                  <Link href="/mentor/onboarding"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(245,158,11,0.3)" }}>
                    <Icon d={ic.refresh} size={15} /> Re-apply with Correct Documents
                  </Link>
                </div>
              )}
            </div>

            {/* contact support */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <button className="w-full flex items-center justify-between px-6 py-4 text-left transition-all"
                onClick={() => setContactVisible(!contactVisible)}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(37,99,235,0.12)", color: "#60A5FA" }}>
                    <Icon d={ic.mail} size={15} />
                  </div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>
                    Having trouble? Contact Support
                  </p>
                </div>
                <Icon d={ic.arrow} size={16} />
              </button>

              {contactVisible && (
                <div className="px-6 pb-6 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs pt-4" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                    Send a message to our team and we&apos;ll get back to you within a few hours.
                  </p>
                  {messageSent ? (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                      <Icon d={ic.check} size={16} />
                      <p className="text-sm font-semibold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>
                        Message sent! We&apos;ll reply to your email shortly.
                      </p>
                    </div>
                  ) : (
                    <>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                        rows={3} placeholder="Describe your issue or question…"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
                        style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }} />
                      <button disabled={!message.trim()}
                        onClick={() => { setMessageSent(true); }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={{ background: message.trim() ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E293B", color: "#fff", fontFamily: "var(--font-sora)", cursor: message.trim() ? "pointer" : "not-allowed", boxShadow: message.trim() ? "0 4px 16px rgba(37,99,235,0.3)" : "none" }}>
                        <Icon d={ic.mail} size={15} /> Send Message
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* right col */}
          <div className="space-y-5">

            {/* countdown — only for pending */}
            {status === "pending_review" && (
              <div className="rounded-2xl p-6 text-center"
                style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Estimated Time Remaining</p>
                <div className="flex justify-center mb-3">
                  <Countdown />
                </div>
                <p className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                  Most applications are reviewed within 24–48 hours
                </p>
              </div>
            )}

            {/* profile preview */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Your Profile Preview</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", fontFamily: "var(--font-sora)" }}>A</div>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>Dr. Ada Okonkwo</p>
                  <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Physics · Mathematics</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Rate",      val: "₦3,500/session" },
                  { label: "Level",     val: "SS 1-3, JAMB, 100L" },
                  { label: "Languages", val: "English, Yoruba" },
                  { label: "Status",    val: "Pending verification" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-xs"
                    style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                    <span>{r.label}</span>
                    <strong className={r.label === "Status" ? "" : "text-white"}
                      style={{ color: r.label === "Status" ? "#F59E0B" : "#F8FAFC" }}>{r.val}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 flex items-center gap-1.5 text-xs"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#334155", fontFamily: "var(--font-dm)" }}>
                <Icon d={ic.info} size={12} />
                Profile hidden from students until approved
              </div>
            </div>

            {/* what to do while waiting */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>
                {status === "pending_review" ? "While You Wait" : "Next Steps"}
              </p>
              <div className="space-y-3">
                {status === "pending_review" ? (
                  <>
                    <TipCard icon={ic.user}  color="#2563EB" title="Polish your bio"        desc="Great bios get more bookings. Be specific about your teaching style." />
                    <TipCard icon={ic.book}  color="#7C3AED" title="Plan your first session" desc="Think about what topics you want to cover first with students." />
                    <TipCard icon={ic.star}  color="#F59E0B" title="Set competitive rates"  desc="Check what other tutors in your subject charge on the platform." />
                  </>
                ) : status === "info_required" ? (
                  <>
                    <TipCard icon={ic.upload} color="#F59E0B" title="Re-upload documents"   desc="Use a scanner app like CamScanner for clear, high-quality scans." />
                    <TipCard icon={ic.info}   color="#2563EB" title="Contact support"        desc="If you're unsure what's needed, message our team below." />
                  </>
                ) : (
                  <>
                    <TipCard icon={ic.refresh} color="#F59E0B" title="Re-apply"             desc="Fix the issue identified and submit a fresh application." />
                    <TipCard icon={ic.mail}   color="#2563EB" title="Appeal the decision"   desc="If you think this was an error, contact support with your documents." />
                  </>
                )}
              </div>
            </div>

            {/* contact channels */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Get Help Faster</p>
              <div className="space-y-2">
                {[
                  { icon: ic.mail,     label: "Email Support",    sub: "support@class5.ai",   color: "#2563EB" },
                  { icon: ic.whatsapp, label: "WhatsApp",         sub: "+234 800 000 0000",   color: "#10B981" },
                  { icon: ic.phone2,   label: "Call Us",          sub: "Mon–Fri, 9am–5pm",    color: "#F59E0B" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.color}14`, color: c.color }}>
                      <Icon d={c.icon} size={15} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{c.label}</p>
                      <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* bottom note */}
        <p className="text-center text-xs mt-8" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>
          Submitted {formatTimeAgo(3 * 3600000)} · Application ID: <span className="font-mono">CL5-MTR-20490</span>
        </p>

      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(24px,-20px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,18px)} }
        @keyframes ping   { 75%,100%{transform:scale(2);opacity:0} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .animate-ping { animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </main>
  );
}