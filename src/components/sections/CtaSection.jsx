'use client';

import React from 'react';
import { ctaData } from '@/data/ctaData';

export default function CtaSection() {
  const topAvatars = [
    '/images/cta-img-4.png',
    '/images/cta-img-5.png',
    '/images/cta-img-6.png',
    '/images/cta-img-7.png',
  ];

  return (
    <section
      id="cta"
      className="relative w-full bg-[#0D1017] text-white pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-28 px-5 sm:px-8 lg:px-12 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col items-center">
        {/* Top 4 Cyber-portraits Row */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 select-none">
          {topAvatars.map((avatar, idx) => (
            <figure
              key={idx}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 overflow-hidden shadow-lg shrink-0 m-0"
            >
              <img
                src={avatar}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* Row 1: Turn clicks [pill image] Into customers */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 mb-2 select-none">
          <h2 className="font-instrument text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-normal leading-[1.08] text-white tracking-tight">
            Turn clicks
          </h2>
          <div className="h-9 sm:h-12 md:h-13 lg:h-14 inline-flex items-center">
            <img
              src="/images/cta-img-8.png"
              alt=""
              className="w-[72px] sm:w-[88px] h-[44px] sm:h-[52px] object-cover rounded-full shadow-md"
              loading="lazy"
            />
          </div>
          <h2 className="font-instrument text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-normal leading-[1.08] text-white tracking-tight">
            Into customers
          </h2>
        </div>

        {/* Row 2: [pill image] the smarter way */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 mb-6 sm:mb-8 select-none">
          <div className="h-9 sm:h-12 md:h-13 lg:h-14 inline-flex items-center">
            <img
              src="/images/cta-img-9.png"
              alt=""
              className="w-[40px] sm:w-[48px] h-[40px] sm:h-[48px] object-cover rounded-xl shadow-md"
              loading="lazy"
            />
          </div>
          <h2 className="font-instrument text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-normal leading-[1.08] text-white tracking-tight">
            the smarter way
          </h2>
        </div>

        {/* Subtitle */}
        <p className="font-inter-tight text-[15px] sm:text-[17px] text-white/60 max-w-[560px] mb-8 sm:mb-10 leading-relaxed">
          {ctaData.description}
        </p>

        {/* CTA Button */}
        <div className="relative z-10 mb-2">
          <a
            href={ctaData.button?.href || '#contact'}
            className="group bg-white hover:bg-white/90 text-[#0D0D12] font-ibm-plex-mono text-sm font-medium rounded-full py-3.5 px-7 flex items-center justify-center gap-3 transition-all select-none shadow-xl cursor-pointer"
          >
            <span>{ctaData.button?.text || 'Book a strategy call'}</span>
            <span className="w-5 h-5 rounded-full bg-[#0D0D12] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Hand-drawn Curving Arrow & "No sign up required" SVG */}
        <div className="w-full max-w-[1240px] pointer-events-none select-none flex justify-center -mt-2">
          <img
            src="/images/cta-img-10.svg"
            alt="No sign up required"
            className="w-full max-w-[900px] sm:max-w-[1100px] lg:max-w-[1240px] h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
