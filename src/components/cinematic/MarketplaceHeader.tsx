'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, RefreshCw, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BaruLagiLogo } from '@/components/ui/BaruLagiLogo';

export function MarketplaceHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isKatalogOpen, setIsKatalogOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const {
    setActiveCategory,
    setIsTradeInOpen,
    setIsAuthOpen,
    setIsLocationOpen,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
    currentZip,
    searchTerm,
    setSearchTerm,
  } = useModals();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = [
    { label: 'SEMUA GAWAI', value: 'All' },
    { label: 'MACBOOKS & LAPTOP', value: 'MacBooks' },
    { label: 'SMARTPHONES', value: 'Smartphones' },
    { label: 'IPADS & TABLET', value: 'iPads' },
    { label: 'AUDIO HI-FI', value: 'Audio' },
    { label: 'KONSOL GAMING', value: 'Consoles' },
  ];

  const handleNavClick = (cat: string) => {
    setActiveCategory(cat);
    setIsMobileMenuOpen(false);
    setIsKatalogOpen(false);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Brand Logo with Smooth Scroll to Top */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-white hover:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <BaruLagiLogo size="md" showTagline />
          </div>

          {/* Desktop Navigation Links with KATALOG Dropdown */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[11px] font-bold tracking-[0.16em] text-white">
            {/* KATALOG with Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setIsKatalogOpen(true)}
              onMouseLeave={() => setIsKatalogOpen(false)}
            >
              <button
                type="button"
                onClick={() => handleNavClick('All')}
                className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer py-1"
                aria-expanded={isKatalogOpen}
                aria-haspopup="true"
              >
                <span>KATALOG</span>
                <ChevronDown
                  className={`h-3 w-3 text-white/50 transition-transform duration-200 ${
                    isKatalogOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>
              <span
                className={`absolute bottom-1 left-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out ${
                  isKatalogOpen ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/15 bg-neutral-950/95 backdrop-blur-xl p-2 shadow-2xl transition-all duration-200 z-50 ${
                  isKatalogOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-[#A0A0A0] border-b border-white/10 mb-1">
                  KATEGORI GAWAI
                </div>
                {navCategories.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.value)}
                    className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-mono font-bold tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between group/item"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-accent-lime opacity-0 group-hover/item:opacity-100 transition-opacity">
                      &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Capsules Link */}
            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('capsules-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
              >
                KAPSUL
              </button>
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Ecosystem Showcase Link */}
            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('ecosystem-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
              >
                EKOSISTEM
              </button>
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Vault Link */}
            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('editorial-vault-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
              >
                VAULT
              </button>
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Journal Link */}
            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('journal-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
              >
                JURNAL
              </button>
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Manifesto Link */}
            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('manifesto-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
              >
                MANIFESTO
              </button>
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Trade In Link in Nav */}
            <button
              type="button"
              onClick={() => setIsTradeInOpen(true)}
              className="px-3 py-1 rounded-full border border-accent-lime/40 text-accent-lime hover:border-accent-lime hover:bg-accent-lime hover:text-black transition-all flex items-center gap-1.5 text-[10px] tracking-widest font-black shrink-0 ml-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>TRADE-IN</span>
            </button>
          </nav>

          {/* Utility Controls (Location, Search, Account, Cart) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 text-white shrink-0">
            {/* Delivery Location pill */}
            <button
              type="button"
              onClick={() => setIsLocationOpen(true)}
              className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-[#A0A0A0] hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              title="Ganti Lokasi Pengiriman"
            >
              <MapPin className="h-3.5 w-3.5 text-accent-lime shrink-0" />
              <span className="truncate max-w-[90px]">{currentZip.split(' ')[0]}</span>
            </button>

            {/* Search Toggle / Inline Input */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-neutral-900 border border-white/20 rounded-full px-3 py-1 text-xs shadow-lg animate-in fade-in duration-200">
                  <Search className="h-3.5 w-3.5 text-accent-lime shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="CARI GAWAI..."
                    autoFocus
                    className="bg-transparent text-white placeholder-white/40 outline-none text-[11px] w-24 sm:w-36 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-white/60 hover:text-white ml-0.5"
                    aria-label="Tutup pencarian"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(true);
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Cari katalog"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* User Account */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Akun Pengguna"
            >
              <User className="h-4 w-4" />
            </button>

            {/* Shopping Cart Button with Counter Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Keranjang Belanja"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent-lime text-black text-[10px] font-black flex items-center justify-center animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 text-white lg:hidden"
          >
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
                <BaruLagiLogo
                  size="sm"
                  showTagline
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const globalWindow = window as unknown as { __lenis?: { scrollTo: (target: number | string) => void } };
                    if (globalWindow?.__lenis) {
                      globalWindow.__lenis.scrollTo(0);
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-5">
                {navCategories.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.value)}
                    className="block text-xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white text-left transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('capsules-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xl font-black uppercase tracking-[0.2em] text-accent-lime hover:text-white text-left transition-colors"
                >
                  &rarr; KAPSUL KURASI
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('ecosystem-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white text-left transition-colors"
                >
                  EKOSISTEM PILIHAN
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('editorial-vault-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white text-left transition-colors"
                >
                  MASTERPIECE VAULT
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('journal-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white text-left transition-colors"
                >
                  JURNAL SIRKULAR
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('manifesto-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white text-left transition-colors"
                >
                  MANIFESTO KOLEKTIF
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTradeInOpen(true);
                  }}
                  className="block text-xl font-black uppercase tracking-[0.2em] text-accent-lime hover:text-white text-left transition-colors pt-4 border-t border-white/10"
                >
                  &rarr; TRADE-IN OLD TECH
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-mono text-[#A0A0A0] flex justify-between items-center">
              <span>CERTIFIED REFURBISHED</span>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsLocationOpen(true); }} className="underline">
                {currentZip}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
