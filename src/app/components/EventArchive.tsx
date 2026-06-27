import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Calendar, Tag, User, Layers } from "lucide-react";

interface ArchiveItem {
  id: string;
  title: string;
  year: number;
  category: "Competition" | "Workshop" | "Guest Session" | "Summit" | "Collaboration";
  speaker: string;
  outcomes: string;
}

const ARCHIVE_DATA: ArchiveItem[] = [
  { id: "e1", title: "National Case Competition", year: 2024, category: "Competition", speaker: "Dr. Sandeep Kumar (HUL)", outcomes: "1st Place won by PROMINENT team at IIM Indore Conclave." },
  { id: "e2", title: "Annual Marketing Summit v2", year: 2024, category: "Summit", speaker: "Sanjay Mehta (CXO Wavemaker)", outcomes: "600+ student attendees across 15+ collaborating universities." },
  { id: "e3", title: "Brand Incubation Workshop", year: 2025, category: "Workshop", speaker: "Meera Krishnamurthy (Ogilvy)", outcomes: "3 incubated mock brands presented strategies to industry panel." },
  { id: "e4", title: "Data-Driven Brand Building Seminar", year: 2023, category: "Guest Session", speaker: "Vikram Sood (Nestlé)", outcomes: "Insightful study session detailing customer journey maps." },
  { id: "e5", title: "Marketing Masterclass Series", year: 2023, category: "Workshop", speaker: "Pooja Shenoy (WPP)", outcomes: "8-session curriculum certifying 120 coordinators in media planning." },
  { id: "e6", title: "Collegiate Admania League", year: 2022, category: "Competition", speaker: "Internal Board", outcomes: "Ad film scripting competition drawing 45 registrations." },
  { id: "e7", title: "Corporate Alignment Hackathon", year: 2025, category: "Competition", speaker: "Rajan Batra (Google)", outcomes: "Performance marketing simulation using mock datasets." },
  { id: "e8", title: "Alumni Panel Roundtables", year: 2021, category: "Guest Session", speaker: "Prominent Alumni Chapter", outcomes: "Founded chapter mentoring pathways for junior cohorts." }
];

export function EventArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filteredItems = useMemo(() => {
    return ARCHIVE_DATA.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.outcomes.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesYear = selectedYear === "all" || item.year.toString() === selectedYear;
      const matchesCat = selectedCat === "all" || item.category === selectedCat;

      return matchesSearch && matchesYear && matchesCat;
    });
  }, [searchQuery, selectedYear, selectedCat]);

  return (
    <div className="bg-[#0D0D0D]/40 border border-white/[0.05] rounded-sm p-6 lg:p-10">
      
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        
        {/* Search bar */}
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717182]" />
          <input
            type="text"
            placeholder="Search events, speakers, or outcomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#050505] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
          />
        </div>

        {/* Filter controls */}
        <div className="flex gap-3">
          
          {/* Year selector */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-[#050505] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#85bde2] rounded-sm cursor-pointer"
            >
              <option value="all">All Years</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#717182]">
              <Calendar size={11} />
            </div>
          </div>

          {/* Category selector */}
          <div className="relative">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-[#050505] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#85bde2] rounded-sm cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Competition">Competition</option>
              <option value="Workshop">Workshop</option>
              <option value="Guest Session">Guest Session</option>
              <option value="Summit">Summit</option>
              <option value="Collaboration">Collaboration</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#717182]">
              <Tag size={11} />
            </div>
          </div>

        </div>

      </div>

      {/* Database Table Layout */}
      <div className="overflow-x-auto border border-white/[0.05] rounded-sm bg-[#050505]/40 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01]">
              <th className="p-4 text-[9px] tracking-[0.2em] text-[#85bde2] uppercase font-black">Event Name</th>
              <th className="p-4 text-[9px] tracking-[0.2em] text-[#85bde2] uppercase font-black">Year</th>
              <th className="p-4 text-[9px] tracking-[0.2em] text-[#85bde2] uppercase font-black">Category</th>
              <th className="p-4 text-[9px] tracking-[0.2em] text-[#85bde2] uppercase font-black">Key Speaker</th>
              <th className="p-4 text-[9px] tracking-[0.2em] text-[#85bde2] uppercase font-black">Outcomes & Achievements</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr 
                  key={item.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 text-xs font-bold text-white uppercase tracking-wide">{item.title}</td>
                  <td className="p-4 text-xs text-[#A1A1AA] font-mono">{item.year}</td>
                  <td className="p-4">
                    <span className="bg-[#85bde2]/5 text-[#85bde2] border border-[#85bde2]/15 px-2 py-0.5 text-[9px] tracking-widest font-black uppercase rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-[#717182] font-semibold">{item.speaker}</td>
                  <td className="p-4 text-xs text-[#A1A1AA] font-light leading-relaxed">{item.outcomes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-xs text-[#717182] font-light">
                  No records match your current search queries or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 text-[10px] text-[#717182] font-mono">
        <span>ARCHIVE_COUNT: {filteredItems.length} records resolved</span>
        <span>STATUS: DATABASE_STABLE_COMPILING</span>
      </div>

    </div>
  );
}
