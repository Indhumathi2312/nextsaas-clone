import React from 'react';

export default function SectionHeading({
  badge,
  starIcon = '/images/Star-8.svg',
  heading,
  description,
  align = 'center',
  className = '',
}) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <div className={`flex flex-col ${alignClass} mb-10 md:mb-14 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stroke-2 dark:border-stroke-6 bg-accent dark:bg-background-9 mb-4">
          {starIcon && (
            <img src={starIcon} alt="" className="w-3.5 h-3.5" />
          )}
          <span className="font-ibm-plex-mono text-xs uppercase tracking-wider text-secondary dark:text-accent font-medium">
            {badge}
          </span>
        </div>
      )}
      {heading && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-secondary dark:text-white leading-tight mb-4 max-w-3xl">
          {heading}
        </h2>
      )}
      {description && (
        <p className="text-base sm:text-lg text-secondary/70 dark:text-accent/70 max-w-2xl font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

