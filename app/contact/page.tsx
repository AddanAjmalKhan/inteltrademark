"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiCheckCircle, FiHome, FiArrowRight, FiUser, FiMessageSquare } from "react-icons/fi";
import Link from "next/link";

/* ─── easing ──────────────────────────────────────────────────────── */
const EASE = cubicBezier(0.22, 1, 0.36, 1);

/* ─── scroll-reveal wrapper ───────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial =
    direction === "left"  ? { opacity: 0, x: -50 } :
    direction === "right" ? { opacity: 0, x:  50 } :
    direction === "scale" ? { opacity: 0, scale: 0.88 } :
                            { opacity: 0, y: 50 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── stagger container variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ─── contact info cards data ─────────────────────────────────────── */
const contactItems = [
  {
    icon: FiMapPin,
    label: "Address",
    value: "8229 Boone Boulevard, Suite 200, Vienna, VA",
    href: "https://maps.google.com/?q=8229+Boone+Boulevard+Suite+200+Vienna+VA",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+1 571 543 1187",
    href: "tel:+15715431187",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "info@inteltrademark.com",
    href: "mailto:info@inteltrademark.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "Contact Form" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO BANNER  (same style as blog page)
      ════════════════════════════════════════════════════════ */}
      <section className="relative h-72 md:h-80 bg-[#121943] flex items-center overflow-hidden pt-16">

        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="/our_story_team.png"
            alt=""
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#121943]/65" />
        </div>

        {/* Animated floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-400/30 pointer-events-none"
            style={{ left: `${15 + i * 17}%`, top: `${25 + (i % 3) * 20}%` }}
            animate={{ y: [-15, 15, -15], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

        {/* White downward-triangle tab at top-left */}
        <motion.div
          className="absolute top-0 left-24 w-0 h-0 pointer-events-none"
          style={{
            borderLeft:  "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop:   "26px solid white",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-8 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Contact Us
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2 text-gray-300 text-sm font-medium"
          >
            <FiHome className="text-gray-300 text-base" />
            <Link href="/" className="hover:text-[#EAB308] transition-colors duration-200">
              Home
            </Link>
            <span className="text-gray-400">-</span>
            <span className="text-white font-bold">Contact</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CONTACT INFO CARDS ROW
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 -mt-8 relative z-20 gap-px"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="bg-[#121943] p-8 flex items-start gap-5 group cursor-default shadow-xl"
                >
                  <motion.div
                    className="w-14 h-14 rounded-full border border-dashed border-yellow-500 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EAB308] group-hover:border-[#EAB308] transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-xl text-[#EAB308] group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-bold text-white hover:text-[#EAB308] transition-colors duration-200 text-sm leading-relaxed"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-bold text-white text-sm leading-relaxed">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT: INFO + FORM
      ════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Left: Contact information ─────────────── */}
            <Reveal direction="left">
              <div className="space-y-10">

                {/* Label + heading */}
                <div>
                  <motion.span
                    className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-6"
                    whileInView={{ borderColor: ["#EAB308", "#EAB308aa", "#EAB308"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    viewport={{ once: false }}
                  >
                    CONTACT US
                  </motion.span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
                    Get In Touch <br />With Our Experts
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                    Our team of dedicated patent professionals is ready to help you protect your intellectual property. Reach out through any channel below or fill in the form.
                  </p>
                </div>

                {/* Info items */}
                <motion.div
                  className="space-y-7"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {contactItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex gap-5 items-start group"
                      >
                        <motion.div
                          className="w-14 h-14 rounded-full bg-[#121943] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#EAB308] transition-colors duration-300 shadow-md"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <Icon className="text-xl" />
                        </motion.div>
                        <div className="pt-1">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                            {item.label}
                          </span>
                          {item.href ? (
                            <motion.a
                              href={item.href}
                              className="font-bold text-gray-900 hover:text-[#EAB308] transition-colors duration-200"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.value}
                            </motion.a>
                          ) : (
                            <p className="font-bold text-gray-900">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Decorative divider */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-[#EAB308] via-[#121943] to-transparent w-3/4"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                />

                {/* Opening hours */}
                <Reveal delay={0.2}>
                  <div className="bg-[#f6f5f2] p-8 border-l-4 border-[#EAB308]">
                    <h4 className="font-extrabold text-gray-900 text-lg mb-4">Office Hours</h4>
                    <ul className="space-y-2 text-sm text-gray-600 font-medium">
                      {[
                        ["Monday – Friday", "9:00 AM – 6:00 PM"],
                        ["Saturday",        "10:00 AM – 2:00 PM"],
                        ["Sunday",          "Closed"],
                      ].map(([day, hours]) => (
                        <li key={day} className="flex justify-between">
                          <span>{day}</span>
                          <span className="font-bold text-gray-900">{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Reveal>

            {/* ── Right: Quote form ──────────────────────── */}
            <Reveal direction="right" delay={0.1}>
              <div className="bg-[#f6f5f2] p-8 md:p-12">
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  Get a Free Quote
                </h3>
                <p className="text-gray-500 text-sm mb-10">
                  Fill in the form and our team will get back to you within 24 hours.
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Name + Email */}
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Name */}
                        <motion.div variants={itemVariants} className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#EAB308] transition-colors" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full pl-11 pr-5 py-4 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-400 font-medium"
                          />
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={itemVariants} className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#EAB308] transition-colors" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email Address"
                            className="w-full pl-11 pr-5 py-4 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-400 font-medium"
                          />
                        </motion.div>

                        {/* Phone */}
                        <motion.div variants={itemVariants} className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#EAB308] transition-colors" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Phone Number"
                            className="w-full pl-11 pr-5 py-4 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-400 font-medium"
                          />
                        </motion.div>

                        {/* Service select */}
                        <motion.div variants={itemVariants} className="relative">
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className={`w-full px-5 py-4 border border-gray-300 bg-white focus:outline-none focus:border-[#EAB308] appearance-none transition-colors font-medium ${
                              formData.service ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            <option value="" disabled>Select Service</option>
                            <option value="corporate">Corporate Compliance</option>
                            <option value="ip-law">Intellectual Property Law</option>
                            <option value="arbitration">Commercial Arbitration</option>
                            <option value="brand">Brand Protection</option>
                          </select>
                          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                      >
                        <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#EAB308] transition-colors" />
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Write Your Message…"
                          className="w-full pl-11 pr-5 py-4 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-400 font-medium resize-none"
                        />
                      </motion.div>

                      {/* Error message */}
                      {error && (
                        <p className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 px-4 py-3">
                          {error}
                        </p>
                      )}
                      {/* Submit */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                      >
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                          whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                          className={`inline-flex items-center gap-2 font-bold px-10 py-4 text-white transition-colors duration-200 ${
                            isSubmitting
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#EAB308] hover:bg-yellow-600"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              />
                              Submitting…
                            </>
                          ) : (
                            <>
                              Send Message
                              <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity }}
                              >
                                <FiArrowRight />
                              </motion.span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  ) : (
                    /* ── Success state ── */
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center py-16 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                      >
                        <FiCheckCircle className="text-[#EAB308] text-7xl mb-6" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                          Thank you for reaching out. A senior IP consultant has been assigned and will follow up within 4 business hours.
                        </p>
                        <motion.button
                          onClick={() => setIsSubmitted(false)}
                          className="mt-8 text-[#EAB308] font-bold hover:underline text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          ← Send Another Message
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MAP SECTION
      ════════════════════════════════════════════════════════ */}
      <Reveal direction="scale" className="w-full">
        <div className="relative w-full h-[480px] overflow-hidden">
          {/* Yellow top-border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#EAB308] z-10" />
          <iframe
            src="https://maps.google.com/maps?q=8229+Boone+Boulevard+Suite+200+Vienna+VA+22182&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Intel Trademark Office Location"
          />
        </div>
      </Reveal>

    </div>
  );
}
