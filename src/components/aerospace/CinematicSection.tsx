'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CinematicButton } from './CinematicButton';
import { ArrowDown } from 'lucide-react';

export interface CinematicSectionProps {
  id: string;
  subtitle: string;
  title: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  onCtaClick?: () => void;
  nextSectionId?: string;
  stats?: { label: string; value: string }[];
}

export function CinematicSection({
  id,
  subtitle,
  title,
  ctaText,
  imageSrc,
  imageAlt,
  onCtaClick,
  nextSectionId,
  stats,
}: CinematicSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect: transform background slightly on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Background moves slightly slower (parallax displacement from -80px to 80px)
  const yBg = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  const scrollToNext = () => {
    if (nextSectionId) {
      const el = document.getElementById(nextSectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white select-none snap-start"
    >
      {/* Parallax Background Media Layer */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 h-[120%] -top-[10%] w-full"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          priority
        />
        {/* Cinematic gradient overlay for contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
      </motion.div>

      {/* Foreground Content: Fade & Slide-up on Viewport Enter */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-20 sm:px-12 md:px-20 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Subtitle kecil */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="mb-3 block text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#A0A0A0]"
          >
            {subtitle}
          </motion.span>

          {/* Heading Utama Besar (ALL CAPS, letter-spacing) */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.08em] leading-[1.05] text-white"
          >
            {title}
          </motion.h2>

          {/* Key telemetry/specs stats if available */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mb-8 flex flex-wrap gap-8 border-l border-white/20 pl-4 text-xs font-mono"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="block text-[#A0A0A0] uppercase tracking-widest text-[10px]">
                    {s.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white tracking-wider">
                    {s.value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tombol CTA dengan hover fill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            <CinematicButton onClick={onCtaClick}>{ctaText}</CinematicButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator Arrow (for non-final sections) */}
      {nextSectionId && (
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1 },
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white transition-colors cursor-pointer p-2"
          aria-label="Scroll to next section"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      )}
    </section>
  );
}
