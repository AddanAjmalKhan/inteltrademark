"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShield, FiAward, FiUsers, FiTrendingUp, FiActivity, FiArrowRight, 
  FiBriefcase, FiCompass, FiAlertCircle, FiCheck, FiFolder, FiLock,
  FiPlayCircle, FiPhoneCall, FiMail, FiMapPin
} from "react-icons/fi";
import Link from "next/link";
import TrademarkSearch from "./components/TrademarkSearch";
import FAQAccordion from "./components/FAQAccordion";

export default function Home() {
  const [activeCaseTab, setActiveCaseTab] = useState<"all" | "copyright" | "patent" | "trademark">("all");
  const [quoteService, setQuoteService] = useState("corporate");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Statistics
  const stats = [
    { value: "1,250+", label: "Completed Cases", icon: FiFolder },
    { value: "99.4%", label: "Happy Customers", icon: FiUsers },
    { value: "98.9%", label: "Case Success Rate", icon: FiTrendingUp },
  ];

  // Reasons to Choose Us
  const reasons = [
    {
      title: "Corporate Compliance",
      desc: "Our team comprises seasoned patent professionals with years of experience across diverse commercial sectors.",
      icon: FiShield
    },
    {
      title: "Intellectual Property Law",
      desc: "We deliver extensive courtroom experience and defensive registration models to secure trademark rights.",
      icon: FiLock
    },
    {
      title: "Commercial Arbitration",
      desc: "Resolving complex cross-border ownership conflicts through professional legal strategy and mediation.",
      icon: FiCompass
    }
  ];

  // Practice Areas / Creative Legal Protections
  const protections = [
    { title: "Corporate Compliance", link: "/services" },
    { title: "Intellectual Property Law", link: "/services" },
    { title: "Commercial Arbitration", link: "/services" },
    { title: "Regulatory Affairs", link: "/services" },
    { title: "Brand Protection", link: "/services" },
    { title: "Employment Law Advisory", link: "/services" }
  ];

  // Acquisition Process
  const processSteps = [
    { num: "01", title: "Content Creation", desc: "Formulating initial brand classifications and trademark descriptions." },
    { num: "02", title: "Registration", desc: "Submitting formal documentation to national and global patent registries." },
    { num: "03", title: "Monitoring", desc: "Continuous 24/7 scanning of state filings, domain registries, and corporate records." },
    { num: "04", title: "Licensing", desc: "Wired strategies to commercialize, monetize, and franchise your approved trademarks." }
  ];

  // Team
  const team = [
    { name: "Marget M. Hason", role: "Senior Patent Analyst", initials: "MH" },
    { name: "Clara J. Winslow", role: "IP Litigation Consultant", initials: "CW" },
    { name: "Nora L. Kendrix", role: "Global Trademark Consultant", initials: "NK" }
  ];

  // Case Studies
  const caseStudies = [
    { title: "Unveiling Innovation", category: "patent" },
    { title: "Innovative Narratives", category: "copyright" },
    { title: "Global Recognition", category: "trademark" },
    { title: "Branding Brilliance", category: "trademark" },
    { title: "Worldwide IP Protection", category: "patent" },
    { title: "Creative Shields", category: "copyright" },
    { title: "Trademark Triumphs", category: "trademark" },
    { title: "Cross-Border Litigation", category: "patent" }
  ];

  const filteredCases = caseStudies.filter(
    (cs) => activeCaseTab === "all" || cs.category === activeCaseTab
  );

  // FAQs
  const faqs = [
    {
      question: "IP Translations",
      answer: "Our team comprises seasoned professionals with years of experience across language localization. We ensure your patent and trademark descriptions are perfectly translated and fully compliant with local state requirements across non-English speaking jurisdictions."
    },
    {
      question: "How long does copyright registration last?",
      answer: "Generally, copyright protection lasts for the lifetime of the creator plus an additional 70 years after their passing. For anonymous works or corporate creations, it spans 95 years from publication or 120 years from creation."
    },
    {
      question: "What is the Madrid Protocol for trademarks?",
      answer: "The Madrid Protocol is an international treaty that allows a brand owner to secure trademark protection in up to 120+ countries by filing a single unified application through WIPO, simplifying global filings and cutting down administrative costs."
    }
  ];

  // Blog posts
  const blogPosts = [
    {
      title: "Patent War: Iconic Legal Battles That Shaped Modern Innovation",
      excerpt: "Analyze historical courtroom clashes that established critical design patent boundaries and changed technological development paths.",
      date: "May 22, 2026",
      readTime: "8 min read"
    },
    {
      title: "Code Clash: The Algorithms That Sparked Courtroom Chaos",
      excerpt: "Are programming codes copyrightable or patentable? We explore recent courtroom rulings and the legal limits of algorithmic protections.",
      date: "May 09, 2026",
      readTime: "6 min read"
    },
    {
      title: "Design Duel: Icons, Interfaces, and Intellectual Property",
      excerpt: "Safeguard your application UI design. Discover the legal frameworks protecting graphics, layouts, and user experiences.",
      date: "Apr 25, 2026",
      readTime: "5 min read"
    }
  ];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-orange-50/60 to-white dark:from-gray-900/50 dark:to-gray-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <FiActivity className="animate-pulse" /> Verified Global Office
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
            >
              Unveiling Patents,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-indigo-400">
                Trademarks & Copyrights
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-stone-600 dark:text-stone-300 leading-relaxed"
            >
              Protecting corporate assets, commercial workflows, and brand systems. We combine high-speed digital scans with rigorous legal clearances.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/services"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold px-8 py-4 rounded-2xl transition transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                Find Out More <FiArrowRight />
              </Link>
              <a
                href="https://www.youtube.com/watch?v=YS3PwmOQ1Fc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-stone-900 text-gray-900 dark:text-white border border-gray-200 dark:border-stone-800 hover:bg-orange-50/40 dark:hover:bg-gray-800 font-bold px-8 py-4 rounded-2xl transition transform hover:-translate-y-0.5 shadow-sm flex items-center gap-2"
              >
                <FiPlayCircle className="text-xl text-orange-600" /> Watch Strategy Video
              </a>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-600 opacity-20 blur-xl" />
            <div className="relative bg-white dark:bg-stone-900 border border-orange-100 dark:border-gray-850 p-6 md:p-8 rounded-3xl shadow-xl">
              <span className="text-xs font-bold text-gray-400 block mb-2 uppercase">Reference Registry</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Official Verification</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-6">
                Fill in your proposed commercial asset name to check general registry availability estimate instantly.
              </p>
              <TrademarkSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Reasons to Choose Us */}
      <section className="py-20 bg-white dark:bg-stone-950 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Strategic Assets
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Reasons to Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="p-8 bg-orange-50/40 dark:bg-stone-900/40 rounded-2xl border border-orange-100/70 dark:border-stone-900 hover:shadow-lg transition duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-2xl mb-6">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {r.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mt-4">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story in IP */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-y border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                Enterprise Shield
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Our Story in Intellectual Property
              </h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                As a team of dedicated IP professionals, we are united by a firm commitment to excellence and brand protection. We deliver structural security to ensure commercial ideas stay entirely yours.
              </p>
              
              <ul className="space-y-3.5 pt-2">
                {[
                  "Expertise in Patent Protection",
                  "Commitment to Excellence",
                  "Collaborative Partnership"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FiCheck className="text-emerald-500 text-lg flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-sm inline-block"
                >
                  Find Out More
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center p-6 bg-white dark:bg-stone-900 rounded-2xl border border-orange-100/70 dark:border-stone-800/80 shadow-sm hover:shadow-md transition">
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

      {/* Explore Creative Legal Protections */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Comprehensive Shield
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Explore Creative Legal Protections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protections.map((p, i) => (
              <div
                key={i}
                className="bg-white dark:bg-stone-900 border border-orange-100/70 dark:border-stone-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/30 transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
                    {p.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-4">
                    Seasoned legal representation protecting your commercial operations, employee advisory parameters, and digital trademarks.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-orange-100/70 dark:border-stone-800 flex items-center justify-between">
                  <Link href={p.link} className="text-sm font-bold text-orange-650 dark:text-orange-400 hover:underline">
                    Know More
                  </Link>
                  <FiArrowRight className="text-gray-400 group-hover:translate-x-1 transition duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patent Acquisition Process */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Acquisition cycle
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Our Trademark Acquisition Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-orange-100/70 dark:border-gray-850 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <span className="text-orange-600 dark:text-orange-400 font-extrabold text-2xl tracking-widest block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mt-3">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
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
              Expert team members
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
                <p className="text-gray-400 dark:text-stone-500 text-xs leading-relaxed mt-4">
                  Seasoned legal professional providing comprehensive support across IP litigation and global filings.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get a Free Quote Form */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-y border-orange-100/70 dark:border-stone-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white dark:bg-stone-900 border border-orange-100 dark:border-stone-800 rounded-3xl p-8 md:p-12 shadow-xl relative">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-2">
                Quick consultation
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Get a Free Quote
              </h2>
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
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
                  <h4 className="text-xl font-bold text-gray-905 dark:text-white">Consultation Request Dispatched</h4>
                  <p className="text-sm text-gray-450 dark:text-stone-400 mt-2">A strategy manager will correspond with you within 4 business hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Success Archives
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight capitalize">
              Explore Our Latest Case Studies
            </h2>

            {/* Filter Tabs */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                { id: "all", name: "All" },
                { id: "copyright", name: "Copyright" },
                { id: "patent", name: "Patent" },
                { id: "trademark", name: "Trademark" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCaseTab(tab.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                    activeCaseTab === tab.id
                      ? "bg-orange-600 text-white shadow-md shadow-orange-500/25"
                      : "bg-white dark:bg-stone-900 text-gray-650 dark:text-stone-300 border border-gray-250 dark:border-stone-800 hover:bg-orange-50/40 dark:hover:bg-gray-850"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((cs, i) => (
                <motion.div
                  key={cs.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-stone-900 border border-orange-100/70 dark:border-gray-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <span className="text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                    {cs.title}
                  </h3>
                  <Link href="/services" className="text-xs font-bold text-gray-400 dark:text-stone-500 hover:text-orange-600 transition flex items-center gap-1">
                    Read Story <FiArrowRight />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Legal overview
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight capitalize">
              Frequently Asked Question.
            </h2>
          </div>

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Latest Blog Articles */}
      <section className="py-24 bg-white dark:bg-stone-950 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
            <div>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
                Knowledge Hub
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight capitalize">
                Latest News & Articles From the Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="bg-gray-950 hover:bg-gray-850 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition transform hover:-translate-y-0.5 shadow flex items-center gap-1.5"
            >
              More Blog <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white dark:bg-stone-900 border border-orange-100/70 dark:border-gray-850 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500/25 transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-gray-400 block mb-3">{post.date}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mt-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-orange-100/70 dark:border-stone-800 flex items-center justify-between">
                  <Link href="/blog" className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline">
                    Read More
                  </Link>
                  <FiArrowRight className="text-gray-400 group-hover:translate-x-1 transition duration-250" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Bar & Quick contact */}
      <section className="py-12 bg-gray-950 text-white border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <FiMapPin className="text-orange-400 text-2xl" />
            <div>
              <span className="text-xs font-bold text-gray-450 block uppercase">Location</span>
              <a href="https://globaltrademarkoffice.com/" className="text-sm font-semibold hover:underline">
                819 S GREVILLEA AVE INGLEWOOD CA 90301-0303 USA
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <FiPhoneCall className="text-orange-400 text-2xl" />
            <div>
              <span className="text-xs font-bold text-gray-450 block uppercase">Call Us</span>
              <a href="tel:+12095840601" className="text-sm font-bold hover:underline">
                + (209)-584-0601
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <FiMail className="text-orange-400 text-2xl" />
            <div>
              <span className="text-xs font-bold text-gray-450 block uppercase">Email Us</span>
              <a href="mailto:legal@globaltrademarkoffice.com" className="text-sm font-semibold hover:underline">
                legal@globaltrademarkoffice.com
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
