import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Briefcase, Award, GraduationCap, Link2 } from "lucide-react";

interface AlumniNode {
  id: string;
  name: string;
  role: string;
  company: string;
  batch: string;
  achievements: string;
  x: number; // percentage width
  y: number; // percentage height
}

const ALUMNI_NODES: AlumniNode[] = [
  { id: "alumni_1", name: "Prachi Joshi", company: "Hindustan Unilever", role: "Brand Manager", batch: "2022", achievements: "Launched nationwide sustainable packaging drive.", x: 25, y: 30 },
  { id: "alumni_2", name: "Aditya Kumar", company: "Deloitte Digital", role: "Senior Consultant", batch: "2023", achievements: "Led digital strategy audits for 3 Fortune 500 banks.", x: 75, y: 25 },
  { id: "alumni_3", name: "Kabir Malhotra", company: "Dentsu India", role: "Strategy Lead", batch: "2024", achievements: "Won Campaign India 'Rising Star' award in Strategy.", x: 15, y: 65 },
  { id: "alumni_4", name: "Simran Kaur", company: "Accenture Song", role: "Digital Analyst", batch: "2023", achievements: "Managed transition strategy for leading retail brand.", x: 80, y: 70 },
  { id: "alumni_5", name: "Rishi Desai", company: "GroupM", role: "Media Planner", batch: "2022", achievements: "Optimized a 15Cr digital media portfolio allocation.", x: 45, y: 20 },
  { id: "alumni_6", name: "Tanya Singh", company: "EY Parthenon", role: "Strategy Analyst", batch: "2024", achievements: "Published whitepaper on D2C entry strategies.", x: 50, y: 80 }
];

const COMPANY_NODES = [
  { name: "Unilever", x: 35, y: 40 },
  { name: "Deloitte", x: 62, y: 38 },
  { name: "Dentsu", x: 28, y: 60 },
  { name: "Accenture", x: 68, y: 60 },
  { name: "GroupM", x: 48, y: 35 },
  { name: "EY", x: 50, y: 62 }
];

export function NetworkMap() {
  const [activeNode, setActiveNode] = useState<AlumniNode>(ALUMNI_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="bg-[#0D0D0D]/40 border border-white/[0.05] rounded-sm p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        
        {/* Visual Map Representation */}
        <div className="flex-1 min-h-[400px] bg-black/60 border border-white/[0.05] rounded-sm relative overflow-hidden p-6 select-none">
          
          {/* Subtle Background Blueprint Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="net-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#85bde2" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#net-grid)" />
            </svg>
          </div>

          {/* Central Hub: PROMINENT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#0D0D0D] border border-[#85bde2]/40 flex items-center justify-center shadow-[0_0_30px_rgba(133,189,226,0.15)]">
              <span className="text-[10px] font-black text-white tracking-widest uppercase">HUB</span>
            </div>
            <span className="text-[8px] tracking-[0.25em] text-[#85bde2] uppercase font-bold mt-2">PROMINENT ALUMNI</span>
          </div>

          {/* Connection Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {ALUMNI_NODES.map((node) => {
              // Find matching company coordinate
              const company = COMPANY_NODES.find(c => c.name === node.company.split(" ")[0] || node.company.includes(c.name));
              const compX = company ? company.x : 50;
              const compY = company ? company.y : 50;

              const isHighlighted = activeNode.id === node.id || hoveredNode === node.id;

              return (
                <g key={node.id}>
                  {/* Line from Central Hub to Company Node */}
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2={`${compX}%`} 
                    y2={`${compY}%`} 
                    stroke={isHighlighted ? "rgba(133, 189, 226, 0.4)" : "rgba(255,255,255,0.04)"}
                    strokeWidth={isHighlighted ? 1.5 : 1}
                    className="transition-all duration-300"
                  />
                  {/* Line from Company Node to Alumni Node */}
                  <line 
                    x1={`${compX}%`} 
                    y1={`${compY}%`} 
                    x2={`${node.x}%`} 
                    y2={`${node.y}%`} 
                    stroke={isHighlighted ? "rgba(133, 189, 226, 0.6)" : "rgba(255,255,255,0.06)"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Company Nodes */}
          {COMPANY_NODES.map((company) => (
            <div 
              key={company.name}
              style={{ left: `${company.x}%`, top: `${company.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1 bg-[#121212] border border-white/[0.08] text-[9px] font-bold text-[#A1A1AA] uppercase tracking-wider rounded-sm"
            >
              {company.name}
            </div>
          ))}

          {/* Alumni Nodes */}
          {ALUMNI_NODES.map((node) => {
            const isActive = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? "bg-[#85bde2] scale-125 ring-4 ring-[#85bde2]/20" 
                    : "bg-[#1C1C1E] border border-white/30 group-hover:border-[#85bde2] group-hover:bg-[#85bde2]/20"
                }`} />
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#0D0D0D]/95 border text-[10px] font-bold text-white uppercase whitespace-nowrap rounded-sm shadow-xl transition-all pointer-events-none ${
                  isActive || hoveredNode === node.id
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-2"
                } ${isActive ? "border-[#85bde2]/30" : "border-white/[0.08]"}`}>
                  {node.name}
                </div>
              </button>
            );
          })}

        </div>

        {/* Right Side: Showcase Panel */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col justify-start">
          <p className="text-[9px] tracking-[0.35em] text-[#85bde2] uppercase font-bold mb-3 flex items-center gap-1.5">
            <Link2 size={10} /> Alumni Details
          </p>
          <div className="bg-[#050505]/60 border border-white/[0.06] hover:border-[#85bde2]/20 rounded-sm p-6 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] text-[#85bde2] tracking-[0.25em] font-black uppercase">
                  Batch of {activeNode.batch}
                </span>
                <span className="text-[8px] text-[#717182] font-semibold border border-white/10 px-2 py-0.5 rounded-full">
                  ALUM_REF_{activeNode.id.toUpperCase()}
                </span>
              </div>

              <h4 className="text-xl font-black text-white uppercase tracking-wide leading-tight mb-1">{activeNode.name}</h4>
              
              <div className="flex items-center gap-2 mt-2 mb-4 text-xs font-semibold text-[#A1A1AA]">
                <Briefcase size={12} className="text-[#85bde2]" />
                <span>{activeNode.role}</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs font-light text-[#717182]">
                <MapPin size={12} className="text-[#85bde2]/70" />
                <span>{activeNode.company}</span>
              </div>

              <div className="h-[1px] bg-white/[0.06] my-4" />

              <div className="bg-[#0D0D0D]/80 border border-white/[0.04] p-4 rounded-sm">
                <p className="text-[8px] text-[#85bde2] tracking-[0.2em] uppercase font-black mb-1.5 flex items-center gap-1">
                  <Award size={9} /> Legacy Achievement
                </p>
                <p className="text-xs text-[#d4e6f4] leading-relaxed font-light">
                  {activeNode.achievements}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center gap-2 text-[10px] text-[#717182]">
              <GraduationCap size={12} />
              <span>Career progression pathways tracked live</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
