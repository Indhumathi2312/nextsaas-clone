'use client';

import React, { useState, useEffect, useRef } from 'react';
import { aboutData } from '@/data/aboutData';

export default function AboutSection() {
  // Start with index 1 (opai-img-168.jpg) to match the exact design benchmark
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const slides = aboutData.slides;

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
  const nextIndex = (activeIndex + 1) % slides.length;

  return (
    <section
      id="about"
      className="relative w-full bg-[#11141D] text-white pt-12 pb-24 sm:pb-32 overflow-hidden -mb-[2px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Decorative Avatar Bar with Thin Subtle Divider Lines */}
      <div className="w-full max-w-[1290px] mx-auto px-5 mb-14 flex items-center justify-center select-none">
        <div className="flex-1 h-[1px] bg-white/10" />

        <div className="flex items-center gap-4 sm:gap-5 px-5 sm:px-6">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
            <img
              src={aboutData.avatar1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <img
            src={aboutData.circleRing}
            alt=""
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain animate-spin-slow shrink-0"
          />

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
            <img
              src={aboutData.avatar2}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      {/* Section Header */}
      <div className="w-full max-w-[800px] mx-auto px-5 flex flex-col items-center text-center mb-12 sm:mb-16">
        {/* Pill Badge */}
        <div className="flex items-center justify-center gap-1.5 mb-5 select-none">
          <img
            src={aboutData.starIcon}
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
          <p className="font-inter-tight text-[12px] font-normal leading-[18px] text-white/50 tracking-normal">
            {aboutData.badge}
          </p>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-instrument text-[38px] sm:text-[48px] md:text-[56px] font-normal leading-[1.08] mb-5 tracking-tight text-white">
          {aboutData.heading.main}{' '}
          <span className="text-white/35">{aboutData.heading.muted1}</span>
          <br />
          <span className="text-white/35">{aboutData.heading.muted2}</span>
        </h2>

        {/* Subtitle */}
        <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal leading-[24px] text-white/60 max-w-[620px]">
          {aboutData.description}
        </p>
      </div>

      {/* 3D Centered Carousel Showcase */}
      <div className="relative w-full overflow-hidden flex items-center justify-center py-4 select-none">
        {/* Outer Edge Fade Gradient Masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#11141D] to-transparent z-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#11141D] to-transparent z-30"
          aria-hidden="true"
        />

        {/* 3-Card Interactive Track */}
        <div className="flex items-center justify-center gap-5 sm:gap-8 px-4">
          {/* Previous Slide (Left - Dimmed) */}
          <div
            onClick={() => setActiveIndex(prevIndex)}
            className="shrink-0 w-[260px] sm:w-[340px] md:w-[400px] h-[390px] sm:h-[500px] md:h-[580px] rounded-2xl overflow-hidden opacity-35 filter brightness-50 blur-[1.5px] scale-[0.92] transition-all duration-700 ease-out cursor-pointer hover:opacity-60 z-10"
            title="Click to view previous slide"
          >
            <img
              src={slides[prevIndex].src}
              alt={slides[prevIndex].alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Active Center Slide (Full Focus) */}
          <div className="shrink-0 w-[300px] sm:w-[380px] md:w-[440px] h-[450px] sm:h-[550px] md:h-[640px] rounded-2xl overflow-hidden opacity-100 filter-none scale-100 shadow-2xl transition-all duration-700 ease-out z-20">
            <img
              src={slides[activeIndex].src}
              alt={slides[activeIndex].alt}
              className="w-full h-full object-cover"
              priority="true"
            />
          </div>

          {/* Next Slide (Right - Dimmed) */}
          <div
            onClick={() => setActiveIndex(nextIndex)}
            className="shrink-0 w-[260px] sm:w-[340px] md:w-[400px] h-[390px] sm:h-[500px] md:h-[580px] rounded-2xl overflow-hidden opacity-35 filter brightness-50 blur-[1.5px] scale-[0.92] transition-all duration-700 ease-out cursor-pointer hover:opacity-60 z-10"
            title="Click to view next slide"
          >
            <img
              src={slides[nextIndex].src}
              alt={slides[nextIndex].alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
