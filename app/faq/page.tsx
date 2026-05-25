"use client";

import React, { useState } from "react";
import FAQAccordion from "../components/FAQAccordion";
import Link from "next/link";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<"all" | "general" | "filing">("all");

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General IP Info" },
    { id: "filing", name: "Filing & Processes" }
  ];

  const faqItems = [
    {
      category: "general",
      question: "IP Translations",
      answer: "Our team comprises seasoned professionals with years of experience across translation and localization. We ensure your patent and trademark descriptions are perfectly translated and fully compliant with local state requirements across non-English speaking jurisdictions."
    },
    {
      category: "filing",
      question: "Can I patent an idea?",
      answer: "No, patents are granted for tangible invention processes, not abstract ideas. An idea needs to be fully developed into a concrete, novel, and non-obvious invention process to be eligible for formal registration."
    },
    {
      category: "filing",
      question: "Do I need to register for copyright protection?",
      answer: "No, copyright protection exists automatically the moment an original work is created and fixed in a tangible medium. However, formal registration with national authorities is highly recommended as it provides public record and is legally required to file infringement lawsuits."
    },
    {
      category: "general",
      question: "What can I trademark?",
      answer: "You can trademark any word, phrase, symbol, device, or combination thereof that is used in commerce to identify and distinguish your goods or services from those of others, including brand names, product logos, and marketing slogans."
    },
    {
      category: "general",
      question: "How long do trademarks last?",
      answer: "A registered trademark can theoretically last indefinitely, provided it remains in active use in commerce and you submit required maintenance and renewal filings (e.g. between the 5th and 6th years, 9th and 10th years, and every 10 years thereafter)."
    }
  ];

  const filteredFaqs = faqItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  return (
    <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-orange-50/60 to-white dark:from-gray-900/50 dark:to-gray-950 relative overflow-hidden border-b border-orange-100/70 dark:border-stone-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
            Home &gt; FAQ
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-6 tracking-tight leading-tight capitalize">
            Frequently Asked Questions
          </h1>

          {/* Categories Tab Selector */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                  activeTab === cat.id
                    ? "bg-orange-600 text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-stone-900 text-gray-655 dark:text-stone-300 border border-gray-200 dark:border-stone-800 hover:bg-orange-50/40 dark:hover:bg-gray-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion list */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FAQAccordion items={filteredFaqs} />
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#1e3b8b,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Protect Your Intellectual Property Today
          </h2>
          <p className="text-gray-350 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Need custom service classifications? Connect with our senior consultants. We will formulate a comprehensive brand protection strategy tailored to your requirements.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl transition transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
