"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Intel Trademark — Brand Logo
 *
 * variant="light"  → used on white/light backgrounds  (Navbar)
 * variant="dark"   → used on dark navy backgrounds     (Footer)
 */
export function IntelTrademarkLogo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* ── Shield Icon Mark ───────────────────────────────── */}
      <motion.div
        className="relative flex-shrink-0"
        whileHover={{ scale: 1.07 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      >
        <svg
          viewBox="0 0 44 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="46"
          aria-label="Intel Trademark shield logo"
        >
          {/* ── Drop shadow filter ── */}
          <defs>
            <filter id="shield-shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow
                dx="0" dy="3" stdDeviation="3"
                floodColor={isDark ? "#EAB30840" : "#12194340"}
              />
            </filter>
          </defs>

          {/* ── Shield body ── */}
          <path
            d="M22 2L2 10V26C2 38.5 11 47.5 22 50C33 47.5 42 38.5 42 26V10L22 2Z"
            fill={isDark ? "#EAB308" : "#121943"}
            filter="url(#shield-shadow)"
          />

          {/* ── Top accent band ── */}
          <path
            d="M22 2L2 10V15.5L22 8L42 15.5V10L22 2Z"
            fill={isDark ? "rgba(255,255,255,0.22)" : "#EAB308"}
          />

          {/* ── Column / Pillar icon (law symbol) ── */}
          {/* Entablature / top cap */}
          <rect
            x="12" y="20" width="20" height="4.5"
            rx="1.2"
            fill={isDark ? "#121943" : "white"}
          />
          {/* Column shaft */}
          <rect
            x="18.5" y="24.5" width="7" height="13"
            rx="1"
            fill={isDark ? "#121943" : "white"}
          />
          {/* Stylus / sub-lines on shaft */}
          <rect
            x="18.5" y="27.5" width="7" height="1"
            rx="0.5"
            fill={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)"}
          />
          <rect
            x="18.5" y="30.5" width="7" height="1"
            rx="0.5"
            fill={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)"}
          />
          <rect
            x="18.5" y="33.5" width="7" height="1"
            rx="0.5"
            fill={isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)"}
          />
          {/* Stylobate / base */}
          <rect
            x="12" y="37.5" width="20" height="4.5"
            rx="1.2"
            fill={isDark ? "#121943" : "white"}
          />

          {/* ── ™ badge dot (light variant only) ── */}
          {!isDark && (
            <>
              <circle cx="36" cy="15" r="5" fill="#EAB308" />
              {/* TM text as simple paths */}
              {/* T */}
              <rect x="32.4" y="12.8" width="2.6" height="1.1" rx="0.3" fill="white" />
              <rect x="33.4" y="13.8" width="0.85" height="2.5" rx="0.3" fill="white" />
              {/* M */}
              <rect x="35.5" y="12.8" width="0.75" height="3.6" rx="0.3" fill="white" />
              <rect x="35.5" y="12.8" width="2.5" height="0.75" rx="0.3" fill="white" />
              <rect x="37.2" y="12.8" width="0.75" height="3.6" rx="0.3" fill="white" />
              <path d="M35.5 12.8 L36.75 14.5 L38 12.8" stroke="white" strokeWidth="0.7" fill="none" strokeLinejoin="round" />
            </>
          )}
        </svg>
      </motion.div>

      {/* ── Wordmark ─────────────────────────────────────── */}
      <div className="flex flex-col leading-none select-none">
        {/* Brand name */}
        <span
          className={`text-[20px] font-black tracking-[0.06em] uppercase leading-none ${
            isDark ? "text-white" : "text-[#121943]"
          }`}
        >
          Intel
        </span>

        {/* Yellow rule separator */}
        <span
          className="block h-[2px] rounded-full my-[4px]"
          style={{
            background: "linear-gradient(90deg, #EAB308 60%, transparent 100%)",
            width: "100%",
          }}
        />

        {/* Subtitle */}
        <span
          className="text-[8.5px] font-extrabold tracking-[0.28em] uppercase"
          style={{ color: "#EAB308" }}
        >
          Trademark
        </span>
      </div>
    </Link>
  );
}
