"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";
import { FiHome, FiChevronRight, FiChevronDown, FiPhone, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

/* ── Scroll reveal wrapper ────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right"; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial =
    direction === "left"  ? { opacity: 0, x: -50 } :
    direction === "right" ? { opacity: 0, x:  50 } :
                            { opacity: 0, y:  40 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── FAQ data ─────────────────────────────────────────────── */
const categories = [
  { id: "all",     label: "All Questions" },
  { id: "general", label: "General IP Info" },
  { id: "filing",  label: "Filing & Processes" },
];

const faqItems = [
  {
    category: "general",
    question: "What is Intellectual Property (IP)?",
    answer:
      "Intellectual Property refers to creations of the mind — inventions, literary and artistic works, symbols, names, and images used in commerce. IP is protected by law through patents, copyright, trademarks, and trade secrets, enabling people to earn recognition and financial benefit from their innovations.",
  },
  {
    category: "general",
    question: "What can I trademark?",
    answer:
      "You can trademark any word, phrase, symbol, device, or combination thereof used in commerce to identify and distinguish your goods or services. This includes brand names, product logos, slogans, and even distinctive color combinations or sounds that serve as brand identifiers.",
  },
  {
    category: "general",
    question: "How long do trademarks last?",
    answer:
      "A registered trademark can theoretically last indefinitely, provided it remains in active use in commerce and you submit required maintenance and renewal filings — between the 5th–6th years, 9th–10th years, and every 10 years thereafter. Failure to file on time can result in cancellation.",
  },
  {
    category: "filing",
    question: "Can I patent an idea?",
    answer:
      "No — patents are granted for tangible inventions or processes, not abstract ideas. An idea must be fully developed into a concrete, novel, and non-obvious invention to be eligible for formal patent registration. Our attorneys can evaluate your concept and guide you through the development process.",
  },
  {
    category: "filing",
    question: "Do I need to register for copyright protection?",
    answer:
      "Copyright protection exists automatically the moment an original work is created and fixed in a tangible medium. However, formal registration with national authorities is strongly recommended — it provides a public record, is required to file infringement lawsuits, and allows recovery of statutory damages.",
  },
  {
    category: "filing",
    question: "What is the Madrid Protocol for trademarks?",
    answer:
      "The Madrid Protocol is an international treaty that allows brand owners to secure trademark protection in 120+ countries through a single unified application filed with WIPO. It dramatically simplifies global trademark filings and reduces administrative costs and effort compared to filing separately in each country.",
  },
  {
    category: "general",
    question: "What are IP Translations?",
    answer:
      "Our IP translation service comprises seasoned professionals with years of experience in legal localization. We ensure your patent specifications, trademark descriptions, and IP agreements are accurately translated and fully compliant with local regulatory requirements across non-English speaking jurisdictions.",
  },
];

/* ── Single accordion item ────────────────────────────────── */
function AccordionItem({
  item, index, isOpen, onToggle,
}: {
  item: (typeof faqItems)[0]; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.07 }}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-[#EAB308]/50 shadow-md shadow-[#EAB308]/10"
          : "border-gray-200 hover:border-[#EAB308]/30 hover:shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group focus:outline-none"
      >
        {/* Number + question */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className={`text-[11px] font-black tracking-widest flex-shrink-0 transition-colors duration-200 ${
            isOpen ? "text-[#EAB308]" : "text-gray-400 group-hover:text-[#EAB308]"
          }`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`font-bold text-[15px] md:text-[16px] leading-snug transition-colors duration-200 ${
            isOpen ? "text-[#121943]" : "text-gray-800 group-hover:text-[#121943]"
          }`}>
            {item.question}
          </span>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            isOpen
              ? "bg-[#EAB308] border-[#EAB308] text-white"
              : "border-gray-200 text-gray-400 group-hover:border-[#EAB308]/50 group-hover:text-[#EAB308]"
          }`}
        >
          <FiChevronDown className="text-sm" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <div className="px-6 pb-6 pt-0">
              {/* Yellow left-border accent */}
              <div className="pl-5 border-l-2 border-[#EAB308]/40 ml-[38px]">
                <p className="text-gray-600 text-[14.5px] leading-[1.85]">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function FAQ() {
  const [activeTab, setActiveTab] = useState<"all" | "general" | "filing">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqItems.filter(
    (item) => activeTab === "all" || item.category === activeTab,
  );

  return (
    <div className="bg-white">

      {/* ════════════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════════════ */}
      <section className="relative h-72 md:h-80 bg-[#121943] flex items-center overflow-hidden pt-16">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="/our_story_team.png"
            alt=""
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#121943]/70" />
        </div>

        {/* White triangle tab */}
        <motion.div
          className="absolute top-0 left-24 w-0 h-0 pointer-events-none"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: "26px solid white",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#EAB308]/50 pointer-events-none"
            style={{ left: `${12 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-12, 12, -12], opacity: [0.2, 0.6, 0.2] }}
            transition={{ type: "tween", duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-8 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            FAQ
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2 text-gray-300 text-sm font-medium"
          >
            <FiHome className="text-gray-300" />
            <Link href="/" className="hover:text-[#EAB308] transition-colors">Home</Link>
            <FiChevronRight className="text-gray-500 text-xs" />
            <span className="text-white font-bold">FAQ</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INTRO + CATEGORY TABS
      ════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[#EAB308] text-xs font-black uppercase tracking-[0.22em] mb-5">
              <span className="w-6 h-[2px] bg-[#EAB308] rounded-full" />
              Common Questions
              <span className="w-6 h-[2px] bg-[#EAB308] rounded-full" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#121943] tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto mb-10">
              Have questions about patents, trademarks, or copyright law?
              Browse our expert answers below or{" "}
              <Link href="/contact" className="text-[#EAB308] font-semibold hover:underline">contact us</Link>{" "}
              for personalised advice.
            </p>
          </Reveal>

          {/* Category tabs */}
          <Reveal delay={0.15}>
            <div className="inline-flex flex-wrap items-center justify-center bg-gray-100 rounded-full p-1 gap-1">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => { setActiveTab(cat.id as any); setOpenIndex(null); }}
                  className={`relative px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors duration-200 ${
                    activeTab === cat.id ? "text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {activeTab === cat.id && (
                    <motion.span
                      layoutId="faq-tab"
                      className="absolute inset-0 bg-[#121943] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ACCORDION LIST
      ════════════════════════════════════════════ */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-3"
            >
              {filtered.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STILL HAVE QUESTIONS — CTA
      ════════════════════════════════════════════ */}
      <section className="py-20 bg-[#121943] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#EAB308]/[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-blue-600/[0.07] blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            opacity: 0.03,
          }}
        />

        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#EAB308]/40 pointer-events-none"
            style={{ width: 4, height: 4, left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 50}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
            transition={{ type: "tween", duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <Reveal>
            <p className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.25em] mb-4">
              Still have questions?
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Protect Your Intellectual
              <br />
              <span className="text-[#EAB308]">Property Today</span>
            </h2>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-xl mx-auto mb-10">
              Need custom service classifications? Connect with our senior consultants.
              We will formulate a comprehensive brand protection strategy tailored to your requirements.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#EAB308] hover:bg-yellow-400 text-white font-bold px-8 py-4 text-[14px] tracking-wide transition-colors shadow-xl shadow-yellow-500/20"
                >
                  Get Free Consultation
                  <FiArrowRight />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2.5 border border-white/25 text-white font-bold px-8 py-4 text-[14px] tracking-wide hover:bg-white/10 transition-colors"
                >
                  View Our Services
                  <FiChevronRight />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
