"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cubicBezier } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiMessageCircle,
  FiTag,
  FiArrowLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";
import { blogPosts, getPostBySlug } from "../posts";

const EASE = cubicBezier(0.22, 1, 0.36, 1);

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

export default function BlogPostPage() {
  /* ── resolve slug ─────────────────────────────── */
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post) notFound();

  /* ── sidebar: other posts ────────────────────── */
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-64 md:h-80 bg-[#121943] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[#121943]/70" />
        </div>

        {/* Yellow glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#EAB308] opacity-[0.06] blur-[80px] pointer-events-none" />

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
          {/* Category pill */}
          <motion.span
            {...fadeUp(0)}
            className="inline-block bg-[#EAB308] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3"
          >
            {post.category}
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight max-w-4xl"
          >
            {post.title}
          </motion.h1>

          {/* Breadcrumb + meta */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-wrap items-center gap-4 text-gray-300 text-sm font-medium"
          >
            <span className="flex items-center gap-1.5">
              <FiHome className="text-gray-400 text-sm" />
              <Link href="/" className="hover:text-[#EAB308] transition-colors">Home</Link>
            </span>
            <FiChevronRight className="text-gray-500 text-xs" />
            <Link href="/blog" className="hover:text-[#EAB308] transition-colors">Our Blog</Link>
            <FiChevronRight className="text-gray-500 text-xs" />
            <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT + SIDEBAR
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

            {/* ── ARTICLE ─────────────────────────────── */}
            <article className="flex-1 min-w-0">

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative overflow-hidden mb-8"
                style={{ aspectRatio: "16/7" }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {/* Date badge */}
                <div className="absolute bottom-0 left-6 flex flex-col">
                  <div className="bg-[#121943] text-white text-center px-5 py-2 shadow-lg">
                    <span className="text-3xl font-extrabold block leading-tight">{post.day}</span>
                  </div>
                  <div className="bg-[#EAB308] text-white text-center py-1.5 px-5 text-[10px] font-bold uppercase tracking-widest">
                    {post.month}
                  </div>
                </div>
              </motion.div>

              {/* Post meta bar */}
              <motion.div
                {...fadeUp(0.1)}
                className="flex flex-wrap items-center gap-5 mb-7 text-sm text-gray-500 font-medium border-b border-gray-100 pb-6"
              >
                <span className="flex items-center gap-1.5">
                  <FiUser className="text-[#EAB308]" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-[#EAB308]" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMessageCircle className="text-[#EAB308]" />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiTag className="text-[#EAB308]" />
                  {post.category}
                </span>
              </motion.div>

              {/* Intro paragraph */}
              <motion.p {...fadeUp(0.15)} className="text-gray-600 leading-relaxed text-base mb-8">
                {post.intro}
              </motion.p>

              {/* Pull quote */}
              <motion.blockquote
                {...fadeUp(0.2)}
                className="border-l-4 border-[#EAB308] bg-[#fafaf8] px-7 py-6 my-8"
              >
                <p className="text-gray-800 text-lg font-semibold italic leading-relaxed mb-3">
                  &ldquo;{post.quote.text}&rdquo;
                </p>
                <cite className="text-[#EAB308] font-bold text-sm not-italic">
                  — {post.quote.author}
                </cite>
              </motion.blockquote>

              {/* Body sections */}
              <div className="space-y-10">
                {post.sections.map((sec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                  >
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#121943] mb-4 leading-snug">
                      {sec.heading}
                    </h2>
                    <div className="space-y-4">
                      {sec.body.split("\n\n").map((para, j) => (
                        <p key={j} className="text-gray-600 leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Conclusion */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE }}
                className="mt-10 bg-[#121943] text-white px-7 py-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#EAB308] opacity-[0.07] blur-[50px]" />
                <h3 className="text-lg font-extrabold mb-3 text-[#EAB308] uppercase tracking-wide">
                  Conclusion
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm relative z-10">
                  {post.conclusion}
                </p>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-8 flex flex-wrap gap-2 items-center"
              >
                <span className="text-gray-500 font-semibold text-sm mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 hover:bg-[#EAB308] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Back link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-10"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#121943] font-bold text-sm border-2 border-[#121943] px-5 py-3 hover:bg-[#121943] hover:text-white transition-all duration-200 group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to All Posts
                </Link>
              </motion.div>
            </article>

            {/* ── SIDEBAR ─────────────────────────────── */}
            <aside className="lg:w-72 xl:w-80 flex-shrink-0 space-y-8">

              {/* About box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="bg-[#121943] text-white p-6"
              >
                <h3 className="font-extrabold text-lg mb-1 text-[#EAB308] uppercase tracking-wide">About Us</h3>
                <div className="w-10 h-0.5 bg-[#EAB308] mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Intel Trademark is a full-service intellectual property law firm protecting innovations and brand identities across industries. Our attorneys bring deep technical expertise and litigation experience to every matter.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 mt-5 text-[#EAB308] font-bold text-sm hover:gap-2 transition-all duration-200"
                >
                  Learn More <FiChevronRight />
                </Link>
              </motion.div>

              {/* Recent posts */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="border border-gray-100 p-6"
              >
                <h3 className="font-extrabold text-lg text-[#121943] mb-1 uppercase tracking-wide">Recent Posts</h3>
                <div className="w-10 h-0.5 bg-[#EAB308] mb-5" />
                <ul className="space-y-4">
                  {related.map((p) => (
                    <li key={p.slug} className="flex gap-3 group">
                      <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-gray-100">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1">
                          {p.month}
                        </p>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="text-sm font-bold text-gray-900 group-hover:text-[#EAB308] transition-colors duration-200 leading-snug line-clamp-2 block"
                        >
                          {p.title}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tags cloud */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="border border-gray-100 p-6"
              >
                <h3 className="font-extrabold text-lg text-[#121943] mb-1 uppercase tracking-wide">Tags</h3>
                <div className="w-10 h-0.5 bg-[#EAB308] mb-5" />
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap((p) => p.tags))).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 hover:bg-[#EAB308] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                className="bg-[#EAB308] p-6 text-white text-center"
              >
                <p className="font-extrabold text-lg mb-2 leading-tight">Need Legal Advice?</p>
                <p className="text-yellow-100 text-sm mb-5">
                  Our IP attorneys are ready to protect your innovations.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-[#121943] text-white text-sm font-bold px-6 py-3 hover:bg-[#0a0f2b] transition-colors duration-200"
                >
                  Get a Free Consultation
                </Link>
              </motion.div>
            </aside>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MORE POSTS
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-2xl font-extrabold text-[#121943] mb-8"
          >
            More Articles
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 3).map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 shadow-sm overflow-hidden group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 right-4 flex flex-col">
                    <div className="bg-[#121943] text-white text-center px-4 py-1.5">
                      <span className="text-2xl font-extrabold block leading-tight">{p.day}</span>
                    </div>
                    <div className="bg-[#EAB308] text-white text-center py-1 px-4 text-[9px] font-bold uppercase tracking-widest">
                      {p.month}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] text-[#EAB308] font-bold uppercase tracking-widest">{p.category}</span>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#EAB308] transition-colors mt-1 mb-3 leading-snug line-clamp-2">
                    {p.title}
                  </h3>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="flex items-center gap-1 text-[#EAB308] font-bold text-xs hover:gap-2 transition-all duration-200"
                  >
                    Read More <FiChevronRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
