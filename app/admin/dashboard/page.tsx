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
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  alert:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  video:    "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  flag:     "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
};

/* ── shared card ─────────────────────────────────────────── */
function Card({ children, className="" }: { children:React.ReactNode; className?:string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(10px)" }}>
      {children}
    </div>
  );
}

/* ── stat card ───────────────────────────────────────────── */
function StatCard({ label, value, sub, icon, color, trend, trendUp=true }: {
  label:string; value:string; sub:string; icon:string; color:string; trend?:string; trendUp?:boolean;
}) {
  return (
    <Card className="p-5 flex flex-col gap-3 hover:scale-[1.01] transition-transform cursor-default">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background:`${color}18`, color }}>
          <Icon d={icon} size={19}/>
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: trendUp?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.1)", color: trendUp?"#10B981":"#F87171", fontFamily:"var(--font-sora)" }}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="font-extrabold text-white leading-none" style={{ fontFamily:"var(--font-sora)", fontSize:"1.75rem" }}>{value}</p>
        <p className="text-sm font-medium mt-0.5" style={{ color:"#94A3B8", fontFamily:"var(--font-dm)" }}>{label}</p>
        <p className="text-xs mt-1" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{sub}</p>
      </div>
    </Card>
  );
}

/* ── mini bar chart ──────────────────────────────────────── */
function MiniChart({ data, color }: { data:number[]; color:string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-14">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-sm transition-all"
          style={{ height:`${Math.max((v/max)*100,4)}%`, background: i===data.length-1?color:`${color}40` }}/>
      ))}
    </div>
  );
}

/* ── mentor verification row ────────────────────────────── */
function PendingMentorRow({ mentor, onApprove, onReject }: {
  mentor:{ id:string; name:string; avatar:string; color:string; subject:string; date:string; docs:number };
  onApprove:()=>void; onDecline:()=>void; onReject:()=>void;
}) {
  const [status, setStatus] = useState<"pending"|"approved"|"rejected">("pending");
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 transition-all"
      style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
      onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";}}
      onMouseLeave={(e)=>{e.currentTarget.style.background="transparent";}}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ background:mentor.color, fontFamily:"var(--font-sora)" }}>{mentor.avatar}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>{mentor.name}</p>
        <p className="text-xs truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
          {mentor.subject} · {mentor.docs} docs · Submitted {mentor.date}
        </p>
      </div>
      {status === "pending" ? (
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/admin/mentors"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background:"rgba(37,99,235,0.12)", color:"#60A5FA", border:"1px solid rgba(37,99,235,0.2)", fontFamily:"var(--font-sora)" }}>
            Review
          </Link>
          <button onClick={()=>{setStatus("rejected"); onReject();}}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background:"rgba(239,68,68,0.1)", color:"#F87171" }}
            onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(239,68,68,0.2)";}}
            onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(239,68,68,0.1)";}}>
            <Icon d={ic.x} size={13}/>
          </button>
          <button onClick={()=>{setStatus("approved"); onApprove();}}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background:"rgba(16,185,129,0.12)", color:"#10B981" }}
            onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(16,185,129,0.22)";}}
            onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(16,185,129,0.12)";}}>
            <Icon d={ic.check} size={13}/>
          </button>
        </div>
      ) : (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: status==="approved"?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.1)", color: status==="approved"?"#10B981":"#F87171", fontFamily:"var(--font-sora)" }}>
          {status==="approved"?"Approved":"Rejected"}
        </span>
      )}
    </div>
  );
}

/* ── recent signup row ───────────────────────────────────── */
function SignupRow({ name, role, avatar, color, time, subject }: {
  name:string; role:"student"|"mentor"; avatar:string; color:string; time:string; subject?:string;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ background:color, fontFamily:"var(--font-sora)" }}>{avatar}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>{name}</p>
        <p className="text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
          {subject || (role==="student"?"New student":"New mentor application")}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: role==="mentor"?"rgba(245,158,11,0.1)":"rgba(37,99,235,0.1)", color: role==="mentor"?"#F59E0B":"#60A5FA", fontFamily:"var(--font-sora)" }}>
          {role==="mentor"?"Mentor":"Student"}
        </span>
        <p className="text-[10px] mt-0.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{time}</p>
      </div>
    </div>
  );
}

/* ── active session row ──────────────────────────────────── */
function ActiveSessionRow({ student, mentor, subject, duration, type }: {
  student:string; mentor:string; subject:string; duration:string; type:"video"|"voice";
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: type==="video"?"rgba(37,99,235,0.12)":"rgba(16,185,129,0.12)", color: type==="video"?"#60A5FA":"#10B981" }}>
        <Icon d={type==="video"?ic.video:ic.message} size={14}/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>
          {student} ↔ {mentor}
        </p>
        <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{subject}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
        <span className="text-[10px] font-semibold" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>{duration}</span>
      </div>
    </div>
  );
}

/* ── revenue chart (bar) ─────────────────────────────────── */
function RevenueChart({ period }: { period:"week"|"month" }) {
  const [hovered, setHovered] = useState<number|null>(null);
  const weekData  = [48000, 62000, 55000, 78000, 71000, 89000, 95000];
  const monthData = [210000,245000,198000,312000,289000,354000,401000,378000,423000,467000,441000,512000];
  const wLabels   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const mLabels   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const data   = period==="week"?weekData:monthData;
  const labels = period==="week"?wLabels:mLabels;
  const max = Math.max(...data);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-32">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 relative cursor-default"
            onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
            {hovered===i && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap z-10"
                style={{ background:"#1E293B", color:"#2563EB", border:"1px solid rgba(37,99,235,0.2)", fontFamily:"var(--font-sora)" }}>
                ₦{(v/1000).toFixed(0)}k
              </div>
            )}
            <div className="w-full rounded-t-lg transition-all duration-200"
              style={{ height:`${Math.max((v/max)*100,4)}%`, background: i===data.length-1?"#2563EB":hovered===i?"#2563EB":"rgba(37,99,235,0.35)" }}/>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {labels.map((l,i) => (
          <div key={i} className="flex-1 text-center text-[9px]"
            style={{ color: i===data.length-1?"#2563EB":"#1E293B", fontFamily:"var(--font-dm)" }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ── platform health bar ─────────────────────────────────── */
function HealthBar({ label, value, color }: { label:string; value:number; color:string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
        <span>{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width:`${value}%`, background:`linear-gradient(90deg,${color},${color}88)` }}/>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN DASHBOARD
════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [revPeriod, setRevPeriod] = useState<"week"|"month">("month");

  const stats = [
    { label:"Total Students",   value:"12,483", sub:"+248 this week",   icon:ic.users,   color:"#2563EB", trend:"+2.0%" },
    { label:"Active Mentors",   value:"498",    sub:"34 pending review", icon:ic.shield,  color:"#F59E0B", trend:"+12"   },
    { label:"Platform Revenue", value:"₦2.8M",  sub:"This month",        icon:ic.wallet,  color:"#10B981", trend:"+18%"  },
    { label:"Sessions Today",   value:"147",    sub:"24 live right now",  icon:ic.calendar,color:"#7C3AED", trend:"+23"   },
    { label:"AI Tool Uses",     value:"9,240",  sub:"Summaries & quizzes",icon:ic.zap,    color:"#2563EB", trend:"+8%"   },
    { label:"Avg Session Rating",value:"4.8",   sub:"Across all mentors", icon:ic.star,   color:"#F59E0B"               },
  ];

  const pendingMentors = [
    { id:"m1", name:"Dr. Emeka Chukwu",  avatar:"EC", color:"#2563EB", subject:"Physics · Mathematics",  date:"2h ago",  docs:3 },
    { id:"m2", name:"Miss Aisha Garba",  avatar:"AG", color:"#F59E0B", subject:"Chemistry · Biology",    date:"5h ago",  docs:2 },
    { id:"m3", name:"Mr. Bola Adewale",  avatar:"BA", color:"#10B981", subject:"Economics · Mathematics",date:"1d ago",  docs:3 },
  ];

  const recentSignups = [
    { name:"Chukwuemeka Ike",  role:"student" as const, avatar:"C", color:"#3B82F6", time:"2m ago",  subject:"Joined · Biology" },
    { name:"Dr. Emeka Chukwu", role:"mentor"  as const, avatar:"E", color:"#2563EB", time:"2h ago",  subject:"Applied · Physics" },
    { name:"Fatima Sani",      role:"student" as const, avatar:"F", color:"#F59E0B", time:"3h ago",  subject:"Joined · Chemistry" },
    { name:"Miss Aisha Garba", role:"mentor"  as const, avatar:"A", color:"#10B981", time:"5h ago",  subject:"Applied · Chemistry" },
    { name:"Tunde Ojo",        role:"student" as const, avatar:"T", color:"#7C3AED", time:"6h ago",  subject:"Joined · Mathematics" },
    { name:"Ngozi Uche",       role:"student" as const, avatar:"N", color:"#EC4899", time:"8h ago",  subject:"Joined · English" },
  ];

  const activeSessions = [
    { student:"Ada Okonkwo",   mentor:"Dr. Adewale",  subject:"Physics — Waves",      duration:"14:32", type:"video" as const },
    { student:"Tunde Adeola",  mentor:"Mrs. Bello",   subject:"Chemistry — Organics", duration:"08:15", type:"voice" as const },
    { student:"Emeka Nwosu",   mentor:"Dr. Ibrahim",  subject:"Maths — Calculus",     duration:"32:41", type:"video" as const },
    { student:"Fatima Kano",   mentor:"Miss Eze",     subject:"English — Essay",      duration:"05:03", type:"video" as const },
  ];

  const topMentors = [
    { name:"Dr. Adewale Okafor", sessions:234, rating:4.9, revenue:"₦892k", avatar:"AO", color:"#2563EB" },
    { name:"Mrs. Fatima Bello",  sessions:198, rating:4.8, revenue:"₦714k", avatar:"FB", color:"#7C3AED" },
    { name:"Mr. Emeka Nwosu",    sessions:167, rating:4.7, revenue:"₦601k", avatar:"EN", color:"#F59E0B" },
    { name:"Miss Chinwe Eze",    sessions:154, rating:4.9, revenue:"₦554k", avatar:"CE", color:"#EC4899" },
    { name:"Prof. Yusuf Ibrahim",sessions:121, rating:4.6, revenue:"₦436k", avatar:"YI", color:"#10B981" },
  ];

  const signupTrend = [120,145,132,178,165,201,195,234,218,267,248,290];

  return (
    <div className="px-5 py-6 max-w-7xl mx-auto space-y-6">

      {/* ── welcome banner ──────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden p-6"
        style={{ background:"linear-gradient(135deg,#0D1B2E 0%,#0F1E3D 50%,#0A1120 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full"
            style={{ width:400, height:400, top:"-30%", right:"0%", background:"rgba(37,99,235,0.12)", filter:"blur(80px)" }}/>
          <div className="absolute rounded-full"
            style={{ width:250, height:250, bottom:"-20%", left:"25%", background:"rgba(124,58,237,0.08)", filter:"blur(60px)" }}/>
          <div className="absolute inset-0"
            style={{ backgroundImage:"linear-gradient(rgba(37,99,235,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.03) 1px,transparent 1px)", backgroundSize:"52px 52px" }}/>
        </div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm mb-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>Good morning 👋</p>
            <h2 className="text-white font-extrabold mb-1"
              style={{ fontFamily:"var(--font-sora)", fontSize:"clamp(1.3rem,2.5vw,1.75rem)" }}>
              Platform Overview
            </h2>
            <p className="text-sm" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
              <span className="font-bold" style={{ color:"#F59E0B" }}>3 mentor applications</span> pending review ·{" "}
              <span className="font-bold" style={{ color:"#10B981" }}>24 live sessions</span> right now
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/admin/mentors"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#0F172A", fontFamily:"var(--font-sora)", boxShadow:"0 4px 16px rgba(245,158,11,0.35)" }}>
              <Icon d={ic.shield} size={15}/> Review Mentors
            </Link>
            <Link href="/admin/analytics"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", fontFamily:"var(--font-sora)" }}>
              <Icon d={ic.trending} size={15}/> Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* ── stats row ───────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── middle row ──────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* revenue chart */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Platform Revenue</h3>
              <p className="text-xs mt-0.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
                {revPeriod==="week" ? "This week · ₦508,000" : "This year · ₦3.9M"}
              </p>
            </div>
            <div className="flex gap-1 p-1 rounded-xl" style={{ background:"#1E293B" }}>
              {(["week","month"] as const).map((p) => (
                <button key={p} onClick={() => setRevPeriod(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all"
                  style={{ fontFamily:"var(--font-sora)", background: revPeriod===p?"linear-gradient(135deg,#2563EB,#7C3AED)":"transparent", color: revPeriod===p?"#fff":"#475569" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <RevenueChart period={revPeriod} />
          </div>
        </Card>

        {/* platform health */}
        <Card className="p-5">
          <h3 className="text-white font-bold text-sm mb-4" style={{ fontFamily:"var(--font-sora)" }}>Platform Health</h3>
          <div className="space-y-4 mb-5">
            <HealthBar label="Mentor Approval Rate"    value={87} color="#10B981"/>
            <HealthBar label="Session Completion Rate" value={94} color="#2563EB"/>
            <HealthBar label="Student Retention (30d)" value={78} color="#7C3AED"/>
            <HealthBar label="Payment Success Rate"    value={99} color="#F59E0B"/>
            <HealthBar label="AI Tool Usage / DAU"     value={62} color="#06B6D4"/>
          </div>
          <div className="pt-4 space-y-2" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label:"Server Uptime",   val:"99.98%", color:"#10B981" },
              { label:"Avg Response",    val:"142ms",  color:"#2563EB" },
              { label:"Active Errors",   val:"0",      color:"#10B981" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between text-xs"
                style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                <span>{r.label}</span>
                <strong style={{ color:r.color, fontFamily:"var(--font-sora)" }}>{r.val}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── bottom row ──────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* pending mentor verification */}
        <Card className="lg:col-span-1">
          <div className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Pending Reviews</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background:"rgba(245,158,11,0.15)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
                {pendingMentors.length}
              </span>
            </div>
            <Link href="/admin/mentors" className="text-xs font-semibold transition-colors"
              style={{ color:"#2563EB", fontFamily:"var(--font-sora)" }}>
              View all
            </Link>
          </div>
          {pendingMentors.map((m) => (
            <PendingMentorRow key={m.id} mentor={m}
              onApprove={() => {}} onDecline={() => {}} onReject={() => {}} />
          ))}
          <div className="px-5 py-3">
            <Link href="/admin/mentors"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.15)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
              <Icon d={ic.shield} size={13}/> Open Verification Queue
            </Link>
          </div>
        </Card>

        {/* live sessions + recent signups */}
        <div className="space-y-5">
          {/* live sessions */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Live Sessions</h3>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                  style={{ background:"rgba(239,68,68,0.1)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
                  <span className="text-[10px] font-bold" style={{ color:"#F87171", fontFamily:"var(--font-sora)" }}>24 live</span>
                </div>
              </div>
              <Link href="/admin/sessions" className="text-xs font-semibold" style={{ color:"#2563EB", fontFamily:"var(--font-sora)" }}>
                Monitor
              </Link>
            </div>
            <div className="space-y-0.5 divide-y" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
              {activeSessions.map((s,i) => <ActiveSessionRow key={i} {...s} />)}
            </div>
          </Card>

          {/* signup trend mini */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>New Signups (12mo)</h3>
              <span className="text-xs font-bold" style={{ color:"#10B981", fontFamily:"var(--font-sora)" }}>+290 this month</span>
            </div>
            <MiniChart data={signupTrend} color="#2563EB" />
          </Card>
        </div>

        {/* top mentors + recent signups */}
        <div className="space-y-5">
          {/* top mentors */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Top Mentors</h3>
              <Link href="/admin/mentors" className="text-xs font-semibold" style={{ color:"#2563EB", fontFamily:"var(--font-sora)" }}>
                All mentors
              </Link>
            </div>
            <div className="space-y-3">
              {topMentors.map((m, i) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-4 text-center flex-shrink-0"
                    style={{ color: i===0?"#F59E0B":i===1?"#94A3B8":i===2?"#CD7C3A":"#334155", fontFamily:"var(--font-sora)" }}>
                    {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
                  </span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background:m.color, fontFamily:"var(--font-sora)" }}>{m.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>{m.name}</p>
                    <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{m.sessions} sessions</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold" style={{ color:"#10B981", fontFamily:"var(--font-sora)" }}>{m.revenue}</p>
                    <div className="flex items-center gap-0.5 justify-end">
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth={1}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-[10px] font-bold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{m.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* recent signups */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily:"var(--font-sora)" }}>Recent Signups</h3>
              <Link href="/admin/students" className="text-xs font-semibold" style={{ color:"#2563EB", fontFamily:"var(--font-sora)" }}>
                All users
              </Link>
            </div>
            <div className="space-y-0.5 divide-y" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
              {recentSignups.map((s,i) => <SignupRow key={i} {...s} />)}
            </div>
          </Card>
        </div>
      </div>

      {/* ── platform alerts ──────────────────────── */}
      <Card className="p-5">
        <h3 className="text-white font-bold text-sm mb-4" style={{ fontFamily:"var(--font-sora)" }}>⚡ Platform Alerts</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon:ic.alert,  color:"#F59E0B", title:"3 Mentor Applications",   desc:"Awaiting admin review and credential verification.",      link:"/admin/mentors",   cta:"Review Now" },
            { icon:ic.flag,   color:"#EF4444", title:"1 Flagged Session",        desc:"A session was flagged by a student. Review required.",    link:"/admin/sessions",  cta:"Investigate" },
            { icon:ic.info,   color:"#2563EB", title:"Platform Update Available",desc:"Class5 AI v2.4.1 is ready to deploy. No downtime needed.",link:"/admin/settings",  cta:"View Update" },
          ].map((a) => (
            <div key={a.title} className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background:`${a.color}07`, border:`1px solid ${a.color}20` }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:`${a.color}15`, color:a.color }}>
                <Icon d={a.icon} size={15}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold" style={{ fontFamily:"var(--font-sora)" }}>{a.title}</p>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{a.desc}</p>
                <Link href={a.link} className="text-[11px] font-bold mt-1.5 inline-block transition-colors"
                  style={{ color:a.color, fontFamily:"var(--font-sora)" }}>
                  {a.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}