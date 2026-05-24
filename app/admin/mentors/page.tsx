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
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  search:   "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  file:     "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  alert:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  close:    "M18 6L6 18M6 6l12 12",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  filter:   "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  globe:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  send:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
};

/* ── types ───────────────────────────────────────────────── */
type MentorStatus = "pending" | "info_required" | "approved" | "rejected";

interface MentorDoc {
  label: string; uploaded: boolean; issue?: string;
}

interface Mentor {
  id: string; name: string; avatar: string; color: string;
  email: string; phone: string; title: string; institution: string;
  yearsExp: string; subjects: string[]; levels: string[];
  languages: string[]; rate: number; bio: string;
  submittedAt: string; status: MentorStatus;
  docs: MentorDoc[];
  adminNote?: string;
}

/* ── data ────────────────────────────────────────────────── */
const SUBJECT_COLORS: Record<string, string> = {
  Physics: "#2563EB", Mathematics: "#F59E0B", Chemistry: "#7C3AED",
  Biology: "#10B981", English: "#EC4899", History: "#F97316",
  "Computer Science": "#06B6D4", Economics: "#8B5CF6",
};

const INITIAL_MENTORS: Mentor[] = [
  {
    id: "m1", name: "Dr. Emeka Chukwu", avatar: "EC", color: "#2563EB",
    email: "emeka.chukwu@email.com", phone: "+234 801 234 5678",
    title: "Dr.", institution: "University of Lagos",
    yearsExp: "6–10 years", subjects: ["Physics", "Mathematics"],
    levels: ["SS 1–3", "JAMB/UTME", "100 Level", "200 Level"],
    languages: ["English", "Igbo"], rate: 3500,
    bio: "PhD in Theoretical Physics from UNILAG. 8 years of tutoring experience across secondary and university levels. Specialist in JAMB and WAEC physics preparation.",
    submittedAt: "2 hours ago", status: "pending",
    docs: [
      { label: "Degree Certificate", uploaded: true },
      { label: "Government-Issued ID", uploaded: true },
      { label: "Teaching Licence (TRCN)", uploaded: true },
    ],
  },
  {
    id: "m2", name: "Miss Aisha Garba", avatar: "AG", color: "#F59E0B",
    email: "aisha.garba@email.com", phone: "+234 802 345 6789",
    title: "Miss", institution: "ABU Zaria",
    yearsExp: "3–5 years", subjects: ["Chemistry", "Biology"],
    levels: ["SS 1–3", "JAMB/UTME", "WAEC/NECO"],
    languages: ["English", "Hausa"], rate: 2800,
    bio: "MSc Biochemistry from ABU Zaria. Passionate about making chemistry accessible and fun. WAEC and JAMB specialist with a 92% pass rate among students.",
    submittedAt: "5 hours ago", status: "pending",
    docs: [
      { label: "Degree Certificate", uploaded: true },
      { label: "Government-Issued ID", uploaded: true },
      { label: "Teaching Licence (TRCN)", uploaded: false },
    ],
  },
  {
    id: "m3", name: "Mr. Bola Adewale", avatar: "BA", color: "#10B981",
    email: "bola.adewale@email.com", phone: "+234 803 456 7890",
    title: "Mr.", institution: "Obafemi Awolowo University",
    yearsExp: "1–2 years", subjects: ["Economics", "Mathematics"],
    levels: ["SS 1–3", "JAMB/UTME", "100 Level"],
    languages: ["English", "Yoruba"], rate: 2500,
    bio: "Economics graduate from OAU. Tutor with 2 years of experience helping students with micro and macroeconomics, as well as JAMB mathematics.",
    submittedAt: "1 day ago", status: "info_required",
    docs: [
      { label: "Degree Certificate", uploaded: true, issue: "Certificate image is blurry — please re-upload a clearer scan" },
      { label: "Government-Issued ID", uploaded: true },
      { label: "Teaching Licence (TRCN)", uploaded: false },
    ],
    adminNote: "Degree certificate scan is too low quality to verify. Please request a re-upload.",
  },
  {
    id: "m4", name: "Prof. Ngozi Obi", avatar: "NO", color: "#7C3AED",
    email: "ngozi.obi@email.com", phone: "+234 804 567 8901",
    title: "Prof.", institution: "University of Nigeria Nsukka",
    yearsExp: "10+ years", subjects: ["Biology", "Chemistry"],
    levels: ["SS 1–3", "100 Level", "200 Level", "300 Level", "Postgraduate"],
    languages: ["English", "Igbo"], rate: 5000,
    bio: "Professor of Biochemistry with 15+ years of academic and tutoring experience. Published researcher with a strong track record of helping students achieve top grades.",
    submittedAt: "2 days ago", status: "approved",
    docs: [
      { label: "Degree Certificate", uploaded: true },
      { label: "Government-Issued ID", uploaded: true },
      { label: "Teaching Licence (TRCN)", uploaded: true },
    ],
  },
  {
    id: "m5", name: "Mr. Sola Okunade", avatar: "SO", color: "#EC4899",
    email: "sola.okunade@email.com", phone: "+234 805 678 9012",
    title: "Mr.", institution: "Unknown",
    yearsExp: "Less than 1 year", subjects: ["Mathematics"],
    levels: ["Primary School", "JSS 1–3"],
    languages: ["English"], rate: 1500,
    bio: "I love maths and want to teach kids. I am good at it.",
    submittedAt: "3 days ago", status: "rejected",
    docs: [
      { label: "Degree Certificate", uploaded: false },
      { label: "Government-Issued ID", uploaded: true },
      { label: "Teaching Licence (TRCN)", uploaded: false },
    ],
    adminNote: "Insufficient credentials. Bio too brief and unprofessional. No degree certificate uploaded. Rejected.",
  },
];

/* ── review modal ────────────────────────────────────────── */
function ReviewModal({ mentor, onClose, onDecide }: {
  mentor: Mentor;
  onClose: () => void;
  onDecide: (id: string, decision: MentorStatus, note: string) => void;
}) {
  const [note, setNote]     = useState(mentor.adminNote ?? "");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<MentorStatus | null>(null);

  const decide = (status: MentorStatus) => {
    if (status !== "info_required" && !confirmed) {
      setPendingDecision(status);
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onDecide(mentor.id, status, note); onClose(); }, 1200);
  };

  const statusBadge: Record<MentorStatus, { bg: string; color: string; label: string }> = {
    pending:       { bg: "rgba(245,158,11,0.12)", color: "#F59E0B", label: "Pending Review" },
    info_required: { bg: "rgba(239,68,68,0.1)",  color: "#F87171", label: "Info Required"  },
    approved:      { bg: "rgba(16,185,129,0.12)", color: "#10B981", label: "Approved"       },
    rejected:      { bg: "rgba(239,68,68,0.1)",  color: "#F87171", label: "Rejected"        },
  };
  const badge = statusBadge[mentor.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      {/* confirm overlay */}
      {pendingDecision && (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-3xl p-6 space-y-4"
            style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-sora)" }}>
              {pendingDecision === "approved" ? "Approve Mentor?" : "Reject Application?"}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
              {pendingDecision === "approved"
                ? `Approving ${mentor.name} will make their profile visible to all students on the marketplace immediately.`
                : `Rejecting ${mentor.name}'s application will notify them by email with your reason. They can re-apply after correcting the issue.`}
            </p>
            {note && (
              <div className="p-3 rounded-xl text-xs"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#94A3B8", fontFamily: "var(--font-dm)" }}>
                <strong className="text-white">Your note: </strong>{note}
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setPendingDecision(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}>
                Cancel
              </button>
              <button onClick={() => { setConfirmed(true); decide(pendingDecision); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: pendingDecision === "approved" ? "linear-gradient(135deg,#059669,#10B981)" : "#EF4444",
                  color: "#fff", fontFamily: "var(--font-sora)",
                  boxShadow: pendingDecision === "approved" ? "0 4px 16px rgba(16,185,129,0.35)" : "0 4px 16px rgba(239,68,68,0.35)",
                }}>
                {pendingDecision === "approved" ? "Yes, Approve" : "Yes, Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ background: "#0B1120", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)", maxHeight: "92vh", overflowY: "auto" }}>

        {/* header */}
        <div className="px-6 py-5 flex items-center gap-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(30,41,59,0.5)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ background: mentor.color, fontFamily: "var(--font-sora)" }}>{mentor.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>{mentor.name}</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: badge.bg, color: badge.color, fontFamily: "var(--font-sora)" }}>
                {badge.label}
              </span>
            </div>
            <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
              {mentor.title} · {mentor.institution} · Submitted {mentor.submittedAt}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors flex-shrink-0">
            <Icon d={ic.close} size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* profile details */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Email",       val: mentor.email               },
              { label: "Phone",       val: mentor.phone               },
              { label: "Experience",  val: mentor.yearsExp            },
              { label: "Rate",        val: `₦${mentor.rate.toLocaleString()}/session` },
              { label: "Languages",   val: mentor.languages.join(", ") },
              { label: "Levels",      val: mentor.levels.slice(0,3).join(", ") + (mentor.levels.length>3?`…`:"") },
            ].map((r) => (
              <div key={r.label} className="p-3 rounded-xl"
                style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <p className="text-[10px] mb-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{r.label}</p>
                <p className="text-xs font-semibold text-white truncate" style={{ fontFamily: "var(--font-sora)" }}>{r.val}</p>
              </div>
            ))}
          </div>

          {/* subjects */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Subjects</p>
            <div className="flex flex-wrap gap-2">
              {mentor.subjects.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: `${SUBJECT_COLORS[s]??'#64748B'}14`, color: SUBJECT_COLORS[s]??'#64748B', border: `1px solid ${SUBJECT_COLORS[s]??'#64748B'}25`, fontFamily: "var(--font-sora)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* bio */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Bio</p>
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>{mentor.bio}</p>
          </div>

          {/* documents */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Submitted Documents</p>
            <div className="space-y-2">
              {mentor.docs.map((doc) => (
                <div key={doc.label} className="flex items-center gap-3 p-3.5 rounded-xl"
                  style={{
                    background: doc.issue ? "rgba(239,68,68,0.06)" : doc.uploaded ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${doc.issue ? "rgba(239,68,68,0.2)" : doc.uploaded ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)"}`,
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: doc.issue ? "rgba(239,68,68,0.1)" : doc.uploaded ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)", color: doc.issue ? "#F87171" : doc.uploaded ? "#10B981" : "#334155" }}>
                    <Icon d={doc.issue ? ic.alert : doc.uploaded ? ic.file : ic.alert} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{doc.label}</p>
                    {doc.issue ? (
                      <p className="text-xs" style={{ color: "#F87171", fontFamily: "var(--font-dm)" }}>{doc.issue}</p>
                    ) : (
                      <p className="text-xs" style={{ color: doc.uploaded ? "#10B981" : "#334155", fontFamily: "var(--font-dm)" }}>
                        {doc.uploaded ? "Uploaded" : "Not uploaded"}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {doc.uploaded && (
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: "rgba(37,99,235,0.1)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.2)", fontFamily: "var(--font-sora)" }}>
                        <Icon d={ic.eye} size={12} /> View
                      </button>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: doc.issue ? "rgba(239,68,68,0.1)" : doc.uploaded ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)", color: doc.issue ? "#F87171" : doc.uploaded ? "#10B981" : "#334155", fontFamily: "var(--font-sora)" }}>
                      {doc.issue ? "Issue" : doc.uploaded ? "✓ OK" : "Missing"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* admin note */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Admin Note</p>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
              placeholder="Add a note for the mentor (sent with approval/rejection email) or internal memo…"
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
              style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>

          {/* action buttons */}
          {(mentor.status === "pending" || mentor.status === "info_required") && (
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => decide("rejected")} disabled={loading}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#F87171", fontFamily: "var(--font-sora)", cursor: loading ? "not-allowed" : "pointer" }}>
                <Icon d={ic.x} size={15} /> Reject
              </button>
              <button onClick={() => decide("info_required")} disabled={loading}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#F59E0B", fontFamily: "var(--font-sora)", cursor: loading ? "not-allowed" : "pointer" }}>
                <Icon d={ic.message} size={15} /> Need Info
              </button>
              <button onClick={() => decide("approved")} disabled={loading}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: loading ? "#1E293B" : "linear-gradient(135deg,#059669,#10B981)", color: loading ? "#475569" : "#fff", fontFamily: "var(--font-sora)", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 16px rgba(16,185,129,0.35)" }}>
                {loading ? (
                  <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>Processing…</>
                ) : (
                  <><Icon d={ic.check} size={15} /> Approve</>
                )}
              </button>
            </div>
          )}

          {mentor.status === "approved" && (
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <Icon d={ic.check} size={18} />
              <p className="text-sm font-semibold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>
                This mentor has been approved and is live on the marketplace.
              </p>
            </div>
          )}

          {mentor.status === "rejected" && (
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <Icon d={ic.x} size={18} />
              <p className="text-sm font-semibold" style={{ color: "#F87171", fontFamily: "var(--font-sora)" }}>
                This application was rejected. Mentor has been notified.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── mentor row card ─────────────────────────────────────── */
function MentorRow({ mentor, onReview }: { mentor: Mentor; onReview: () => void }) {
  const statusStyle: Record<MentorStatus, { bg: string; color: string; label: string; dot: string }> = {
    pending:       { bg: "rgba(245,158,11,0.1)",  color: "#F59E0B", label: "Pending",       dot: "#F59E0B" },
    info_required: { bg: "rgba(239,68,68,0.1)",   color: "#F87171", label: "Info Required", dot: "#EF4444" },
    approved:      { bg: "rgba(16,185,129,0.1)",  color: "#10B981", label: "Approved",      dot: "#10B981" },
    rejected:      { bg: "rgba(100,116,139,0.1)", color: "#64748B", label: "Rejected",      dot: "#64748B" },
  };
  const s = statusStyle[mentor.status];
  const allDocsOk = mentor.docs.filter((d) => d.uploaded).length;
  const hasIssue  = mentor.docs.some((d) => d.issue);

  return (
    <div className="flex items-center gap-4 px-5 py-4 transition-all duration-150 group cursor-pointer"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      onClick={onReview}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>

      {/* avatar */}
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ background: mentor.color, fontFamily: "var(--font-sora)" }}>{mentor.avatar}</div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-sora)" }}>{mentor.name}</p>
          {hasIssue && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: "rgba(239,68,68,0.1)", color: "#F87171", fontFamily: "var(--font-sora)" }}>
              <Icon d={ic.alert} size={9} /> Doc issue
            </span>
          )}
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          {mentor.institution} · {mentor.subjects.join(", ")}
        </p>
      </div>

      {/* docs pill */}
      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
        <Icon d={ic.file} size={13} />
        <span className="text-xs" style={{ color: allDocsOk >= 2 ? "#10B981" : "#F59E0B", fontFamily: "var(--font-dm)" }}>
          {allDocsOk}/{mentor.docs.length} docs
        </span>
      </div>

      {/* rate */}
      <div className="hidden md:block text-right flex-shrink-0">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>₦{mentor.rate.toLocaleString()}</p>
        <p className="text-[10px]" style={{ color: "#334155" }}>/session</p>
      </div>

      {/* submitted */}
      <div className="hidden lg:flex items-center gap-1 flex-shrink-0" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
        <Icon d={ic.clock} size={12} />
        <span className="text-xs">{mentor.submittedAt}</span>
      </div>

      {/* status */}
      <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
        style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}25`, fontFamily: "var(--font-sora)" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
        {s.label}
      </span>

      {/* review button */}
      <button onClick={(e) => { e.stopPropagation(); onReview(); }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0"
        style={{ background: "rgba(37,99,235,0.1)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.2)", fontFamily: "var(--font-sora)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.1)"; }}>
        <Icon d={ic.eye} size={13} /> Review
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function AdminMentorsPage() {
  const [mentors, setMentors]     = useState<Mentor[]>(INITIAL_MENTORS);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState<"all" | MentorStatus>("all");
  const [reviewing, setReviewing] = useState<Mentor | null>(null);

  const handleDecide = (id: string, status: MentorStatus, note: string) => {
    setMentors((m) => m.map((mentor) => mentor.id === id ? { ...mentor, status, adminNote: note } : mentor));
  };

  const filtered = mentors.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
                        m.institution.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all:           mentors.length,
    pending:       mentors.filter((m) => m.status === "pending").length,
    info_required: mentors.filter((m) => m.status === "info_required").length,
    approved:      mentors.filter((m) => m.status === "approved").length,
    rejected:      mentors.filter((m) => m.status === "rejected").length,
  };

  const TAB_CONFIG: { id: "all" | MentorStatus; label: string; color: string }[] = [
    { id: "all",           label: "All",          color: "#2563EB" },
    { id: "pending",       label: "Pending",       color: "#F59E0B" },
    { id: "info_required", label: "Info Required", color: "#EF4444" },
    { id: "approved",      label: "Approved",      color: "#10B981" },
    { id: "rejected",      label: "Rejected",      color: "#64748B" },
  ];

  return (
    <div className="px-5 py-6 max-w-6xl mx-auto">
      {reviewing && (
        <ReviewModal mentor={reviewing} onClose={() => setReviewing(null)} onDecide={handleDecide} />
      )}

      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>
            Mentor Verification
          </h2>
          <p className="text-sm mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Review mentor applications, verify credentials, and manage the tutor marketplace.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-sora)" }}>
            <Icon d={ic.download} size={14} /> Export
          </button>
        </div>
      </div>

      {/* summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending Review",   val: counts.pending,       color: "#F59E0B", icon: ic.clock   },
          { label: "Info Required",    val: counts.info_required, color: "#EF4444", icon: ic.alert   },
          { label: "Approved",         val: counts.approved,      color: "#10B981", icon: ic.check   },
          { label: "Total Mentors",    val: counts.all,           color: "#2563EB", icon: ic.users   },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18`, color: s.color }}>
              <Icon d={s.icon} size={17} />
            </div>
            <div>
              <p className="font-extrabold text-white text-xl leading-none" style={{ fontFamily: "var(--font-sora)" }}>{s.val}</p>
              <p className="text-xs mt-0.5" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* search + filter */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
            <Icon d={ic.search} size={16} />
          </span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, subject, or institution…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white outline-none transition-all"
            style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>

        {/* status tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl" style={{ background: "#1E293B" }}>
          {TAB_CONFIG.map((t) => (
            <button key={t.id} onClick={() => setFilter(t.id)}
              className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora)",
                background: filterStatus === t.id ? `${t.color}18` : "transparent",
                color: filterStatus === t.id ? t.color : "#475569",
                border: `1px solid ${filterStatus === t.id ? `${t.color}30` : "transparent"}`,
              }}>
              {t.label}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: filterStatus === t.id ? `${t.color}25` : "rgba(255,255,255,0.06)", color: filterStatus === t.id ? t.color : "#334155" }}>
                {counts[t.id as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* results count */}
      <p className="text-xs mb-3" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
        Showing <strong className="text-white">{filtered.length}</strong> mentor{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* table */}
      {filtered.length > 0 ? (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* col headers */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] items-center gap-4 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#334155", fontFamily: "var(--font-sora)" }}>
            <span style={{ width: 44 }} />
            <span>Mentor</span>
            <span>Docs</span>
            <span>Rate</span>
            <span>Submitted</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {filtered.map((m) => (
            <MentorRow key={m.id} mentor={m} onReview={() => setReviewing(m)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>No mentors found</h3>
          <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Try adjusting your search or filter.
          </p>
          <button onClick={() => { setSearch(""); setFilter("all"); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", fontFamily: "var(--font-sora)" }}>
            Clear Filters
          </button>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}