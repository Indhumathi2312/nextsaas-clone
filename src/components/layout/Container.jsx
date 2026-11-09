import React from 'react';

export default function Container({ children, className = '' }) {
  return (
    <div className={`lp:max-w-[1290px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full mx-auto px-4 ${className}>
      {children}
    </div>
  );
}
