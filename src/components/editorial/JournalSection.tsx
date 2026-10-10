'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowCircle } from '@/components/ui/ArrowCircle';
import { X, Clock, Calendar, User } from 'lucide-react';

interface JournalStory {
  id: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  coverAlt: string;
  summary: string;
  quote: string;
  paragraphs: string[];
}

export function JournalSection() {
  const [activeStory, setActiveStory] = useState<JournalStory | null>(null);

  const stories: JournalStory[] = [
    {
      id: 'behind-the-craft',
      title: 'Di Balik Laboratorium: Eksplorasi 25-Titik Diagnostik Standar Militer BaruLagi',
      date: 'Oktober 2026',
      readTime: '8 Menit Baca',
      author: 'Luna Cress & Nur Hidayat Surya Pamungkas',
      cover: '/behind-the-craft.jpg',
      coverAlt: 'Teknisi laboratorium menguji komponen mikroskopik motherboard gawai',
      summary:
        'Perjalanan mendalam ke dalam fasilitas diagnostik BaruLagi, tempat di mana setiap logic board, sensor optik, dan kapasitas baterai diaudit menggunakan instrumen presisi.',
      quote: 'Gawai yang bertahan selama satu dekade adalah wujud teknologi paling ramah lingkungan yang bisa kita ciptakan.',
      paragraphs: [
        'Di BaruLagi, setiap gawai memulai kehidupannya kembali jauh sebelum dipajang di etalase katalog. Semuanya bermula di laboratorium diagnostik 25-titik: pengujian termal intensif pada chipset, verifikasi tegangan baterai sel lithium, audit responsivitas layar 120Hz ProMotion, hingga penghapusan data DoD-grade tanpa jejak.',
        'Kami meyakini bahwa kemewahan sejati dalam teknologi terletak pada integritas dan kejujuran performa. Baterai yang kami loloskan selalu berada di atas kapasitas 85–94%, memastikan Anda mendapatkan daya tahan sepanjang hari layaknya gawai baru.',
        'Setiap modul kamera dikalibrasi ulang terhadap toleransi distorsi optik dan zero dead pixel. Hasilnya adalah ketenangan pikiran penuh, didukung garansi komersial 1 tahun tanpa kompromi.',
      ],
    },
    {
      id: 'carbon-savings',
      title: 'Menghitung Jejak Karbon: Mengapa Memilih Gawai Rekondisi Menghemat 91% Emisi CO2e',
      date: 'September 2026',
      readTime: '6 Menit Baca',
      author: 'Dr. Aris Sudarmawan & Tim Sirkular BaruLagi',
      cover: '/transform-your-living-space.jpg',
      coverAlt: 'Analisis visual perbandingan emisi karbon manufaktur perangkat gawai',
      summary:
        'Memproduksi satu laptop atau smartphone baru melepaskan hingga 80kg CO2e dan mengonsumsi ribuan liter air bersih. Mengapa sirkularitas gawai adalah solusi nyata bagi Indonesia.',
      quote: 'Memproduksi satu smartphone baru menghabiskan hingga 80kg CO2e dan 12.000 liter air. Rekondisi memutus siklus pemborosan tersebut.',
      paragraphs: [
        'Lebih dari 80% total emisi karbon dari siklus hidup sebuah smartphone terjadi pada fase manufaktur dan penambangan mineral mentah (kobalt, litium, emas, tembaga). Ketika Anda membeli perangkat yang direkondisi secara profesional, Anda memotong 91% dari jejak emisi tersebut seketika.',
        'Indonesia menghadapi tantangan limbah elektronik (e-waste) yang kian meningkat. Dengan memperpanjang masa hidup gawai hingga 4–6 tahun tambahan, BaruLagi telah mencegah ribuan kilogram logam berat beracun mencemari tanah dan ekosistem perairan.',
        'Sirkularitas bukan tentang mengorbankan kualitas demi kepedulian lingkungan—ini adalah tentang menikmati kehebatan gawai kelas flagship dengan harga 40-70% lebih terjangkau sambil menjaga bumi.',
      ],
    },
    {
      id: 'metallurgy-titanium',
      title: 'Material Abadi: Titanium Aerospace & Baja Bedah yang Dirancang Bertahan Lintas Dekade',
      date: 'Agustus 2026',
      readTime: '5 Menit Baca',
      author: 'Bima Perkasa (Lead Hardware Engineer)',
      cover: '/design-inspirations.jpg',
      coverAlt: 'Struktur rangka bodi titanium dan sasis aluminium daur ulang',
      summary:
        'Kekuatan material bodi titanium Grade 5 dan stainless steel bedah. Mengapa sasis gawai flagship modern dirancang untuk diperbaiki dan diwariskan.',
      quote: 'Ketangguhan titanium Grade 5 dan stainless steel bedah bukan sekadar estetika, melainkan arsitektur ketahanan sejati.',
      paragraphs: [
        'Gawai modern seperti MacBook Pro M2, iPhone 13 Pro, dan Apple Watch Ultra dibangun dengan material kelas dirgantara: titanium Grade 5 dan surgical stainless steel. Berbeda dengan polikarbonat murah, paduan logam ini memiliki ketahanan luar biasa terhadap korosi dan deformasi struktural.',
        'Di laboratorium BaruLagi, bodi logam menjalani proses higienisasi ultrasonik dan penghalusan mikro untuk mengembalikan kilau aslinya tanpa menipiskan lapisan anodisasi pabrikan.',
        'Hasilnya adalah gawai yang terasa solid, kokoh, dan berbobot di tangan—sebuah instrumen kerja dan kreativitas yang siap menemani ambisi Anda bertahun-tahun ke depan.',
      ],
    },
  ];

  return (
    <section id="journal-section" className="py-20 px-4 sm:px-8 lg:px-14 mx-auto max-w-7xl text-white select-none border-b border-white/10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-accent-lime block mb-2">
            JURNAL & RISET SIRKULAR &bull; ISLE THORNE STORIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            CATATAN TEKNOLOGI & SIRKULARITAS
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#A0A0A0] max-w-md text-left md:text-right">
          Eksplorasi mendalam seputar ilmu rekondisi hardware, audit pengujian laboratorium, dan dampak pengurangan emisi elektronik.
        </p>
      </div>

      {/* 3 Story Cards (Exact Isle Thorne Journal Grid) */}
      <ul className="grid-site gap-y-8">
        {stories.map((story) => (
          <li key={story.id} className="col-span-2 lg:col-span-4">
            <div
              onClick={() => setActiveStory(story)}
              className="group cursor-pointer flex flex-col justify-between h-full space-y-4 p-4 rounded-xl border border-white/10 bg-neutral-950/60 hover:bg-neutral-900 hover:border-white/30 transition-all duration-300"
            >
              {/* Cover Photo */}
              <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-neutral-900">
                <Image
                  src={story.cover}
                  alt={story.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
                />
              </div>

              {/* Story Metadata */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {story.date}
                  </span>
                  <span className="flex items-center gap-1 text-accent-lime">
                    <Clock className="h-3 w-3" /> {story.readTime}
                  </span>
                </div>

                <h3 className="font-black text-base sm:text-lg uppercase text-white group-hover:text-accent-lime transition-colors leading-snug line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-xs text-[#A0A0A0] line-clamp-2 leading-relaxed">
                  {story.summary}
                </p>
              </div>

              {/* Bottom Read Action with Isle Thorne ArrowCircle */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/80 group-hover:text-white">
                  BACA RISET LENGKAP
                </span>
                <ArrowCircle tone="lime" size={28} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveStory(null)}
          />

          <div className="relative bg-neutral-950 w-full max-w-3xl rounded-2xl border border-white/20 p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-white space-y-6">
            {/* Header & Close */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-lime">
                  JURNAL RISET RESMI &bull; {activeStory.date}
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                  {activeStory.title}
                </h2>
                <p className="text-xs font-mono text-[#A0A0A0] flex items-center gap-2 pt-1">
                  <User className="h-3.5 w-3.5 text-accent-lime" /> {activeStory.author}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                aria-label="Tutup Jurnal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Story Visual */}
            <div className="relative aspect-2/1 w-full rounded-xl overflow-hidden">
              <Image
                src={activeStory.cover}
                alt={activeStory.coverAlt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Large Editorial Quote (Isle Thorne blockquote format) */}
            <blockquote className="border-l-2 border-accent-lime pl-4 py-2 text-base sm:text-lg font-mono italic text-white/95 leading-relaxed bg-white/3 rounded-r-lg">
              {activeStory.quote}
            </blockquote>

            {/* Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
              {activeStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer inside modal */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A0A0A0]">
              <span>Kolektif BaruLagi &bull; Dipimpin oleh Nur Hidayat Surya Pamungkas</span>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="px-6 py-2.5 rounded-lg bg-white text-black font-black uppercase tracking-wider hover:bg-accent-lime transition-colors"
              >
                TUTUP RISET
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
