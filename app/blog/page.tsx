"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { FiHome, FiUser, FiMessageCircle, FiChevronRight, FiCalendar } from "react-icons/fi";
import Link from "next/link";
import { blogPosts } from "./posts";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const pagePosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function goTo(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-white">

      {/* ════════════════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════════════════ */}
      <section className="relative h-64 md:h-80 bg-[#121943] flex items-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/our_story_team.png"
            alt=""
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#121943]/70" />
        </div>

        {/* Yellow glow blob */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full bg-[#EAB308] opacity-[0.06] blur-[90px] pointer-events-none" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Triangle tab */}
        <motion.div
          className="absolute top-0 left-24 w-0 h-0"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: "26px solid white",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-8 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Our Blog
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2 text-gray-300 text-sm font-medium"
          >
            <FiHome className="text-gray-400 text-sm" />
            <Link href="/" className="hover:text-[#EAB308] transition-colors duration-200">
              Home
            </Link>
            <FiChevronRight className="text-gray-500 text-xs" />
            <span className="text-white font-bold">Our Blog</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURED POST (first post, full-width)
      ════════════════════════════════════════════════ */}
      {currentPage === 1 && (
        <section className="max-w-[90rem] mx-auto px-4 md:px-8 pt-14 pb-0">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="group grid grid-cols-1 lg:grid-cols-2 border border-gray-100 shadow-sm overflow-hidden bg-white"
          >
            {/* Image */}
            <div className="relative h-60 sm:h-72 lg:h-auto overflow-hidden bg-gray-100">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Date badge */}
              <div className="absolute bottom-0 left-6 flex flex-col">
                <div className="bg-[#121943] text-white text-center px-5 py-2 shadow-lg">
                  <span className="text-4xl font-extrabold block leading-tight">{blogPosts[0].day}</span>
                </div>
                <div className="bg-[#EAB308] text-white text-center py-1.5 px-5 text-[10px] font-bold uppercase tracking-widest">
                  {blogPosts[0].month}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <span className="inline-block bg-[#EAB308] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4 w-fit">
                {blogPosts[0].category}
              </span>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <FiUser className="text-[#EAB308] text-xs" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-[#EAB308] text-xs" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMessageCircle className="text-[#EAB308] text-xs" />
                  {blogPosts[0].comments}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200 leading-snug mb-4">
                {blogPosts[0].title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {blogPosts[0].excerpt}
              </p>

              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#121943] text-white text-sm font-bold px-6 py-3 hover:bg-[#EAB308] transition-colors duration-200"
                >
                  Read Full Article <FiChevronRight />
                </Link>
              </motion.div>
            </div>
          </motion.article>
        </section>
      )}

      {/* ════════════════════════════════════════════════
          BLOG GRID
      ════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[#EAB308] text-xs font-bold uppercase tracking-[0.25em]">
              {currentPage === 1 ? "More Articles" : `Page ${currentPage}`}
            </span>
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs font-medium">
              {blogPosts.length} Posts Total
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 16, transition: { duration: 0.22 } }}
            >
              {/* On page 1, skip the featured post (index 0) — show [1..5] */}
              {(currentPage === 1 ? pagePosts.slice(1) : pagePosts).map((post, idx) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="bg-white border border-gray-100 shadow-sm group overflow-hidden cursor-pointer flex flex-col"
                  style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Date badge */}
                    <div className="absolute bottom-0 right-6 flex flex-col z-10">
                      <div className="bg-[#121943] text-white text-center px-4 py-1.5 shadow-lg">
                        <span className="text-3xl font-extrabold block leading-tight">{post.day}</span>
                      </div>
                      <div className="bg-[#EAB308] text-white text-center py-1 px-4 text-[9px] font-bold uppercase tracking-widest">
                        {post.month}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category */}
                    <span className="inline-block text-[#EAB308] text-[10px] font-bold uppercase tracking-widest mb-3">
                      {post.category}
                    </span>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <FiUser className="text-[#EAB308] text-xs" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMessageCircle className="text-[#EAB308] text-xs" />
                        {post.comments}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200 leading-snug mb-3 flex-1 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-100 pt-4">
                      <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-[#EAB308] font-bold text-xs border-b border-[#EAB308] pb-0.5 w-fit hover:gap-2 transition-all duration-200"
                        >
                          Read More <FiChevronRight className="text-sm" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Pagination ──────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-14 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => goTo(page)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  className={`w-11 h-11 rounded-full font-bold text-sm transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-[#EAB308] text-white shadow-md shadow-yellow-400/30"
                      : "border-2 border-gray-300 text-gray-600 hover:border-[#EAB308] hover:text-[#EAB308] bg-white"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
              <motion.button
                onClick={() => goTo(Math.min(currentPage + 1, totalPages))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                disabled={currentPage === totalPages}
                className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#EAB308] hover:text-[#EAB308] transition-colors duration-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronRight className="text-lg" />
              </motion.button>
            </div>
          )}

        </div>
      </section>


    </div>
  );
}
