"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiFolder, FiUsers, FiTrendingUp, FiAward, FiArrowRight, FiShield, FiLock, FiCompass } from "react-icons/fi";
import Link from "next/link";

export default function About() {
  const [quoteService, setQuoteService] = useState("corporate");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Statistics
  const stats = [
    { value: "15+", label: "Years of Experienced", icon: FiAward },
    { value: "1,250+", label: "Total Completed Case", icon: FiFolder },
    { value: "99.4%", label: "Happy Customers", icon: FiUsers },
    { value: "98.9%", label: "Case Success Rate", icon: FiTrendingUp },
  ];

  // Services highlighted on About Page
  const services = [
    {
      title: "Corporate Compliance",
      desc: "Our team comprises seasoned patent professionals with years of experience across industries.",
      icon: FiShield
    },
    {
      title: "Intellectual Property Law",
      desc: "Comprehensive clearance audits and trademark filings to safeguard your corporate assets.",
      icon: FiLock
    },
    {
      title: "Commercial Arbitration",
      desc: "Mediation and litigation structures designed to resolve cross-border brand disputes.",
      icon: FiCompass
    }
  ];

  // Timeline
  const timeline = [
    { year: "2010", title: "Started Patent Cases", desc: "Our founding team established corporate operations, launching focused patent protection and filing workflows." },
    { year: "2013", title: "Global Expansion", desc: "Aligned practices with WIPO and international registries to execute cross-border registrations." },
    { year: "2016", title: "Clearance Automation", desc: "Integrated state-of-the-art database clearance scanning algorithms to expedite brand clearance processes." },
    { year: "2019", title: "Litigation Advisory", desc: "Formed dedicated defense teams to support clients against trademark examiner refusal notices and opposition claims." },
    { year: "2022", title: "Digital Brand Shields", desc: "Launched round-the-clock digital domain registries and corporate database monitoring parameters." },
    { year: "2025", title: "Modern IP Ecosystem", desc: "Now safeguarding over 55,000 corporate assets internationally through secure consulting structures." }
  ];

  // Team
  const team = [
    { name: "Marget M. Hason", role: "Senior Patent Analyst", initials: "MH" },
    { name: "Clara J. Winslow", role: "IP Litigation Consultant", initials: "CW" },
    { name: "Nora L. Kendrix", role: "Global Trademark Consultant", initials: "NK" }
  ];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-orange-50/60 to-white dark:from-gray-900/50 dark:to-gray-950 relative overflow-hidden border-b border-orange-100/70 dark:border-stone-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
            Home &gt; About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-6 tracking-tight leading-tight">
            About Us
          </h1>
        </div>
      </section>

      {/* Explore Our Intellectual Property Journey */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story details */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                Proven Track Record
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                Explore Our Intellectual Property Journey
              </h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                We are a team of dedicated IP professionals, united by a commitment to excellence and brand protection. With years of collective experience across diverse commercial sectors, we secure critical patent and trademark structures globally.
              </p>
              <div className="pt-4">
                <Link
                  href="/services"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-md shadow-orange-500/10 inline-block"
                >
                  Know more
                </Link>
              </div>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center p-6 bg-orange-50/40 dark:bg-stone-900/40 rounded-2xl border border-orange-100/70 dark:border-stone-900/60 hover:shadow-lg transition">
                    <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-xl mb-4">
                      <Icon />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 dark:text-stone-500 mt-2">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Highlighting Services */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-y border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Pillars of Practice
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Our Core Protections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-orange-100/70 dark:border-stone-800 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-2xl mb-6">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {s.title}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mt-4">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-orange-100/70 dark:border-stone-800 flex items-center justify-between">
                    <Link href="/services" className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
                      Know More
                    </Link>
                    <FiArrowRight className="text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="bg-gray-950 hover:bg-gray-850 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow transition inline-block"
            >
              More Services
            </Link>
          </div>
        </div>
      </section>

      {/* History Through Time Timeline */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Archives & Records
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              History Through Time
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {timeline.map((step, idx) => (
              <div key={idx} className="bg-orange-50/40 dark:bg-stone-900/40 border border-orange-100/70 dark:border-stone-900 p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <span className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 block mb-4">{step.year}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mt-4">{step.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-orange-100 dark:border-stone-800/80">
                  <Link href="/services" className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1">
                    Know Full Story <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get a Free Quote */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-y border-orange-100/70 dark:border-stone-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white dark:bg-stone-900 border border-orange-100 dark:border-stone-800 rounded-3xl p-8 md:p-12 shadow-xl relative">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-2">
                Consultation setup
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Get a Free Quote
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-3">
                We are a team of dedicated patent professionals, united by a commitment to our excellence patent protect. With years of collective experience across diverse industries, we formulate defensive intellectual property barriers.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!quoteSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleQuoteSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Select Service
                      </label>
                      <select
                        value={quoteService}
                        onChange={(e) => setQuoteService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer appearance-none shadow-inner"
                      >
                        <option value="corporate">Corporate Compliance</option>
                        <option value="ip-law">Intellectual Property Law</option>
                        <option value="arbitration">Commercial Arbitration</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-255 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
                        placeholder="Marget Winslow"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition"
                  >
                    Request Consultation
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center py-10 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FiCheck className="text-5xl text-emerald-500 mb-4 bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-full" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Consultation Request Dispatched</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">A strategy manager will correspond with you within 4 business hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Expert Team Members */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Advocates & Advisers
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight capitalize">
              expert team members
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-900 border border-orange-100/70 dark:border-gray-850 rounded-2xl p-8 text-center hover:shadow-lg transition duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md mx-auto mb-6 select-none">
                  {t.initials}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t.name}
                </h3>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mt-2">
                  {t.role}
                </span>
                <p className="text-gray-455 dark:text-gray-505 text-xs leading-relaxed mt-4">
                  Seasoned legal professional providing comprehensive support across IP litigation and global filings.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
