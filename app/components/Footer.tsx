"use client";

import React from "react";
import Link from "next/link";
import { FiMail, FiSend, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f2b] text-white pt-24 pb-8 relative border-t border-[#121943]">
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#EAB308] font-bold flex items-center gap-2">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg>
                Awesome Image
              </span>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              Our team do comprises professional with experience.
            </p>
            <form className="flex w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="bg-white text-gray-900 px-4 py-4 w-full focus:outline-none placeholder-gray-400 text-sm font-semibold"
              />
              <button type="submit" className="bg-[#EAB308] text-white px-6 py-4 hover:bg-yellow-600 transition flex items-center justify-center">
                <FiSend className="text-lg" />
              </button>
            </form>
            <div className="flex items-center gap-3 text-gray-300">
              <FiMail className="text-[#EAB308] text-xl" />
              <a href="mailto:legal@globaltrademarkoffice.com" className="hover:text-[#EAB308] transition font-medium">
                legal@globaltrademarkoffice.com
              </a>
            </div>
          </div>

          {/* Column 2: Expertise */}
          <div>
            <h3 className="text-white font-extrabold text-xl mb-8">Expertise</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Utility Patents', 'Business Litigation', 'Design Patent', 'IP Translations', 'Brand Protection', 'Trade Secrets', 'Trade License', 'Enforcement'].map(item => (
                <li key={item}>
                  <Link href="/services" className="hover:text-[#EAB308] transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-extrabold text-xl mb-8">Quick Links</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['About Us', 'Practice Area', 'Cases', 'News', 'Contacts', 'Career', 'Feedback', 'Faq'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-[#EAB308] transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Gallery */}
          <div>
            <h3 className="text-white font-extrabold text-xl mb-8">Gallery</h3>
            <div className="grid grid-cols-2 gap-2">
              <img src="/our_story_team.png" alt="Gallery 1" className="w-full h-24 object-cover" />
              <img src="/bg_compliance.png" alt="Gallery 2" className="w-full h-24 object-cover" />
              <img src="/team_1.png" alt="Gallery 3" className="w-full h-24 object-cover object-top" />
              <img src="/ceo.png" alt="Gallery 4" className="w-full h-24 object-cover object-top" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a2352] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium relative">
          <p>Copyright © {currentYear} Global Trademark Office All Rights Reserved</p>
        </div>

        {/* Back to top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-8 right-8 w-10 h-10 rounded-full border-2 border-[#EAB308] flex items-center justify-center text-[#EAB308] hover:bg-[#EAB308] hover:text-white transition"
        >
          <FiArrowUp className="text-lg" />
        </button>
      </div>
    </footer>
  );
}
