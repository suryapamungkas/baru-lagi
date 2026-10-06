'use client';

import React from 'react';
import Link from 'next/link';
import { useModals } from '@/context/ModalContext';
import { ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const { setIsTradeInOpen, setIsHelpOpen, setPillarInfo } = useModals();

  const handleLinkClick = (item: string) => {
    const lower = item.toLowerCase();
    if (lower.includes('trade-in')) {
      setIsTradeInOpen(true);
      return;
    }
    if (lower.includes('warranty')) {
      setPillarInfo({
        title: 'Garansi Komersial 1 Tahun BaruLagi',
        content:
          'Setiap gawai rekondisi yang dibeli di BaruLagi dilindungi oleh garansi hardware resmi 12 bulan.\n\nMenjamin perbaikan kegagalan teknis, kerusakan logic board, performa baterai, dan layar tanpa biaya tersembunyi.',
      });
      return;
    }
    if (lower.includes('return') || lower.includes('refund')) {
      setPillarInfo({
        title: 'Free 30-Day Risk-Free Returns',
        content:
          'Not satisfied with your device? You have a full 30 calendar days from delivery to request a prepaid return label and receive 100% of your money back.',
      });
      return;
    }
    if (lower.includes('student')) {
      setPillarInfo({
        title: 'Student Discount Program',
        content:
          'Save an extra 10% on your next refurbished laptop, tablet, or phone with code STUDENT10 during checkout!',
      });
      return;
    }
    if (lower.includes('help') || lower.includes('faq') || lower.includes('contact')) {
      setIsHelpOpen(true);
      return;
    }
    if (lower.includes('sustainability')) {
      setPillarInfo({
        title: 'Our Sustainability Mission',
        content:
          'Buying refurbished saves up to 91% of carbon emissions (CO2e), 86% of raw water consumption, and avoids 178g of toxic e-waste compared to manufacturing a brand-new device.\n\nEvery device bought keeps electronics in circular life.',
      });
      return;
    }

    // Default scroll to products
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const footerGroups = [
    {
      title: 'Tentang BaruLagi',
      links: ['About us', 'Sustainability', 'Trustpilot reviews', 'Careers', 'Press'],
    },
    {
      title: 'Customer Care',
      links: ['Track my order', 'Returns & refunds', 'Warranty', 'FAQ', 'Contact us'],
    },
    {
      title: 'Services & Perks',
      links: ['Trade-in old tech', 'Student discount', 'Refurbished for business', 'Protection Plus'],
    },
    {
      title: 'Explore Categories',
      links: ['Refurbished MacBooks', 'Refurbished iPhones', 'Refurbished iPads', 'Refurbished Consoles', 'Audio & AirPods'],
    },
  ];

  return (
    <footer className="bg-white border-t border-border-gray pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerGroups.map((column, idx) => (
            <div key={idx}>
              <h4 className="font-extrabold mb-4 text-xs uppercase tracking-wider text-black">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      type="button"
                      onClick={() => handleLinkClick(link)}
                      className="text-xs text-gray-600 hover:text-black hover:underline text-left cursor-pointer transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright and socials */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border-gray gap-4">
          <div className="flex items-center gap-6 text-xs text-gray-600 font-medium">
            <span className="hover:text-black cursor-pointer">Instagram</span>
            <span className="hover:text-black cursor-pointer">Twitter (X)</span>
            <span className="hover:text-black cursor-pointer">YouTube</span>
            <span className="hover:text-black cursor-pointer">LinkedIn</span>
          </div>

          <div className="text-xs text-gray-500 flex flex-wrap items-center justify-center gap-4 text-center md:text-right">
            <span>&copy; {new Date().getFullYear()} BaruLagi Certified Refurbished.</span>
            <span>All devices inspected & warrantied.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
