'use client';

import React from 'react';

interface CinematicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'outline' | 'ghost';
}

export function CinematicButton({
  children,
  onClick,
  className = '',
  variant = 'outline',
}: CinematicButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden border border-white px-9 py-4 text-xs font-black uppercase tracking-[0.25em] text-white transition-all duration-300 active:scale-95 ${className}`}
    >
      {/* Sweep fill animation from bottom to top */}
      <span className="absolute inset-0 z-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
      
      {/* Inverted text on hover */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </button>
  );
}
