'use client';

import React from 'react';

export function CinematicFooter() {
  const footerLinks = [
    'PRIVACY POLICY',
    'SUPPLIERS',
    'LAUNCH SCHEDULE',
    'CAREERS',
    'NEWS',
    'CONTACT',
  ];

  return (
    <footer className="relative z-10 bg-black text-white py-12 px-6 border-t border-white/10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A0A0A0]">
          AEROSPACE CORP &copy; {new Date().getFullYear()}
        </span>

        {/* Tautan disusun horizontal di tengah layar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A0A0A0]">
          {footerLinks.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => alert(`Navigating to ${link}...`)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono tracking-widest text-white/40">
          ALL SYSTEMS NOMINAL
        </span>
      </div>
    </footer>
  );
}
