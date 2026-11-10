import React from 'react';
import { processData } from '@/data/processData';

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full bg-[#11141D] text-white pt-16 sm:pt-24 lg:pt-[156px] pb-16 sm:pb-24 lg:pb-[156px] px-5 sm:px-8 lg:px-12 -mb-[2px] overflow-hidden"
    >
      <div className="w-full max-w-[1290px] mx-auto flex flex-col">
        {/* Top Pill Badge: ✦ Our process */}
        <div className="flex items-center gap-1.5 mb-5 select-none">
          <img
            src={processData.starIcon}
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
          <p className="font-inter-tight text-[12px] font-normal leading-[18px] text-white/50 tracking-normal">
            {processData.badge}
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-instrument text-[38px] sm:text-[46px] lg:text-[52px] font-normal leading-[1.12] text-white/90 mb-14 sm:mb-20 tracking-tight">
          {processData.heading}
        </h2>

        {/* 4 Clean Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          {processData.steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <span
                className="font-instrument text-[54px] sm:text-[62px] lg:text-[68px] font-normal leading-none mb-5 select-none text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, #FFFFFF 0%, rgba(18, 32, 31, 0) 100%)',
                }}
              >
                {step.number}
              </span>
              <h3 className="font-instrument text-[24px] sm:text-[26px] lg:text-[28px] font-normal leading-[1.3] text-white mb-3">
                {step.title}
              </h3>
              <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal leading-[24px] text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
