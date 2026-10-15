export { cn } from 'cn';

/**
 * Safely parses a JSON array of image URLs with fallback to default placeholder
 */
export function safeParseImages(imagesJson?: string): string[] {
  if (!imagesJson) return ['/hero.jpg'];
  try {
    const parsed = JSON.parse(imagesJson);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['/hero.jpg'];
  } catch {
    return ['/hero.jpg'];
  }
}

/**
 * Safely parses product specs JSON object with fallback to empty dictionary
 */
export function safeParseSpecs(specsJson?: string): Record<string, string> {
  if (!specsJson) return {};
  try {
    const parsed = JSON.parse(specsJson);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Smoothly scrolls to a target (element, element ID, or pixel offset)
 * utilizing Lenis smooth scroll provider when available, or native smooth scroll.
 */
export function scrollToLenis(
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number }
) {
  if (typeof window === 'undefined') return;

  const customWin = window as unknown as {
    __lenis?: {
      scrollTo: (
        target: string | HTMLElement | number,
        opts?: { offset?: number; duration?: number }
      ) => void;
    };
  };

  if (customWin.__lenis) {
    customWin.__lenis.scrollTo(target, options);
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const elementId = target.startsWith('#') ? target.slice(1) : target;
    const el = document.getElementById(elementId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
