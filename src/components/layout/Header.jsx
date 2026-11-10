'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('About');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Team', href: '#team' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  // Active section update on scroll (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      // Check if near bottom of page (activate Contact)
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveItem('Contact');
        return;
      }

      const headerOffset = 180;
      let currentSection = null;

      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > 80) {
            currentSection = item.name;
          }
        }
      }

      if (currentSection) {
        setActiveItem(currentSection);
      } else if (window.scrollY < 250) {
        setActiveItem('About');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="nexsas-custom-header-wrapper"
        style={{
          position: 'fixed',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: 'calc(100% - 32px)',
          maxWidth: '1240px',
          boxSizing: 'border-box',
          margin: '0 auto',
        }}
      >
        {/* Rounded rectangular header container */}
        <div
          className="nexsas-custom-header-bar"
          style={{
            position: 'relative',
            width: '100%',
            height: '47px',
            paddingLeft: '16px',
            paddingRight: '6px',
            backgroundColor: '#161A23',
            border: '1px solid #292E39',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
          }}
        >
          {/* 1. Left: Logo Section */}
          <a
            href="/"
            className="nexsas-custom-header-logo"
            aria-label="Nexsas Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              textDecoration: 'none',
              background: 'transparent',
              padding: 0,
              margin: 0,
            }}
          >
            <img
              src="/images/purple-white-logo.svg"
              alt="Nexsas"
              width="104"
              height="30"
              style={{
                height: '30px',
                width: 'auto',
                display: 'block',
              }}
            />
          </a>

          {/* 2. Center: Navigation Menu (Centrally Aligned in Navbar) */}
          <nav
            className="nexsas-custom-header-nav"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '26px',
              margin: 0,
              padding: 0,
              zIndex: 10,
            }}
          >
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`nexsas-custom-header-link ${isActive ? 'active-item' : ''}`}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13px',
                    lineHeight: 1,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s ease',
                    margin: 0,
                    ...(isActive
                      ? {
                          backgroundColor: '#42454D',
                          color: '#FFFFFF',
                          height: '29px',
                          padding: '0 14px',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 500,
                          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: '#C4C5CC',
                          padding: '6px 4px',
                          display: 'inline-block',
                          fontWeight: 400,
                        }),
                  }}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* 3. Right: CTA Button & Mobile Hamburger */}
          <div
            className="nexsas-custom-header-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            {/* "Try now" Button */}
            <a
              href="#pricing"
              className="nexsas-custom-header-btn"
              style={{
                height: '33px',
                padding: '0 18px',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#11141D',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                border: 'none',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                userSelect: 'none',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                margin: 0,
              }}
            >
              Try now
            </a>

            {/* Mobile Hamburger Toggle (hidden on md: >= 768px) */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className="nexsas-custom-header-hamburger"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(41, 46, 57, 0.6)',
                color: '#C4C5CC',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <aside
        className={`fixed top-0 right-0 w-[280px] sm:w-[320px] h-screen bg-[#161A23] border-l border-[#292E39] z-[99999] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#292E39]">
            <a href="/" onClick={closeMenu} className="flex items-center">
              <img
                src="/images/purple-white-logo.svg"
                alt="Nexsas"
                className="h-[28px] w-auto select-none"
              />
            </a>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="size-8 rounded-lg bg-[#292E39]/60 hover:bg-[#292E39] text-[#C4C5CC] hover:text-white flex items-center justify-center transition-colors focus:outline-none"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <ul className="flex flex-col gap-2 pt-6 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <li key={item.name} className="m-0 p-0">
                  <a
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.name);
                      closeMenu();
                    }}
                    className={`block font-ibm-mono text-[14px] transition-colors rounded-xl px-4 py-2.5 no-underline ${
                      isActive
                        ? 'bg-[#42454D] text-white font-medium shadow-sm'
                        : 'text-[#C4C5CC] hover:text-white hover:bg-[#292E39]/30'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Bottom Action */}
        <div className="pt-6 border-t border-[#292E39]">
          <a
            href="#pricing"
            onClick={closeMenu}
            className="w-full h-[38px] rounded-full bg-white hover:bg-neutral-100 text-[#17191F] font-ibm-mono text-[13px] font-medium flex items-center justify-center transition-all duration-200 shadow-sm no-underline"
          >
            Try now
          </a>
        </div>
      </aside>

      {/* Backdrop for Mobile Drawer */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] transition-opacity duration-300 md:hidden"
        />
      )}
    </>
  );
}
