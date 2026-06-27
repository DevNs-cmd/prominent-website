import React, { useState } from "react";
import { ShieldCheck, BookOpen, Layers, Users, Scale } from "lucide-react";

interface TabContent {
  title: string;
  icon: any;
  content: { heading: string; text: string }[];
}

const CONSTITUTION_DATA: Record<string, TabContent> = {
  mission: {
    title: "Mission & Vision",
    icon: ShieldCheck,
    content: [
      { heading: "ARTICLE I: PRIMARY MISSION", text: "To bridge academic marketing paradigms with executive corporate workflows, creating a sandbox for elite student professionals to manage actual campaigns, sponsorship budgets, and brand assets." },
      { heading: "ARTICLE II: VISION STATEMENTS", text: "1. Institutional Brand: To position PROMINENT as the premier collegiate marketing club in India, evaluated against top B-school standard indices.\n2. Talent Pipeline: To maintain a zero-friction recruitment corridor feeding top-tier consultants, performance planners, and brand managers directly to the market." }
    ]
  },
  values: {
    title: "Core Values",
    icon: BookOpen,
    content: [
      { heading: "ARTICLE III: THE FOUR PILLARS", text: "1. Authority: Operating as subject matter experts; making decisions based on data, case studies, and brand alignment benchmarks.\n2. Leadership: Fostering cohort-wide mentorship where senior board directors are fully accountable for the learning outcomes and output of junior coordinators." },
      { heading: "3. Professionalism & Execution", text: "Delivering client briefs, presentation slides, and sponsor activations on time, with zero tolerance for sub-optimal draft iterations or placeholder assets." }
    ]
  },
  structure: {
    title: "Club Structure",
    icon: Layers,
    content: [
      { heading: "ARTICLE IV: INSTITUTIONAL HIERARCHY", text: "The Executive Board coordinates operations through clear vertical ownership. The President guides global partnerships and administration compliance, the Vice President directs departmental output, and Directors own specific verticals (Events, Content, Design, Outreach)." },
      { heading: "ARTICLE V: VOTING PROTOCOLS", text: "Major strategic alignments (such as constitution revisions or presidential succession plans) require a 2/3 supermajority vote from the sitting Board of Directors." }
    ]
  },
  selection: {
    title: "Selection Process",
    icon: Users,
    content: [
      { heading: "ARTICLE VI: COHORT RECRUITMENT", text: "Intake is conducted in a structured, four-tier evaluation process designed to emulate management consulting recruitments: Application Screen, Case Study Briefing, Panel Interview, and Board Selection." },
      { heading: "ARTICLE VII: BOARD SUCCESSION", text: "Elections are held annually at the end of Term II. Candidates are evaluated on cumulative campaign output, peer reviews, and an interview board composed of outgoing leaders and faculty mentors." }
    ]
  },
  responsibilities: {
    title: "Responsibilities",
    icon: Scale,
    content: [
      { heading: "ARTICLE VIII: COHORT DELIVERABLES", text: "All active members must attend weekly assemblies, lead at least one campaign activation per term, and mentor incoming juniors. Board directors assume complete accountability for project failures in their respective verticals." },
      { heading: "ARTICLE IX: COMPLIANCE & ATTENDANCE", text: "A minimum of 85% attendance is required for term certification. Any member failing to meet brief requirements or violating the professional code is subject to a board review." }
    ]
  }
};

export function Constitution() {
  const [activeTab, setActiveTab] = useState<string>("mission");

  const tab = CONSTITUTION_DATA[activeTab];
  const Icon = tab.icon;

  return (
    <div className="bg-[#0D0D0D]/40 border border-white/[0.05] rounded-sm p-6 lg:p-10">
      <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] gap-8">
        
        {/* Navigation vertical list */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide shrink-0">
          {Object.entries(CONSTITUTION_DATA).map(([key, item]) => {
            const TabIcon = item.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 px-5 py-3.5 text-left text-xs font-black tracking-widest uppercase transition-all rounded-sm cursor-pointer whitespace-nowrap lg:whitespace-normal w-full border ${
                  isActive 
                    ? "bg-[#050505] border-[#85bde2]/30 text-white shadow-[0_0_15px_rgba(133,189,226,0.03)]" 
                    : "bg-transparent border-transparent text-[#717182] hover:text-[#A1A1AA]"
                }`}
              >
                <TabIcon size={13} className={isActive ? "text-[#85bde2]" : "text-[#717182]"} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Official Document content window */}
        <div className="bg-[#050505]/65 border border-white/[0.06] rounded-sm p-6 md:p-8 relative overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.6)] min-h-[300px]">
          
          {/* Subtle watermark / background grid */}
          <div className="absolute top-6 right-6 opacity-[0.03] text-white pointer-events-none">
            <Icon size={200} />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[8px] text-[#85bde2] tracking-[0.25em] font-black uppercase flex items-center gap-1.5">
                  <Icon size={10} /> PROMINENT CHARTER
                </span>
                <span className="text-[8px] text-[#717182] font-mono">CONSTITUTION_SEC_{activeTab.toUpperCase()}</span>
              </div>

              <div className="flex flex-col gap-6 text-left">
                {tab.content.map((sec, idx) => (
                  <div key={idx} className="flex flex-col gap-2.5">
                    <h4 className="text-xs font-black text-white tracking-widest uppercase border-b border-white/[0.04] pb-1.5">
                      {sec.heading}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed font-light whitespace-pre-line">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-4 border-t border-white/[0.05] flex justify-between items-center text-[9px] text-[#717182] font-mono">
              <span>REF: CONST_V3.0_RELEASED</span>
              <span>VERIFIED: BOARD_EXECUTIVE_AY_2026-27</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
