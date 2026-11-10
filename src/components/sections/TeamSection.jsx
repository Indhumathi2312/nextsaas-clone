import React from 'react';
import { teamData } from '@/data/teamData';

export default function TeamSection() {
  const { badge, heading, description, starIcon, members } = teamData;

  return (
    <section
      id="team"
      className="relative w-full bg-[#11141D] text-white pt-20 sm:pt-28 lg:pt-[130px] pb-24 sm:pb-32 lg:pb-[140px] px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto flex flex-col items-center text-center px-4 mb-14 sm:mb-18">
        <div className="flex items-center justify-center gap-2 mb-3 select-none">
          <img src={starIcon} alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="font-inter-tight text-white/60 text-xs sm:text-[13px] font-normal leading-[18px]">
            {badge}
          </span>
        </div>

        <h2 className="font-instrument text-[38px] sm:text-[48px] lg:text-[54px] font-normal leading-[1.12] text-white mb-4">
          {heading}
        </h2>

        <p className="font-inter-tight text-[15px] sm:text-[16px] font-normal text-white/60 leading-relaxed max-w-[580px]">
          {description}
        </p>
      </div>

      {/* 3x2 Grid of 6 Team Members (matches elementor nextsaas_team layout 2) */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative group rounded-[20px] select-none bg-zinc-900 shadow-xl cursor-pointer"
          >
            {/* Member Image Figure */}
            <figure className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[20px] bg-zinc-900">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </figure>

            {/* Hover Floating Glass Card: 100% visible, no clipping, no overlap */}
            <div className="w-[calc(100%-32px)] sm:w-[calc(100%-40px)] max-w-[360px] rounded-2xl absolute z-30 bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 p-5 sm:p-6 bg-[#0D0D12]/95 backdrop-blur-xl text-center shadow-2xl border border-white/15 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out flex flex-col items-center justify-center pointer-events-none">
              <h3 className="font-instrument text-[24px] sm:text-[27px] font-normal text-white leading-normal mb-1 tracking-wide">
                {member.name}
              </h3>
              <p className="font-inter-tight text-[13px] sm:text-[14px] font-normal text-white/80 leading-relaxed max-w-[280px]">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
