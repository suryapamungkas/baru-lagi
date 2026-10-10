'use client';

import React from 'react';
import Image from 'next/image';
import { ProductData, useModals } from '@/context/ModalContext';
import { CollectionHeading } from './CollectionHeading';
import { ArrowCircle } from '@/components/ui/ArrowCircle';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface CuratedCapsulesSectionProps {
  products: ProductData[];
}

export function CuratedCapsulesSection({ products }: CuratedCapsulesSectionProps) {
  const { setActiveCategory, setQuickViewProduct } = useModals();

  // Curated 4 Capsules inspired directly by Isle Thorne Collections
  const capsules = [
    {
      order: '01',
      id: 'capsule-silicon',
      name: 'APPLE SILICON & STUDIO COMPUTING',
      category: 'MacBooks',
      materials: 'Bodi Aluminium Daur Ulang 100% • Liquid Retina XDR 120Hz • Apple Silicon SoC',
      productIds: ['mbp-14-m2', 'mba-15-m2'],
    },
    {
      order: '02',
      id: 'capsule-mobility',
      name: 'PRO MOBILITY & CINEMATIC SENSORS',
      category: 'Smartphones',
      materials: 'Baja Bedah Nirkarat • Bodi Titanium Aerospace • Sensor 200MP & Ceramic Shield',
      productIds: ['iphone-13-pro', 'samsung-s24-ultra', 'ipad-air-5'],
    },
    {
      order: '03',
      id: 'capsule-gaming-audio',
      name: 'HYBRID GAMING & ACOUSTIC ENGINEERING',
      category: 'Consoles',
      materials: 'Panel 90Hz HDR OLED • Driver Karbon 30mm • APU 6nm AMD Custom • Audio Spasial',
      productIds: ['steam-deck-oled', 'switch-oled', 'ps5-disc', 'sony-wh1000xm5', 'airpods-pro-2'],
    },
    {
      order: '04',
      id: 'capsule-wearable',
      name: 'EXTREME WEARABLE & CIRCLUAR LAB',
      category: 'Great deals',
      materials: 'Bodi Titanium Aerospace 49mm • Layar Sapphire Crystal 3000 Nits • Dual GPS',
      productIds: ['apple-watch-ultra-2'],
    },
  ];

  const handleJumpToCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="capsules-section" className="py-20 px-4 sm:px-8 lg:px-14 mx-auto max-w-7xl text-white select-none">
      {/* Editorial Section Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-accent-lime block mb-2">
            KURASI KOLEKTIF &bull; ISLE THORNE ARCHIVE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            KOLEKSI RESMI DENGAN STANDAR DIAGNOSTIK
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#A0A0A0] max-w-md text-left md:text-right">
          Setiap unit diuji dalam 4 kurasi kapsul hardware. Dipulihkan menggunakan suku cadang OEM dan higienisasi laboratorium.
        </p>
      </div>

      {/* 4 Numbered Capsules (Isle Thorne Collection Pattern) */}
      <div className="space-y-16">
        {capsules.map((cap) => {
          // Match products in this capsule
          const matchingProds = products.filter(
            (p) => cap.productIds.includes(p.id) || p.category === cap.category
          );

          if (matchingProds.length === 0) return null;

          return (
            <div
              key={cap.id}
              className="itc-card border border-white/10 bg-neutral-950 p-6 sm:p-8 rounded-2xl space-y-8"
            >
              {/* Collection Heading */}
              <CollectionHeading
                order={cap.order}
                name={cap.name}
                count={matchingProds.length}
                materials={cap.materials}
                onSelect={() => handleJumpToCategory(cap.category)}
              />

              {/* Endless / Smooth Horizontal Scroll Row (Isle Thorne ProductRow) */}
              <div className="scroll-row flex gap-4 pb-4 pt-2 -mx-2 px-2">
                {matchingProds.map((prod) => {
                  const images: string[] = JSON.parse(prod.images || '["/hero.jpg"]');
                  const lowestPrice = Math.min(...prod.inventories.map((i) => i.price));
                  const condition = prod.inventories[0]?.condition || 'Grade A';

                  return (
                    <div
                      key={prod.id}
                      onClick={() => setQuickViewProduct(prod)}
                      className="group cursor-pointer shrink-0 w-72 sm:w-80 rounded-xl border border-white/10 bg-black/60 hover:bg-neutral-900/80 hover:border-white/30 transition-all duration-300 p-4 flex flex-col justify-between"
                    >
                      {/* Product Visual */}
                      <div className="relative aspect-square w-full rounded-lg bg-neutral-900/40 flex items-center justify-center p-6 overflow-hidden mb-4">
                        <Image
                          src={images[0] || '/hero.jpg'}
                          alt={prod.name}
                          fill
                          sizes="320px"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 border border-white/20 text-accent-lime">
                            {condition}
                          </span>
                        </div>
                      </div>

                      {/* Product Metadata */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]">
                          <span>{prod.brand}</span>
                          <span className="text-white font-bold">${lowestPrice.toFixed(0)}</span>
                        </div>
                        <h4 className="text-sm font-black uppercase text-white truncate group-hover:text-accent-lime transition-colors">
                          {prod.name}
                        </h4>
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#A0A0A0]">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <ShieldCheck className="h-3 w-3" /> Garansi 1 Tahun
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-white">
                            Detail <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Art-Directed Transition Card: "All Collections" (Isle Thorne ArtDirectedImage Banner) */}
      <div
        onClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="group relative mt-16 block h-80 sm:h-96 w-full overflow-hidden rounded-2xl border border-white/15 cursor-pointer shadow-2xl"
      >
        <Image
          src="/collections_editorial.jpg"
          alt="Studio showcase of high-end refurbished devices"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.6] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between text-white">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-lime uppercase block mb-2">
              ARSIP SIRKULAR LENGKAP
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              JELAJAHI SELURUH KATALOG GAWAI
            </h3>
          </div>
          <ArrowCircle tone="lime" size={48} className="hidden sm:block" />
        </div>
      </div>
    </section>
  );
}
