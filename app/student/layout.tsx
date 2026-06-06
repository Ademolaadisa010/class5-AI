"use client";

import { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/* ── icon helper ──────────────────────────────────────────── */
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
  brain:    "M12 2a5 5 0 0 1 5 5 5 5 0 0 1-1.5 3.5L19 19h-3v3h-4v-3H9v3H5v-3H2l3.5-8.5A5 5 0 0 1 7 7a5 5 0 0 1 5-5z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 4v2m4-2v2m-2-4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  bell:     "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  menu:     "M3 12h18M3 6h18M3 18h18",
  x:        "M18 6L6 18M6 6l12 12",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

/* ── user profile type ────────────────────────────────────── */
export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  level?: string;
  xp?: number;
  streak?: number;
  xpToNextLevel?: number;
  currentLevel?: number;
};

/* ── auth + profile context ───────────────────────────────── */
type AuthCtx = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthCtx>({ user: null, profile: null, loading: true });
export const useAuth = () => useContext(AuthContext);

/* ── sidebar context ──────────────────────────────────────── */
const SidebarCtx = createContext({ open: false, toggle: () => {} });

/* ── nav items ────────────────────────────────────────────── */
export const NAV_ITEMS = [
  { href: "/student/dashboard", label: "Dashboard",    icon: ic.home,     color: "#2563EB" },
  { href: "/student/ai-tools",  label: "AI Tools",     icon: ic.zap,      color: "#7C3AED" },
  { href: "/student/tutor",     label: "AI Tutor",     icon: ic.brain,    color: "#2563EB" },
  { href: "/student/groups",    label: "Study Groups", icon: ic.users,    color: "#10B981" },
  { href: "/student/mentors",   label: "Find Tutors",  icon: ic.calendar, color: "#F59E0B" },
  { href: "/student/profile",   label: "Profile",      icon: ic.user,     color: "#EC4899" },
  { href: "/student/settings",  label: "Settings",     icon: ic.settings, color: "#64748B" },
];

/* ── XP level helper ──────────────────────────────────────── */
export function getLevel(xp: number) {
  const level = Math.floor(xp / 1000) + 1;
  const xpIntoLevel = xp % 1000;
  const xpForNext = 1000;
  return { level, xpIntoLevel, xpForNext };
}

/* ── sidebar ──────────────────────────────────────────────── */
function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, toggle } = useContext(SidebarCtx);
  const { profile, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const xp = profile?.xp ?? 0;
  const { level, xpIntoLevel, xpForNext } = getLevel(xp);
  const xpPct = Math.round((xpIntoLevel / xpForNext) * 100);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={toggle} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 248, background: "#0B1120", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

        {/* logo */}
        <div className="flex items-center justify-between px-5 py-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/student/dashboard" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="logo" width={60} height={50} />
          </Link>
          <button className="lg:hidden text-slate-500 hover:text-white" onClick={toggle}>
            <Icon d={ic.x} size={18} />
          </button>
        </div>

        {/* student badge */}
        <div className="px-4 py-3">
          {loading ? (
            <div className="h-14 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          ) : (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p className="text-xs truncate" style={{ color: "#475569" }}>
                  {profile?.level ?? "Student"}
                </p>
              </div>
              <div className="ml-auto flex-shrink-0">
                <div className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: "#F59E0B", fontFamily: "var(--font-sora)" }}>
                  <Icon d={ic.star} size={11} />{profile?.streak ?? 0}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* xp bar */}
        <div className="px-4 pb-3">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            <span>{xpIntoLevel} / {xpForNext} XP</span>
            <span style={{ color: "#2563EB" }}>Level {level}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${xpPct}%`, background: "linear-gradient(90deg,#2563EB,#7C3AED)" }} />
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                onClick={() => { if (open) toggle(); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{
                  fontFamily: "var(--font-dm)",
                  background: active ? `${item.color}14` : "transparent",
                  color: active ? "#F8FAFC" : "#475569",
                  borderLeft: active ? `2px solid ${item.color}` : "2px solid transparent",
                }}>
                <span style={{ color: active ? item.color : "#334155" }} className="group-hover:text-white transition-colors">
                  <Icon d={item.icon} size={18} />
                </span>
                <span className="group-hover:text-white transition-colors">{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />}
              </Link>
            );
          })}
        </nav>

        {/* logout */}
        <div className="px-3 pb-4 space-y-0.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all duration-200 group"
            style={{ color: "#334155", fontFamily: "var(--font-dm)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}>
            <Icon d={ic.logout} size={17} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

/* ── bottom bar ───────────────────────────────────────────── */
function BottomBar() {
  const pathname = usePathname();
  const mobileItems = NAV_ITEMS.slice(0, 5);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex"
      style={{
        background: "rgba(11,17,32,0.97)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}>
      {mobileItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 transition-all duration-200"
            style={{ color: active ? item.color : "#334155" }}>
            <span style={{ transform: active ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
              <Icon d={item.icon} size={20} />
            </span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "var(--font-sora)" }}>
              {item.label.split(" ")[0]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/* ── top bar ──────────────────────────────────────────────── */
function TopBar({ title }: { title: string }) {
  const { toggle } = useContext(SidebarCtx);
  const { profile } = useAuth();

  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4"
      style={{
        background: "rgba(11,17,32,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-slate-400 hover:text-white transition-colors" onClick={toggle}>
          <Icon d={ic.menu} size={22} />
        </button>
        <h1 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-sora)" }}>{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "#1E293B", color: "#64748B" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#F8FAFC"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}>
          <Icon d={ic.bell} size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#F59E0B", boxShadow: "0 0 6px #F59E0B" }} />
        </button>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer"
          style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>
          {initials}
        </div>
      </div>
    </header>
  );
}

const PAGE_TITLES: Record<string, string> = {
  "/student/dashboard": "Dashboard",
  "/student/ai-tools":  "AI Tools",
  "/student/tutor":     "AI Tutor",
  "/student/groups":    "Study Groups",
  "/student/mentors":   "Find Tutors",
  "/student/profile":   "My Profile",
  "/student/settings":  "Settings",
};

/* ── layout ───────────────────────────────────────────────── */
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen]         = useState(false);
  const [user, setUser]         = useState<User | null>(null);
  const [profile, setProfile]   = useState<UserProfile | null>(null);
  const [loading, setLoading]   = useState(true);
  const pathname                = usePathname();
  const router                  = useRouter();
  const title                   = PAGE_TITLES[pathname] ?? "Class5 AI";

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);
    });
    return () => unsub();
  }, [router]);

  // Firestore profile listener — runs only when user is set
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setProfile({ uid: user.uid, ...snap.data() } as UserProfile);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      <SidebarCtx.Provider value={{ open, toggle: () => setOpen((v) => !v) }}>
        <div className="min-h-screen" style={{ background: "#0F172A" }}>
          <Sidebar />
          <div className="lg:ml-[248px] flex flex-col min-h-screen">
            <TopBar title={title} />
            <main className="flex-1 pb-24 lg:pb-8">
              {children}
            </main>
          </div>
          <BottomBar />
        </div>
      </SidebarCtx.Provider>
    </AuthContext.Provider>
  );
}