'use client';

import React from 'react';
import { useModals } from '@/context/ModalContext';
import { BaruLagiLogo } from '@/components/ui/BaruLagiLogo';

export function MarketplaceFooter() {
  const { setIsTradeInOpen, setIsHelpOpen, setPillarInfo } = useModals();

  const links = [
    {
      label: 'GARANSI 1 TAHUN',
      action: () =>
        setPillarInfo({
          title: 'Kebijakan Garansi 1 Tahun BaruLagi',
          content:
            'Setiap perangkat gawai yang Anda beli di BaruLagi dilindungi garansi hardware komprehensif selama 12 bulan penuh tanpa biaya tambahan.\n\nMenjamin fungsi motherboard, performa baterai, kamera, dan layar tanpa kendala. Tersedia penggantian unit atau pengembalian dana 100%.',
        }),
    },
    {
      label: 'RETUR 30 HARI',
      action: () =>
        setPillarInfo({
          title: 'Jaminan Bebas Resiko 30 Hari BaruLagi',
          content:
            'Uji coba gawai impian Anda di aktivitas harian selama 30 hari kalender. Jika Anda merasa kurang cocok, kami sediakan kurir jemput gratis dan pengembalian uang utuh 100%.',
        }),
    },
    {
      label: 'TUKAR TAMBAH (TRADE-IN)',
      action: () => setIsTradeInOpen(true),
    },
    {
      label: 'DAMPAK SIRKULAR',
      action: () =>
        setPillarInfo({
          title: 'Komitmen Sirkular & Ramah Lingkungan',
          content:
            'Memilih gawai rekondisi di BaruLagi menghemat hingga 91% emisi karbon CO2e, menghemat 86% air bersih, dan mencegah sampah elektronik (e-waste) beracun mencemari lingkungan Indonesia.',
        }),
    },
    {
      label: 'BANTUAN & FAQ',
      action: () => setIsHelpOpen(true),
    },
  ];

  return (
    <footer className="bg-black text-white py-14 px-6 md:px-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand Logo with Smooth Scroll to Top */}
        <BaruLagiLogo size="sm" showTagline />

        {/* Tautan horizontal di tengah */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#A0A0A0]">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={link.action}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:items-end text-[10px] font-mono text-[#A0A0A0]">
          <span className="text-white font-bold tracking-widest">
            BARULAGI &copy; {new Date().getFullYear()}
          </span>
          <span className="text-accent-lime mt-0.5">
            100% GAWAI ORIGINAL &amp; BERGARANSI
          </span>
          <span className="text-white/40 mt-1">
            Created by Nur Hidayat Surya Pamungkas
          </span>
        </div>
      </div>
    </footer>
  );
}
