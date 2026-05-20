"use client";

import { useState } from "react";
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
  arrow:    "M5 12h14M12 5l7 7-7 7",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  video:    "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
};

/* ── shared card ─────────────────────────────────────────── */
function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", ...style }}>
      {children}
    </div>
  );
}

/* ── stat card ───────────────────────────────────────────── */
function StatCard({ label, value, sub, icon, color, trend, prefix="" }: {
  label:string; value:string; sub:string; icon:string; color:string; trend?:string; prefix?:string;
}) {
  return (
    <Card className="p-5 flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-200 cursor-default">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background:`${color}18`, color }}>
          <Icon d={icon} size={19} />
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background:"rgba(16,185,129,0.12)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="font-extrabold text-white leading-none"
          style={{ fontFamily:"var(--font-sora)", fontSize:"1.75rem" }}>
          {prefix}{value}
        </p>
        <p className="text-sm font-medium mt-0.5" style={{ color:"#94A3B8", fontFamily:"var(--font-dm)" }}>{label}</p>
        <p className="text-xs mt-1" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{sub}</p>
      </div>
    </Card>
  );
}

/* ── session request card ────────────────────────────────── */
function RequestCard({ student, subject, date, time, onAccept, onDecline }: {
  student:string; subject:string; date:string; time:string;
  onAccept:()=>void; onDecline:()=>void;
}) {
  const [status, setStatus] = useState<"pending"|"accepted"|"declined">("pending");
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl transition-all"
      style={{ background: status==="accepted" ? "rgba(16,185,129,0.07)" : status==="declined" ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.02)", border:`1px solid ${status==="accepted" ? "rgba(16,185,129,0.2)" : status==="declined" ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.05)"}` }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>
        {student[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>{student}</p>
        <p className="text-xs truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{subject} · {date} at {time}</p>
      </div>
      {status === "pending" ? (
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => { setStatus("declined"); onDecline(); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background:"rgba(239,68,68,0.1)", color:"#F87171" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="rgba(239,68,68,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(239,68,68,0.1)"; }}>
            <Icon d={ic.x} size={15} />
          </button>
          <button onClick={() => { setStatus("accepted"); onAccept(); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background:"rgba(16,185,129,0.15)", color:"#10B981" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="rgba(16,185,129,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(16,185,129,0.15)"; }}>
            <Icon d={ic.check} size={15} />
          </button>
        </div>
      ) : (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: status==="accepted" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)", color: status==="accepted" ? "#10B981" : "#F87171", fontFamily:"var(--font-sora)" }}>
          {status==="accepted" ? "Accepted" : "Declined"}
        </span>
      )}
    </div>
  );
}

/* ── upcoming session card ───────────────────────────────── */
function UpcomingSession({ student, subject, time, avatar, avatarColor, isNext }: {
  student:string; subject:string; time:string; avatar:string; avatarColor:string; isNext?:boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl transition-all"
      style={{ background: isNext ? "rgba(245,158,11,0.07)" : "rgba(255,255,255,0.02)", border:`1px solid ${isNext ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.04)"}` }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        style={{ background:avatarColor, fontFamily:"var(--font-sora)" }}>{avatar}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>{student}</p>
        <p className="text-xs truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{subject}</p>
      </div>
      <div className="text-right flex-shrink-0 space-y-1">
        <p className="text-xs font-bold" style={{ color: isNext ? "#F59E0B" : "#64748B", fontFamily:"var(--font-sora)" }}>{time}</p>
        {isNext && (
          <button className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white transition-all"
            style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>
            <Icon d={ic.video} size={11} /> Join
          </button>
        )}
      </div>
    </div>
  );
}

/* ── review card ─────────────────────────────────────────── */
function ReviewCard({ student, rating, text, time, avatar, avatarColor }: {
  student:string; rating:number; text:string; time:string; avatar:string; avatarColor:string;
}) {
  return (
    <div className="p-4 rounded-2xl space-y-3"
      style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.04)" }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background:avatarColor, fontFamily:"var(--font-sora)" }}>{avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-white text-sm font-semibold" style={{ fontFamily:"var(--font-sora)" }}>{student}</p>
            <span className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{time}</span>
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width={12} height={12} viewBox="0 0 24 24"
                fill={s<=rating ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.8}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>&ldquo;{text}&rdquo;</p>
    </div>
  );
}

/* ── earnings mini chart ─────────────────────────────────── */
function EarningsChart({ data, color }: { data:number[]; color:string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-lg transition-all duration-500 relative group"
          style={{ height:`${(v/max)*100}%`, background: i===data.length-1 ? color : `${color}40`, minWidth:8 }}>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{ color, fontFamily:"var(--font-sora)" }}>
            ₦{v.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── activity item ───────────────────────────────────────── */
function ActivityItem({ icon, color, text, time, badge }: { icon:string; color:string; text:string; time:string; badge?:string; }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background:`${color}14`, color }}>
        <Icon d={icon} size={15} />
      </div>
      <p className="flex-1 text-sm text-white truncate" style={{ fontFamily:"var(--font-dm)" }}>{text}</p>
      <div className="text-right flex-shrink-0">
        {badge && <p className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{badge}</p>}
        <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{time}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN DASHBOARD PAGE
══════════════════════════════════════════════════════════ */
export default function MentorDashboard() {
  const [earningsPeriod, setEarningsPeriod] = useState<"week"|"month">("week");

  const weeklyData  = [18000,24000,19000,32000,28000,41000,38500];
  const monthlyData = [62000,78000,91000,105000,88000,112000,125000,119000,134000,141000,128000,152000];

  const stats = [
    { label:"This Month",      value:"152,500", prefix:"₦", sub:"₦41,000 this week",    icon:ic.wallet,   color:"#F59E0B", trend:"+18%" },
    { label:"Total Sessions",  value:"234",     prefix:"",  sub:"14 this month",         icon:ic.calendar, color:"#2563EB", trend:"+7"   },
    { label:"Active Students", value:"89",      prefix:"",  sub:"12 new this month",     icon:ic.users,    color:"#10B981", trend:"+12"  },
    { label:"Avg. Rating",     value:"4.9",     prefix:"",  sub:"From 142 reviews",      icon:ic.star,     color:"#F59E0B"              },
  ];

  const requests = [
    { student:"Amara Okonkwo",  subject:"Physics — Waves",         date:"Today",    time:"4:00 PM" },
    { student:"Emeka Nwosu",    subject:"Mathematics — Calculus",   date:"Tomorrow", time:"10:00 AM"},
    { student:"Ngozi Eze",      subject:"Physics — Optics",         date:"Wed 22",   time:"2:00 PM" },
  ];

  const upcoming = [
    { student:"Ada Okonkwo",   subject:"Biology — Cell Division", time:"Today 3:00 PM",   avatar:"A", avatarColor:"#7C3AED",  isNext:true },
    { student:"Tunde Adeola",  subject:"Physics — Mechanics",     time:"Today 5:30 PM",   avatar:"T", avatarColor:"#10B981"              },
    { student:"Fatima Bello",  subject:"Chemistry — Organics",    time:"Tomorrow 9:00 AM",avatar:"F", avatarColor:"#F59E0B"              },
    { student:"David Eze",     subject:"Maths — Trigonometry",    time:"Tomorrow 2:00 PM",avatar:"D", avatarColor:"#2563EB"              },
  ];

  const reviews = [
    { student:"Ada Okonkwo",  rating:5, time:"2h ago",   avatar:"A", avatarColor:"#7C3AED", text:"Dr. Okonkwo explained electromagnetic waves so clearly! I finally understand the concept after weeks of confusion. Highly recommended." },
    { student:"Tunde A.",     rating:5, time:"1d ago",   avatar:"T", avatarColor:"#10B981", text:"Best Physics tutor on this platform. Very patient and breaks everything down step by step. My JAMB score improved from 210 to 268." },
    { student:"Ngozi E.",     rating:4, time:"3d ago",   avatar:"N", avatarColor:"#EC4899", text:"Great session on optics. Would love if sessions were a bit longer. Still very helpful overall." },
  ];

  const activity = [
    { icon:ic.check,   color:"#10B981", text:"Session with Ada Okonkwo completed — Physics",   time:"2h ago",   badge:"₦3,150" },
    { icon:ic.star,    color:"#F59E0B", text:"New 5-star review from Tunde Adeola",             time:"1d ago",   badge:undefined},
    { icon:ic.users,   color:"#2563EB", text:"New student Ngozi Eze booked a session",           time:"1d ago",   badge:undefined},
    { icon:ic.wallet,  color:"#F59E0B", text:"Payout of ₦38,500 processed to GTBank",           time:"2d ago",   badge:"Paid"   },
    { icon:ic.calendar,color:"#7C3AED", text:"3 new session requests received",                  time:"2d ago",   badge:undefined},
    { icon:ic.check,   color:"#10B981", text:"Session with David Eze completed — Maths",         time:"3d ago",   badge:"₦2,250" },
  ];

  return (
    <div className="px-5 py-6 max-w-7xl mx-auto space-y-6">

      {/* ── welcome banner ──────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden p-6"
        style={{ background:"linear-gradient(135deg,#1C1507 0%,#1E1B04 40%,#0F172A 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full"
            style={{ width:400, height:400, top:"-30%", right:"0%", background:"rgba(245,158,11,0.12)", filter:"blur(80px)" }} />
          <div className="absolute rounded-full"
            style={{ width:250, height:250, bottom:"-20%", left:"20%", background:"rgba(217,119,6,0.08)", filter:"blur(60px)" }} />
          <div className="absolute inset-0"
            style={{ backgroundImage:"linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)", backgroundSize:"52px 52px" }} />
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm mb-1" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>Good morning 👋</p>
            <h2 className="text-white font-extrabold mb-1"
              style={{ fontFamily:"var(--font-sora)", fontSize:"clamp(1.3rem,2.5vw,1.75rem)" }}>
              Welcome back, Dr. Ada!
            </h2>
            <p className="text-sm" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
              You have <span className="font-bold" style={{ color:"#F59E0B" }}>2 sessions today</span> and{" "}
              <span className="font-bold" style={{ color:"#F59E0B" }}>3 pending requests</span> waiting.
            </p>
          </div>

          {/* quick action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
            <Link href="/mentor/sessions"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 4px 16px rgba(245,158,11,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(245,158,11,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(245,158,11,0.35)"; }}>
              <Icon d={ic.calendar} size={15} /> View Sessions
            </Link>
            <Link href="/mentor/earnings"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#F8FAFC", fontFamily:"var(--font-sora)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}>
              <Icon d={ic.wallet} size={15} /> Earnings
            </Link>
          </div>
        </div>
      </div>

      {/* ── stats ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── pending requests ────────────────────────── */}
      {requests.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Session Requests</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background:"rgba(245,158,11,0.15)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
                {requests.length} pending
              </span>
            </div>
            <Link href="/mentor/sessions" className="text-xs font-semibold transition-colors"
              style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
              View all
            </Link>
          </div>
          <div className="space-y-2.5">
            {requests.map((r, i) => (
              <RequestCard key={i} {...r} onAccept={() => {}} onDecline={() => {}} />
            ))}
          </div>
        </Card>
      )}

      {/* ── middle row ──────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* upcoming sessions */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Upcoming Sessions</h3>
            <Link href="/mentor/sessions" className="text-xs font-semibold transition-colors"
              style={{ color:"#2563EB", fontFamily:"var(--font-sora)" }}>
              Full schedule
            </Link>
          </div>
          <div className="space-y-2.5">
            {upcoming.map((s, i) => <UpcomingSession key={i} {...s} />)}
          </div>
        </Card>

        {/* earnings snapshot */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Earnings</h3>
            <div className="flex gap-1 p-0.5 rounded-lg" style={{ background:"#1E293B" }}>
              {(["week","month"] as const).map((p) => (
                <button key={p} onClick={() => setEarningsPeriod(p)}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition-all"
                  style={{ fontFamily:"var(--font-sora)", background: earningsPeriod===p ? "linear-gradient(135deg,#D97706,#F59E0B)" : "transparent", color: earningsPeriod===p ? "#0F172A" : "#475569" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <p className="font-extrabold text-white" style={{ fontFamily:"var(--font-sora)", fontSize:"1.75rem" }}>
              ₦{earningsPeriod==="week" ? "38,500" : "152,500"}
            </p>
            <p className="text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
              {earningsPeriod==="week" ? "this week" : "this month"} · after 10% fee
            </p>
          </div>

          <EarningsChart data={earningsPeriod==="week" ? weeklyData : monthlyData} color="#F59E0B" />

          <div className="flex gap-1 mt-1 mb-4">
            {(earningsPeriod==="week" ? ["M","T","W","T","F","S","S"] : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]).map((l,i) => (
              <div key={i} className="flex-1 text-center text-[9px]" style={{ color:"#1E293B", fontFamily:"var(--font-dm)" }}>{l}</div>
            ))}
          </div>

          {/* payout info */}
          <div className="pt-4 space-y-2" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label:"Pending payout",  val:"₦38,500",  color:"#F59E0B" },
              { label:"Next payout",     val:"Friday",   color:"#10B981" },
              { label:"Total earned",    val:"₦892,000", color:"#94A3B8" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between text-xs"
                style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                <span>{r.label}</span>
                <strong style={{ color:r.color, fontFamily:"var(--font-sora)" }}>{r.val}</strong>
              </div>
            ))}
            <Link href="/mentor/earnings"
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 4px 14px rgba(245,158,11,0.3)" }}>
              <Icon d={ic.wallet} size={13} /> Withdraw Earnings
            </Link>
          </div>
        </Card>
      </div>

      {/* ── bottom row ──────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* recent reviews */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Recent Reviews</h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background:"rgba(245,158,11,0.1)" }}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth={1}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-xs font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>4.9</span>
              </div>
            </div>
            <span className="text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>142 total reviews</span>
          </div>
          <div className="space-y-3">
            {reviews.map((r, i) => <ReviewCard key={i} {...r} />)}
          </div>
        </Card>

        {/* activity feed */}
        <Card className="p-5">
          <h3 className="text-white font-bold text-sm mb-4" style={{ fontFamily:"var(--font-sora)" }}>Recent Activity</h3>
          <div className="space-y-0.5 divide-y" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
            {activity.map((a, i) => <ActivityItem key={i} {...a} />)}
          </div>
        </Card>
      </div>

      {/* ── performance tips ────────────────────────── */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>💡 Tips to Grow Your Tutoring Business</h3>
          <span className="text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>Personalised for you</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon:ic.calendar, color:"#2563EB", title:"Add more availability",   desc:"Mentors with 10+ weekly slots get 3× more bookings on average." },
            { icon:ic.book,     color:"#7C3AED", title:"Share study resources",   desc:"Upload past question papers or study guides to attract more students." },
            { icon:ic.star,     color:"#F59E0B", title:"Request reviews",         desc:"After each session, remind students to leave a rating. Reviews boost visibility." },
          ].map((t) => (
            <div key={t.title} className="flex items-start gap-3 p-3.5 rounded-xl"
              style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.04)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background:`${t.color}14`, color:t.color }}>
                <Icon d={t.icon} size={15} />
              </div>
              <div>
                <p className="text-white text-xs font-bold mb-0.5" style={{ fontFamily:"var(--font-sora)" }}>{t.title}</p>
                <p className="text-xs leading-relaxed" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}