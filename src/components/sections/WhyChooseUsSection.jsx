import React from 'react';
import { whyChooseUsData } from '@/data/whyChooseUsData';

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative w-full bg-[#11141D] text-white pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-[156px] lg:pb-[156px] px-5 -mb-[2px] overflow-hidden"
    >
      {/* Background Decorative Scaled Gradient Graphic */}
      <div
        className="pointer-events-none absolute right-[10%] bottom-[-12%] sm:bottom-[-21%] lg:bottom-[-40%] z-0 select-none text-center transform scale-[1.4]"
        aria-hidden="true"
      >
        <img
          src={whyChooseUsData.gradientImage}
          alt=""
          className="w-full max-w-[2560px] h-auto"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1290px] mx-auto flex flex-col">
        {/* Top Header Row */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 sm:mb-[70px]">
          {/* Left Column: Badge & Heading */}
          <div className="flex flex-col items-start max-w-[640px]">
            {/* Pill Badge */}
            <div className="flex items-center gap-1.5 mb-6 select-none">
              <img
                src={whyChooseUsData.starIcon}
                alt=""
                className="w-4 h-4 object-contain"
              />
              <p className="font-inter-tight text-[12px] font-normal leading-[18px] text-white/50 tracking-normal">
                {whyChooseUsData.badge}
              </p>
            </div>

            {/* Editorial Serif Heading */}
            <h2 className="font-instrument text-[36px] sm:text-[44px] lg:text-[52px] font-normal leading-[1.15] text-white/90">
              {whyChooseUsData.heading}
            </h2>
          </div>

          {/* Right Column: Aligned Subtitle */}
          <div className="max-w-[420px] lg:text-right text-left self-start lg:self-end">
            <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal leading-[24px] text-white/60">
              {whyChooseUsData.description}
            </p>
          </div>
        </div>

        {/* 4 Architectural Stair Cards */}
        <div className="relative z-10 w-full rounded-lg border border-[rgba(223,228,235,0.11)] overflow-hidden bg-[#0F1217]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            {whyChooseUsData.cards.map((card, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === whyChooseUsData.cards.length - 1;

              return (
                <div
                  key={idx}
                  className={`group relative flex min-h-[430px] md:min-h-[471px] flex-col justify-between gap-2.5 overflow-hidden p-8 bg-[#0F1217] transition-colors duration-500 ease-in-out border-b md:border-b-0 md:border-r border-[rgba(223,228,235,0.11)] ${
                    isLast ? 'md:border-r-0 border-b-0' : ''
                  } ${isFirst ? 'lg:rounded-l-lg' : ''} ${
                    isLast ? 'lg:rounded-r-lg' : ''
                  }`}
                >
                  {/* Top Ambient Hover Glow Gradient */}
                  <div
                    className="pointer-events-none absolute -top-[16%] -right-[26%] z-0 h-[256px] w-[306px] -translate-y-[20%] rounded-[306px] opacity-0 blur-[50px] transition-all duration-500 ease-in-out select-none group-hover:translate-y-0 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(190deg, #744FB3 52%, #FF9C7B 93%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* 68px Shape Icon */}
                  <div className="relative z-10 text-white/80 transition-colors duration-500 ease-in-out group-hover:text-white">
                    <i
                      aria-hidden="true"
                      className={`ns ${card.iconClass}`}
                      style={{ fontSize: '68px', display: 'inline-block' }}
                    />
                  </div>

                  {/* Editorial Title */}
                  <h3 className="relative z-10 font-instrument text-[28px] font-normal leading-[38px] text-white/60 transition-colors duration-500 ease-in-out group-hover:text-white lg:max-w-[240px]">
                    {card.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
