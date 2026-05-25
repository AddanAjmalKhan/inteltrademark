"use client";

import React, { useState } from "react";
import { FiSearch, FiClock, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      title: "Hello world!",
      excerpt: "Welcome to the official Global Trademark Office strategy board. We deliver structural security and legal guidelines to ensure commercial innovations remain entirely yours.",
      category: "General",
      date: "May 25, 2026",
      readTime: "1 min read"
    },
    {
      title: "Patent War: Iconic Legal Battles That Protect Shaped lead.",
      excerpt: "Analyze historical tech giants disputes and courtroom patent war cases that established critical design patent boundaries and changed technological development paths.",
      category: "Patent Strategy",
      date: "May 22, 2026",
      readTime: "8 min read"
    },
    {
      title: "Code Clash: The Algorithms That Sparked Courtroom Chaos",
      excerpt: "Are proprietary programming codes and software algorithms copyrightable or patentable? We explore recent courtroom rulings and the legal limits of digital protections.",
      category: "Software IP",
      date: "May 09, 2026",
      readTime: "6 min read"
    },
    {
      title: "Design Duel: Icons, Interfaces, and Intellectual Property",
      excerpt: "Safeguard your mobile and web application UI designs. Discover the legal frameworks protecting graphics, layouts, and interactive user experiences.",
      category: "Brand Protection",
      date: "Apr 25, 2026",
      readTime: "5 min read"
    }
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-stone-950 transition-colors duration-300">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-orange-50/60 to-white dark:from-gray-900/50 dark:to-gray-950 relative overflow-hidden border-b border-orange-100/70 dark:border-stone-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full">
            Home &gt; Our Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-6 tracking-tight leading-tight capitalize">
            Our Blog
          </h1>

          {/* Search Input */}
          <div className="mt-10 max-w-md mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search strategy, patents, code clash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-250 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {filteredPosts.map((post, idx) => (
                <article
                  key={idx}
                  className="bg-white dark:bg-stone-900 rounded-3xl border border-orange-100/70 dark:border-stone-800/80 p-8 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 mb-6">
                      {post.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mt-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-orange-100 dark:border-stone-800/60 flex items-center justify-between text-xs text-gray-400">
                    <span className="font-bold text-gray-900 dark:text-white">{post.date}</span>
                    <span className="flex items-center gap-1 font-semibold">
                      <FiClock /> {post.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 dark:text-stone-400 text-lg">No articles found matching your query.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
