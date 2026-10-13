'use client';

import { ArrowRight } from 'lucide-react';
import { TiltedGridHero, type TiltedGridImage } from '@/components/ui/tilted-grid-hero';
import { useModals } from '@/context/ModalContext';

// Real catalog photography from /public, so every tile is a device we sell.
const ARCHIVE_IMAGES: TiltedGridImage[] = [
  { src: '/cinematic_macbook.jpg', alt: 'MacBook Pro rekondisi di studio gelap' },
  { src: '/steam_deck.jpg', alt: 'Valve Steam Deck OLED' },
  { src: '/cinematic_iphone.jpg', alt: 'iPhone Pro dengan pencahayaan tepi' },
  { src: '/headphones_xm5.jpg', alt: 'Sony WH-1000XM5' },
  { src: '/watch_ultra.jpg', alt: 'Apple Watch Ultra 2 titanium' },
  { src: '/galaxy_s24.jpg', alt: 'Samsung Galaxy S24 Ultra' },
  { src: '/ipad.jpg', alt: 'iPad Air M1' },
  { src: '/switch_oled.jpg', alt: 'Nintendo Switch OLED' },
  { src: '/airpods.jpg', alt: 'AirPods Pro' },
  { src: '/console.jpg', alt: 'Konsol PlayStation 5' },
  { src: '/journal_diagnostics.jpg', alt: 'Laboratorium diagnostik 25 titik' },
];

export function TiltedArchiveSection() {
  const { setActiveCategory } = useModals();

  const openCatalog = () => {
    setActiveCategory('All');
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="archive-reel-section" className="relative bg-black text-white border-b border-white/10">
      <TiltedGridHero
        images={ARCHIVE_IMAGES}
        speed={4.5}
        tileHeight={28}
        axis={55}
        fade={14}
        className="h-[560px] sm:h-[640px] w-full"
      >
        <div className="relative z-30 flex h-full flex-col items-center justify-between py-14 sm:py-16 text-center pointer-events-none">
          <div className="px-6">
            <span className="block text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-accent-lime mb-3">
              ARSIP BERGERAK &bull; 11 UNIT TERKURASI
            </span>
            <h2 className="text-balance text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Setiap gawai,
              <br />
              kembali ke performa puncak.
            </h2>
          </div>

          <div className="flex flex-col items-center gap-5 px-6">
            <p className="max-w-md text-balance text-xs sm:text-sm font-mono text-[#A0A0A0]">
              Dari meja lab diagnostik ke tangan Anda. Lolos uji 25 titik, bergaransi 1 tahun.
            </p>
            <button
              type="button"
              onClick={openCatalog}
              className="pointer-events-auto group inline-flex items-center gap-2 border border-white px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lime"
            >
              Lihat Katalog
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </TiltedGridHero>
    </section>
  );
}
