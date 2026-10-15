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
    const el = document.getElementById('catalog-section');
    if (el) {
      const customWin = window as unknown as {
        __lenis?: { scrollTo: (target: HTMLElement | string, opts?: object) => void };
      };
      if (customWin.__lenis) {
        customWin.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="archive-reel-section"
      className="relative min-h-screen w-full bg-black text-white border-b border-white/10 flex flex-col justify-center scroll-mt-20 overflow-hidden snap-start"
    >
      <TiltedGridHero
        images={ARCHIVE_IMAGES}
        speed={4.5}
        tileHeight={27}
        curve={68}
        axis={52}
        className="h-screen min-h-[640px] max-h-[1080px] w-full"
      >
        <div className="relative z-30 flex h-full flex-col items-center justify-between py-16 sm:py-20 md:py-24 text-center pointer-events-none">
          <div className="px-6">
            <span className="block text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-accent-lime mb-3">
              ARSIP BERGERAK &bull; 11 UNIT TERKURASI
            </span>
            <h2 className="text-balance text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
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
              className="pointer-events-auto group inline-flex items-center gap-2 border border-white px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lime active:scale-95"
            >
              Lihat Katalog
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </TiltedGridHero>
    </section>
  );
}
