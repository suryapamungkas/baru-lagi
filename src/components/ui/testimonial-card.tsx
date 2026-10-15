import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, ShieldCheck } from "lucide-react";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
  product?: string;
  condition?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  rating?: number;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  rating = 5,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-white/10",
        "bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 backdrop-blur-md",
        "p-5 text-start sm:p-6",
        "hover:border-white/30 hover:from-neutral-900 hover:to-neutral-950",
        "w-[300px] sm:w-[350px] shrink-0",
        "transition-all duration-300 shadow-xl select-none group",
        className
      )}
    >
      <div>
        {/* Author Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-white/15">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start min-w-0">
              <h3 className="text-sm font-bold text-white tracking-wide truncate max-w-[170px]">
                {author.name}
              </h3>
              <p className="text-[11px] font-mono text-[#A0A0A0] truncate max-w-[170px]">
                {author.handle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-accent-lime/90 bg-accent-lime/10 px-2 py-0.5 rounded-full border border-accent-lime/20 shrink-0">
            <ShieldCheck className="h-3 w-3" />
            <span>Resmi</span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < rating
                  ? "fill-accent-lime text-accent-lime"
                  : "fill-white/10 text-white/20"
              )}
            />
          ))}
          {author.condition && (
            <span className="ml-2 text-[10px] font-mono uppercase text-[#888888]">
              • {author.condition}
            </span>
          )}
        </div>

        {/* Testimonial Quote */}
        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed line-clamp-4">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      {author.product && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]">
          <span className="truncate max-w-[200px] text-white/70">
            {author.product}
          </span>
          <span className="text-[10px] text-accent-lime">Unit Terverifikasi</span>
        </div>
      )}
    </Card>
  );
}

export default TestimonialCard;
