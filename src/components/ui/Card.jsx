import React from 'react';

export default function Card({
  children,
  className = '',
  glow = false,
}) {
  return (
    <div
      className={`rounded-2xl lg:rounded-3xl border border-stroke-2 dark:border-stroke-6 bg-accent dark:bg-background-9 p-6 md:p-8 transition-all duration-300 hover:border-stroke-4 dark:hover:border-stroke-5 ${
        glow ? 'nextsaas-custom-border-glow-animation-yes' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

