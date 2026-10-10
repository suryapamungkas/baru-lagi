'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Eye, Sparkles, Filter, Search, X, Box, LayoutGrid } from 'lucide-react';
import { useModals, ProductData } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { ThreeDGridContentPreview } from '@/components/cinematic/ThreeDGridContentPreview';

interface ProductsViewProps {
  initialProducts: ProductData[];
}

export function ProductsView({ initialProducts }: ProductsViewProps) {
  const { activeCategory, setActiveCategory, searchTerm, setSearchTerm, setQuickViewProduct } = useModals();
  const { addToCart } = useCart();

  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedConditionFilter, setSelectedConditionFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'All' && activeCategory !== 'Great deals') {
          if (p.category !== activeCategory) return false;
        }
        // Brand filter
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
          return false;
        }
        // Search filter
        if (searchTerm.trim() !== '') {
          const q = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat) return false;
        }
        // Condition filter
        if (selectedConditionFilter !== 'All') {
          const hasCondition = p.inventories.some(
            (inv) => inv.condition === selectedConditionFilter && inv.stockQuantity > 0
          );
          if (!hasCondition) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const minPriceA = Math.min(...a.inventories.map((i) => i.price));
        const minPriceB = Math.min(...b.inventories.map((i) => i.price));
        if (sortBy === 'price-asc') return minPriceA - minPriceB;
        if (sortBy === 'price-desc') return minPriceB - minPriceA;
        return 0;
      });
  }, [initialProducts, activeCategory, selectedBrand, searchTerm, selectedConditionFilter, sortBy]);

  const brands = ['All', 'Apple', 'Sony'];
  const conditions = ['All', 'Fair', 'Good', 'Excellent'];

  return (
    <section id="catalog-section" className="py-24 px-6 md:px-12 lg:px-20 mx-auto max-w-7xl bg-black text-white">
      {/* Catalog Title & Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A0A0A0] flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-accent-lime" />
            VERIFIED HARDWARE CATALOG
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.08em] text-white">
            {searchTerm ? `SEARCH: "${searchTerm}"` : `${activeCategory === 'All' ? 'AVAILABLE HARDWARE' : activeCategory}`}
          </h2>
          <p className="text-sm text-[#A0A0A0] mt-2 font-mono">
            {filteredProducts.length} CERTIFIED UNITS &bull; 1-YEAR COMMERCIAL WARRANTY &bull; FREE EXPRESS DISPATCH
          </p>
        </div>

        {/* Search Input inline */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH CATALOG..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-white/5 border border-white/15 rounded-lg text-xs font-mono uppercase text-white focus:outline-none focus:border-white transition-colors w-full sm:w-56"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white/5 border border-white/15 text-xs font-mono font-bold uppercase rounded-lg px-3.5 py-2.5 text-white cursor-pointer hover:border-white focus:outline-none transition-colors"
          >
            <option value="featured" className="bg-black">SORT: FEATURED</option>
            <option value="price-asc" className="bg-black">PRICE: LOW &rarr; HIGH</option>
            <option value="price-desc" className="bg-black">PRICE: HIGH &rarr; LOW</option>
          </select>
        </div>
      </motion.div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#A0A0A0] uppercase tracking-wider mr-1">BRAND:</span>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1 rounded border text-[11px] font-bold uppercase tracking-wider transition-all ${
                selectedBrand === b
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#A0A0A0] uppercase tracking-wider mr-1">COSMETIC GRADE:</span>
          {conditions.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedConditionFilter(c)}
              className={`px-3 py-1 rounded border text-[11px] font-bold uppercase tracking-wider transition-all ${
                selectedConditionFilter === c
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* View Mode Toggle: 3D Grid Preview vs Standard Grid */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/15">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
              viewMode === '3d'
                ? 'bg-white text-black shadow-lg'
                : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Box className="h-3.5 w-3.5" />
            <span>3D MATRIX PREVIEW</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-black shadow-lg'
                : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>STANDARD GRID</span>
          </button>
        </div>
      </div>

      {/* Products Display: 3D Matrix Preview or Standard Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/20 rounded-2xl bg-white/5">
          <p className="text-lg font-black uppercase tracking-wider text-white mb-2">No matching hardware units</p>
          <p className="text-xs text-[#A0A0A0] font-mono mb-6">Reset filters or refine your search query.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSelectedBrand('All');
              setSelectedConditionFilter('All');
              setSearchTerm('');
            }}
            className="border border-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
          >
            RESET FILTERS
          </button>
        </div>
      ) : viewMode === '3d' ? (
        <ThreeDGridContentPreview products={filteredProducts} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const images: string[] = JSON.parse(product.images || '["/hero.jpg"]');
            const specs = JSON.parse(product.specs || '{}');
            const prices = product.inventories.map((i) => i.price);
            const lowestPrice = prices.length > 0 ? Math.min(...prices) : product.basePrice;
            const totalStock = product.inventories.reduce((acc, curr) => acc + curr.stockQuantity, 0);
            const defaultInv = product.inventories[0];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="group relative border border-white/10 hover:border-white/30 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-white/5"
              >
                {/* Product Image Area */}
                <div
                  onClick={() => setQuickViewProduct(product)}
                  className="relative aspect-square p-8 flex items-center justify-center cursor-pointer bg-white/2 overflow-hidden"
                >
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                    <Image
                      src={images[0] || '/hero.jpg'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                      {product.category}
                    </span>
                    {totalStock <= 4 && totalStock > 0 && (
                      <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        ONLY {totalStock} LEFT
                      </span>
                    )}
                  </div>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-6 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="w-full bg-white text-black font-black text-xs py-3 uppercase tracking-widest border border-white hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      CONFIGURE &amp; SPECS
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between border-t border-white/5">
                  <div>
                    {/* Brand & Rating */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#A0A0A0] mb-2">
                      <span className="uppercase tracking-widest">{product.brand}</span>
                      <div className="flex items-center gap-1 text-white">
                        <Star className="h-3 w-3 fill-accent-lime text-accent-lime" />
                        <span className="font-bold">4.9</span>
                        <span className="text-white/40">({product.inventories[0]?.reviews?.length || 12})</span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="font-black text-lg md:text-xl uppercase tracking-wider text-white hover:text-gray-300 cursor-pointer mb-2 line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Specs Brief */}
                    <p className="text-xs font-mono text-[#A0A0A0] line-clamp-1 mb-5">
                      {specs.cpu || specs.screen || specs.anc || specs.display || 'Refurbished Certified'} &bull; 1-Year Coverage
                    </p>

                    {/* Condition Choices Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.inventories.map((inv) => (
                        <button
                          key={inv.id}
                          type="button"
                          onClick={() => setQuickViewProduct(product)}
                          className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10 hover:border-white bg-white/5 text-white/80 hover:text-white transition-colors"
                        >
                          {inv.condition}: ${inv.price.toFixed(0)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Buy Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#A0A0A0] block">
                        STARTING AT
                      </span>
                      <div className="flex items-baseline gap-2 font-mono">
                        <span className="text-2xl font-black text-white">
                          ${lowestPrice.toFixed(0)}
                        </span>
                        {product.basePrice > lowestPrice && (
                          <span className="text-xs text-white/40 line-through">
                            ${product.basePrice.toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (defaultInv) {
                          addToCart({
                            id: defaultInv.id,
                            productId: product.id,
                            name: product.name,
                            image: images[0] || '/hero.jpg',
                            condition: defaultInv.condition,
                            color: defaultInv.color,
                            storage: defaultInv.storage,
                            price: defaultInv.price,
                            stockQuantity: defaultInv.stockQuantity,
                          });
                        }
                      }}
                      className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all duration-200 active:scale-95"
                    >
                      <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-200 group-hover:translate-y-0" />
                      <span className="relative z-10 flex items-center gap-1.5 transition-colors group-hover:text-black">
                        <ShoppingCart className="h-3 w-3" />
                        BUY
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
