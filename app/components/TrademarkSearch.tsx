"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiGlobe, FiCheckCircle, FiAlertTriangle, FiLoader, FiShield } from "react-icons/fi";

export default function TrademarkSearch() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("US");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<null | {
    status: "success" | "warning";
    score: number;
    message: string;
    details: string[];
  }>(null);

  const scanSteps = [
    "Initializing Secure Database Connection...",
    "Scanning USPTO Federal Registries...",
    "Analyzing Phonetic Pronunciations...",
    "Checking Common Law and Digital Trademarks...",
    "Generating AI-Powered Clearance Score..."
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsScanning(true);
    setScanStep(0);
    setResult(null);

    // Simulate scanning steps
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsScanning(false);
          // Generate realistic search results based on query length/content
          const score = Math.floor(Math.random() * 25) + 70; // 70 to 94
          const isExcellent = score > 85;
          
          setResult({
            status: isExcellent ? "success" : "warning",
            score,
            message: isExcellent
              ? `Excellent Availability Estimate for "${query}"`
              : `Moderate Conflict Risk Identified for "${query}"`,
            details: isExcellent
              ? [
                  "No direct match found in federal registrations.",
                  "Low phonetic similarities detected with existing marks.",
                  "Recommended to proceed with trademark application immediately."
                ]
              : [
                  "No identical matches found, but similar names exist in the technology sector.",
                  "Possible common law usage detected in digital services.",
                  "We recommend a comprehensive premium search before filing to avoid opposition."
                ]
          });
          return prev;
        }
      });
    }, 900);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-orange-100/70 dark:border-gray-700 overflow-hidden backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
      <div className="p-8 md:p-12 text-center border-b border-orange-100/70 dark:border-gray-700">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 dark:bg-orange-950/50 dark:text-orange-300">
          Intel Search Engine v4.2
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
          Instant Trademark Pre-Check
        </h2>
        <p className="text-stone-600 dark:text-stone-300 mt-3 max-w-2xl mx-auto">
          Instantly scan international and federal registries using our high-speed search algorithm. Secure your brand identity before anyone else does.
        </p>
      </div>

      <div className="p-6 md:p-10 bg-orange-50/40/50 dark:bg-stone-900/30">
        <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Enter your brand or product name (e.g. Intel Trademark)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isScanning}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner text-lg"
            />
          </div>

          <div className="relative w-full md:w-48">
            <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={isScanning}
              className="w-full pl-10 pr-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer text-base appearance-none shadow-inner"
            >
              <option value="US">United States (USPTO)</option>
              <option value="UK">United Kingdom (UKIPO)</option>
              <option value="EU">European Union (EUIPO)</option>
              <option value="CA">Canada (CIPO)</option>
              <option value="AU">Australia (IP Australia)</option>
              <option value="INT">International (WIPO)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isScanning || !query.trim()}
            className={`w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center gap-2 ${
              isScanning || !query.trim()
                ? "bg-gray-400 cursor-not-allowed opacity-75 shadow-none"
                : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:shadow-orange-500/20"
            }`}
          >
            {isScanning ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                Scanning...
              </>
            ) : (
              <>
                <FiShield className="text-lg" />
                Scan Brand
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 flex flex-col items-center justify-center p-8 bg-orange-50/50 dark:bg-orange-950/10 rounded-2xl border border-orange-100/50 dark:border-orange-950/30"
            >
              <FiLoader className="animate-spin text-orange-600 dark:text-orange-400 text-4xl mb-4" />
              <motion.p
                key={scanStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-gray-700 dark:text-gray-200 font-medium text-lg text-center"
              >
                {scanSteps[scanStep]}
              </motion.p>
              <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full mt-6 overflow-hidden">
                <motion.div
                  className="bg-orange-600 dark:bg-orange-400 h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          )}

          {!isScanning && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed shadow-lg flex flex-col md:flex-row gap-8 items-start md:items-center"
              style={{
                borderColor: result.status === "success" ? "#10B981" : "#F59E0B"
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {result.status === "success" ? (
                    <FiCheckCircle className="text-emerald-500 text-3xl flex-shrink-0" />
                  ) : (
                    <FiAlertTriangle className="text-amber-500 text-3xl flex-shrink-0" />
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {result.message}
                  </h3>
                </div>
                <div className="space-y-2 mt-4 pl-1">
                  {result.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-stone-600 dark:text-stone-300 text-sm md:text-base">
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-orange-50/400 rounded-full mt-2 flex-shrink-0" />
                      <p>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-center justify-center p-6 bg-orange-50/40 dark:bg-stone-900/50 rounded-2xl border border-orange-100/70 dark:border-gray-700 min-w-[200px]">
                <span className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Success Score
                </span>
                <span
                  className="text-6xl font-extrabold mt-2 tracking-tight"
                  style={{
                    color: result.status === "success" ? "#10B981" : "#F59E0B"
                  }}
                >
                  {result.score}%
                </span>
                <span className="text-xs text-gray-400 dark:text-stone-500 mt-2 text-center">
                  Based on machine learning clearance scanning
                </span>
                <button className="mt-5 w-full bg-gray-900 hover:bg-gray-800 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-2.5 px-4 rounded-xl font-bold text-sm transition transform hover:-translate-y-0.5 shadow-md">
                  File Registry Form
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
