'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useModals } from '@/context/ModalContext';

export interface HoverGridCard {
  title: string;
  specs: string;
  priceTag: string;
  image: string;
  gridArea: string;
  direction: 'right' | 'left' | 'top' | 'bottom';
  badge: string;
}

export interface HoverGridCollection {
  id: string;
  number: string;
  name: string;
  bgTitle: string;
  tagline: string;
  categoryFilter?: string;
  isAction?: boolean;
  ambientGlow: string;
  accentColor: string;
  cards: HoverGridCard[];
}

// Curated tech ecosystems representing the best of BaruLagi refurbished hardware
const COLLECTIONS: HoverGridCollection[] = [
  {
    id: 'apple-suite',
    number: '01',
    name: 'APPLE SILICON & STUDIO',
    bgTitle: 'APPLE PRO',
    tagline: 'Koleksi komputasi M2 Pro & gawai mobile terpadu dengan baterai prima >90%.',
    categoryFilter: 'MacBooks',
    ambientGlow: 'rgba(148, 163, 184, 0.14)',
    accentColor: '#FFFFFF',
    cards: [
      {
        title: 'MacBook Pro 14" M2',
        specs: '16GB RAM • 512GB SSD',
        priceTag: 'MULAI $1,399',
        image: '/cinematic_macbook.jpg',
        gridArea: '1 / 1 / 5 / 5',
        direction: 'right',
        badge: 'GRADE A+ CERTIFIED',
      },
      {
        title: 'iPhone 13 Pro',
        specs: 'Super Retina XDR • 120Hz',
        priceTag: 'MULAI $579',
        image: '/cinematic_iphone.jpg',
        gridArea: '1 / 5 / 6 / 8',
        direction: 'top',
        badge: 'KONDISI SEMPURNA',
      },
      {
        title: 'Apple Watch Ultra 2',
        specs: 'Titanium 49mm • GPS+Cell',
        priceTag: 'MULAI $649',
        image: '/watch_ultra.jpg',
        gridArea: '5 / 1 / 9 / 3',
        direction: 'bottom',
        badge: 'BATERAI 100%',
      },
      {
        title: 'AirPods Pro 2',
        specs: 'USB-C ANC • Audio Spasial',
        priceTag: 'MULAI $189',
        image: '/airpods.jpg',
        gridArea: '6 / 5 / 10 / 8',
        direction: 'left',
        badge: 'HIGIENIS DISANITASI',
      },
    ],
  },
  {
    id: 'samsung-ecosystem',
    number: '02',
    name: 'SAMSUNG GALAXY ULTRA SUITE',
    bgTitle: 'GALAXY AI',
    tagline: 'Performa fotografi 200MP, layar Dynamic AMOLED 2X, dan audio resolusi tinggi.',
    categoryFilter: 'Smartphones',
    ambientGlow: 'rgba(56, 189, 248, 0.14)',
    accentColor: '#38BDF8',
    cards: [
      {
        title: 'Galaxy S24 Ultra',
        specs: 'Titanium Gray • 512GB • AI',
        priceTag: 'MULAI $889',
        image: '/galaxy_s24.jpg',
        gridArea: '1 / 1 / 6 / 5',
        direction: 'right',
        badge: 'GRADE A+ SCREEN',
      },
      {
        title: 'Sony WH-1000XM5',
        specs: 'Industry-Leading ANC',
        priceTag: 'MULAI $279',
        image: '/headphones_xm5.jpg',
        gridArea: '1 / 5 / 5 / 8',
        direction: 'top',
        badge: 'AUDIOPHILE TUNED',
      },
      {
        title: 'iPad Air M1',
        specs: 'Layar Liquid Retina 10.9"',
        priceTag: 'MULAI $459',
        image: '/ipad.jpg',
        gridArea: '6 / 1 / 10 / 4',
        direction: 'bottom',
        badge: 'SUPPORT PENCIL 2',
      },
      {
        title: 'Baterai & Lab QC',
        specs: '25-Titik Inspeksi Standar',
        priceTag: 'TERSERTIFIKASI',
        image: '/journal_diagnostics.jpg',
        gridArea: '5 / 5 / 10 / 8',
        direction: 'left',
        badge: 'ZERO DEFECTS',
      },
    ],
  },
  {
    id: 'gaming-beasts',
    number: '03',
    name: 'PORTABLE GAMING & RIGS',
    bgTitle: 'NEXT-GEN',
    tagline: 'Layar OLED 90Hz dan grafis komputasi konsol generasi terkini di mana pun Anda berada.',
    categoryFilter: 'Consoles',
    ambientGlow: 'rgba(214, 244, 121, 0.14)',
    accentColor: '#D6F479',
    cards: [
      {
        title: 'Steam Deck OLED',
        specs: '1TB NVMe • Layar 90Hz HDR',
        priceTag: 'MULAI $499',
        image: '/steam_deck.jpg',
        gridArea: '1 / 1 / 5 / 5',
        direction: 'top',
        badge: 'OLED TERBAIK',
      },
      {
        title: 'Nintendo Switch OLED',
        specs: '64GB Internal • White Joy-Con',
        priceTag: 'MULAI $269',
        image: '/switch_oled.jpg',
        gridArea: '1 / 5 / 6 / 8',
        direction: 'right',
        badge: 'SIAP MAINKAN',
      },
      {
        title: 'PlayStation 5 Disc',
        specs: '4K 120Hz Ray Tracing • 825GB',
        priceTag: 'MULAI $419',
        image: '/console.jpg',
        gridArea: '5 / 1 / 10 / 4',
        direction: 'bottom',
        badge: 'DUALSENSE PRIMA',
      },
      {
        title: 'Sony WH-1000XM5',
        specs: 'Spatial Gaming Audio',
        priceTag: 'MULAI $279',
        image: '/headphones_xm5.jpg',
        gridArea: '6 / 5 / 10 / 8',
        direction: 'left',
        badge: 'LATENSI RENDAH',
      },
    ],
  },
  {
    id: 'tradein-circular',
    number: '04',
    name: 'TUKAR TAMBAH & SIRKULARITAS',
    bgTitle: 'CASH OUT',
    tagline: 'Cairkan dana tunai instan untuk gawai lama Anda dan kurangi emisi karbon sirkular.',
    categoryFilter: 'All',
    isAction: true,
    ambientGlow: 'rgba(168, 85, 247, 0.14)',
    accentColor: '#A855F7',
    cards: [
      {
        title: 'Appraisal Otomatis',
        specs: 'Valuasi AI dalam 60 Detik',
        priceTag: 'HARGA PASAR TERTINGGI',
        image: '/promo1.jpg',
        gridArea: '1 / 1 / 6 / 4',
        direction: 'top',
        badge: 'JAMINAN HARGA',
      },
      {
        title: 'Jejak Karbon Hijau',
        specs: 'Hemat 91% Emisi CO2e Pabrik',
        priceTag: 'SIRKULAR LESTARI',
        image: '/journal_carbon.jpg',
        gridArea: '1 / 4 / 6 / 8',
        direction: 'left',
        badge: 'RAMAH BUMI',
      },
      {
        title: 'Pengiriman Gratis',
        specs: 'Gratis Kotak Pengiriman Aman',
        priceTag: 'CASH OUT INSTAN',
        image: '/promo2.jpg',
        gridArea: '6 / 2 / 11 / 5',
        direction: 'right',
        badge: 'PENCAIRAN CEPAT',
      },
    ],
  },
];

export function HoverGridShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const collectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { setActiveCategory, setIsTradeInOpen } = useModals();

  // Switch and animate active collection via ultra-smooth GPU-composited motion
  const activateCollection = (newIndex: number) => {
    if (newIndex === activeIndex) return;

    const prevIndex = activeIndex;
    setActiveIndex(newIndex);

    const prevEl = collectionRefs.current[prevIndex];
    const nextEl = collectionRefs.current[newIndex];

    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill();
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Smooth Fade-Out of previous collection
    if (prevEl) {
      const prevCards = prevEl.querySelectorAll<HTMLElement>('.hovergrid-card');
      const prevTitle = prevEl.querySelector<HTMLElement>('.hovergrid-bg-title');

      gsap.killTweensOf([prevCards, prevTitle]);
      tl.to(
        prevCards,
        {
          opacity: 0,
          scale: 0.96,
          y: -10,
          duration: 0.35,
          ease: 'power2.inOut',
          stagger: 0.04,
        },
        0
      );

      if (prevTitle) {
        tl.to(prevTitle, { opacity: 0, scale: 0.95, duration: 0.3 }, 0);
      }
    }

    // 2. Silky Fluid Reveal of new collection (Staggered & Hardware-Accelerated)
    if (nextEl) {
      const nextCards = nextEl.querySelectorAll<HTMLElement>('.hovergrid-card');
      const nextInners = nextEl.querySelectorAll<HTMLElement>('.hovergrid-card-inner');
      const nextTitle = nextEl.querySelector<HTMLElement>('.hovergrid-bg-title');

      gsap.killTweensOf([nextCards, nextInners, nextTitle]);

      if (nextTitle) {
        tl.fromTo(
          nextTitle,
          { opacity: 0, scale: 0.92, y: 15 },
          { opacity: 0.12, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.05
        );
      }

      tl.fromTo(
        nextCards,
        {
          opacity: 0,
          scale: 0.94,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.08
      );

      tl.fromTo(
        nextInners,
        { scale: 1.12 },
        { scale: 1, duration: 0.75, ease: 'power2.out', stagger: 0.08 },
        0.08
      );
    }

    currentTimelineRef.current = tl;
  };

  // Debounced Hover handler for smooth response
  const handleMouseEnterItem = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      activateCollection(index);
    }, 45);
  };

  const handleMouseLeaveItem = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  // Mount animation for initial collection (index 0)
  useEffect(() => {
    const firstEl = collectionRefs.current[0];
    if (firstEl) {
      const firstCards = firstEl.querySelectorAll<HTMLElement>('.hovergrid-card');
      const firstInners = firstEl.querySelectorAll<HTMLElement>('.hovergrid-card-inner');
      const firstTitle = firstEl.querySelector<HTMLElement>('.hovergrid-bg-title');

      const tl = gsap.timeline({ delay: 0.15 });

      if (firstTitle) {
        tl.fromTo(
          firstTitle,
          { opacity: 0, scale: 0.92, y: 15 },
          { opacity: 0.12, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0
        );
      }

      tl.fromTo(
        firstCards,
        { opacity: 0, scale: 0.94, y: 22 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
        0.1
      );

      tl.fromTo(
        firstInners,
        { scale: 1.12 },
        { scale: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
        0.1
      );
    }

    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (currentTimelineRef.current) currentTimelineRef.current.kill();
    };
  }, []);

  // Handle action click (Jump to Catalog or open Trade-In)
  const handleCollectionAction = (col: HoverGridCollection) => {
    if (col.isAction) {
      setIsTradeInOpen(true);
      return;
    }
    if (col.categoryFilter) {
      setActiveCategory(col.categoryFilter);
    }
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeCollection = COLLECTIONS[activeIndex];

  return (
    <section
      id="ecosystem-section"
      ref={containerRef}
      className="relative w-full py-20 lg:py-28 px-6 md:px-12 lg:px-20 mx-auto max-w-7xl bg-black text-white select-none border-b border-white/10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-accent-lime flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
            REKOMENDASI PERANGKAT &bull; KOMBINASI TERBAIK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white">
            KOMBINASI PERANGKAT KERJA &amp; HIBURAN
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 font-mono max-w-2xl">
            Arahkan kursor pada kategori untuk melihat paduan perangkat yang saling terintegrasi—dengan jaminan baterai prima dan garansi resmi 1 tahun.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white hover:text-accent-lime transition-colors self-start md:self-end cursor-pointer"
        >
          <span>LIHAT SELURUH KATALOG</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Interactive Menu List */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            {COLLECTIONS.map((col, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={col.id}
                  onMouseEnter={() => handleMouseEnterItem(idx)}
                  onMouseLeave={handleMouseLeaveItem}
                  onClick={() => {
                    activateCollection(idx);
                    handleCollectionAction(col);
                  }}
                  className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'border-accent-lime/60 bg-white/6 shadow-[0_10px_30px_rgba(214,244,121,0.08)]'
                      : 'border-white/10 bg-white/2 hover:border-white/30 hover:bg-white/4'
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-accent-lime rounded-r" />
                  )}

                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-black text-accent-lime">
                        {col.number}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-black uppercase tracking-wider transition-colors ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}
                      >
                        {col.name}
                      </h3>
                    </div>
                    <p className="text-[11px] font-mono text-[#A0A0A0] line-clamp-1">
                      {col.tagline}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                        isActive
                          ? 'border-accent-lime bg-accent-lime text-black scale-105'
                          : 'border-white/20 text-[#A0A0A0] group-hover:border-white group-hover:text-white'
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box underneath menu */}
          <div className="mt-4 p-4 rounded-2xl border border-white/10 bg-white/3 font-mono text-xs flex items-center justify-between text-[#A0A0A0]">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="h-4 w-4 text-accent-lime" />
              <span>GARANSI RESMI 1 TAHUN</span>
            </div>
            <span className="text-[10px] text-accent-lime uppercase tracking-widest">
              SEMUA UNIT AKTIF
            </span>
          </div>
        </div>

        {/* Right Stage: 10x10 CSS Grid with Dynamic Metalab/Codrops Reveal */}
        <div
          ref={stageRef}
          className="lg:col-span-7 relative h-[480px] sm:h-[580px] lg:h-[650px] rounded-3xl border border-white/15 bg-neutral-950/90 overflow-hidden shadow-2xl flex items-center justify-center p-3 sm:p-5"
        >
          {/* Ambient Lighting shifting with collection */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${activeCollection.ambientGlow}, transparent 75%)`,
            }}
          />

          {/* Vignette Grid Gridlines background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

          {/* Collections Content Containers */}
          {COLLECTIONS.map((col, colIdx) => {
            const isVisible = activeIndex === colIdx;

            return (
              <div
                key={col.id}
                ref={(el) => {
                  collectionRefs.current[colIdx] = el;
                }}
                className={`absolute inset-0 p-4 sm:p-6 grid grid-cols-10 grid-rows-10 gap-3 sm:gap-4 transition-opacity duration-300 ${
                  isVisible ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Giant Artistic Background Typography */}
                <div className="hovergrid-bg-title col-span-10 row-span-10 flex items-center justify-center pointer-events-none z-0 select-none">
                  <h3 className="text-[12vw] sm:text-[9vw] lg:text-[7vw] font-black uppercase tracking-[-0.05em] text-white/10 leading-none text-center">
                    {col.bgTitle}
                  </h3>
                </div>

                {/* 3 Asymmetrical Geometric Image Cards */}
                {col.cards.map((card, cardIdx) => (
                  <div
                    key={cardIdx}
                    onClick={() => handleCollectionAction(col)}
                    className="hovergrid-card group/card relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-900/90 shadow-2xl cursor-pointer will-change-transform transition-all duration-300 ease-out hover:border-accent-lime/60 hover:shadow-[0_20px_45px_rgba(214,244,121,0.22)] hover:scale-[1.025] hover:-translate-y-1"
                    style={{
                      gridArea: card.gridArea,
                    }}
                  >
                    {/* Inner Image with GSAP Zoom & Pan */}
                    <div className="hovergrid-card-inner relative w-full h-full will-change-transform flex items-center justify-center overflow-hidden bg-black/40">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        className="object-contain p-3.5 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover/card:scale-108"
                      />

                      {/* Top Spec/Grade Tag */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="bg-black/90 backdrop-blur-md text-accent-lime border border-accent-lime/30 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded tracking-wider shadow-md">
                          {card.badge}
                        </span>
                      </div>

                      {/* Bottom Floating Minimal Bar */}
                      <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between z-10">
                        <div className="overflow-hidden pr-1">
                          <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white truncate group-hover/card:text-accent-lime transition-colors">
                            {card.title}
                          </h4>
                          <span className="text-[9px] font-mono text-[#A0A0A0] block truncate">
                            {card.specs}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-black text-white shrink-0">
                          {card.priceTag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
