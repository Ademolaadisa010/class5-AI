"use client";

import { useState, useRef, useEffect } from "react";

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ic = {
  send:      "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  video:     "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 0 2-2z",
  phone:     "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.31 2 2 0 0 1 3.6 1.14h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 4v2m4-2v2m-2-4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  plus:      "M12 5v14M5 12h14",
  search:    "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  mic:       "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  micoff:    "M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v4M8 23h8",
  videooff:  "M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10M1 1l22 22",
  phoneoff:  "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91M1 1l22 22",
  x:         "M18 6L6 18M6 6l12 12",
  check:     "M20 6L9 17l-5-5",
  lock:      "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  globe:     "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  hash:      "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  chevron:   "M9 18l6-6-6-6",
  attach:    "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
  smile:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  screen:    "M2 3h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 21h8M12 17v4",
  hand:      "M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M6 14v0a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3",
  crown:     "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z",
};

/* ── types ──────────────────────────────────────────────── */
type CallMode = "idle" | "voice" | "video";

interface Member { id: string; name: string; avatar: string; color: string; online: boolean; role: "admin" | "member"; speaking?: boolean; muted?: boolean; }
interface ChatMsg { id: string; memberId: string; text: string; ts: Date; }
interface Group { id: string; name: string; subject: string; subjectColor: string; description: string; members: Member[]; messages: ChatMsg[]; isPrivate: boolean; }

/* ── data ───────────────────────────────────────────────── */
const ME: Member = { id:"me", name:"Ada Okonkwo", avatar:"A", color:"#7C3AED", online:true, role:"member" };

const GROUPS: Group[] = [
  {
    id:"g1", name:"Bio 200L Crew", subject:"Biology", subjectColor:"#10B981",
    description:"Final year biology students studying for exams together. Open discussions, past questions and AI summaries.",
    isPrivate:false,
    members:[
      ME,
      { id:"m1", name:"Chukwuemeka I.", avatar:"C", color:"#3B82F6", online:true,  role:"admin"  },
      { id:"m2", name:"Fatima K.",      avatar:"F", color:"#F59E0B", online:true,  role:"member" },
      { id:"m3", name:"Tunde A.",       avatar:"T", color:"#10B981", online:false, role:"member" },
      { id:"m4", name:"Ngozi E.",       avatar:"N", color:"#EC4899", online:true,  role:"member" },
      { id:"m5", name:"Sola B.",        avatar:"S", color:"#06B6D4", online:false, role:"member" },
    ],
    messages:[
      { id:"c1", memberId:"m1", text:"Hey everyone, let's start with cell division today 🔬", ts:new Date(Date.now()-3600000) },
      { id:"c2", memberId:"m2", text:"Perfect! I just uploaded my notes on mitosis. Can someone summarise it with AI?", ts:new Date(Date.now()-3500000) },
      { id:"c3", memberId:"m4", text:"I'll do it! Give me a minute", ts:new Date(Date.now()-3400000) },
      { id:"c4", memberId:"m4", text:"Done! Summary: Mitosis has 4 phases — PMAT. Produces 2 identical daughter cells. Cytokinesis follows telophase.", ts:new Date(Date.now()-3300000) },
      { id:"c5", memberId:"m1", text:"Great! Let's quiz each other on it. Who's going first?", ts:new Date(Date.now()-1800000) },
      { id:"c6", memberId:"m2", text:"Me! 🙋 Question: During which phase do chromosomes align at the equator?", ts:new Date(Date.now()-1700000) },
      { id:"c7", memberId:"me", text:"Metaphase! 🎯", ts:new Date(Date.now()-1600000) },
      { id:"c8", memberId:"m2", text:"Correct! +10 points Ada 🎉", ts:new Date(Date.now()-1500000) },
    ],
  },
  {
    id:"g2", name:"Physics JAMB Prep", subject:"Physics", subjectColor:"#2563EB",
    description:"Dedicated group for JAMB physics prep. Past questions, formulas and weekly mock tests.",
    isPrivate:false,
    members:[
      ME,
      { id:"m6", name:"David E.",   avatar:"D", color:"#2563EB", online:true,  role:"admin"  },
      { id:"m7", name:"Amara O.",   avatar:"A", color:"#8B5CF6", online:false, role:"member" },
      { id:"m8", name:"Rasheed K.", avatar:"R", color:"#F97316", online:true,  role:"member" },
    ],
    messages:[
      { id:"d1", memberId:"m6", text:"Mock test tomorrow at 2pm. Make sure you've covered waves and optics!", ts:new Date(Date.now()-86400000) },
      { id:"d2", memberId:"m7", text:"Got it! What about electromagnetic induction?", ts:new Date(Date.now()-82800000) },
      { id:"d3", memberId:"m6", text:"Yes, that too. Use the AI tutor to revise — it breaks it down really well.", ts:new Date(Date.now()-79200000) },
    ],
  },
  {
    id:"g3", name:"Maths Masters 🧮", subject:"Mathematics", subjectColor:"#F59E0B",
    description:"Advanced maths study group. Calculus, statistics and algebra covered weekly.",
    isPrivate:true,
    members:[
      ME,
      { id:"m9",  name:"Kemi A.",  avatar:"K", color:"#F59E0B", online:true,  role:"admin"  },
      { id:"m10", name:"Bola T.",  avatar:"B", color:"#10B981", online:true,  role:"member" },
    ],
    messages:[
      { id:"e1", memberId:"m9",  text:"Integration by parts session — Friday 5pm. Don't be late 😅", ts:new Date(Date.now()-172800000) },
      { id:"e2", memberId:"me",  text:"I'll be there! Can you share the formula sheet beforehand?",   ts:new Date(Date.now()-170000000) },
      { id:"e3", memberId:"m9",  text:"Sure, I'll upload it tomorrow 👍",                              ts:new Date(Date.now()-168000000) },
    ],
  },
];

const DISCOVER_GROUPS = [
  { id:"dg1", name:"Chemistry Organic",  subject:"Chemistry",  subjectColor:"#7C3AED", members:14, description:"Organic chemistry focus for SS3 and 100 level students." },
  { id:"dg2", name:"English & Lit Club", subject:"English",    subjectColor:"#EC4899", members:22, description:"Comprehension, essay writing and literature analysis." },
  { id:"dg3", name:"CS Algorithms",      subject:"CS",         subjectColor:"#06B6D4", members:9,  description:"Data structures and algorithms for university students." },
  { id:"dg4", name:"Economics 101",      subject:"Economics",  subjectColor:"#8B5CF6", members:18, description:"Micro and macroeconomics for WAEC and university." },
];

/* ── Video/Voice call overlay ───────────────────────────── */
function CallOverlay({ group, mode, onEnd }: { group: Group; mode: CallMode; onEnd: () => void }) {
  const [micOn, setMicOn]       = useState(true);
  const [camOn, setCamOn]       = useState(mode === "video");
  const [screen, setScreen]     = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [duration, setDuration] = useState(0);
  const [speaking, setSpeaking] = useState<string>("m1");

  useEffect(() => {
    const t = setInterval(() => setDuration((d) => d + 1), 1000);
    /* simulate speaking rotation */
    const s = setInterval(() => {
      const online = group.members.filter((m) => m.online);
      setSpeaking(online[Math.floor(Math.random() * online.length)].id);
    }, 3000);
    return () => { clearInterval(t); clearInterval(s); };
  }, [group.members]);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const online = group.members.filter((m) => m.online);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#070D1A" }}>

      {/* top bar */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
            style={{ background: `linear-gradient(135deg,${group.subjectColor},${group.subjectColor}99)`, fontFamily: "var(--font-sora)" }}>
            {group.subject[0]}
          </div>
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>{group.name}</p>
            <div className="flex items-center gap-2 text-xs" style={{ color: "#475569" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              <span style={{ color: "#EF4444", fontFamily: "var(--font-sora)", fontWeight: 600 }}>
                {mode === "video" ? "Video" : "Voice"} Call
              </span>
              <span style={{ fontFamily: "var(--font-dm)" }}>· {fmt(duration)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          {online.length} participants
        </div>
      </div>

      {/* participants grid */}
      <div className="flex-1 overflow-hidden p-4">
        {mode === "video" ? (
          <div className={`grid gap-3 h-full ${online.length <= 2 ? "grid-cols-2" : online.length <= 4 ? "grid-cols-2" : "grid-cols-3"}`}>
            {online.map((member) => {
              const isSpeaking = speaking === member.id || (member.id === "me" && speaking === "me");
              return (
                <div key={member.id} className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#1E293B,#0F172A)",
                    border: `2px solid ${isSpeaking ? member.color : "rgba(255,255,255,0.06)"}`,
                    boxShadow: isSpeaking ? `0 0 20px ${member.color}50` : "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    minHeight: 0,
                  }}>
                  {/* fake video bg */}
                  <div className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle at 50% 40%, ${member.color} 0%, transparent 70%)` }} />

                  {member.id === "me" && camOn ? (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg,#1a1040,#0a1628)" }}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2"
                          style={{ background: member.color, fontFamily: "var(--font-sora)" }}>{member.avatar}</div>
                        <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-dm)" }}>Camera on</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold transition-transform ${isSpeaking ? "scale-110" : ""}`}
                        style={{ background: member.color, fontFamily: "var(--font-sora)", boxShadow: isSpeaking ? `0 0 24px ${member.color}` : "none" }}>
                        {member.avatar}
                      </div>
                      {isSpeaking && (
                        <div className="flex items-end gap-0.5 h-5">
                          {[3,5,4,6,3,5,4].map((h,i) => (
                            <div key={i} className="w-1 rounded-full"
                              style={{ height: h*2, background: member.color, animation: `bar ${0.4+i*0.1}s ease-in-out infinite alternate` }} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* name + mic status */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
                    style={{ background: "linear-gradient(transparent,rgba(0,0,0,0.7))" }}>
                    <span className="text-white text-xs font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>
                      {member.id === "me" ? "You" : member.name.split(" ")[0]}
                      {member.role === "admin" && <span style={{ color: "#F59E0B" }}> 👑</span>}
                    </span>
                    <span style={{ color: member.id === "me" && !micOn ? "#EF4444" : "#64748B" }}>
                      <Icon d={member.id === "me" && !micOn ? ic.micoff : ic.mic} size={13} />
                    </span>
                  </div>

                  {/* speaking ring */}
                  {isSpeaking && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ border: `2px solid ${member.color}`, animation: "pulse-ring 1.5s ease-in-out infinite" }} />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* voice call grid */
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Voice Call · {group.name}</p>
            <div className={`grid gap-6 ${online.length <= 3 ? "grid-cols-3" : "grid-cols-4"} justify-items-center`}>
              {online.map((member) => {
                const isSpeaking = speaking === member.id;
                return (
                  <div key={member.id} className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 ${isSpeaking ? "scale-110" : ""}`}
                        style={{ background: member.color, fontFamily: "var(--font-sora)", boxShadow: isSpeaking ? `0 0 32px ${member.color}80` : "none" }}>
                        {member.avatar}
                      </div>
                      {isSpeaking && (
                        <>
                          <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: member.color }} />
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-4">
                            {[2,4,3,5,2].map((h,i) => (
                              <div key={i} className="w-1 rounded-full" style={{ height: h*2, background: member.color, animation: `bar ${0.3+i*0.1}s ease-in-out infinite alternate` }} />
                            ))}
                          </div>
                        </>
                      )}
                      {/* muted indicator */}
                      {member.id === "me" && !micOn && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "#EF4444" }}>
                          <Icon d={ic.micoff} size={11} />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-white text-center" style={{ fontFamily: "var(--font-sora)" }}>
                      {member.id === "me" ? "You" : member.name.split(" ")[0]}
                    </p>
                    {isSpeaking && (
                      <p className="text-[10px] font-semibold" style={{ color: member.color, fontFamily: "var(--font-sora)" }}>Speaking…</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* controls bar */}
      <div className="flex-shrink-0 px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* mic */}
          <button onClick={() => setMicOn(!micOn)}
            className="flex flex-col items-center gap-1.5 group"
            title={micOn ? "Mute" : "Unmute"}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{ background: micOn ? "rgba(255,255,255,0.08)" : "#EF4444", color: "#fff" }}
              onMouseEnter={(e) => { if (micOn) e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={(e) => { if (micOn) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
              <Icon d={micOn ? ic.mic : ic.micoff} size={20} />
            </div>
            <span className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
              {micOn ? "Mute" : "Unmute"}
            </span>
          </button>

          {/* camera (video only) */}
          {mode === "video" && (
            <button onClick={() => setCamOn(!camOn)}
              className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
                style={{ background: camOn ? "rgba(255,255,255,0.08)" : "#EF4444", color: "#fff" }}>
                <Icon d={camOn ? ic.video : ic.videooff} size={20} />
              </div>
              <span className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
                {camOn ? "Stop Cam" : "Start Cam"}
              </span>
            </button>
          )}

          {/* screen share */}
          <button onClick={() => setScreen(!screen)}
            className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{ background: screen ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.08)", color: screen ? "#60A5FA" : "#fff" }}>
              <Icon d={ic.screen} size={20} />
            </div>
            <span className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
              {screen ? "Sharing" : "Share"}
            </span>
          </button>

          {/* raise hand */}
          <button onClick={() => setHandRaised(!handRaised)}
            className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{ background: handRaised ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)", color: handRaised ? "#F59E0B" : "#fff" }}>
              <span className="text-xl">{handRaised ? "✋" : "🤚"}</span>
            </div>
            <span className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>
              {handRaised ? "Lower" : "Raise"}
            </span>
          </button>

          {/* participants */}
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}>
              <Icon d={ic.users} size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: "#2563EB", fontFamily: "var(--font-sora)" }}>
                {online.length}
              </span>
            </div>
            <span className="text-[10px]" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>People</span>
          </button>

          {/* end call */}
          <button onClick={onEnd}
            className="flex flex-col items-center gap-1.5 ml-4">
            <div className="w-14 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{ background: "#EF4444", color: "#fff", boxShadow: "0 4px 20px rgba(239,68,68,0.45)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#DC2626"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#EF4444"; e.currentTarget.style.transform = "scale(1)"; }}>
              <Icon d={mode === "video" ? ic.videooff : ic.phoneoff} size={22} />
            </div>
            <span className="text-[10px] text-red-400" style={{ fontFamily: "var(--font-dm)" }}>End Call</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bar { from { transform: scaleY(0.5); } to { transform: scaleY(1.2); } }
        @keyframes pulse-ring { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:0.2;transform:scale(1.02)} }
      `}</style>
    </div>
  );
}

/* ── Create group modal ─────────────────────────────────── */
function CreateModal({ onClose }: { onClose: () => void }) {
  const [name, setName]         = useState("");
  const [subject, setSubject]   = useState("");
  const [desc, setDesc]         = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [done, setDone]         = useState(false);

  const subjects = ["Biology","Chemistry","Physics","Mathematics","English","History","Computer Science","Economics","Geography"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
        <div className="px-6 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-sora)" }}>Create Study Group</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <Icon d={ic.x} size={18} />
          </button>
        </div>
        {done ? (
          <div className="px-6 py-12 text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <h3 className="text-white font-extrabold text-xl" style={{ fontFamily: "var(--font-sora)" }}>Group Created!</h3>
            <p className="text-sm" style={{ color: "#64748B", fontFamily: "var(--font-dm)" }}>
              <strong className="text-white">{name}</strong> is ready. Share the invite link with your classmates.
            </p>
            <button onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-white text-sm"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)" }}>
              Go to Group
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            {[
              { label: "Group Name", val: name, set: setName, placeholder: "e.g. Bio 200L Study Crew" },
              { label: "Description", val: desc, set: setDesc, placeholder: "What will you study together?" },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>{f.label}</label>
                <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                  style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.15)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-sora)" }}>Subject</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button key={s} onClick={() => setSubject(s)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ fontFamily: "var(--font-sora)", background: subject === s ? "rgba(37,99,235,0.2)" : "rgba(30,41,59,0.6)", color: subject === s ? "#60A5FA" : "#475569", border: `1px solid ${subject === s ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.06)"}` }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => setIsPrivate(!isPrivate)}
                className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                style={{ background: isPrivate ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E293B", border: `1.5px solid ${isPrivate ? "#2563EB" : "rgba(255,255,255,0.1)"}` }}>
                {isPrivate && <Icon d={ic.check} size={11} />}
              </div>
              <div>
                <p className="text-sm text-white font-semibold" style={{ fontFamily: "var(--font-sora)" }}>Private Group</p>
                <p className="text-xs" style={{ color: "#475569", fontFamily: "var(--font-dm)" }}>Only invited members can join</p>
              </div>
            </label>
            <button onClick={() => { if (name && subject) setDone(true); }}
              disabled={!name || !subject}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all mt-2"
              style={{ background: !name || !subject ? "#1E293B" : "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", cursor: !name || !subject ? "not-allowed" : "pointer", boxShadow: name && subject ? "0 6px 24px rgba(37,99,235,0.35)" : "none" }}>
              Create Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Group chat panel ───────────────────────────────────── */
function GroupChat({ group, onCall }: { group: Group; onCall: (mode: CallMode) => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>(group.messages);
  const [input, setInput]       = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now().toString(), memberId: "me", text: input.trim(), ts: new Date() }]);
    setInput("");
  };

  const getMember = (id: string) => group.members.find((m) => m.id === id);
  const online = group.members.filter((m) => m.online);

  const fmtTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">

      {/* chat topbar */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(11,17,32,0.7)", backdropFilter: "blur(10px)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: `linear-gradient(135deg,${group.subjectColor},${group.subjectColor}99)`, fontFamily: "var(--font-sora)" }}>
          {group.subject[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate" style={{ fontFamily: "var(--font-sora)" }}>{group.name}</p>
          <p className="text-xs" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
            <span className="text-emerald-400">{online.length} online</span> · {group.members.length} members
          </p>
        </div>

        {/* call buttons */}
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMembers(!showMembers)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{ background: showMembers ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.05)", color: showMembers ? "#60A5FA" : "#64748B", fontFamily: "var(--font-sora)" }}>
            <Icon d={ic.users} size={13} /> Members
          </button>

          <button onClick={() => onCall("voice")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "rgba(16,185,129,0.14)", border: "1px solid rgba(16,185,129,0.25)", fontFamily: "var(--font-sora)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.14)"; }}>
            <Icon d={ic.phone} size={14} />
            <span className="hidden sm:inline" style={{ color: "#10B981" }}>Voice</span>
          </button>

          <button onClick={() => onCall("video")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.25)", fontFamily: "var(--font-sora)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.14)"; }}>
            <Icon d={ic.video} size={14} />
            <span className="hidden sm:inline" style={{ color: "#60A5FA" }}>Video</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => {
            const member = getMember(msg.memberId);
            const isMe = msg.memberId === "me";
            if (!member) return null;
            return (
              <div key={msg.id} className={`flex items-end gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}>
                {!isMe && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: member.color, fontFamily: "var(--font-sora)" }}>{member.avatar}</div>
                )}
                <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                  {!isMe && (
                    <p className="text-xs mb-1 px-1" style={{ color: member.color, fontFamily: "var(--font-sora)", fontWeight: 600 }}>
                      {member.name.split(" ")[0]}
                      {member.role === "admin" && " 👑"}
                    </p>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMe ? "rounded-br-none" : "rounded-bl-none"}`}
                    style={{
                      background: isMe ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "rgba(30,41,59,0.8)",
                      border: isMe ? "none" : "1px solid rgba(255,255,255,0.07)",
                      color: "#F8FAFC",
                      fontFamily: "var(--font-dm)",
                    }}>
                    {msg.text}
                  </div>
                  <p className="text-[10px] mt-1 px-1" style={{ color: "#1E293B", fontFamily: "var(--font-dm)" }}>
                    {fmtTime(msg.ts)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* members panel */}
        {showMembers && (
          <div className="hidden sm:flex flex-col w-56 flex-shrink-0"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", background: "#0B1120" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>
                Members · {group.members.length}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {group.members.map((m) => (
                <div key={m.id} className="flex items-center gap-2.5 px-2 py-2 rounded-xl"
                  style={{ background: m.id === "me" ? "rgba(37,99,235,0.08)" : "transparent" }}>
                  <div className="relative flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: m.color, fontFamily: "var(--font-sora)" }}>{m.avatar}</div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border"
                      style={{ background: m.online ? "#10B981" : "#475569", borderColor: "#0B1120" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: m.id === "me" ? "#F8FAFC" : "#94A3B8", fontFamily: "var(--font-sora)" }}>
                      {m.id === "me" ? "You" : m.name.split(" ")[0]}
                    </p>
                  </div>
                  {m.role === "admin" && <Icon d={ic.crown} size={12} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-end gap-2 p-2.5 rounded-2xl"
          style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)" }}>
          <button className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ color: "#334155" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}>
            <Icon d={ic.attach} size={17} />
          </button>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-sm outline-none text-white"
            style={{ fontFamily: "var(--font-dm)" }} />
          <button className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ color: "#334155" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}>
            <Icon d={ic.smile} size={17} />
          </button>
          <button onClick={send} disabled={!input.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
            style={{ background: input.trim() ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#334155", color: "#fff", cursor: input.trim() ? "pointer" : "not-allowed", boxShadow: input.trim() ? "0 4px 14px rgba(37,99,235,0.35)" : "none" }}>
            <Icon d={ic.send} size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function StudyGroupsPage() {
  const [activeGroup, setActiveGroup] = useState<Group>(GROUPS[0]);
  const [callMode, setCallMode]       = useState<CallMode>("idle");
  const [showCreate, setShowCreate]   = useState(false);
  const [search, setSearch]           = useState("");

  const filtered = GROUPS.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">

      {callMode !== "idle" && (
        <CallOverlay group={activeGroup} mode={callMode} onEnd={() => setCallMode("idle")} />
      )}
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}

      {/* ── sidebar list ──────────────────────────── */}
      <aside className="w-72 flex-shrink-0 flex flex-col overflow-hidden"
        style={{ background: "#0B1120", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

        {/* header */}
        <div className="px-4 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-sora)" }}>Study Groups</h3>
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", fontFamily: "var(--font-sora)", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
              <Icon d={ic.plus} size={13} /> New
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#334155" }}>
              <Icon d={ic.search} size={14} />
            </span>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups…"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs text-white outline-none"
              style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-dm)" }} />
          </div>
        </div>

        {/* my groups */}
        <div className="flex-1 overflow-y-auto">
          <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>My Groups</p>
          {filtered.map((g) => {
            const online = g.members.filter((m) => m.online).length;
            const last = g.messages[g.messages.length - 1];
            const lastMember = g.members.find((m) => m.id === last?.memberId);
            const isActive = activeGroup.id === g.id;
            return (
              <button key={g.id} onClick={() => setActiveGroup(g)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                style={{ background: isActive ? "rgba(37,99,235,0.1)" : "transparent", borderLeft: `2px solid ${isActive ? "#2563EB" : "transparent"}` }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 relative"
                  style={{ background: `linear-gradient(135deg,${g.subjectColor},${g.subjectColor}99)`, fontFamily: "var(--font-sora)" }}>
                  {g.subject[0]}
                  {g.isPrivate && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "#1E293B" }}>
                      <Icon d={ic.lock} size={9} />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>{g.name}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px]" style={{ color: "#10B981", fontFamily: "var(--font-sora)" }}>{online}</span>
                    </div>
                  </div>
                  {last && lastMember && (
                    <p className="text-[10px] truncate mt-0.5" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>
                      <span style={{ color: lastMember.id === "me" ? "#2563EB" : lastMember.color }}>
                        {lastMember.id === "me" ? "You" : lastMember.name.split(" ")[0]}:
                      </span>{" "}{last.text}
                    </p>
                  )}
                </div>
              </button>
            );
          })}

          {/* discover */}
          <p className="px-4 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#334155", fontFamily: "var(--font-sora)" }}>Discover</p>
          {DISCOVER_GROUPS.map((g) => (
            <div key={g.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${g.subjectColor},${g.subjectColor}99)`, fontFamily: "var(--font-sora)" }}>
                {g.subject[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "var(--font-sora)" }}>{g.name}</p>
                <p className="text-[10px]" style={{ color: "#334155", fontFamily: "var(--font-dm)" }}>{g.members} members</p>
              </div>
              <button className="text-xs font-bold px-2.5 py-1 rounded-lg transition-all flex-shrink-0"
                style={{ background: `${g.subjectColor}18`, color: g.subjectColor, border: `1px solid ${g.subjectColor}30`, fontFamily: "var(--font-sora)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${g.subjectColor}30`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${g.subjectColor}18`; }}>
                Join
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* ── main chat area ────────────────────────── */}
      <GroupChat key={activeGroup.id} group={activeGroup} onCall={setCallMode} />
    </div>
  );
}