'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicHeaderProps {
  onOpenTelemetry?: () => void;
  onOpenManifest?: () => void;
}

export function CinematicHeader({ onOpenTelemetry, onOpenManifest }: CinematicHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger solid background when scrolled past 60px
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'FALCON 9', href: '#falcon9' },
    { label: 'STARSHIP', href: '#starship' },
    { label: 'HUMAN SPACEFLIGHT', href: '#humans' },
    { label: 'MARS', href: '#mars' },
    { label: 'MISSIONS', onClick: onOpenTelemetry },
    { label: 'MANIFEST', onClick: onOpenManifest },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12 md:px-20">
          {/* Logo Minimalis */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-black tracking-[0.25em] text-white uppercase group"
          >
            <span>AEROSPACE</span>
            <span className="h-2 w-2 rounded-full bg-white opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
          </Link>

          {/* Desktop Nav Links dengan efek underline halus */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-white">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group py-1">
                {link.href ? (
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    onClick={link.onClick}
                    className="text-[#E0E0E0] hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                )}
                {/* Underline halus pada hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </div>
            ))}
          </nav>

          {/* Right Hamburger / Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#A0A0A0] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center px-10 text-white lg:hidden"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() => {
                      if (link.href) scrollTo(link.href);
                      if (link.onClick) {
                        link.onClick();
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="text-2xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white hover:translate-x-2 transition-all block text-left"
                  >
                    {link.label}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-white/20 text-xs tracking-widest text-[#A0A0A0]">
              MISSION CONTROL &bull; FLIGHT READINESS 100%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
