import React, { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { Users, Mail, Linkedin, ChevronDown, ChevronRight, Award, Layers } from "lucide-react";

import presidentImg from "@/imports/President.png";
import vicePresidentImg from "@/imports/Vice President.png";
import secretaryImg from "@/imports/Secretary.png";
import jointSecretaryImg from "@/imports/Joint Secretary.png";
import studentCoordinatorHeadImg from "@/imports/Student Coordinator Head.png";
import eventHeadImg from "@/imports/Event Head.png";
import socialMediaHeadImg from "@/imports/Social Media HEad.png";
import docHeadImg from "@/imports/Documentation Head.png";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  image: string;
  bio: string;
  linkedin: string;
  email: string;
  children?: string[]; // IDs of children
}

const BOARD_DATA: Record<string, BoardMember> = {
  president: {
    id: "president",
    name: "Dev N Suman",
    role: "President",
    dept: "Executive Leadership",
    image: presidentImg,
    bio: "Driving the strategic vision, institutional partnerships, and core output metrics of PROMINENT.",
    linkedin: "https://linkedin.com/in/devnsuman",
    email: "dev.suman@prominent.club",
    children: ["vp"]
  },
  vp: {
    id: "vp",
    name: "Sunidhi Sharma",
    role: "Vice President",
    dept: "Operations & Strategy",
    image: vicePresidentImg,
    bio: "Overseeing day-to-day operations, cross-department campaigns, and strategic recruitment pipeline.",
    linkedin: "https://linkedin.com/in/sunidhisharma",
    email: "sunidhi.sharma@prominent.club",
    children: ["secretary", "joint_secretary"]
  },
  secretary: {
    id: "secretary",
    name: "Sneha Pillai",
    role: "Secretary",
    dept: "Administration & Compliance",
    image: secretaryImg,
    bio: "Managing club communications, official documentations, constitution compliance, and scheduling.",
    linkedin: "https://linkedin.com/in/snehapillai",
    email: "sneha.pillai@prominent.club",
    children: ["event_head", "doc_head"]
  },
  joint_secretary: {
    id: "joint_secretary",
    name: "Aryan Shah",
    role: "Joint Secretary",
    dept: "External Relations & Branding",
    image: jointSecretaryImg,
    bio: "Coordinating inter-college events, brand alignments, and sponsor communication protocols.",
    linkedin: "https://linkedin.com/in/aryanshah",
    email: "aryan.shah@prominent.club",
    children: ["social_media_head", "student_coordinator"]
  },
  event_head: {
    id: "event_head",
    name: "Meera Joshi",
    role: "Director of Events",
    dept: "Events & Operations",
    image: eventHeadImg,
    bio: "Spearheading execution, logistics, and hospitality for summits, case competitions, and conclaves.",
    linkedin: "https://linkedin.com/in/meerajoshi",
    email: "meera.joshi@prominent.club"
  },
  doc_head: {
    id: "doc_head",
    name: "Kiran Rao",
    role: "Director of Documentation",
    dept: "Documentation & Editorial",
    image: docHeadImg,
    bio: "Structuring case briefs, annual report compile scripts, and archival records management.",
    linkedin: "https://linkedin.com/in/kiranrao",
    email: "kiran.rao@prominent.club"
  },
  social_media_head: {
    id: "social_media_head",
    name: "Nisha Iyer",
    role: "Director of Marketing & PR",
    dept: "Creative & Outreach",
    image: socialMediaHeadImg,
    bio: "Directing public relations, brand tone, content schedules, and digital presence across socials.",
    linkedin: "https://linkedin.com/in/nishaiyer",
    email: "nisha.iyer@prominent.club"
  },
  student_coordinator: {
    id: "student_coordinator",
    name: "Rohan Das",
    role: "Student Coordinator Head",
    dept: "Cohort Management",
    image: studentCoordinatorHeadImg,
    bio: "Monitoring internal member growth, peer mentorships, and coordinator alignment plans.",
    linkedin: "https://linkedin.com/in/rohandas",
    email: "rohan.das@prominent.club"
  }
};

export function OrgChart() {
  const [selectedMember, setSelectedMember] = useState<BoardMember>(BOARD_DATA.president);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div className="bg-[#0D0D0D]/40 border border-white/[0.05] rounded-sm p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Org Tree Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[500px] border-b lg:border-b-0 lg:border-r border-white/[0.06] pr-0 lg:pr-10 overflow-x-auto">
          <div className="flex flex-col items-center gap-10 min-w-[500px]">
            
            {/* Level 1: President */}
            <div className="relative">
              <MemberNode 
                member={BOARD_DATA.president}
                isSelected={selectedMember.id === "president"}
                isHovered={hoveredMember === "president"}
                onClick={() => setSelectedMember(BOARD_DATA.president)}
                onHover={(h) => setHoveredMember(h ? "president" : null)}
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-[#85bde2]/20" />
            </div>

            {/* Level 2: VP */}
            <div className="relative mt-2">
              <MemberNode 
                member={BOARD_DATA.vp}
                isSelected={selectedMember.id === "vp"}
                isHovered={hoveredMember === "vp"}
                onClick={() => setSelectedMember(BOARD_DATA.vp)}
                onHover={(h) => setHoveredMember(h ? "vp" : null)}
              />
              
              {/* Connecting Tree Lines to level 3 */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-[#85bde2]/20" />
              <div className="absolute top-[calc(100%+24px)] left-1/4 right-1/4 h-[1.5px] bg-[#85bde2]/20" />
              <div className="absolute top-[calc(100%+24px)] left-1/4 w-[1.5px] h-6 bg-[#85bde2]/20" />
              <div className="absolute top-[calc(100%+24px)] right-1/4 w-[1.5px] h-6 bg-[#85bde2]/20" />
            </div>

            {/* Level 3: Sec & Joint Sec */}
            <div className="flex justify-between w-full px-6 gap-8">
              <div className="relative flex flex-col items-center w-1/2">
                <MemberNode 
                  member={BOARD_DATA.secretary}
                  isSelected={selectedMember.id === "secretary"}
                  isHovered={hoveredMember === "secretary"}
                  onClick={() => setSelectedMember(BOARD_DATA.secretary)}
                  onHover={(h) => setHoveredMember(h ? "secretary" : null)}
                />
                
                {/* Lines to level 4 */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-[#85bde2]/20" />
                <div className="absolute top-[calc(100%+24px)] left-0 right-0 h-[1.5px] bg-[#85bde2]/20" />
                <div className="absolute top-[calc(100%+24px)] left-0 w-[1.5px] h-6 bg-[#85bde2]/20" />
                <div className="absolute top-[calc(100%+24px)] right-0 w-[1.5px] h-6 bg-[#85bde2]/20" />
              </div>

              <div className="relative flex flex-col items-center w-1/2">
                <MemberNode 
                  member={BOARD_DATA.joint_secretary}
                  isSelected={selectedMember.id === "joint_secretary"}
                  isHovered={hoveredMember === "joint_secretary"}
                  onClick={() => setSelectedMember(BOARD_DATA.joint_secretary)}
                  onHover={(h) => setHoveredMember(h ? "joint_secretary" : null)}
                />

                {/* Lines to level 4 */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-[#85bde2]/20" />
                <div className="absolute top-[calc(100%+24px)] left-0 right-0 h-[1.5px] bg-[#85bde2]/20" />
                <div className="absolute top-[calc(100%+24px)] left-0 w-[1.5px] h-6 bg-[#85bde2]/20" />
                <div className="absolute top-[calc(100%+24px)] right-0 w-[1.5px] h-6 bg-[#85bde2]/20" />
              </div>
            </div>

            {/* Level 4: Directors */}
            <div className="flex justify-between w-full gap-2">
              {/* Secretary's Children */}
              <div className="flex justify-around w-1/2 gap-4">
                <MemberNode 
                  member={BOARD_DATA.event_head}
                  isSelected={selectedMember.id === "event_head"}
                  isHovered={hoveredMember === "event_head"}
                  onClick={() => setSelectedMember(BOARD_DATA.event_head)}
                  onHover={(h) => setHoveredMember(h ? "event_head" : null)}
                  small
                />
                <MemberNode 
                  member={BOARD_DATA.doc_head}
                  isSelected={selectedMember.id === "doc_head"}
                  isHovered={hoveredMember === "doc_head"}
                  onClick={() => setSelectedMember(BOARD_DATA.doc_head)}
                  onHover={(h) => setHoveredMember(h ? "doc_head" : null)}
                  small
                />
              </div>

              {/* Joint Sec's Children */}
              <div className="flex justify-around w-1/2 gap-4">
                <MemberNode 
                  member={BOARD_DATA.social_media_head}
                  isSelected={selectedMember.id === "social_media_head"}
                  isHovered={hoveredMember === "social_media_head"}
                  onClick={() => setSelectedMember(BOARD_DATA.social_media_head)}
                  onHover={(h) => setHoveredMember(h ? "social_media_head" : null)}
                  small
                />
                <MemberNode 
                  member={BOARD_DATA.student_coordinator}
                  isSelected={selectedMember.id === "student_coordinator"}
                  isHovered={hoveredMember === "student_coordinator"}
                  onClick={() => setSelectedMember(BOARD_DATA.student_coordinator)}
                  onHover={(h) => setHoveredMember(h ? "student_coordinator" : null)}
                  small
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Detailed Profile Viewer */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col justify-start">
          <p className="text-[9px] tracking-[0.35em] text-[#85bde2] uppercase font-bold mb-3 flex items-center gap-1.5">
            <Award size={10} /> Profile Showcase
          </p>
          <div className="bg-[#050505]/60 border border-white/[0.06] hover:border-[#85bde2]/20 rounded-sm overflow-hidden p-6 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            
            <div className="aspect-[4/5] w-full rounded-sm overflow-hidden border border-white/10 mb-5 relative group">
              <ImageWithFallback 
                src={selectedMember.image} 
                alt={selectedMember.name} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="bg-[#85bde2]/15 text-[#85bde2] border border-[#85bde2]/20 px-2 py-0.5 text-[8px] tracking-widest font-black uppercase rounded-full">
                  {selectedMember.dept}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-black text-white uppercase tracking-wide leading-tight">{selectedMember.name}</h4>
            <p className="text-xs text-[#85bde2] font-semibold mt-0.5 tracking-wider uppercase">{selectedMember.role}</p>
            
            <div className="h-[1px] bg-white/[0.06] my-4" />
            
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-light">
              {selectedMember.bio}
            </p>

            <div className="flex flex-col gap-3">
              <a 
                href={selectedMember.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-xs text-[#717182] hover:text-[#85bde2] transition-colors group cursor-pointer"
              >
                <span className="p-1.5 bg-white/[0.02] border border-white/[0.05] rounded-sm group-hover:bg-[#85bde2]/10 transition-all">
                  <Linkedin size={12} />
                </span>
                LinkedIn Profile
              </a>
              <a 
                href={`mailto:${selectedMember.email}`}
                className="flex items-center gap-3 text-xs text-[#717182] hover:text-white transition-colors group cursor-pointer"
              >
                <span className="p-1.5 bg-white/[0.02] border border-white/[0.05] rounded-sm group-hover:bg-white/10 transition-all">
                  <Mail size={12} />
                </span>
                {selectedMember.email}
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponent for org nodes
function MemberNode({ 
  member, 
  isSelected, 
  isHovered, 
  onClick, 
  onHover,
  small = false 
}: { 
  member: BoardMember; 
  isSelected: boolean; 
  isHovered: boolean; 
  onClick: () => void; 
  onHover: (h: boolean) => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`text-left rounded-sm transition-all duration-300 cursor-pointer relative ${
        small 
          ? "w-[125px] p-2.5 bg-[#0D0D0D]/80 border"
          : "w-[170px] p-3.5 bg-[#0D0D0D] border"
      } ${
        isSelected 
          ? "border-[#85bde2] shadow-[0_0_20px_rgba(133,189,226,0.1)] scale-103" 
          : isHovered 
            ? "border-[#85bde2]/40 bg-[#0D0D0D]/90 shadow-[0_0_12px_rgba(133,189,226,0.05)] scale-102"
            : "border-white/[0.07] hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`rounded-sm overflow-hidden shrink-0 border border-white/10 ${small ? "w-7 h-7" : "w-10 h-10"}`}>
          <ImageWithFallback src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className={`font-black text-white uppercase tracking-wide truncate ${small ? "text-[10px]" : "text-xs"}`}>
            {member.name.split(" ")[0]}
          </p>
          <p className="text-[8px] text-[#A1A1AA] truncate uppercase font-semibold mt-0.5">
            {member.role.replace("Director of ", "Dir — ").replace("Student Coordinator Head", "Coord Head")}
          </p>
        </div>
      </div>
      {isSelected && (
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#85bde2] rotate-45 border-t border-r border-[#85bde2] hidden lg:block" />
      )}
    </button>
  );
}
