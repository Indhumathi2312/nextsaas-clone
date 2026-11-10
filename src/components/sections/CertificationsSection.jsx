'use client';

import React, { useState } from 'react';
import { certificationsData } from '@/data/certificationsData';

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { badge, heading, description, partners } = certificationsData;

  return (
    <section
      id="certifications"
      className="relative w-full bg-white text-black pt-20 sm:pt-28 lg:pt-[120px] pb-20 sm:pb-28 lg:pb-[140px] px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full max-w-[800px] mx-auto flex flex-col items-center text-center mb-12 sm:mb-16">
        <p className="font-inter-tight text-xs sm:text-[13px] font-normal text-black/60 tracking-wider mb-3">
          {badge}
        </p>
        <h2 className="font-instrument text-[40px] sm:text-[48px] lg:text-[54px] font-normal leading-[1.12] text-black mb-3">
          {heading}
        </h2>
        <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal text-zinc-600 leading-relaxed max-w-[680px]">
          {description}
        </p>
      </div>

      {/* Expandable Accordion Card Deck (matches nextsaas_expand_card) */}
      <div className="w-full max-w-[1240px] mx-auto rounded-[20px] bg-[#0E1117] overflow-hidden border border-[rgba(223,228,235,0.08)] flex flex-col lg:flex-row min-h-[420px] lg:min-h-[350px]">
        {partners.map((partner, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={partner.id || idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-8 sm:p-10 lg:p-11 border-b lg:border-b-0 lg:border-r border-[rgba(223,228,235,0.08)] last:border-0 ${
                isActive
                  ? 'lg:flex-[2.4] bg-[#0E1117]'
                  : 'lg:flex-1 bg-[#0E1117] hover:bg-[#131720]'
              }`}
            >
              {/* Purple Glow when active */}
              {isActive && (
                <div
                  className="pointer-events-none absolute top-1/2 -left-[30%] -translate-y-1/2 w-[480px] h-[260px] rounded-full bg-[#B962E7]/40 blur-[90px] select-none z-0"
                  aria-hidden="true"
                />
              )}

              {/* Card Inner Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Logo Figure */}
                <figure className="w-[52px] h-[52px] rounded-xl bg-white p-2.5 flex items-center justify-center shadow-sm select-none">
                  <img
                    src={partner.logo}
                    alt={partner.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </figure>

                {/* Content Area */}
                {isActive ? (
                  <div className="flex items-start justify-between gap-6 mt-8">
                    <div>
                      <h3 className="font-instrument text-[26px] sm:text-[28px] font-normal text-white leading-tight mb-3">
                        {partner.title}
                      </h3>
                      <p className="font-inter-tight text-[14px] sm:text-[15px] font-normal text-white/60 leading-relaxed max-w-[480px]">
                        {partner.description}
                      </p>
                    </div>

                    <span
                      className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors shrink-0 pt-1"
                      aria-label="View Partner"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <div className="mt-8">
                    <h3 className="font-instrument text-[24px] sm:text-[26px] font-normal text-white leading-tight max-w-[170px]">
                      {partner.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
