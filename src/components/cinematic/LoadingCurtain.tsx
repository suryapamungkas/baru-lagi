'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function LoadingCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Only run on client mount once
    const curtain = curtainRef.current;
    const text = textRef.current;
    if (!curtain) return;

    const tl = gsap.timeline({
      delay: 0.35,
      onComplete: () => {
        setIsDone(true);
      },
    });

    // Subtle breathing animation on text
    if (text) {
      tl.fromTo(
        text,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Curtain rising off the top edge (Exact Codrops Interlude loading-curtain motion)
    tl.to(
      curtain,
      {
        duration: 0.95,
        ease: 'power4.inOut',
        clipPath: 'inset(0% 0% 100% 0%)',
      },
      '+=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={curtainRef}
      style={{
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
      className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center select-none pointer-events-auto"
    >
      {/* 12-Column Site Grid Header across the center (Faithful to Isle Thorne Collective) */}
      <div
        ref={textRef}
        className="grid-site w-full px-6 md:px-12 items-center text-xs md:text-sm font-mono tracking-widest uppercase text-white/90"
      >
        {/* Col 1-3: Brand Name */}
        <div className="flex items-center gap-2 lg:col-span-3">
          <span className="h-2 w-2 rounded-full bg-accent-lime animate-ping" />
          <span className="font-black text-white tracking-[0.25em]">BARULAGI</span>
          <span className="text-[#A0A0A0] text-[10px] hidden sm:inline">COLLECTIVE</span>
        </div>

        {/* Col 4-9: Tagline */}
        <div className="max-lg:hidden lg:col-span-6 lg:col-start-4 text-[#A0A0A0] text-center">
          <span>Gawai Rekondisi Bersertifikasi &bull; Lab Standar 25-Titik</span>
        </div>

        {/* Col 10-12: Year & Author */}
        <div className="lg:col-span-3 lg:col-start-10 justify-self-end text-right">
          <span className="text-white font-bold block">SINCE 2026</span>
          <span className="text-[10px] text-accent-lime tracking-normal font-sans block">
            Nur Hidayat Surya Pamungkas
          </span>
        </div>
      </div>
    </div>
  );
}
