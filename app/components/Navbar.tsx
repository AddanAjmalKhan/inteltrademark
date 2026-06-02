"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiPhone, FiMapPin, FiMail, FiArrowRight } from "react-icons/fi";
import { IntelTrademarkLogo } from "./Logo";
import SearchModal from "./SearchModal";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

const navLinks = [
  { href: "/",         label: "Home",     num: "01" },
  { href: "/about",    label: "About Us", num: "02" },
  { href: "/services", label: "Services", num: "03" },
  { href: "/blog",     label: "Our Blog", num: "04" },
  { href: "/contact",  label: "Contact",  num: "05" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const pathname = usePathname();

  /* Scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Lock body scroll when overlay menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Keyboard shortcut: Ctrl/Cmd+K → open search */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════
          TOP BAR
      ══════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md shadow-black/[0.06]" : "bg-white border-b border-gray-100"
        }`}
      >
        <nav className="max-w-[90rem] mx-auto flex items-center justify-between px-4 py-3 lg:px-8">

          {/* ── Left: Logo + MENU trigger ── */}
          <div className="flex items-center gap-7">
            <IntelTrademarkLogo variant="light" />

            <motion.button
              className="hidden lg:flex items-center gap-2 text-stone-600 font-bold text-[13px] hover:text-[#EAB308] transition-colors tracking-wider group"
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.94 }}
              aria-label="Open menu"
            >
              <motion.span
                className="flex flex-col gap-[4px]"
                animate={menuOpen ? "open" : "closed"}
              >
                <FiMenu className="text-[17px] group-hover:scale-110 transition-transform" />
              </motion.span>
              MENU
            </motion.button>
          </div>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-[14.5px] font-semibold transition-colors duration-200 group ${
                        isActive ? "text-[#EAB308]" : "text-stone-700 hover:text-[#EAB308]"
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#EAB308] transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="w-px h-6 bg-gray-200 mx-3" />

            {/* Search — now functional */}
            <motion.button
              className="p-2 rounded-lg text-stone-500 hover:text-[#EAB308] hover:bg-yellow-50 transition-colors relative group"
              onClick={() => setSearchOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Search"
            >
              <FiSearch className="text-[18px]" />
              {/* Tooltip */}
              <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                ⌘K
              </span>
            </motion.button>

            <motion.a
              href="/contact"
              className="ml-2 flex items-center gap-2 bg-[#121943] text-white text-[13px] font-bold px-5 py-2.5 rounded-sm hover:bg-[#EAB308] transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiPhone className="text-[13px]" />
              Get Consultation
            </motion.a>
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              className="p-2 text-stone-600 hover:text-[#EAB308] transition-colors"
              onClick={() => setSearchOpen(true)}
              whileTap={{ scale: 0.92 }}
              aria-label="Search"
            >
              <FiSearch className="text-[19px]" />
            </motion.button>
            <motion.button
              className="p-2 rounded-md bg-gray-50 text-gray-700 hover:bg-yellow-50 hover:text-[#EAB308] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {mobileOpen ? <FiX className="text-[20px]" /> : <FiMenu className="text-[20px]" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <ul className="flex flex-col p-4 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-[15px] transition-all ${
                          isActive ? "text-[#EAB308] bg-yellow-50" : "text-stone-700 hover:bg-gray-50 hover:text-[#EAB308]"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] flex-shrink-0" />}
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
                <li className="pt-2">
                  <a
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 bg-[#121943] text-white font-bold py-3 px-6 rounded-sm text-[14px] hover:bg-[#EAB308] transition-colors"
                  >
                    <FiPhone /> Get Consultation
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════════════════════
          FULL-SCREEN OVERLAY MENU
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            <div className="fixed inset-0 z-[100] flex pointer-events-none">

              {/* ── LEFT panel: navigation ── */}
              <motion.div
                className="pointer-events-auto relative flex flex-col justify-center w-full md:w-[60%] bg-white px-10 md:px-16 lg:px-24 overflow-hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.52, ease: EASE }}
              >
                {/* Yellow left-edge accent */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#EAB308] origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                />

                {/* Background glow */}
                <div className="absolute -bottom-24 -left-8 w-80 h-80 rounded-full bg-[#EAB308]/[0.04] blur-[90px] pointer-events-none" />

                {/* Logo */}
                <div className="absolute top-8 left-10 md:left-16 lg:left-24">
                  <IntelTrademarkLogo variant="light" />
                </div>

                {/* Nav links with line-reveal */}
                <ul className="mt-4">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      >
                        {i > 0 && (
                          <motion.div
                            className="h-px bg-gray-100 origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: EASE }}
                          />
                        )}
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-4 py-4 md:py-[18px]"
                        >
                          {/* Number prefix */}
                          <motion.span
                            className="text-[10px] font-black text-[#EAB308] tracking-[0.18em] w-6 flex-shrink-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ delay: 0.2 + i * 0.06 }}
                          >
                            {link.num}
                          </motion.span>

                          {/* Text with line-reveal */}
                          <div className="overflow-hidden flex-1 relative">
                            <motion.span
                              className={`block text-[32px] md:text-[40px] lg:text-[48px] font-black leading-none tracking-tight transition-colors duration-200 ${
                                isActive ? "text-[#EAB308]" : "text-stone-800 group-hover:text-[#EAB308]"
                              }`}
                              initial={{ y: "105%" }}
                              animate={{ y: 0 }}
                              exit={{ y: "105%" }}
                              transition={{ delay: 0.12 + i * 0.07, duration: 0.55, ease: EASE }}
                            >
                              {link.label}
                            </motion.span>
                            {/* Slide-in underline on hover */}
                            <span className="absolute bottom-1 left-0 w-full h-[2.5px] bg-[#EAB308] rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[350ms] ease-out" />
                          </div>

                          {/* Arrow */}
                          <motion.span
                            className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            initial={{ x: -8 }}
                            animate={{ x: 0 }}
                          >
                            <FiArrowRight className="text-xl text-[#EAB308]" />
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Bottom tagline */}
                <motion.p
                  className="absolute bottom-8 left-10 md:left-16 lg:left-24 text-gray-400 text-[13px] font-medium tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Protecting your ideas since 2019.
                </motion.p>
              </motion.div>

              {/* ── RIGHT panel: contact info ── */}
              <motion.div
                className="pointer-events-auto hidden md:flex flex-col justify-center flex-1 bg-[#0a0f2b] px-10 lg:px-14 relative overflow-hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.52, ease: EASE }}
              >
                {/* Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#EAB308]/[0.07] blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-[#EAB308]/[0.05] blur-[80px] pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                    opacity: 0.025,
                  }}
                />

                {/* Close button */}
                <motion.button
                  className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#EAB308] hover:border-[#EAB308] transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.93 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                  aria-label="Close menu"
                >
                  <FiX className="text-[15px]" />
                </motion.button>

                {/* Label */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.25em]">
                    Get In Touch
                  </span>
                  <motion.div
                    className="h-[2px] bg-[#EAB308] mt-2 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: EASE }}
                    style={{ width: 28 }}
                  />
                </motion.div>

                {/* Contact items */}
                {[
                  { Icon: FiMapPin, label: "Location",  value: "819 S Grevillea Ave\nInglewood CA 90301, USA", href: undefined },
                  { Icon: FiPhone,  label: "Call Us",   value: "+1 571 543 1187",           href: "tel:+15715431187" },
                  { Icon: FiMail,   label: "Email Us",  value: "Info@inteltrademark.com",   href: "mailto:Info@inteltrademark.com" },
                ].map(({ Icon, label, value, href }, i) => (
                  <motion.div
                    key={label}
                    className="mb-8 last:mb-0"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.45, ease: EASE }}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-[#EAB308]/[0.14] border border-[#EAB308]/25 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(234,179,8,0.25)" }}
                      >
                        <Icon className="text-[#EAB308] text-[13px]" />
                      </motion.div>
                      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.18em]">
                        {label}
                      </span>
                    </div>
                    <div className="pl-11">
                      {href ? (
                        <a
                          href={href}
                          className="text-white font-semibold text-[14px] hover:text-[#EAB308] transition-colors leading-relaxed block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white font-semibold text-[14px] leading-relaxed whitespace-pre-line">
                          {value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          SEARCH MODAL
      ══════════════════════════════════════════════ */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
