'use client';

import React from 'react';
import { testimonialsData } from '@/data/testimonialsData';

function StarIcon() {
  return (
    <svg
      style={{ width: '14px', height: '14px', display: 'inline-block' }}
      className="w-3.5 h-3.5 fill-black text-black inline-block"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M8 0.5L10.3 5.2L15.5 6L11.8 9.7L12.6 14.9L8 12.5L3.4 14.9L4.2 9.7L0.5 6L5.7 5.2L8 0.5Z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const { badge, heading, headingHighlight, starIcon, ambientGlow, testimonials } =
    testimonialsData;
  const loopList = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonial"
      className="relative w-full bg-[#11141D] text-white pt-20 sm:pt-28 lg:pt-[120px] pb-24 sm:pb-32 lg:pb-[150px] overflow-hidden"
    >
      {/* Bottom Ambient Glow Graphic */}
      <img
        src={ambientGlow}
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] select-none opacity-80 z-0"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto flex flex-col items-center text-center px-4 mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-2 mb-3 select-none">
          <img src={starIcon} alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="font-inter-tight text-white/60 text-xs sm:text-[13px] font-normal leading-[18px]">
            {badge}
          </span>
        </div>

        <h2 className="font-instrument text-[38px] sm:text-[48px] lg:text-[54px] font-normal leading-[1.12] text-white">
          {heading}{' '}
          <span className="font-instrument text-white/40">
            {headingHighlight}
          </span>
        </h2>
      </div>

      {/* Infinite Testimonials Carousel */}
      <div className="relative z-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex w-max gap-6 sm:gap-8 hover:[animation-play-state:paused]"
          style={{
            animation: 'marqueeContinuous 45s linear infinite',
          }}
        >
          {loopList.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-white text-black rounded-[20px] p-7 sm:p-9 text-center flex flex-col justify-between shrink-0 w-[290px] sm:w-[325px] md:w-[345px] h-[380px] sm:h-[400px] shadow-2xl select-none transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 pt-1">
                {[...Array(item.rating || 5)].map((_, sIdx) => (
                  <StarIcon key={sIdx} />
                ))}
              </div>

              {/* Quote Content */}
              <p className="font-inter-tight text-[14px] sm:text-[14.5px] font-normal text-zinc-600 leading-relaxed max-w-[270px] mx-auto my-auto">
                {item.quote}
              </p>

              {/* Author Info */}
              <div className="pt-2 flex flex-col items-center">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover mb-2.5 shadow-sm"
                  loading="lazy"
                />
                <h3 className="font-instrument text-[21px] sm:text-[22px] font-normal text-zinc-950 leading-tight mb-0.5">
                  {item.author}
                </h3>
                <p className="font-inter-tight text-[12px] sm:text-[12.5px] font-normal text-zinc-500 leading-snug">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Marquee Animation Keyframe */}
      <style jsx>{`
        @keyframes marqueeContinuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
