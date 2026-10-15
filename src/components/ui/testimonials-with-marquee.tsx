import React from "react";
import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";

export interface TestimonialItem {
  author: TestimonialAuthor;
  text: string;
  rating?: number;
  href?: string;
}

export interface TestimonialsSectionProps {
  title: string;
  description: string;
  kicker?: string;
  testimonials: TestimonialItem[];
  action?: React.ReactNode;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  kicker,
  testimonials,
  action,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-black text-white",
        "py-16 sm:py-24 md:py-32 px-0 overflow-hidden relative",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-3xl">
          {kicker && (
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#A0A0A0]">
              {kicker}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.06em] text-white leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base font-sans text-neutral-400 max-w-2xl leading-relaxed">
            {description}
          </p>
          {action && <div className="mt-2">{action}</div>}
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pt-4">
          <div className="group flex overflow-hidden p-2 [--gap:1.25rem] [gap:var(--gap)] flex-row [--duration:50s] w-full">
            {/* Primary Track */}
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`track-1-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              )}
            </div>

            {/* Mirror Track for 100% Seamless Infinite Loop */}
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              {[...Array(2)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`track-2-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              )}
            </div>
          </div>

          {/* Smooth side fades into obsidian background */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 sm:w-1/3 bg-gradient-to-r from-black via-black/80 to-transparent sm:block z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 sm:w-1/3 bg-gradient-to-l from-black via-black/80 to-transparent sm:block z-10" />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
