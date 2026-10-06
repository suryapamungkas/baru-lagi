'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingCart, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';

export function MainHeader() {
  const { itemCount, setIsCartOpen } = useCart();
  const {
    setIsMobileMenuOpen,
    setIsHelpOpen,
    setIsAuthOpen,
    searchTerm,
    setSearchTerm,
    setQuickViewProduct,
    setPillarInfo,
  } = useModals();

  const placeholders = [
    'Search for MacBook Pro...',
    'Search for iPhone 13...',
    'Search for iPad Air...',
    'Search for AirPods Pro...',
    'Search for PlayStation 5...',
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Cycling animated placeholder every 3s
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders]);

  // Close search popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sampleQuickSearches = [
    'iPhone 13',
    'MacBook M2',
    'iPad Air',
    'AirPods Pro',
    'PlayStation 5',
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border-gray shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 h-16 gap-4">
        {/* Logo & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden rounded-full"
            aria-label="Open mobile navigation"
          >
            <Menu className="h-6 w-6 text-black" />
          </Button>
          <Link href="/" className="font-extrabold text-2xl tracking-tighter text-black flex items-center gap-1">
            <span>Back</span>
            <span className="bg-black text-white px-1.5 py-0.5 rounded text-sm font-bold tracking-normal">Market</span>
          </Link>
        </div>

        {/* Desktop Search Bar with Live Popover */}
        <div ref={searchContainerRef} className="flex-1 max-w-2xl hidden md:block relative">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={currentPlaceholder}
                className="w-full rounded-full bg-[#F1F1F1] pl-10 pr-10 border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-0 transition-all duration-200 text-sm h-11"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          {/* Predictive Search Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-border-gray p-4 z-50 animate-in fade-in-50 duration-150">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2 mb-4 px-2">
                {sampleQuickSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearchTerm(item);
                      setIsSearchFocused(false);
                      const el = document.getElementById('products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs bg-surface-gray hover:bg-black hover:text-white px-3 py-1.5 rounded-full font-medium transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="border-t border-border-gray pt-3 flex items-center justify-between px-2 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> All items inspected & 1-Year guaranteed
                </span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="font-bold text-black hover:underline flex items-center gap-1"
                >
                  Press Enter to view all &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons & Utilities */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-5 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setIsHelpOpen(true)}
              className="text-gray-700 hover:text-black hover:underline transition-colors"
            >
              Need help?
            </button>
            <button
              type="button"
              onClick={() => {
                setPillarInfo({
                  title: 'BaruLagi untuk Korporat & Bisnis',
                  content:
                    'Equip your growing team with sustainably sourced, certified refurbished MacBooks, Dell monitors, and smartphones at up to 70% off retail pricing.\n\n• Bulk volume discounts available\n• Dedicated account management & consolidated monthly VAT billing\n• 12 to 24 month enterprise hardware warranty.',
                });
              }}
              className="text-gray-700 hover:text-black hover:underline transition-colors"
            >
              Enterprise
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* User Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAuthOpen(true)}
              className="rounded-full hover:bg-gray-100 transition-colors"
              aria-label="User account"
            >
              <User className="h-5 w-5 text-black" />
            </Button>

            {/* Shopping Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="rounded-full relative hover:bg-gray-100 transition-colors"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="h-5 w-5 text-black" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={currentPlaceholder}
              className="w-full rounded-full bg-[#F1F1F1] pl-10 pr-10 border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-0 text-xs h-10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </header>
  );
}
