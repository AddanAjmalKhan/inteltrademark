"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiCheckCircle, FiHome, FiArrowRight } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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
        phone: "",
        service: "",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="bg-white transition-colors duration-300">
      
      {/* Page Header */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="py-24 bg-[#2e355c] relative overflow-hidden"
      >
        {/* Subtle right gradient similar to image */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative z-10 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight capitalize mb-6 mt-4">
            Contact Us Now!
          </h1>
          <div className="flex items-center gap-2 text-white text-sm font-medium">
             <FiHome className="text-lg" />
             <span>Home</span>
             <span>-</span>
             <span>Contact</span>
          </div>
        </div>
      </motion.section>

      {/* Main Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
        className="py-24 bg-white"
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left - Contact Information */}
            <div className="space-y-12">
              <div>
                <span className="inline-block text-xs font-bold text-[#EAB308] uppercase tracking-widest border border-dashed border-[#EAB308] px-4 py-2 mb-6">
                  GENERAL QUESTIONS
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                  Frequently Asked Question.
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa Aliquam in hendrerit urna.
                </p>
              </div>

              <div className="space-y-8 pt-4">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-[#121943] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#EAB308] transition-colors cursor-pointer">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Address</span>
                    <h4 className="font-bold text-gray-900">Stone Mountain Park Drive, GA 30083</h4>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-[#121943] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#EAB308] transition-colors cursor-pointer">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Phone</span>
                    <a href="tel:+4158648728" className="font-bold text-gray-900 hover:text-[#EAB308] transition-colors">
                      +415-864-8728
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-[#121943] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#EAB308] transition-colors cursor-pointer">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Address</span>
                    <a href="mailto:hello.12@posh.com" className="font-bold text-gray-900 hover:text-[#EAB308] transition-colors">
                      hello.12@posh.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-[#f6f5f2] p-8 md:p-14">
              <h3 className="text-4xl font-extrabold text-gray-900 mb-10">Get a Free Quote</h3>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-500 font-medium"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-500 font-medium"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-500 font-medium"
                        placeholder="Phone"
                      />
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className={`w-full px-5 py-4 border border-gray-300 bg-transparent focus:outline-none focus:border-[#EAB308] appearance-none transition-colors font-medium ${formData.service ? 'text-gray-900' : 'text-gray-500'}`}
                        >
                          <option value="" disabled>Select Service</option>
                          <option value="corporate">Corporate Compliance</option>
                          <option value="ip-law">Intellectual Property Law</option>
                        </select>
                        <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                    </div>
                    
                    <textarea
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 border border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-[#EAB308] transition-colors placeholder-gray-500 font-medium"
                      placeholder="Write a Message"
                    />

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center gap-2 font-bold px-8 py-4 text-white transition-all ${
                          isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#EAB308] hover:bg-yellow-600"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>Request Consultation <FiArrowRight className="ml-1" /></>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <FiCheckCircle className="text-[#EAB308] text-6xl mb-6 animate-bounce" />
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      Request Successfully Submitted!
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4 max-w-sm mx-auto">
                      Thank you for contacting us. A senior IP consultant has been assigned to your request and will follow up with you within 4 business hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-[#EAB308] font-bold hover:underline"
                    >
                      Submit Another Consultation Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full h-[500px]"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2536838321683!2d-73.97962452345097!3d40.75646193489871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fe32f62cb9%3A0x6b77242ba43ce814!2s636%205th%20Ave%2C%20New%20York%2C%20NY%2010020%2C%20USA!5e0!3m2!1sen!2sus!4v1716664951460!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.section>

    </div>
  );
}
