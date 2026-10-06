'use client';

import React from 'react';
import { X, Search, ShoppingBag, Smartphone, Laptop, Tablet, Headphones, Gamepad, RefreshCw, HelpCircle, User, MapPin, Globe } from 'lucide-react';
import { useModals } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function MobileMenuDrawer() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setActiveCategory,
    setIsTradeInOpen,
    setIsHelpOpen,
    setIsAuthOpen,
    setIsLocationOpen,
    setIsCurrencyOpen,
    searchTerm,
    setSearchTerm,
  } = useModals();
  const { setIsCartOpen, itemCount } = useCart();

  if (!isMobileMenuOpen) return null;

  const categories = [
    { name: 'All', icon: ShoppingBag },
    { name: 'Smartphones', icon: Smartphone },
    { name: 'MacBooks', icon: Laptop },
    { name: 'iPads', icon: Tablet },
    { name: 'Audio', icon: Headphones },
    { name: 'Consoles', icon: Gamepad },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border-gray flex items-center justify-between">
            <span className="font-extrabold text-xl tracking-tight">BaruLagi</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-gray-500 hover:text-black"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search bar inside drawer */}
          <div className="p-4 border-b border-border-gray">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search refurbished..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 rounded-full bg-surface-gray border-border-gray text-xs"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
                Categories
              </span>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setIsMobileMenuOpen(false);
                        const el = document.getElementById('products-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-surface-gray text-left text-gray-800"
                    >
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
                Services & Tools
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTradeInOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-accent-lime/20 text-black hover:bg-accent-lime/30 text-left"
                >
                  <RefreshCw className="h-4 w-4 text-black" />
                  <span>Trade-In Old Device (Instant Cash)</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-surface-gray text-left"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                    <span>My Cart</span>
                  </div>
                  <span className="h-5 w-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-surface-gray text-left"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  <span>My Account</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsHelpOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-surface-gray text-left"
                >
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  <span>Help & Customer Care</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer inside drawer */}
          <div className="p-4 border-t border-border-gray bg-surface-gray flex justify-between items-center text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLocationOpen(true);
              }}
              className="flex items-center gap-1 font-medium hover:underline text-gray-600"
            >
              <MapPin className="h-3.5 w-3.5" /> Location
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCurrencyOpen(true);
              }}
              className="flex items-center gap-1 font-medium hover:underline text-gray-600"
            >
              <Globe className="h-3.5 w-3.5" /> Region
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
