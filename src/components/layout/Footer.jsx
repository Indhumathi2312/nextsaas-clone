'use client';

import React, { useState, useEffect, useRef } from 'react';
import { footerData } from '@/data/footerData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const ORIGINAL_TEXT = 'NEXSAS';
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [watermark, setWatermark] = useState(ORIGINAL_TEXT);
  const watermarkRef = useRef(null);

  // Shuffle text animation matching nextsaas-heading-shuffle-enabled
  useEffect(() => {
    let animationFrameId;
    const duration = 2000;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const revealed = Math.floor(progress * ORIGINAL_TEXT.length);

      const animated = ORIGINAL_TEXT
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          return i < revealed
            ? ORIGINAL_TEXT[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setWatermark(animated);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setWatermark(ORIGINAL_TEXT);
      }
    };

    const triggerShuffle = () => {
      startTime = null;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerShuffle();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (watermarkRef.current) {
      observer.observe(watermarkRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const socialIcons = {
    facebook: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.728 0 1.325-.597 1.325-1.324V1.325C24 .597 23.403 0 22.675 0z" />
      </svg>
    ),
    instagram: (
      <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
      </svg>
    ),
    youtube: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    x: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#0B0E14] text-white pt-20 sm:pt-24 pb-8 px-5 sm:px-8 lg:px-12 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Warm Ambient Golden/Purple Glow Graphic from bottom-right */}
      <img
        src={footerData.decorationImage}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 w-[800px] sm:w-[1100px] lg:w-[1300px] max-w-none opacity-80 z-0 select-none scale-[1.3] origin-bottom-right"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col">
        {/* Top Newsletter Bar */}
        <div className="w-full pb-12 sm:pb-16 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-[480px]">
            <h3 className="font-instrument text-[32px] sm:text-[38px] font-normal text-white mb-2 leading-tight">
              {footerData.newsletter.title}
            </h3>
            <p className="font-inter-tight text-sm sm:text-[15px] text-white/60">
              {footerData.newsletter.description}
            </p>
          </div>

          <div className="w-full lg:max-w-[500px]">
            {subscribed ? (
              <div className="p-3.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium text-center border border-emerald-500/30">
                ✓ Thank you for subscribing to our newsletter!
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full bg-[#131622] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-white hover:bg-white/90 text-[#0D0D12] font-ibm-plex-mono text-sm font-medium transition-all shrink-0 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{footerData.newsletter.buttonText || 'Learn more'}</span>
                  <svg className="w-3.5 h-3.5 text-[#0D0D12]" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
            <p className="font-inter-tight text-xs text-white/40 mt-2.5 pl-2">
              {footerData.newsletter.disclaimer}
            </p>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Company Details (2 Columns on Desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <img
                src={footerData.logo}
                alt="Nexsas"
                className="h-8 w-auto mb-6 object-contain"
              />
            </div>

            <div>
              <span className="font-inter-tight text-xs font-semibold uppercase tracking-wider text-white/40 block mb-1">
                {footerData.companyInfo.addressTitle}
              </span>
              <p className="font-inter-tight text-sm font-normal text-white/70 max-w-[280px] leading-relaxed">
                {footerData.companyInfo.address}
              </p>
            </div>

            <div>
              <span className="font-inter-tight text-xs font-semibold uppercase tracking-wider text-white/40 block mb-1">
                {footerData.companyInfo.contactTitle}
              </span>
              <p className="font-inter-tight text-sm font-normal text-white/70 mb-0.5">
                {footerData.companyInfo.phone}
              </p>
              <a
                href={`mailto:${footerData.companyInfo.email}`}
                className="font-inter-tight text-sm font-normal text-white/70 hover:text-white transition-colors block"
              >
                {footerData.companyInfo.email}
              </a>
            </div>

            {/* Social Icon Pills */}
            <div className="flex items-center gap-2.5 pt-2">
              {footerData.socials.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  aria-label={soc.platform}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  {socialIcons[soc.platform]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns (3 Columns: Company, Support, Legal Policies) */}
          {footerData.columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-inter-tight text-sm font-semibold text-white tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="font-inter-tight text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant Watermark Animated Text: N E X S A S */}
        <div
          ref={watermarkRef}
          className="w-full pt-4 pb-8 sm:py-8 flex items-center justify-center overflow-hidden select-none relative z-10"
        >
          <h1 className="font-inter-tight font-semibold text-[56px] sm:text-[90px] md:text-[120px] lg:text-[136px] tracking-[24px] sm:tracking-[55px] md:tracking-[80px] lg:tracking-[100px] pl-[24px] sm:pl-[55px] md:pl-[80px] lg:pl-[100px] uppercase text-white/[0.14] text-center leading-none transition-all duration-300">
            {watermark}
          </h1>
        </div>

        {/* Bottom Copyright and Policy Links Bar */}
        <div className="border-t border-white/[0.08] pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 relative z-10">
          <p className="font-inter-tight text-white/50">
            {footerData.copyright}
          </p>

          <div className="flex items-center gap-6">
            {footerData.bottomLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="font-inter-tight text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
