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
  search:   "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  ban:      "M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636",
  unlock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 9.9-1",
  trash:    "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  filter:   "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
  close:    "M18 6L6 18M6 6l12 12",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  fire:     "M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-5-5-9-5-9z",
  sort:     "M3 6h18M7 12h10M11 18h4",
  chevron:  "M9 18l6-6-6-6",
  send:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  alert:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
};

type StudentStatus = "active" | "suspended" | "banned";
type Plan = "free" | "pro";

interface ActivityLog { action: string; date: string; }
interface Student {
  id: string; name: string; avatar: string; color: string;
  email: string; phone: string; school: string; level: string;
  plan: Plan; status: StudentStatus;
  joinedAt: string; lastActive: string;
  totalSessions: number; totalXP: number; streak: number;
  aiUsage: number; quizzesTaken: number; groupsJoined: number;
  subjects: string[]; activity: ActivityLog[];
}

const SUBJECT_COLORS: Record<string, string> = {
  Biology:"#10B981", Physics:"#2563EB", Chemistry:"#7C3AED",
  Mathematics:"#F59E0B", English:"#EC4899", History:"#F97316",
  "Computer Science":"#06B6D4", Economics:"#8B5CF6",
};

const STUDENTS: Student[] = [
  { id:"s1", name:"Ada Okonkwo",    avatar:"A", color:"#7C3AED", email:"ada.okonkwo@email.com",   phone:"+234 801 234 5678", school:"Obafemi Awolowo University", level:"200 Level", plan:"pro",  status:"active",    joinedAt:"Jan 15, 2025", lastActive:"Today",        totalSessions:12, totalXP:4820, streak:14, aiUsage:87,  quizzesTaken:87,  groupsJoined:3, subjects:["Biology","Physics"],        activity:[{ action:"Completed Biology quiz — 18/20", date:"Today" },{ action:"AI Tutor session — Photosynthesis", date:"Yesterday" },{ action:"Joined Bio 200L study group", date:"3 days ago" }] },
  { id:"s2", name:"Chukwuemeka I.", avatar:"C", color:"#3B82F6", email:"chukwu.ike@email.com",    phone:"+234 802 345 6789", school:"University of Lagos",         level:"SS3",       plan:"free", status:"active",    joinedAt:"Feb 2, 2025",  lastActive:"Today",        totalSessions:8,  totalXP:8420, streak:21, aiUsage:120, quizzesTaken:134, groupsJoined:5, subjects:["Mathematics","Physics"],     activity:[{ action:"Generated quiz — Newton's Laws", date:"Today" },{ action:"Summarised 3 chapters", date:"2 days ago" }] },
  { id:"s3", name:"Fatima Kabiru",  avatar:"F", color:"#F59E0B", email:"fatima.k@email.com",      phone:"+234 803 456 7890", school:"ABU Zaria",                   level:"HND",       plan:"pro",  status:"active",    joinedAt:"Mar 8, 2025",  lastActive:"Yesterday",   totalSessions:6,  totalXP:7310, streak:9,  aiUsage:64,  quizzesTaken:72,  groupsJoined:3, subjects:["Chemistry","Biology"],       activity:[{ action:"Booked session with Mrs. Bello", date:"Yesterday" },{ action:"Completed Chemistry quiz", date:"2 days ago" }] },
  { id:"s4", name:"Tunde Adeola",   avatar:"T", color:"#10B981", email:"tunde.a@email.com",       phone:"+234 804 567 8901", school:"King's College Lagos",         level:"SS3",       plan:"free", status:"active",    joinedAt:"Jan 28, 2025", lastActive:"2 days ago",  totalSessions:4,  totalXP:6890, streak:7,  aiUsage:45,  quizzesTaken:61,  groupsJoined:2, subjects:["Physics"],                   activity:[{ action:"Joined Physics JAMB Prep group", date:"2 days ago" },{ action:"Summarised Physics notes", date:"3 days ago" }] },
  { id:"s5", name:"Ngozi Eze",      avatar:"N", color:"#EC4899", email:"ngozi.eze@email.com",     phone:"+234 805 678 9012", school:"Federal Government College",  level:"SS2",       plan:"free", status:"active",    joinedAt:"Apr 3, 2025",  lastActive:"3 days ago",  totalSessions:2,  totalXP:3200, streak:0,  aiUsage:28,  quizzesTaken:31,  groupsJoined:1, subjects:["Physics","Chemistry"],       activity:[{ action:"Summarised Chemistry chapter", date:"3 days ago" }] },
  { id:"s6", name:"Rasheed Kazeem", avatar:"R", color:"#F97316", email:"rasheed.k@email.com",     phone:"+234 806 789 0123", school:"Government Secondary School", level:"SS3",       plan:"free", status:"suspended", joinedAt:"Feb 20, 2025", lastActive:"1 week ago",  totalSessions:2,  totalXP:1200, streak:0,  aiUsage:18,  quizzesTaken:15,  groupsJoined:1, subjects:["Physics"],                   activity:[{ action:"Account suspended — policy violation", date:"1 week ago" }] },
  { id:"s7", name:"Sola Bello",     avatar:"S", color:"#06B6D4", email:"sola.b@email.com",        phone:"+234 807 890 1234", school:"Covenant University",         level:"100 Level", plan:"pro",  status:"active",    joinedAt:"Mar 12, 2025", lastActive:"Today",       totalSessions:9,  totalXP:5100, streak:11, aiUsage:76,  quizzesTaken:88,  groupsJoined:4, subjects:["Computer Science","Mathematics"], activity:[{ action:"Completed CS algorithms quiz", date:"Today" },{ action:"AI Tutor session — binary search", date:"Yesterday" }] },
  { id:"s8", name:"Amara Okafor",   avatar:"A", color:"#8B5CF6", email:"amara.o@email.com",       phone:"+234 808 901 2345", school:"University of Nigeria",       level:"300 Level", plan:"pro",  status:"banned",    joinedAt:"Dec 10, 2024", lastActive:"2 weeks ago", totalSessions:1,  totalXP:200,  streak:0,  aiUsage:5,   quizzesTaken:4,   groupsJoined:0, subjects:["Economics"],                 activity:[{ action:"Account banned — repeated violations", date:"2 weeks ago" }] },
];

/* ── student detail drawer ───────────────────────────────── */
function StudentDrawer({ student, onClose, onStatusChange }: {
  student: Student;
  onClose: () => void;
  onStatusChange: (id: string, status: StudentStatus) => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview"|"activity"|"actions">("overview");
  const [msgText, setMsgText]     = useState("");
  const [msgSent, setMsgSent]     = useState(false);
  const [confirmAction, setConfirmAction] = useState<"suspend"|"ban"|"delete"|"unsuspend"|null>(null);

  const doAction = (action: typeof confirmAction) => {
    if (action === "suspend")   onStatusChange(student.id, "suspended");
    if (action === "unsuspend") onStatusChange(student.id, "active");
    if (action === "ban")       onStatusChange(student.id, "banned");
    setConfirmAction(null);
  };

  const statusBadge = {
    active:    { bg:"rgba(16,185,129,0.1)",  color:"#10B981", label:"Active"    },
    suspended: { bg:"rgba(245,158,11,0.1)",  color:"#F59E0B", label:"Suspended" },
    banned:    { bg:"rgba(239,68,68,0.1)",   color:"#F87171", label:"Banned"    },
  }[student.status];

  return (
    <div className="fixed inset-0 z-40 flex justify-end"
      style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      {/* confirm sub-overlay */}
      {confirmAction && (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4"
          style={{ background:"rgba(0,0,0,0.65)" }}>
          <div className="w-full max-w-sm rounded-3xl p-6 space-y-4"
            style={{ background:"#0F172A", border:"1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-white font-bold" style={{ fontFamily:"var(--font-sora)" }}>
              {confirmAction==="suspend"   ? "Suspend Account?"   :
               confirmAction==="unsuspend" ? "Reactivate Account?" :
               confirmAction==="ban"       ? "Ban Account?"        : "Delete Account?"}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color:"#64748B", fontFamily:"var(--font-dm)" }}>
              {confirmAction==="suspend"   ? `${student.name}'s account will be temporarily locked. They will not be able to log in until reactivated.` :
               confirmAction==="unsuspend" ? `${student.name}'s account will be reactivated and they can log in again.` :
               confirmAction==="ban"       ? `${student.name} will be permanently banned from the platform. This is a serious action.` :
               "This will permanently delete all data for this student. This cannot be undone."}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-sora)" }}>
                Cancel
              </button>
              <button onClick={() => doAction(confirmAction)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                style={{ background: confirmAction==="unsuspend" ? "linear-gradient(135deg,#059669,#10B981)" : "#EF4444", color:"#fff", fontFamily:"var(--font-sora)" }}>
                {confirmAction==="suspend"   ? "Suspend"    :
                 confirmAction==="unsuspend" ? "Reactivate" :
                 confirmAction==="ban"       ? "Ban User"   : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md h-full flex flex-col overflow-hidden"
        style={{ background:"#0B1120", borderLeft:"1px solid rgba(255,255,255,0.08)", animation:"slideIn 0.3s ease" }}>

        {/* header */}
        <div className="relative overflow-hidden flex-shrink-0">
          <div className="h-16" style={{ background:"linear-gradient(135deg,#0D1B2E,#0F1E3D)" }}>
            <div className="absolute inset-0"
              style={{ backgroundImage:"linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>
          </div>
          <button onClick={onClose}
            className="absolute top-3 right-4 w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background:"rgba(0,0,0,0.3)", color:"#fff" }}>
            <Icon d={ic.close} size={15}/>
          </button>

          <div className="px-5 pb-4 -mt-7">
            <div className="flex items-end gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold border-4 flex-shrink-0"
                style={{ background:student.color, borderColor:"#0B1120", fontFamily:"var(--font-sora)" }}>
                {student.avatar}
              </div>
              <div className="pb-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-white font-extrabold" style={{ fontFamily:"var(--font-sora)" }}>{student.name}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background:statusBadge.bg, color:statusBadge.color, fontFamily:"var(--font-sora)" }}>
                    {statusBadge.label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: student.plan==="pro"?"rgba(37,99,235,0.15)":"rgba(255,255,255,0.05)", color: student.plan==="pro"?"#60A5FA":"#475569", fontFamily:"var(--font-sora)" }}>
                    {student.plan==="pro"?"Pro":"Free"}
                  </span>
                </div>
                <p className="text-xs" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
                  {student.level} · {student.school}
                </p>
              </div>
            </div>

            {/* quick stats */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { val:student.totalXP.toLocaleString(), label:"XP",      color:"#F59E0B" },
                { val:student.streak.toString(),        label:"Streak",   color:"#EF4444" },
                { val:student.totalSessions.toString(), label:"Sessions", color:"#2563EB" },
                { val:student.quizzesTaken.toString(),  label:"Quizzes",  color:"#7C3AED" },
              ].map((s) => (
                <div key={s.label} className="text-center py-2 rounded-xl"
                  style={{ background:"rgba(30,41,59,0.5)", border:"1px solid rgba(255,255,255,0.04)" }}>
                  <p className="font-bold text-sm" style={{ color:s.color, fontFamily:"var(--font-sora)" }}>{s.val}</p>
                  <p className="text-[10px]" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="flex gap-1 px-4 py-2 flex-shrink-0" style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          {(["overview","activity","actions"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{ fontFamily:"var(--font-sora)", background: activeTab===t?"rgba(37,99,235,0.15)":"transparent", color: activeTab===t?"#60A5FA":"#475569", border:`1px solid ${activeTab===t?"rgba(37,99,235,0.25)":"transparent"}` }}>
              {t}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* contact */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:"#334155", fontFamily:"var(--font-sora)" }}>Contact</p>
                {[
                  { label:"Email",      val:student.email       },
                  { label:"Phone",      val:student.phone       },
                  { label:"School",     val:student.school      },
                  { label:"Level",      val:student.level       },
                  { label:"Joined",     val:student.joinedAt    },
                  { label:"Last Active",val:student.lastActive  },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between py-1.5 text-xs"
                    style={{ borderBottom:"1px solid rgba(255,255,255,0.04)", color:"#64748B", fontFamily:"var(--font-dm)" }}>
                    <span>{r.label}</span>
                    <strong className="text-white text-right max-w-[180px] truncate">{r.val}</strong>
                  </div>
                ))}
              </div>

              {/* usage */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:"#334155", fontFamily:"var(--font-sora)" }}>Platform Usage</p>
                {[
                  { label:"AI Tool Uses",     val:student.aiUsage.toString(),     color:"#2563EB" },
                  { label:"Quizzes Taken",    val:student.quizzesTaken.toString(), color:"#7C3AED" },
                  { label:"Groups Joined",    val:student.groupsJoined.toString(), color:"#10B981" },
                  { label:"Tutor Sessions",   val:student.totalSessions.toString(),color:"#F59E0B" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between py-1.5 text-xs"
                    style={{ borderBottom:"1px solid rgba(255,255,255,0.04)", color:"#64748B", fontFamily:"var(--font-dm)" }}>
                    <span>{r.label}</span>
                    <strong style={{ color:r.color, fontFamily:"var(--font-sora)" }}>{r.val}</strong>
                  </div>
                ))}
              </div>

              {/* subjects */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:"#334155", fontFamily:"var(--font-sora)" }}>Subjects</p>
                <div className="flex flex-wrap gap-1.5">
                  {student.subjects.map((s) => (
                    <span key={s} className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                      style={{ background:`${SUBJECT_COLORS[s]??'#64748B'}14`, color:SUBJECT_COLORS[s]??'#64748B', border:`1px solid ${SUBJECT_COLORS[s]??'#64748B'}25`, fontFamily:"var(--font-sora)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-2">
              {student.activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5"
                  style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background:"rgba(37,99,235,0.1)", color:"#60A5FA" }}>
                    <Icon d={ic.zap} size={13}/>
                  </div>
                  <div>
                    <p className="text-sm text-white" style={{ fontFamily:"var(--font-dm)" }}>{a.action}</p>
                    <p className="text-xs mt-0.5" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{a.date}</p>
                  </div>
                </div>
              ))}
              {student.activity.length === 0 && (
                <p className="text-center text-sm py-8" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>No activity yet</p>
              )}
            </div>
          )}

          {activeTab === "actions" && (
            <div className="space-y-4">
              {/* send message */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color:"#334155", fontFamily:"var(--font-sora)" }}>Send Message</p>
                {msgSent ? (
                  <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold"
                    style={{ background:"rgba(16,185,129,0.1)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
                    <Icon d={ic.check} size={15}/> Message sent to {student.name.split(" ")[0]}
                  </div>
                ) : (
                  <>
                    <textarea value={msgText} onChange={(e) => setMsgText(e.target.value)} rows={4}
                      placeholder={`Write a message to ${student.name.split(" ")[0]}…`}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
                      style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)" }}
                      onFocus={(e)=>{e.currentTarget.style.borderColor="#2563EB";}}
                      onBlur={(e)=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";}}/>
                    <button disabled={!msgText.trim()} onClick={() => setMsgSent(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{ background: msgText.trim()?"linear-gradient(135deg,#2563EB,#7C3AED)":"#1E293B", color: msgText.trim()?"#fff":"#475569", fontFamily:"var(--font-sora)", cursor: msgText.trim()?"pointer":"not-allowed" }}>
                      <Icon d={ic.send} size={14}/> Send Message
                    </button>
                  </>
                )}
              </div>

              {/* account actions */}
              <div className="pt-2" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"#334155", fontFamily:"var(--font-sora)" }}>Account Actions</p>
                <div className="space-y-2">
                  {student.status === "active" ? (
                    <>
                      <button onClick={() => setConfirmAction("suspend")}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", color:"#F59E0B", fontFamily:"var(--font-sora)" }}>
                        <Icon d={ic.ban} size={16}/> Suspend Account
                        <span className="ml-auto text-xs opacity-60">Temporary</span>
                      </button>
                      <button onClick={() => setConfirmAction("ban")}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)", color:"#F87171", fontFamily:"var(--font-sora)" }}>
                        <Icon d={ic.x} size={16}/> Ban Account
                        <span className="ml-auto text-xs opacity-60">Permanent</span>
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setConfirmAction("unsuspend")}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                      style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", color:"#10B981", fontFamily:"var(--font-sora)" }}>
                      <Icon d={ic.unlock} size={16}/> Reactivate Account
                    </button>
                  )}
                  <button onClick={() => setConfirmAction("delete")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background:"rgba(239,68,68,0.05)", border:"1px solid rgba(239,68,68,0.12)", color:"#64748B", fontFamily:"var(--font-sora)" }}>
                    <Icon d={ic.trash} size={16}/> Delete Account
                    <span className="ml-auto text-xs opacity-60">Irreversible</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── student row ─────────────────────────────────────────── */
function StudentRow({ student, onView }: { student: Student; onView: () => void }) {
  const statusStyle: Record<StudentStatus, { color:string; label:string }> = {
    active:    { color:"#10B981", label:"Active"    },
    suspended: { color:"#F59E0B", label:"Suspended" },
    banned:    { color:"#F87171", label:"Banned"    },
  };
  const s = statusStyle[student.status];

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 transition-all duration-150 cursor-pointer group"
      style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
      onClick={onView}
      onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";}}
      onMouseLeave={(e)=>{e.currentTarget.style.background="transparent";}}>

      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
          style={{ background:student.color, fontFamily:"var(--font-sora)" }}>{student.avatar}</div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border"
          style={{ background:s.color, borderColor:"#0B1120" }}/>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold" style={{ fontFamily:"var(--font-sora)" }}>{student.name}</p>
        <p className="text-xs truncate" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
          {student.level} · {student.school}
        </p>
      </div>

      <div className="hidden sm:block text-xs flex-shrink-0" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{student.email}</div>

      <div className="hidden md:flex items-center gap-1 flex-shrink-0">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: student.plan==="pro"?"rgba(37,99,235,0.12)":"rgba(255,255,255,0.05)", color: student.plan==="pro"?"#60A5FA":"#475569", fontFamily:"var(--font-sora)" }}>
          {student.plan==="pro"?"Pro":"Free"}
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-3 flex-shrink-0 text-xs" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
        <span className="flex items-center gap-1"><Icon d={ic.star} size={11}/> {student.totalXP.toLocaleString()}</span>
        <span className="flex items-center gap-1"><Icon d={ic.fire} size={11}/> {student.streak}d</span>
      </div>

      <div className="text-xs flex-shrink-0" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>{student.lastActive}</div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background:s.color }}/>
        <span className="text-xs font-semibold" style={{ color:s.color, fontFamily:"var(--font-sora)" }}>{s.label}</span>
      </div>

      <button onClick={(e)=>{e.stopPropagation(); onView();}}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
        style={{ background:"rgba(37,99,235,0.1)", color:"#60A5FA", border:"1px solid rgba(37,99,235,0.2)" }}>
        <Icon d={ic.eye} size={14}/>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function AdminStudentsPage() {
  const [students, setStudents]   = useState<Student[]>(STUDENTS);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState<"all"|StudentStatus>("all");
  const [filterPlan,   setFilterPlan]   = useState<"all"|Plan>("all");
  const [sortBy, setSortBy]       = useState<"recent"|"xp"|"sessions"|"name">("recent");
  const [selected, setSelected]   = useState<Student|null>(null);

  const handleStatusChange = (id: string, status: StudentStatus) => {
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
    setSelected((prev) => prev?.id === id ? { ...prev, status } : prev);
  };

  const filtered = students
    .filter((s) => {
      const matchSearch  = s.name.toLowerCase().includes(search.toLowerCase()) ||
                           s.email.toLowerCase().includes(search.toLowerCase()) ||
                           s.school.toLowerCase().includes(search.toLowerCase());
      const matchStatus  = filterStatus === "all" || s.status === filterStatus;
      const matchPlan    = filterPlan   === "all" || s.plan   === filterPlan;
      return matchSearch && matchStatus && matchPlan;
    })
    .sort((a, b) => {
      if (sortBy === "xp")       return b.totalXP - a.totalXP;
      if (sortBy === "sessions") return b.totalSessions - a.totalSessions;
      if (sortBy === "name")     return a.name.localeCompare(b.name);
      return 0;
    });

  const counts = {
    total:     students.length,
    active:    students.filter((s) => s.status === "active").length,
    suspended: students.filter((s) => s.status === "suspended").length,
    banned:    students.filter((s) => s.status === "banned").length,
    pro:       students.filter((s) => s.plan === "pro").length,
  };

  return (
    <div className="px-5 py-6 max-w-6xl mx-auto">
      {selected && (
        <StudentDrawer student={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange}/>
      )}

      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-white font-extrabold text-2xl" style={{ fontFamily:"var(--font-sora)" }}>Students</h2>
          <p className="text-sm mt-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
            Manage all student accounts, usage, and access.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex-shrink-0"
          style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", fontFamily:"var(--font-sora)" }}>
          <Icon d={ic.download} size={14}/> Export CSV
        </button>
      </div>

      {/* summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label:"Total Students", val:counts.total,     color:"#2563EB", icon:ic.user     },
          { label:"Active",         val:counts.active,    color:"#10B981", icon:ic.check    },
          { label:"Suspended",      val:counts.suspended, color:"#F59E0B", icon:ic.alert    },
          { label:"Banned",         val:counts.banned,    color:"#EF4444", icon:ic.ban      },
          { label:"Pro Plan",       val:counts.pro,       color:"#7C3AED", icon:ic.star     },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-3.5 flex items-center gap-3"
            style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background:`${s.color}18`, color:s.color }}>
              <Icon d={s.icon} size={15}/>
            </div>
            <div>
              <p className="font-extrabold text-white text-lg leading-none" style={{ fontFamily:"var(--font-sora)" }}>{s.val}</p>
              <p className="text-[11px] mt-0.5" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* search + filters */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#334155" }}>
            <Icon d={ic.search} size={16}/>
          </span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or school…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white outline-none"
            style={{ background:"#1E293B", border:"1px solid rgba(255,255,255,0.07)", fontFamily:"var(--font-dm)", transition:"border-color 0.2s" }}
            onFocus={(e) => { e.currentTarget.style.borderColor="#2563EB"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(37,99,235,0.12)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow="none"; }}/>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          {/* status filter */}
          {(["all","active","suspended","banned"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{ fontFamily:"var(--font-sora)",
                background: filterStatus===s
                  ? s==="active"?"rgba(16,185,129,0.15)":s==="suspended"?"rgba(245,158,11,0.15)":s==="banned"?"rgba(239,68,68,0.12)":"rgba(37,99,235,0.15)"
                  : "rgba(30,41,59,0.5)",
                color: filterStatus===s
                  ? s==="active"?"#10B981":s==="suspended"?"#F59E0B":s==="banned"?"#F87171":"#60A5FA"
                  : "#475569",
                border:`1px solid ${filterStatus===s ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}` }}>
              {s === "all" ? `All (${counts.total})` : s}
            </button>
          ))}

          <div className="flex gap-2 ml-auto items-center">
            {/* plan filter */}
            {(["all","free","pro"] as const).map((p) => (
              <button key={p} onClick={() => setFilterPlan(p)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all"
                style={{ fontFamily:"var(--font-sora)", background: filterPlan===p?"rgba(124,58,237,0.15)":"rgba(30,41,59,0.5)", color: filterPlan===p?"#A78BFA":"#475569", border:`1px solid ${filterPlan===p?"rgba(124,58,237,0.3)":"rgba(255,255,255,0.05)"}` }}>
                {p==="all"?"All Plans":p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}

            {/* sort */}
            <span className="text-xs flex items-center gap-1" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>
              <Icon d={ic.sort} size={12}/> Sort:
            </span>
            {([
              { val:"recent",   label:"Recent"   },
              { val:"xp",       label:"Top XP"   },
              { val:"sessions", label:"Sessions" },
              { val:"name",     label:"A→Z"      },
            ] as { val:typeof sortBy; label:string }[]).map((opt) => (
              <button key={opt.val} onClick={() => setSortBy(opt.val)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ fontFamily:"var(--font-sora)", background: sortBy===opt.val?"rgba(37,99,235,0.12)":"rgba(30,41,59,0.5)", color: sortBy===opt.val?"#60A5FA":"#475569", border:`1px solid ${sortBy===opt.val?"rgba(37,99,235,0.25)":"rgba(255,255,255,0.05)"}` }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* count */}
      <p className="text-xs mb-3" style={{ color:"#334155", fontFamily:"var(--font-dm)" }}>
        Showing <strong className="text-white">{filtered.length}</strong> of{" "}
        <strong className="text-white">{students.length}</strong> students
      </p>

      {/* table */}
      {filtered.length > 0 ? (
        <div className="rounded-2xl overflow-hidden"
          style={{ background:"rgba(30,41,59,0.55)", border:"1px solid rgba(255,255,255,0.06)" }}>
          {/* col headers */}
          <div className="hidden md:grid items-center gap-4 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.05)", color:"#334155", fontFamily:"var(--font-sora)",
              gridTemplateColumns:"2.25rem 1fr 1fr auto auto auto auto auto" }}>
            <span/>
            <span>Student</span>
            <span>Email</span>
            <span>Plan</span>
            <span>XP / Streak</span>
            <span>Last Active</span>
            <span>Status</span>
            <span/>
          </div>
          {filtered.map((s) => (
            <StudentRow key={s.id} student={s} onView={() => setSelected(s)}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-white font-bold" style={{ fontFamily:"var(--font-sora)" }}>No students found</h3>
          <p className="text-sm" style={{ color:"#475569", fontFamily:"var(--font-dm)" }}>Try adjusting your search or filters.</p>
          <button onClick={() => { setSearch(""); setFilterStatus("all"); setFilterPlan("all"); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background:"linear-gradient(135deg,#2563EB,#7C3AED)", color:"#fff", fontFamily:"var(--font-sora)" }}>
            Clear Filters
          </button>
        </div>
      )}

      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
    </div>
  );
}