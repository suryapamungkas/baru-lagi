'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShieldCheck, Check, Star, RefreshCw, ShoppingCart, Zap, ChevronDown, Cpu, Activity, Sparkles, Truck } from 'lucide-react';
import { useModals } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

function safeParseImages(imagesJson?: string): string[] {
  try {
    return JSON.parse(imagesJson || '["/hero.jpg"]');
  } catch {
    return ['/hero.jpg'];
  }
}

function safeParseSpecs(specsJson?: string): Record<string, string> {
  try {
    return JSON.parse(specsJson || '{}');
  } catch {
    return {};
  }
}

export function ProductDetailModal() {
  const { quickViewProduct, setQuickViewProduct } = useModals();
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useCart();

  const [selectedCondition, setSelectedCondition] = useState<string>('Good');

  if (!quickViewProduct) return null;

  const images = safeParseImages(quickViewProduct.images);
  const specs = safeParseSpecs(quickViewProduct.specs);

  // Match inventory by selected condition or fall back to first
  const currentInventory = 
    quickViewProduct.inventories.find((inv) => inv.condition === selectedCondition) ||
    quickViewProduct.inventories[0];

  const currentPrice = currentInventory?.price || quickViewProduct.basePrice;
  const originalPrice = currentPrice * 1.35; // Savings calculation vs retail
  const savingsAmount = originalPrice - currentPrice;

  const conditions = [
    {
      name: 'Fair',
      desc: 'Screen in very good condition. Visible micro-scratches on casing. 100% functional.',
      badge: 'Lowest price',
    },
    {
      name: 'Good',
      desc: 'Light signs of wear. Micro-scratches invisible from 20cm away. Battery > 85%.',
      badge: 'Most popular',
    },
    {
      name: 'Excellent',
      desc: 'Flawless condition. Body and screen pristine with zero visible scratches. Battery > 90%.',
      badge: 'Pristine quality',
    },
  ];

  const handleAddToCart = () => {
    if (!currentInventory) return;
    addToCart({
      id: currentInventory.id,
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      image: images[0],
      condition: currentInventory.condition,
      color: currentInventory.color,
      storage: currentInventory.storage,
      price: currentInventory.price,
      stockQuantity: currentInventory.stockQuantity,
    });
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-border-gray overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Gallery */}
          <div className="p-8 bg-surface-gray border-b md:border-b-0 md:border-r border-border-gray flex flex-col justify-between items-center">
            <div className="relative w-full aspect-square max-w-sm flex items-center justify-center">
              <Image
                src={images[0] || '/hero.jpg'}
                alt={quickViewProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain p-4"
              />
            </div>

            {/* Quality verification pledge */}
            <div className="w-full bg-white p-4 rounded-xl border border-border-gray mt-6 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>Certified Refurbished & 25-Point Inspected</span>
              </div>
              <ul className="grid grid-cols-2 gap-1 text-gray-600 pl-6 list-disc">
                <li>100% Functional</li>
                <li>Sanitized & clean</li>
                <li>Battery health &gt;85%</li>
                <li>Clean IMEI / Unlocked</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Customization & Purchase */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Title */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-bold tracking-wider text-gray-500">
                  {quickViewProduct.brand}
                </span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center text-yellow-400 text-xs font-bold gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                  <span className="text-black">4.9 / 5</span>
                  <span className="text-gray-400 font-normal">(Verified buyer reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                {quickViewProduct.name}
              </h2>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-extrabold text-black">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Save ${savingsAmount.toFixed(0)}
                </span>
              </div>

              {/* Multi-Condition Selector */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  <span>Cosmetic Condition:</span>
                  <span className="text-black capitalize font-semibold">{selectedCondition}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {conditions.map((cond) => {
                    const inv = quickViewProduct.inventories.find((i) => i.condition === cond.name);
                    const isAvailable = Boolean(inv && inv.stockQuantity > 0);
                    const isSelected = selectedCondition === cond.name;

                    return (
                      <button
                        key={cond.name}
                        type="button"
                        onClick={() => setSelectedCondition(cond.name)}
                        disabled={!isAvailable}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'border-black bg-black text-white shadow-md'
                            : isAvailable
                            ? 'border-border-gray hover:border-gray-400 bg-white text-black'
                            : 'border-dashed border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{cond.name}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-accent-lime" />}
                        </div>
                        <div className={`text-xs font-medium ${isSelected ? 'text-gray-200' : 'text-gray-600'}`}>
                          {inv ? `$${inv.price.toFixed(0)}` : 'Out of stock'}
                        </div>
                        <span className={`text-[9px] block mt-1 font-bold ${isSelected ? 'text-accent-lime' : 'text-gray-400'}`}>
                          {cond.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-gray-500 italic bg-surface-gray p-2.5 rounded-lg border border-border-gray">
                  {conditions.find((c) => c.name === selectedCondition)?.desc}
                </p>
              </div>

              {/* Isle Thorne 4-Panel Details Accordion */}
              <div className="space-y-2 mb-6 text-xs">
                {/* 1. Diagnostik Lab 25-Titik */}
                <details open className="group border border-border-gray rounded-xl overflow-hidden bg-surface-gray">
                  <summary className="flex items-center justify-between p-3 font-mono font-bold uppercase tracking-wider text-black cursor-pointer hover:bg-gray-100 transition-colors list-none select-none">
                    <span className="flex items-center gap-2 text-[11px]">
                      <Activity className="h-3.5 w-3.5 text-emerald-600" />
                      <span>[ DIAGNOSTIK LAB 25-TITIK ]</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-3.5 pt-0 text-gray-600 space-y-1.5 border-t border-border-gray/50 text-[11px] font-sans">
                    <p className="font-semibold text-black">Audit Diagnostik Bertingkat Laboratorium:</p>
                    <ul className="grid grid-cols-2 gap-1.5 list-disc pl-4 text-gray-500 text-[10px]">
                      <li>Motherboard &amp; Tegangan IC</li>
                      <li>Health Baterai &gt; 85%</li>
                      <li>Kalibrasi Sensor &amp; TrueTone</li>
                      <li>Face ID / Biometrik Fingerprint</li>
                      <li>Kerapatan Pixel &amp; Responsivitas</li>
                      <li>Mikrofon &amp; Audio Spasial</li>
                    </ul>
                  </div>
                </details>

                {/* 2. Spesifikasi Hardware */}
                <details className="group border border-border-gray rounded-xl overflow-hidden bg-surface-gray">
                  <summary className="flex items-center justify-between p-3 font-mono font-bold uppercase tracking-wider text-black cursor-pointer hover:bg-gray-100 transition-colors list-none select-none">
                    <span className="flex items-center gap-2 text-[11px]">
                      <Cpu className="h-3.5 w-3.5 text-blue-600" />
                      <span>[ SPESIFIKASI HARDWARE ]</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-3.5 pt-0 text-gray-600 space-y-2 border-t border-border-gray/50 text-[11px] font-sans">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(specs).map(([key, val]) => (
                        <div key={key} className="p-1.5 bg-white rounded border border-border-gray/60">
                          <span className="text-gray-400 uppercase font-semibold text-[9px] block font-mono">{key}</span>
                          <span className="font-semibold text-black text-[11px]">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>

                {/* 3. Proses Rekondisi & Higienisasi */}
                <details className="group border border-border-gray rounded-xl overflow-hidden bg-surface-gray">
                  <summary className="flex items-center justify-between p-3 font-mono font-bold uppercase tracking-wider text-black cursor-pointer hover:bg-gray-100 transition-colors list-none select-none">
                    <span className="flex items-center gap-2 text-[11px]">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      <span>[ PROSES REKONDISI &amp; HIGIENISASI ]</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-3.5 pt-0 text-gray-600 space-y-1.5 border-t border-border-gray/50 text-[11px] font-sans">
                    <p>Pembersihan ultrasonik medis pada port dan kisi speaker. Penggantian pasta termal grade industri untuk pendinginan optimal.</p>
                    <p className="text-[10px] text-gray-500 font-mono">Penghapusan data bersertifikasi DoD 5220.22-M tanpa jejak.</p>
                  </div>
                </details>

                {/* 4. Garansi & Logistik Terproteksi */}
                <details className="group border border-border-gray rounded-xl overflow-hidden bg-surface-gray">
                  <summary className="flex items-center justify-between p-3 font-mono font-bold uppercase tracking-wider text-black cursor-pointer hover:bg-gray-100 transition-colors list-none select-none">
                    <span className="flex items-center gap-2 text-[11px]">
                      <Truck className="h-3.5 w-3.5 text-purple-600" />
                      <span>[ GARANSI &amp; LOGISTIK TERPROTEKSI ]</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-3.5 pt-0 text-gray-600 space-y-1.5 border-t border-border-gray/50 text-[11px] font-sans">
                    <p>Garansi komersial 1 tahun penuh: motherboard, layar, dan baterai. Opsi ganti unit atau refund 100%.</p>
                    <p className="text-[10px] text-gray-500">Asuransi ekspedisi gratis &amp; kemasan kardus daur ulang bebas plastik.</p>
                  </div>
                </details>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  In Stock ({currentInventory?.stockQuantity || 1} available) — Ships tomorrow with free tracking
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-border-gray">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="bg-black text-white hover:bg-black/90 font-bold py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="bg-accent-lime text-black hover:bg-[#cbf060] font-bold py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Zap className="h-5 w-5 fill-black" />
                  Buy Now
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-black" /> 1-Year Warranty
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="h-3.5 w-3.5 text-black" /> Free 30-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
