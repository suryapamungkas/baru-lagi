'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Sparkles, ShieldCheck, ArrowRight, Activity, Cpu, CheckCircle } from 'lucide-react';
import { useModals } from '@/context/ModalContext';

interface MotionDevice {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  price: string;
  image: string;
  gridArea: string;
  invertMovement: boolean;
  xStart: number;
  yStart: number;
  rotMax: number;
  xStartInner: number;
  yStartInner: number;
}

export function ImageGridMotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredProduct, setHoveredProduct] = useState<MotionDevice | null>(null);
  const { setActiveCategory, setQuickViewProduct } = useModals();

  // 10 Certified Hardware Units placed exactly across the 50x50 CSS Grid (Pos 1 to 10 from Codrops)
  const devices: MotionDevice[] = useMemo(
    () => [
      {
        id: 'mbp14',
        name: 'MacBook Pro 14" M2',
        brand: 'Apple',
        category: 'MacBooks',
        condition: 'Grade A+ Certified',
        price: '$1,399',
        image: '/cinematic_macbook.jpg',
        gridArea: '10 / 1 / 26 / 7',
        invertMovement: false,
        xStart: 55,
        yStart: 45,
        rotMax: 6,
        xStartInner: 30,
        yStartInner: 25,
      },
      {
        id: 'ip13pro',
        name: 'iPhone 13 Pro (128GB)',
        brand: 'Apple',
        category: 'Smartphones',
        condition: 'Battery Health 94%',
        price: '$499',
        image: '/cinematic_iphone.jpg',
        gridArea: '1 / 18 / 9 / 27',
        invertMovement: true,
        xStart: 60,
        yStart: 35,
        rotMax: -5,
        xStartInner: 25,
        yStartInner: 20,
      },
      {
        id: 'watchultra',
        name: 'Apple Watch Ultra 2 (49mm)',
        brand: 'Apple',
        category: 'Great deals',
        condition: 'Titanium Case 100%',
        price: '$629',
        image: '/watch_ultra.jpg',
        gridArea: '1 / 36 / 14 / 42',
        invertMovement: false,
        xStart: 50,
        yStart: 55,
        rotMax: 7,
        xStartInner: 25,
        yStartInner: 30,
      },
      {
        id: 'steamdeck',
        name: 'Valve Steam Deck OLED (1TB)',
        brand: 'Valve',
        category: 'Consoles',
        condition: '90Hz HDR OLED Matrix',
        price: '$499',
        image: '/steam_deck.jpg',
        gridArea: '13 / 11 / 32 / 18',
        invertMovement: true,
        xStart: 70,
        yStart: 60,
        rotMax: -6,
        xStartInner: 35,
        yStartInner: 30,
      },
      {
        id: 'sonyxm5',
        name: 'Sony WH-1000XM5 ANC',
        brand: 'Sony',
        category: 'Audio',
        condition: 'Dual Processor V1 Tested',
        price: '$289',
        image: '/headphones_xm5.jpg',
        gridArea: '17 / 32 / 32 / 38',
        invertMovement: false,
        xStart: 65,
        yStart: 45,
        rotMax: 5,
        xStartInner: 30,
        yStartInner: 25,
      },
      {
        id: 'switcholed',
        name: 'Nintendo Switch OLED',
        brand: 'Nintendo',
        category: 'Consoles',
        condition: 'Full Accessories Included',
        price: '$279',
        image: '/switch_oled.jpg',
        gridArea: '20 / 46 / 28 / 51',
        invertMovement: true,
        xStart: 50,
        yStart: 50,
        rotMax: -7,
        xStartInner: 25,
        yStartInner: 25,
      },
      {
        id: 's24ultra',
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        category: 'Smartphones',
        condition: 'Snapdragon 8 Gen 3 Pass',
        price: '$949',
        image: '/galaxy_s24.jpg',
        gridArea: '43 / 1 / 51 / 10',
        invertMovement: false,
        xStart: 75,
        yStart: 65,
        rotMax: 6,
        xStartInner: 40,
        yStartInner: 35,
      },
      {
        id: 'ps5digital',
        name: 'PlayStation 5 Digital Edition',
        brand: 'Sony',
        category: 'Consoles',
        condition: 'Ultra-Quiet Fan Cleaned',
        price: '$389',
        image: '/console.jpg',
        gridArea: '38 / 14 / 46 / 22',
        invertMovement: true,
        xStart: 55,
        yStart: 45,
        rotMax: -4,
        xStartInner: 25,
        yStartInner: 20,
      },
      {
        id: 'airpodspro2',
        name: 'AirPods Pro 2nd Gen',
        brand: 'Apple',
        category: 'Audio',
        condition: 'Hygienically Sanitized',
        price: '$179',
        image: '/airpods.jpg',
        gridArea: '40 / 26 / 51 / 32',
        invertMovement: false,
        xStart: 60,
        yStart: 50,
        rotMax: 5,
        xStartInner: 30,
        yStartInner: 25,
      },
      {
        id: 'ipadair5',
        name: 'iPad Air 5th Gen M1',
        brand: 'Apple',
        category: 'iPads',
        condition: 'Pristine Retina Screen',
        price: '$439',
        image: '/ipad.jpg',
        gridArea: '37 / 39 / 48 / 47',
        invertMovement: true,
        xStart: 65,
        yStart: 55,
        rotMax: -6,
        xStartInner: 35,
        yStartInner: 30,
      },
    ],
    []
  );

  // Motion interaction tracking & linear interpolation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isInside = false;

    // Track active translation values per item
    const itemStates = devices.map(() => ({
      tx: 0,
      ty: 0,
      r: 0,
      innerTx: 0,
      innerTy: 0,
    }));

    let rAFId: number;

    const map = (x: number, a: number, b: number, c: number, d: number) =>
      ((x - a) * (d - c)) / (b - a) + c;
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Check if mouse is near or inside container
      if (
        e.clientY >= rect.top - 150 &&
        e.clientY <= rect.bottom + 150 &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        isInside = true;
        mouse = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        // Magnetic trailing cursor ring position
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.12,
            ease: 'power2.out',
          });
        }
      } else {
        isInside = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth animation frame render
    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || 700;

      devices.forEach((dev, idx) => {
        const itemEl = itemRefs.current[idx];
        const innerEl = innerRefs.current[idx];
        if (!itemEl || !innerEl) return;

        const state = itemStates[idx];

        // Target translations based on invertMovement and randomized boundaries
        let targetX = 0;
        let targetY = 0;
        let targetR = 0;
        let targetInnerX = 0;
        let targetInnerY = 0;

        if (isInside) {
          const normX = map(
            mouse.x,
            0,
            width,
            dev.invertMovement ? dev.xStart : -dev.xStart,
            dev.invertMovement ? -dev.xStart : dev.xStart
          );
          const normY = map(
            mouse.y,
            0,
            height,
            dev.invertMovement ? dev.yStart : -dev.yStart,
            dev.invertMovement ? -dev.yStart : dev.yStart
          );
          const normR = map(mouse.x, 0, width, -dev.rotMax, dev.rotMax);

          // Counter-parallax inner photo
          const normInnerX = map(
            mouse.x,
            0,
            width,
            dev.invertMovement ? -dev.xStartInner : dev.xStartInner,
            dev.invertMovement ? dev.xStartInner : -dev.xStartInner
          );
          const normInnerY = map(
            mouse.y,
            0,
            height,
            dev.invertMovement ? -dev.yStartInner : dev.yStartInner,
            dev.invertMovement ? dev.yStartInner : -dev.yStartInner
          );

          targetX = normX;
          targetY = normY;
          targetR = normR;
          targetInnerX = normInnerX;
          targetInnerY = normInnerY;
        }

        // Apply smooth lerp
        state.tx = lerp(state.tx, targetX, 0.065);
        state.ty = lerp(state.ty, targetY, 0.065);
        state.r = lerp(state.r, targetR, 0.065);
        state.innerTx = lerp(state.innerTx, targetInnerX, 0.065);
        state.innerTy = lerp(state.innerTy, targetInnerY, 0.065);

        // Batch update transforms via GSAP fast set
        gsap.set(itemEl, {
          x: state.tx,
          y: state.ty,
          rotation: state.r,
        });

        gsap.set(innerEl, {
          x: state.innerTx,
          y: state.innerTy,
        });
      });

      rAFId = requestAnimationFrame(render);
    };

    rAFId = requestAnimationFrame(render);

    // Initial staggered explosion entrance (from demo3 Codrops)
    const items = itemRefs.current.filter(Boolean);
    if (items.length > 0) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        })
        .set(items, { scale: (i) => (devices[i]?.invertMovement ? 0.35 : 0.65), opacity: 0 })
        .to(items, {
          duration: 1.8,
          ease: 'expo.out',
          scale: 1,
          opacity: 0.85,
          stagger: { amount: 0.5, from: 'center' },
        });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rAFId);
    };
  }, [devices]);

  const handleDeviceClick = (dev: MotionDevice) => {
    setActiveCategory(dev.category);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="motion-grid-section"
      ref={containerRef}
      className="relative w-full min-h-[750px] lg:min-h-[920px] overflow-hidden bg-black text-white select-none border-b border-white/10 flex items-center justify-center py-20 px-6 sm:px-12"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Radial Spotlight and Tech Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(214,244,121,0.06),transparent_75%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.02),transparent_70%)]" />

      {/* Trailing Custom Magnetic Cursor (from Codrops demo) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-3 transition-opacity duration-300"
        style={{ opacity: hoveredProduct ? 1 : 0 }}
      >
        <div className="h-6 w-6 rounded-full border border-accent-lime bg-accent-lime/20 shadow-[0_0_20px_#D6F479] animate-pulse flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-accent-lime" />
        </div>
        <div className="bg-black/95 text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-accent-lime/40 backdrop-blur-md shadow-2xl">
          {hoveredProduct?.name} &bull; KLIK UNTUK KATALOG
        </div>
      </div>

      {/* 50x50 CSS GRID CANVAS OF FLOATING HARDWARE CARDS */}
      <div
        ref={gridRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] grid grid-cols-50 grid-rows-50 pointer-events-none z-10"
        style={{
          gridTemplateColumns: 'repeat(50, 2%)',
          gridTemplateRows: 'repeat(50, 2%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {devices.map((dev, idx) => (
          <div
            key={dev.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDeviceClick(dev);
            }}
            onMouseEnter={() => setHoveredProduct(dev)}
            onMouseLeave={() => setHoveredProduct(null)}
            className="group/item pointer-events-auto cursor-pointer relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-accent-lime hover:shadow-[0_20px_50px_rgba(214,244,121,0.22)] hover:z-30 hover:scale-105 will-change-transform"
            style={{
              gridArea: dev.gridArea,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Card Content & Counter-Parallax Inner Photo */}
            <div
              ref={(el) => {
                innerRefs.current[idx] = el;
              }}
              className="relative w-[calc(100%+80px)] h-[calc(100%+80px)] -left-10 -top-10 flex items-center justify-center p-6 will-change-transform"
            >
              <Image
                src={dev.image}
                alt={dev.name}
                fill
                sizes="(max-width: 768px) 40vw, 20vw"
                className="object-contain p-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover/item:scale-110"
              />
            </div>

            {/* Floating Top Condition Pill */}
            <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
              <span className="bg-black/90 backdrop-blur-md text-accent-lime border border-accent-lime/30 text-[8px] sm:text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded tracking-wider shadow-md">
                {dev.condition}
              </span>
            </div>

            {/* Bottom Glassmorphic Price Badge */}
            <div className="absolute bottom-0 inset-x-0 p-2 sm:p-2.5 bg-gradient-to-t from-black via-black/85 to-transparent flex items-end justify-between z-20 pointer-events-none">
              <div className="overflow-hidden pr-1">
                <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white truncate group-hover/item:text-accent-lime transition-colors">
                  {dev.name}
                </h4>
                <span className="text-[8px] sm:text-[9px] font-mono text-[#A0A0A0] block truncate">
                  {dev.brand} &bull; {dev.category}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono font-black text-white shrink-0">
                {dev.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CENTRAL EDITORIAL HEADLINE (Floating above/between the parallax floating matrix) */}
      <div className="relative z-20 text-center pointer-events-none select-none max-w-4xl mx-auto px-4 flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent-lime mb-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
          04 // KONTROL GERAK PRESISI TINGGI &bull; 25-TITIK LAB
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <span className="block">STANDAR PRESTASI</span>
          <span className="block text-white/40 tracking-[0.08em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-mono mt-3">
            REKONDISI RESMI 2026
          </span>
        </h2>

        <p className="text-xs sm:text-sm font-mono text-gray-300 mt-6 max-w-xl mx-auto leading-relaxed drop-shadow-md">
          Gerakkan kursor untuk menjelajahi gawai rekondisi bersertifikasi lab dengan toleransi presisi mikroskopis. Baterai di atas 85%, logika motherboard 100% prima, dan garansi komersial 1 tahun tanpa repot.
        </p>

        {/* Interactive CTA buttons inside center area */}
        <div className="mt-8 pointer-events-auto flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full px-8 py-3.5 bg-white text-black hover:bg-accent-lime hover:text-black font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-2xl flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Cpu className="h-4 w-4" />
            <span>JELAJAHI KATALOG GAWAI</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('promise-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full px-7 py-3.5 border border-white/20 bg-white/5 text-white hover:border-white hover:bg-white/10 font-bold text-xs font-mono uppercase tracking-widest transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4 text-accent-lime" />
            <span>BACA 4 PILAR GARANSI</span>
          </button>
        </div>
      </div>
    </section>
  );
}
