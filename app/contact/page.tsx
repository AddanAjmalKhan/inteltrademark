"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "",
    stage: "startup",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        brandName: "",
        stage: "startup",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-orange-50/60 to-white dark:from-gray-900/50 dark:to-gray-950 relative overflow-hidden border-b border-orange-100/70 dark:border-stone-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
            Home &gt; Contact
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-6 tracking-tight leading-tight capitalize">
            Contact
          </h1>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-3">
                  Reach Out
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base leading-relaxed mt-4">
                  Whether you are planning a multinational launch or need help defending a domestic registration against opposition, we are ready to assist.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-2xl bg-orange-50/40 dark:bg-stone-900/40 border border-orange-100/70 dark:border-stone-900">
                  <FiPhone className="text-orange-600 dark:text-orange-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Call Us</h4>
                    <p className="text-sm text-gray-505 dark:text-stone-400 mt-1">Available Mon-Fri, 9am - 6pm EST</p>
                    <a href="tel:+12095840601" className="text-orange-600 dark:text-orange-400 font-bold block mt-2 text-lg">
                      + (209)-584-0601
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-orange-50/40 dark:bg-stone-900/40 border border-orange-100/70 dark:border-stone-900">
                  <FiMail className="text-orange-600 dark:text-orange-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Email Us</h4>
                    <p className="text-sm text-gray-505 dark:text-stone-400 mt-1">We respond within 4 business hours</p>
                    <a href="mailto:legal@globaltrademarkoffice.com" className="text-orange-600 dark:text-orange-400 font-bold block mt-2 text-lg">
                      legal@globaltrademarkoffice.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-orange-50/40 dark:bg-stone-900/40 border border-orange-100/70 dark:border-stone-900">
                  <FiMapPin className="text-orange-600 dark:text-orange-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Location</h4>
                    <p className="text-sm text-gray-655 dark:text-stone-400 leading-relaxed font-semibold mt-2">
                      819 S GREVILLEA AVE INGLEWOOD CA 90301-0303 USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="bg-white dark:bg-stone-900 border border-orange-100/70 dark:border-stone-800 rounded-3xl p-8 md:p-12 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
                        placeholder="Marget Winslow"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Business Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
                        placeholder="legal@globaltrademarkoffice.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Proposed Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
                        placeholder="e.g. InnovateX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Business Commercial Stage
                      </label>
                      <select
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition cursor-pointer shadow-inner"
                      >
                        <option value="startup">Startup Idea / Pre-Launch</option>
                        <option value="active">Active Business (Under 2 years)</option>
                        <option value="established">Established Corporation (2+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-stone-300 mb-2">
                        Filing Details & Special Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner text-sm leading-relaxed"
                        placeholder="Please describe your products, services, or any previous trademark filings..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full font-bold py-4 rounded-xl text-white transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:shadow-orange-500/20"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Clearance Request"
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <FiCheckCircle className="text-emerald-500 text-6xl mb-6 animate-bounce" />
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      Request Successfully Submitted!
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base leading-relaxed mt-4 max-w-sm mx-auto">
                      Thank you for contacting us. A senior IP consultant has been assigned to your request and will follow up with you within 4 business hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-orange-600 dark:text-orange-400 font-bold hover:underline"
                    >
                      Submit Another Consultation Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
