"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  menu:     "M3 12h18M3 6h18M3 18h18",
  x:        "M18 6L6 18M6 6l12 12",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  flag:     "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
};

export const ADMIN_NAV = [
  { href:"/admin/dashboard",  label:"Dashboard",    icon:ic.home,     color:"#2563EB" },
  { href:"/admin/mentors",    label:"Mentors",      icon:ic.shield,   color:"#F59E0B" },
  { href:"/admin/students",   label:"Students",     icon:ic.users,    color:"#10B981" },
  { href:"/admin/sessions",   label:"Sessions",     icon:ic.calendar, color:"#7C3AED" },
  { href:"/admin/analytics",  label:"Analytics",    icon:ic.chart,    color:"#2563EB" },
  { href:"/admin/settings",   label:"Settings",     icon:ic.settings, color:"#64748B" },
];

const SidebarCtx = createContext({ open:false, toggle:()=>{} });

function Sidebar() {
  const pathname = usePathname();
  const { open, toggle } = useContext(SidebarCtx);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden"
          style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}
          onClick={toggle}/>
      )}
      <aside className="fixed top-0 left-0 h-full z-50 flex flex-col lg:translate-x-0 transition-transform duration-300"
        style={{ width:252, background:"#060D1A", borderRight:"1px solid rgba(255,255,255,0.05)", transform: open?"translateX(0)":undefined }}>

        {/* logo */}
        <div className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>C5</div>
            <div>
              <span className="font-bold text-white text-base" style={{ fontFamily:"var(--font-sora)" }}>Class5 AI</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color:"#2563EB", fontFamily:"var(--font-sora)" }}>Admin</span>
            </div>
          </Link>
          <button className="lg:hidden text-slate-500 hover:text-white" onClick={toggle}>
            <Icon d={ic.x} size={18}/>
          </button>
        </div>

        {/* admin badge */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background:"rgba(37,99,235,0.08)", border:"1px solid rgba(37,99,235,0.15)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>SA</div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>Super Admin</p>
              <p className="text-[10px] truncate" style={{ color:"#2563EB", fontFamily:"var(--font-sora)", fontWeight:700 }}>Full Access</p>
            </div>
            <div className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background:"#10B981", boxShadow:"0 0 6px #10B981" }}/>
          </div>
        </div>

        {/* alert strip if pending verifications */}
        <div className="mx-4 mb-2 px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)" }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"#F59E0B", animation:"pulse 2s infinite" }}/>
          <p className="text-xs font-semibold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
            3 mentors pending review
          </p>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href+"/");
            return (
              <Link key={item.href} href={item.href}
                onClick={() => { if(open) toggle(); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{ fontFamily:"var(--font-dm)", background: active?`${item.color}14`:"transparent", color: active?"#F8FAFC":"#475569", borderLeft:`2px solid ${active?item.color:"transparent"}` }}>
                <span style={{ color: active?item.color:"#334155" }}><Icon d={item.icon} size={17}/></span>
                <span className="group-hover:text-white transition-colors">{item.label}</span>
                {item.href === "/admin/mentors" && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background:"rgba(245,158,11,0.2)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>3</span>
                )}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:item.color }}/>}
              </Link>
            );
          })}
        </nav>

        {/* bottom */}
        <div className="px-3 pb-4 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all group"
            style={{ color:"#334155", fontFamily:"var(--font-dm)" }}
            onMouseEnter={(e)=>{e.currentTarget.style.color="#F87171";}}
            onMouseLeave={(e)=>{e.currentTarget.style.color="#334155";}}>
            <Icon d={ic.logout} size={17}/><span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ title }: { title:string }) {
  const { toggle } = useContext(SidebarCtx);
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4"
      style={{ background:"rgba(6,13,26,0.92)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-slate-400 hover:text-white transition-colors" onClick={toggle}>
          <Icon d={ic.menu} size={22}/>
        </button>
        <h1 className="text-white font-bold text-lg" style={{ fontFamily:"var(--font-sora)" }}>{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {/* live indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.15)" }}>
          <span className="w-2 h-2 rounded-full" style={{ background:"#10B981", animation:"pulse 2s infinite" }}/>
          <span className="text-xs font-semibold" style={{ color:"#10B981", fontFamily:"var(--font-sora)" }}>Live · 24 active</span>
        </div>
        {/* notification */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ background:"#1E293B", color:"#64748B" }}
          onMouseEnter={(e)=>{e.currentTarget.style.color="#F8FAFC";}}
          onMouseLeave={(e)=>{e.currentTarget.style.color="#64748B";}}>
          <Icon d={ic.bell} size={18}/>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background:"#F59E0B", boxShadow:"0 0 6px #F59E0B" }}/>
        </button>
        {/* avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
          style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily:"var(--font-sora)" }}>SA</div>
      </div>
    </header>
  );
}

const PAGE_TITLES: Record<string,string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/mentors":   "Mentor Verification",
  "/admin/students":  "Students",
  "/admin/sessions":  "Sessions",
  "/admin/analytics": "Analytics",
  "/admin/settings":  "Platform Settings",
};

export default function AdminLayout({ children }:{ children:React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] ?? "Admin";

  return (
    <SidebarCtx.Provider value={{ open, toggle:()=>setOpen((v)=>!v) }}>
      <div className="min-h-screen" style={{ background:"#0A1120" }}>
        <Sidebar/>
        <div className="lg:ml-[252px] flex flex-col min-h-screen">
          <TopBar title={title}/>
          <main className="flex-1 pb-10">{children}</main>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </SidebarCtx.Provider>
  );
}