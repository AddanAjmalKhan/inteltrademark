"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, cubicBezier } from "framer-motion";
import { FiMail, FiSend, FiArrowUp } from "react-icons/fi";
import { IntelTrademarkLogo } from "./Logo";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

function FooterReveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const galleryImages = [
  "/our_story_team.png",
  "/bg_compliance.png",
  "/case_study_1.png",
  "/team_1.png",
  "/case_study_2.png",
  "/ceo.png",
];

const expertiseLinks = [
  "Utility Patents", "Business Litigation", "Design Patent",
  "IP Translations", "Brand Protection", "Trade Secrets",
  "Trade License", "Enforcement",
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Practice Area", href: "/services" },
  { label: "Cases", href: "/services" },
  { label: "News", href: "/blog" },
  { label: "Contacts", href: "/contact" },
  { label: "Career", href: "/about" },
  { label: "Feedback", href: "/contact" },
  { label: "Faq", href: "/faq" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f2b] text-white pt-20 pb-8 relative border-t border-[#121943] overflow-x-hidden">
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* ── Column 1: Brand & Newsletter ────────── */}
          <FooterReveal delay={0}>
            <div className="space-y-7">
              {/* Logo */}
              <IntelTrademarkLogo variant="dark" />

              <p className="text-gray-400 leading-relaxed text-sm">
                Our team do comprises professional with experience.
              </p>

              {/* Email subscribe */}
              <form
                className="flex w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="bg-white text-gray-900 px-4 py-3.5 w-full focus:outline-none placeholder-gray-400 text-sm font-medium"
                />
                <motion.button
                  type="submit"
                  className="bg-[#EAB308] text-white px-5 py-3.5 hover:bg-yellow-600 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <FiSend className="text-lg" />
                </motion.button>
              </form>

              {/* Email address */}
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <FiMail className="text-[#EAB308] text-xl flex-shrink-0" />
                <a
                  href="mailto:legal@globaltrademarkoffice.com"
                  className="hover:text-[#EAB308] transition-colors text-sm font-medium"
                >
                  legal@globaltrademarkoffice.com
                </a>
              </motion.div>
            </div>
          </FooterReveal>

          {/* ── Column 2: Expertise ──────────────────── */}
          <FooterReveal delay={0.1}>
            <h3 className="text-white font-extrabold text-xl mb-7">Expertise</h3>
            <ul className="space-y-3.5">
              {expertiseLinks.map((item) => (
                <li key={item}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-[#EAB308] transition-colors text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#EAB308] transition-colors flex-shrink-0" />
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </FooterReveal>

          {/* ── Column 3: Quick Links ────────────────── */}
          <FooterReveal delay={0.2}>
            <h3 className="text-white font-extrabold text-xl mb-7">Quick Links</h3>
            <ul className="space-y-3.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={href}
                      className="text-gray-400 hover:text-[#EAB308] transition-colors text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#EAB308] transition-colors flex-shrink-0" />
                      {label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </FooterReveal>

          {/* ── Column 4: Gallery ───────────────────── */}
          <FooterReveal delay={0.3}>
            <h3 className="text-white font-extrabold text-xl mb-7">Gallery</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </FooterReveal>

        </div>

        {/* ── Copyright bar ─────────────────────────── */}
        <div className="border-t border-[#1a2352] pt-7 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium">
          <p>
            Copyright © {currentYear}{" "}
            <span className="text-[#EAB308] font-bold">Intel Trademark</span>{" "}
            — All Rights Reserved
          </p>
        </div>
      </div>

      {/* ── Back to top ───────────────────────────── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-8 right-8 w-11 h-11 rounded-full border-2 border-[#EAB308] flex items-center justify-center text-[#EAB308] hover:bg-[#EAB308] hover:text-white transition-colors"
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FiArrowUp className="text-lg" />
      </motion.button>
    </footer>
  );
}
