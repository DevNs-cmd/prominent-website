import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Award, TrendingUp, Calendar, ShieldCheck, Users, Tag } from "lucide-react";

interface EventDetail {
  title: string;
  img: string;
  tag: string;
  desc: string;
  overview: string;
  stats: { label: string; value: string }[];
  winners: string[];
  sponsors: string[];
  impact: string;
}

interface EventDetailDrawerProps {
  event: EventDetail | null;
  onClose: () => void;
}

export function EventDetailDrawer({ event, onClose }: EventDetailDrawerProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-end overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop overlay */}
        <motion.div
          className="w-full max-w-3xl bg-[#080808] border-l border-white/[0.08] h-full flex flex-col overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Image section */}
          <div className="relative h-[240px] md:h-[320px] shrink-0 border-b border-white/[0.06] overflow-hidden">
            <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-[#85bde2]/15 text-[#85bde2] border border-[#85bde2]/20 px-3 py-1 text-[9px] tracking-widest font-black uppercase rounded-full">
                {event.tag}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wide mt-3 leading-tight">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 md:p-10 flex flex-col gap-10">
            
            {/* Overview & Impact Case Study */}
            <div className="grid md:grid-cols-[1fr_220px] gap-8">
              
              <div className="flex flex-col gap-4">
                <h3 className="text-xs text-[#85bde2] tracking-[0.25em] font-black uppercase flex items-center gap-1.5">
                  <ShieldCheck size={12} /> Executive Overview
                </h3>
                <p className="text-sm text-white font-medium leading-relaxed font-light">
                  {event.overview}
                </p>
                
                <h3 className="text-xs text-[#85bde2] tracking-[0.25em] font-black uppercase flex items-center gap-1.5 mt-4">
                  <TrendingUp size={12} /> Impact Case Study
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
                  {event.impact}
                </p>
              </div>

              {/* Statistics sidebar */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs text-white tracking-[0.25em] font-black uppercase flex items-center gap-1.5 mb-2">
                  <Tag size={12} /> Key Metrics
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {event.stats.map((s) => (
                    <div key={s.label} className="bg-[#0D0D0D] border border-white/[0.04] p-4 rounded-sm">
                      <p className="text-[9px] text-[#717182] uppercase tracking-wider font-bold mb-1">{s.label}</p>
                      <p className="text-lg font-black text-white">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="h-[1px] bg-white/[0.06]" />

            {/* Winners & Sponsors Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Podium & Winners */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs text-[#85bde2] tracking-[0.25em] font-black uppercase flex items-center gap-1.5">
                  <Award size={12} /> Winners & Podium
                </h3>
                <div className="bg-[#0D0D0D]/80 border border-white/[0.04] rounded-sm p-5 flex flex-col gap-3">
                  {event.winners.map((w, idx) => (
                    <div key={w} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[10px] text-[#85bde2] font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-white font-medium">{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Co-Sponsors */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs text-white tracking-[0.25em] font-black uppercase flex items-center gap-1.5">
                  <Users size={12} /> Sponsors & Collaborators
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {event.sponsors.map((sp) => (
                    <div key={sp} className="bg-[#0D0D0D]/50 border border-white/[0.04] p-3 text-center rounded-sm text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">
                      {sp}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
