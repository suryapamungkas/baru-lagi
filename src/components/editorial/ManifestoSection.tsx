'use client';

import { ArrowCircle } from '@/components/ui/ArrowCircle';
import { Newspaper, Handshake } from 'lucide-react';
import { useModals } from '@/context/ModalContext';

export function ManifestoSection() {
  const { setIsTradeInOpen } = useModals();

  const collaborations = [
    { lab: 'PT Citra Inspekta Diagnostika', work: 'Standar Audit Motherboard & Sub-Pixel OLED', year: 2026 },
    { lab: 'GreenTech Circular Alliance', work: 'Validasi Emisi Karbon -91% CO2e & Zero E-Waste', year: 2026 },
    { lab: 'Kemenperin Hardware Registry', work: 'Sertifikasi Validasi IMEI & Legalitas Sinyal Resmi', year: 2026 },
    { lab: 'Apple Independent Repair Network', work: 'Protokol Diagnostik Baterai Sel Lithium & Face ID', year: 2026 },
    { lab: 'Android Enterprise Certification Lab', work: 'Kalibrasi Sensor 200MP & Chip Snapdragon NPU', year: 2026 },
  ];

  const press = [
    'TechInAsia Indonesia — Juli 2026',
    'DailySocial Circular Economy Edition — Mei 2026',
    'Kompas Sains & Teknologi Hijau — Maret 2026',
    'The Jakarta Post Tech Review — Januari 2026',
    'Wired Asia Circular Hardware Feature — 2026',
  ];

  return (
    <section id="manifesto-section" className="py-20 px-4 sm:px-8 lg:px-14 mx-auto max-w-7xl text-white select-none border-b border-white/10 scroll-mt-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-accent-lime block mb-2">
            TENTANG KAMI &bull; STANDAR BARU LAGI
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            MISI &amp; NILAI UTAMA KAMI
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#A0A0A0] max-w-md text-left md:text-right">
          Menghadirkan perangkat berkualitas tinggi dengan harga rasional, resmi, dan bertanggung jawab terhadap lingkungan.
        </p>
      </div>

      <div className="space-y-4">
        {/* Card 1: Our Story & Philosophy (Isle Thorne grid-site layout) */}
        <div className="itc-card grid-site p-8 sm:p-12 border border-white/10 bg-neutral-950 rounded-2xl items-start">
          <div className="lg:col-span-3 text-xs font-mono text-[#A0A0A0] uppercase tracking-widest pb-4 lg:pb-0">
            [ TENTANG BARULAGI ]
          </div>
          <div className="col-span-2 lg:col-span-8 lg:col-start-4 space-y-4 text-xs sm:text-sm font-mono leading-relaxed text-[#D0D0D0]">
            <p>
              Didirikan pada tahun 2026 oleh <strong className="text-white font-bold">Nur Hidayat Surya Pamungkas</strong>, BaruLagi lahir dari kegelisahan terhadap budaya konsumerisme gawai elektronik yang boros dan cepat usang. Kami menolak anggapan bahwa gawai bekas harus meragukan dan berkualitas rendah.
            </p>
            <p>
              Dengan menggabungkan protokol inspeksi ketat 25-titik, sanitasi tingkat bedah medis, serta suku cadang grade tertinggi, setiap laptop, tablet, dan smartphone yang kami serahkan kembali ke tangan Anda memiliki performa, kebersihan, dan keandalan layaknya unit yang baru saja keluar dari pabrik.
            </p>
            <p>
              Komitmen kami tidak berhenti pada performa teknis. Setiap gawai rekondisi yang Anda beli menyelamatkan hingga 91% emisi gas rumah kaca dan menghemat ribuan liter air bersih bagi bumi Nusantara.
            </p>
          </div>
        </div>

        {/* Card 2: Laboratory Collaborations */}
        <div className="itc-card grid-site p-8 sm:p-12 border border-white/10 bg-neutral-950 rounded-2xl items-start">
          <div className="lg:col-span-3 text-xs font-mono text-[#A0A0A0] uppercase tracking-widest pb-4 lg:pb-0 flex items-center gap-2">
            <Handshake className="h-4 w-4 text-accent-lime" />
            <span>[ KOLABORASI LAB ]</span>
          </div>
          <div className="col-span-2 lg:col-span-8 lg:col-start-4 space-y-4 text-xs sm:text-sm font-mono leading-relaxed">
            <p className="text-[#A0A0A0] text-xs pb-2 border-b border-white/5">
              Standar sertifikasi dan pengujian komponen dikembangkan bersama mitra laboratorium independen:
            </p>
            <ul className="space-y-3">
              {collaborations.map((col, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-white/90">
                  <span className="font-bold text-white">{col.lab}</span>
                  <span className="text-[#A0A0A0] text-xs">
                    “{col.work}”, <strong className="text-accent-lime font-mono">{col.year}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 3: Press & Recognition */}
        <div className="itc-card grid-site p-8 sm:p-12 border border-white/10 bg-neutral-950 rounded-2xl items-start">
          <div className="lg:col-span-3 text-xs font-mono text-[#A0A0A0] uppercase tracking-widest pb-4 lg:pb-0 flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-accent-lime" />
            <span>[ LIPUTAN & PERS ]</span>
          </div>
          <div className="col-span-2 lg:col-span-8 lg:col-start-4 space-y-4 text-xs sm:text-sm font-mono leading-relaxed">
            <p className="text-[#A0A0A0] text-xs pb-2 border-b border-white/5">
              Sorotan publikasi independen terhadap terobosan standar sirkularitas gawai BaruLagi:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
              {press.map((mention, idx) => (
                <li key={idx} className="p-3 rounded-lg bg-white/3 border border-white/5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                  <span>{mention}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-[#A0A0A0]">
                Punya gawai lama yang ingin ditaksir dengan harga tunai terbaik?
              </span>
              <button
                type="button"
                onClick={() => setIsTradeInOpen(true)}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white text-black font-black uppercase text-xs tracking-wider hover:bg-accent-lime transition-all"
              >
                <span>HITUNG NILAI TUKAR TAMBAH</span>
                <ArrowCircle tone="dark" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
