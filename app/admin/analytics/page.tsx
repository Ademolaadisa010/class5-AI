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
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  globe:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
};

type Period = "7d" | "30d" | "90d" | "1y";

/* ── chart data ──────────────────────────────────────────── */
const DATA: Record<Period, {
  signups: number[]; revenue: number[]; sessions: number[]; aiUsage: number[];
  labels: string[];
}> = {
  "7d": {
    labels:   ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    signups:  [24,31,19,42,38,55,48],
    revenue:  [48000,62000,39000,85000,76000,112000,95000],
    sessions: [38,45,29,67,58,91,74],
    aiUsage:  [210,295,180,380,340,510,425],
  },
  "30d": {
    labels:   ["W1","W2","W3","W4"],
    signups:  [180,214,195,248],
    revenue:  [310000,398000,352000,467000],
    sessions: [420,501,465,590],
    aiUsage:  [2100,2750,2480,3120],
  },
  "90d": {
    labels:   ["Jan","Feb","Mar"],
    signups:  [620,748,891],
    revenue:  [1120000,1380000,1650000],
    sessions: [1540,1890,2210],
    aiUsage:  [8400,10200,12800],
  },
  "1y": {
    labels:   ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    signups:  [120,145,198,234,267,312,289,341,378,421,398,456],
    revenue:  [210000,248000,312000,378000,423000,512000,467000,589000,634000,712000,678000,812000],
    sessions: [380,420,540,620,710,850,790,920,1010,1120,1050,1240],
    aiUsage:  [1800,2200,2900,3400,3900,4700,4200,5100,5600,6200,5900,7100],
  },
};

/* ── bar chart component ─────────────────────────────────── */
function BarChart({ data, labels, color, height = 120, prefix = "", suffix = "" }: {
  data: number[]; labels: string[]; color: string; height?: number; prefix?: string; suffix?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data);
  const fmt = (v: number) => {
    if (v >= 1000000) return `${prefix}${(v/1000000).toFixed(1)}M${suffix}`;
    if (v >= 1000)    return `${prefix}${(v/1000).toFixed(0)}k${suffix}`;
    return `${prefix}${v}${suffix}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 relative cursor-default"
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            {hovered === i && (
              <div className="absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap z-10 pointer-events-none"
                style={{ bottom: `${Math.max((v/max)*100,4)}%`, marginBottom: 6, background: "#1E293B", color, border: `1px solid ${color}30`, fontFamily: "var(--font-sora)" }}>
                {fmt(v)}
              </div>
            )}
            <div className="w-full rounded-t-md transition-all duration-200"
              style={{ height: `${Math.max((v/max)*100, 2)}%`, background: i === data.length-1 ? color : hovered === i ? color : `${color}50` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {labels.map((l, i) => (
          <div key={i} className="flex-1 text-center text-[9px]"
            style={{ color: i === data.length-1 ? color : "#1E293B", fontFamily: "var(--font-dm)" }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ── line chart (simple SVG) ─────────────────────────────── */
function LineChart({ data, color, height = 80 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 300; const h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.85 - h * 0.075;
    return `${x},${y}`;
  });
  const path = `M${pts.join("L")}`;
  const area = `M${pts[0]}L${pts.join("L")}L${w},${h}L0,${h}Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace("#","")})`} />
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── donut chart ─────────────────────────────────────────── */
function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let offset = 0;
  const r = 36; const cx = 50; const cy = 50;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" style={{ width: 100, height: 100, flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1E293B" strokeWidth={12} />
        {segments.map((s, i) => {
          const pct = s.value / total;
          const dash = pct * circumference;
          const gap  = circumference - dash;
          const start = offset * circumference;
          offset += pct;
          return (
            <circle key={i} cx={cx} cy={cy} r={r}
              fill="none" stroke={s.color} strokeWidth={12}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-start}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dasharray 0.5s ease" }} />
          );
        })}
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
          style={{ fill: "#F8FAFC", fontSize: 14, fontFamily: "var(--font-sora)", fontWeight: 700 }}>
          {total.toLocaleString()}
        </text>
      </svg>
      <div className="space-y-2 flex-1">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs"
            style={{ fontFamily: "var(--font-dm)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span style={{ color: "#94A3B8" }}>{s.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ color: "#F8FAFC", fontFamily: "var(--font-sora)" }}>{s.value.toLocaleString()}</span>
              <span style={{ color: "#334155" }}>({((s.value/total)*100).toFixed(0)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── stat card ───────────────────────────────────────────── */
function StatCard({ label, value, change, icon, color, mini }: {
  label: string; value: string; change: string; icon: string; color: string; mini?: number[];
}) {
  const up = change.startsWith("+");
  return (
    <div className="rounded-2xl p-5 space-y-3 hover:scale-[1.01] transition-transform cursor-default"
      style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color }}>
          <Icon d={icon} size={19} />
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: up ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)", color: up ? "#10B981" : "#F87171", fontFamily: "var(--font-sora)" }}>
          {change}
        </span>
      </div>
      <div>
        <p className="font-extrabold text-white leading-none" style={{ fontFamily: "var(--font-sora)", fontSize: "1.75rem" }}>{value}</p>
        <p className="text-sm mt-0.5" style={{ color: "#94A3B8", fontFamily: "var(--font-dm)" }}>{label}</p>
      </div>
      {mini && (
        <div style={{ height: 32, marginTop: 4 }}>
          <LineChart data={mini} color={color} height={32} />
        </div>
      )}
    </div>
  );
}

/* ── top table row ───────────────────────────────────────── */
function TableRow({ rank, name, avatar, color, sub, val1, val2, val1Label, val2Label }: {
  rank: number; name: string; avatar: string; color: string; sub: string;
  val1: string; val2: string; val1Label: string; val2Label: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-default"
      style={{ background: "transparent" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
      <span className="w-5 text-xs font-bold text-center flex-shrink-0"
        style={{ color: rank === 1 ? "#F59E0B" : rank === 2 ? "#94A3B8" : rank === 3 ? "#CD7C3A" : "#334155", fontFamily: "var(--font-sora)" }}>
        {rank <= 3 ? ["🥇","🥈","🥉"][rank-1] : rank}
      </span>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ background: color, fontFamily: "var(--font-sora)" }}>{avatar}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>{name}</p>
        <p className="text-[10px] truncate" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{sub}</p>
      </div>
      <div className="text-right flex-shrink-0 space-y-0.5">
        <p className="text-xs font-bold" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>{val1}</p>
        <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{val2}</p>
      </div>
    </div>
  );
}

/* ── card wrapper ────────────────────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`}
      style={{ background: "rgba(30,41,59,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
      {children}
    </div>
  );
}

function CardHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>{title}</h3>
        {sub && <p className="text-xs mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");
  const d = DATA[period];

  const topMentors = [
    { rank:1, name:"Dr. Adewale Okafor", avatar:"DA", color:"#2563EB", sub:"Physics · Mathematics",  val1:"₦892k",  val2:"234 sessions" },
    { rank:2, name:"Mrs. Fatima Bello",  avatar:"FB", color:"#7C3AED", sub:"Chemistry · Biology",    val1:"₦714k",  val2:"198 sessions" },
    { rank:3, name:"Mr. Emeka Nwosu",    avatar:"EN", color:"#F59E0B", sub:"Mathematics · CS",       val1:"₦601k",  val2:"167 sessions" },
    { rank:4, name:"Miss Chinwe Eze",    avatar:"CE", color:"#EC4899", sub:"English Language",        val1:"₦554k",  val2:"154 sessions" },
    { rank:5, name:"Prof. Yusuf Ibrahim",avatar:"YI", color:"#10B981", sub:"Economics",               val1:"₦436k",  val2:"121 sessions" },
  ];

  const topStudents = [
    { rank:1, name:"Chukwuemeka I.",  avatar:"C", color:"#3B82F6", sub:"SS3 · Lagos",                val1:"8,420 XP",  val2:"134 quizzes"  },
    { rank:2, name:"Fatima Kabiru",   avatar:"F", color:"#F59E0B", sub:"HND · Kano",                 val1:"7,310 XP",  val2:"98 quizzes"   },
    { rank:3, name:"Tunde Adeola",    avatar:"T", color:"#10B981", sub:"SS3 · Lagos",                val1:"6,890 XP",  val2:"87 quizzes"   },
    { rank:4, name:"Ada Okonkwo",     avatar:"A", color:"#7C3AED", sub:"200L · OAU",                 val1:"4,820 XP",  val2:"72 quizzes"   },
    { rank:5, name:"Sola Bello",      avatar:"S", color:"#06B6D4", sub:"100L · Covenant",            val1:"5,100 XP",  val2:"88 quizzes"   },
  ];

  const subjectBreakdown = [
    { label: "Physics",       value: 3420, color: "#2563EB" },
    { label: "Mathematics",   value: 2890, color: "#F59E0B" },
    { label: "Chemistry",     value: 2310, color: "#7C3AED" },
    { label: "Biology",       value: 1780, color: "#10B981" },
    { label: "English",       value: 1240, color: "#EC4899" },
    { label: "Others",        value: 960,  color: "#64748B" },
  ];

  const planBreakdown = [
    { label: "Free Plan",     value: 9812, color: "#334155" },
    { label: "Student Pro",   value: 2671, color: "#2563EB" },
  ];

  const deviceBreakdown = [
    { label: "Mobile",  value: 7840, color: "#7C3AED" },
    { label: "Desktop", value: 3920, color: "#2563EB" },
    { label: "Tablet",  value: 723,  color: "#06B6D4" },
  ];

  const periodLabels: Record<Period, string> = {
    "7d":"Last 7 days", "30d":"Last 30 days", "90d":"Last 90 days", "1y":"Last 12 months"
  };

  const summaryValues: Record<Period, {
    signups: string; revenue: string; sessions: string; aiUsage: string;
    signupsChg: string; revenueChg: string; sessionsChg: string; aiChg: string;
  }> = {
    "7d":  { signups:"257",   revenue:"₦517k",  sessions:"402",   aiUsage:"2,340",  signupsChg:"+8.3%",  revenueChg:"+12%",  sessionsChg:"+9%",  aiChg:"+15%" },
    "30d": { signups:"837",   revenue:"₦1.53M", sessions:"1,976", aiUsage:"10,450", signupsChg:"+14.2%", revenueChg:"+18%",  sessionsChg:"+21%", aiChg:"+28%" },
    "90d": { signups:"2,259", revenue:"₦4.15M", sessions:"5,640", aiUsage:"31,500", signupsChg:"+22.1%", revenueChg:"+31%",  sessionsChg:"+35%", aiChg:"+42%" },
    "1y":  { signups:"3,579", revenue:"₦6.78M", sessions:"10,630",aiUsage:"61,800", signupsChg:"+187%",  revenueChg:"+240%", sessionsChg:"+290%",aiChg:"+340%" },
  };
  const sv = summaryValues[period];

  return (
    <div className="px-5 py-6 max-w-7xl mx-auto space-y-6">

      {/* header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily: "var(--font-sora)" }}>Analytics</h2>
          <p className="text-sm mt-1" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
            Platform-wide performance insights — signups, revenue, sessions, and AI usage.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* period selector */}
          <div className="flex gap-1 p-1.5 rounded-xl" style={{ background: "#1E293B" }}>
            {(["7d","30d","90d","1y"] as Period[]).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{ fontFamily: "var(--font-sora)", background: period===p?"linear-gradient(135deg,#2563EB,#7C3AED)":"transparent", color: period===p?"#fff":"#475569", boxShadow: period===p?"0 2px 8px rgba(37,99,235,0.35)":"none" }}>
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-sora)" }}>
            <Icon d={ic.download} size={14} /> Export
          </button>
        </div>
      </div>

      {/* ── summary stat cards ────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="New Signups"    value={sv.signups}  change={sv.signupsChg}  icon={ic.users}    color="#2563EB" mini={d.signups}  />
        <StatCard label="Revenue"        value={sv.revenue}  change={sv.revenueChg}  icon={ic.wallet}   color="#10B981" mini={d.revenue}  />
        <StatCard label="Sessions"       value={sv.sessions} change={sv.sessionsChg} icon={ic.calendar} color="#7C3AED" mini={d.sessions} />
        <StatCard label="AI Tool Uses"   value={sv.aiUsage}  change={sv.aiChg}       icon={ic.zap}      color="#F59E0B" mini={d.aiUsage}  />
      </div>

      {/* ── main charts row ───────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* revenue chart */}
        <Card>
          <CardHeader
            title="Revenue"
            sub={`${periodLabels[period]} · Total ${sv.revenue}`}
            action={
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontFamily: "var(--font-sora)" }}>
                {sv.revenueChg}
              </span>
            }
          />
          <BarChart data={d.revenue} labels={d.labels} color="#10B981" height={140} prefix="₦" />
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label:"Platform (10%)", val:"₦" + (d.revenue.reduce((a,v)=>a+v,0)*0.1/1000).toFixed(0)+"k", color:"#2563EB" },
              { label:"Mentors (90%)",  val:"₦" + (d.revenue.reduce((a,v)=>a+v,0)*0.9/1000).toFixed(0)+"k", color:"#10B981" },
              { label:"Avg Session",    val:"₦" + Math.round(d.revenue.reduce((a,v)=>a+v,0)/d.sessions.reduce((a,v)=>a+v,0)/100)*100+"",    color:"#F59E0B" },
            ].map((r) => (
              <div key={r.label} className="text-center p-2.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <p className="font-bold text-sm" style={{ color: r.color, fontFamily: "var(--font-sora)" }}>{r.val}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{r.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* signups chart */}
        <Card>
          <CardHeader
            title="New Signups"
            sub={`${periodLabels[period]} · Total ${sv.signups}`}
            action={
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(37,99,235,0.12)", color: "#60A5FA", fontFamily: "var(--font-sora)" }}>
                {sv.signupsChg}
              </span>
            }
          />
          <BarChart data={d.signups} labels={d.labels} color="#2563EB" height={140} />
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Student vs Mentor split</p>
            </div>
            <div className="flex gap-2">
              {[
                { label: "Students",  pct: 87, color: "#2563EB" },
                { label: "Mentors",   pct: 13, color: "#F59E0B" },
              ].map((s) => (
                <div key={s.label} className="flex-1">
                  <div className="flex justify-between text-[10px] mb-1"
                    style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                    <span>{s.label}</span><span style={{ color: s.color, fontWeight: 700 }}>{s.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── second row ────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* sessions chart */}
        <Card>
          <CardHeader title="Sessions" sub={`${periodLabels[period]} · Total ${sv.sessions}`}
            action={<span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:"rgba(124,58,237,0.12)", color:"#A78BFA", fontFamily:"var(--font-sora)" }}>{sv.sessionsChg}</span>}
          />
          <BarChart data={d.sessions} labels={d.labels} color="#7C3AED" height={120} />
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label:"Completed", val: Math.round(d.sessions.reduce((a,v)=>a+v,0)*0.88).toLocaleString(), color:"#10B981" },
              { label:"Cancelled", val: Math.round(d.sessions.reduce((a,v)=>a+v,0)*0.07).toLocaleString(), color:"#64748B" },
              { label:"Flagged",   val: Math.round(d.sessions.reduce((a,v)=>a+v,0)*0.02).toLocaleString(), color:"#F59E0B" },
            ].map((r) => (
              <div key={r.label} className="text-center p-2.5 rounded-xl"
                style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.04)" }}>
                <p className="font-bold text-sm" style={{ color:r.color, fontFamily:"var(--font-sora)" }}>{r.val}</p>
                <p className="text-[10px] mt-0.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{r.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* AI usage chart */}
        <Card>
          <CardHeader title="AI Tool Usage" sub={`${periodLabels[period]} · Total ${sv.aiUsage}`}
            action={<span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:"rgba(245,158,11,0.12)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>{sv.aiChg}</span>}
          />
          <BarChart data={d.aiUsage} labels={d.labels} color="#F59E0B" height={120} />
          <div className="mt-4 pt-4 space-y-2.5" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label:"Summaries",    pct:38, color:"#2563EB" },
              { label:"Quizzes",      pct:31, color:"#7C3AED" },
              { label:"Explanations", pct:21, color:"#F59E0B" },
              { label:"AI Tutor Chat",pct:10, color:"#10B981" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex justify-between text-[10px]"
                  style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
                  <span>{s.label}</span>
                  <span className="font-bold" style={{ color:s.color }}>{s.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width:`${s.pct}%`, background:`linear-gradient(90deg,${s.color},${s.color}88)` }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── third row: breakdowns + leaderboards ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* subject breakdown */}
        <Card>
          <CardHeader title="Sessions by Subject" />
          <DonutChart segments={subjectBreakdown} />
        </Card>

        {/* plan + device breakdown */}
        <Card>
          <CardHeader title="Users by Plan" />
          <DonutChart segments={planBreakdown} />
          <div className="mt-5 pt-4" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            <CardHeader title="Users by Device" />
            <DonutChart segments={deviceBreakdown} />
          </div>
        </Card>

        {/* platform health KPIs */}
        <Card>
          <CardHeader title="Platform KPIs" sub="Key performance indicators" />
          <div className="space-y-4">
            {[
              { label:"Student Retention (30d)",   val:"78%",    color:"#2563EB", bar:78 },
              { label:"Session Completion Rate",   val:"94%",    color:"#10B981", bar:94 },
              { label:"Mentor Approval Rate",      val:"87%",    color:"#F59E0B", bar:87 },
              { label:"Payment Success Rate",      val:"99.2%",  color:"#10B981", bar:99 },
              { label:"Avg Session Rating",        val:"4.8 ★",  color:"#F59E0B", bar:96 },
              { label:"AI Tool DAU Rate",          val:"62%",    color:"#7C3AED", bar:62 },
              { label:"Support Ticket Rate",       val:"1.2%",   color:"#64748B", bar:2  },
            ].map((k) => (
              <div key={k.label} className="space-y-1">
                <div className="flex justify-between text-xs"
                  style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
                  <span>{k.label}</span>
                  <span className="font-bold" style={{ color:k.color, fontFamily:"var(--font-sora)" }}>{k.val}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width:`${k.bar}%`, background:`linear-gradient(90deg,${k.color},${k.color}88)` }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── leaderboards ──────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="🏆 Top Mentors" sub={`By revenue · ${periodLabels[period]}`} />
          <div className="space-y-0.5">
            {topMentors.map((m) => (
              <TableRow key={m.rank} {...m} val1Label="Revenue" val2Label="Sessions" />
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="🎓 Top Students" sub={`By XP earned · ${periodLabels[period]}`} />
          <div className="space-y-0.5">
            {topStudents.map((s) => (
              <TableRow key={s.rank} {...s} val1Label="XP" val2Label="Quizzes" />
            ))}
          </div>
        </Card>
      </div>

      {/* ── growth insight banner ──────────────────── */}
      <div className="rounded-2xl p-5 flex items-start gap-4"
        style={{ background:"rgba(37,99,235,0.06)", border:"1px solid rgba(37,99,235,0.15)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background:"rgba(37,99,235,0.12)", color:"#60A5FA" }}>
          <Icon d={ic.info} size={18}/>
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-1" style={{ fontFamily:"var(--font-sora)" }}>
            📈 Growth Insight — {periodLabels[period]}
          </p>
          <p className="text-sm leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
            Platform revenue is up <strong className="text-white">{sv.revenueChg}</strong> this period.
            New student signups grew by <strong className="text-white">{sv.signupsChg}</strong>, driven mainly by JAMB season demand for Physics and Mathematics tutors.
            AI tool usage is the fastest-growing metric at <strong className="text-white">{sv.aiChg}</strong> — consider increasing free tier limits to boost conversion to Pro.
            The top 5 mentors account for <strong className="text-white">41%</strong> of total platform revenue.
          </p>
        </div>
      </div>

    </div>
  );
}