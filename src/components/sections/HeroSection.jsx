import React from 'react';
import { heroData } from '@/data/heroData';

// Vertical lines across the hero background with staggered animation delays and durations
const backgroundLines = [
  { hasPulse: true, duration: 6.2, delay: 0.2, pulseHeight: 110 },
  { hasPulse: false, hiddenOnMobile: true },
  { hasPulse: true, duration: 7.5, delay: 2.8, pulseHeight: 125 },
  { hasPulse: false },
  { hasPulse: true, duration: 5.8, delay: 4.2, pulseHeight: 95 },
  { hasPulse: true, duration: 8.0, delay: 1.5, pulseHeight: 130 },
  { hasPulse: false },
  { hasPulse: true, duration: 6.5, delay: 3.4, pulseHeight: 105 },
  { hasPulse: false, hiddenOnMobile: true },
  { hasPulse: true, duration: 7.0, delay: 0.8, pulseHeight: 115 },
];

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full bg-[#0C0E17] text-white overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28 flex flex-col items-center justify-start">
        {/* 1. Animated Background Vertical Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          <div className="w-full max-w-[1400px] mx-auto h-full px-4 sm:px-8 flex justify-between">
            {backgroundLines.map((line, idx) => (
              <div
                key={idx}
                className={`relative w-[1px] h-full ${
                  line.hiddenOnMobile ? 'hidden sm:block' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.038)',
                }}
              >
                {line.hasPulse && (
                  <span
                    className="hero-glow-line-drop absolute left-[-0.5px] w-[2px] rounded-full pointer-events-none"
                    style={{
                      height: `${line.pulseHeight}px`,
                      animationDuration: `${line.duration}s`,
                      animationDelay: `${line.delay}s`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Background Geometric Curves */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1482px] h-full pointer-events-none z-0 overflow-hidden opacity-30 select-none">
          <svg
            className="w-full h-auto mx-auto"
            viewBox="0 0 1482 1378"
            fill="none"
            preserveAspectRatio="xMidYMin meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M420.5 0V688.857C420.5 739.32 398.08 787.176 359.307 819.475L221.193 934.525C182.42 966.824 160 1014.68 160 1065.14V1436"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M1040.5 0V688.857C1040.5 739.32 1057.92 787.176 1096.69 819.475L1234.81 934.525C1273.58 966.824 1296 1014.68 1296 1065.14V1436"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M296.5 0V647.386C296.5 696.681 275.102 743.549 237.854 775.839L54.6455 934.661C17.3976 966.951 -4 1013.82 -4 1063.11V1469.5"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M1164.5 0V647.386C1164.5 696.681 1185.9 743.549 1223.15 775.839L1406.35 934.661C1443.6 966.951 1465 1013.82 1465 1063.11V1469.5"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M544.5 0V704.584C544.5 749.67 526.589 792.911 494.708 824.792L383.792 935.708C351.911 967.589 334 1010.83 334 1055.92V1469.5"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M916.5 0V704.584C916.5 749.67 934.411 792.911 966.292 824.792L1077.21 935.708C1109.09 967.589 1127 1010.83 1127 1055.92V1469.5"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M668.5 0V679.422C668.5 709.28 660.636 738.611 645.7 764.465L540.8 946.035C525.864 971.889 518 1001.22 518 1031.08V1469.5"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <path
              d="M792.5 0V679.422C792.5 709.28 800.364 738.611 815.3 764.465L920.2 946.035C935.136 971.889 943 1001.22 943 1031.08V1469.5"
              stroke="#FAFCFF"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* 3. Bottom Purple Radial Glow Effect */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] max-w-[1100px] h-[340px] pointer-events-none z-0 select-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 88%, rgba(147, 51, 234, 0.48) 0%, rgba(126, 34, 206, 0.28) 42%, rgba(88, 28, 135, 0.12) 68%, transparent 88%)',
            filter: 'blur(55px)',
          }}
        />

        {/* 4. Scaled Bottom Gradient Asset */}
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0 flex justify-center items-end overflow-hidden leading-none">
          <img
            src={heroData.bottomGradient}
            alt=""
            className="w-full min-w-[1280px] max-w-[2560px] h-auto object-cover select-none pointer-events-none block"
          />
        </div>

        {/* 5. Hero Content (Headline, Subtitle, CTA, Social Proof, 3 Cards) */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Main Serif Headline */}
          <h1 className="font-instrument text-[44px] sm:text-[58px] md:text-[72px] lg:text-[78px] text-white font-normal tracking-[-0.01em] leading-[1.08] max-w-[940px] mx-auto select-none">
            {heroData.title.line1}
            <br />
            {heroData.title.line2}
          </h1>

          {/* Subtitle */}
          <p className="font-inter-tight text-[#9CA3AF] text-[15px] sm:text-[16px] md:text-[16.5px] font-normal leading-[1.6] max-w-[560px] mx-auto mt-4 sm:mt-5 px-2 select-none">
            {heroData.description}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mt-7">
            <a
              href={heroData.ctaButton.href}
              className="group inline-flex items-center gap-2.5 bg-[#F7F8FA] hover:bg-white text-[#11141D] rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer no-underline select-none"
            >
              <span className="font-ibm-mono text-[13px] font-medium tracking-tight lowercase">
                {heroData.ctaButton.text}
              </span>
              <span className="w-5 h-5 rounded-full bg-[#11141D] flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3.5L10.5 8L6 12.5" />
                </svg>
              </span>
            </a>
          </div>

          {/* Social Proof (Avatars + Stats) */}
          <div className="flex items-center justify-center gap-3.5 mt-6 px-4">
            <div className="flex items-center -space-x-2">
              {heroData.socialProof.avatars.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="Customer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-[#0C0E17] object-cover"
                />
              ))}
              <img
                src={heroData.socialProof.countBadgeImage}
                alt="99+"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-[#0C0E17] object-cover"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="font-inter-tight text-white text-[13px] font-semibold leading-tight">
                {heroData.socialProof.title}
              </span>
              <span className="font-inter-tight text-[#8F96A3] text-[11px] sm:text-[11.5px] leading-tight mt-0.5">
                {heroData.socialProof.subtitle}
              </span>
            </div>
          </div>

          {/* 3 Capsule / Stadium Feature Cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20 w-full max-w-[1100px] mx-auto">
            {heroData.featureCards.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                style={{ transform: "none" }}
                className="group hero-feature-card relative w-full max-w-[270px] sm:max-w-[300px] md:max-w-[325px] h-[125px] sm:h-[135px] md:h-[145px] rounded-full overflow-hidden flex items-center justify-center shadow-lg cursor-pointer no-underline select-none !transform-none"
              >
                {/* 3D Product Render Image (Image-only hover zoom, container stays 100% stationary) */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="hero-card-img absolute inset-0 w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-[1.15] will-change-transform"
                />

                {/* Subtle Dark Overlay for contrast */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Centered Elegant Serif Title (Stationary) */}
                <h3 className="relative z-10 font-instrument text-white text-[21px] sm:text-[23px] md:text-[25px] font-normal tracking-wide text-center px-4 select-none drop-shadow-md pointer-events-none !transform-none">
                  {card.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Floating Purchase Button (Fixed Bottom-Right) */}
      <a
        href="https://themeforest.net"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Purchase Nexsas"
        className="fixed bottom-6 right-6 z-[9999] bg-[#00DF81] hover:bg-[#00f58d] text-[#0A0D14] h-[38px] px-4 rounded-full flex items-center gap-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_25px_rgba(0,223,129,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer no-underline select-none"
      >
        <span className="font-sans font-semibold text-[13.5px] tracking-tight">
          Purchase
        </span>
        <span className="w-[22px] h-[22px] rounded-full bg-[#0A0D14] flex items-center justify-center shrink-0">
          <svg
            width="11"
            height="11"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="text-[#00DF81]"
          >
            <path d="M9.5 1.5L2.5 9.5H7.5L6.5 14.5L13.5 6.5H8.5L9.5 1.5Z" />
          </svg>
        </span>
      </a>

      {/* 7. Right-Side Vertical Badge (Fixed Right Edge) */}
      <div
        className="fixed right-0 top-[44%] -translate-y-1/2 z-[9998] bg-[#EA3943] hover:bg-[#E11D48] text-white rounded-l-xl py-3 px-2 flex flex-col items-center justify-between shadow-[-4px_4px_16px_rgba(234,57,67,0.35)] hover:shadow-[-6px_6px_20px_rgba(234,57,67,0.5)] transition-all duration-300 cursor-pointer select-none"
        title="100+ Pre-built websites"
      >
        <span
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
          className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-wide whitespace-nowrap text-white py-1"
        >
          100+ Pre-built websites
        </span>
        <div className="w-5 h-5 flex items-center justify-center mt-2.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 44 44"
            fill="none"
            className="drop-shadow-sm"
          >
            <path
              d="M27.4996 20L29.6209 22.1213L27.4996 24.2426L25.3782 22.1213L27.4996 20Z"
              fill="white"
            />
            <path
              d="M20.6235 31.1204L18.5022 33.2418L16.3809 31.1204L18.5022 28.9991L20.6235 31.1204Z"
              fill="white"
            />
            <path
              d="M24.4996 17L26.6209 19.1213L24.4996 21.2426L22.3782 19.1213L24.4996 17Z"
              fill="white"
            />
            <path
              d="M23.6235 28.1204L21.5022 30.2418L19.3809 28.1204L21.5022 25.9991L23.6235 28.1204Z"
              fill="white"
            />
            <path
              d="M21.4996 14L23.6209 16.1213L21.4996 18.2426L19.3782 16.1213L21.4996 14Z"
              fill="white"
            />
            <path
              d="M26.6235 25.1204L24.5022 27.2418L22.3809 25.1204L24.5022 22.9991L26.6235 25.1204Z"
              fill="white"
            />
            <path
              d="M18.4996 11L20.6209 13.1213L18.4996 15.2426L16.3782 13.1213L18.4996 11Z"
              fill="white"
            />
            <path
              d="M23.6235 22.1204L21.5022 24.2418L19.3809 22.1204L21.5022 19.9991L23.6235 22.1204Z"
              fill="white"
            />
            <path
              d="M18.2426 22.1204L16.1213 24.2418L14 22.1204L16.1213 19.9991L18.2426 22.1204Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
