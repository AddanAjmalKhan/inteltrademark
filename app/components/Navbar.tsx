"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShield, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Our Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 shadow-sm">
      <nav className="max-w-[90rem] mx-auto flex items-center justify-between p-4 lg:px-8">
        
        {/* Left Side: Logo & Menu Text */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-yellow-500 p-2 rounded-lg text-white group-hover:scale-105 transition transform duration-200">
              <FiShield className="text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-[#121943] leading-none uppercase tracking-wide">
                Global
              </span>
              <span className="text-[10px] font-bold text-yellow-500 leading-none uppercase tracking-wider mt-0.5">
                Trademark Office
              </span>
            </div>
          </Link>
          
          <button className="hidden lg:flex items-center gap-2 text-stone-800 font-semibold text-sm hover:text-yellow-500 transition">
            <FiMenu className="text-xl" /> MENU
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-[15px] font-medium transition-colors ${
                      isActive
                        ? "text-yellow-500"
                        : "text-stone-700 hover:text-yellow-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button className="p-2 text-stone-700 hover:text-yellow-500 transition-colors" aria-label="Search">
            <FiSearch className="text-xl" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-stone-700 hover:text-yellow-500">
            <FiSearch className="text-xl" />
          </button>
          <button
            className="p-2 rounded-md bg-gray-50 text-gray-700"
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
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-inner"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all text-base ${
                        isActive
                          ? "text-yellow-500 bg-yellow-50"
                          : "text-stone-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
