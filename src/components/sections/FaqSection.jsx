'use client';

import React, { useState } from 'react';
import { faqData } from '@/data/faqData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1); // Matching screenshot 1 where all 8 items start collapsed with subtle down chevrons

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-white text-[#0D0D12] py-20 sm:py-28 lg:py-[120px] px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
        {/* Left Column: Heading, Subtitle & Graphic */}
        <div className="w-full lg:w-[46%] flex flex-col items-start select-none">
          {/* Pill Badge */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src={faqData.starIcon}
              alt=""
              className="w-3.5 h-3.5 object-contain"
            />
            <span className="font-inter-tight text-[#0D0D1299] text-xs sm:text-[13px] font-normal tracking-wide">
              {faqData.badge}
            </span>
          </div>

          <h2 className="font-instrument text-[38px] sm:text-[46px] lg:text-[54px] font-normal leading-[1.12] text-[#0D0D12] mb-4">
            {faqData.heading}
          </h2>

          <p className="font-inter-tight text-[#0D0D1299] text-[15px] sm:text-[16px] leading-relaxed mb-8 max-w-[480px]">
            {faqData.description}
          </p>

          {/* Left Illustration */}
          {faqData.image && (
            <div className="w-full max-w-[440px] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={faqData.image}
                alt="FAQ Illustration"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Right Column: 8 Border-Separated Accordion Items (matches screenshot exactly) */}
        <div className="w-full lg:w-[50%] flex flex-col">
          {faqData.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="w-full border-b border-[#E5E7EB] first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between py-4 sm:py-5 text-left gap-4 cursor-pointer group"
                >
                  <span
                    className={`font-inter-tight text-[17px] sm:text-[18px] font-medium leading-[24px] transition-colors ${
                      isOpen ? 'text-[#0D0D12]' : 'text-[#0D0D12]/80 group-hover:text-[#0D0D12]'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 text-[#0D0D1280] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0D0D12]' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width="15"
                      height="15"
                    >
                      <path
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-5 font-inter-tight text-[15px] sm:text-[16px] text-[#0D0D12]/70 leading-[24px]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
