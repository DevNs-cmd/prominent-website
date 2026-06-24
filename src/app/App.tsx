import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import prominentLogo from "@/imports/Prominent_Logo.jpeg";
import { supabase } from "@/lib/supabase";
import image0 from "@/imports/image_0.jpeg";
import image1 from "@/imports/image_1.jpeg";
import image2 from "@/imports/image_2.jpeg";
import image3 from "@/imports/image_3.jpeg";
import image4 from "@/imports/image_4.jpeg";
import {
  ChevronDown, ArrowRight, Menu, X, Award, Users, Calendar,
  TrendingUp, MapPin, Linkedin, Instagram, Twitter, Mail,
  ChevronLeft, ChevronRight, Play, Quote,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const SILVER = "#d4e6f4"; // Silver-blue from logo
const STEEL = "#85bde2";  // Ice-sky blue from logo
const DIM = "#A1A1AA";
const GHOST = "#717182";

const EVENT_SLIDES = [
  {
    img: image0,
    title: "Annual Marketing Summit",
    tag: "Flagship · 2024",
    desc: "600+ attendees. 12 CXO speakers. The biggest collegiate marketing event in the region.",
  },
  {
    img: image1,
    title: "Industry Connect Series",
    tag: "Session · 2024",
    desc: "Intimate roundtables with VPs and Directors from India's top marketing firms.",
  },
  {
    img: image3,
    title: "National Case Competition",
    tag: "Competition · 2024 · 1st Place",
    desc: "Defeated 47 teams from premier colleges across India. Gold at IIM Indore Conclave.",
  },
  {
    img: image4,
    title: "Marketing Masterclass Series",
    tag: "Workshop · 2023",
    desc: "8-session deep-dive with brand strategists, media planners, and performance marketers.",
  },
  {
    img: image0,
    title: "PROMINENT × IIM Indore",
    tag: "Collaboration · 2024",
    desc: "Joint workshop series — the first inter-institutional marketing summit of its kind.",
  },
  {
    img: image1,
    title: "Team Cohort 2026–27",
    tag: "Community",
    desc: "84 driven members. One mission — to build the next generation of marketing leaders.",
  },
];

// ─── Smooth Scroll Hook ───────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Splash ───────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Cinematic Background Image reveal */}
      <motion.div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        initial={{ scale: 1.12, filter: "blur(2px)" }}
        animate={{ scale: 1.0, filter: "blur(0px)" }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={image4} alt="Splash Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#050505]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Brand-color matched Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#85bde2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <motion.div
        className="flex flex-col items-center gap-5 relative z-10"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-white/15 shadow-[0_0_30px_rgba(133,189,226,0.15)]"
          initial={{ rotate: -8, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWithFallback src={prominentLogo} alt="PROMINENT" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <p className="text-[36px] font-black tracking-[0.28em] bg-gradient-to-r from-[#d4e6f4] via-[#85bde2] to-[#85bde2] bg-clip-text text-transparent" style={{ fontFamily: "Inter,sans-serif" }}>
            PROMINENT
          </p>
          <p className="text-[10px] tracking-[0.45em] text-[#A1A1AA] mt-1.5 uppercase">The Marketing Club</p>
        </motion.div>

        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#85bde2] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
        />

        <motion.p
          className="text-[9px] tracking-[0.4em] text-[#717182] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          Authority · Leadership · Legacy
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Board", id: "board" },
  { label: "Legacy", id: "legacy" },
  { label: "Network", id: "network" },
  { label: "Join", id: "join" },
];

function Nav({ scrolled, onApply }: { scrolled: boolean; onApply: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_40px_rgba(0,0,0,0.6)]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 group"
        >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20 group-hover:ring-white/40 transition-all">
            <ImageWithFallback src={prominentLogo} alt="PROMINENT" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.22em] text-white uppercase">Prominent</span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-[10px] tracking-[0.18em] uppercase transition-colors relative pb-0.5 ${
                active === id ? "text-white" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-[#d4e6f4]"
                />
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={onApply}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.18em] uppercase font-semibold border border-[#85bde2]/35 text-[#85bde2] hover:bg-[#85bde2] hover:text-[#050505] hover:shadow-[0_0_20px_rgba(133,189,226,0.25)] transition-all duration-200 cursor-pointer"
        >
          Apply Now <ArrowRight size={11} />
        </button>

        <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#080808] border-t border-white/[0.06]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => { scrollTo(id); setOpen(false); }}
                  className="text-left text-sm tracking-[0.18em] text-[#A1A1AA] uppercase hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Hero with Event Slider (Redesigned & Responsive) ─────────────────────────
function Hero({ onApply }: { onApply: () => void }) {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number, direction: number) => {
    setDir(direction);
    setSlide(next);
  }, []);

  const prev = () => goTo((slide - 1 + EVENT_SLIDES.length) % EVENT_SLIDES.length, -1);
  const next = () => goTo((slide + 1) % EVENT_SLIDES.length, 1);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setSlide((s) => (s + 1) % EVENT_SLIDES.length);
    }, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slide]);

  const words = ["Strategy.", "Leadership.", "Innovation.", "Execution."];
  const [wIdx, setWIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-[#050505] overflow-hidden pt-[68px]">
      {/* Fullscreen sliding background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={EVENT_SLIDES[slide].img}
              alt={EVENT_SLIDES[slide].title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark overlays for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-[#050505]/60 z-[1]" />
        <div className="absolute inset-0 bg-black/45 z-[1]" />
      </div>

      {/* Background blueprint grid & radial glow (on top of background image but below text) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.4]">
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#85bde2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#85bde2] rounded-full filter blur-[150px] opacity-[0.03]" />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-center py-16 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="h-[1.5px] w-8 bg-[#85bde2]" />
            <span className="text-[10px] tracking-[0.35em] text-[#85bde2] uppercase font-bold">
              The Professional Marketing Institution
            </span>
          </motion.div>

          <motion.h1
            className="text-[clamp(44px,7vw,80px)] font-black leading-[0.95] tracking-[-0.03em] mb-5 bg-gradient-to-r from-white via-[#d4e6f4] to-[#85bde2] bg-clip-text text-transparent uppercase"
            style={{ fontFamily: "Inter,sans-serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            PROMINENT
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg text-[#E4E4E7] font-light mb-4 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Building Future{" "}
            <span className="text-white font-medium">Marketing Leaders</span>
          </motion.p>

          <motion.div
            className="h-10 flex items-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wIdx}
                className="text-xl lg:text-2xl text-[#85bde2] font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {words[wIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <button
              onClick={onApply}
              className="group flex items-center gap-2.5 px-7 py-3.5 bg-[#d4e6f4] text-[#050505] text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-all duration-200 shadow-[0_0_30px_rgba(133,189,226,0.15)] hover:shadow-[0_0_40px_rgba(133,189,226,0.25)] cursor-pointer"
            >
              Apply Now
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("events")}
              className="flex items-center gap-2.5 px-7 py-3.5 border border-[#d4e6f4]/30 bg-black/25 backdrop-blur-sm text-[#d4e6f4] text-[11px] font-bold tracking-[0.18em] uppercase hover:border-[#d4e6f4] hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              Explore Events
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom slide info & manual controls */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
        <div className="flex flex-col gap-1 max-w-lg">
          <span className="text-[9px] tracking-[0.25em] text-[#85bde2]/90 uppercase font-bold">
            At a Glance
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs text-[#E4E4E7]/70 font-semibold uppercase tracking-wider block mb-0.5">
                {EVENT_SLIDES[slide].tag}
              </span>
              <h3 className="text-lg font-black text-white tracking-wide uppercase leading-tight">
                {EVENT_SLIDES[slide].title}
              </h3>
              <p className="text-xs text-[#A1A1AA] font-light mt-1 hidden sm:block leading-relaxed">
                {EVENT_SLIDES[slide].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 self-start md:self-end">
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {EVENT_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx, idx > slide ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === slide ? "w-6 bg-[#85bde2]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#85bde2] hover:text-[#050505] border border-white/10 hover:border-[#85bde2] transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#85bde2] hover:text-[#050505] border border-white/10 hover:border-[#85bde2] transition-all duration-200 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 right-8 hidden lg:flex flex-col items-center gap-2 text-[#717182] z-20">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </div>
    </section>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: 25, suffix: "+", label: "Corporate Speakers" },
    { value: 52, suffix: "+", label: "Events Conducted" },
    { value: 15, suffix: "+", label: "Inter-College Collaborations" },
    { value: 5000, suffix: "+", label: "Students Impacted" },
  ];
  return (
    <div className="bg-[#0A0A0A] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-10 px-6 flex flex-col gap-1 ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""}`}
          >
            <span className="text-4xl font-black text-white tracking-tight">
              <Counter target={s.value} suffix={s.suffix} />
            </span>
            <span className="text-[10px] text-[#A1A1AA] tracking-[0.2em] uppercase">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-[1px] w-8 bg-[#85bde2]" />
        <span className="text-[10px] tracking-[0.3em] text-[#85bde2] uppercase font-bold">{eyebrow}</span>
      </div>
      <h2 className="text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.02em] mb-4 bg-gradient-to-r from-white via-[#d4e6f4] to-[#85bde2] bg-clip-text text-transparent uppercase">
        {title}
      </h2>
      {sub && <p className="text-[#A1A1AA] text-base max-w-xl leading-relaxed font-light">{sub}</p>}
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="relative bg-[#050505] py-28 lg:py-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-[#85bde2] rounded-full filter blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-[#2D4A77] rounded-full filter blur-[130px] opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHead
            eyebrow="About PROMINENT"
            title={<>The Institution<br />Behind the Brand</>}
            sub="PROMINENT is not a student club. It is a professional development institution operating within academia — with the rigour, output, and standards of the industry it trains for."
          />
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { icon: Award, t: "Nationally Recognised", d: "Competed and won at premier B-school platforms" },
              { icon: Users, t: "84 Active Members", d: "Selective intake. High-performance culture." },
              { icon: TrendingUp, t: "₹2L+ Sponsorships", d: "Commercially self-sustaining since Year 2" },
              { icon: Calendar, t: "Est. 2021", d: "Five years of institution building" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-[#0D0D0D]/50 border border-white/[0.05] rounded-sm p-6 group hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(133,189,226,0.03)]">
                <div className="p-2.5 bg-[#85bde2]/5 rounded-sm w-fit group-hover:bg-[#85bde2]/10 transition-all duration-300 mb-4">
                  <Icon size={17} className="text-[#85bde2]" />
                </div>
                <p className="text-sm font-bold text-white mb-1">{t}</p>
                <p className="text-xs text-[#717182] leading-relaxed font-light">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="aspect-[3/4] max-w-sm ml-auto overflow-hidden ring-1 ring-white/10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <img
              src={image2}
              alt="Dev N Suman - President"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 -left-5 border border-white/[0.08] bg-[#0D0D0D]/95 backdrop-blur-md p-6 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#85bde2]/30 transition-all duration-300 max-w-[240px]">
            <p className="text-[9px] text-[#A1A1AA] tracking-[0.25em] uppercase mb-1.5 font-bold">Current Leadership</p>
            <p className="text-base font-black text-white tracking-tight uppercase">Dev N Suman</p>
            <p className="text-xs text-[#85bde2] font-semibold mt-0.5">President, AY 2026–27</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Events Gallery ───────────────────────────────────────────────────────────
function Events() {
  const [active, setActive] = useState(0);

  return (
    <section id="events" className="relative bg-gradient-to-b from-[#050505] to-[#0A0A0A] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] bg-[#85bde2]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Events"
          title={<>Our Defining<br />Moments</>}
          sub="From national competitions to CXO roundtables — each event is designed to deliver real professional exposure."
        />

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Main featured */}
          <div className="relative overflow-hidden group cursor-pointer rounded-sm border border-white/[0.08] bg-[#0D0D0D] shadow-[0_20px_45px_rgba(0,0,0,0.65)]" onClick={() => setActive((active + 1) % EVENT_SLIDES.length)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55 }}
                className="aspect-[16/9] overflow-hidden relative"
              >
                <img
                  src={EVENT_SLIDES[active].img}
                  alt={EVENT_SLIDES[active].title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/30 to-transparent z-[1]" />
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <p className="text-[9px] tracking-[0.3em] text-[#85bde2] uppercase font-bold mb-1">{EVENT_SLIDES[active].tag}</p>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-wide uppercase mb-2">{EVENT_SLIDES[active].title}</h3>
              <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed max-w-md font-light">{EVENT_SLIDES[active].desc}</p>
            </div>
            <div className="absolute top-4 right-4 w-9 h-9 bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/10 rounded-full group-hover:bg-[#85bde2] group-hover:text-black transition-colors z-10">
              <Play size={12} className="ml-0.5" />
            </div>
          </div>

          {/* Side list */}
          <div className="flex flex-col gap-2.5">
            {EVENT_SLIDES.map((ev, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex gap-3.5 p-3.5 text-left transition-all rounded-sm border ${
                  i === active 
                    ? "bg-[#0D0D0D] border-[#85bde2]/30 shadow-[0_5px_20px_rgba(133,189,226,0.04)]" 
                    : "bg-[#0D0D0D]/30 border-white/[0.04] hover:bg-[#0D0D0D]/65 hover:border-white/10"
                }`}
              >
                <div className="w-14 h-14 overflow-hidden shrink-0 border border-white/5">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[8px] tracking-widest text-[#85bde2] uppercase font-bold mb-0.5">{ev.tag.split("·")[0].trim()}</p>
                  <p className={`text-xs font-bold uppercase tracking-wide truncate ${i === active ? "text-white" : "text-[#717182] group-hover:text-[#A1A1AA]"}`}>
                    {ev.title}
                  </p>
                </div>
                {i === active && (
                  <div className="flex items-center shrink-0">
                    <div className="w-1 h-6 bg-[#85bde2] rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Excellence Wall ──────────────────────────────────────────────────────────
function Excellence() {
  const achievements = [
    { stat: "1st", desc: "National Case Competition — IIM Indore Conclave 2024" },
    { stat: "₹2L+", desc: "Sponsorship Revenue — Annual Marketing Summit" },
    { stat: "Top 5", desc: "Marketing Club Rankings — West India Collegiate Forum" },
    { stat: "3×", desc: "Featured in College Annual Report for Outstanding Output" },
  ];
  const testimonials = [
    {
      quote: "PROMINENT operates with a rigour and professionalism I rarely see in student organisations.",
      name: "Sanjay Mehta", title: "CMO, Wavemaker India",
    },
    {
      quote: "The calibre of students from PROMINENT is on par with premier B-school clubs.",
      name: "Priya Nair", title: "VP Marketing, Hindustan Unilever",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] via-[#050505] to-[#0A0A0A] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-[30%] left-[-15%] w-[45vw] h-[45vw] bg-[#2D4A77]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40vw] h-[40vw] bg-[#85bde2]/3 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <SectionHead eyebrow="Proof of Excellence" title={<>Results That<br />Speak Institutionally.</>} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((a, i) => (
            <motion.div
              key={a.stat}
              className="bg-[#0D0D0D]/65 border border-white/[0.05] rounded-sm p-8 group hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] transition-all duration-300 hover:shadow-[0_15px_30px_rgba(133,189,226,0.04)]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <p className="text-[52px] font-black tracking-tight leading-none mb-3 bg-gradient-to-br from-white to-[#85bde2] bg-clip-text text-transparent">{a.stat}</p>
              <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-[#0D0D0D]/55 border border-white/[0.06] rounded-sm p-8 relative overflow-hidden group hover:border-[#85bde2]/25 hover:bg-[#0D0D0D]/85 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(133,189,226,0.03)]"
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              {/* Subtle top corner decoration */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#85bde2]/5 rounded-full filter blur-xl group-hover:bg-[#85bde2]/15 transition-all pointer-events-none" />
              
              <Quote size={32} className="text-[#85bde2]/20 group-hover:text-[#85bde2]/30 transition-colors mb-5" />
              <p
                className="text-base text-[#d4e6f4] leading-relaxed mb-6 font-light"
                style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-6 bg-[#85bde2]" />
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wide">{t.name}</p>
                  <p className="text-xs text-[#717182] font-semibold mt-0.5">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onApply }: { onApply: () => void }) {
  const metrics = [
    { label: "Active Members", value: "84", delta: "+12 this cycle", icon: Users, color: STEEL },
    { label: "Events Conducted", value: "52", delta: "This academic year", icon: Calendar, color: SILVER },
    { label: "Industry Sessions", value: "18", delta: "+6 YoY", icon: TrendingUp, color: STEEL },
    { label: "Competition Wins", value: "9", delta: "National level", icon: Award, color: SILVER },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#050505] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#85bde2]/3 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <SectionHead eyebrow="Operations" title={<>Live Club<br />Dashboard</>} />
          <div className="flex items-center gap-2 text-[10px] text-[#85bde2] tracking-[0.2em] uppercase mb-14 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Live · AY 2026–27
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map(({ label, value, delta, icon: Icon, color }) => (
            <div key={label} className="bg-[#0D0D0D]/55 border border-white/[0.05] rounded-sm p-8 group hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(133,189,226,0.05)]">
              <div className="p-2.5 bg-white/[0.03] rounded-sm w-fit group-hover:bg-[#85bde2]/10 group-hover:text-black transition-all duration-300 mb-6">
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-5xl font-black text-white tracking-tight mb-2 bg-gradient-to-r from-white to-[#d4e6f4] bg-clip-text text-transparent">{value}</p>
              <p className="text-[10px] text-[#A1A1AA] tracking-[0.2em] uppercase mb-1.5 font-bold">{label}</p>
              <p className="text-xs text-[#85bde2] font-semibold">{delta}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0D0D0D]/75 backdrop-blur-sm border border-[#85bde2]/25 p-8 rounded-sm flex flex-col md:flex-row items-center gap-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] tracking-[0.25em] text-emerald-400 uppercase font-bold">Recruitment Status</span>
            </div>
            <p className="text-xl font-black text-white uppercase tracking-wide mb-4">Open — AY 2026–27</p>
            <div className="flex justify-between text-[11px] text-[#A1A1AA] mb-2.5 max-w-sm">
              <span className="font-light">Applications received</span>
              <span className="font-bold text-white">480 / 500</span>
            </div>
            <div className="h-2 bg-white/[0.08] max-w-sm rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#85bde2] to-[#d4e6f4]"
                initial={{ width: 0 }}
                whileInView={{ width: "96%" }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>
          <button
            onClick={onApply}
            className="group flex items-center gap-2.5 px-8 py-4 bg-[#d4e6f4] text-[#050505] text-[11px] font-black tracking-[0.18em] uppercase hover:bg-white transition-all whitespace-nowrap cursor-pointer shadow-[0_0_25px_rgba(133,189,226,0.15)] hover:shadow-[0_0_35px_rgba(133,189,226,0.25)]"
          >
            Apply Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Transformation ───────────────────────────────────────────────────────────
function Transformation() {
  const phases = [
    {
      period: "Month 1–3",
      title: "Foundation",
      before: "Classroom-bound, limited industry exposure",
      after: "Access to mentors, live briefs, and strategy workshops",
    },
    {
      period: "Month 4–6",
      title: "Execution",
      before: "Theoretical knowledge, limited portfolio",
      after: "Led campaigns, built case studies, competed nationally",
    },
    {
      period: "Month 7–12",
      title: "Leadership",
      before: "Individual contributor mindset",
      after: "Department head, cross-team ownership, recruiter-ready profile",
    },
  ];

  return (
    <section className="relative bg-[#050505] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[40%] left-[-10%] w-[35vw] h-[35vw] bg-[#2D4A77]/4 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Why Join"
          title={<>Your Transformation<br />Journey</>}
          sub="A structured, outcome-driven programme that converts academic potential into professional readiness."
        />
        
        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {phases.map((p, i) => (
            <motion.div
              key={p.period}
              className="bg-[#0D0D0D]/55 border border-white/[0.06] rounded-sm p-8 group hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] transition-all duration-300 hover:shadow-[0_15px_30px_rgba(133,189,226,0.04)] flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="bg-[#85bde2]/10 border border-[#85bde2]/25 text-[#85bde2] px-3 py-1 text-[9px] uppercase tracking-widest font-black rounded-full">
                  {p.period}
                </span>
                <p className="text-base font-black text-white uppercase tracking-wide">{p.title}</p>
              </div>

              <div className="p-4 bg-black/40 border border-white/[0.03] rounded-sm mb-4 flex-1">
                <p className="text-[8px] text-[#717182] tracking-[0.2em] uppercase font-bold mb-2">Before</p>
                <p className="text-xs text-[#717182] leading-relaxed font-light">{p.before}</p>
              </div>

              <div className="p-4 bg-[#85bde2]/5 border border-[#85bde2]/15 rounded-sm">
                <p className="text-[8px] text-[#85bde2] tracking-[0.2em] uppercase font-bold mb-2">After PROMINENT</p>
                <p className="text-xs text-[#d4e6f4] leading-relaxed font-medium">{p.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Legacy ───────────────────────────────────────────────────────────────────
function Legacy() {
  const [active, setActive] = useState(2026);
  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  const data: Record<number, { event: string; win: string; president: string; desc: string }> = {
    2021: { event: "PROMINENT Launch — Founding Chapter", win: "Collegiate Brand Summit — 2nd Place", president: "Arjun Sharma", desc: "The year it all began. Founded with 18 members, a bold vision, and zero precedent." },
    2022: { event: "Marketing Masterclass Series (8 sessions)", win: "National Admania — 1st Place", president: "Isha Gupta", desc: "First major competition win. Proven we could compete at the national level." },
    2023: { event: "Annual Marketing Summit v1 — 600+ attendees", win: "B-School Marketing League — Champions", president: "Rahul Nair", desc: "The flagship event launched. 600 attendees. 8 industry speakers. Zero compromise." },
    2024: { event: "PROMINENT × IIM Indore Joint Workshop", win: "National Case Competition — Gold", president: "Priya Verma", desc: "Crossed institutional boundaries. Partnered with India's premier management institutes." },
    2025: { event: "Industry Connect Series — 12 CXO Sessions", win: "Marketing Innovation Award — Runner-Up", president: "Dev N Suman", desc: "84 members. 12 CXO sessions. The most operationally intensive year in PROMINENT history." },
    2026: { event: "Digital Marketing Conclave (ongoing)", win: "—", president: "Dev N Suman", desc: "Dev N Suman takes office. Re-imagining digital boundaries, launching new brand incubators, and expanding corporate partnerships." },
  };

  return (
    <section id="legacy" className="relative bg-gradient-to-b from-[#0A0A0A] to-[#050505] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background lighting */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] bg-[#85bde2]/3 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead eyebrow="Legacy" title={<>Five Years of<br />Institution Building.</>} />

        {/* Year selector */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setActive(y)}
              className={`relative px-7 py-3 text-xs font-black tracking-[0.15em] uppercase transition-all rounded-sm cursor-pointer whitespace-nowrap ${
                active === y
                  ? "bg-gradient-to-r from-[#85bde2] to-[#d4e6f4] text-[#050505] shadow-[0_0_20px_rgba(133,189,226,0.15)]"
                  : "bg-[#0D0D0D]/40 border border-white/[0.08] text-[#A1A1AA] hover:border-[#85bde2]/30 hover:text-white"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="bg-[#0D0D0D]/65 border border-white/[0.08] hover:border-[#85bde2]/20 p-1.5 rounded-sm grid md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300"
          >
            <div className="bg-[#050505]/40 border border-white/[0.03] rounded-sm p-8 lg:col-span-2">
              <p className="text-[9px] text-[#717182] tracking-widest uppercase mb-3 font-bold">Year in Context</p>
              <p className="text-base text-[#d4e6f4] leading-relaxed mb-6 font-light"
                style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>
                "{data[active].desc}"
              </p>
              <p className="text-[9px] text-[#85bde2] tracking-widest uppercase font-bold">AY {active}–{(active + 1).toString().slice(-2)}</p>
            </div>
            <div className="bg-[#050505]/40 border border-white/[0.03] rounded-sm p-8">
              <p className="text-[9px] text-[#717182] tracking-widest uppercase mb-3 font-bold">Flagship Event</p>
              <p className="text-sm text-white font-black uppercase tracking-wide leading-relaxed">{data[active].event}</p>
            </div>
            <div className="bg-[#050505]/40 border border-white/[0.03] rounded-sm p-8">
              <p className="text-[9px] text-[#717182] tracking-widest uppercase mb-3 font-bold">President</p>
              <p className="text-base font-black text-white uppercase tracking-wide mb-1">{data[active].president}</p>
              <div className="h-[1px] w-6 bg-[#85bde2] my-3" />
              <p className="text-[9px] text-[#717182] tracking-widest uppercase mb-1.5 font-bold">Win</p>
              <p className="text-xs text-[#d4e6f4] font-medium leading-relaxed">{data[active].win}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Board ────────────────────────────────────────────────────────────────────
function Board() {
  const leadership = [
    { role: "President", name: "Dev N Suman", dept: "Executive Leadership" },
    { role: "Vice President", name: "Sunidhi Sharma", dept: "Operations & Strategy" },
  ];
  const directors = [
    { role: "Director — Events", name: "Sneha Pillai" },
    { role: "Director — Marketing", name: "Aryan Shah" },
    { role: "Director — Strategy", name: "Nisha Iyer" },
    { role: "Director — Outreach", name: "Rohan Das" },
    { role: "Director — Content", name: "Meera Joshi" },
    { role: "Director — Design", name: "Kiran Rao" },
  ];

  return (
    <section id="board" className="relative bg-[#050505] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-[#85bde2]/3 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-[#2D4A77]/4 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Leadership"
          title={<>Executive Board<br />2026–27</>}
          sub="The team that drives PROMINENT forward — elected for merit, accountable for output."
        />

        {/* Widescreen Team/Cohort Banner */}
        <motion.div
          className="mb-10 relative group overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-[0_15px_45px_rgba(0,0,0,0.85)] rounded-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden relative">
            <img
              src={image0}
              alt="PROMINENT Team 2026–27"
              className="w-full h-full object-cover object-[center_35%] group-hover:scale-[1.02] transition-transform duration-[1200ms] ease-out"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/20 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#85bde2] animate-pulse" />
                <span className="text-[9px] tracking-[0.3em] text-[#85bde2] uppercase font-bold">The Cohort</span>
              </div>
              <h3 className="text-xl md:text-3xl font-black text-white leading-tight mb-2 tracking-tight uppercase">
                PROMINENT Team 2026–27
              </h3>
              <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed font-light">
                84 driven members representing a culture of rigor, collaboration, and high performance — trained for corporate readiness and marketing leadership.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#717182] border border-white/10 px-4 py-2 bg-white/[0.02] backdrop-blur-sm">
                Estd. 2021
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#85bde2] border border-[#85bde2]/30 px-4 py-2 bg-[#85bde2]/5 font-bold backdrop-blur-sm">
                Batch 2026–27
              </span>
            </div>
          </div>
        </motion.div>

        {/* Top 2 leadership */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {leadership.map((l, i) => (
            <motion.div
              key={l.name}
              className="bg-[#0D0D0D]/60 p-10 flex items-center gap-6 group hover:bg-[#0D0D0D] border border-white/[0.06] hover:border-[#85bde2]/30 hover:shadow-[0_15px_35px_rgba(133,189,226,0.06)] rounded-sm transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1C1C1E] to-[#252528] border border-white/10 group-hover:border-[#85bde2]/30 group-hover:shadow-[0_0_15px_rgba(133,189,226,0.15)] flex items-center justify-center shrink-0 transition-all duration-300">
                <span className="text-xl font-black text-white group-hover:text-[#85bde2] transition-colors">
                  {l.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.3em] text-[#85bde2] uppercase mb-1 font-bold">{l.role}</p>
                <p className="text-lg font-black text-white uppercase tracking-wide">{l.name}</p>
                <p className="text-xs text-[#717182] font-semibold mt-0.5">{l.dept}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Directors grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map((d, i) => (
            <motion.div
              key={d.name}
              className="bg-[#0D0D0D]/40 p-7 hover:bg-[#0D0D0D]/85 border border-white/[0.05] hover:border-[#85bde2]/20 hover:shadow-[0_10px_25px_rgba(133,189,226,0.04)] group rounded-sm transition-all duration-500"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#1C1C1E] to-[#252528] border border-white/10 group-hover:border-[#85bde2]/35 flex items-center justify-center mb-5 transition-all duration-300">
                <span className="text-xs font-bold text-[#717182] group-hover:text-[#85bde2] transition-colors">
                  {d.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <p className="text-sm font-bold text-white mb-1 uppercase tracking-wide">{d.name}</p>
              <p className="text-[10px] text-[#A1A1AA] font-semibold">{d.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Speakers ─────────────────────────────────────────────────────────────────
function Speakers() {
  const speakers = [
    { name: "Rajiv Batra", company: "Google India", title: "Director, Marketing", topic: "Brand in the Age of AI" },
    { name: "Meera Krishnamurthy", company: "Ogilvy", title: "Chief Strategy Officer", topic: "The Anatomy of Iconic Campaigns" },
    { name: "Vikram Sood", company: "Nestlé India", title: "VP Consumer Insights", topic: "Data-Driven Brand Building" },
    { name: "Aditi Chauhan", company: "McKinsey & Co.", title: "Engagement Manager", topic: "Marketing Due Diligence in M&A" },
    { name: "Siddharth Rajan", company: "Zomato", title: "Head of Growth", topic: "Performance Marketing at Scale" },
    { name: "Pooja Shenoy", company: "WPP", title: "Global Account Lead", topic: "Managing $100M+ Brand Portfolios" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#050505] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] bg-[#85bde2]/3 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Featured Speakers"
          title={<>Industry Leaders.<br />Real Conversations.</>}
          sub="We bring the C-suite to campus. No simulations. No hypotheticals. Only practitioners."
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((s, i) => (
            <motion.div
              key={s.name}
              className="bg-[#0D0D0D]/50 border border-white/[0.05] hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] p-7 rounded-sm transition-all duration-300 hover:shadow-[0_15px_30px_rgba(133,189,226,0.04)] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="w-11 h-11 bg-gradient-to-br from-[#1C1C1E] to-[#252528] border border-white/10 group-hover:border-[#85bde2]/35 flex items-center justify-center mb-6 text-xs font-black text-[#A1A1AA] group-hover:text-[#85bde2] transition-colors">
                {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <p className="text-base font-bold text-white mb-0.5">{s.name}</p>
              <p className="text-[10px] text-[#85bde2] tracking-wide mb-0.5 uppercase font-semibold">{s.title}</p>
              <p className="text-xs text-[#717182] mb-5 font-medium">{s.company}</p>
              <div className="h-[1px] w-full bg-white/[0.06] mb-4" />
              <p className="text-xs text-[#A1A1AA] italic leading-relaxed font-light" style={{ fontFamily: "'Playfair Display',serif" }}>
                &ldquo;{s.topic}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Network ──────────────────────────────────────────────────────────────────
function Network() {
  const alumni = [
    { name: "Aditya Kumar", company: "Deloitte Digital", role: "Senior Consultant", batch: "2023" },
    { name: "Prachi Joshi", company: "Hindustan Unilever", role: "Brand Manager", batch: "2022" },
    { name: "Kabir Malhotra", company: "Dentsu India", role: "Strategy Lead", batch: "2024" },
    { name: "Simran Kaur", company: "Accenture Song", role: "Digital Analyst", batch: "2023" },
    { name: "Rishi Desai", company: "GroupM", role: "Media Planner", batch: "2022" },
    { name: "Tanya Singh", company: "EY Parthenon", role: "Strategy Analyst", batch: "2024" },
  ];

  return (
    <section id="network" className="relative bg-[#050505] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#2D4A77]/4 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Alumni Network"
          title={<>Where Our<br />Members Go</>}
          sub="PROMINENT alumni are placed across the most competitive firms in consulting, marketing, and strategy."
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((a, i) => (
            <motion.div
              key={a.name}
              className="bg-[#0D0D0D]/50 border border-white/[0.05] hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] p-7 rounded-sm transition-all duration-300 hover:shadow-[0_15px_30px_rgba(133,189,226,0.04)] group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1C1C1E] to-[#252528] border border-white/10 group-hover:border-[#85bde2]/35 flex items-center justify-center text-xs font-black text-[#A1A1AA] group-hover:text-[#85bde2] transition-colors">
                  {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <span className="text-[9px] text-[#717182] tracking-[0.25em] font-bold">BATCH {a.batch}</span>
              </div>
              <p className="text-sm font-bold text-white mb-0.5">{a.name}</p>
              <p className="text-[10px] text-[#85bde2] mb-1 tracking-wide font-semibold">{a.role}</p>
              <p className="text-[10px] text-[#A1A1AA] flex items-center gap-1.5 font-light">
                <MapPin size={9} className="text-[#85bde2]" /> {a.company}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Recruitment ──────────────────────────────────────────────────────────────
function Recruitment({ onApply }: { onApply: () => void }) {
  const steps = [
    { n: "01", title: "Application", desc: "Submit your profile, interests, and a written response." },
    { n: "02", title: "Case Evaluation", desc: "A real marketing case — no textbook answers accepted." },
    { n: "03", title: "Panel Interview", desc: "Face the board. Demonstrate strategic thinking under pressure." },
    { n: "04", title: "Final Selection", desc: "Cohort offer extended. Onboarding begins immediately." },
  ];

  return (
    <section id="join" className="relative bg-gradient-to-b from-[#050505] to-[#0A0A0A] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#85bde2]/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Recruitment"
          title={<>Join PROMINENT</>}
          sub="A selective, rigorous process — because the work we do demands the best."
        />

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="bg-[#0D0D0D]/50 border border-white/[0.05] hover:border-[#85bde2]/20 hover:bg-[#0D0D0D] p-8 rounded-sm transition-all duration-300 hover:shadow-[0_15px_30px_rgba(133,189,226,0.04)] group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-6xl font-black text-white/[0.05] group-hover:text-[#85bde2]/15 transition-colors mb-5 leading-none">{s.n}</p>
              <p className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{s.title}</p>
              <p className="text-xs text-[#717182] leading-relaxed font-light">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border border-[#85bde2]/25 bg-[#0D0D0D]/80 backdrop-blur-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] tracking-[0.25em] text-emerald-400 uppercase font-bold">Applications Open</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-2">AY 2026–27 Cohort</h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md font-light">
              480 applications received. 20 seats remaining. This is not a deadline you want to miss.
            </p>
          </div>
          <button
            onClick={onApply}
            className="group flex items-center gap-3 px-9 py-4 bg-[#d4e6f4] text-[#050505] text-[11px] font-black tracking-[0.2em] uppercase hover:bg-white transition-all whitespace-nowrap cursor-pointer shadow-[0_0_25px_rgba(133,189,226,0.15)] hover:shadow-[0_0_35px_rgba(133,189,226,0.25)]"
          >
            Apply Now <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sponsors ─────────────────────────────────────────────────────────────────
function Sponsors() {
  const sponsors = ["Ogilvy", "Wavemaker", "GroupM", "Dentsu", "Madison", "Publicis", "Grey", "BBDO", "Leo Burnett", "DDB Mudra"];
  return (
    <section className="bg-[#050505] py-20 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-[1px] w-8 bg-[#85bde2]" />
          <span className="text-[10px] tracking-[0.3em] text-[#85bde2] uppercase font-semibold">Trusted By</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-white/[0.05]">
          {sponsors.map((s) => (
            <div key={s} className="bg-[#050505] h-16 flex items-center justify-center text-[10px] font-bold tracking-[0.2em] text-[#717182] hover:text-[#A1A1AA] transition-colors uppercase">
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/15">
                <ImageWithFallback src={prominentLogo} alt="PROMINENT" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-black tracking-[0.22em] text-white uppercase">Prominent</span>
            </div>
            <p className="text-xs text-[#717182] leading-relaxed">
              The Professional Marketing Institution. Building future marketing leaders since 2021.
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-[#A1A1AA] uppercase mb-5">Navigate</p>
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} className="block text-sm text-[#717182] hover:text-white transition-colors mb-3 text-left">
                {label}
              </button>
            ))}
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-[#A1A1AA] uppercase mb-5">Connect</p>
            <div className="flex gap-4">
              {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 border border-white/[0.1] flex items-center justify-center text-[#717182] hover:text-white hover:border-white/30 transition-all">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-[#A1A1AA] uppercase mb-5">Contact</p>
            <a href="mailto:prominent@college.edu" className="flex items-center gap-2.5 text-sm text-[#717182] hover:text-white transition-colors">
              <Mail size={13} /> prominent@college.edu
            </a>
          </div>
        </div>
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#717182] tracking-wide">© 2026 PROMINENT — The Marketing Club. All rights reserved.</p>
          <p className="text-[11px] text-[#717182]" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>
            Authority · Leadership · Legacy
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Glance/Gallery Section ───────────────────────────────────────────────────
function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<{ type: "img" | "video"; src: string; title: string } | null>(null);

  const galleryItems = [
    { type: "img", src: image0, cat: "cohort", title: "PROMINENT Cohort Group", desc: "The core members of PROMINENT AY 2026-27 cohort." },
    { type: "img", src: image1, cat: "events", title: "Industry Connect Series", desc: "Interactive panel session with CXO executives." },
    { type: "img", src: image2, cat: "leadership", title: "Presidential Investiture", desc: "President Dev N Suman receiving the collegiate marketing award." },
    { type: "img", src: image3, cat: "events", title: "Case Competition Conclave", desc: "Winning podium at the national marketing competition." },
    { type: "img", src: image4, cat: "cohort", title: "Marketing Conclave Presentation", desc: "Team photo showcase for the annual general assembly." },
    // Mock video item
    {
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-business-team-having-a-meeting-in-office-43187-large.mp4",
      cat: "videos",
      title: "PROMINENT Annual Summit Aftermovie",
      desc: "Highlight reels and keynote highlights from our flagship event."
    }
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.cat === filter);

  return (
    <section id="gallery" className="relative bg-gradient-to-b from-[#050505] to-[#0A0A0A] py-28 lg:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-[#85bde2]/3 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHead
          eyebrow="Glance & Gallery"
          title={<>PROMINENT<br />At a Glance</>}
          sub="Explore the visual legacy of our campus activities, national achievements, and student events."
        />

        {/* Filter Tabs */}
        <div className="flex gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {["all", "events", "cohort", "leadership", "videos"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-xs font-black tracking-[0.15em] uppercase transition-all whitespace-nowrap rounded-sm cursor-pointer ${
                filter === cat
                  ? "bg-gradient-to-r from-[#85bde2] to-[#d4e6f4] text-[#050505] shadow-[0_0_20px_rgba(133,189,226,0.15)]"
                  : "bg-[#0D0D0D]/40 border border-white/[0.08] text-[#A1A1AA] hover:border-[#85bde2]/30 hover:text-white"
              }`}
            >
              {cat === "all" ? "All Media" : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm ring-1 ring-white/10 bg-[#0D0D0D] cursor-pointer hover:shadow-[0_15px_30px_rgba(133,189,226,0.06)] border border-white/[0.02] hover:border-[#85bde2]/20 transition-all duration-500"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => setLightboxItem({ type: item.type as "img" | "video", src: item.src, title: item.title })}
            >
              {item.type === "img" ? (
                <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#85bde2]/20 transition-all">
                      <Play size={16} className="text-white group-hover:text-[#85bde2] transition-colors ml-0.5" />
                    </div>
                  </div>
                  {/* Mock thumbnail (using image0 as video bg) */}
                  <img src={image0} alt={item.title} className="w-full h-full object-cover filter blur-[1px]" />
                </div>
              )}
              {/* Overlay content on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20">
                <span className="text-[8px] tracking-[0.2em] text-[#85bde2] uppercase font-bold mb-1">{item.cat}</span>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wide">{item.title}</h4>
                <p className="text-[10px] text-[#A1A1AA] leading-relaxed line-clamp-2 font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer z-50 bg-black/40 p-2 rounded-full"
              onClick={() => setLightboxItem(null)}
            >
              <X size={20} />
            </button>
            <motion.div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full overflow-hidden rounded-sm ring-1 ring-white/10 bg-[#0D0D0D] flex items-center justify-center">
                {lightboxItem.type === "img" ? (
                  <img src={lightboxItem.src} alt={lightboxItem.title} className="max-h-[75vh] w-auto object-contain" />
                ) : (
                  <video src={lightboxItem.src} controls autoPlay className="max-h-[75vh] w-full object-contain" />
                )}
              </div>
              <p className="text-sm font-bold text-white mt-3 uppercase tracking-wide">{lightboxItem.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Apply Modal Form ──────────────────────────────────────────────────────────
function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [sop, setSop] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const isPlaceholder = (import.meta.env.VITE_SUPABASE_URL as string || "").includes("placeholder");
      
      if (isPlaceholder) {
        // Local simulation fallback
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSuccess(true);
        setLoading(false);
        return;
      }

      const { error: dbError } = await supabase.from("submissions").insert([
        {
          full_name: fullName,
          email,
          phone,
          department,
          statement_of_purpose: sop,
          linkedin_url: linkedin,
          applied_at: new Date().toISOString()
        }
      ]);

      if (dbError) throw dbError;

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong. Please check your Supabase credentials or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-xl bg-[#0D0D0D] border border-white/[0.08] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden rounded-sm"
            initial={{ scale: 0.94, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#85bde2]/5 rounded-full filter blur-2xl pointer-events-none" />
            <button
              className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer p-1"
              onClick={onClose}
            >
              <X size={18} />
            </button>

            {!success ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight mb-1.5 uppercase">Apply for PROMINENT</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Batch 2026–27 cohort. Enter your details below. Your submission will be securely saved.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-200 text-xs leading-relaxed">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Department & Year</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BBA Marketing, 2nd Year"
                      className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Why do you want to join PROMINENT?</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write a brief statement about your interests and motivation..."
                    className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#85bde2] transition-colors resize-none rounded-sm"
                    value={sop}
                    onChange={(e) => setSop(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 bg-[#85bde2] text-[#050505] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(133,189,226,0.15)] disabled:opacity-50"
                >
                  {loading ? "Submitting Application..." : "Submit Application"}
                  {!loading && <ArrowRight size={12} />}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#85bde2]/10 border border-[#85bde2]/30 flex items-center justify-center mb-2">
                  <Award size={28} className="text-[#85bde2] animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">Application Submitted</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
                  Thank you for applying to PROMINENT Batch 2026–27. Your response has been securely saved to the database. We will review your profile and contact you soon.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#d4e6f4] text-[#050505] text-[10px] font-bold tracking-widest uppercase hover:bg-white transition-colors cursor-pointer mt-4"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Marketing Mela Modal ──────────────────────────────────────────────────
function MarketingMelaModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save submission data to Supabase if config is set
      const isPlaceholder = (import.meta.env.VITE_SUPABASE_URL as string || "").includes("placeholder");
      if (!isPlaceholder) {
        await supabase.from("mela_registrations").insert([
          {
            full_name: name,
            phone_number: phone,
            department: dept,
            registered_at: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.warn("Supabase insert ignored/failed:", err);
    }

    // Redirect to WhatsApp
    const message = `Hello PROMINENT! I want to register for the Marketing Mela.\n\nName: ${name}\nPhone: ${phone}\nDepartment/Year: ${dept}`;
    const waUrl = `https://wa.me/919971306762?text=${encodeURIComponent(message)}`;
    
    setLoading(false);
    onClose();
    window.open(waUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-[#0D0D0D] border border-white/[0.08] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden rounded-sm group"
            initial={{ scale: 0.94, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient background glow inside card */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#85bde2]/10 rounded-full filter blur-2xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#85bde2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#85bde2]"></span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#85bde2] uppercase font-black">Upcoming Event</span>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">
              Marketing Mela Registration
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-light">
              Enter your details below to register. Upon clicking submit, you will be redirected to WhatsApp to directly coordinate with the organizing team.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajiv Kumar"
                  className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-[#A1A1AA] uppercase tracking-wider font-semibold">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Department & Year</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BBA (Marketing), 2nd Year"
                  className="px-3.5 py-2.5 bg-[#050505] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#85bde2] transition-colors rounded-sm"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 bg-[#85bde2] text-[#050505] text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(133,189,226,0.15)] disabled:opacity-50"
              >
                {loading ? "Redirecting..." : "Register & Message WhatsApp"}
                {!loading && <ArrowRight size={12} />}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showMelaModal, setShowMelaModal] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleApply = () => setShowApplyModal(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white" style={{ fontFamily: "Inter,sans-serif" }}>
      <AnimatePresence>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      {splashDone && (
        <>
          <Nav scrolled={scrolled} onApply={handleApply} />
          <Hero onApply={handleApply} />
          <StatsStrip />
          <About />
          <Events />
          <Gallery />
          <Excellence />
          <Dashboard onApply={handleApply} />
          <Transformation />
          <Legacy />
          <Board />
          <Speakers />
          <Network />
          <Recruitment onApply={handleApply} />
          <Sponsors />
          <Footer />

          {/* Floating Upcoming Event Badge */}
          <motion.div
            onClick={() => setShowMelaModal(true)}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="fixed bottom-6 left-6 z-40 bg-[#0D0D0D]/90 backdrop-blur-md border border-[#85bde2]/30 hover:border-[#85bde2] rounded-full px-4.5 py-2.5 flex items-center gap-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)] cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(133,189,226,0.15)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#85bde2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#85bde2]"></span>
            </span>
            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-white group-hover:text-[#85bde2] transition-colors">
              Marketing Mela 🔥
            </span>
            <ArrowRight size={10} className="text-[#85bde2] group-hover:translate-x-0.5 transition-transform" />
          </motion.div>

          {/* Modal popup forms */}
          <ApplyModal open={showApplyModal} onClose={() => setShowApplyModal(false)} />
          <MarketingMelaModal open={showMelaModal} onClose={() => setShowMelaModal(false)} />
        </>
      )}
    </div>
  );
}
