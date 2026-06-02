"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";
import {
  FiChevronDown, FiChevronRight, FiHome, FiShield, FiLock,
  FiCompass, FiBriefcase, FiAlertCircle, FiUsers, FiCheck
} from "react-icons/fi";
import Link from "next/link";

/* ─── easing ───────────────────────────────────────────────────────── */
const EASE = cubicBezier(0.22, 1, 0.36, 1);

/* ─── scroll-reveal wrapper ────────────────────────────────────────── */
function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
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
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >{children}</motion.div>
  );
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ─── data ─────────────────────────────────────────────────────────── */
const services = [
  { title: "Corporate Compliance",      icon: FiBriefcase,    image: "/bg_compliance.png" },
  { title: "Intellectual Property Law", icon: FiShield,       image: "/bg_ip_law.png"     },
  { title: "Commercial Arbitration",    icon: FiCompass,      image: "/bg_arbitration.png"},
  { title: "Regulatory Affairs",        icon: FiAlertCircle,  image: "/bg_regulatory.png" },
  { title: "Brand Protection",          icon: FiLock,         image: "/bg_brand.png"      },
  { title: "Employment Law Advisory",   icon: FiUsers,        image: "/bg_employment.png" },
];

const plans = [
  {
    title: "Starter Protection Plan", price: "30",
    desc: "We are a team of the dedicated patent professionals acros.",
    features: ["Patent Search","Patent Filing","Trademark Search","Trademark Filing","Copyright Registration"],
  },
  {
    title: "Safeguard Plan", price: "60",
    desc: "We are a team of the dedicated patent professionals acros.",
    features: ["Patent Search","Patent Filing","Trademark Search","Trademark Filing","Copyright Registration"],
  },
  {
    title: "Property Shield Plan", price: "90",
    desc: "We are a team of the dedicated patent professionals acros.",
    features: ["Patent Search","Patent Filing","Trademark Search","Trademark Filing","Copyright Registration"],
  },
];

const faqs = [
  { question: "Q: Can I patent an idea?",
    answer: "No, patents are granted for tangible invention processes, not abstract ideas. An idea needs to be developed into a concrete invention process to be eligible." },
  { question: "Q: Do I need to register for copyright protection?",
    answer: "No, copyright protection exists automatically the moment an original work is created and fixed in a tangible medium. However, formal registration provides public record and is legally required to file infringement lawsuits." },
  { question: "Q: What can I trademark?",
    answer: "You can trademark any word, phrase, symbol, device, or combination thereof that is used in commerce to identify and distinguish your goods or services from those of others." },
  { question: "Q: How long do trademarks last?",
    answer: "A registered trademark can theoretically last indefinitely, provided it remains in active use in commerce and you submit required maintenance and renewal filings every 10 years." },
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-72 md:h-80 bg-[#121943] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src="/our_story_team.png" alt="" className="w-full h-full object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[#121943]/65" />
        </div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-400/30 pointer-events-none"
            style={{ left: `${12 + i * 18}%`, top: `${28 + (i % 3) * 18}%` }}
            animate={{ y: [-14, 14, -14], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          />
        ))}

        {/* White triangle tab */}
        <motion.div className="absolute top-0 left-24 w-0 h-0 pointer-events-none"
          style={{ borderLeft:"20px solid transparent", borderRight:"20px solid transparent", borderTop:"26px solid white" }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-8 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >Services</motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2 text-gray-300 text-sm font-medium"
          >
            <FiHome className="text-base" />
            <Link href="/" className="hover:text-[#EAB308] transition-colors">Home</Link>
            <span className="text-gray-400">-</span>
            <span className="text-white font-bold">Services</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES GRID
          Card: image → centered bottom icon circle → title → desc → link
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
          >
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group overflow-visible"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <motion.img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Icon circle — sits on the bottom edge of the image */}
                  <div className="flex justify-center -mt-9 relative z-10">
                    <motion.div
                      className="w-[72px] h-[72px] rounded-full bg-[#121943] border-4 border-white flex items-center justify-center shadow-lg group-hover:bg-[#EAB308] transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.55 }}
                    >
                      <Icon className="text-2xl text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="px-7 pt-5 pb-8">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200 mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                      Our team comprises seasoned patent professionals with years of experience across industries.
                    </p>
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <Link
                        href="/contact"
                        className="flex items-center gap-1.5 text-sm font-bold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200"
                      >
                        Know More <FiChevronRight className="text-base" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VIDEO SECTION  +  CTA BANNER OVERLAY
      ══════════════════════════════════════════════════════════ */}
      <section className="relative">
        {/* Full-width video background */}
        <div className="relative h-[480px] md:h-[560px] overflow-hidden">
          <img
            src="/our_story_team.png"
            alt="Video background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Centered play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.button
              onClick={() => setVideoOpen(true)}
              className="relative w-24 h-24 rounded-full bg-[#EAB308] flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              {/* Pulse rings */}
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
            </motion.button>
          </div>
        </div>

        {/* CTA Banner — overlapping bottom edge */}
        <Reveal direction="up" className="max-w-[90rem] mx-auto px-4 md:px-8 -mt-16 relative z-20">
          <div className="bg-[#121943] px-10 py-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative">
            {/* Corner brackets */}
            <div className="absolute top-4 left-6 w-5 h-5 border-t-2 border-l-2 border-[#EAB308]" />
            <div className="absolute bottom-4 right-6 w-5 h-5 border-b-2 border-r-2 border-[#EAB308]" />

            <div className="pl-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Lets Get Started with Us.
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-400 leading-tight">
                Call Us Now!
              </h3>
            </div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-extrabold px-10 py-4 transition-colors whitespace-nowrap"
              >
                Know More <FiChevronRight className="text-lg" />
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRICING PLANS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">

          <Reveal className="text-center mb-16">
            <span className="inline-block text-xs font-extrabold text-[#EAB308] uppercase tracking-widest bg-yellow-50 px-5 py-2 mb-6">
              PRICING PLAN
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Explore Our Pricing Plan
            </h2>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-[#eeecec] flex flex-col overflow-hidden"
              >
                {/* Top: plan name + price + desc */}
                <div className="px-8 pt-9 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{plan.title}</h3>
                  <div className="flex items-start gap-0.5 mb-4">
                    <span className="text-sm font-bold text-[#121943] mt-1.5">$</span>
                    <span className="text-6xl font-extrabold text-[#121943] leading-none">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500 font-medium self-end mb-2 ml-1">/ Month</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{plan.desc}</p>
                </div>

                {/* Feature list — white inner card */}
                <div className="mx-4 mb-0 bg-white px-6 py-5 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feat, fi) => (
                      <motion.li
                        key={fi}
                        className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.07, duration: 0.4, ease: EASE }}
                      >
                        <span className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="text-gray-600 text-[10px] stroke-[3]" />
                        </span>
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA button */}
                <div className="mx-4 mb-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 bg-[#121943] hover:bg-[#EAB308] text-white font-bold py-4 w-full transition-colors duration-300 text-sm"
                    >
                      Get this Plan Now <FiChevronRight className="text-base" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ  —  image collage left  +  accordion right
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-[#f0eeee]">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: cool 3-image collage with floating badge + dot accents */}
            <Reveal direction="left">
              {/* Mobile: simple image */}
              <div className="block md:hidden w-full">
                <img src="/hero_businessman.png" alt="Senior IP Consultant" className="w-full h-64 object-cover object-top" />
              </div>
              {/* Desktop: full collage */}
              <div className="hidden md:block relative h-[520px] w-full select-none">

                {/* ── Dot-grid top-left decoration ── */}
                <div
                  className="absolute top-0 left-0 w-28 h-28 z-0 opacity-30"
                  style={{
                    backgroundImage: "radial-gradient(#EAB308 1.5px, transparent 1.5px)",
                    backgroundSize: "12px 12px",
                  }}
                />

                {/* ── Vertical accent bars ── */}
                <div className="absolute left-0 top-10 flex flex-col gap-1.5 z-10">
                  <div className="w-[5px] h-28 bg-[#121943] rounded-full" />
                  <div className="w-[5px] h-10 bg-[#EAB308] rounded-full" />
                </div>

                {/* ── Main tall image (left-centre) ── */}
                <motion.div
                  className="absolute left-8 top-0 w-[58%] h-[75%] overflow-hidden shadow-2xl z-10"
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.45 }}
                >
                  <img
                    src="/hero_businessman.png"
                    alt="Senior IP consultant"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle yellow bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#EAB308]/25 to-transparent" />
                </motion.div>

                {/* ── Second image — top-right, slightly tilted ── */}
                <motion.div
                  className="absolute right-0 top-6 w-[40%] h-[44%] overflow-hidden shadow-xl border-[3px] border-white z-20"
                  initial={{ opacity: 0, x: 35, rotate: 6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
                  whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.3 } }}
                >
                  <img
                    src="/team_1.png"
                    alt="Legal team member"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>

                {/* ── Third image — bottom-right ── */}
                <motion.div
                  className="absolute right-2 bottom-0 w-[44%] h-[42%] overflow-hidden shadow-xl border-[3px] border-white z-20"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                >
                  <img
                    src="/case_study_2.png"
                    alt="Case study"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* ── Floating stat badge ── */}
                <motion.div
                  className="absolute bottom-6 left-2 bg-[#EAB308] text-white px-6 py-5 shadow-2xl z-30"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                >
                  <div className="text-4xl font-extrabold leading-none tracking-tight">10+</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mt-1 leading-tight">
                    Years of<br />Experience
                  </div>
                </motion.div>

                {/* ── Dot-grid bottom-right decoration ── */}
                <div
                  className="absolute bottom-0 right-0 w-20 h-20 z-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(#121943 1.5px, transparent 1.5px)",
                    backgroundSize: "10px 10px",
                  }}
                />

                {/* ── Thin yellow border accent (bottom of main image) ── */}
                <motion.div
                  className="absolute left-8 z-10 h-[3px] bg-[#EAB308]"
                  style={{ top: "75%", width: "58%" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                />
              </div>
            </Reveal>

            {/* Right: heading + accordion */}
            <Reveal direction="right" delay={0.1} className="lg:pt-4">
              <span className="inline-block text-xs font-extrabold text-[#EAB308] uppercase tracking-widest bg-yellow-50 px-5 py-2 mb-6">
                GENERAL QUESTIONS
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-10">
                Frequently Asked Question.
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    className="bg-white border border-gray-200 overflow-hidden cursor-pointer"
                    layout
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="flex items-center justify-between px-6 py-5">
                      <span className="font-bold text-gray-900 text-base pr-4">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex-shrink-0 text-gray-500"
                      >
                        <FiChevronDown className="text-xl" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                        >
                          <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── YOUTUBE VIDEO MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setVideoOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative w-full max-w-4xl z-10"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ aspectRatio: "16/9" }}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-bold flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close (Esc)
              </button>
              <iframe
                src="https://www.youtube.com/embed/YS3PwmOQ1Fc?autoplay=1&rel=0&modestbranding=1&color=white"
                title="Intel Trademark Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
