'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Sparkles, X, ShoppingCart, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';

// Line equation math helper (exact from Codrops demo.js)
const lineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number) => {
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  return m * currentVal + b;
};

interface EditorialProduct {
  id: string;
  title: string;
  displayTitle: string;
  badge: string;
  deco: string;
  quote: string;
  description: string;
  specs: string[];
  price: number;
  condition: string;
  image: string;
  category: string;
}

export function GridLayoutMotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [activeItem, setActiveItem] = useState<EditorialProduct | null>(null);
  const isPreviewOpenRef = useRef<boolean>(false);
  const allowTiltRef = useRef<boolean>(true);

  const { addToCart } = useCart();
  const { setActiveCategory } = useModals();

  // Curated 8 iconic refurbished hardware masterpieces
  const products: EditorialProduct[] = useMemo(
    () => [
      {
        id: 'mbp14-vault',
        title: 'M2 PRO',
        displayTitle: 'MacBook Pro 14" M2',
        badge: '16GB RAM',
        deco: '✦',
        quote: 'Daya komputasi studio kelas atas dengan layar Liquid Retina XDR 120Hz.',
        description:
          'Setiap MacBook Pro dalam koleksi kurator telah melalui audit termal intensif, siklus baterai di bawah 150 kali (>94% health), dan sanitasi bodi tingkat rumah sakit.',
        specs: ['Apple M2 Pro (10-Core CPU)', '16GB Unified Memory', '512GB High-Speed SSD', 'Garansi 1 Tahun Resmi'],
        price: 1399,
        condition: 'Grade A+ Pristine',
        image: '/cinematic_macbook.jpg',
        category: 'MacBooks',
      },
      {
        id: 'ip13pro-vault',
        title: 'PRO RES',
        displayTitle: 'iPhone 13 Pro (128GB)',
        badge: '120HZ OLED',
        deco: '❖',
        quote: 'Bodi baja bedah nirkarat dengan sistem triple kamera sinematik Pro.',
        description:
          'Sensor kamera 12MP telah dikalibrasi ulang tanpa dead pixels. Modul Face ID, speaker stereo, dan antena 5G dijamin beroperasi sesuai toleransi pabrikan.',
        specs: ['Layar Super Retina XDR ProMotion', 'Bodi Surgical Stainless Steel', 'Kesehatan Baterai 94%', 'IMEI Terdaftar Kemenperin'],
        price: 499,
        condition: 'Grade A Certified',
        image: '/cinematic_iphone.jpg',
        category: 'Smartphones',
      },
      {
        id: 'watchultra-vault',
        title: 'TITAN',
        displayTitle: 'Apple Watch Ultra 2',
        badge: '3000 NITS',
        deco: '◈',
        quote: 'Ketahanan ekstrem bodi titanium 49mm untuk petualangan maraton & penyelaman.',
        description:
          'Dilengkapi strap original yang higienis, sensor ECG presisi, dan uji kedap air kompresi tinggi. Siap menemani ekspedisi di kondisi cuaca ekstrem.',
        specs: ['Bodi Titanium Aerospace 49mm', 'Kecerahan Layar Puncak 3000 Nits', 'Precision Dual-Frequency GPS', 'Charger Cepat Magnetik'],
        price: 629,
        condition: 'Pristine Collector',
        image: '/watch_ultra.jpg',
        category: 'Great deals',
      },
      {
        id: 'steamdeck-vault',
        title: 'DECK',
        displayTitle: 'Valve Steam Deck OLED',
        badge: '1TB NVME',
        deco: '✚',
        quote: 'Panel 90Hz HDR OLED warna hitam absolut dengan latensi ultra-responsif.',
        description:
          'Konsol PC portabel nomor satu di dunia. APU 6nm AMD hemat daya, thumbstick magnetik presisi tanpa drift, dan penyimpanan raksasa 1TB NVMe SSD.',
        specs: ['Layar 7.4" 90Hz HDR OLED', 'Kustom 6nm AMD APU', 'Penyimpanan 1TB NVMe SSD', 'Baterai 50Wh Tahan Lama'],
        price: 499,
        condition: 'Grade A Like-New',
        image: '/steam_deck.jpg',
        category: 'Consoles',
      },
      {
        id: 'sonyxm5-vault',
        title: 'NOISE',
        displayTitle: 'Sony WH-1000XM5 ANC',
        badge: 'LDAC HI-RES',
        deco: '▲',
        quote: 'Peredaman bising nirkabel nomor satu dengan 8 mikrofon dan prosesor V1.',
        description:
          'Bantalan kulit lembut baru steril, engsel kokoh tanpa decit, serta transmisi audio nirkabel Hi-Res LDAC yang memanjakan telinga para produser musik.',
        specs: ['Prosesor Terintegrasi V1 + QN1', 'Driver Karbon 30mm Presisi', 'Baterai 30 Jam Fast-Charge', 'Case Hard-Shell Orisinil'],
        price: 289,
        condition: 'Grade A Cleaned',
        image: '/headphones_xm5.jpg',
        category: 'Audio',
      },
      {
        id: 'switcholed-vault',
        title: 'HYBRID',
        displayTitle: 'Nintendo Switch OLED',
        badge: '64GB DOCK',
        deco: '✦',
        quote: 'Layar OLED 7 inci warna cerah dengan dudukan lebar dan audio terintegrasi.',
        description:
          'Joy-Con telah diuji bebas drift pada mesin diagnosa joystick kami. Termasuk dock HDMI resmi, adaptor original, dan garansi pergantian part 1 tahun.',
        specs: ['Layar Kaca Vibrant 7" OLED', 'Audio Stereo Built-in Enclosure', 'Dudukan Multi-Angle Kokoh', 'Paket Lengkap Aksesoris'],
        price: 279,
        condition: 'Grade A+ Pristine',
        image: '/switch_oled.jpg',
        category: 'Consoles',
      },
      {
        id: 's24ultra-vault',
        title: 'ULTRA',
        displayTitle: 'Samsung Galaxy S24 Ultra',
        badge: '200MP ZOOM',
        deco: '❖',
        quote: 'Bodi titanium datar dengan pemrosesan kamera 200MP dan Snapdragon 8 Gen 3.',
        description:
          'Flagship Android terhebat tahun ini. S-Pen tersimpan mulus, layar anti-reflektif Gorilla Armor tanpa gores, dan dukungan update OS resmi jangka panjang.',
        specs: ['Snapdragon 8 Gen 3 for Galaxy', 'Kamera 200MP Quad Telephoto', 'Stylus S-Pen Terintegrasi', 'Layar 120Hz Dynamic AMOLED'],
        price: 949,
        condition: 'Grade A Pristine',
        image: '/galaxy_s24.jpg',
        category: 'Smartphones',
      },
      {
        id: 'ps5digital-vault',
        title: 'SPEED',
        displayTitle: 'PlayStation 5 Digital',
        badge: '825GB SSD',
        deco: '◈',
        quote: 'Arsitektur RDNA 2 berkecepatan 5.5GB/s dengan haptic feedback DualSense.',
        description:
          'Kipas pendingin telah dibersihkan secara ultrasonik dan pasta pendingin liquid metal diperiksa oleh teknisi. Beroperasi senyap dengan grafis 4K 120FPS.',
        specs: ['Prosesor AMD Zen 2 Octa-Core', 'Custom 825GB PCIe 4.0 SSD', 'Stik DualSense Wireless Ori', 'Dukungan Audio 3D Tempest'],
        price: 389,
        condition: 'Grade A Certified',
        image: '/console.jpg',
        category: 'Consoles',
      },
    ],
    []
  );



  // Multi-plane 3D tilt interaction logic for each item
  const handleItemMouseMove = (e: React.MouseEvent<HTMLDivElement>, itemEl: HTMLDivElement) => {
    if (!allowTiltRef.current || isPreviewOpenRef.current) return;

    const bounds = itemEl.getBoundingClientRect();
    const relX = e.clientX - bounds.left;
    const relY = e.clientY - bounds.top;

    // Elements inside the box to displace with individual 3D parallax ranges
    const imgEl = itemEl.querySelector<HTMLElement>('.motion-box-img');
    const titleEl = itemEl.querySelector<HTMLElement>('.motion-box-title');
    const badgeEl = itemEl.querySelector<HTMLElement>('.motion-box-badge');
    const shadowEl = itemEl.querySelector<HTMLElement>('.motion-box-shadow');
    const decoEl = itemEl.querySelector<HTMLElement>('.motion-box-deco');
    const contentEl = itemEl.querySelector<HTMLElement>('.motion-box-content');

    // Image translation: [-10, 10]
    if (imgEl) {
      const tx = ((10 - -10) / bounds.width) * relX + -10;
      const ty = ((10 - -10) / bounds.height) * relY + -10;
      gsap.to(imgEl, { duration: 1.2, ease: 'power1.out', x: tx, y: ty });
    }

    // Title translation: [8, -8]
    if (titleEl) {
      const tx = ((8 - -8) / bounds.width) * relX + -8;
      const ty = ((6 - -6) / bounds.height) * relY + -6;
      gsap.to(titleEl, { duration: 1.2, ease: 'power1.out', x: tx, y: ty });
    }

    // Badge translation & rotation: [20, -20] and rotate [-15, 15]
    if (badgeEl) {
      const tx = ((25 - -25) / bounds.width) * relX + -25;
      const ty = ((25 - -25) / bounds.height) * relY + -25;
      const rz = ((10 - -10) / bounds.width) * relX + -10;
      gsap.to(badgeEl, { duration: 1.2, ease: 'power1.out', x: tx, y: ty, rotationZ: rz });
    }

    // Halftone shadow offset: [30, -30]
    if (shadowEl) {
      const tx = ((30 - -30) / bounds.width) * relX + -30;
      const ty = ((20 - -20) / bounds.height) * relY + -20;
      gsap.to(shadowEl, { duration: 1.4, ease: 'power1.out', x: tx, y: ty });
    }

    // Decorative glyph: [-8, 8]
    if (decoEl) {
      const tx = ((-8 - 8) / bounds.width) * relX + 8;
      const rz = ((8 - -8) / bounds.width) * relX + -8;
      gsap.to(decoEl, { duration: 1.3, ease: 'power1.out', x: tx, rotationZ: rz });
    }

    // Micro-quote text: [5, -5]
    if (contentEl) {
      const tx = ((5 - -5) / bounds.width) * relX + -5;
      gsap.to(contentEl, { duration: 1.2, ease: 'power1.out', x: tx });
    }
  };

  const handleItemMouseLeave = (itemEl: HTMLDivElement) => {
    if (!allowTiltRef.current || isPreviewOpenRef.current) return;

    const animatables = itemEl.querySelectorAll('.motion-animatable');
    gsap.to(animatables, {
      duration: 1.2,
      ease: 'power2.out',
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
    });
  };

  // Click & Open Overlay with exploding grid effect (Direct from Codrops demo.js)
  const handleOpenItem = (prod: EditorialProduct) => {
    if (isPreviewOpenRef.current) return;
    isPreviewOpenRef.current = true;
    allowTiltRef.current = false;
    setActiveItem(prod);

    const grid = gridRef.current;
    const overlay = overlayRef.current;
    const revealer = revealerRef.current;
    if (!grid || !overlay || !revealer) return;

    const win = { width: window.innerWidth, height: window.innerHeight };
    const gridItems = grid.querySelectorAll<HTMLElement>('.motion-grid-item');

    // 1. "Explode" grid items outward away from the center
    gridItems.forEach((item) => {
      const animatables = item.querySelectorAll<HTMLElement>('.motion-animatable');
      const bounds = item.getBoundingClientRect();

      let x: number;
      let y: number;

      if (bounds.top + bounds.height / 2 < win.height / 2 - win.height * 0.1) {
        x = -1 * lineEq(20, 500, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
        y = -1 * lineEq(20, 500, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
      } else if (bounds.top + bounds.height / 2 > win.height / 2 + win.height * 0.1) {
        x = -1 * lineEq(20, 500, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
        y = lineEq(20, 500, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
      } else {
        x = -1 * lineEq(10, 600, 0, win.width, Math.abs(bounds.left + bounds.width - win.width));
        y = (Math.random() - 0.5) * 50;
      }

      gsap.to(animatables, {
        duration: 0.45,
        ease: 'power3.out',
        delay: lineEq(0, 0.2, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)),
        x: x,
        y: y,
        rotationZ: (Math.random() - 0.5) * 15,
        opacity: 0,
      });
    });

    // 2. Slide the curtain revealer in (0% position)
    gsap.set(overlay, { display: 'flex', pointerEvents: 'auto' });
    gsap.fromTo(
      revealer,
      { x: '100%' },
      {
        duration: 0.5,
        ease: 'power1.inOut',
        x: '0%',
        onComplete: () => {
          // 3. Reveal overlay item with staggered elastic fly-in
          const overlayItem = overlay.querySelector('.overlay-content-item');
          if (overlayItem) {
            gsap.to(overlayItem, { opacity: 1, duration: 0.1 });
            const flyEls = overlayItem.querySelectorAll('.overlay-fly');
            gsap.fromTo(
              flyEls,
              { x: 300, y: -40, rotationZ: 12, opacity: 0 },
              {
                x: 0,
                y: 0,
                rotationZ: 0,
                opacity: 1,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.04,
              }
            );
          }

          // 4. Slide curtain revealer out (-100% position)
          gsap.to(revealer, {
            duration: 0.55,
            delay: 0.15,
            ease: 'power3.out',
            x: '-100%',
          });
        },
      }
    );
  };

  // Close Overlay and re-assemble the exploded grid items
  const handleCloseItem = () => {
    if (!isPreviewOpenRef.current) return;

    const grid = gridRef.current;
    const overlay = overlayRef.current;
    const revealer = revealerRef.current;
    if (!grid || !overlay || !revealer) return;

    const win = { width: window.innerWidth };
    const gridItems = grid.querySelectorAll<HTMLElement>('.motion-grid-item');
    const overlayItem = overlay.querySelector('.overlay-content-item');

    // 1. Slide curtain revealer back in
    gsap.fromTo(
      revealer,
      { x: '-100%' },
      {
        duration: 0.5,
        ease: 'power3.out',
        x: '0%',
        onComplete: () => {
          if (overlayItem) gsap.set(overlayItem, { opacity: 0 });

          // 2. Slide revealer away to 100%
          gsap.to(revealer, {
            duration: 0.5,
            ease: 'power3.out',
            x: '100%',
            onComplete: () => {
              gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
              setActiveItem(null);
              isPreviewOpenRef.current = false;
              allowTiltRef.current = true;
            },
          });

          // 3. Re-assemble exploded grid items back into place
          gridItems.forEach((item) => {
            const animatables = item.querySelectorAll<HTMLElement>('.motion-animatable');
            const bounds = item.getBoundingClientRect();

            gsap.to(animatables, {
              duration: 0.7,
              ease: 'expo.out',
              delay: 0.15 + lineEq(0, 0.2, 0, win.width, Math.abs(bounds.left + bounds.width - win.width)),
              x: 0,
              y: 0,
              rotationZ: 0,
              opacity: 1,
            });
          });
        },
      }
    );
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpenRef.current) {
        closeBtnRef.current?.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="editorial-vault-section"
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 lg:px-20 mx-auto max-w-7xl bg-black text-white select-none border-b border-white/10 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-accent-lime flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
            03 // ARSIP GAWAI IKONIK &bull; RETRO-EDITORIAL MOTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white">
            MASTERPIECE VAULT
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 font-mono max-w-2xl leading-relaxed">
            Eksplorasi gawai legendaris dengan interaksi paralaks multi-lapis. Sentuh kartu untuk memisahkan tipografi &amp; bayangan, klik untuk membuka ledakan preview kurator.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white hover:text-accent-lime transition-colors cursor-pointer self-start md:self-end"
        >
          <span>LIHAT KATALOG LENGKAP</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* EDITORIAL MOTION GRID (Asymmetrical layout inspired by Codrops 4-col media queries) */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center pt-8 pb-16"
      >
        {products.map((prod, idx) => {
          // Asymmetrical vertical rhythm from demo.css (nth-child offsets)
          const isStaggeredTop = idx % 4 === 1;
          const isStaggeredBottom = idx % 4 === 3;

          return (
            <div
              key={prod.id}
              onClick={() => handleOpenItem(prod)}
              onMouseMove={(e) => handleItemMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleItemMouseLeave(e.currentTarget)}
              className={`motion-grid-item group cursor-pointer relative flex flex-col justify-center items-center ${
                isStaggeredTop ? 'lg:-mt-10 lg:mb-10' : ''
              } ${isStaggeredBottom ? 'lg:-mt-6' : ''}`}
            >
              {/* Layered Box Container */}
              <div className="relative w-full max-w-[280px] sm:max-w-none aspect-3/4 rounded-2xl bg-neutral-950 border border-white/15 p-5 flex flex-col justify-between overflow-visible transition-colors duration-300 group-hover:border-accent-lime shadow-2xl">
                {/* 1. Halftone Dot Pattern Shadow (Displaces on 3D tilt) */}
                <div className="motion-box-shadow motion-animatable absolute -top-4 -left-4 w-full h-full rounded-2xl pointer-events-none bg-[radial-gradient(#ffffff25_1px,transparent_1px)] [background-size:8px_8px] z-0 opacity-40 group-hover:opacity-80 transition-opacity" />

                {/* 2. Rotated Angled Badge (Displaces with rotation on 3D tilt) */}
                <div className="motion-box-badge motion-animatable absolute -top-3.5 right-4 z-20 pointer-events-none">
                  <span className="inline-block px-3 py-1 rounded-lg border-2 border-accent-lime bg-black text-accent-lime text-[10px] font-mono font-black uppercase tracking-widest shadow-xl transform rotate-2 group-hover:rotate-6 transition-transform">
                    {prod.badge}
                  </span>
                </div>

                {/* 3. Product Photo (Monochrome to vivid color on hover, moves on 3D tilt) */}
                <div className="motion-box-img motion-animatable relative w-full h-full flex items-center justify-center z-10">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48">
                    <Image
                      src={prod.image}
                      alt={prod.displayTitle}
                      fill
                      sizes="(max-width: 768px) 80vw, 25vw"
                      className="object-contain p-2 filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-108"
                    />
                  </div>
                </div>

                {/* 4. Elegant Architectural Outline Title */}
                <div className="motion-box-title motion-animatable absolute bottom-12 left-5 z-20 pointer-events-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime/80" />
                  <h3
                    data-hover={prod.title}
                    className="editorial-outline-title font-mono font-bold uppercase text-xs sm:text-sm tracking-[0.22em] leading-none select-none"
                  >
                    {prod.title}
                  </h3>
                </div>

                {/* 5. Decorative Glyph (Displaces on 3D tilt) */}
                <div className="motion-box-deco motion-animatable absolute bottom-12 right-5 text-xs font-mono font-bold text-accent-lime/60 group-hover:text-accent-lime pointer-events-none z-10 transition-colors">
                  {prod.deco}
                </div>

                {/* 6. Micro-Quote / Specs snippet at bottom */}
                <div className="motion-box-content motion-animatable mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#A0A0A0] z-10">
                  <span className="truncate pr-2">{prod.displayTitle}</span>
                  <span className="text-white font-black shrink-0">${prod.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL-SCREEN SLIDING REVEALER OVERLAY PREVIEW (Exact from Codrops overlay__reveal) */}
      <div
        ref={overlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-50 overflow-hidden items-center justify-center bg-black/95 backdrop-blur-2xl text-white p-6 sm:p-12"
      >
        {/* Sliding Curtain Revealer (Sweeps across screen) */}
        <div
          ref={revealerRef}
          className="absolute inset-0 bg-accent-lime z-40 transform translate-x-full pointer-events-none"
        />

        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleCloseItem}
          className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer border border-white/20"
          title="Tutup Preview (Esc)"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Overlay Content Item */}
        {activeItem && (
          <div className="overlay-content-item relative z-20 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center opacity-0">
            {/* Left Column: Big Product Showcase Card */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="overlay-fly relative w-full max-w-md aspect-3/4 rounded-3xl bg-neutral-950 border border-white/20 p-8 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,244,121,0.12),transparent_70%)]" />

                {/* Halftone shadow in preview */}
                <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl pointer-events-none bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:10px_10px]" />

                {/* Angled Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full border border-accent-lime bg-accent-lime/10 text-accent-lime font-mono text-xs font-black uppercase tracking-wider">
                    {activeItem.badge}
                  </span>
                  <span className="font-mono text-xs text-white/60 uppercase">
                    {activeItem.condition}
                  </span>
                </div>

                {/* Big Center Image */}
                <div className="relative w-full h-64 sm:h-72 flex items-center justify-center z-10 my-auto">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.displayTitle}
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain p-4 drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Refined Title at bottom */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-accent-lime uppercase tracking-widest block mb-1">
                      ARSIP KURATOR RESMI
                    </span>
                    <h3 className="text-xl sm:text-2xl font-mono font-bold uppercase text-white tracking-[0.2em]">
                      {activeItem.title}
                    </h3>
                  </div>
                  <div className="text-2xl text-accent-lime font-mono font-bold">
                    {activeItem.deco}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Narrative & Action Box */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="overlay-fly space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-accent-lime flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent-lime" />
                  SERTIFIKASI DIAGNOSTIK 25 TITIK
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                  {activeItem.displayTitle}
                </h2>
                <p className="text-sm font-mono text-gray-400 italic">
                  &ldquo;{activeItem.quote}&rdquo;
                </p>
              </div>

              <div className="overlay-fly">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                  {activeItem.description}
                </p>
              </div>

              {/* Spec Checklist Pills */}
              <div className="overlay-fly space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                  RINCIAN HASIL UJI LAB:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {activeItem.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2 text-gray-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-lime shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA Action */}
              <div className="overlay-fly pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                    HARGA SPESIAL REKONDISI
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white flex items-baseline gap-2">
                    <span>${activeItem.price}</span>
                    <span className="text-xs text-accent-lime font-mono font-bold">
                      BEBAS ONGKIR
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: `inv-${activeItem.id}`,
                        productId: activeItem.id,
                        name: activeItem.displayTitle,
                        image: activeItem.image,
                        condition: activeItem.condition,
                        color: 'Space Edition',
                        storage: activeItem.badge,
                        price: activeItem.price,
                        stockQuantity: 3,
                      });
                      handleCloseItem();
                    }}
                    className="flex-1 sm:flex-none px-8 py-3.5 rounded-full bg-white text-black hover:bg-accent-lime hover:text-black font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>TAMBAH KE KERANJANG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(activeItem.category);
                      handleCloseItem();
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors"
                    title="Buka di Katalog"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded CSS for Codrops Stroke Fill Transition */}
      <style jsx>{`
        .editorial-outline-title {
          position: relative;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.65);
          letter-spacing: 0.22em;
          transition: color 0.3s;
        }
        .editorial-outline-title::before {
          content: attr(data-hover);
          position: absolute;
          top: 0;
          left: 0;
          height: 0;
          overflow: hidden;
          white-space: nowrap;
          -webkit-text-stroke: 0;
          color: #d6f479;
          transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .editorial-outline-title::before {
          height: 100%;
        }
      `}</style>
    </section>
  );
}
