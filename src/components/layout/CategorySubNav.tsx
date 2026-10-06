'use client';

import React from 'react';
import { useModals } from '@/context/ModalContext';
import { Sparkles, RefreshCw } from 'lucide-react';

export function CategorySubNav() {
  const { activeCategory, setActiveCategory, setIsTradeInOpen, setPillarInfo } = useModals();

  const categories = [
    { label: 'All Refurbished', value: 'All' },
    { label: 'Smartphones', value: 'Smartphones' },
    { label: 'MacBooks', value: 'MacBooks' },
    { label: 'iPads', value: 'iPads' },
    { label: 'Audio', value: 'Audio' },
    { label: 'Consoles', value: 'Consoles' },
    { label: 'Great deals', value: 'Great deals' },
    { label: 'Trade-in (Cash)', value: 'Trade-in', isAction: true },
    { label: 'Protection Plan', value: 'Services', isService: true },
  ];

  const handleCategoryClick = (cat: typeof categories[0]) => {
    if (cat.isAction) {
      setIsTradeInOpen(true);
      return;
    }
    if (cat.isService) {
      setPillarInfo({
        title: 'Layanan & Perlindungan Tambahan BaruLagi',
        content:
          'Every device already includes our comprehensive 1-Year Commercial Warranty.\n\nLooking for accidental damage, screen cracking, or liquid spill coverage? Our optional Protection Plus plan provides 24-month replacement protection with 48-hour express claims handling.',
      });
      return;
    }

    setActiveCategory(cat.value);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white border-b border-border-gray sticky top-16 z-30 shadow-2xs">
      <div className="mx-auto max-w-7xl">
        <ul className="flex items-center gap-2 px-4 md:px-8 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-hide md:justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <li key={cat.label}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    cat.isAction
                      ? 'bg-accent-lime text-black hover:bg-[#cbf060] shadow-xs'
                      : isActive
                      ? 'bg-black text-white shadow-xs'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {cat.isAction && <RefreshCw className="h-3 w-3 animate-spin-reverse" />}
                  <span>{cat.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
