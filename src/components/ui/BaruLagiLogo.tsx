'use client';

import React from 'react';
import { scrollToLenis } from '@/lib/utils';

interface BaruLagiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  onClick?: () => void;
}

export function BaruLagiLogo({
  className = '',
  size = 'md',
  showTagline = false,
  onClick,
}: BaruLagiLogoProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      scrollToLenis(0);
    }
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl tracking-[0.22em]',
    lg: 'text-2xl tracking-[0.25em]',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-3 text-left transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer select-none ${className}`}
      aria-label="BaruLagi - Kembali ke halaman awal"
    >
      {/* Modern Circular Rebirth Geometric Logo Mark */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(214,244,121,0.25)] transition-transform duration-500 group-hover:rotate-180"
        >
          {/* Outer continuous circular cycle track */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-white/20"
          />
          
          {/* Active renewal arc in lime accent */}
          <path
            d="M 20 2 A 18 18 0 0 1 38 20"
            stroke="#D6F479"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Geometric Monogram 'B' + Loop */}
          <path
            d="M 13 10 H 22 C 25.3 10 27 12 27 14.5 C 27 16.5 25.5 18 23 18.5 C 26 19 28 21 28 24 C 28 27.5 25.5 30 21.5 30 H 13 V 10 Z"
            stroke="white"
            strokeWidth="2.75"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 13 20 H 22"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Center precision node */}
          <circle cx="21" cy="14.5" r="1.5" fill="#D6F479" />
          <circle cx="21.5" cy="24.5" r="1.5" fill="#D6F479" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className={`font-black uppercase leading-none text-white flex items-center gap-1 ${textSizes[size]}`}>
          <span>BARU</span>
          <span className="text-[#D6F479]">LAGI</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#D6F479]" />
        </div>
        {showTagline && (
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#A0A0A0] uppercase mt-1">
            Gawai Rekondisi Resmi
          </span>
        )}
      </div>
    </button>
  );
}
