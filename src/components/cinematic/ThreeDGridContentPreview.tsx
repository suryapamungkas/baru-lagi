'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import {
  ShieldCheck,
  ShoppingCart,
  Maximize2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ProductData, useModals } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';

interface ThreeDGridContentPreviewProps {
  products: ProductData[];
}

// Positions on 50x50 CSS Grid (inspired directly by Codrops 3DGridContentPreview pos-1 to pos-16)
const GRID_POS_STYLES = [
  { row: '3 / span 11', col: '2 / span 9', rx: -6, ry: 8, tz: -280 },
  { row: '1 / span 11', col: '15 / span 10', rx: -8, ry: 2, tz: -420 },
  { row: '2 / span 11', col: '28 / span 9', rx: -7, ry: -6, tz: -350 },
  { row: '3 / span 11', col: '40 / span 9', rx: -5, ry: -9, tz: -400 },
  { row: '16 / span 11', col: '7 / span 9', rx: 0, ry: 6, tz: -250 },
  { row: '15 / span 11', col: '20 / span 10', rx: 2, ry: -1, tz: -200 },
  { row: '16 / span 11', col: '33 / span 9', rx: 1, ry: -7, tz: -280 },
  { row: '29 / span 11', col: '2 / span 9', rx: 7, ry: 8, tz: -380 },
  { row: '28 / span 11', col: '14 / span 10', rx: 6, ry: 3, tz: -240 },
  { row: '29 / span 11', col: '27 / span 9', rx: 8, ry: -4, tz: -320 },
  { row: '28 / span 11', col: '39 / span 9', rx: 7, ry: -8, tz: -440 },
];

export function ThreeDGridContentPreview({ products }: ThreeDGridContentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewBackRef = useRef<HTMLButtonElement>(null);
  const previewTitleRef = useRef<HTMLHeadingElement>(null);
  const previewImgWrapRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [activeProduct, setActiveProduct] = useState<ProductData | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string>('Good');
  const [showExtraInfo, setShowExtraInfo] = useState<boolean>(false);
  const [hoveredTitle, setHoveredTitle] = useState<string>('');

  const { addToCart } = useCart();
  const { setQuickViewProduct } = useModals();

  // Active inventory variation based on condition
  const activeInventory = useMemo(() => {
    if (!activeProduct) return null;
    return (
      activeProduct.inventories.find((i) => i.condition === selectedCondition) ||
      activeProduct.inventories[0]
    );
  }, [activeProduct, selectedCondition]);

  // Mouse Tracking & 3D Tilt Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentX = 0;
    let currentY = 0;
    let rAFId: number;

    const items = container.querySelectorAll<HTMLElement>('.grid-3d-card');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX, y: e.clientY };

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
      if (!activeProduct) {
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        const targetX = (mousePos.x - winW / 2) * 0.04;
        const targetY = (mousePos.y - winH / 2) * 0.04;

        currentX = lerp(currentX, targetX, 0.05);
        currentY = lerp(currentY, targetY, 0.05);

        items.forEach((item, idx) => {
          const config = GRID_POS_STYLES[idx % GRID_POS_STYLES.length];
          const dynamicRx = config.rx + (mousePos.y / winH - 0.5) * 8;
          const dynamicRy = config.ry - (mousePos.x / winW - 0.5) * 10;

          gsap.set(item, {
            x: -currentX * (1 + (idx % 3) * 0.25),
            y: -currentY * (1 + (idx % 2) * 0.25),
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
  }, [activeProduct, products]);

  // Open 3D Content Preview Animation (Faithful to Codrops video)
  const handleOpenPreview = (product: ProductData) => {
    setActiveProduct(product);
    setSelectedCondition('Good');
    setShowExtraInfo(false);

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.grid-3d-card');
    const titleChars = container.querySelectorAll('.title-char');

    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });

    // 1. Grid items fly upwards and dissolve into 3D depth
    tl.to(
      items,
      {
        duration: 1.4,
        opacity: 0,
        y: '-=1000',
        scale: 0.85,
        stagger: { amount: 0.18, from: 'center' },
      },
      0
    );

    // 2. Giant background title slides away upwards
    tl.to(
      titleChars,
      {
        duration: 1.1,
        opacity: 0,
        y: '-=80',
        stagger: 0.02,
      },
      0.05
    );

    // 3. Make preview stage visible and interactive
    if (previewRef.current) {
      tl.set(previewRef.current, { display: 'flex', pointerEvents: 'auto' }, 0.2);
      tl.to(previewRef.current, { opacity: 1, duration: 0.4 }, 0.2);
    }

    // 4. Animate the exact elements from the video:
    // Long arrow + circular BACK button
    if (previewBackRef.current) {
      tl.fromTo(
        previewBackRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' },
        0.35
      );
    }

    // Giant overlapping title
    if (previewTitleRef.current) {
      tl.fromTo(
        previewTitleRef.current,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out' },
        0.35
      );
    }

    // Unfolding 3D vertical image card
    if (previewImgWrapRef.current) {
      tl.fromTo(
        previewImgWrapRef.current,
        { opacity: 0, y: 140, rotationX: -25 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.4, ease: 'expo.inOut' },
        0.3
      );
    }

    // Right-hand content panel
    if (previewContentRef.current) {
      tl.fromTo(
        previewContentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
        0.45
      );
    }
  };

  // Close 3D Content Preview and Reverse Back to Grid
  const handleClosePreview = () => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.grid-3d-card');
    const titleChars = container.querySelectorAll('.title-char');

    const tl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: () => {
        if (previewRef.current) {
          gsap.set(previewRef.current, { display: 'none', pointerEvents: 'none' });
        }
        setActiveProduct(null);
      },
    });

    // 1. Hide Preview elements smoothly
    if (previewRef.current) {
      tl.to(
        [
          previewBackRef.current,
          previewTitleRef.current,
          previewContentRef.current,
        ],
        {
          duration: 0.6,
          opacity: 0,
          y: 30,
          stagger: 0.02,
        },
        0
      );

      if (previewImgWrapRef.current) {
        tl.to(
          previewImgWrapRef.current,
          {
            duration: 0.7,
            opacity: 0,
            y: 100,
            rotationX: -20,
          },
          0.05
        );
      }
    }

    // 2. Re-emerge giant background title
    tl.to(
      titleChars,
      {
        duration: 0.8,
        opacity: 0.2,
        y: 0,
        stagger: 0.02,
      },
      0.3
    );

    // 3. Grid items swoop back from 3D depth into their interactive grid positions
    tl.to(
      items,
      {
        duration: 1.2,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: { amount: 0.2, from: 'center' },
      },
      0.35
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[750px] lg:min-h-[900px] overflow-hidden bg-black rounded-3xl border border-white/10 select-none flex items-center justify-center p-4 sm:p-8"
      style={{ perspective: '1200px' }}
    >
      {/* Background Vignette & Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-15%,rgba(214,244,121,0.07),transparent)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Custom Magnetic Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-3 transition-opacity duration-300"
        style={{ opacity: hoveredTitle && !activeProduct ? 1 : 0 }}
      >
        <div className="h-4 w-4 rounded-full border border-accent-lime bg-accent-lime/25 shadow-[0_0_15px_#D6F479] animate-ping" />
        <div className="h-2 w-2 rounded-full bg-accent-lime -ml-5" />
        <span className="bg-black/95 text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-md shadow-2xl">
          {hoveredTitle} &bull; KLIK UNTUK DETAIL 3D
        </span>
      </div>

      {/* Atmospheric Giant Title Behind 3D Grid */}
      <div
        ref={titleCharsRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
      >
        <h2 className="text-[13vw] sm:text-[11vw] font-black uppercase tracking-[-0.04em] leading-[0.85] text-white/10 text-center select-none">
          <span className="block">
            {'BARU'.split('').map((char, i) => (
              <span key={i} className="title-char inline-block transition-transform duration-300">
                {char}
              </span>
            ))}
          </span>
          <span className="block text-accent-lime/10">
            {'LAGI'.split('').map((char, i) => (
              <span key={i} className="title-char inline-block transition-transform duration-300">
                {char}
              </span>
            ))}
          </span>
        </h2>
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-[#A0A0A0]/60 mt-4">
          <span>MAGNETIC 3D GRID</span>
          <span>&bull;</span>
          <span>{products.length} CERTIFIED GAWAI</span>
        </div>
      </div>

      {/* 3D PERSPECTIVE GRID OF HARDWARE */}
      <div
        ref={gridContainerRef}
        className={`relative w-full h-[680px] lg:h-[800px] grid grid-cols-12 grid-rows-6 gap-3 sm:gap-4 z-10 transition-opacity duration-500 ${
          activeProduct ? 'pointer-events-none' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {products.map((product, index) => {
          const images: string[] = JSON.parse(product.images || '["/hero.jpg"]');
          const prices = product.inventories.map((i) => i.price);
          const lowestPrice = prices.length > 0 ? Math.min(...prices) : product.basePrice;
          const pos = GRID_POS_STYLES[index % GRID_POS_STYLES.length];

          return (
            <div
              key={product.id}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPreview(product);
              }}
              onMouseEnter={() => setHoveredTitle(product.name)}
              onMouseLeave={() => setHoveredTitle('')}
              className="grid-3d-card group cursor-pointer relative rounded-2xl border border-white/15 bg-neutral-950/85 backdrop-blur-md p-3.5 flex flex-col justify-between shadow-2xl transition-colors duration-300 hover:border-accent-lime hover:shadow-[0_15px_40px_rgba(214,244,121,0.15)]"
              style={{
                gridRow: pos.row,
                gridColumn: pos.col,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Product Visual Thumbnail */}
              <div className="relative aspect-4/3 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white/2">
                <div className="relative w-full h-full flex items-center justify-center p-2.5 transition-transform duration-500 group-hover:scale-108">
                  <Image
                    src={images[0] || '/hero.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
                  />
                </div>

                {/* Cosmetic Grade Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-black/85 backdrop-blur-md text-accent-lime border border-accent-lime/30 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                    {product.inventories[0]?.condition || 'Grade A'}
                  </span>
                </div>
              </div>

              {/* Card Meta & Price */}
              <div className="mt-2.5 flex items-end justify-between border-t border-white/10 pt-2">
                <div className="overflow-hidden pr-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                    {product.brand} &bull; {product.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white truncate group-hover:text-accent-lime transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <span className="text-[9px] text-[#A0A0A0] block leading-none">MULAI</span>
                  <span className="text-sm font-black text-white">
                    ${lowestPrice.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL 3D CONTENT PREVIEW STAGE (Matches the exact layout in Codrops video screenshot) */}
      <div
        ref={previewRef}
        style={{ display: 'none', opacity: 0 }}
        className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-black/95 backdrop-blur-2xl text-white overflow-y-auto"
      >
        {/* Row 1: Back Control with Long Left Arrow & Circular Button */}
        <div className="flex items-center justify-between pb-4">
          <button
            ref={previewBackRef}
            type="button"
            onClick={handleClosePreview}
            className="preview-back-ctrl group inline-flex items-center gap-3 cursor-pointer select-none text-xs font-mono font-bold tracking-widest uppercase text-white hover:text-accent-lime transition-colors"
          >
            {/* Long Left Arrow SVG (Exact from Codrops arrow.svg) */}
            <svg
              width="70"
              height="12"
              viewBox="0 0 79 9"
              fill="none"
              className="text-white group-hover:text-accent-lime transition-all duration-300 group-hover:-translate-x-2"
            >
              <path
                d="M1.5 4.5l5-3M1.5 4.5l5 3M78.5 4.5h-77"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>

            {/* Circular BACK Badge */}
            <span className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-[10px] font-black tracking-widest group-hover:border-accent-lime group-hover:bg-accent-lime group-hover:text-black transition-all shadow-xl">
              BACK
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#A0A0A0]">
            <span className="text-accent-lime font-bold">BARULAGI LAB CERTIFIED</span>
            <span>&bull;</span>
            <span>1-YEAR HARDWARE WARRANTY</span>
          </div>
        </div>

        {/* Row 2: Giant Title Overlapping the Left Image & Content (Exact from Codrops layout) */}
        <div className="relative z-20 my-2">
          <h2
            ref={previewTitleRef}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-none select-none drop-shadow-2xl"
          >
            {activeProduct?.name || 'GADGET PREVIEW'}
          </h2>
        </div>

        {/* Row 3: Grid of Left Portrait Image + Right Detail Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-auto pt-2 pb-6">
          {/* Left Column: Portrait Card with 3D Unfolding Image */}
          <div
            ref={previewImgWrapRef}
            className="lg:col-span-5 flex items-center justify-center"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full max-w-[340px] aspect-3/4 rounded-2xl bg-gradient-to-b from-white/10 to-neutral-950 p-6 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,244,121,0.12),transparent_75%)]" />

              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={
                    activeProduct
                      ? JSON.parse(activeProduct.images || '["/hero.jpg"]')[0]
                      : '/hero.jpg'
                  }
                  alt={activeProduct?.name || 'Device'}
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Verified Lab Badge */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-accent-lime">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  INSPEKSI 25 TITIK
                </span>
                <span className="text-[10px] font-mono text-white/60 uppercase">
                  100% ORIGINAL
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Meta, Description, +Info, Condition Pills, and Bottom Action */}
          <div
            ref={previewContentRef}
            className="lg:col-span-7 flex flex-col justify-center space-y-5"
          >
            {/* Meta Information (Location, Brand, Specs summary) */}
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#A0A0A0] space-y-1">
              <div>JAKARTA, INDONESIA &bull; SERTIFIKASI RESMI 2026</div>
              <div className="text-white font-bold">
                {activeProduct?.brand} &bull; KATEGORI: {activeProduct?.category}
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans max-w-2xl">
              Setiap gawai rekondisi di platform BaruLagi melalui serangkaian pengujian teknis profesional 25 titik. Perangkat telah dibersihkan secara steril (*data sanitized 100%*), modul kamera dan logic board beroperasi optimal, serta kapasitas daya baterai dijamin di atas 85% kesehatan performa puncak.
            </p>

            {/* Interactive '+ Info' Expandable Section (Direct from Codrops demo) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowExtraInfo(!showExtraInfo)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-accent-lime hover:underline cursor-pointer"
              >
                <span>{showExtraInfo ? '- TUTUP RINCIAN PENGUJIAN' : '+ INFO SERTIFIKASI LAB'}</span>
                {showExtraInfo ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {showExtraInfo && (
                <div className="mt-3 p-4 rounded-xl border border-white/15 bg-white/5 font-mono text-xs space-y-2 max-w-xl animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Motherboard &amp; Chipset Diagnostic</span>
                    <span className="text-accent-lime font-bold">PASS (100%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Display Touch, Retina &amp; Pixel Matrix</span>
                    <span className="text-accent-lime font-bold">PASS (ZERO DEAD PIXELS)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Battery Health &amp; Charging Cycles</span>
                    <span className="text-accent-lime font-bold">&gt;85% CERTIFIED</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>IMEI Terdaftar Kemenperin &amp; Sinyal All Operator</span>
                    <span className="text-accent-lime font-bold">PERMANEN RESMI</span>
                  </div>
                </div>
              )}
            </div>

            {/* Cosmetic Grade Selector */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                PILIH TINGKAT KONDISI KOSMETIK:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {activeProduct?.inventories.map((inv) => (
                  <button
                    key={inv.id}
                    type="button"
                    onClick={() => setSelectedCondition(inv.condition)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      selectedCondition === inv.condition
                        ? 'border-accent-lime bg-accent-lime text-black shadow-[0_0_15px_rgba(214,244,121,0.3)]'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white hover:text-white'
                    }`}
                  >
                    {inv.condition} &bull; ${inv.price.toFixed(0)}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing & CTA Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                  HARGA SPESIAL REKONDISI RESMI
                </span>
                <div className="flex items-baseline gap-3 font-mono">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    ${(activeInventory?.price || activeProduct?.basePrice || 0).toFixed(0)}
                  </span>
                  {activeProduct && activeProduct.basePrice > (activeInventory?.price || 0) && (
                    <span className="text-sm text-white/40 line-through">
                      ${activeProduct.basePrice.toFixed(0)}
                    </span>
                  )}
                  <span className="text-xs text-accent-lime font-bold">
                    GARANSI 1 TAHUN
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Pill Button CTA (Matches Codrops "Buy Tickets" button style) */}
                <button
                  type="button"
                  onClick={() => {
                    if (activeProduct && activeInventory) {
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
                  className="rounded-full px-8 py-3.5 bg-white text-black hover:bg-accent-lime hover:text-black font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>TAMBAH KE KERANJANG</span>
                </button>

                {/* Open Full Specs Modal */}
                <button
                  type="button"
                  onClick={() => {
                    if (activeProduct) setQuickViewProduct(activeProduct);
                  }}
                  className="p-3.5 rounded-full border border-white/20 text-white hover:border-white hover:bg-white/10 transition-colors"
                  title="Lihat Spesifikasi Lengkap"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
