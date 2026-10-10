'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, RefreshCw, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BaruLagiLogo } from '@/components/ui/BaruLagiLogo';

export function MarketplaceHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const {
    setActiveCategory,
    setIsTradeInOpen,
    setIsAuthOpen,
    setIsLocationOpen,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
    currentZip,
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
    { label: 'ALL DEVICES', value: 'All' },
    { label: 'MACBOOKS', value: 'MacBooks' },
    { label: 'SMARTPHONES', value: 'Smartphones' },
    { label: 'IPADS', value: 'iPads' },
    { label: 'AUDIO', value: 'Audio' },
    { label: 'CONSOLES', value: 'Consoles' },
  ];

  const handleNavClick = (cat: string) => {
    setActiveCategory(cat);
    setIsMobileMenuOpen(false);
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
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10">
          {/* Brand Logo with Smooth Scroll to Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-white hover:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <BaruLagiLogo size="md" showTagline />
          </div>

          {/* Desktop Navigation Links with animated hover underline */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold tracking-[0.2em] text-white">
            {navCategories.map((item) => (
              <div key={item.label} className="relative group py-1">
                <button
                  type="button"
                  onClick={() => handleNavClick(item.value)}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </div>
            ))}

            {/* Capsules Link */}
            <div className="relative group py-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('capsules-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                KAPSUL
              </button>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Ecosystem Showcase Link */}
            <div className="relative group py-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('ecosystem-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                EKOSISTEM
              </button>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Vault Link */}
            <div className="relative group py-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('editorial-vault-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                VAULT
              </button>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Journal Link */}
            <div className="relative group py-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('journal-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                JURNAL
              </button>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Manifesto Link */}
            <div className="relative group py-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('manifesto-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                MANIFESTO
              </button>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 ease-out group-hover:w-full" />
            </div>

            {/* Trade In Link */}
            <button
              type="button"
              onClick={() => setIsTradeInOpen(true)}
              className="px-3 py-1 rounded-full border border-white/30 text-accent-lime hover:border-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 text-[10px] tracking-widest font-black"
            >
              <RefreshCw className="h-3 w-3" />
              <span>TRADE-IN</span>
            </button>
          </nav>

          {/* Utility Controls (Location, Search, Account, Cart) */}
          <div className="flex items-center gap-3 sm:gap-5 text-white">
            {/* Delivery Location pill */}
            <button
              type="button"
              onClick={() => setIsLocationOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#A0A0A0] hover:text-white transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-accent-lime" />
              <span>{currentZip.split(' ')[0]}</span>
            </button>

            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setIsSearchOpen(!isSearchOpen);
              }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Search catalog"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* User Account */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="User account"
            >
              <User className="h-4 w-4" />
            </button>

            {/* Shopping Cart Button with Counter Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Shopping Cart"
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
