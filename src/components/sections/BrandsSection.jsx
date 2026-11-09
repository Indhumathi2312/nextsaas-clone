import React from 'react';
import { brandsData } from '@/data/brandsData';

export default function BrandsSection() {
  return (
    <section className="relative w-full bg-white text-[#11141D] pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 px-4 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto flex flex-col items-center text-center">
        {/* Badge: ✦ Our clients */}
        <div className="flex items-center justify-center gap-2 select-none">
          <img
            src={brandsData.starIcon}
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
          <span className="font-inter-tight text-[#64748B] text-[13px] font-medium tracking-wide">
            {brandsData.badge}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-instrument text-[34px] sm:text-[44px] md:text-[50px] font-normal text-[#11141D] leading-[1.14] text-center max-w-[880px] mx-auto mt-3 select-none">
          {brandsData.heading.line1}
          <br className="hidden sm:inline" />{' '}
          {brandsData.heading.line2}
        </h2>

        {/* Subtitle */}
        <p className="font-inter-tight text-[#6B7280] text-[14.5px] sm:text-[15.5px] text-center max-w-[620px] mx-auto mt-3 mb-10 sm:mb-12 px-2 select-none">
          {brandsData.subtext}
        </p>

        {/* Logos Row 1 (8 Brands) */}
        <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-9 md:gap-11 lg:gap-12 max-w-[1140px] mx-auto">
          {brandsData.row1Brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-[20px] sm:h-[24px] md:h-[26px] w-auto max-w-[120px] sm:max-w-[140px] object-contain select-none"
              />
            </div>
          ))}
        </div>

        {/* Logos Row 2 (3 Brands) */}
        <div className="w-full flex flex-wrap items-center justify-center gap-8 sm:gap-11 md:gap-14 max-w-[640px] mx-auto mt-7 sm:mt-9">
          {brandsData.row2Brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-[18px] sm:h-[22px] md:h-[24px] w-auto max-w-[140px] sm:max-w-[170px] object-contain select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
