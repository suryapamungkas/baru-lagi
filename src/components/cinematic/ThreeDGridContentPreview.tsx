'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  BatteryCharging,
  CheckCircle2,
  ShoppingCart,
  Maximize2,
  Tag,
  Star,
} from 'lucide-react';
import { ProductData, useModals } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';

interface ThreeDGridContentPreviewProps {
  products: ProductData[];
}

export function ThreeDGridContentPreview({ products }: ThreeDGridContentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string>('Good');
  const [hoveredTitle, setHoveredTitle] = useState<string>('');

  const { addToCart } = useCart();
  const { setQuickViewProduct } = useModals();

  // Selected product for active preview
  const activeProduct = activePreviewIndex !== null ? products[activePreviewIndex] : null;

  // Selected inventory item for the active product based on condition
  const activeInventory = useMemo(() => {
    if (!activeProduct) return null;
    return (
      activeProduct.inventories.find((i) => i.condition === selectedCondition) ||
      activeProduct.inventories[0]
    );
  }, [activeProduct, selectedCondition]);

  // Coordinate map for up to 6 products in 3D perspective space (inspired by 3DGridContentPreview positions)
  const gridPositions = [
    { row: '3 / span 12', col: '2 / span 9', rx: -6, ry: 9, tz: -280 },
    { row: '1 / span 12', col: '15 / span 10', rx: -8, ry: 3, tz: -450 },
    { row: '2 / span 12', col: '31 / span 10', rx: -7, ry: -7, tz: -380 },
    { row: '22 / span 12', col: '5 / span 9', rx: 6, ry: 8, tz: -320 },
    { row: '20 / span 12', col: '19 / span 10', rx: 5, ry: -2, tz: -250 },
    { row: '19 / span 12', col: '35 / span 9', rx: 7, ry: -8, tz: -420 },
  ];

  // Mouse Tracking & 3D Parallax Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentX = 0;
    let currentY = 0;
    let rAFId: number;

    const items = container.querySelectorAll<HTMLElement>('.grid-3d-item');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX, y: e.clientY };

      // Update custom cursor position
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      if (activePreviewIndex === null) {
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        const targetX = (mousePos.x - winW / 2) * 0.05;
        const targetY = (mousePos.y - winH / 2) * 0.05;

        currentX = lerp(currentX, targetX, 0.06);
        currentY = lerp(currentY, targetY, 0.06);

        items.forEach((item, idx) => {
          const config = gridPositions[idx % gridPositions.length];
          const dynamicRx = config.rx + (mousePos.y / winH - 0.5) * 10;
          const dynamicRy = config.ry - (mousePos.x / winW - 0.5) * 12;

          gsap.set(item, {
            x: -currentX * (1 + (idx % 3) * 0.3),
            y: -currentY * (1 + (idx % 2) * 0.3),
            rotationX: dynamicRx,
            rotationY: dynamicRy,
            z: config.tz,
          });
        });
      }

      rAFId = requestAnimationFrame(render);
    };

    rAFId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rAFId);
    };
  }, [activePreviewIndex, products]);

  // Open 3D Content Preview
  const handleOpenPreview = (index: number) => {
    if (activePreviewIndex !== null) return;
    setActivePreviewIndex(index);
    setSelectedCondition('Good');

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.grid-3d-item');
    const titleChars = container.querySelectorAll('.title-char');

    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });

    // 1. Dissolve & elevate other grid items into 3D depth
    tl.to(
      items,
      {
        duration: 1.2,
        opacity: 0,
        y: '-=800',
        scale: 0.8,
        stagger: { amount: 0.15, from: 'center' },
      },
      0
    );

    // 2. Dissolve background typography
    tl.to(
      titleChars,
      {
        duration: 0.9,
        opacity: 0,
        y: '-=60',
        stagger: 0.02,
      },
      0.05
    );

    // 3. Animate Preview Elements in
    tl.fromTo(
      '.preview-stage',
      { opacity: 0, pointerEvents: 'none' },
      { opacity: 1, pointerEvents: 'auto', duration: 0.4 },
      0.3
    );

    tl.fromTo(
      '.preview-image-card',
      { opacity: 0, y: 150, rotationX: -25, scale: 0.85 },
      { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.3 },
      0.35
    );

    tl.fromTo(
      '.preview-title-char',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out' },
      0.5
    );

    tl.fromTo(
      '.preview-content-panel',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' },
      0.6
    );

    tl.fromTo(
      '.preview-back-btn',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out' },
      0.65
    );
  };

  // Close 3D Content Preview and Return to Matrix
  const handleClosePreview = () => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.grid-3d-item');
    const titleChars = container.querySelectorAll('.title-char');

    const tl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: () => {
        setActivePreviewIndex(null);
      },
    });

    // 1. Hide Preview elements
    tl.to(
      ['.preview-content-panel', '.preview-back-btn', '.preview-title-char'],
      {
        duration: 0.6,
        opacity: 0,
        y: 30,
        stagger: 0.02,
      },
      0
    );

    tl.to(
      '.preview-image-card',
      {
        duration: 0.8,
        opacity: 0,
        y: 100,
        rotationX: -20,
      },
      0.1
    );

    // 2. Bring back title and 3D grid items
    tl.to(
      titleChars,
      {
        duration: 0.8,
        opacity: 0.25,
        y: 0,
        stagger: 0.02,
      },
      0.3
    );

    tl.to(
      items,
      {
        duration: 1.1,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: { amount: 0.2, from: 'center' },
      },
      0.35
    );
  };

  // Magnetic Pull Effect on Card Hover
  const handleItemMouseEnter = (e: React.MouseEvent<HTMLDivElement>, title: string) => {
    setHoveredTitle(title);
    if (cursorTextRef.current) {
      cursorTextRef.current.innerText = title;
    }
    gsap.to(e.currentTarget.querySelector('.inner-image'), {
      scale: 1.08,
      duration: 0.6,
      ease: 'expo.out',
    });
  };

  const handleItemMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredTitle('');
    if (cursorTextRef.current) {
      cursorTextRef.current.innerText = '';
    }
    gsap.to(e.currentTarget.querySelector('.inner-image'), {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  const handleItemMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;

    gsap.to(e.currentTarget.querySelector('.inner-image'), {
      x,
      y,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[750px] lg:min-h-[850px] overflow-hidden bg-black rounded-3xl border border-white/10 select-none flex items-center justify-center p-4 sm:p-8"
      style={{ perspective: '1100px' }}
    >
      {/* Background Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(214,244,121,0.08),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Floating Interactive Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-3 transition-opacity duration-300"
        style={{ opacity: hoveredTitle && activePreviewIndex === null ? 1 : 0 }}
      >
        <div className="h-4 w-4 rounded-full border border-accent-lime bg-accent-lime/30 shadow-[0_0_12px_#D6F479] animate-ping" />
        <div className="h-2 w-2 rounded-full bg-accent-lime -ml-5" />
        <span
          ref={cursorTextRef}
          className="bg-black/90 text-white font-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-white/20 backdrop-blur-md shadow-2xl"
        >
          {hoveredTitle}
        </span>
      </div>

      {/* Atmospheric Split Title behind 3D Grid */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
        <h2 className="text-[14vw] sm:text-[12vw] font-black uppercase tracking-[-0.04em] leading-[0.85] text-white/10 text-center select-none">
          <span ref={titleLine1Ref} className="block">
            {'BARU'.split('').map((char, i) => (
              <span key={i} className="title-char inline-block transition-transform duration-300">
                {char}
              </span>
            ))}
          </span>
          <span ref={titleLine2Ref} className="block text-accent-lime/10">
            {'LAGI'.split('').map((char, i) => (
              <span key={i} className="title-char inline-block transition-transform duration-300">
                {char}
              </span>
            ))}
          </span>
        </h2>
        <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.3em] text-[#A0A0A0]/60 mt-4">
          <span>INTERACTIVE 3D MATRIX</span>
          <span>&bull;</span>
          <span>KLIK PERANGKAT UNTUK DETAIL</span>
        </div>
      </div>

      {/* 3D PERSPECTIVE GRID */}
      <div
        ref={gridRef}
        className={`relative w-full h-[650px] lg:h-[750px] grid grid-cols-12 grid-rows-6 gap-4 z-10 transition-opacity duration-500 ${
          activePreviewIndex !== null ? 'pointer-events-none' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {products.slice(0, 6).map((product, index) => {
          const images: string[] = JSON.parse(product.images || '["/hero.jpg"]');
          const prices = product.inventories.map((i) => i.price);
          const lowestPrice = prices.length > 0 ? Math.min(...prices) : product.basePrice;
          const pos = gridPositions[index % gridPositions.length];

          return (
            <div
              key={product.id}
              onClick={() => handleOpenPreview(index)}
              onMouseEnter={(e) => handleItemMouseEnter(e, product.name)}
              onMouseLeave={handleItemMouseLeave}
              onMouseMove={handleItemMouseMove}
              className="grid-3d-item group cursor-pointer relative rounded-2xl border border-white/15 bg-neutral-950/80 backdrop-blur-md p-4 flex flex-col justify-between shadow-2xl transition-colors duration-300 hover:border-accent-lime/60 hover:shadow-[0_15px_35px_rgba(214,244,121,0.12)]"
              style={{
                gridRow: pos.row,
                gridColumn: pos.col,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Device Image Area with Magnetic transform */}
              <div className="relative aspect-4/3 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white/2">
                <div className="inner-image relative w-full h-full flex items-center justify-center p-3 will-change-transform">
                  <Image
                    src={images[0] || '/hero.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Grade Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="bg-black/80 backdrop-blur-md text-accent-lime border border-accent-lime/30 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                    {product.inventories[0]?.condition || 'Grade A'}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="mt-3 flex items-end justify-between border-t border-white/10 pt-2.5">
                <div className="overflow-hidden">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                    {product.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white truncate group-hover:text-accent-lime transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#A0A0A0] block leading-none">MULAI</span>
                  <span className="text-sm font-mono font-black text-white">
                    ${lowestPrice.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL 3D CONTENT PREVIEW STAGE (Active on Card Click) */}
      {activeProduct && (
        <div
          className={`preview-stage absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-black/90 backdrop-blur-2xl transition-all ${
            activePreviewIndex === null ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {/* Top Controls: Back Button & Category Meta */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <button
              type="button"
              onClick={handleClosePreview}
              className="preview-back-btn group inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#A0A0A0] hover:text-white cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-full border border-white/20 bg-white/5 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </div>
              <span>KEMBALI KE 3D MATRIX</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0A0]">
              <span className="text-accent-lime font-bold">BARULAGI PRATINJAU RESMI</span>
              <span>&bull;</span>
              <span>GARANSI 1 TAHUN</span>
            </div>
          </div>

          {/* Main Content Preview Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-6">
            {/* Left: 3D Unfolded Floating Showcase Image */}
            <div className="lg:col-span-5 flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div className="preview-image-card relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-6 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,244,121,0.15),transparent_70%)]" />
                <div className="relative w-full h-full">
                  <Image
                    src={JSON.parse(activeProduct.images || '["/hero.jpg"]')[0] || '/hero.jpg'}
                    alt={activeProduct.name}
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Circular Authentic Tag */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-lime" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white">
                    25-TITIK UJI LAB
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Rich Device Preview Details */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-accent-lime flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  {activeProduct.category} &bull; {activeProduct.brand}
                </span>

                {/* Staggered Split Title */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                  {activeProduct.name.split('').map((char, i) => (
                    <span key={i} className="preview-title-char inline-block">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Trust & Spec Pillars */}
              <div className="preview-content-panel grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                  <span className="text-[#A0A0A0] text-[10px] block">KESEHATAN BATERAI</span>
                  <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <BatteryCharging className="h-3.5 w-3.5 text-accent-lime" />
                    &gt;85% KAPASITAS
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                  <span className="text-[#A0A0A0] text-[10px] block">JAMINAN PURNAJUAL</span>
                  <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-lime" />
                    GARANSI 1 TAHUN
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-white/10 bg-white/5 col-span-2 sm:col-span-1">
                  <span className="text-[#A0A0A0] text-[10px] block">PENGIRIMAN</span>
                  <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Tag className="h-3.5 w-3.5 text-accent-lime" />
                    BEBAS ONGKIR ASURANSI
                  </span>
                </div>
              </div>

              {/* Cosmetic Grade Selection */}
              <div className="preview-content-panel space-y-2">
                <span className="text-[11px] font-mono text-[#A0A0A0] uppercase tracking-wider block">
                  PILIH KONDISI KOSMETIK:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {activeProduct.inventories.map((inv) => (
                    <button
                      key={inv.id}
                      type="button"
                      onClick={() => setSelectedCondition(inv.condition)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-all ${
                        selectedCondition === inv.condition
                          ? 'border-accent-lime bg-accent-lime text-black shadow-[0_0_15px_rgba(214,244,121,0.3)]'
                          : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {inv.condition} &bull; ${inv.price.toFixed(0)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="preview-content-panel pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                    HARGA SPESIAL REKONDISI RESMI
                  </span>
                  <div className="flex items-baseline gap-3 font-mono">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ${(activeInventory?.price || activeProduct.basePrice).toFixed(0)}
                    </span>
                    {activeProduct.basePrice > (activeInventory?.price || 0) && (
                      <span className="text-sm text-white/40 line-through">
                        ${activeProduct.basePrice.toFixed(0)}
                      </span>
                    )}
                    <span className="text-xs text-accent-lime font-bold">
                      HEMAT S/D 40%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeInventory) {
                        addToCart({
                          id: activeInventory.id,
                          productId: activeProduct.id,
                          name: activeProduct.name,
                          image: JSON.parse(activeProduct.images || '["/hero.jpg"]')[0],
                          condition: activeInventory.condition,
                          color: activeInventory.color,
                          storage: activeInventory.storage,
                          price: activeInventory.price,
                          stockQuantity: activeInventory.stockQuantity,
                        });
                      }
                    }}
                    className="flex-1 sm:flex-none bg-white text-black hover:bg-accent-lime hover:text-black font-black text-xs px-6 py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>TAMBAH KE KERANJANG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(activeProduct)}
                    className="p-4 rounded-xl border border-white/20 text-white hover:border-white hover:bg-white/10 transition-colors"
                    title="Buka Modal Spesifikasi Lengkap"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
