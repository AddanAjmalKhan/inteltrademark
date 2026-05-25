"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiArrowRight, FiShield, FiLock, FiCompass, FiBriefcase, FiAlertOctagon, FiUsers } from "react-icons/fi";
import Link from "next/link";
import FAQAccordion from "../components/FAQAccordion";

export default function Services() {
  // Practice Areas
  const practices = [
    { title: "Corporate Compliance", desc: "Seasoned legal support and documentation auditing to ensure comprehensive corporate operations compliance.", icon: FiShield },
    { title: "Intellectual Property Law", desc: "Clearing, filing, defending, and enforcing copyrights, trademarks, design rights, and global patent portfolios.", icon: FiLock },
    { title: "Commercial Arbitration", desc: "Resolving cross-border ownership, contract, and commercial IP conflicts through formal strategic arbitration.", icon: FiCompass },
    { title: "Regulatory Affairs", desc: "Assisting enterprises in passing stringent government agency product, environmental, and trademark reviews.", icon: FiBriefcase },
    { title: "Brand Protection", desc: "Defensive brand shields, continuous automated registry checks, and domain enforcement procedures.", icon: FiAlertOctagon },
    { title: "Employment Law Advisory", desc: "Providing structural templates and mediation counsel on non-disclosure, trade secrets, and labor agreements.", icon: FiUsers }
  ];

  // Pricing Plans
  const plans = [
    {
      title: "Basic Search Plan",
      price: "$149",
      desc: "Ideal for verifying early brand names and securing clearance before formal submission.",
      features: [
        "Patent Search",
        "Trademark Search"
      ]
    },
    {
      title: "Expedited Filing Plan",
      price: "$299",
      desc: "Perfect for active businesses and startups seeking immediate 'Pending' registry status.",
      features: [
        "Patent Search",
        "Patent Filing",
        "Trademark Search",
        "Trademark Filing"
      ],
      popular: true
    },
    {
      title: "Premium Protection Suite",
      price: "$599",
      desc: "Complete comprehensive corporate IP coverage including copyrights and global filing channels.",
      features: [
        "Patent Search",
        "Patent Filing",
        "Trademark Search",
        "Trademark Filing",
        "Copyright Registration"
      ]
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "Q: Can I patent an idea?",
      answer: "No, patents are granted for tangible invention processes, not abstract ideas. An idea needs to be fully developed into a concrete, novel, and non-obvious invention process to be eligible for formal registration."
    },
    {
      question: "Q: Do I need to register for copyright protection?",
      answer: "No, copyright protection exists automatically the moment an original work is created and fixed in a tangible medium. However, formal registration with national authorities is highly recommended as it provides public record and is legally required to file infringement lawsuits."
    },
    {
      question: "Q: What can I trademark?",
      answer: "You can trademark any word, phrase, symbol, device, or combination thereof that is used in commerce to identify and distinguish your goods or services from those of others, including brand names, product logos, and marketing slogans."
    },
    {
      question: "Q: How long do trademarks last?",
      answer: "A registered trademark can theoretically last indefinitely, provided it remains in active use in commerce and you submit required maintenance and renewal filings (e.g. between the 5th and 6th years, 9th and 10th years, and every 10 years thereafter)."
    }
  ];

  return (
    <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-orange-50/60 to-white dark:from-gray-900/50 dark:to-gray-950 relative overflow-hidden border-b border-orange-100/70 dark:border-stone-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
            Home &gt; services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-6 tracking-tight leading-tight capitalize">
            services
          </h1>
        </div>
      </section>

      {/* Services/Practice Areas Grid */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-stone-900 border border-orange-100/70 dark:border-stone-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/30 transition duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-2xl mb-6">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
                      {p.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-4">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-orange-100/70 dark:border-stone-800 flex items-center justify-between">
                    <Link href="/contact" className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
                      Know More
                    </Link>
                    <FiArrowRight className="text-gray-400 group-hover:translate-x-1 transition duration-200" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call Us Now Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10 text-center sm:text-left">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Lets Get Stared with Us.Call Us Now!
            </h2>
            <p className="text-orange-100 mt-2 text-sm md:text-base">
              Speak directly with an intellectual property specialist and secure immediate filing priority.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-white hover:bg-orange-50/40 text-orange-600 font-extrabold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Know more
          </Link>
        </div>
      </section>

      {/* Explore Our Pricing Plan */}
      <section className="py-24 bg-white dark:bg-stone-950 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Flat Rates
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Explore Our Pricing Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white dark:bg-stone-900 rounded-3xl border-2 p-8 md:p-10 shadow-sm hover:shadow-xl transition duration-350 flex flex-col justify-between hover:-translate-y-1 relative ${
                  plan.popular
                    ? "border-orange-600 dark:border-orange-500 scale-102 lg:scale-105"
                    : "border-orange-100/70 dark:border-stone-800"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-orange-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-xs font-semibold text-gray-400">Flat Fee</span>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mt-4">
                    {plan.desc}
                  </p>

                  <div className="mt-8 space-y-3.5 pt-6 border-t border-orange-100/70 dark:border-stone-800">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-250">
                        <FiCheck className="text-emerald-500 text-lg flex-shrink-0" />
                        <span className="font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <Link
                    href="/contact"
                    className={`w-full block text-center font-bold py-4 rounded-xl transition ${
                      plan.popular
                        ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/25"
                        : "bg-orange-100/20 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    Get this Plan Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Question */}
      <section className="py-20 bg-orange-50/40 dark:bg-stone-900/20 border-t border-orange-100/70 dark:border-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
              Legal FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
              Frequently Asked Question.
            </h2>
          </div>

          <FAQAccordion items={faqs} />
        </div>
      </section>

    </div>
  );
}
