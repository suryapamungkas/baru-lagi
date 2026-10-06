'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useModals } from '@/context/ModalContext';
import { ArrowDown, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  const { setIsTradeInOpen } = useModals();

  const handleScrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[75vh] border-b border-border-gray">
      {/* Left Column: Lime Green Hero Banner */}
      <div className="bg-accent-lime p-8 md:p-16 lg:p-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
          <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
          <span>The Refurbished Revolution</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.08] mb-5 text-black">
          Meet the Smart Essentials.
        </h1>

        <p className="text-base sm:text-lg font-medium mb-8 max-w-lg text-black/90 leading-relaxed">
          Top-tier electronics restored to factory perfection by certified engineers. 
          Enjoy up to 70% off retail prices, backed by a 1-year warranty and free shipping.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleScrollToProducts}
            className="bg-black text-white hover:bg-black/90 font-extrabold rounded-xl px-8 py-6 text-base flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Gimme</span>
            <ArrowDown className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => setIsTradeInOpen(true)}
            variant="outline"
            className="border-2 border-black bg-transparent hover:bg-black/10 text-black font-extrabold rounded-xl px-7 py-6 text-base flex items-center gap-2 active:scale-95 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Cash it in</span>
          </Button>
        </div>

        <div className="flex items-center gap-6 mt-10 pt-6 border-t border-black/10 text-xs font-semibold text-black/80">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            <span>1-Year Commercial Warranty</span>
          </div>
          <div>&bull;</div>
          <div>Free 30-Day Money-Back Returns</div>
        </div>
      </div>

      {/* Right Column: Hero Visual Product Photography */}
      <div className="relative bg-[#ECE7F6] flex items-center justify-center overflow-hidden min-h-[400px] md:min-h-full group">
        <Image
          src="/hero.jpg"
          alt="Refurbished MacBook Pro M2"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Floating badge */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md border border-border-gray p-3.5 rounded-xl shadow-lg flex items-center gap-3 z-10">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="font-extrabold block text-black">MacBook Pro 14&quot; M2</span>
            <span className="text-gray-500 font-medium">Starting from <strong className="text-black">$1,399</strong> (Save $600)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
