import React from "react";
import presidentImg from "@/imports/President.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Quote } from "lucide-react";

export function PresidentMessage() {
  return (
    <div className="bg-[#0D0D0D]/40 border border-white/[0.05] rounded-sm p-6 lg:p-12">
      <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-center">
        
        {/* Left Side: Large Portrait with frame */}
        <div className="relative mx-auto lg:ml-0 w-full max-w-[280px]">
          <div className="aspect-[3/4] w-full rounded-sm overflow-hidden ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] relative group">
            <ImageWithFallback 
              src={presidentImg} 
              alt="Dev N Suman - President" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1200ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
          </div>
          {/* Subtle bottom tag */}
          <div className="absolute -bottom-4 left-4 right-4 bg-[#0D0D0D] border border-white/[0.08] p-3 text-center rounded-sm shadow-xl">
            <p className="text-[10px] font-black text-white uppercase tracking-wider">Dev N Suman</p>
            <p className="text-[8px] text-[#85bde2] uppercase font-bold mt-0.5">President, AY 2026-27</p>
          </div>
        </div>

        {/* Right Side: Editorial Message text */}
        <div className="flex flex-col justify-center text-left mt-6 lg:mt-0">
          <span className="text-[9px] tracking-[0.35em] text-[#85bde2] uppercase font-black mb-3">
            Annual Address // Letter from the President
          </span>
          <h3 
            className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-6"
            style={{ fontFamily: "Inter,sans-serif" }}
          >
            Refining the Art and Science of Collegiate Marketing.
          </h3>
          
          <div className="flex flex-col gap-4 text-xs md:text-sm text-[#A1A1AA] leading-relaxed font-light">
            <p>
              When we founded PROMINENT in 2021, the collegiate ecosystem was saturated with basic student societies that focused on simple social meetups and routine event coordination. Our mission was entirely different: we wanted to build an institutional platform that bridges the classroom with actual marketing agency environments.
            </p>
            <p>
              Five years later, PROMINENT has grown into the region's premier branding hub, commercially self-sustaining and boasting corporate partnerships with India's largest agencies and brand managers. We do not run basic simulations; our coordinators manage real budgets, compile real market entry analyses, and compete at the national level alongside top B-school cohorts.
            </p>
            <p>
              For our AY 2026-27 cohort, we are expanding our focus. Through new digital brand incubators, advanced case briefs, and direct C-suite mentorship roundtables, we are training our members not just for college placements, but for immediate corporate readiness and marketing leadership.
            </p>
          </div>

          <div className="h-[1px] bg-white/[0.06] my-6" />

          {/* Signature & Closing */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">Sincerely,</p>
              <p 
                className="text-lg text-white font-semibold italic mt-1" 
                style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}
              >
                Dev N Suman
              </p>
              <p className="text-[9px] text-[#717182] uppercase font-bold tracking-wider mt-0.5">
                Executive President — PROMINENT
              </p>
            </div>
            
            <div className="hidden sm:block border-l border-white/[0.06] pl-6 text-right">
              <p className="text-[9px] text-[#717182] uppercase font-black tracking-wider">MEMBER CREDENTIALS</p>
              <p className="text-xs text-[#85bde2] font-semibold mt-1">BATCH_REF_2026_09</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
