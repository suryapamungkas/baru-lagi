'use client';

import React, { useState } from 'react';
import { X, Smartphone, Laptop, Tablet, Watch, ArrowRight, CheckCircle2, DollarSign, ShieldCheck } from 'lucide-react';
import { useModals } from '@/context/ModalContext';
import { Button } from '@/components/ui/button';
import { createTradeInQuote } from '@/app/actions';

export function TradeInModal() {
  const { isTradeInOpen, setIsTradeInOpen } = useModals();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [deviceCategory, setDeviceCategory] = useState<'smartphone' | 'laptop' | 'tablet' | 'watch'>('smartphone');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('Good');
  const [quoteValue, setQuoteValue] = useState(0);
  const [quoteId, setQuoteId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isTradeInOpen) return null;

  const devicesByCategory = {
    smartphone: [
      { name: 'iPhone 14 Pro 128GB', baseValue: 460 },
      { name: 'iPhone 13 128GB', baseValue: 330 },
      { name: 'iPhone 12 64GB', baseValue: 210 },
      { name: 'Samsung Galaxy S22 128GB', baseValue: 260 },
      { name: 'Google Pixel 7 128GB', baseValue: 190 },
    ],
    laptop: [
      { name: 'MacBook Air M2 256GB', baseValue: 580 },
      { name: 'MacBook Pro 13" M1 256GB', baseValue: 490 },
      { name: 'Dell XPS 13 i7 16GB', baseValue: 380 },
      { name: 'Lenovo ThinkPad X1 Carbon', baseValue: 340 },
    ],
    tablet: [
      { name: 'iPad Pro 11" 128GB', baseValue: 390 },
      { name: 'iPad Air 4th Gen 64GB', baseValue: 240 },
      { name: 'Samsung Galaxy Tab S8', baseValue: 220 },
    ],
    watch: [
      { name: 'Apple Watch Series 8 45mm', baseValue: 180 },
      { name: 'Apple Watch Ultra', baseValue: 360 },
      { name: 'Galaxy Watch 5 Pro', baseValue: 120 },
    ],
  };

  const conditionMultipliers: Record<string, { mult: number; desc: string }> = {
    Flawless: { mult: 1.15, desc: 'Zero scratches, 100% like new, full battery health.' },
    Good: { mult: 1.0, desc: 'Light signs of normal use, minor case wear, fully working.' },
    Fair: { mult: 0.75, desc: 'Visible scratches or scuffs, fully operational.' },
    Broken: { mult: 0.35, desc: 'Cracked glass, heavy damage, but still powers on.' },
  };

  const handleCalculateQuote = async () => {
    setIsSubmitting(true);
    const model = devicesByCategory[deviceCategory].find((d) => d.name === selectedModel);
    const base = model ? model.baseValue : 250;
    const mult = conditionMultipliers[selectedCondition]?.mult || 1.0;
    const finalVal = Math.round(base * mult);
    setQuoteValue(finalVal);

    // Call server action to save quote
    const res = await createTradeInQuote({
      deviceModel: selectedModel,
      declaredCondition: selectedCondition,
      estimatedValue: finalVal,
    });

    if (res.success && res.quote) {
      setQuoteId(res.quote.id);
    } else {
      setQuoteId('TI-' + Math.floor(100000 + Math.random() * 900000));
    }

    setIsSubmitting(false);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedModel('');
    setSelectedCondition('Good');
    setIsTradeInOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={handleReset} />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-border-gray overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border-gray flex items-center justify-between bg-surface-gray">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
              Mesin Tukar Tambah BaruLagi
            </span>
            <h3 className="font-bold text-xl text-black">Tukar Tambah Perangkat Anda Jadi Uang Tunai / Saldo</h3>
          </div>
          <button onClick={handleReset} className="p-1 rounded-full text-gray-500 hover:text-black">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="p-6">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-gray text-xs font-semibold">
            <span className={step >= 1 ? 'text-black font-bold' : 'text-gray-400'}>1. Category</span>
            <span>&rarr;</span>
            <span className={step >= 2 ? 'text-black font-bold' : 'text-gray-400'}>2. Model</span>
            <span>&rarr;</span>
            <span className={step >= 3 ? 'text-black font-bold' : 'text-gray-400'}>3. Condition</span>
            <span>&rarr;</span>
            <span className={step >= 4 ? 'text-black font-bold' : 'text-gray-400'}>4. Offer</span>
          </div>

          {/* STEP 1: CATEGORY */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-base">Select the type of device you want to trade:</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'smartphone', label: 'Smartphone', icon: Smartphone },
                  { id: 'laptop', label: 'Laptop', icon: Laptop },
                  { id: 'tablet', label: 'Tablet', icon: Tablet },
                  { id: 'watch', label: 'Smartwatch', icon: Watch },
                ].map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setDeviceCategory(cat.id as any);
                        setStep(2);
                      }}
                      className="p-5 rounded-xl border border-border-gray hover:border-black hover:bg-surface-gray transition-all text-left flex flex-col items-center justify-center gap-3 group"
                    >
                      <Icon className="h-8 w-8 text-gray-700 group-hover:text-black group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-sm text-black">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: MODEL */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-base">Select your exact model:</h4>
                <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:underline">
                  Change category
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {devicesByCategory[deviceCategory].map((dev) => (
                  <button
                    key={dev.name}
                    type="button"
                    onClick={() => {
                      setSelectedModel(dev.name);
                      setStep(3);
                    }}
                    className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                      selectedModel === dev.name ? 'border-black bg-surface-gray' : 'border-border-gray hover:border-gray-400'
                    }`}
                  >
                    <span className="font-semibold text-sm">{dev.name}</span>
                    <span className="text-xs text-emerald-600 font-bold">Up to ${Math.round(dev.baseValue * 1.15)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CONDITION */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-base">What is the condition of your {selectedModel}?</h4>
                <button onClick={() => setStep(2)} className="text-xs text-gray-500 hover:underline">
                  Back
                </button>
              </div>

              <div className="space-y-2.5">
                {Object.entries(conditionMultipliers).map(([cond, info]) => (
                  <label
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      selectedCondition === cond ? 'border-black bg-surface-gray shadow-xs' : 'border-border-gray hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === cond}
                      onChange={() => setSelectedCondition(cond)}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-bold text-sm block text-black">{cond}</span>
                      <span className="text-xs text-gray-500">{info.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <Button
                onClick={handleCalculateQuote}
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-black/90 font-bold py-6 text-base rounded-xl mt-4"
              >
                {isSubmitting ? 'Calculating Quote...' : 'Get Instant Cash Valuation'}
              </Button>
            </div>
          )}

          {/* STEP 4: FINAL QUOTE */}
          {step === 4 && (
            <div className="text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <DollarSign className="h-10 w-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Pre-Approved Appraisal Offer
                </span>
                <div className="text-4xl md:text-5xl font-black text-black mt-1">
                  ${quoteValue}.00
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  for your <span className="font-bold text-black">{selectedModel}</span> ({selectedCondition} condition)
                </p>
              </div>

              <div className="bg-surface-gray p-4 rounded-xl border border-border-gray text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Quote ID:</span>
                  <span className="font-mono font-bold text-black">{quoteId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Valid For:</span>
                  <span className="font-semibold text-black">14 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Kit:</span>
                  <span className="font-semibold text-emerald-600">Free prepaid box & shipping label</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  onClick={() => {
                    alert(`Trade-in locked in! Your prepaid shipping kit is being dispatched under reference: ${quoteId}`);
                    handleReset();
                  }}
                  className="w-full bg-black text-white hover:bg-black/90 font-bold py-6 text-base rounded-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Accept Offer & Request Prepaid Shipping Kit
                </Button>

                <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> No obligation. If your device differs upon inspection, we ship it back free.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
