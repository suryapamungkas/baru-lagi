'use client';

import React from 'react';

interface ArrowCircleProps {
  tone?: 'light' | 'dark' | 'lime';
  direction?: 'left' | 'right';
  className?: string;
  size?: number;
}

export function ArrowCircle({
  tone = 'dark',
  direction = 'right',
  className = '',
  size = 32,
}: ArrowCircleProps) {
  const toneBg =
    tone === 'light'
      ? 'text-white'
      : tone === 'lime'
      ? 'text-accent-lime'
      : 'text-black';

  const strokeColor =
    tone === 'light'
      ? 'stroke-black'
      : tone === 'lime'
      ? 'stroke-black'
      : 'stroke-white';

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${toneBg} ${
        direction === 'left' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
      } ${className}`}
    >
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <path
        d="M10.667 16h10.666m-3.2-3.2 3.2 3.2-3.2 3.2"
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="square"
        className={strokeColor}
      />
    </svg>
  );
}
