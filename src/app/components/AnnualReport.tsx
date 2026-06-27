import React, { useState } from "react";
import { Download, Check, FileText, BarChart2, ShieldCheck, ArrowRight } from "lucide-react";

export function AnnualReport() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const chapters = [
    { num: "01", name: "Strategic Vision & Goals", pages: "Pages 04 - 12" },
    { num: "02", name: "AY 2025-26 Operations Summary", pages: "Pages 13 - 28" },
    { num: "03", name: "National Competition Placements", pages: "Pages 29 - 36" },
    { num: "04", name: "Financial & Sponsor Allocations", pages: "Pages 37 - 42" },
    { num: "05", name: "Alumni Placements Database", pages: "Pages 43 - 50" }
  ];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      // Simulate file download
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", "PROMINENT_Annual_Report_2025_26.pdf");
      document.body.appendChild(link);
      // link.click(); // We won't actually trigger download of missing file, just simulate
      document.body.removeChild(link);
    }, 1800);
  };

  return (
    <div className="bg-[#0D0D0D]/40 border border-white/[0.05] rounded-sm p-6 lg:p-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Mockup visualizer */}
        <div className="flex justify-center items-center relative p-4 bg-black/40 border border-white/[0.04] rounded-sm min-h-[350px]">
          
          {/* Subtle background lines & rings */}
          <div className="absolute w-[280px] h-[280px] border border-[#85bde2]/5 rounded-full animate-spin-slow pointer-events-none" />
          
          {/* 3D-looking document mockup card */}
          <div className="w-[230px] h-[300px] bg-[#121212] border border-white/[0.12] rounded-sm p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] transform rotate-[-3deg] hover:rotate-[0deg] transition-transform duration-500 flex flex-col justify-between group">
            {/* Header info */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[8px] text-[#85bde2] tracking-[0.25em] font-black uppercase">ANNUAL REPORT</span>
                <span className="text-[8px] text-[#717182] font-semibold font-mono">EDITION_V5</span>
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-wide leading-tight mb-2">
                PROMINENT
              </h4>
              <p className="text-[10px] text-[#A1A1AA] uppercase tracking-widest font-semibold">
                THE MARKETING CLUB
              </p>
              <div className="h-[2px] w-12 bg-[#85bde2] my-4" />
              <p className="text-xs text-[#717182] leading-relaxed font-light">
                Comprehensive audit of operations, student campaigns, national rankings, and sponsor relations.
              </p>
            </div>

            {/* Bottom info */}
            <div>
              <p className="text-[9px] text-[#85bde2] tracking-widest font-bold uppercase mb-1">AY 2025-26</p>
              <p className="text-[8px] text-[#717182] uppercase">Authority · Leadership · Legacy</p>
            </div>
            
            {/* Glossy overlay sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
          </div>

        </div>

        {/* Right Side: Chapter Details & Download CTA */}
        <div className="flex flex-col justify-center text-left">
          <span className="text-[9px] tracking-[0.35em] text-[#85bde2] uppercase font-black mb-3">
            Digital Archives // Download Center
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-6">
            Explore our Annual General Report.
          </h3>
          
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-light">
            Each year, the PROMINENT Board compiles a comprehensive transparency report auditing our campaign budgets, competition winnings, membership intakes, and alumni placements. Download the complete publication below.
          </p>

          {/* Chapters checklist */}
          <div className="flex flex-col gap-2.5 mb-8">
            {chapters.map((ch) => (
              <div key={ch.num} className="flex justify-between items-center p-3 bg-[#050505]/40 border border-white/[0.04] rounded-sm hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#85bde2]">{ch.num}</span>
                  <span className="text-xs text-white font-medium uppercase tracking-wide">{ch.name}</span>
                </div>
                <span className="text-[9px] font-mono text-[#717182]">{ch.pages}</span>
              </div>
            ))}
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={downloading || downloaded}
            className={`w-full py-4 flex items-center justify-center gap-2.5 text-xs font-black tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(133,189,226,0.15)] cursor-pointer ${
              downloaded 
                ? "bg-[#1C1C1E] border border-emerald-500/30 text-emerald-400" 
                : downloading
                  ? "bg-[#0D0D0D] border border-white/10 text-white/50 cursor-wait"
                  : "bg-[#85bde2] hover:bg-white text-[#050505] hover:shadow-[0_0_30px_rgba(133,189,226,0.25)]"
            }`}
          >
            {downloaded ? (
              <>
                Report Downloaded <Check size={13} />
              </>
            ) : downloading ? (
              <>
                Compiling PDF Archive...
              </>
            ) : (
              <>
                Download Annual Report <Download size={13} />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
