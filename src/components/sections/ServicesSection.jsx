'use client';

import React, { useState, useRef, useEffect } from 'react';
import { servicesData } from '@/data/servicesData';

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);
  const targetPos = useRef({ x: -999, y: -999 });
  const currentPos = useRef({ x: -999, y: -999 });
  const rafId = useRef(null);

  // Smooth floating cursor follower animation using lerp & requestAnimationFrame
  useEffect(() => {
    let active = true;

    const onPointerMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const animate = () => {
      if (!active) return;

      // Linear interpolation (lerp) for organic trailing momentum
      const lerpFactor = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const onBlur = () => {
      setIsVisible(false);
    };
    window.addEventListener('blur', onBlur);

    return () => {
      active = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onBlur);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleContainerEnter = (e) => {
    setIsVisible(true);
    if (e && currentPos.current.x < -100) {
      targetPos.current = { x: e.clientX, y: e.clientY };
      currentPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleContainerLeave = () => {
    setIsVisible(false);
  };

  const handleItemEnter = (idx) => {
    setActiveIndex(idx);
    setIsVisible(true);
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#11141D] text-white py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* ========================================================
          Floating Cursor Follower Media Reveal (Desktop Only)
          ======================================================== */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999999] hidden lg:block will-change-transform"
        style={{
          transform: 'translate3d(-999px, -999px, 0) translate(-50%, -50%)',
        }}
      >
        <div
          className={`relative w-[280px] lg:w-[292px] h-[370px] lg:h-[386px] rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-white/10 bg-[#181D26] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {servicesData.services.map((service, idx) => (
            <img
              key={service.id}
              src={service.image}
              alt={service.title}
              className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ease-out ${
                activeIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
        {/* Left Column: Badge, Editorial Heading & Subtitle */}
        <div className="w-full lg:w-[42%] lg:max-w-[480px] lg:sticky lg:top-28 self-start flex flex-col items-start select-none">
          {/* Badge: ✦ Our clients */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src={servicesData.starIcon}
              alt=""
              className="w-3.5 h-3.5 object-contain"
            />
            <span className="font-inter-tight text-[#8F96A3] text-[13px] sm:text-[13.5px] font-medium tracking-wide">
              {servicesData.badge}
            </span>
          </div>

          {/* Editorial Serif Heading */}
          <h2 className="font-instrument text-[38px] sm:text-[46px] lg:text-[52px] font-normal text-white leading-[1.12] tracking-normal mb-4">
            {servicesData.heading.line1}
            <br />
            {servicesData.heading.line2}
          </h2>

          {/* Subtitle / Description */}
          <p className="font-inter-tight text-[#8F96A3] text-[15px] sm:text-[16px] leading-relaxed max-w-[400px]">
            {servicesData.description}
          </p>
        </div>

        {/* Right Column: 5 Services with Hover Slide-Up, Icon Swap & Cursor Reveal */}
        <div
          className="w-full lg:w-[54%] lg:max-w-[620px]"
          onMouseEnter={handleContainerEnter}
          onMouseLeave={handleContainerLeave}
        >
          <div className="divide-y divide-white/[0.08]">
            {servicesData.services.map((service, idx) => (
              <a
                key={service.id}
                href={service.href}
                onMouseEnter={() => handleItemEnter(idx)}
                className="group relative block overflow-hidden rounded-[20px] no-underline cursor-pointer select-none transition-colors duration-400 ease-in-out"
              >
                {/* 1. White Background Layer (Slides up smoothly on hover) */}
                <div
                  className="absolute inset-0 h-0 w-full bg-white transition-[height] duration-400 ease-in-out group-hover:h-full rounded-[20px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* 2. Content Row (Shifts right smoothly by 16px on hover) */}
                <div className="relative z-10 flex items-center gap-5 sm:gap-6 py-5 sm:py-6 lg:py-8 pl-0 transition-all duration-400 ease-in-out group-hover:pl-4 sm:group-hover:pl-6 group-hover:pr-4">
                  {/* Dual SVG Icons: 52x52 White line (default) & Black line (hover) */}
                  <div className="relative w-[52px] h-[52px] shrink-0 flex items-center justify-center">
                    {/* Default White Stroke Icon */}
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-full object-contain select-none transition-opacity duration-400 opacity-100 group-hover:opacity-0"
                    />
                    {/* Hover Black Stroke Icon */}
                    <img
                      src={service.hoverIcon}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                    />
                  </div>

                  {/* Content: Title (Instrument Serif) & Tagline with color inversion on hover */}
                  <div className="flex flex-col text-left max-w-[465px]">
                    <h3 className="font-instrument text-white/90 group-hover:text-black/90 text-[24px] sm:text-[26px] md:text-[27px] font-normal leading-snug tracking-normal mb-1 transition-colors duration-400 select-none">
                      {service.title}
                    </h3>
                    <p className="font-inter-tight text-white/60 group-hover:text-black/60 text-[13.5px] sm:text-[14.5px] font-normal leading-relaxed transition-colors duration-400 select-none">
                      {service.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
