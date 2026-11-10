'use client';

import React, { useState } from 'react';
import { contactData } from '@/data/contactData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    acceptTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#11141D] text-white pt-24 sm:pt-32 lg:pt-[156px] pb-20 sm:pb-28 lg:pb-[120px] px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Ambient Purple Graphic matching Elementor 27542477 from HTML */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full select-none z-0">
        <img
          src={contactData.gradientBg}
          alt=""
          className="w-full max-w-none h-auto object-cover select-none pointer-events-none origin-bottom scale-[1.4] block"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        {/* Section Top Header */}
        <div className="w-full max-w-[800px] mx-auto text-center mb-16 sm:mb-20">
          <h2 className="font-instrument text-[42px] sm:text-[50px] lg:text-[56px] font-normal leading-[1.12] text-white mb-4">
            {contactData.heading}
          </h2>

          <p className="font-inter-tight text-[15px] sm:text-[16px] text-white/60 leading-[24px] max-w-[620px] mx-auto">
            {contactData.description}
          </p>
        </div>

        {/* Two-Column Grid: Contact Details & Form */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Column (44%) */}
          <div className="w-full lg:w-[44%] flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 select-none">
                <img
                  src={contactData.starIcon}
                  alt=""
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="font-inter-tight text-white/50 text-xs sm:text-[13px] font-normal leading-[18px] tracking-wide">
                  {contactData.badge}
                </span>
              </div>

              <h3 className="font-instrument text-[34px] sm:text-[40px] font-normal text-white leading-tight mb-2">
                {contactData.formSubtitle}
              </h3>
            </div>

            <div className="space-y-4 w-full pt-2">
              {contactData.contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-[12px] bg-[#11141D] border border-white/[0.08]"
                >
                  <figure className="w-11 h-11 rounded-full bg-[#3D4753] flex items-center justify-center shrink-0 m-0">
                    <img
                      src={info.icon}
                      alt={info.label}
                      className="w-5 h-5 object-contain"
                    />
                  </figure>
                  <div>
                    <span className="font-inter-tight text-xs font-normal text-white/40 block mb-0.5">
                      {info.label}
                    </span>
                    <span className="font-inter-tight text-sm sm:text-[15px] font-normal text-white">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (52%): Form Container */}
          <div className="w-full lg:w-[52%] bg-[#11141D] rounded-[16px] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 text-2xl mb-4">
                  ✓
                </span>
                <h4 className="font-instrument text-2xl font-normal text-white mb-2">
                  Request Received
                </h4>
                <p className="font-inter-tight text-sm text-white/60">
                  Thank you! An AI marketing specialist will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-inter-tight text-sm font-normal text-white/80 block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm font-inter-tight focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter-tight text-sm font-normal text-white/80 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm font-inter-tight focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-inter-tight text-sm font-normal text-white/80 block mb-2">
                    Your message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/30 text-sm font-inter-tight focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, acceptTerms: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-black focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="font-inter-tight text-xs sm:text-sm text-white/60 cursor-pointer select-none"
                  >
                    I accept the Terms
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl font-ibm-plex-mono text-sm sm:text-base font-medium text-[#12161F] bg-[#F8F9FA] hover:bg-white transition-all select-none shadow-md cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
