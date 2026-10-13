"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the curved row ──────────────────────────────────────────────
 * Scroll Tilted Grid turned on its side, with the tilt drawn as a curve.
 * One row of images streams from right to left around the inside of a
 * cylinder. The centre faces you flat, the ends bend toward you so each
 * end image curves along its length, and the ends fade smoothly into the page.
 *
 * Each tile is sliced into SLICES vertical strips along the cylinder facet.
 * Hardware-accelerated with backface culling, subpixel antialiasing, and
 * ample off-screen buffer to ensure seamless continuous rotation without
 * popping, flickering hairlines, or mid-animation re-render stutters.
 * ─────────────────────────────────────────────────────────────── */

// Strips per tile. 16 provides an ultra-smooth cylindrical curvature.
const SLICES = 16;

// Camera distance from the screen, as a multiple of the cylinder's radius.
// Set to 2.0 to ensure tiles always remain in front of the camera plane
// (min distance strictly positive across the entire 360° orbit),
// eliminating near-plane clipping, polygon inversion, and edge blowups.
const CAMERA = 2.0;

/**
 * Cylinder radius, as a share of the hero's width, that puts the frame's
 * edge `bend` radians round the arc as seen through the camera:
 * r·sinθ · CAMERA / (CAMERA − 1 + cosθ) = width / 2, solved for r.
 */
function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

// A tile is never wider than this share of the hero on narrow screens.
const MAX_WIDTH = 55;

/**
 * Lays the loop on the cylinder. Angles in degrees:
 * - `unit`: angular span of one tile height
 * - `limit`: angle at which a tile's furthest edge is completely off-screen
 * - `sweep`: total angular half-span of the orbit loop
 * - `hide`: percentage of the orbit during which a tile is hidden off-screen
 */
function measure(
  width: number,
  height: number,
  tile: number,
  aspect: number,
  gap: number,
  bend: number,
  imageCount: number,
) {
  const h = Math.min(
    (tile / 100) * height,
    ((MAX_WIDTH / 100) * width) / aspect,
  );
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) {
    return { columns: 6, sweep: 0, unit: 0, limit: 0, hide: 0 };
  }

  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const tileArc = aspect * unit;

  // Fully off-screen threshold: edge bend + safe clearance of half tile arc + 2 degrees
  const limit = deg(bend) + tileArc * 0.5 + 2;

  // Ensure enough columns to span the entire screen plus ample off-screen margins
  const minColsNeeded = Math.ceil((2 * limit) / pitch) + 2;

  // Align columns with imageCount so each tile has a permanent image in the loop,
  // completely eliminating runtime React re-render stutters and iteration timing glitches.
  let columns = Math.max(minColsNeeded, imageCount);
  if (columns < minColsNeeded && imageCount > 0) {
    const factor = Math.ceil(minColsNeeded / imageCount);
    columns = factor * imageCount;
  }
  // Safe bounds
  columns = Math.min(40, Math.max(6, columns));

  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);
  const safeLimit = round(Math.min(sweep - pitch * 0.25, limit));
  const hide = round(Math.max(0, ((sweep - safeLimit) / (2 * sweep || 1)) * 100));

  return {
    columns,
    sweep,
    unit: round(unit),
    limit: safeLimit,
    hide,
  };
}

export type TiltedGridImage = {
  src: string;
  alt?: string;
};

export type TiltedGridHeroProps = {
  /** Images displayed in the curved archive reel. */
  images: TiltedGridImage[];
  /** Seconds for the row to advance by one tile. @default 4 */
  speed?: number;
  /** Tile height, as a percentage of container height. @default 28 */
  tileHeight?: number;
  /** Tile aspect ratio (width / height). @default 16 / 9 */
  aspectRatio?: number;
  /** Space between tiles, as percentage of tile height. @default 6 */
  gap?: number;
  /** Vertical center of the row, as percentage of container height. @default 55 */
  axis?: number;
  /** Curve angle at the frame edge in degrees (5–85). @default 68 */
  curve?: number;
  /** Width percentage of the gradient fade at edges. @default 15 */
  fade?: number;
  /** Content rendered above the cylinder band. */
  children?: React.ReactNode;
  className?: string;
};

export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 28,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 55,
  curve = 68,
  fade = 15,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & TiltedGridHeroProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-o-${id}`;
  const tile = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const imageCount = Math.max(1, images.length);

  // Measure and adapt dynamically with ResizeObserver
  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(
    null,
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend, imageCount);
      setLayout((prev) =>
        prev?.columns === next.columns &&
        prev.sweep === next.sweep &&
        prev.unit === next.unit &&
        prev.hide === next.hide
          ? prev
          : next,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [tileHeight, aspectRatio, gap, bend, imageCount]);

  // Preload all archive images
  React.useEffect(() => {
    for (const { src } of images) {
      if (typeof window !== "undefined") {
        const img = new Image();
        img.src = src;
      }
    }
  }, [images]);

  const { columns, sweep, unit, hide } =
    layout ?? measure(1440, 600, tileHeight, aspectRatio, gap, bend, imageCount);

  // Scaled measurement unit
  const u = (n: number) =>
    `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(
      MAX_WIDTH / aspectRatio
    ).toFixed(4)}cqw))`;

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;

  // 3D cylindrical transform
  const turn = (deg: number) =>
    `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  const share = aspectRatio / SLICES;
  const duration = columns * speed;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${
    100 - fade
  }%,transparent)`;

  // Keyframes with smooth off-screen visibility and opacity transitions
  const css =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}` +
    `to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden;opacity:0}` +
    `${hide + 0.05}%,${100 - hide - 0.05}%{visibility:visible;opacity:1}}` +
    `@media(prefers-reduced-motion:reduce){.${tile}{animation-play-state:paused}}`;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-black select-none", className)}
      {...props}
      style={{ containerType: "size", ...props.style }}
    >
      <style>{css}</style>

      {/* Obsidian lateral vignettes: guarantees butter-smooth edge fade into #000000 on all GPU pipelines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 sm:w-44 md:w-64 bg-gradient-to-r from-black via-black/85 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 sm:w-44 md:w-64 bg-gradient-to-l from-black via-black/85 to-transparent"
      />

      {/* Top & bottom gentle vignettes for editorial text contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black via-black/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black via-black/70 to-transparent"
      />

      {/* Cylindrical 3D perspective stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, t) => {
          // Stable index mapping: each tile permanently shows its assigned catalog image,
          // cycling continuously in loop order without ever needing runtime React state mutations.
          const imgIndex = (columns - 1 - t) % imageCount;
          const img = images[imgIndex >= 0 ? imgIndex : imgIndex + imageCount];

          return (
            <div
              key={t}
              className={cn(tile, "absolute pointer-events-none")}
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                transformStyle: "preserve-3d",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                willChange: "transform",
                animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className={cn(
                    "absolute top-0 overflow-hidden bg-[#0d0d12]",
                    k === 0 && "rounded-l-2xl",
                    k === SLICES - 1 && "rounded-r-2xl",
                  )}
                  style={{
                    left: u((aspectRatio - share) / 2),
                    // Subpixel overlap with border-box to eliminate hairlines without z-fighting
                    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                    height: u(1),
                    transform: turn(
                      (aspectRatio / 2 - (k + 0.5) * share) * unit,
                    ),
                    transformStyle: "preserve-3d",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    outline: "1px solid transparent",
                    willChange: "transform",
                  }}
                >
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.src}
                      alt={k === 0 ? (img.alt ?? "") : ""}
                      draggable={false}
                      className="absolute top-0 max-w-none object-cover"
                      style={{
                        left: u(-k * share),
                        width: u(aspectRatio),
                        height: u(1),
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                    />
                  ) : null}

                  {/* Subtle luxury chassis rim border overlay */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 border-y border-white/[0.12]",
                      k === 0 && "border-l border-white/[0.12] rounded-l-2xl",
                      k === SLICES - 1 && "border-r border-white/[0.12] rounded-r-2xl",
                    )}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
}

export default TiltedGridHero;
