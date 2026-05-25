"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShield, FiAward, FiUsers, FiTrendingUp, FiActivity, FiArrowRight, 
  FiBriefcase, FiCompass, FiAlertCircle, FiCheck, FiFolder, FiLock,
  FiPlayCircle, FiPhoneCall, FiMail, FiMapPin, FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import Link from "next/link";
import TrademarkSearch from "./components/TrademarkSearch";
import FAQAccordion from "./components/FAQAccordion";

export default function Home() {
  const [activeCaseTab, setActiveCaseTab] = useState<"all" | "copyright" | "patent" | "trademark">("all");
  const [quoteService, setQuoteService] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);

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
    { num: "01", title: "Corporate Compliance", link: "/services", icon: FiBriefcase, image: "/bg_compliance.png" },
    { num: "02", title: "Intellectual Property Law", link: "/services", icon: FiShield, image: "/bg_ip_law.png" },
    { num: "03", title: "Commercial Arbitration", link: "/services", icon: FiCompass, image: "/bg_arbitration.png" },
    { num: "04", title: "Regulatory Affairs", link: "/services", icon: FiAlertCircle, image: "/bg_regulatory.png" },
    { num: "05", title: "Brand Protection", link: "/services", icon: FiLock, image: "/bg_brand.png" },
    { num: "06", title: "Employment Law Advisory", link: "/services", icon: FiFolder, image: "/bg_employment.png" }
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
    { name: "Marget M. Hason", role: "Senior Patent Analyst", image: "/team_1.png" },
    { name: "Clara J. Winslow", role: "IP Litigation Consultant", image: "/team_2.png" },
    { name: "Nora L. Kendrix", role: "Global Trademark Consultant", image: "/team_3.png" }
  ];

  // Case Studies
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
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#121943] flex items-center pt-16">
        {/* Background diagonal stripes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] right-[10%] w-[50%] h-[150%] bg-blue-900/20 transform rotate-[15deg]"></div>
          <div className="absolute -top-[10%] right-[30%] w-[20%] h-[130%] bg-blue-800/10 transform rotate-[15deg]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          <div className="z-20 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
            >
              <span className="text-gray-400 font-semibold">Unveiling Patents, </span>
              <span className="text-white font-bold block xl:inline">Trademarks & Copyrights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-gray-300"
            >
              Unveiling Patents, Trademarks & Copyrights
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-sm transition shadow-lg shadow-yellow-500/20"
              >
                Find Out More <FiArrowRight className="ml-1" />
              </Link>
            </motion.div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] md:h-[650px] w-full flex justify-center lg:justify-end items-end">
            <img src="/hero.png" alt="Hero Image" className="absolute bottom-0 right-0 h-full w-auto object-contain object-bottom drop-shadow-2xl z-10" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <a href="https://www.youtube.com/watch?v=YS3PwmOQ1Fc" target="_blank" rel="noopener noreferrer" className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition transform">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1 sm:ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4l12 6-12 6V4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons to Choose Us */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-yellow-500 uppercase tracking-widest border border-dashed border-yellow-500 px-6 py-2 mb-6">
              WHY CHOSE US
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Reason To Chose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div 
                  key={i} 
                  className="group relative p-10 bg-white hover:bg-[#121943] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col items-center text-center cursor-default"
                  style={{
                    clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)"
                  }}
                >
                  {/* Subtle top glow on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  <div className="relative w-24 h-24 flex items-center justify-center rounded-full border border-dashed border-yellow-500 group-hover:border-yellow-500 group-hover:bg-yellow-500 transition-colors duration-300 mb-8 z-10">
                    <Icon className="text-4xl text-yellow-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300 z-10">
                    {r.title}
                  </h3>
                  
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed transition-colors duration-300 z-10 px-2">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Our Story in IP */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="lg:col-span-5 space-y-6 lg:pr-4">
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2">
                ABOUT US
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Our Story In Intellectual Property
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm pt-2">
                We are a team of the dedicated patent professionals, united by our commitment toour excellence patent protection. With years of collective experience acros diverse industries team of this dedicated patent professionals, united by our
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Expertise in Patent Protection",
                  "Commitment to Excellence",
                  "Collaborative Partnership"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-sm font-bold text-gray-900">
                    <div className="w-5 h-5 rounded-full bg-[#121943] flex flex-shrink-0 items-center justify-center">
                      <FiCheck className="text-white text-xs stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition"
                >
                  Find Out More <FiArrowRight className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Middle Column - Image */}
            <div className="lg:col-span-4 relative h-[500px] lg:h-[600px] mt-8 lg:mt-0">
              <img src="/our_story_team.png" alt="Our Story Team" className="w-full h-full object-cover" />
              
              {/* Overlapping dark blue box */}
              <div className="absolute -bottom-6 -left-6 bg-[#121943] text-white p-8 w-64 shadow-xl z-10 hidden sm:block">
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#EAB308]"></div>
                <div className="text-5xl font-bold mb-2">10 <span className="font-medium">+</span></div>
                <div className="text-sm text-blue-200">Years of Experiences</div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-10 lg:pl-10 mt-12 lg:mt-0">
              <div className="border-b border-gray-100 pb-8 relative">
                 <div className="text-4xl font-bold text-[#EAB308] mb-2">980 <span className="font-medium">+</span></div>
                 <h4 className="text-lg font-extrabold text-gray-900 mb-2">Total Completed Case</h4>
                 <p className="text-sm text-gray-500">Team of dedicated patent professionals</p>
              </div>
              
              <div className="border-b border-gray-100 pb-8 relative">
                 <div className="text-4xl font-bold text-[#EAB308] mb-2">820 <span className="font-medium">+</span></div>
                 <h4 className="text-lg font-extrabold text-gray-900 mb-2">Happy Customers</h4>
                 <p className="text-sm text-gray-500">Team of dedicated patent professionals</p>
              </div>

              <div className="relative">
                 <div className="text-4xl font-bold text-[#EAB308] mb-2">760 <span className="font-medium">+</span></div>
                 <h4 className="text-lg font-extrabold text-gray-900 mb-2">Case Success Rate</h4>
                 <p className="text-sm text-gray-500">Team of dedicated patent professionals</p>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Explore Creative Legal Protections */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-[#121943]"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-white uppercase tracking-widest border border-dashed border-white px-6 py-2 mb-6">
              PRACTICE AREA
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore Creative Legal <br className="hidden md:block"/>
              <span className="text-gray-400">Protections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protections.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-[#1A2254] p-10 shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
                >
                  {/* Hover Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none mix-blend-luminosity z-0"
                    style={{ backgroundImage: `url(${p.image})` }}
                  ></div>

                  {/* Background Large Number */}
                  <div 
                    className="absolute top-6 left-6 text-7xl font-bold opacity-10 pointer-events-none transition-all duration-300 group-hover:opacity-20 z-10"
                    style={{ WebkitTextStroke: '2px #ffffff', color: 'transparent' }}
                  >
                    {p.num}
                  </div>

                  {/* Top Right Icon Circle */}
                  <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-[#121943] group-hover:bg-[#EAB308] flex items-center justify-center transition-colors duration-300 z-10">
                    <Icon className="text-2xl text-white" />
                  </div>

                  <div className="pt-24 relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Our team comprises seasoned patent professionals with years of experience across industries.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#2A346C] flex items-center justify-between relative z-10">
                    <Icon className="text-gray-400 group-hover:text-[#EAB308] text-xl transition-colors duration-300" />
                    <Link href={p.link} className="text-sm font-bold text-white border-b border-transparent group-hover:border-[#EAB308] pb-1 transition-colors duration-300">
                      Know More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
             <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition"
             >
                Find Out More <FiArrowRight className="ml-1" />
             </Link>
          </div>
        </div>
      </motion.section>

      {/* Patent Acquisition Process */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-[#f6f5f2]"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-6 bg-white">
              HOW ITS WORK
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Our Patent Acquisition<br />Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
            {[
              { num: "01", title: "Content Creation", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiUsers },
              { num: "02", title: "Registration", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiFolder },
              { num: "03", title: "Monitoring", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiActivity },
              { num: "04", title: "Licensing", desc: "Our teams do so comprises seasoned professional with experience.", icon: FiBriefcase }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer mt-10 lg:mt-0 relative">
                {/* Circle Icon */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#EAB308] bg-white flex items-center justify-center mb-10 relative z-10 transition-colors duration-300 group-hover:bg-[#EAB308]">
                  <step.icon className="text-4xl text-[#EAB308] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Card */}
                <div className="relative w-full bg-white p-10 pt-12 text-left shadow-sm group-hover:bg-[#121943] transition-colors duration-300 h-full flex flex-col mt-4">
                  {/* Upward pointing arrow */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 transform group-hover:bg-[#121943] transition-colors duration-300 z-0"></div>
                  
                  <span className="relative z-10 text-gray-500 font-extrabold text-lg mb-4 block group-hover:text-[#EAB308] transition-colors duration-300">
                    {step.num}
                  </span>
                  <h3 className="relative z-10 text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-gray-600 font-medium leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.desc}
                  </p>
                  
                  {/* Small Yellow dot on hover like image 2 */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#EAB308] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_0_6px_rgba(234,179,8,0.2)]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonial */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-[#121943]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="relative mx-auto w-full max-w-[400px]">
              <div className="w-full aspect-square rounded-full overflow-hidden border-8 border-[#121943] ring-[1px] ring-gray-600 shadow-2xl relative z-10 bg-white">
                <img src="/ceo.png" alt="Evan S. Sherman" className="w-full h-full object-cover object-top" />
              </div>
              {/* Quote Icon */}
              <div className="absolute top-12 right-0 bg-[#EAB308] text-white w-24 h-24 rounded-full flex items-center justify-center shadow-xl transform translate-x-1/3 -translate-y-1/3 border-8 border-[#121943] z-20">
                <span className="text-6xl leading-none font-serif text-white block mt-6 rotate-180">,,</span>
              </div>
            </div>

            {/* Right Text */}
            <div className="text-center lg:text-left space-y-6 lg:pl-12">
              <div className="flex gap-1 text-[#EAB308] text-2xl justify-center lg:justify-start">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-2xl lg:text-3xl font-medium text-gray-300 leading-relaxed">
                We are a team of the dedicated patent professionals, united by commitment toour excellence patent protect years of collective experience acros diverse industries team of dedicated
              </p>
              <div className="pt-4">
                <h4 className="text-2xl font-bold text-white mb-1">Evan S. Sherman</h4>
                <p className="text-gray-400">CEO & Founder</p>
              </div>
              
              {/* Carousel Controls */}
              <div className="flex items-center justify-center lg:justify-end gap-4 pt-6">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#EAB308] transition">
                  <FiChevronLeft className="text-3xl" />
                </button>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></div>
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400"></div>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#EAB308] transition">
                  <FiChevronRight className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Expert Team Members */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-4">
                OUR TEAM
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Expert Team Members
              </h2>
            </div>
            <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition shadow-lg"
             >
                Find Out More <FiArrowRight className="ml-1" />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 relative group overflow-hidden">
                <div className="relative h-[450px] w-full bg-gray-100 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#EAB308] text-white flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300 z-10 rounded-tl-2xl">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  </div>
                </div>
                <div className="p-8 pt-10 text-center md:text-left bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.name}
                  </h3>
                  <span className="text-sm font-semibold text-gray-500">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact & FAQ Split Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row w-full max-w-[100vw] overflow-hidden"
      >
        {/* Left Side: Contact Form */}
        <div className="w-full lg:w-1/2 bg-[#121943] p-8 lg:p-24 xl:px-32 flex flex-col justify-center">
          <div className="max-w-xl mx-auto w-full">
            <span className="inline-block text-xs font-bold text-white uppercase tracking-widest border border-dashed border-white px-4 py-2 mb-6">
              CONTACT US
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-10">
              Get A Free Quote
            </h2>

            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-white focus:outline-none focus:border-[#EAB308] placeholder-gray-500 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-white focus:outline-none focus:border-[#EAB308] placeholder-gray-500 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-white focus:outline-none focus:border-[#EAB308] placeholder-gray-500 transition-colors"
                />
                <div className="relative">
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
                </div>
              </div>
              <textarea
                placeholder="Write a Message"
                rows={5}
                className="w-full px-5 py-4 rounded-none border border-[#1e295e] bg-[#121943] text-white focus:outline-none focus:border-[#EAB308] placeholder-gray-500 transition-colors"
              ></textarea>
              {quoteSubmitted && (
                 <div className="text-[#EAB308] text-sm font-bold">Thank you. We will contact you shortly.</div>
              )}
            </form>
          </div>
        </div>

        {/* Right Side: FAQ */}
        <div className="w-full lg:w-1/2 bg-[#F3F4F6] p-8 lg:p-24 xl:px-32 flex flex-col justify-center relative">
          <div className="max-w-xl mx-auto w-full">
            <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-6">
              GENERAL QUESTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Frequently Asked<br/>Question.
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-sm">
              We are a team of dedicated patent professional united by our commitment to excellence.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 shadow-sm cursor-pointer border border-gray-100" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900 text-lg">{faq.question}</h4>
                    <FiChevronRight className={`text-gray-400 transform transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                  </div>
                  {openFaq === i && (
                     <p className="mt-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                       {faq.answer}
                     </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-[#EAB308] hover:border-[#EAB308] transition bg-white"
          >
            <span className="transform -rotate-90 text-lg font-bold">➔</span>
          </button>
        </div>
      </motion.section>

      {/* Case Studies */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10">
            <div>
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-4">
                CASE STUDIES
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Explore Our Latest Case Studies
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-2 relative">
              {[
                { id: "all", name: "All" },
                { id: "copyright", name: "Copyright" },
                { id: "creative", name: "Creative" },
                { id: "patent", name: "Patent" },
                { id: "trade", name: "Trade" },
                { id: "trademark", name: "Trademark" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCaseTab(tab.id as any)}
                  className={`text-sm font-bold relative pb-2 transition-colors duration-200 ${
                    activeCaseTab === tab.id
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.name}
                  {activeCaseTab === tab.id && (
                    <>
                      <div className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-gray-900"></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#EAB308] text-white text-xs font-bold w-6 h-6 flex items-center justify-center shadow-md z-10">
                        3
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#EAB308] rotate-45 -z-10"></div>
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCases.slice(0, 3).map((cs, i) => (
                <motion.div
                  key={cs.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative group h-[500px] overflow-hidden shadow-sm hover:shadow-lg cursor-pointer bg-gray-100"
                >
                  <img 
                    src={cs.image || "/case_study_1.png"} 
                    alt={cs.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Hover Overlay Box */}
                  <div className="absolute bottom-0 left-0 w-[85%] bg-white p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20 flex flex-col justify-center">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                      {cs.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm font-semibold">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-[#EAB308] mr-2 text-lg" xmlns="http://www.w3.org/2000/svg"><path d="M485.88 206.59L298.53 19.24a33.34 33.34 0 00-23.57-9.84H65.81a33.43 33.43 0 00-33.33 33.33v209.15a33.34 33.34 0 009.84 23.57l187.35 187.35a33.4 33.4 0 0047.14 0l179-179a33.4 33.4 0 00.08-47.21zM140.23 182.23a42 42 0 1142-42 42 42 0 01-42 42z"></path></svg>
                      <span className="capitalize">{cs.category === 'all' ? 'All' : cs.category}</span>
                    </div>
                  </div>

                  {/* Red (Now Yellow) Arrow Button Block */}
                  <div className="absolute bottom-0 right-0 w-[15%] h-[112px] bg-[#EAB308] flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-75 z-20">
                     <FiArrowRight className="text-white text-2xl" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>



      {/* Latest Blog Articles */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-white dark:bg-stone-950 border-t border-orange-100/70 dark:border-stone-900"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
            <div>
              <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-4">
                OUR BLOG
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight capitalize">
                Latest News & Articles<br/>From The Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="bg-[#EAB308] hover:bg-yellow-600 text-white font-bold px-8 py-4 transition shadow-lg flex items-center gap-2"
            >
              More Blog <FiChevronRight className="text-lg" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, i) => (
              <div
                key={i}
                className="bg-white dark:bg-stone-900 border border-gray-100 dark:border-gray-850 rounded-none shadow-sm hover:shadow-xl transition duration-300 group flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-80 w-full bg-gray-100 overflow-hidden">
                  <img src={i === 0 ? "/our_story_team.png" : "/bg_compliance.png"} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {/* Date Badge */}
                  <div className="absolute bottom-0 right-10 flex flex-col translate-y-[28px] group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-[#121943] text-white text-center py-4 px-6 shadow-lg relative z-10">
                      <span className="text-4xl font-extrabold block">25</span>
                    </div>
                    <div className="bg-[#EAB308] text-white text-center py-2 px-6 text-[10px] font-bold uppercase tracking-widest relative">
                      MAY, 2026
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-12">
                  <div className="flex items-center gap-6 mb-4 text-sm font-semibold text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-[#EAB308]" />
                      <span>admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-[#EAB308]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      <span>0 Comments</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#EAB308] transition leading-snug mb-6 pr-4">
                    {post.title}
                  </h3>
                  <Link href="/blog" className="text-sm font-bold text-[#EAB308] hover:underline flex items-center gap-1">
                    Read More <FiChevronRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center items-center gap-2 mt-16">
            <button className="w-8 h-8 flex items-center justify-center text-gray-900 hover:text-[#EAB308] transition">
              <FiChevronLeft className="text-2xl" />
            </button>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-900 cursor-pointer"></div>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-900 cursor-pointer"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308] cursor-pointer"></div>
            <button className="w-8 h-8 flex items-center justify-center text-gray-900 hover:text-[#EAB308] transition">
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* CTA Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="bg-[#0a0f2b] text-white py-16 relative overflow-hidden"
      >
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 right-0 w-1/2 opacity-30 mix-blend-overlay hidden md:block">
           <img src="/our_story_team.png" alt="CTA Background" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2b] to-transparent"></div>
        </div>
        
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 relative">
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-[#EAB308]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-[#EAB308]"></div>

            <div className="pl-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">Lets Get Started with Us.</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-500">Call Us Now!</h3>
            </div>

            <div className="flex items-center gap-6 pr-6">
              <div className="w-20 h-20 rounded-full bg-[#EAB308] flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <FiPhoneCall className="text-3xl text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-300 block mb-1">Toll Free Call.</span>
                <a href="tel:+019489209" className="text-3xl font-extrabold hover:text-[#EAB308] transition">
                  +019-489-209
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
