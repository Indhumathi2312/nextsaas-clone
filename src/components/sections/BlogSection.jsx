'use client';

import React, { useState } from 'react';
import { blogData } from '@/data/blogData';

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(0); // Card 0 active by default, expands on hover like partnership deck
  const {
    badge,
    heading,
    headingHighlight,
    headingSub,
    description,
    starIcon,
    ctaButton,
    posts,
  } = blogData;

  return (
    <section
      id="blog"
      className="relative w-full bg-white text-black pt-20 sm:pt-28 lg:pt-[120px] pb-24 sm:pb-32 lg:pb-[140px] px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full max-w-[800px] mx-auto flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-2 mb-3 select-none">
          <img src={starIcon} alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="font-inter-tight text-xs sm:text-[13px] font-normal text-black/60 tracking-wider">
            {badge}
          </span>
        </div>

        <h2 className="font-instrument text-[40px] sm:text-[48px] lg:text-[54px] font-normal leading-[1.12] text-black mb-3">
          {heading}{' '}
          <span className="font-instrument text-black/40">
            {headingHighlight}
          </span>
          <br className="hidden sm:inline" />{' '}
          <span className="font-instrument text-black/40">
            {headingSub}
          </span>
        </h2>

        <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal text-zinc-600 leading-relaxed max-w-[680px]">
          {description}
        </p>
      </div>

      {/* 3 Blog Cards with Partnership Box Expand Movement */}
      <div className="w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-8 mb-12 sm:mb-16">
        {posts.map((post, idx) => {
          const isActive = activeBlog === idx;

          return (
            <article
              key={post.id}
              onMouseEnter={() => setActiveBlog(idx)}
              className={`group flex flex-col cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] w-full ${
                isActive
                  ? 'lg:flex-[1.55] lg:min-w-[360px]'
                  : 'lg:flex-1 lg:min-w-[280px]'
              }`}
            >
              {/* Image Figure */}
              <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[380px] overflow-hidden rounded-[16px] bg-zinc-100 mb-4 shadow-sm shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Meta Date */}
              <p className="font-inter-tight text-[13px] font-normal text-zinc-500 mb-2">
                {post.date}
              </p>

              {/* Tag Badges */}
              <div className="flex items-center gap-2 mb-3">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-inter-tight text-xs font-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Post Title with Animated Underline */}
              <h3 className="font-instrument text-[24px] sm:text-[26px] font-normal text-zinc-950 leading-snug">
                <span className="bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_1px] transition-[background-size] duration-500 pb-0.5 inline">
                  {post.title}
                </span>
              </h3>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full flex justify-center">
        <a
          href={ctaButton.href}
          className="group bg-[#0B0D13] hover:bg-black text-white font-inter-tight text-sm font-medium rounded-full py-3.5 px-7 flex items-center justify-center gap-2.5 transition-all select-none shadow-md"
        >
          <span>{ctaButton.text}</span>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
            <svg
              className="w-2.5 h-2.5 text-white"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
