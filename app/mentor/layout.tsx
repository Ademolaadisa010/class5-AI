"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  wallet:   "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4h16zM3 7v10",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  menu:     "M3 12h18M3 6h18M3 18h18",
  x:        "M18 6L6 18M6 6l12 12",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

export const MENTOR_NAV = [
  { href:"/mentor/dashboard", label:"Dashboard",  icon:ic.home,     color:"#F59E0B" },
  { href:"/mentor/sessions",  label:"Sessions",   icon:ic.calendar, color:"#2563EB" },
  { href:"/mentor/students",  label:"Students",   icon:ic.users,    color:"#10B981" },
  { href:"/mentor/earnings",  label:"Earnings",   icon:ic.wallet,   color:"#F59E0B" },
  { href:"/mentor/profile",   label:"Profile",    icon:ic.user,     color:"#EC4899" },
  { href:"/mentor/settings",  label:"Settings",   icon:ic.settings, color:"#64748B" },
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
          onClick={toggle} />
      )}
      <aside className="fixed top-0 left-0 h-full z-50 flex flex-col lg:translate-x-0 transition-transform duration-300"
        style={{ width:248, background:"#0B1120", borderRight:"1px solid rgba(255,255,255,0.05)", transform: open ? "translateX(0)" : undefined }}>

        {/* logo */}
        <div className="flex items-center justify-between px-5 py-2"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/mentor/dashboard" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="logo" width={60} height={50} />
          </Link>
          <button className="lg:hidden text-slate-500 hover:text-white" onClick={toggle}>
            <Icon d={ic.x} size={18} />
          </button>
        </div>

        {/* mentor badge */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.15)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", fontFamily:"var(--font-sora)" }}>A</div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate" style={{ fontFamily:"var(--font-sora)" }}>Dr. Ada Okonkwo</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Icon d={ic.shield} size={10} />
                <span className="text-[10px] font-semibold" style={{ color:"#F59E0B", fontFamily:"var(--font-sora)" }}>Verified Mentor</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0" style={{ color:"#F59E0B" }}>
              <Icon d={ic.star} size={12} />
              <span className="text-xs font-bold" style={{ fontFamily:"var(--font-sora)" }}>4.9</span>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {MENTOR_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => { if(open) toggle(); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{ fontFamily:"var(--font-dm)", background: active ? `${item.color}14` : "transparent", color: active ? "#F8FAFC" : "#475569", borderLeft:`2px solid ${active ? item.color : "transparent"}` }}>
                <span style={{ color: active ? item.color : "#334155" }}><Icon d={item.icon} size={18} /></span>
                <span className="group-hover:text-white transition-colors">{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background:item.color }} />}
              </Link>
            );
          })}
        </nav>

        {/* bottom */}
        <div className="px-3 pb-4 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all group"
            style={{ color:"#334155", fontFamily:"var(--font-dm)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color="#F87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color="#334155")}>
            <Icon d={ic.logout} size={17} /><span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function BottomBar() {
  const pathname = usePathname();
  const items = MENTOR_NAV.slice(0, 5);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex"
      style={{ background:"rgba(11,17,32,0.97)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(255,255,255,0.06)", paddingBottom:"env(safe-area-inset-bottom)" }}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 transition-all"
            style={{ color: active ? item.color : "#334155" }}>
            <span style={{ transform: active ? "scale(1.1)" : "scale(1)", transition:"transform 0.2s" }}>
              <Icon d={item.icon} size={20} />
            </span>
            <span className="text-[10px] font-semibold" style={{ fontFamily:"var(--font-sora)" }}>{item.label.split(" ")[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function TopBar({ title }: { title:string }) {
  const { toggle } = useContext(SidebarCtx);
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4"
      style={{ background:"rgba(11,17,32,0.92)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-slate-400 hover:text-white" onClick={toggle}>
          <Icon d={ic.menu} size={22} />
        </button>
        <h1 className="text-white font-bold text-lg" style={{ fontFamily:"var(--font-sora)" }}>{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ background:"#1E293B", color:"#64748B" }}
          onMouseEnter={(e) => { e.currentTarget.style.color="#F8FAFC"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color="#64748B"; }}>
          <Icon d={ic.bell} size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background:"#F59E0B", boxShadow:"0 0 6px #F59E0B" }} />
        </button>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer"
          style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)", fontFamily:"var(--font-sora)" }}>A</div>
      </div>
    </header>
  );
}

const PAGE_TITLES: Record<string,string> = {
  "/mentor/dashboard":"Dashboard",
  "/mentor/sessions":"Sessions",
  "/mentor/students":"My Students",
  "/mentor/earnings":"Earnings",
  "/mentor/profile":"My Profile",
  "/mentor/settings":"Settings",
};

export default function MentorLayout({ children }:{ children:React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Class5 AI";

  return (
    <SidebarCtx.Provider value={{ open, toggle:() => setOpen((v) => !v) }}>
      <div className="min-h-screen" style={{ background:"#0F172A" }}>
        <Sidebar />
        <div className="lg:ml-[248px] flex flex-col min-h-screen">
          <TopBar title={title} />
          <main className="flex-1 pb-24 lg:pb-8">{children}</main>
        </div>
        <BottomBar />
      </div>
    </SidebarCtx.Provider>
  );
}