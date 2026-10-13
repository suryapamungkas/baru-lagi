'use client';

import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { MarketplaceHeader } from '@/components/cinematic/MarketplaceHeader';
import { CinematicHeroSection } from '@/components/cinematic/CinematicHeroSection';
import { ProductsView } from './ProductsView';
import { PromoBanners, TrustPromise, TestimonialsSection, TestimonialsProps } from './DynamicSectionsClient';
import { MarketplaceFooter } from '@/components/cinematic/MarketplaceFooter';
import { HoverGridShowcase } from '@/components/cinematic/HoverGridShowcase';
import { GridLayoutMotionShowcase } from '@/components/cinematic/GridLayoutMotionShowcase';
import { LoadingCurtain } from '@/components/cinematic/LoadingCurtain';
import { TiltedArchiveSection } from '@/components/cinematic/TiltedArchiveSection';
import { CuratedCapsulesSection } from '@/components/editorial/CuratedCapsulesSection';
import { JournalSection } from '@/components/editorial/JournalSection';
import { ManifestoSection } from '@/components/editorial/ManifestoSection';
import { NewsletterModal } from '@/components/home/NewsletterModal';
import { useModals, ProductData } from '@/context/ModalContext';

interface MarketplacePageClientProps {
  initialProducts: ProductData[];
  initialReviews: TestimonialsProps['initialReviews'];
}

export function MarketplacePageClient({
  initialProducts,
  initialReviews,
}: MarketplacePageClientProps) {
  const { setActiveCategory, setIsTradeInOpen } = useModals();

  const scrollToCatalog = (category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
        {/* Full-Screen Loading Curtain (Isle Thorne Collective / Codrops Interlude Transition) */}
        <LoadingCurtain />

        {/* Global Fixed Marketplace Navigation Header */}
        <MarketplaceHeader />

        {/* HERO SECTION 1: MACBOOKS (100vh Full-Bleed Parallax) */}
        <CinematicHeroSection
          id="hero-macbook"
          subtitle="THE REFURBISHED REVOLUTION"
          title="MEET THE SMART ESSENTIALS"
          primaryCtaText="EXPLORE HARDWARE"
          secondaryCtaText="CASH IT IN"
          imageSrc="/cinematic_macbook.jpg"
          imageAlt="MacBook Pro floating in dark luxury studio with glowing display"
          onPrimaryClick={() => scrollToCatalog('MacBooks')}
          onSecondaryClick={() => setIsTradeInOpen(true)}
          nextSectionId="hero-iphone"
          priority={true}
          stats={[
            { label: 'PRICE SAVINGS', value: 'UP TO 70%' },
            { label: 'WARRANTY', value: '1-YEAR COMMERCIAL' },
            { label: 'INSPECTION', value: '25-POINT CERTIFIED' },
          ]}
        />

        {/* HERO SECTION 2: IPHONES & MOBILITY (100vh Full-Bleed Parallax) */}
        <CinematicHeroSection
          id="hero-iphone"
          subtitle="CIRCULAR PRECISION"
          title="IPHONE PRO: RESTORED TO PERFECTION"
          primaryCtaText="VIEW SMARTPHONES"
          secondaryCtaText="TRADE IN OLD PHONE"
          imageSrc="/cinematic_iphone.jpg"
          imageAlt="iPhone floating in dark studio with rim lighting"
          onPrimaryClick={() => scrollToCatalog('Smartphones')}
          onSecondaryClick={() => setIsTradeInOpen(true)}
          nextSectionId="hero-tradein"
          stats={[
            { label: 'BATTERY HEALTH', value: '>85% CAPACITY' },
            { label: 'COSMETIC GRADES', value: 'FAIR / GOOD / EXCELLENT' },
            { label: 'FREE RETURNS', value: '30 DAYS RISK-FREE' },
          ]}
        />

        {/* HERO SECTION 3: TRADE-IN ENGINE & SUSTAINABILITY (100vh Full-Bleed Parallax) */}
        <CinematicHeroSection
          id="hero-tradein"
          subtitle="END FAST TECH &bull; CIRCULAR FUTURE"
          title="TURN OLD TECH INTO COLD HARD CASH"
          primaryCtaText="GET TRADE-IN APPRAISAL"
          secondaryCtaText="BROWSE ALL DEVICES"
          imageSrc="/promo2.jpg"
          imageAlt="Array of smartwatches on dark surface"
          onPrimaryClick={() => setIsTradeInOpen(true)}
          onSecondaryClick={() => scrollToCatalog('All')}
          nextSectionId="archive-reel-section"
          stats={[
            { label: 'APPRAISAL TIME', value: 'INSTANT QUOTE' },
            { label: 'SHIPPING KIT', value: 'FREE PREPAID BOX' },
            { label: 'CARBON AVOIDED', value: '91% CO2e REDUCED' },
          ]}
        />

        {/* TILTED GRID HERO: CURVED ARCHIVE REEL OF CATALOG DEVICES */}
        <TiltedArchiveSection />

        {/* CURATED CAPSULES: ISLE THORNE COLLECTIVE NUMBERED ARCHIVE */}
        <CuratedCapsulesSection products={initialProducts} />

        {/* HOVER GRID SHOWCASE: EKOSISTEM & KURASI PILIHAN (Metalab/Codrops Multi-Image Reveal) */}
        <HoverGridShowcase />

        {/* MARKETPLACE HARDWARE CATALOG */}
        <ProductsView initialProducts={initialProducts} />

        {/* PROMO CARDS (Student Discounts, Bundles, Lab Standards) */}
        <PromoBanners />

        {/* GRID LAYOUT MOTION SHOWCASE: MASTERPIECE VAULT (Multi-Plane 3D Tilt & Exploding Overlay Preview) */}
        <GridLayoutMotionShowcase />

        {/* TRUST PILLARS (1-Year Warranty, 30-Day Returns, 25-Point Lab Inspection, Free Shipping) */}
        <TrustPromise />

        {/* EDITORIAL CIRCULAR JOURNAL: IN-DEPTH STORIES & ESSAYS */}
        <JournalSection />

        {/* BRAND MANIFESTO & LAB COLLABORATIONS */}
        <ManifestoSection />

        {/* REAL REVIEWS CAROUSEL & WRITE A REVIEW */}
        <TestimonialsSection initialReviews={initialReviews} />

        {/* MINIMALIST MARKETPLACE FOOTER */}
        <MarketplaceFooter />

        {/* DELAYED NEWSLETTER POP-UP ($20 VOUCHER CODE) */}
        <NewsletterModal />
      </div>
    </SmoothScrollProvider>
  );
}
