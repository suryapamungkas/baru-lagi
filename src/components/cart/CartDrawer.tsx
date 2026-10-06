'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, setIsCheckoutOpen } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME20') {
      setDiscount(20);
      setPromoSuccess('$20 WELCOME discount applied!');
    } else if (code === 'STUDENT10') {
      const disc = totalPrice * 0.1;
      setDiscount(disc);
      setPromoSuccess('10% Student discount applied!');
    } else {
      setPromoError('Invalid code. Try WELCOME20 or STUDENT10');
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-border-gray flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-black" />
              <h2 className="text-xl font-bold">Your Cart ({items.reduce((a, b) => a + b.quantity, 0)})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free shipping bar */}
          <div className="bg-accent-lime/20 border-b border-border-gray px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-black">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Free Express Shipping & 1-Year Warranty included!</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border-gray">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-surface-gray flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xs">
                  Discover expertly refurbished electronics tested to work like brand new.
                </p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-black text-white hover:bg-black/90 font-bold rounded-lg px-6"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-lg bg-surface-gray border border-border-gray shrink-0 overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src={item.image || '/hero.jpg'}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm truncate pr-2">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-gray-100 text-gray-800">
                        {item.condition} Condition
                      </span>
                      {item.storage && (
                        <span className="text-xs text-gray-500">{item.storage}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border-gray rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 transition-colors rounded-l-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 transition-colors rounded-r-md"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border-gray bg-white space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Promo code (WELCOME20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="pl-8 text-xs uppercase h-9 bg-surface-gray border-border-gray focus-visible:ring-black"
                  />
                </div>
                <Button type="submit" variant="outline" className="h-9 text-xs font-bold px-3">
                  Apply
                </Button>
              </form>
              {promoSuccess && <p className="text-xs text-emerald-600 font-medium">{promoSuccess}</p>}
              {promoError && <p className="text-xs text-red-500 font-medium">{promoError}</p>}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border-gray text-black">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-black text-white hover:bg-black/90 font-bold py-6 text-base rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
