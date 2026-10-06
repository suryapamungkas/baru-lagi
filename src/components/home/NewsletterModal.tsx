'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeNewsletter } from '@/app/actions';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Trigger after 2s delay as requested in instructions
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    const res = await subscribeNewsletter(email.trim());
    setLoading(false);

    if (res.success) {
      setDiscountCode('WELCOME20');
      setIsSubmitted(true);
      // Auto close after 5s or keep for user to copy code
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100%-2rem)] md:w-full max-w-sm animate-in slide-in-from-bottom duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 relative border-2 border-black">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Close newsletter modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 bg-accent-lime text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-3">
              <Gift className="h-3 w-3" />
              <span>$20 Instant Voucher</span>
            </div>

            <h3 className="font-extrabold text-xl text-black mb-1.5 pr-6 leading-tight">
              Get the best refurbished deals first.
            </h3>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Join 1M+ smart shoppers. Get secret price drops, restock alerts, and $20 off your first purchase.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-surface-gray border-border-gray text-xs h-11 focus-visible:ring-black"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-black text-white hover:bg-black/90 font-bold text-xs h-11 px-4 rounded-xl"
              >
                {loading ? 'Sending...' : 'Claim $20'}
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2 space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-base text-black">You are on the list!</h4>
            <p className="text-xs text-gray-600">
              Your $20 promo code is: <strong className="font-mono text-black bg-accent-lime px-2 py-0.5 rounded">{discountCode}</strong>
            </p>
            <Button
              onClick={handleClose}
              className="w-full bg-black text-white text-xs font-bold py-2 rounded-xl mt-2"
            >
              Apply at Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
