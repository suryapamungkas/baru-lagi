'use client';

import React from 'react';
import { useModals } from '@/context/ModalContext';
import { BaruLagiLogo } from '@/components/ui/BaruLagiLogo';
import HalftoneWordmarkFooter, { type FooterColumn } from '@/components/ui/halftone-wordmark-footer';

export function MarketplaceFooter() {
  const { setIsTradeInOpen, setIsHelpOpen, setPillarInfo } = useModals();

  const columns: FooterColumn[] = [
    {
      title: 'Jaminan Lab',
      links: [
        {
          label: 'Garansi 1 Tahun',
          onClick: () =>
            setPillarInfo({
              title: 'Kebijakan Garansi 1 Tahun BaruLagi',
              content:
                'Setiap perangkat gawai yang Anda beli di BaruLagi dilindungi garansi hardware komprehensif selama 12 bulan penuh tanpa biaya tambahan.\n\nMenjamin fungsi motherboard, performa baterai, kamera, dan layar tanpa kendala. Tersedia penggantian unit atau pengembalian dana 100%.',
            }),
        },
        {
          label: 'Retur 30 Hari',
          onClick: () =>
            setPillarInfo({
              title: 'Jaminan Bebas Resiko 30 Hari BaruLagi',
              content:
                'Uji coba gawai impian Anda di aktivitas harian selama 30 hari kalender. Jika Anda merasa kurang cocok, kami sediakan kurir jemput gratis dan pengembalian uang utuh 100%.',
            }),
        },
        {
          label: 'Uji Lab 25-Titik',
          onClick: () =>
            setPillarInfo({
              title: 'Standar Diagnostik Laboratorium 25 Titik',
              content:
                'Setiap unit melalui pengujian performa chip, efisiensi termal baterai, responsivitas sensor layar OLED, mikrofon array, modul 5G/Wi-Fi, dan kalibrasi optik kamera menggunakan software diagnosa resmi berskala industri.',
            }),
        },
        {
          label: 'Dampak Sirkular',
          onClick: () =>
            setPillarInfo({
              title: 'Komitmen Sirkular & Ramah Lingkungan',
              content:
                'Memilih gawai rekondisi di BaruLagi menghemat hingga 91% emisi karbon CO2e, menghemat 86% air bersih, dan mencegah sampah elektronik (e-waste) beracun mencemari lingkungan Indonesia.',
            }),
        },
      ],
    },
    {
      title: 'Layanan',
      links: [
        {
          label: 'Tukar Tambah',
          onClick: () => setIsTradeInOpen(true),
        },
        {
          label: 'Bantuan & FAQ',
          onClick: () => setIsHelpOpen(true),
        },
        {
          label: 'Panduan Kondisi',
          onClick: () =>
            setPillarInfo({
              title: 'Panduan Klasifikasi Grade Fisik & Kosmetik',
              content:
                'Grade A+ (Pristine): 100% mulus seperti baru tanpa goresan.\nGrade A (Excellent): Tanda pemakaian mikro yang tidak terlihat dari jarak 20cm.\nSemua grade memiliki performa hardware 100% setara unit baru dengan baterai prima (>85-100%).',
            }),
        },
        {
          label: 'Katalog Perangkat',
          href: '#catalog-section',
        },
      ],
    },
    {
      title: 'Koleksi',
      links: [
        {
          label: 'Apple Ecosystem',
          href: '#catalog-section',
        },
        {
          label: 'Flagship Android',
          href: '#catalog-section',
        },
        {
          label: 'Handheld Gaming',
          href: '#catalog-section',
        },
        {
          label: 'Studio Audio',
          href: '#catalog-section',
        },
      ],
    },
    {
      title: 'Studio',
      links: [
        {
          label: 'Tentang Kami',
          href: '#manifesto-section',
        },
        {
          label: 'Surya Pamungkas',
          href: 'https://github.com/suryapamungkas',
        },
        {
          label: 'Jakarta · Surabaya',
          href: '#',
        },
        {
          label: '100% Gawai Resmi',
          href: '#',
        },
      ],
    },
  ];

  return (
    <HalftoneWordmarkFooter
      wordmark="barulagi"
      label={
        <div className="space-y-2">
          <BaruLagiLogo size="sm" showTagline />
          <p className="text-[10px] font-mono normal-case tracking-normal opacity-60 max-w-[240px] leading-relaxed">
            Marketplace resmi gawai rekondisi bersertifikasi di Indonesia. Mengakhiri pemborosan teknologi melalui sirkularitas berstandar lab 25-titik.
          </p>
        </div>
      }
      meta="JAKARTA · SURABAYA · INDONESIA"
      columns={columns}
      backToTop={true}
      preset="night"
      palette={{
        background: '#000000',
        ink: '#e9e4da',
        warm: '#D6F479', // Signature BaruLagi accent lime on interaction
      }}
      dotGap={6}
      radius={85}
      crop={0.22}
      grain={0.45}
      interactive={true}
      height="600px"
      className="border-t border-white/10 select-none"
    />
  );
}
