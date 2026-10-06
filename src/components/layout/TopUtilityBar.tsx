'use client';

import React from 'react';
import { Globe, MapPin, Sparkles } from 'lucide-react';
import { useModals } from '@/context/ModalContext';

export function TopUtilityBar() {
  const { setIsLocationOpen, setIsCurrencyOpen, currentZip } = useModals();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden md:block bg-white border-b border-border-gray py-2 px-4 md:px-8 text-xs font-medium text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection('promise-section')}
            className="hover:underline text-left cursor-pointer transition-colors"
          >
            Standar & Janji BaruLagi
          </button>
          <button
            onClick={() => scrollToSection('reviews-section')}
            className="hover:underline text-left cursor-pointer transition-colors"
          >
            Customer Reviews
          </button>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-1.5 text-gray-700">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            End Fast Tech &bull; Refurbished with 1-Year Warranty
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setIsLocationOpen(true)}
            className="flex items-center gap-1.5 cursor-pointer hover:underline text-gray-700 hover:text-black transition-colors"
          >
            <MapPin className="h-3 w-3 text-black" />
            <span>Deliver to: <strong className="text-black">{currentZip.split(' ')[0]}</strong></span>
          </button>

          <button
            type="button"
            onClick={() => setIsCurrencyOpen(true)}
            className="flex items-center gap-1.5 cursor-pointer hover:underline text-gray-700 hover:text-black transition-colors"
          >
            <Globe className="h-3 w-3 text-black" />
            <span>EN-US &bull; USD ($)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
