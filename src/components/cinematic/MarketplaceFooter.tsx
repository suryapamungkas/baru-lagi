'use client';

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
    <footer className="bg-black text-white py-16 px-6 md:px-12 border-t border-white/10 select-none">
      <div className="mx-auto max-w-7xl grid-site items-start gap-y-8">
        {/* Col 1-3: Brand & Heritage */}
        <div className="col-span-2 lg:col-span-3 space-y-3">
          <BaruLagiLogo size="sm" showTagline />
          <p className="text-[11px] font-mono text-[#A0A0A0] leading-relaxed max-w-xs">
            Marketplace resmi gawai rekondisi bersertifikasi di Indonesia. Mengakhiri pemborosan teknologi cepat saji melalui sirkularitas berstandar lab 25-titik.
          </p>
        </div>

        {/* Col 4-8: Quick Links on Site Grid */}
        <div className="col-span-2 lg:col-span-6 lg:col-start-4 flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#A0A0A0]">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={link.action}
              className="hover:text-white transition-colors cursor-pointer text-left"
            >
              [ {link.label} ]
            </button>
          ))}
        </div>

        {/* Col 9-12: Copyright & Author */}
        <div className="col-span-2 lg:col-span-3 lg:col-start-10 justify-self-start lg:justify-self-end text-left lg:text-right space-y-1 text-[11px] font-mono">
          <span className="text-white font-bold tracking-widest block">
            BARULAGI &copy; {new Date().getFullYear()}
          </span>
          <span className="text-accent-lime block font-bold">
            100% GAWAI ORIGINAL &amp; BERGARANSI
          </span>
          <span className="text-[#A0A0A0] block text-[10px]">
            Created by <strong className="text-white">Nur Hidayat Surya Pamungkas</strong>
          </span>
          <span className="text-white/40 block text-[9px] pt-1">
            JAKARTA &bull; SURABAYA &bull; INDONESIA
          </span>
        </div>
      </div>
    </footer>
  );
}
