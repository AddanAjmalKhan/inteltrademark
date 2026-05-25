"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";
import {
  FiCheck, FiHome, FiArrowRight, FiChevronRight, FiChevronLeft,
  FiShield, FiLock, FiCompass, FiBriefcase, FiAlertCircle, FiUsers,
  FiShare2, FiCheckCircle,
} from "react-icons/fi";
import Link from "next/link";

/* ─── easing ──────────────────────────────────────────────────── */
const EASE = cubicBezier(0.22, 1, 0.36, 1);

/* ─── scroll-reveal wrapper ───────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "left" | "right" | "scale"; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const initial =
    direction === "left"  ? { opacity: 0, x: -55 } :
    direction === "right" ? { opacity: 0, x:  55 } :
    direction === "scale" ? { opacity: 0, scale: 0.88 } :
                            { opacity: 0, y: 50 };
  return (
    <motion.div ref={ref} initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial}
      transition={{ duration: 0.7, ease: EASE, delay }} className={className}
    >{children}</motion.div>
  );
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ─── animated counter ────────────────────────────────────────── */
function Counter({ end, suffix = "+" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number, startTime: number) => {
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── data ────────────────────────────────────────────────────── */
const aboutServices = [
  { title: "Corporate Compliance",      icon: FiBriefcase,   image: "/bg_compliance.png"  },
  { title: "Intellectual Property Law", icon: FiShield,      image: "/bg_ip_law.png"      },
  { title: "Commercial Arbitration",    icon: FiCompass,     image: "/bg_arbitration.png" },
];

const stats = [
  { end: 25,  label: "Years of Experienced"  },
  { end: 980, label: "Total Completed Case"  },
  { end: 620, label: "Happy Customers"       },
  { end: 99,  label: "Case Success Rate"     },
];

const timeline = [
  { year: "2010", title: "Started Patent Cases",  desc: "Patent protection. with year colltive experience acrod iverse industries team of this dedicated." },
  { year: "2014", title: "Global Expansion",      desc: "Patent protection. with year colltive experience acrod iverse industries team of this dedicated." },
  { year: "2018", title: "Clearance Automation",  desc: "Patent protection. with year colltive experience acrod iverse industries team of this dedicated." },
  { year: "2024", title: "Modern IP Ecosystem",   desc: "Patent protection. with year colltive experience acrod iverse industries team of this dedicated." },
];

const mediaLogos = [
  { name: "Forbes",      style: "font-serif italic font-bold text-2xl tracking-tight" },
  { name: "Discovery",   style: "font-sans font-bold text-xl tracking-widest"         },
  { name: "KHOU 11.",    style: "font-mono font-bold text-xl"                         },
  { name: "DAILY NEWS",  style: "font-sans font-bold text-sm tracking-widest"         },
  { name: "BBC",         style: "font-sans font-extrabold text-2xl tracking-wider"    },
  { name: "CNN",         style: "font-sans font-extrabold text-2xl tracking-widest text-red-700" },
];

const team = [
  { name: "Clara J. Winslow",  role: "Patent Lawyer", image: "/team_2.png" },
  { name: "Nora L. Kendrix",   role: "Patent Lawyer", image: "/team_1.png" },
  { name: "Marget M. Hason",   role: "Patent Lawyer", image: "/team_3.png" },
];

/* ─── label badge (replaces the half-circle icon) ─────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
        <div className="w-full h-1/2 bg-[#EAB308]" />
        <div className="w-full h-1/2 bg-[#121943]" />
      </div>
      <span className="text-xs font-extrabold text-gray-700 uppercase tracking-widest">{text}</span>
    </div>
  );
}

export default function About() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-72 md:h-80 bg-[#121943] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src="/our_story_team.png" alt="" className="w-full h-full object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[#121943]/65" />
        </div>
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-yellow-400/30 pointer-events-none"
            style={{ left: `${12 + i * 18}%`, top: `${28 + (i % 3) * 18}%` }}
            animate={{ y: [-14, 14, -14], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          />
        ))}
        <motion.div className="absolute top-0 left-24 w-0 h-0 pointer-events-none"
          style={{ borderLeft:"20px solid transparent", borderRight:"20px solid transparent", borderTop:"26px solid white" }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-8 w-full">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >About Us</motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2 text-gray-300 text-sm font-medium"
          >
            <FiHome className="text-base" />
            <Link href="/" className="hover:text-[#EAB308] transition-colors">Home</Link>
            <span className="text-gray-400">-</span>
            <span className="text-white font-bold">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT US — image collage  LEFT  +  content RIGHT
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: image collage — hidden on mobile, visible md+ */}
            <Reveal direction="left">
              {/* Mobile: simple image */}
              <div className="block md:hidden w-full">
                <img src="/boy.jpeg" alt="IP Consultant" className="w-full h-64 object-cover object-top" />
              </div>
              {/* Desktop: full collage */}
              <div className="hidden md:block relative h-[520px] w-full select-none">

                {/* Main tall image */}
                <motion.div className="absolute left-0 top-0 w-[65%] h-[80%] overflow-hidden shadow-xl z-10"
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                >
                  <img src="/boy.jpeg" alt="IP Consultant" className="w-full h-full object-cover object-top" />
                </motion.div>

                {/* Smaller overlapping bottom-right image */}
                <motion.div
                  className="absolute right-0 bottom-0 w-[55%] h-[52%] overflow-hidden shadow-2xl border-4 border-white z-20"
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img src="/team_2.png" alt="Team member" className="w-full h-full object-cover object-top" />
                </motion.div>

                {/* GLOBAL AWARD 2023 circular badge */}
                {/* Outer div: spring entrance only */}
                <motion.div
                  className="absolute top-4 right-[32%] z-30"
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.4 }}
                >
                  {/* Inner div: tween wobble loop (spring can't do 4-keyframe arrays) */}
                  <motion.div
                    className="w-28 h-28 rounded-full bg-[#121943] flex flex-col items-center justify-center text-white border-4 border-white shadow-2xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ type: "tween", duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-[9px] font-bold tracking-widest uppercase text-yellow-400">GLOBAL AWARD</span>
                    <span className="text-3xl font-extrabold leading-tight">⚖</span>
                    <span className="text-[9px] font-bold tracking-widest text-yellow-400">2023</span>
                  </motion.div>
                </motion.div>

                {/* Dot-grid decoration */}
                <div className="absolute bottom-0 left-0 w-20 h-20 z-0 opacity-25"
                  style={{ backgroundImage: "radial-gradient(#EAB308 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }}
                />
              </div>
            </Reveal>

            {/* Right: content */}
            <Reveal direction="right" delay={0.1}>
              <SectionLabel text="ABOUT US" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
                Explore Our Intellectual<br />Property Journey
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We are a team of the dedicat patent professionals, unity by our commitment toour excellence patent protection. With years of collective experience diverse by industrie team of this dedicated.united.
              </p>

              {/* Feature highlight box */}
              <motion.div
                className="flex items-center gap-5 bg-[#f0eeee] px-6 py-5 mb-8 border-l-4 border-[#EAB308]"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full border-2 border-dashed border-[#EAB308] flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheckCircle className="text-2xl text-[#EAB308]" />
                </motion.div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-base">Proven Track Record</h4>
                  <p className="text-sm text-gray-500 mt-0.5">What About My Learning Lab Workshop Options?</p>
                </div>
              </motion.div>

              {/* CTA + avatars */}
              <div className="flex items-center gap-6 flex-wrap">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/services"
                    className="flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition-colors"
                  >
                    Know More <FiChevronRight />
                  </Link>
                </motion.div>

                {/* Overlapping avatars */}
                <div className="flex items-center">
                  {["/team_1.png", "/team_2.png", "/team_3.png"].map((src, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"
                      style={{ marginLeft: i === 0 ? 0 : -12, zIndex: i }}
                      whileHover={{ y: -4, zIndex: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover object-top" />
                    </motion.div>
                  ))}
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#121943] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ marginLeft: -12 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#EAB308" }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES  (gray bg, 3 cards, same layout as services page)
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-[#f0eeee]">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">

          <Reveal className="text-center mb-14">
            <SectionLabel text="OUR SERVICE" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Explore Creative Legal<br />Protections
            </h2>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-70px" }}
          >
            {aboutServices.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div key={i} variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 group overflow-visible"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <motion.img src={svc.image} alt={svc.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-center -mt-9 relative z-10">
                    <motion.div
                      className="w-[72px] h-[72px] rounded-full bg-[#121943] border-4 border-white flex items-center justify-center shadow-lg group-hover:bg-[#EAB308] transition-colors duration-300"
                      whileHover={{ rotate: 360 }} transition={{ duration: 0.55 }}
                    >
                      <Icon className="text-2xl text-white" />
                    </motion.div>
                  </div>
                  <div className="px-7 pt-5 pb-8">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200 mb-3">{svc.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                      Our team comprises seasoned patent professionals with years of experience across industries.
                    </p>
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <Link href="/services" className="flex items-center gap-1.5 text-sm font-bold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200">
                        Know More <FiChevronRight className="text-base" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA bar */}
          <Reveal className="mt-10">
            <div className="bg-white flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6">
              <p className="text-gray-600 font-medium text-sm">
                Need Intellectual Property service Consulting With Us
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/services"
                  className="flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-3.5 transition-colors whitespace-nowrap"
                >
                  More Services <FiChevronRight />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIDEO  +  STATS BAR
      ══════════════════════════════════════════════════════ */}
      <section>
        {/* Video */}
        <div className="relative h-[420px] md:h-[500px] overflow-hidden">
          <img src="/our_story_team.png" alt="Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.a
              href="https://www.youtube.com/watch?v=YS3PwmOQ1Fc"
              target="_blank" rel="noopener noreferrer"
              className="relative w-24 h-24 rounded-full bg-[#EAB308] flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              {[1, 2].map((n) => (
                <motion.span key={n}
                  className="absolute inset-0 rounded-full border-4 border-[#EAB308]/60"
                  animate={{ scale: [1, 1.5 + n * 0.2], opacity: [0.7, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: n * 0.5 }}
                />
              ))}
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6V4z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-[#121943]">
          <div className="max-w-[90rem] mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4"
              variants={containerVariants} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`flex flex-col items-center justify-center py-10 px-6 relative ${i < 3 ? "border-r border-white/10" : ""}`}
                  whileHover={{ backgroundColor: "rgba(234,179,8,0.08)", transition: { duration: 0.2 } }}
                >
                  <div className="text-5xl md:text-6xl font-extrabold text-white/20 tracking-tight leading-none mb-2">
                    <Counter end={s.end} />
                  </div>
                  <p className="text-sm font-bold text-gray-300 uppercase tracking-wide text-center">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HISTORY TIMELINE
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">

          <Reveal className="text-center mb-16">
            <SectionLabel text="OUR HISTORY" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              History Through Time
            </h2>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal connector line */}
            <div className="hidden md:block absolute top-[46px] left-0 right-0 h-[2px] bg-gray-200 z-0" />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-0"
              variants={containerVariants} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-70px" }}
            >
              {timeline.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col items-center px-4">
                  {/* Year */}
                  <span className="text-[#121943] font-extrabold text-lg mb-3">{item.year}</span>

                  {/* Dot */}
                  <motion.div
                    className="w-[18px] h-[18px] rounded-full bg-[#121943] border-4 border-gray-200 relative z-10 flex-shrink-0"
                    whileInView={{ scale: [0.5, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  />

                  {/* Down arrow */}
                  <div className="w-0 h-0 mt-2 mb-4"
                    style={{ borderLeft:"10px solid transparent", borderRight:"10px solid transparent", borderTop:"12px solid #d1d5db" }}
                  />

                  {/* Card */}
                  <motion.div
                    className="bg-[#f0eeee] p-6 w-full shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-extrabold text-gray-900 text-base mb-3 group-hover:text-[#EAB308] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FREE QUOTE  (left white card)  +  TESTIMONIAL  (right navy)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#121943]">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left: white quote card */}
            <Reveal direction="left" className="lg:col-span-2 p-8 lg:p-14">
              <div className="bg-white p-8 md:p-10 shadow-2xl">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Get a Free Quote</h3>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form key="form" onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
                    >
                      <motion.div className="grid grid-cols-2 gap-4"
                        variants={containerVariants} initial="hidden" animate="visible"
                      >
                        {[
                          { ph: "Name",   type: "text",  key: "name"  },
                          { ph: "Email",  type: "email", key: "email" },
                          { ph: "Phone",  type: "tel",   key: "phone" },
                        ].map((f) => (
                          <motion.input key={f.key} variants={itemVariants}
                            type={f.type} placeholder={f.ph}
                            value={(formData as any)[f.key]}
                            onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                            className={`px-4 py-3 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#EAB308] placeholder-gray-400 text-sm font-medium transition-colors ${f.key === "phone" ? "col-span-1" : ""}`}
                          />
                        ))}
                        <motion.div variants={itemVariants} className="relative">
                          <select value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className={`w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#EAB308] appearance-none text-sm font-medium transition-colors ${formData.service ? "text-gray-900" : "text-gray-400"}`}
                          >
                            <option value="" disabled>Select Service</option>
                            <option value="corporate">Corporate Compliance</option>
                            <option value="ip-law">IP Law</option>
                            <option value="arbitration">Commercial Arbitration</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.textarea rows={4} placeholder="Write a Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#EAB308] placeholder-gray-400 text-sm font-medium transition-colors resize-none"
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.45, ease: EASE }}
                      />

                      <motion.button type="submit" disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                        className={`flex items-center gap-2 font-bold px-8 py-4 text-white transition-colors ${isSubmitting ? "bg-gray-400" : "bg-[#EAB308] hover:bg-yellow-600"}`}
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.45, ease: EASE }}
                      >
                        {isSubmitting ? (
                          <><motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          /> Submitting…</>
                        ) : (
                          <>Request Consultation <FiChevronRight /></>
                        )}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div key="ok" className="flex flex-col items-center py-12 text-center"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                      >
                        <FiCheckCircle className="text-[#EAB308] text-6xl mb-5" />
                      </motion.div>
                      <h4 className="text-xl font-extrabold text-gray-900">Message Sent!</h4>
                      <p className="text-gray-500 text-sm mt-2">We'll be in touch within 4 business hours.</p>
                      <button onClick={() => setSubmitted(false)}
                        className="mt-6 text-[#EAB308] font-bold text-sm hover:underline"
                      >← Send Another</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Right: testimonial */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-3 flex flex-col justify-center px-8 lg:px-14 py-14 relative overflow-hidden">
              {/* Decorative large quote mark bg */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[200px] font-serif text-white/5 leading-none select-none pointer-events-none">"</div>

              {/* Stars */}
              <motion.div className="flex gap-1 text-[#EAB308] text-2xl mb-6"
                variants={containerVariants} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.span key={i} variants={{ hidden:{ opacity:0, scale:0 }, visible:{ opacity:1, scale:1, transition:{ delay: i*0.1, type:"spring" } } }}>★</motion.span>
                ))}
              </motion.div>

              <p className="text-xl md:text-2xl font-medium text-gray-300 leading-relaxed mb-8">
                We are a team of the dedicated patent professionals, united by commitment toour excellence patent protect years of collective experience acros diverse industries team of dedicated
              </p>

              {/* Author */}
              <div className="flex items-center gap-5 mb-8">
                <motion.div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#EAB308] flex-shrink-0"
                  whileHover={{ scale: 1.08 }}
                >
                  <img src="/ceo.png" alt="Evan S. Sherman" className="w-full h-full object-cover object-top" />
                </motion.div>
                <div>
                  <h4 className="text-white font-extrabold text-lg">Evan S. Sherman</h4>
                  <p className="text-gray-400 text-sm">CEO & Founder</p>
                </div>
                {/* Large decorative quote */}
                <div className="ml-auto text-6xl font-serif text-white/20 leading-none select-none">"</div>
              </div>

              {/* Carousel dots */}
              <div className="flex items-center gap-3">
                <motion.button whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-[#EAB308] transition-colors">
                  <FiChevronLeft className="text-2xl" />
                </motion.button>
                <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-500" />
                <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                <motion.button whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-[#EAB308] transition-colors">
                  <FiChevronRight className="text-2xl" />
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MEDIA LOGOS  (Forbes, Discovery, etc.)
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#f0eeee]">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            {mediaLogos.map((logo, i) => (
              <motion.div key={i} variants={itemVariants}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", transition: { duration: 0.2 } }}
                className="bg-white border border-gray-200 flex items-center justify-center py-7 px-4 cursor-default group"
              >
                <span className={`${logo.style} text-gray-700 group-hover:text-[#121943] transition-colors duration-200 text-center leading-tight`}>
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EXPERT TEAM MEMBERS
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">

          {/* Header row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <Reveal direction="left">
              <div className="inline-block border border-[#EAB308] px-4 py-1.5 mb-4">
                <span className="text-xs font-extrabold text-[#EAB308] uppercase tracking-widest">OUR TEAM</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Expert Team Members
              </h2>
            </Reveal>
            <Reveal direction="right">
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Our team comprises seasoned patent law in professionals experience.
              </p>
            </Reveal>
          </div>

          {/* Team cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-70px" }}
          >
            {team.map((t, idx) => (
              <motion.div key={idx} variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative group overflow-hidden bg-gray-100 h-[420px]"
              >
                {/* Photo */}
                <motion.img src={t.image} alt={t.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.55 }}
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Name + role */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-extrabold text-xl leading-tight">{t.name}</h3>
                    <span className="text-gray-300 text-sm font-medium">{t.role}</span>
                  </div>

                  {/* Share button */}
                  <motion.button
                    className="w-12 h-12 rounded-full bg-[#EAB308] flex items-center justify-center text-white shadow-lg flex-shrink-0"
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FiShare2 className="text-lg" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

    </div>
  );
}
