'use client';

import React from 'react';

interface CollectionHeadingProps {
  order: string;
  name: string;
  count: number;
  materials: string;
  onSelect?: () => void;
  id?: string;
}

export function CollectionHeading({
  order,
  name,
  count,
  materials,
  onSelect,
  id,
}: CollectionHeadingProps) {
  return (
    <div
      id={id}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 lg:grid-site text-xs font-mono pb-4 border-b border-white/10"
    >
      {/* Capsule order and title */}
      <div className="flex items-center gap-3 lg:col-span-4">
        <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full border border-white/30 text-white font-mono text-[11px] font-bold tracking-widest bg-white/5">
          {order}
        </span>
        {onSelect ? (
          <button
            type="button"
            onClick={onSelect}
            className="text-white hover:text-accent-lime font-black uppercase text-sm sm:text-base tracking-wider hover:underline transition-colors text-left cursor-pointer"
          >
            {name}
          </button>
        ) : (
          <h3 className="text-white font-black uppercase text-sm sm:text-base tracking-wider">
            {name}
          </h3>
        )}
      </div>

      {/* Piece count aligned with grid col 5 */}
      <p className="text-accent-lime uppercase tracking-widest shrink-0 lg:col-start-5 lg:col-span-2">
        {count} UNIT RESMI
      </p>

      {/* Hardware metallurgy & lab specs aligned with col 7-12 */}
      <p className="max-lg:hidden lg:col-span-6 lg:col-start-7 text-[#A0A0A0] text-right truncate">
        {materials}
      </p>
    </div>
  );
}
