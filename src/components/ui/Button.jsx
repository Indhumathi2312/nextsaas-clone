'use client';

import React from 'react';

export default function Button({
  children,
  href = '#',
  variant = 'v6', // 'v6' or 'v8' or 'primary'
  className = '',
  onClick,
  type = 'button',
}) {
  if (variant === 'v8') {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`nextsaas-button btn-v8 group bg-background-7 hover:border-stroke-3 relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-transparent px-6 py-[13px] transition-all duration-300 ease-in-out ${className}`}
      >
        <div className="h-full max-h-5 overflow-hidden">
          <span className="font-ibm-plex-mono text-background-13/90 text-tagline-2 block -translate-y-0.5 font-medium text-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">
            {children}
          </span>
          <span className="font-ibm-plex-mono text-tagline-2 block font-medium text-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">
            {children}
          </span>
        </div>
        <div className="relative mt-[1.5px] flex size-6 overflow-hidden items-center justify-center">
          <span className="button-v8-circle bg-background-6 absolute size-[22px] rounded-full transition-all duration-400 ease-in-out">
            <span className="button-v8-arrow stroke-background-10 absolute size-[16px] -translate-x-2 translate-y-0.5 stroke-2 transition-all duration-400 ease-in-out group-hover:translate-x-6">
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </span>
          <span className="button-v8-arrow stroke-background-10 absolute size-[18px] -translate-x-6 stroke-2 transition-all duration-400 ease-in-out group-hover:translate-x-0">
            <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 13.5L11.25 9L6.75 4.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
        </div>
      </a>
    );
  }

  if (variant === 'v6') {
    return (
      <div className="max-md:w-[85%] max-md:mx-auto button-v6-wrapper inline-block">
        <a
          href={href}
          onClick={onClick}
          className={`header-cta-btn btn-v6 group bg-background-6 hover:bg-background-4 border-stroke-3/18 relative flex max-h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-[13px] transition-all duration-300 ease-in-out ${className}`}
        >
          <div className="relative overflow-hidden">
            <div className="h-5.5 flex items-center justify-center">
              <div className="font-ibm-plex-mono text-tagline-2 button-v6-upper-text block cursor-pointer leading-[1.4] font-medium text-nowrap text-white/90">
                {children}
              </div>
            </div>
            <div className="absolute h-5.5 flex items-center justify-center">
              <div className="font-ibm-plex-mono text-tagline-2 button-v6-lower-text block cursor-pointer leading-[1.4] font-medium text-nowrap text-white/90">
                {children}
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-primary bg-background-6 hover:bg-background-4 text-white font-medium rounded-full px-6 py-3 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

