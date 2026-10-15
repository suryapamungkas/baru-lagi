'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface CinematicHeroSectionProps {
  id: string;
  subtitle: string;
  title: string;
  primaryCtaText: string;
  secondaryCtaText?: string;
  imageSrc: string;
  imageAlt: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  nextSectionId?: string;
  stats?: { label: string; value: string }[];
  priority?: boolean;
}

export function CinematicHeroSection({
  id,
  subtitle,
  title,
  primaryCtaText,
  secondaryCtaText,
  imageSrc,
  imageAlt,
  onPrimaryClick,
  onSecondaryClick,
  nextSectionId,
  stats,
  priority = false,
}: CinematicHeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax displacement
  const yBg = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);

  // Smooth scroll exit fade: ensures buttons and text fade gracefully to pure black
  // when scrolling away, completely preventing buttons from sticking or peeking into adjacent sections
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.78, 0.94], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.35, 0.78, 0.94], [30, 0, 0, -30]);

  const scrollToNext = () => {
    if (nextSectionId) {
      const el = document.getElementById(nextSectionId);
      if (el) {
        const customWin = window as unknown as {
          __lenis?: { scrollTo: (target: HTMLElement | string, opts?: object) => void };
        };
        if (customWin.__lenis) {
          customWin.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white select-none snap-start border-b border-white/10 scroll-mt-20"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 h-[116%] -top-[8%] w-full"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.75] contrast-[1.1]"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
        {/* Dark radial and vertical gradient overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent to-black/70" />
      </motion.div>

      {/* Obsidian bottom transition vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-black via-black/85 to-transparent"
      />

      {/* Foreground Content: Scroll-triggered Reveal with Exit Fade */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex h-full w-full flex-col justify-end px-6 pb-20 sm:px-12 md:px-20 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="mb-3 block text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#A0A0A0]"
          >
            {subtitle}
          </motion.span>

          {/* Heading ALL CAPS */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.06em] leading-[1.05] text-white"
          >
            {title}
          </motion.h2>

          {/* Key specs/metrics */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
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

          {/* Interactive Button Group with Bottom-to-Top Fill Hover Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <button
              type="button"
              onClick={onPrimaryClick}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-9 py-4 text-xs font-black uppercase tracking-[0.25em] text-white transition-all duration-300 active:scale-95"
            >
              <span className="absolute inset-0 z-0 bg-white translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                {primaryCtaText}
              </span>
            </button>

            {/* Secondary CTA */}
            {secondaryCtaText && (
              <button
                type="button"
                onClick={onSecondaryClick}
                className="group relative inline-flex items-center justify-center overflow-hidden border border-white/40 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:border-white transition-all duration-300 active:scale-95"
              >
                <span className="absolute inset-0 z-0 bg-white/10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {secondaryCtaText}
                </span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Down Arrow */}
      {nextSectionId && (
        <motion.button
          onClick={scrollToNext}
          style={{ opacity: contentOpacity }}
          initial={{ opacity: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{
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
