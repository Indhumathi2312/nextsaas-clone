import React from 'react';
import { toolsData } from '@/data/toolsData';

export default function ToolsSection() {
  return (
    <section
      id="tools"
      className="relative w-full bg-white text-[#11141D] pt-16 sm:pt-20 lg:pt-[120px] pb-12 sm:pb-16 lg:pb-20 px-5 -mb-[2px] overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1290px] mx-auto flex flex-col items-center text-center">
        {/* Pill Badge: ✦ Our Tech Stack */}
        <div className="relative z-20 flex items-center justify-center gap-1.5 mb-5 select-none">
          <img
            src={toolsData.starIcon}
            alt=""
            className="w-4 h-4 object-contain"
          />
          <p className="font-inter-tight text-[12px] font-normal leading-[18px] text-black tracking-normal">
            {toolsData.badge}
          </p>
        </div>

        {/* Heading */}
        <h2 className="relative z-20 font-instrument text-[36px] sm:text-[44px] md:text-[50px] font-normal leading-[1.12] text-[#11141D] max-w-[700px] mb-3">
          {toolsData.heading.main}{' '}
          <span className="text-[#0D0D124D]">
            {toolsData.heading.highlight}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="relative z-20 font-inter-tight text-[15px] sm:text-[16px] font-normal leading-[24px] text-[#0D0D1299] max-w-[480px] mb-2 sm:mb-4">
          {toolsData.description}
        </p>

        {/* Rotating Circular Arc (Bottom Half View) */}
        <div className="relative w-full overflow-hidden flex items-start justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[400px] select-none">
          {/* Left & Right Fade Gradient Masks */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-1/5 bg-gradient-to-r from-white to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/5 bg-gradient-to-l from-white to-transparent z-10"
            aria-hidden="true"
          />

          {/* SVG Circle Positioned to Reveal the Lower Arc Under the Text */}
          <div className="shrink-0 absolute flex items-center justify-center w-[850px] sm:w-[1100px] md:w-[1300px] lg:w-[1450px] -top-[600px] sm:-top-[800px] md:-top-[950px] lg:-top-[1060px]">
            <svg
              className="ai-voice-generator-integration-circle w-full h-auto"
              viewBox="0 0 1484 1484"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'spin 50s linear infinite',
              }}
            >
              <circle cx="740" cy="744" r="699.5" stroke="#F4EFE700" strokeWidth="1" />

              {toolsData.circleItems.map((item, idx) => (
                <foreignObject
                  key={idx}
                  x={item.x - 11}
                  y={item.y - 11}
                  width="96"
                  height="96"
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="flex shrink-0 items-center justify-center rounded-full bg-[#E4EAEE] border-4 border-[#F1F4F6] w-[96px] h-[96px] p-4 select-none shadow-sm"
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain opacity-100"
                      loading="lazy"
                    />
                  </div>
                </foreignObject>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
