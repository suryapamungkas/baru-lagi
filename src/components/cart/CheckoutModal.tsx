'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '123',
  });

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'BM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={handleClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-border-gray overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-gray flex items-center justify-between bg-surface-gray">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-600" />
            <h3 className="font-bold text-lg">Secure Refurbished Checkout</h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full text-gray-500 hover:text-black">
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-6">
            {/* Order Brief */}
            <div className="p-4 rounded-xl bg-surface-gray border border-border-gray flex justify-between items-center text-sm">
              <div>
                <span className="font-bold">{items.length} items</span> in order
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Total Due:</span>
                <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-2">
                <Truck className="h-4 w-4 text-black" /> 1. Shipping Address
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Input
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    type="email"
                    placeholder="Email Address (for order tracking)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    required
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-black" /> 2. Payment Method
              </h4>
              <div className="p-4 rounded-xl border border-border-gray bg-white space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>256-bit Encrypted Transaction</span>
                  <span>SSL Verified</span>
                </div>
                <Input
                  required
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    required
                    placeholder="MM/YY"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                  />
                  <Input
                    required
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Includes 1-Year Commercial Warranty and 30-Day Money-Back Guarantee.</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black/90 font-bold py-6 text-base rounded-xl"
            >
              Pay ${totalPrice.toFixed(2)} & Place Order
            </Button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold">Order Confirmed!</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Thank you for choosing refurbished. You have saved e-waste and gotten high-grade tech.
            </p>
            <div className="p-4 bg-surface-gray rounded-xl border border-border-gray inline-block text-left text-sm">
              <p><span className="text-gray-500">Order ID:</span> <span className="font-mono font-bold text-black">{orderId}</span></p>
              <p><span className="text-gray-500">Shipping:</span> 1-2 business days with tracking</p>
              <p><span className="text-gray-500">Warranty:</span> 1-Year Active Coverage</p>
            </div>
            <div className="pt-4">
              <Button
                onClick={handleClose}
                className="bg-black text-white hover:bg-black/90 font-bold px-8 py-5 rounded-xl"
              >
                Back to Marketplace
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
