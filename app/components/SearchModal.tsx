"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import {
  FiSearch, FiX, FiArrowRight,
  FiHome, FiInfo, FiBriefcase, FiBookOpen, FiPhone, FiHelpCircle,
} from "react-icons/fi";
import Link from "next/link";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

/* ── Searchable content index ─────────────────────────────── */
const DATA = [
  { title: "Home",            href: "/",        desc: "IP protection services and trademark experts",           tags: ["home", "trademark", "ip", "intel"],         cat: "Pages",    Icon: FiHome      },
  { title: "About Us",        href: "/about",   desc: "Our story, global award, team, and company history",    tags: ["about", "team", "story", "history", "award"], cat: "Pages",    Icon: FiInfo      },
  { title: "Services",        href: "/services",desc: "Patents, trademarks, copyright, brand protection",      tags: ["services", "practice", "area"],               cat: "Pages",    Icon: FiBriefcase },
  { title: "Our Blog",        href: "/blog",    desc: "Patent wars, trademark law, copyright articles",        tags: ["blog", "articles", "news", "post"],           cat: "Pages",    Icon: FiBookOpen  },
  { title: "Contact Us",      href: "/contact", desc: "Get in touch, free consultation, office location",      tags: ["contact", "consultation", "call", "email"],   cat: "Pages",    Icon: FiPhone     },
  { title: "FAQ",             href: "/faq",     desc: "Frequently asked questions about IP and trademarks",    tags: ["faq", "questions", "help", "answers"],        cat: "Pages",    Icon: FiHelpCircle},
  { title: "Utility Patents",    href: "/services", desc: "Protect functional inventions and innovations",          tags: ["utility", "patent", "invention"],              cat: "Services", Icon: FiBriefcase },
  { title: "Design Patents",     href: "/services", desc: "Protect the ornamental design of your product",         tags: ["design", "patent", "appearance"],              cat: "Services", Icon: FiBriefcase },
  { title: "IP Translations",    href: "/services", desc: "Professional intellectual property translations",        tags: ["translation", "ip", "international", "language"], cat: "Services", Icon: FiBriefcase },
  { title: "Brand Protection",   href: "/services", desc: "Comprehensive trademark and brand security",             tags: ["brand", "protection", "logo"],                 cat: "Services", Icon: FiBriefcase },
  { title: "Trade Secrets",      href: "/services", desc: "NDA and confidential information protection",            tags: ["trade", "secret", "nda", "confidential"],     cat: "Services", Icon: FiBriefcase },
  { title: "Business Litigation",href: "/services", desc: "IP disputes, lawsuits, and court representation",       tags: ["litigation", "lawsuit", "court", "dispute"],   cat: "Services", Icon: FiBriefcase },
];

const QUICK = ["Patents", "Trademarks", "Contact", "Services", "FAQ"];

interface Props { open: boolean; onClose: () => void; }

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-focus & reset query */
  useEffect(() => {
    if (open) {
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Escape to close */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  /* Filter */
  const q = query.trim().toLowerCase();
  const results = q
    ? DATA.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q)  ||
        d.tags.some(t => t.includes(q))
      )
    : [];

  /* Group by category */
  const grouped = results.reduce<Record<string, typeof DATA>>((acc, item) => {
    (acc[item.cat] ??= []).push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[150] bg-black/55 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-x-0 top-0 z-[160] max-w-2xl mx-auto px-4 mt-[8vh]"
            initial={{ opacity: 0, y: -28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] overflow-hidden">

              {/* ── Input row ── */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <motion.div
                  animate={{ color: q ? "#EAB308" : "#9ca3af" }}
                  transition={{ duration: 0.2 }}
                >
                  <FiSearch className="text-xl flex-shrink-0" />
                </motion.div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search pages, services, topics…"
                  className="flex-1 text-[16px] font-medium text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
                <AnimatePresence>
                  {query && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      onClick={() => setQuery("")}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiX className="text-[15px]" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <button
                  onClick={onClose}
                  className="ml-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors tracking-wider border border-gray-200"
                >
                  ESC
                </button>
              </div>

              {/* ── Body ── */}
              <AnimatePresence mode="wait">

                {/* Empty state */}
                {!q && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-5 py-7"
                  >
                    <p className="text-gray-400 text-[13px] font-medium mb-4">Quick searches</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK.map(s => (
                        <motion.button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="text-[12px] font-semibold px-3.5 py-1.5 bg-gray-100 hover:bg-[#EAB308]/10 hover:text-[#EAB308] text-gray-600 rounded-full transition-colors border border-transparent hover:border-[#EAB308]/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* No results */}
                {q && results.length === 0 && (
                  <motion.div
                    key="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-5 py-10 text-center"
                  >
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-gray-500 text-[14px]">
                      No results for{" "}
                      <span className="font-bold text-gray-800">"{query}"</span>
                    </p>
                    <p className="text-gray-400 text-[12px] mt-1">Try "patents", "contact", or "FAQ"</p>
                  </motion.div>
                )}

                {/* Results */}
                {q && results.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-h-[58vh] overflow-y-auto py-2"
                  >
                    {Object.entries(grouped).map(([cat, items]) => (
                      <div key={cat}>
                        <div className="px-5 pt-3 pb-1">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{cat}</span>
                        </div>
                        {items.map((item, i) => (
                          <motion.div
                            key={`${item.href}-${item.title}`}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center gap-3.5 px-5 py-3 hover:bg-[#EAB308]/[0.06] group transition-colors"
                            >
                              <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#121943] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                                <item.Icon className="text-gray-600 group-hover:text-white text-[14px] transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[14px] text-gray-900 group-hover:text-[#EAB308] transition-colors truncate">
                                  {item.title}
                                </p>
                                <p className="text-[12px] text-gray-500 truncate">{item.desc}</p>
                              </div>
                              <FiArrowRight className="text-gray-300 group-hover:text-[#EAB308] text-[13px] flex-shrink-0 transition-colors" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                    <div className="h-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
