'use client';

import React, { useState } from 'react';
import { X, MapPin, Globe, HelpCircle, User, ShieldCheck, Check, Sparkles, GraduationCap } from 'lucide-react';
import { useModals } from '@/context/ModalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function GlobalModals() {
  const {
    isLocationOpen,
    setIsLocationOpen,
    isCurrencyOpen,
    setIsCurrencyOpen,
    isHelpOpen,
    setIsHelpOpen,
    isAuthOpen,
    setIsAuthOpen,
    pillarInfo,
    setPillarInfo,
    currentZip,
    setCurrentZip,
  } = useModals();

  const [inputZip, setInputZip] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [authSuccess, setAuthSuccess] = useState(false);

  return (
    <>
      {/* 1. LOCATION MODAL */}
      {isLocationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsLocationOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border-gray z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-black" />
                <h3 className="font-bold text-lg">Delivery Location</h3>
              </div>
              <button onClick={() => setIsLocationOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enter your Postal/ZIP code to calculate localized shipping arrival dates and check warehouse inventory.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputZip.trim()) {
                  setCurrentZip(inputZip.trim());
                  setIsLocationOpen(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">ZIP / Postal Code</label>
                <Input
                  required
                  placeholder="e.g. 94103 or 10001"
                  value={inputZip}
                  onChange={(e) => setInputZip(e.target.value)}
                />
              </div>
              <div className="p-3 bg-surface-gray rounded-lg text-xs text-gray-600">
                <span className="font-semibold block text-black">Current region: {currentZip}</span>
                Standard transit time: 1-2 business days with free door delivery.
              </div>
              <Button type="submit" className="w-full bg-black text-white hover:bg-black/90 font-bold py-5 rounded-xl">
                Update Location
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 2. REGION & CURRENCY MODAL */}
      {isCurrencyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsCurrencyOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border-gray z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-black" />
                <h3 className="font-bold text-lg">Language & Currency</h3>
              </div>
              <button onClick={() => setIsCurrencyOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Preferred Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {['English (US)', 'Bahasa Indonesia', 'Español', 'Français'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`p-3 rounded-lg border text-sm font-semibold text-left transition-colors ${
                        selectedLanguage === lang ? 'border-black bg-surface-gray' : 'border-border-gray hover:border-gray-400'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Display Currency</label>
                <div className="grid grid-cols-2 gap-2">
                  {['USD ($)', 'IDR (Rp)', 'EUR (€)', 'GBP (£)'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setSelectedCurrency(curr)}
                      className={`p-3 rounded-lg border text-sm font-semibold text-left transition-colors ${
                        selectedCurrency === curr ? 'border-black bg-surface-gray' : 'border-border-gray hover:border-gray-400'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={() => setIsCurrencyOpen(false)} className="w-full bg-black text-white hover:bg-black/90 font-bold py-5 rounded-xl">
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. HELP & FAQ MODAL */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsHelpOpen(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-border-gray z-10 max-h-[85vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6 border-b border-border-gray pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-black" />
                <h3 className="font-bold text-xl">Customer Support & FAQs</h3>
              </div>
              <button onClick={() => setIsHelpOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'Apa standar kualitas rekondisi BaruLagi?',
                  a: 'Setiap gawai yang dijual di platform BaruLagi melalui inspeksi ketat 25 titik oleh teknisi ahli tersertifikasi. Baterai teruji kapasitas >85%, data dibersihkan 100%, dan performa fungsional bergaransi penuh.',
                },
                {
                  q: 'What is included in the 1-Year Commercial Warranty?',
                  a: 'All devices come with 12 months of hardware warranty covering technical faults, internal component failures, and defects. We repair, replace, or refund with zero hassle.',
                },
                {
                  q: 'How do returns work?',
                  a: 'You get 30 days to test your device. If you change your mind for any reason, request a free return label and receive a 100% full refund.',
                },
                {
                  q: 'How does Trade-In work?',
                  a: 'Select your old device, answer 3 simple condition questions to get an instant appraisal quote, and we send you a prepaid insured shipping box. Cash is transferred once received.',
                },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-gray border border-border-gray">
                  <h4 className="font-bold text-sm mb-1">{faq.q}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}

              <div className="p-4 bg-accent-lime/30 rounded-xl border border-accent-lime text-center space-y-2 mt-6">
                <p className="font-bold text-sm">Need to talk to a human expert?</p>
                <p className="text-xs text-gray-700">Support is active 24/7. Response within 5 minutes.</p>
                <Button
                  onClick={() => {
                    alert('Live chat session initiated! An agent will respond in your browser shortly.');
                    setIsHelpOpen(false);
                  }}
                  className="bg-black text-white hover:bg-black/90 font-bold px-6 py-4 rounded-lg text-xs"
                >
                  Start Live Chat Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. USER AUTH MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAuthOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border-gray z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-black" />
                <h3 className="font-bold text-xl">{authTab === 'login' ? 'Sign In to Account' : 'Create Account'}</h3>
              </div>
              <button onClick={() => setIsAuthOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>

            {authSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-lg">Welcome back!</h4>
                <p className="text-xs text-gray-500">You are signed in. Your order history and saved devices are active.</p>
                <Button onClick={() => setIsAuthOpen(false)} className="bg-black text-white px-6 py-4 rounded-xl font-bold">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAuthSuccess(true);
                }}
                className="space-y-4"
              >
                <div className="flex border-b border-border-gray mb-4">
                  <button
                    type="button"
                    onClick={() => setAuthTab('login')}
                    className={`pb-2 text-sm font-bold flex-1 text-center border-b-2 ${
                      authTab === 'login' ? 'border-black text-black' : 'border-transparent text-gray-400'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className={`pb-2 text-sm font-bold flex-1 text-center border-b-2 ${
                      authTab === 'register' ? 'border-black text-black' : 'border-transparent text-gray-400'
                    }`}
                  >
                    Register
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Email</label>
                  <Input required type="email" placeholder="name@example.com" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Password</label>
                  <Input required type="password" placeholder="••••••••" />
                </div>

                <Button type="submit" className="w-full bg-black text-white hover:bg-black/90 font-bold py-5 rounded-xl">
                  {authTab === 'login' ? 'Sign In' : 'Create Free Account'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. TRUST PILLAR DETAIL MODAL */}
      {pillarInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setPillarInfo(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-border-gray z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-black" />
                <h3 className="font-bold text-xl">{pillarInfo.title}</h3>
              </div>
              <button onClick={() => setPillarInfo(null)} className="text-gray-400 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
              {pillarInfo.content}
            </p>
            <Button onClick={() => setPillarInfo(null)} className="w-full bg-black text-white font-bold py-5 rounded-xl">
              Understood
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
