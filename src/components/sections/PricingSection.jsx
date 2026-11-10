import React from 'react';
import { pricingData } from '@/data/pricingData';

function renderValue(val) {
  if (val === true) {
    return (
      <svg
        className="w-5 h-5 text-white/90 inline-block"
        viewBox="0 0 16 16"
        fill="none"
        aria-label="Included"
      >
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (!val) {
    return null;
  }
  return (
    <span className="font-inter-tight text-white/90 text-[15px] sm:text-[16px] font-normal leading-[24px]">
      {val}
    </span>
  );
}

export default function PricingSection() {
  const { plans, blocks } = pricingData;

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#11141D] text-white pt-16 sm:pt-24 lg:pt-[120px] pb-16 sm:pb-24 lg:pb-[140px] px-5 sm:px-8 lg:px-12 -mb-[2px] overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full max-w-[800px] mx-auto flex flex-col items-center text-center mb-12 sm:mb-16">
        <h2 className="font-instrument text-[38px] sm:text-[46px] lg:text-[52px] font-normal leading-[1.12] text-white mb-3">
          {pricingData.heading}
        </h2>
        <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal leading-[24px] text-white/60">
          {pricingData.badge}
        </p>
      </div>

      {/* Comparison Table Card Container */}
      <div className="w-full max-w-[1240px] mx-auto rounded-[24px] border border-white/[0.08] bg-[#0F1219] p-8 sm:p-12 lg:p-14">
        {/* Top Cards Row: 3 Columns with gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 w-full mb-12 sm:mb-16">
          {/* Col 1: Empty Spacer */}
          <div className="hidden md:block" aria-hidden="true" />

          {/* Col 2: Basic Card */}
          <div className="bg-[#090B0F] rounded-2xl p-8 flex flex-col justify-between space-y-7">
            <div>
              <p className="font-inter-tight text-white/70 text-sm font-normal mb-4">
                {plans.basic.name}
              </p>
              <div>
                <h3 className="font-instrument text-[44px] lg:text-[48px] font-normal text-white/90 leading-none mb-2">
                  {plans.basic.price}
                </h3>
                <p className="font-inter-tight text-white/60 text-xs font-normal max-w-[180px] leading-relaxed">
                  {plans.basic.description}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="group bg-white text-black font-medium text-[13px] rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:bg-white/90 transition-all select-none"
            >
              <span>{plans.basic.ctaText}</span>
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 16 16" fill="none">
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

          {/* Col 3: Enterprise Card */}
          <div className="bg-[#090B0F] rounded-2xl p-8 flex flex-col justify-between space-y-7">
            <div>
              <p className="font-inter-tight text-white/70 text-sm font-normal mb-4">
                {plans.enterprise.name}
              </p>
              <div>
                <h3 className="font-instrument text-[44px] lg:text-[48px] font-normal text-white/90 leading-none mb-2">
                  {plans.enterprise.price}
                </h3>
                <p className="font-inter-tight text-white/60 text-xs font-normal max-w-[180px] leading-relaxed">
                  {plans.enterprise.description}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="group bg-white text-black font-medium text-[13px] rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:bg-white/90 transition-all select-none"
            >
              <span>{plans.enterprise.ctaText}</span>
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 16 16" fill="none">
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
        </div>

        {/* Feature Comparison Blocks */}
        <div className="w-full">
          {blocks.map((block, bIdx) => (
            <div
              key={block.id}
              className={`w-full ${bIdx < blocks.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
            >
              {block.rows.map((row, rIdx) => (
                <div
                  key={rIdx}
                  className="grid grid-cols-3 w-full items-stretch"
                >
                  {/* Feature Name */}
                  <div className="border-r border-white/[0.06] pr-4 md:pr-6 py-4 flex items-center">
                    <span className="font-inter-tight text-white/90 font-normal text-[15px] sm:text-[16px] leading-[24px]">
                      {row.name}
                    </span>
                  </div>

                  {/* Basic Value */}
                  <div className="border-r border-white/[0.06] px-4 md:px-6 py-4 flex items-center justify-center text-center">
                    {renderValue(row.basic)}
                  </div>

                  {/* Enterprise Value */}
                  <div className="px-4 md:px-6 py-4 flex items-center justify-center text-center">
                    {renderValue(row.enterprise)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
