"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform, cubicBezier } from "framer-motion";
import {
  FiShield, FiAward, FiUsers, FiTrendingUp, FiActivity, FiArrowRight,
  FiBriefcase, FiCompass, FiAlertCircle, FiCheck, FiFolder, FiLock,
  FiPlayCircle, FiPhoneCall, FiMail, FiMapPin, FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import Link from "next/link";
import TrademarkSearch from "./components/TrademarkSearch";
import FAQAccordion from "./components/FAQAccordion";

/* ─── Easing helper ────────────────────────────────────────────────── */
const EASE = cubicBezier(0.22, 1, 0.36, 1);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

/* ─── Animated counter hook ───────────────────────────────────────── */
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

/* ─── ScrollReveal wrapper ────────────────────────────────────────── */
function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initial =
    direction === "left"  ? { opacity: 0, x: -60 } :
    direction === "right" ? { opacity: 0, x:  60 } :
    direction === "scale" ? { opacity: 0, scale: 0.85 } :
                            { opacity: 0, y: 60 };

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [activeCaseTab, setActiveCaseTab] = useState<"all" | "copyright" | "patent" | "trademark">("all");
  const [quoteService, setQuoteService] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);

  /* Hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Stats counter trigger */
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const reasons = [
    { title: "Corporate Compliance", desc: "Our team comprises seasoned patent professionals with years of experience across diverse commercial sectors.", icon: FiShield },
    { title: "Intellectual Property Law", desc: "We deliver extensive courtroom experience and defensive registration models to secure trademark rights.", icon: FiLock },
    { title: "Commercial Arbitration", desc: "Resolving complex cross-border ownership conflicts through professional legal strategy and mediation.", icon: FiCompass }
  ];

  const protections = [
    { num: "01", title: "Corporate Compliance", link: "/services", icon: FiBriefcase, image: "/bg_compliance.png" },
    { num: "02", title: "Intellectual Property Law", link: "/services", icon: FiShield, image: "/bg_ip_law.png" },
    { num: "03", title: "Commercial Arbitration", link: "/services", icon: FiCompass, image: "/bg_arbitration.png" },
    { num: "04", title: "Regulatory Affairs", link: "/services", icon: FiAlertCircle, image: "/bg_regulatory.png" },
    { num: "05", title: "Brand Protection", link: "/services", icon: FiLock, image: "/bg_brand.png" },
    { num: "06", title: "Employment Law Advisory", link: "/services", icon: FiFolder, image: "/bg_employment.png" }
  ];

  const team = [
    { name: "Marget M. Hason", role: "Senior Patent Analyst", image: "/team_1.png" },
    { name: "Clara J. Winslow", role: "IP Litigation Consultant", image: "/team_2.png" },
    { name: "Nora L. Kendrix", role: "Global Trademark Consultant", image: "/team_3.png" }
  ];

  const caseStudies = [
    { title: "Innovative Narratives", category: "copyright", image: "/case_study_1.png" },
    { title: "Global Recognition", category: "trademark", image: "/case_study_2.png" },
    { title: "Branding Brilliance", category: "trade", image: "/case_study_3.png" },
    { title: "Worldwide IP Protection", category: "patent", image: "/case_study_1.png" },
    { title: "Creative Shields", category: "creative", image: "/case_study_2.png" },
    { title: "Trademark Triumphs", category: "trademark", image: "/case_study_3.png" }
  ];

  const filteredCases = caseStudies.filter(
    (cs) => activeCaseTab === "all" || cs.category === activeCaseTab
  );

  const faqs = [
    { question: "IP Translations", answer: "Our team comprises seasoned professionals with years of experience across language localization. We ensure your patent and trademark descriptions are perfectly translated and fully compliant with local state requirements across non-English speaking jurisdictions." },
    { question: "How long does copyright registration last?", answer: "Generally, copyright protection lasts for the lifetime of the creator plus an additional 70 years after their passing. For anonymous works or corporate creations, it spans 95 years from publication or 120 years from creation." },
    { question: "What is the Madrid Protocol for trademarks?", answer: "The Madrid Protocol is an international treaty that allows a brand owner to secure trademark protection in up to 120+ countries by filing a single unified application through WIPO, simplifying global filings and cutting down administrative costs." }
  ];

  const blogPosts = [
    { title: "Patent War: Iconic Legal Battles That Shaped Modern Innovation", excerpt: "Analyze historical courtroom clashes that established critical design patent boundaries and changed technological development paths.", date: "May 22, 2026", readTime: "8 min read" },
    { title: "Code Clash: The Algorithms That Sparked Courtroom Chaos", excerpt: "Are programming codes copyrightable or patentable? We explore recent courtroom rulings and the legal limits of algorithmic protections.", date: "May 09, 2026", readTime: "6 min read" },
    { title: "Design Duel: Icons, Interfaces, and Intellectual Property", excerpt: "Safeguard your application UI design. Discover the legal frameworks protecting graphics, layouts, and user experiences.", date: "Apr 25, 2026", readTime: "5 min read" }
  ];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-stone-950 overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION — Premium Redesign
      ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-[#0b0f2a] flex items-center pt-16">

        {/* ── Background atmosphere ── */}

        {/* Primary yellow glow — right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#EAB308]/[0.07] blur-[140px] pointer-events-none" />
        {/* Cool blue glow — upper center */}
        <div className="absolute left-[38%] -top-24 w-[480px] h-[420px] rounded-full bg-blue-600/[0.09] blur-[110px] pointer-events-none" />

        {/* ── Scattered yellow dim bubbles ── */}
        <div className="absolute left-[8%]  top-[14%]  w-72  h-72  rounded-full bg-[#EAB308]/[0.055] blur-[90px]  pointer-events-none" />
        <div className="absolute left-[22%] bottom-[8%] w-56  h-56  rounded-full bg-[#EAB308]/[0.04]  blur-[80px]  pointer-events-none" />
        <div className="absolute left-[42%] top-[8%]   w-48  h-48  rounded-full bg-[#EAB308]/[0.035] blur-[70px]  pointer-events-none" />
        <div className="absolute right-[28%] bottom-[18%] w-64 h-64 rounded-full bg-[#EAB308]/[0.05]  blur-[100px] pointer-events-none" />
        <div className="absolute right-[8%]  top-[12%]  w-52  h-52  rounded-full bg-[#EAB308]/[0.045] blur-[85px]  pointer-events-none" />
        <div className="absolute left-[60%] top-[55%]   w-40  h-40  rounded-full bg-[#EAB308]/[0.04]  blur-[65px]  pointer-events-none" />
        <div className="absolute left-[3%]  top-[55%]   w-36  h-36  rounded-full bg-[#EAB308]/[0.035] blur-[60px]  pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            opacity: 0.035,
          }}
        />
        {/* Thin horizontal rule accent at midpoint */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#EAB308]/[0.12] to-transparent pointer-events-none" />
        {/* Floating particles */}
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width:  i % 2 === 0 ? 5 : 3,
              height: i % 2 === 0 ? 5 : 3,
              left: `${6 + i * 10}%`,
              top:  `${12 + (i % 5) * 18}%`,
              background: i % 3 === 0 ? "#EAB308" : "rgba(255,255,255,0.35)",
            }}
            animate={{ y: [-14, 14, -14], opacity: [0.1, 0.5, 0.1] }}
            transition={{ type: "tween", duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          />
        ))}

        {/* ── Main grid ── */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[90rem] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[58%_42%] items-center w-full py-8 gap-0"
        >

          {/* ── LEFT: Text content ─────────────────────── */}
          <div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
              className="inline-flex items-center gap-2.5 bg-[#EAB308]/[0.12] border border-[#EAB308]/30 rounded-full px-5 py-2 mb-5 md:mb-9"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-[#EAB308] flex-shrink-0"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ type: "tween", duration: 1.8, repeat: Infinity }}
              />
              <span className="text-[#EAB308] text-[11px] font-bold uppercase tracking-[0.22em]">
                Trusted IP Experts
              </span>
            </motion.div>

            {/* Headline — 3 line word-reveal */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
                className="text-gray-400 text-[28px] sm:text-[36px] md:text-5xl xl:text-[58px] font-semibold leading-[1.1] tracking-tight"
              >
                Unveiling Patents,
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
                className="text-white text-[34px] sm:text-[46px] md:text-[64px] xl:text-[76px] font-black leading-[1.0] tracking-tight"
              >
                Trademarks &amp;
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-3 mb-5">
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.56, ease: EASE }}
                className="text-[#EAB308] text-[34px] sm:text-[46px] md:text-[64px] xl:text-[76px] font-black leading-[1.1] tracking-tight"
              >
                Copyrights
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7, ease: EASE }}
              className="text-gray-400 text-[16px] leading-[1.85] max-w-[540px] mb-10"
            >
              Unveiling Patents, Trademarks &amp; Copyrights — our seasoned IP attorneys
              safeguard your innovations with unmatched precision and authority.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.85, ease: EASE }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              {/* Primary */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#EAB308] hover:bg-yellow-400 text-white font-bold px-9 py-4 text-[15px] tracking-wide transition-colors shadow-xl shadow-yellow-500/20"
                >
                  Find Out More
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ type: "tween", duration: 1.6, repeat: Infinity }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Secondary — Watch video */}
              <motion.a
                href="https://www.youtube.com/watch?v=YS3PwmOQ1Fc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 text-white font-semibold text-[15px] group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.22 }}
              >
                <div className="relative w-[52px] h-[52px] flex-shrink-0">
                  <div className="w-full h-full bg-white/10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#EAB308]/20 group-hover:border-[#EAB308]/50 transition-colors">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4l12 6-12 6V4z" />
                    </svg>
                  </div>
                  <motion.span
                    className="absolute inset-0 rounded-full border border-white/30"
                    animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
                    transition={{ type: "tween", duration: 1.6, repeat: Infinity }}
                  />
                </div>
                Watch Overview
              </motion.a>
            </motion.div>

          </div>

          {/* ── RIGHT: Image with floating credential cards ─ */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.3, ease: EASE }}
            className="relative hidden lg:flex justify-center items-end h-[560px] xl:h-[640px]"
          >
            {/* Shaped backdrop */}
            <div className="absolute inset-x-4 inset-y-0 rounded-tl-[100px] rounded-br-[100px] bg-gradient-to-br from-[#EAB308]/[0.09] via-transparent to-[#EAB308]/[0.04] border border-[#EAB308]/[0.12]" />
            {/* Inner warm glow */}
            <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#EAB308]/[0.12] blur-[70px] pointer-events-none" />

            {/* Hero image — professional businessman suits IP law firm */}
            <motion.img
              src="/hero_businessman.png"
              alt="IP Legal Expert"
              className="absolute bottom-0 right-0 h-[96%] w-auto object-contain object-bottom z-10"
              animate={{ y: [0, -11, 0] }}
              transition={{ type: "tween", duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                maskImage: "linear-gradient(to top, transparent 0%, black 18%)",
                WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 18%)",
              }}
            />

            {/* ── Floating card: Trademarks Registered ── */}
            <motion.div
              className="absolute top-10 -left-4 z-20 bg-white rounded-2xl px-5 py-4 shadow-2xl shadow-black/20 flex items-center gap-4"
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.15, duration: 0.75, ease: EASE }}
              whileHover={{ y: -5, scale: 1.04, transition: { duration: 0.22 } }}
            >
              <div className="w-13 h-13 w-[52px] h-[52px] bg-[#EAB308] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-400/30">
                <FiAward className="text-white text-xl" />
              </div>
              <div>
                <div className="text-[26px] font-black text-[#121943] leading-none">500+</div>
                <div className="text-gray-500 text-xs font-semibold mt-0.5 tracking-wide">Trademarks Registered</div>
              </div>
            </motion.div>

            {/* ── Floating card: Years Experience ── */}
            <motion.div
              className="absolute bottom-32 -left-8 z-20 bg-[#121943] border border-[#EAB308]/25 rounded-2xl px-5 py-4 shadow-2xl shadow-black/40"
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.35, duration: 0.75, ease: EASE }}
              whileHover={{ y: -5, scale: 1.04, transition: { duration: 0.22 } }}
            >
              <div className="flex items-center gap-2 text-[#EAB308] text-[10px] font-bold uppercase tracking-widest mb-2">
                <FiShield className="text-[12px]" /> Proven Excellence
              </div>
              <div className="text-[38px] font-black text-white leading-none">20+</div>
              <div className="text-gray-400 text-xs font-semibold mt-1 tracking-wide">Years of Practice</div>
            </motion.div>

            {/* ── Play button (center-image) ── */}
            <motion.a
              href="https://www.youtube.com/watch?v=YS3PwmOQ1Fc"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[44%] left-[46%] -translate-x-1/2 -translate-y-1/2 z-30 w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/30"
              whileHover={{ scale: 1.14 }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.05, type: "spring", stiffness: 280, damping: 22 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border-[3px] border-white"
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ type: "tween", duration: 1.6, repeat: Infinity }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border-[3px] border-white"
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ type: "tween", duration: 1.6, repeat: Infinity, delay: 0.8 }}
              />
              <svg className="w-6 h-6 text-[#121943] ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6V4z" />
              </svg>
            </motion.a>

            {/* ── Dot cluster — top-right corner ── */}
            <div
              className="absolute top-6 right-6 w-20 h-20 opacity-[0.35] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#EAB308 1.5px, transparent 1.5px)", backgroundSize: "9px 9px" }}
            />
            {/* ── Dot cluster — bottom-right corner ── */}
            <div
              className="absolute bottom-6 right-2 w-14 h-14 opacity-[0.18] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "7px 7px" }}
            />
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span className="text-gray-500 text-[9px] tracking-[0.3em] uppercase font-semibold">Scroll</span>
          <motion.div
            className="w-[1.5px] h-8 bg-gradient-to-b from-[#EAB308] to-transparent"
            animate={{ scaleY: [1, 0.25, 1], opacity: [1, 0.25, 1] }}
            transition={{ type: "tween", duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          REASONS TO CHOOSE US
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <motion.span
              className="inline-block text-xs font-bold text-yellow-500 uppercase tracking-widest border border-dashed border-yellow-500 px-6 py-2 mb-6"
              whileInView={{ borderColor: ["#EAB308", "#EAB308cc", "#EAB308"] }}
              transition={{ duration: 2, repeat: Infinity }}
              viewport={{ once: false }}
            >
              WHY CHOSE US
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Reason To Chose Us
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative p-10 bg-white hover:bg-[#121943] border border-gray-100 shadow-sm hover:shadow-2xl transition-colors duration-500 ease-out flex flex-col items-center text-center cursor-default"
                  style={{ clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <motion.div
                    className="relative w-24 h-24 flex items-center justify-center rounded-full border border-dashed border-yellow-500 group-hover:border-yellow-500 group-hover:bg-yellow-500 transition-colors duration-300 mb-8 z-10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-4xl text-yellow-500 group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300 z-10">{r.title}</h3>
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed transition-colors duration-300 z-10 px-2">{r.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION BRIDGE — visual break between Why Choose Us & About
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#121943] py-12 overflow-hidden">
        {/* Warm glow center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] h-28 rounded-full bg-[#EAB308]/[0.08] blur-[70px] pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left label */}
            <ScrollReveal direction="left" className="hidden md:flex">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#EAB308] rounded-full flex-shrink-0" />
                <span className="text-white text-lg font-extrabold tracking-tight">About Intel Trademark</span>
              </div>
            </ScrollReveal>

            {/* Center stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 w-full md:w-auto">
              {[
                { value: "20+",  label: "Years of Practice" },
                { value: "120+", label: "Countries Served" },
                { value: "500+", label: "Trademarks Filed" },
                { value: "98%",  label: "Success Rate",  yellow: true },
              ].map(({ value, label, yellow }, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="text-center">
                    <div className={`text-2xl md:text-3xl font-black leading-none ${yellow ? "text-[#EAB308]" : "text-white"}`}>
                      {value}
                    </div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mt-1.5 font-bold">
                      {label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right label */}
            <ScrollReveal direction="right" className="hidden md:flex">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-bold hidden md:block tracking-widest uppercase">Est. 2004</span>
                <span className="w-8 h-[2px] bg-[#EAB308] rounded-full flex-shrink-0" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          OUR STORY IN IP
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-[#f8f8f8]">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Text */}
            <ScrollReveal direction="left" className="lg:col-span-5 space-y-6 lg:pr-4">
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2">ABOUT US</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">Our Story In Intellectual Property</h2>
              <p className="text-gray-500 leading-relaxed text-sm pt-2">We are a team of the dedicated patent professionals, united by our commitment to our excellence patent protection. With years of collective experience acros diverse industries team of this dedicated patent professionals, united by our</p>

              <motion.ul
                className="space-y-4 pt-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {["Expertise in Patent Protection", "Commitment to Excellence", "Collaborative Partnership"].map((item, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-center gap-4 text-sm font-bold text-gray-900">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-[#121943] flex flex-shrink-0 items-center justify-center"
                      whileHover={{ scale: 1.3, backgroundColor: "#EAB308" }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiCheck className="text-white text-xs stroke-[3]" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="pt-8">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/about" className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition-colors">
                    Find Out More <FiArrowRight className="ml-1" />
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Middle Image */}
            <ScrollReveal direction="scale" delay={0.15} className="lg:col-span-4 relative h-[320px] sm:h-[400px] lg:h-[600px] mt-8 lg:mt-0">
              <motion.img
                src="/our_story_team.png"
                alt="Our Story Team"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#121943] text-white p-8 w-64 shadow-xl z-10 hidden sm:block"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#EAB308]" />
                <div className="text-5xl font-bold mb-2">10 <span className="font-medium">+</span></div>
                <div className="text-sm text-blue-200">Years of Experiences</div>
              </motion.div>
            </ScrollReveal>

            {/* Right Stats */}
            <ScrollReveal direction="right" delay={0.2} className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-10 lg:pl-10 mt-12 lg:mt-0">
              {[
                { num: 980, label: "Total Completed Case" },
                { num: 820, label: "Happy Customers" },
                { num: 760, label: "Case Success Rate" }
              ].map((stat, i) => (
                <StatCounter key={i} end={stat.num} label={stat.label} isLast={i === 2} />
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPLORE CREATIVE LEGAL PROTECTIONS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-[#121943]">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-white uppercase tracking-widest border border-dashed border-white px-6 py-2 mb-6">PRACTICE AREA</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore Creative Legal <br className="hidden md:block" />
              <span className="text-gray-400">Protections</span>
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {protections.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative bg-[#1A2254] p-10 shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
                >
                  <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none mix-blend-luminosity z-0" style={{ backgroundImage: `url(${p.image})` }} />
                  <div className="absolute top-6 left-6 text-7xl font-bold opacity-10 pointer-events-none transition-all duration-300 group-hover:opacity-20 z-10" style={{ WebkitTextStroke: "2px #ffffff", color: "transparent" }}>
                    {p.num}
                  </div>
                  <motion.div
                    className="absolute top-8 right-8 w-14 h-14 rounded-full bg-[#121943] group-hover:bg-[#EAB308] flex items-center justify-center transition-colors duration-300 z-10"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="text-2xl text-white" />
                  </motion.div>
                  <div className="pt-24 relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Our team comprises seasoned patent professionals with years of experience across industries.</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[#2A346C] flex items-center justify-between relative z-10">
                    <Icon className="text-gray-400 group-hover:text-[#EAB308] text-xl transition-colors duration-300" />
                    <motion.div whileHover={{ x: 4 }}>
                      <Link href={p.link} className="text-sm font-bold text-white border-b border-transparent group-hover:border-[#EAB308] pb-1 transition-colors duration-300">Know More</Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <ScrollReveal className="mt-16 text-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services" className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition-colors">
                Find Out More <FiArrowRight className="ml-1" />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PATENT ACQUISITION PROCESS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-[#f6f5f2]">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-6 bg-white">HOW ITS WORK</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">Our Patent Acquisition<br />Process</h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {[
              { num: "01", title: "Content Creation", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiUsers },
              { num: "02", title: "Registration", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiFolder },
              { num: "03", title: "Monitoring", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiActivity },
              { num: "04", title: "Licensing", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiBriefcase }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col items-center group cursor-pointer mt-10 lg:mt-0 relative"
              >
                <motion.div
                  className="w-24 h-24 rounded-full border-2 border-dashed border-[#EAB308] bg-white flex items-center justify-center mb-10 relative z-10 transition-colors duration-300 group-hover:bg-[#EAB308]"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <step.icon className="text-4xl text-[#EAB308] group-hover:text-white transition-colors duration-300" />
                </motion.div>

                <div className="relative w-full bg-white p-10 pt-12 text-left shadow-sm group-hover:bg-[#121943] transition-colors duration-300 h-full flex flex-col mt-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 transform group-hover:bg-[#121943] transition-colors duration-300 z-0" />
                  <span className="relative z-10 text-gray-500 font-extrabold text-lg mb-4 block group-hover:text-[#EAB308] transition-colors duration-300">{step.num}</span>
                  <h3 className="relative z-10 text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-white transition-colors duration-300">{step.title}</h3>
                  <p className="relative z-10 text-gray-600 font-medium leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{step.desc}</p>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#EAB308] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_0_6px_rgba(234,179,8,0.2)]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-[#121943]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <ScrollReveal direction="scale" className="relative mx-auto w-full max-w-[400px]">
              <motion.div
                className="w-full aspect-square rounded-full overflow-hidden border-8 border-[#121943] ring-[1px] ring-gray-600 shadow-2xl relative z-10 bg-white"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/ceo.png" alt="Evan S. Sherman" className="w-full h-full object-cover object-top" />
              </motion.div>
              <motion.div
                className="absolute top-12 right-0 bg-[#EAB308] text-white w-24 h-24 rounded-full flex items-center justify-center shadow-xl transform translate-x-1/3 -translate-y-1/3 border-8 border-[#121943] z-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ type: "tween", duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-6xl leading-none font-serif text-white block mt-6 rotate-180">,,</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="text-center lg:text-left space-y-6 lg:pl-12">
              <motion.div
                className="flex gap-1 text-[#EAB308] text-2xl justify-center lg:justify-start"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.span key={i} variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1, type: "spring" } } }}>★</motion.span>
                ))}
              </motion.div>
              <p className="text-2xl lg:text-3xl font-medium text-gray-300 leading-relaxed">
                We are a team of the dedicated patent professionals, united by commitment to our excellence patent protect years of collective experience acros diverse industries team of dedicated
              </p>
              <div className="pt-4">
                <h4 className="text-2xl font-bold text-white mb-1">Evan S. Sherman</h4>
                <p className="text-gray-400">CEO & Founder</p>
              </div>
              <div className="flex items-center justify-center lg:justify-end gap-4 pt-6">
                <motion.button whileHover={{ scale: 1.2, color: "#EAB308" }} className="w-10 h-10 rounded-full flex items-center justify-center text-white transition">
                  <FiChevronLeft className="text-3xl" />
                </motion.button>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400" />
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400" />
                </div>
                <motion.button whileHover={{ scale: 1.2, color: "#EAB308" }} className="w-10 h-10 rounded-full flex items-center justify-center text-white transition">
                  <FiChevronRight className="text-3xl" />
                </motion.button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPERT TEAM MEMBERS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <ScrollReveal>
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-4">OUR TEAM</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Expert Team Members</h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about" className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition-colors shadow-lg">
                  Find Out More <FiArrowRight className="ml-1" />
                </Link>
              </motion.div>
            </ScrollReveal>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {team.map((t, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 relative group overflow-hidden"
              >
                <div className="relative h-[450px] w-full bg-gray-100 overflow-hidden">
                  <motion.img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-16 h-16 bg-[#EAB308] text-white flex items-center justify-center shadow-lg z-10 rounded-tl-2xl"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  </motion.div>
                </div>
                <div className="p-8 pt-10 text-center md:text-left bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.name}</h3>
                  <span className="text-sm font-semibold text-gray-500">{t.role}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT & FAQ SPLIT
      ══════════════════════════════════════════════════════════════ */}
      <section className="flex flex-col lg:flex-row w-full max-w-[100vw] overflow-hidden">

        {/* Left: Contact Form */}
        <ScrollReveal direction="left" className="w-full lg:w-1/2 bg-[#121943] p-6 sm:p-8 lg:p-16 xl:px-24 flex flex-col justify-center">
          <div className="max-w-xl mx-auto w-full">
            <span className="inline-block text-xs font-bold text-white uppercase tracking-widest border border-dashed border-white px-4 py-2 mb-6">CONTACT US</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-10">Get A Free Quote</h2>

            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { type: "text", placeholder: "Name", required: true },
                  { type: "email", placeholder: "Email", required: true },
                  { type: "tel", placeholder: "Phone", required: false }
                ].map((field, i) => (
                  <motion.input
                    key={i}
                    variants={itemVariants}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-white focus:outline-none focus:border-[#EAB308] placeholder-gray-500 transition-colors"
                    whileFocus={{ borderColor: "#EAB308", scale: 1.01 }}
                  />
                ))}
                <motion.div variants={itemVariants} className="relative">
                  <select
                    value={quoteService}
                    onChange={(e) => setQuoteService(e.target.value)}
                    className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-gray-500 focus:outline-none focus:border-[#EAB308] appearance-none transition-colors"
                  >
                    <option value="" disabled>Select Service</option>
                    <option value="corporate">Corporate Compliance</option>
                    <option value="ip-law">Intellectual Property Law</option>
                    <option value="arbitration">Commercial Arbitration</option>
                  </select>
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </motion.div>
              </motion.div>

              <motion.textarea
                placeholder="Write a Message"
                rows={5}
                className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-white focus:outline-none focus:border-[#EAB308] placeholder-gray-500 transition-colors"
                whileFocus={{ borderColor: "#EAB308" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              />

              <motion.button
                type="submit"
                className="w-full bg-[#EAB308] hover:bg-yellow-600 text-white font-bold py-4 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Send Message
              </motion.button>

              <AnimatePresence>
                {quoteSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[#EAB308] text-sm font-bold"
                  >
                    ✓ Thank you. We will contact you shortly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </ScrollReveal>

        {/* Right: FAQ */}
        <ScrollReveal direction="right" className="w-full lg:w-1/2 bg-[#F3F4F6] p-6 sm:p-8 lg:p-16 xl:px-24 flex flex-col justify-center relative">
          <div className="max-w-xl mx-auto w-full">
            <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-6">GENERAL QUESTIONS</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Frequently Asked<br />Question.</h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-sm">We are a team of dedicated patent professional united by our commitment to excellence.</p>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 shadow-sm cursor-pointer border border-gray-100"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900 text-lg">{faq.question}</h4>
                    <motion.div animate={{ rotate: openFaq === i ? 90 : 0 }} transition={{ duration: 0.25 }}>
                      <FiChevronRight className="text-gray-400" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4 overflow-hidden"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-[#EAB308] hover:border-[#EAB308] transition bg-white"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="transform -rotate-90 text-lg font-bold">➔</span>
          </motion.button>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10">
            <ScrollReveal>
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-4">CASE STUDIES</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Explore Our Latest Case Studies</h2>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-2 relative">
                {[
                  { id: "all", name: "All" },
                  { id: "copyright", name: "Copyright" },
                  { id: "creative", name: "Creative" },
                  { id: "patent", name: "Patent" },
                  { id: "trade", name: "Trade" },
                  { id: "trademark", name: "Trademark" }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveCaseTab(tab.id as any)}
                    className={`text-sm font-bold relative pb-2 transition-colors duration-200 ${activeCaseTab === tab.id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.name}
                    {activeCaseTab === tab.id && (
                      <>
                        <motion.div layoutId="tab-underline" className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-gray-900" />
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#EAB308] text-white text-xs font-bold w-6 h-6 flex items-center justify-center shadow-md z-10">
                          3
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#EAB308] rotate-45 -z-10" />
                        </div>
                      </>
                    )}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCases.slice(0, 3).map((cs, i) => (
                <motion.div
                  key={cs.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="relative group h-[500px] overflow-hidden shadow-sm hover:shadow-lg cursor-pointer bg-gray-100"
                >
                  <motion.img
                    src={cs.image || "/case_study_1.png"}
                    alt={cs.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute bottom-0 left-0 w-[85%] bg-white p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20 flex flex-col justify-center">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">{cs.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm font-semibold">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-[#EAB308] mr-2 text-lg" xmlns="http://www.w3.org/2000/svg"><path d="M485.88 206.59L298.53 19.24a33.34 33.34 0 00-23.57-9.84H65.81a33.43 33.43 0 00-33.33 33.33v209.15a33.34 33.34 0 009.84 23.57l187.35 187.35a33.4 33.4 0 0047.14 0l179-179a33.4 33.4 0 00.08-47.21zM140.23 182.23a42 42 0 1142-42 42 42 0 01-42 42z"></path></svg>
                      <span className="capitalize">{cs.category}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-[15%] h-[112px] bg-[#EAB308] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-75 z-20">
                    <FiArrowRight className="text-white text-2xl" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LATEST BLOG ARTICLES
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white dark:bg-stone-950 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
            <ScrollReveal>
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-4">OUR BLOG</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight capitalize">
                Latest News & Articles<br />From The Blog
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/blog" className="bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition-colors shadow-lg flex items-center gap-2">
                  More Blog <FiChevronRight className="text-lg" />
                </Link>
              </motion.div>
            </ScrollReveal>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {blogPosts.slice(0, 2).map((post, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-stone-900 border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              >
                <div className="relative h-80 w-full bg-gray-100 overflow-hidden">
                  <motion.img
                    src={i === 0 ? "/our_story_team.png" : "/bg_compliance.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute bottom-0 right-10 flex flex-col translate-y-[28px] group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-[#121943] text-white text-center py-4 px-6 shadow-lg relative z-10">
                      <span className="text-4xl font-extrabold block">25</span>
                    </div>
                    <div className="bg-[#EAB308] text-white text-center py-2 px-6 text-[10px] font-bold uppercase tracking-widest relative">MAY, 2026</div>
                  </div>
                </div>
                <div className="p-8 pt-12">
                  <div className="flex items-center gap-6 mb-4 text-sm font-semibold text-gray-500">
                    <div className="flex items-center gap-2"><FiUsers className="text-[#EAB308]" /><span>admin</span></div>
                    <div className="flex items-center gap-2">
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-[#EAB308]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      <span>0 Comments</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#EAB308] transition-colors leading-snug mb-6 pr-4">{post.title}</h3>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link href="/blog" className="text-sm font-bold text-[#EAB308] hover:underline flex items-center gap-1">Read More <FiChevronRight /></Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center items-center gap-2 mt-16">
            <motion.button whileHover={{ scale: 1.2 }} className="w-8 h-8 flex items-center justify-center text-gray-900 hover:text-[#EAB308] transition">
              <FiChevronLeft className="text-2xl" />
            </motion.button>
            {[0, 1, 2].map((i) => (
              <motion.div key={i} whileHover={{ scale: 1.4 }} className={`w-2.5 h-2.5 rounded-full cursor-pointer ${i === 2 ? "bg-[#EAB308]" : "border-2 border-gray-900"}`} />
            ))}
            <motion.button whileHover={{ scale: 1.2 }} className="w-8 h-8 flex items-center justify-center text-gray-900 hover:text-[#EAB308] transition">
              <FiChevronRight className="text-2xl" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0f2b] text-white py-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 right-0 w-1/2 opacity-30 mix-blend-overlay hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src="/our_story_team.png" alt="CTA Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2b] to-transparent" />
        </motion.div>

        <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-[#EAB308]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-[#EAB308]" />

            <ScrollReveal direction="left" className="pl-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">Lets Get Started with Us.</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-500">Call Us Now!</h3>
            </ScrollReveal>

            <ScrollReveal direction="right" className="flex items-center gap-6 pr-6">
              <motion.div
                className="relative w-20 h-20 rounded-full bg-[#EAB308] flex items-center justify-center shadow-lg shadow-yellow-500/20"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full border-4 border-yellow-400"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <FiPhoneCall className="text-3xl text-white" />
              </motion.div>
              <div>
                <span className="text-sm font-semibold text-gray-300 block mb-1">Toll Free Call.</span>
                <motion.a
                  href="tel:+019489209"
                  className="text-3xl font-extrabold hover:text-[#EAB308] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  +019-489-209
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── Stat counter component ──────────────────────────────────────── */
function StatCounter({ end, label, isLast }: { end: number; label: string; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`${isLast ? "" : "border-b border-gray-100 pb-8"} relative`}
    >
      <div className="text-4xl font-bold text-[#EAB308] mb-2">
        {count} <span className="font-medium">+</span>
      </div>
      <h4 className="text-lg font-extrabold text-gray-900 mb-2">{label}</h4>
      <p className="text-sm text-gray-500">Team of dedicated patent professionals</p>
    </motion.div>
  );
}
