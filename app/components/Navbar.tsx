"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShield, FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check initial dark mode state
    const isDark = document.documentElement.classList.contains("dark") || 
                   localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-orange-100/70 dark:border-stone-900 sticky top-0 z-50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-2 rounded-xl text-white shadow-md shadow-orange-500/10 group-hover:scale-105 transition transform duration-200">
            <FiShield className="text-xl" />
          </div>
          <span className="text-xl font-bold text-stone-900 dark:from-white dark:to-gray-300 tracking-tight">
            Intel Trademark
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-950/10"
                        : "text-stone-600 dark:text-stone-300 hover:text-gray-900 dark:hover:text-white hover:bg-orange-50/40 dark:hover:bg-gray-900/50"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-orange-600 dark:bg-orange-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />

          {/* Theme switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-orange-50/40 hover:bg-orange-100/20 dark:bg-stone-900 dark:hover:bg-gray-800 text-stone-600 dark:text-stone-300 transition-all border border-orange-100/70 dark:border-stone-800"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="text-lg text-amber-400" /> : <FiMoon className="text-lg" />}
          </button>

          <Link
            href="/contact"
            className="bg-gray-900 hover:bg-gray-800 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all transform hover:-translate-y-0.5 shadow-md shadow-gray-900/10 dark:shadow-orange-500/10"
          >
            Free Valuation
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-orange-50/40 dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-orange-100/70 dark:border-stone-800"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="text-amber-400" /> : <FiMoon />}
          </button>
          
          <button
            className="p-2.5 rounded-xl bg-orange-50/40 dark:bg-stone-900 text-gray-700 dark:text-gray-200 border border-orange-100/70 dark:border-stone-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-stone-950 border-t border-orange-100/70 dark:border-stone-900 overflow-hidden shadow-inner"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl font-bold transition-all text-base ${
                        isActive
                          ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20"
                          : "text-stone-600 dark:text-stone-300 hover:text-gray-900 dark:hover:text-white hover:bg-orange-50/40 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="block text-center bg-gray-900 dark:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Free Valuation Call
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
