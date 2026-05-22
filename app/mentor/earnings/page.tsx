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
  wallet:    "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  download:  "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  check:     "M20 6L9 17l-5-5",
  x:         "M18 6L6 18M6 6l12 12",
  arrow:     "M5 12h14M12 5l7 7-7 7",
  bank:      "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  trending:  "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  calendar:  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  filter:    "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
  search:    "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  info:      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  edit:      "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  clock:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  user:      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  close:     "M18 6L6 18M6 6l12 12",
  lock:      "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
};

/* ── types ───────────────────────────────────────────────── */
type Period = "week" | "month" | "year";
type TxStatus = "paid" | "pending" | "cancelled";

interface Transaction {
  id: string; student: string; avatar: string; color: string;
  subject: string; date: string; amount: number; fee: number;
  net: number; status: TxStatus;
}

interface Payout {
  id: string; amount: number; date: string; bank: string; status: "completed" | "processing";
}

/* ── data ────────────────────────────────────────────────── */
const TRANSACTIONS: Transaction[] = [
  { id:"t1",  student:"Ada Okonkwo",    avatar:"A", color:"#7C3AED", subject:"Physics — Electromagnetic Waves",   date:"Today",        amount:3500, fee:350, net:3150, status:"pending"   },
  { id:"t2",  student:"Tunde Adeola",   avatar:"T", color:"#10B981", subject:"Physics — Mechanics & Motion",      date:"Sun 18 May",   amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t3",  student:"David Eze",      avatar:"D", color:"#2563EB", subject:"Maths — Trigonometric Identities",  date:"Thu 15 May",   amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t4",  student:"Fatima Bello",   avatar:"F", color:"#F59E0B", subject:"Chemistry — Bonding & Structure",   date:"Fri 16 May",   amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t5",  student:"Emeka Nwosu",    avatar:"E", color:"#3B82F6", subject:"Maths — Quadratic Equations",       date:"Thu 15 May",   amount:5000, fee:500, net:4500, status:"paid"      },
  { id:"t6",  student:"Ngozi Eze",      avatar:"N", color:"#EC4899", subject:"Physics — Vectors & Scalars",       date:"Wed 14 May",   amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t7",  student:"Ada Okonkwo",    avatar:"A", color:"#7C3AED", subject:"Physics — Electric Fields",         date:"Mon 12 May",   amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t8",  student:"Tunde Adeola",   avatar:"T", color:"#10B981", subject:"Physics — Waves & Sound",           date:"Sun 11 May",   amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t9",  student:"Rasheed Kazeem", avatar:"R", color:"#F97316", subject:"Physics — Electricity",             date:"Mon 5 May",    amount:5000, fee:500, net:4500, status:"paid"      },
  { id:"t10", student:"Ngozi Eze",      avatar:"N", color:"#EC4899", subject:"Physics — Cancelled",               date:"Wed 14 May",   amount:3500, fee:0,   net:0,    status:"cancelled" },
  { id:"t11", student:"Ada Okonkwo",    avatar:"A", color:"#7C3AED", subject:"Maths — Integration",               date:"Thu 8 May",    amount:3500, fee:350, net:3150, status:"paid"      },
  { id:"t12", student:"David Eze",      avatar:"D", color:"#2563EB", subject:"Maths — Sequences & Series",        date:"Thu 8 May",    amount:5000, fee:500, net:4500, status:"paid"      },
];

const PAYOUTS: Payout[] = [
  { id:"p1", amount:38500, date:"Fri 16 May", bank:"GTBank ••••4821", status:"completed"  },
  { id:"p2", amount:42000, date:"Fri 9 May",  bank:"GTBank ••••4821", status:"completed"  },
  { id:"p3", amount:35700, date:"Fri 2 May",  bank:"GTBank ••••4821", status:"completed"  },
  { id:"p4", amount:29400, date:"Fri 25 Apr", bank:"GTBank ••••4821", status:"completed"  },
  { id:"p5", amount:41300, date:"Fri 23 May", bank:"GTBank ••••4821", status:"processing" },
];

/* chart data */
const WEEK_DATA  = [18000,24000,19000,32000,28000,41000,38500];
const MONTH_DATA = [62000,78000,91000,105000,88000,112000,125000,119000,134000,141000,128000,152000];
const WEEK_LABELS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ── withdraw modal ──────────────────────────────────────── */
function WithdrawModal({ amount, onClose }: { amount: number; onClose: () => void }) {
  const [step, setStep]     = useState<"confirm" | "pin" | "done">("confirm");
  const [pin, setPin]       = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => setStep("pin");

  const handlePay = () => {
    if (pin.length < 4) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>

        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>
            {step === "done" ? "Withdrawal Sent!" : "Withdraw Earnings"}
          </h3>
          {step !== "done" && (
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <Icon d={ic.close} size={18} />
            </button>
          )}
        </div>

        <div className="px-6 py-6 space-y-5">
          {step === "confirm" && (
            <>
              <div className="text-center py-2">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Amount to withdraw</p>
                <p className="font-extrabold text-4xl text-white" style={{ fontFamily: "var(--font-sora)" }}>
                  ₦{amount.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2.5 p-4 rounded-2xl"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Destination",    val: "GTBank ••••4821"  },
                  { label: "Account Name",   val: "Ada Okonkwo"      },
                  { label: "Arrival",        val: "Within 24 hours"  },
                  { label: "Platform Fee",   val: "Already deducted" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-xs"
                    style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                    <span>{r.label}</span>
                    <strong className="text-white">{r.val}</strong>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-sora)" }}>
                  Cancel
                </button>
                <button onClick={handleConfirm}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)", boxShadow: "0 4px 16px rgba(245,158,11,0.35)" }}>
                  <Icon d={ic.wallet} size={15} /> Confirm Withdrawal
                </button>
              </div>
            </>
          )}

          {step === "pin" && (
            <>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B" }}>
                  <Icon d={ic.lock} size={24} />
                </div>
                <p className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Enter your PIN</p>
                <p className="text-xs mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                  Authorise this withdrawal with your 4-digit transaction PIN
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                {[0,1,2,3].map((i) => (
                  <div key={i}
                    className="w-12 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: "#1E293B", border: `1.5px solid ${i < pin.length ? "#F59E0B" : "rgba(255,255,255,0.08)"}`, boxShadow: i < pin.length ? "0 0 12px rgba(245,158,11,0.25)" : "none", fontFamily: "var(--font-sora)" }}>
                    {i < pin.length ? "●" : ""}
                  </div>
                ))}
              </div>

              {/* numpad */}
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k, i) => (
                  <button key={i} disabled={k === ""}
                    onClick={() => {
                      if (k === "⌫") setPin((p) => p.slice(0,-1));
                      else if (typeof k === "number" && pin.length < 4) setPin((p) => p + k);
                    }}
                    className="h-12 rounded-xl text-base font-bold text-white transition-all"
                    style={{ fontFamily: "var(--font-sora)", background: k === "" ? "transparent" : "rgba(30,41,59,0.7)", border: k === "" ? "none" : "1px solid rgba(255,255,255,0.06)" }}
                    onMouseEnter={(e) => { if (k !== "") e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                    onMouseLeave={(e) => { if (k !== "") e.currentTarget.style.background = "rgba(30,41,59,0.7)"; }}>
                    {k}
                  </button>
                ))}
              </div>

              <button onClick={handlePay} disabled={pin.length < 4 || loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: pin.length === 4 && !loading ? "linear-gradient(135deg,#D97706,#F59E0B)" : "#1E293B", color: pin.length === 4 && !loading ? "#0F172A" : "#475569", fontFamily: "var(--font-sora)", cursor: pin.length === 4 && !loading ? "pointer" : "not-allowed", boxShadow: pin.length === 4 && !loading ? "0 6px 24px rgba(245,158,11,0.35)" : "none" }}>
                {loading ? (
                  <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>Processing…</>
                ) : (
                  <>Withdraw ₦{amount.toLocaleString()} <Icon d={ic.arrow} size={16} /></>
                )}
              </button>
            </>
          )}

          {step === "done" && (
            <div className="text-center py-4 space-y-4">
              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
                  <Icon d={ic.check} size={32} />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping opacity-15"
                  style={{ background: "#10B981" }} />
              </div>
              <div>
                <p className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "var(--font-sora)" }}>
                  ₦{amount.toLocaleString()} on its way!
                </p>
                <p className="text-sm" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
                  Your withdrawal has been initiated. Funds will arrive in your GTBank account within 24 hours.
                </p>
              </div>
              <button onClick={onClose}
                className="px-8 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)" }}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── bar chart ───────────────────────────────────────────── */
function BarChart({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const max = Math.max(...data);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-28">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 relative group cursor-default"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            {hovered === i && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap z-10"
                style={{ background: "#1E293B", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.2)", fontFamily: "var(--font-sora)" }}>
                ₦{(v / 1000).toFixed(0)}k
              </div>
            )}
            <div className="w-full rounded-t-lg transition-all duration-300"
              style={{ height: `${Math.max((v / max) * 100, 4)}%`, background: i === data.length - 1 ? color : hovered === i ? color : `${color}50` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {labels.map((l, i) => (
          <div key={i} className="flex-1 text-center text-[9px]"
            style={{ color: i === data.length - 1 ? "#F59E0B" : "#1E293B", fontFamily: "var(--font-dm)" }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ── transaction row ─────────────────────────────────────── */
function TxRow({ tx }: { tx: Transaction }) {
  const statusStyle: Record<TxStatus, { bg: string; color: string; label: string }> = {
    paid:      { bg: "rgba(16,185,129,0.1)",  color: "#10B981", label: "Paid"      },
    pending:   { bg: "rgba(245,158,11,0.1)",  color: "#F59E0B", label: "Pending"   },
    cancelled: { bg: "rgba(239,68,68,0.08)",  color: "#F87171", label: "Cancelled" },
  };
  const s = statusStyle[tx.status];

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 transition-all duration-150"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ background: tx.color, fontFamily: "var(--font-sora)" }}>{tx.avatar}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>{tx.student}</p>
        <p className="text-xs truncate" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>{tx.subject}</p>
      </div>
      <div className="hidden sm:block text-xs flex-shrink-0" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{tx.date}</div>
      <div className="hidden sm:flex items-center gap-1 text-xs flex-shrink-0" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
        <span>₦{tx.amount.toLocaleString()}</span>
        <span>−</span>
        <span style={{ color: "#EF4444" }}>₦{tx.fee}</span>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-bold ${tx.status === "cancelled" ? "" : ""}`}
          style={{ color: tx.status === "cancelled" ? "#334155" : "#10B981", fontFamily: "var(--font-sora)", textDecoration: tx.status === "cancelled" ? "line-through" : "none" }}>
          {tx.status === "cancelled" ? "—" : `₦${tx.net.toLocaleString()}`}
        </p>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: s.bg, color: s.color, fontFamily: "var(--font-sora)" }}>{s.label}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function EarningsPage() {
  const [period, setPeriod]         = useState<Period>("month");
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | TxStatus>("all");
  const [showWithdraw, setShowWithdraw] = useState(false);

  /* summary numbers */
  const pendingAmount     = TRANSACTIONS.filter((t) => t.status === "pending").reduce((a, t) => a + t.net, 0);
  const thisMonthNet      = TRANSACTIONS.filter((t) => t.status === "paid").reduce((a, t) => a + t.net, 0);
  const totalPaidOut      = PAYOUTS.filter((p) => p.status === "completed").reduce((a, p) => a + p.amount, 0);
  const totalEarned       = thisMonthNet + totalPaidOut;
  const completedSessions = TRANSACTIONS.filter((t) => t.status === "paid").length;

  /* filtered transactions */
  const filtered = TRANSACTIONS.filter((t) => {
    const matchSearch = t.student.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="px-5 py-6 max-w-5xl mx-auto">
      {showWithdraw && <WithdrawModal amount={pendingAmount} onClose={() => setShowWithdraw(false)} />}

      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>Earnings</h2>
          <p className="text-sm mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Track your income, payout history, and financial performance.
          </p>
        </div>
        <button onClick={() => {}}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-sora)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
          <Icon d={ic.download} size={15} /> Export CSV
        </button>
      </div>

      {/* top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Total Earned",      val:`₦${(totalEarned/1000).toFixed(0)}k`,     sub:"All time",            color:"#F59E0B", icon:ic.trending },
          { label:"This Month",        val:`₦${(thisMonthNet/1000).toFixed(0)}k`,    sub:"After platform fee",  color:"#10B981", icon:ic.calendar },
          { label:"Pending Payout",    val:`₦${pendingAmount.toLocaleString()}`,      sub:"Releases Friday",     color:"#F59E0B", icon:ic.clock    },
          { label:"Completed Sessions",val:completedSessions.toString(),              sub:"This period",         color:"#2563EB", icon:ic.check    },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${s.color}18`, color: s.color }}>
              <Icon d={s.icon} size={17} />
            </div>
            <div>
              <p className="font-extrabold text-white text-xl leading-none" style={{ fontFamily: "var(--font-sora)" }}>{s.val}</p>
              <p className="text-sm mt-0.5" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>{s.label}</p>
              <p className="text-xs mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* main grid */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">

        {/* earnings chart */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>Earnings Overview</h3>
              <p className="text-xs mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                {period === "week" ? "This week · ₦38,500" : period === "month" ? "This year · ₦892,000" : "All time"}
              </p>
            </div>
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#1E293B" }}>
              {(["week","month"] as Period[]).map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all"
                  style={{ fontFamily: "var(--font-sora)", background: period === p ? "linear-gradient(135deg,#D97706,#F59E0B)" : "transparent", color: period === p ? "#0F172A" : "#475569" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <BarChart
            data={period === "week" ? WEEK_DATA : MONTH_DATA}
            labels={period === "week" ? WEEK_LABELS : MONTH_LABELS}
            color="#F59E0B"
          />
        </div>

        {/* payout panel */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>

          {/* balance */}
          <div className="p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#1C1507,#1a1040)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.1) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>Available Balance</p>
              <p className="font-extrabold text-white" style={{ fontFamily: "var(--font-sora)", fontSize: "2rem" }}>
                ₦{pendingAmount.toLocaleString()}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>After 10% platform fee</p>
            </div>
          </div>

          {/* bank info */}
          <div className="px-5 py-3 flex items-center gap-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
              <Icon d={ic.bank} size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-sora)" }}>GTBank ••••4821</p>
              <p className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Ada Okonkwo · Next payout: Friday</p>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors flex-shrink-0">
              <Icon d={ic.edit} size={14} />
            </button>
          </div>

          {/* withdraw button */}
          <div className="px-5 pt-4 pb-3">
            <button onClick={() => setShowWithdraw(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)", boxShadow: "0 6px 24px rgba(245,158,11,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(245,158,11,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,158,11,0.35)"; }}>
              <Icon d={ic.wallet} size={16} /> Withdraw Now
            </button>
            <p className="text-center text-[10px] mt-2" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>
              Minimum withdrawal: ₦1,000
            </p>
          </div>

          {/* payout history */}
          <div className="px-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Payout History</p>
            <div className="space-y-2">
              {PAYOUTS.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs py-1.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#64748B", fontFamily: "var(--font-dm)" }}>
                  <div>
                    <p className="text-white font-semibold" style={{ fontFamily: "var(--font-sora)" }}>₦{p.amount.toLocaleString()}</p>
                    <p className="text-[10px]" style={{ color: "#334155" }}>{p.date} · {p.bank}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: p.status === "completed" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: p.status === "completed" ? "#10B981" : "#F59E0B", fontFamily: "var(--font-sora)" }}>
                    {p.status === "completed" ? "Paid" : "Processing"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* transaction table */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>

        {/* table header */}
        <div className="px-5 py-4 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>
            Transaction History
            <span className="ml-2 text-xs font-normal" style={{ color: "#334155" }}>({filtered.length})</span>
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {/* search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
                <Icon d={ic.search} size={13} />
              </span>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="pl-8 pr-3 py-2 rounded-xl text-xs text-white outline-none"
                style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)", width: 160 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#F59E0B"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }} />
            </div>

            {/* status filter */}
            {(["all","paid","pending","cancelled"] as const).map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all"
                style={{ fontFamily: "var(--font-sora)", background: filterStatus === s ? "rgba(245,158,11,0.12)" : "rgba(30,41,59,0.5)", color: filterStatus === s ? "#F59E0B" : "#475569", border: `1px solid ${filterStatus === s ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.05)"}` }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* column headers */}
        <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#334155", fontFamily: "var(--font-sora)" }}>
          <span style={{ width: 36 }}></span>
          <span>Student / Session</span>
          <span>Date</span>
          <span>Gross / Fee</span>
          <span className="text-right">Net</span>
        </div>

        {/* rows */}
        {filtered.length > 0 ? (
          filtered.map((tx) => <TxRow key={tx.id} tx={tx} />)
        ) : (
          <div className="text-center py-12">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>No transactions found</p>
            <button onClick={() => { setSearch(""); setFilterStatus("all"); }}
              className="mt-3 px-5 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#0F172A", fontFamily: "var(--font-sora)" }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* footer summary */}
        {filtered.length > 0 && (
          <div className="px-5 py-3.5 flex items-center justify-between text-xs"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#475569", fontFamily: "var(--font-dm)" }}>
            <span>{filtered.length} transactions</span>
            <div className="flex items-center gap-4">
              <span>
                Gross: <strong className="text-white">₦{filtered.filter((t) => t.status !== "cancelled").reduce((a, t) => a + t.amount, 0).toLocaleString()}</strong>
              </span>
              <span>
                Fees: <strong style={{ color: "#EF4444" }}>₦{filtered.filter((t) => t.status !== "cancelled").reduce((a, t) => a + t.fee, 0).toLocaleString()}</strong>
              </span>
              <span>
                Net: <strong style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>₦{filtered.filter((t) => t.status !== "cancelled").reduce((a, t) => a + t.net, 0).toLocaleString()}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* fee info */}
      <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-2xl"
        style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)" }}>
        <span style={{ color: "#60A5FA", flexShrink: 0, marginTop: 1 }}><Icon d={ic.info} size={14} /></span>
        <p className="text-xs leading-relaxed" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          Class5 AI deducts a <strong className="text-white">10% platform fee</strong> from each session. Payouts are processed every <strong className="text-white">Friday</strong>. Minimum withdrawal is ₦1,000. For disputes or payment issues, contact{" "}
          <a href="mailto:payments@class5.ai" style={{ color: "#60A5FA" }}>payments@class5.ai</a>.
        </p>
      </div>

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes ping  { 75%,100%{transform:scale(2);opacity:0} }
        .animate-ping { animation: ping 1.3s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </div>
  );
}