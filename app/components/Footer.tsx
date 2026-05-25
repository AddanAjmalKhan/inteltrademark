"use client";

import React from "react";
import Link from "next/link";
import { FiShield, FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-50/40 dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-t border-gray-200 dark:border-stone-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-2 rounded-xl text-white shadow-md shadow-orange-500/10">
                <FiShield className="text-xl" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Intel Trademark
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Leading intellectual property registration, search clearance, and ongoing brand monitoring services. Protecting global brands with cutting-edge technology and human expertise.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 border border-gray-200 dark:border-stone-800 transition" aria-label="Twitter">
                <FiTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 border border-gray-200 dark:border-stone-800 transition" aria-label="LinkedIn">
                <FiLinkedin className="text-lg" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 border border-gray-200 dark:border-stone-800 transition" aria-label="Facebook">
                <FiFacebook className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-6">
              Solutions
            </h3>
            <ul className="space-y-4 text-sm font-semibold">
              <li>
                <Link href="/services" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  US Trademark Registration
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Comprehensive Clearance Search
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Office Action Responses
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Global Trademark Filing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Trademark Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-6">
              Resources & Company
            </h3>
            <ul className="space-y-4 text-sm font-semibold">
              <li>
                <Link href="/about" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Knowledge Hub (Blog)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 dark:hover:text-orange-400 transition">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-6">
              Contact Information
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-orange-600 dark:text-orange-400 text-lg flex-shrink-0 mt-0.5" />
                <span className="text-stone-600 dark:text-stone-400 leading-relaxed font-semibold">
                  1200 Avenue of the Americas, Suite 450, New York, NY 10036
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-orange-600 dark:text-orange-400 text-lg flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-900 dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 transition">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-orange-600 dark:text-orange-400 text-lg flex-shrink-0" />
                <a href="mailto:info@inteltrademark.com" className="text-stone-600 dark:text-stone-400 font-semibold hover:text-orange-600 dark:hover:text-orange-400 transition">
                  info@inteltrademark.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-950 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400 dark:text-stone-500">
          <p>© {currentYear} Intel Trademark. All rights reserved. Professional IP Consultancy.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Disclaimers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
