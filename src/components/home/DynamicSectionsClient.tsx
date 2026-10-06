'use client';

import React, { useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, RefreshCcw, ThumbsUp, Wrench, ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { useModals } from '@/context/ModalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitReview } from '@/app/actions';
import { motion } from 'framer-motion';

export function PromoBanners() {
  const { setIsTradeInOpen, setPillarInfo, setActiveCategory } = useModals();

  const promos = [
    {
      title: 'SELL HIGH, PAY LESS.',
      desc: 'Instant cash appraisal for your used smartphone, laptop, or tablet.',
      cta: 'TRADE IN NOW',
      action: () => setIsTradeInOpen(true),
    },
    {
      title: 'STUDENT DISCOUNT: 10% OFF',
      desc: 'Enter voucher code STUDENT10 at checkout on any certified refurbished device.',
      cta: 'CLAIM VOUCHER',
      action: () => {
        setPillarInfo({
          title: 'Student & Youth 10% Voucher',
          content:
            'All students receive an extra 10% discount on every refurbished MacBook, iPad, or smartphone.\n\nUse code STUDENT10 in your cart drawer to claim your discount immediately.',
        });
      },
    },
    {
      title: 'BUNDLE & SAVE $150',
      desc: 'Pair any MacBook with AirPods or an iPhone with an Apple Watch.',
      cta: 'VIEW BUNDLES',
      action: () => {
        setActiveCategory('MacBooks');
        const el = document.getElementById('catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'THE 25-POINT LAB STANDARD',
      desc: 'See how our engineers stress-test batteries, logic boards, and camera sensors.',
      cta: 'SEE STANDARDS',
      action: () => {
        setPillarInfo({
          title: 'The 25-Point Laboratory Inspection',
          content:
            'Every device sold undergoes rigorous testing:\n\n1. Battery Diagnostic: Certified >85% battery capacity\n2. Motherboard & Chipset: Full automated stress testing\n3. Display Health: Sub-pixel test & 120Hz responsiveness\n4. Camera & Microphones: Optical clarity & noise cancellation\n5. Sanitization: Complete ultra-sonic hygienic cleaning\n6. Data Wiping: DoD-grade zero-trace data erase.',
        });
      },
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 mx-auto max-w-7xl bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promos.map((promo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="rounded-2xl p-6 flex flex-col justify-between min-h-[190px] border border-white/10 bg-white/5 hover:border-white/30 transition-all hover:bg-white/8 group"
          >
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider text-white mb-2">{promo.title}</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-mono">{promo.desc}</p>
            </div>
            <button
              type="button"
              onClick={promo.action}
              className="flex items-center gap-2 font-mono font-bold text-xs text-white group-hover:text-accent-lime transition-colors mt-6 cursor-pointer w-fit"
            >
              <span>{promo.cta}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TrustPromise() {
  const { setPillarInfo } = useModals();

  const pillars = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-white" />,
      title: '1-YEAR WARRANTY',
      short: 'Every single device covered for 12 months with zero deductibles.',
      details:
        'Our comprehensive 1-Year Commercial Warranty covers all hardware defects, component failure, and internal malfunctions with zero deductibles. If a covered problem occurs, we repair it, replace it, or issue a full refund.',
    },
    {
      icon: <RefreshCcw className="h-6 w-6 text-white" />,
      title: '30-DAY FREE RETURNS',
      short: 'Test your refurbished device in real life with 100% money back.',
      details:
        'Take 30 days to test out your refurbished tech. If you are not 100% in love with the device, print out our prepaid return label and send it back for a full refund.',
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-white" />,
      title: '25-POINT LAB INSPECTION',
      short: 'Diuji, disanitasi, dan disertifikasi beroperasi dengan presisi pabrik.',
      details:
        'Teknisi bersertifikasi menguji setiap mikrofon, speaker, piksel layar, dan konektor baterai. Hanya perangkat yang lulus 100% fungsional yang mendapatkan segel resmi BaruLagi.',
    },
    {
      icon: <Wrench className="h-6 w-6 text-white" />,
      title: 'FREE EXPRESS SHIPPING',
      short: 'Dikirim dengan nomor resi kilat dalam kemasan ramah lingkungan.',
      details:
        'Semua pesanan dikirim dengan asuransi penuh dan pelacakan kurir instan langsung ke pintu rumah Anda.',
    },
  ];

  return (
    <section id="promise-section" className="border-t border-b border-white/10 bg-black text-white py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A0A0A0] block mb-2 font-mono">
            INTEGRITAS &amp; KUALITAS
          </span>
          <h2 className="font-black text-3xl sm:text-5xl uppercase tracking-[0.08em] text-white">
            STANDAR &amp; JANJI BARULAGI
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-3 font-mono">
            KLIK SETIAP PILAR UNTUK MELIHAT KEBIJAKAN TRANSPARAN KAMI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.button
              key={idx}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() =>
                setPillarInfo({
                  title: pillar.title,
                  content: pillar.details,
                })
              }
              className="flex flex-col items-start p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-white/40 transition-all hover:bg-white/8 text-left group"
            >
              <div className="p-3 bg-white/10 rounded-xl mb-5 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="font-black text-sm uppercase tracking-wider text-white mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-mono">
                {pillar.short}
              </p>
              <span className="text-[10px] font-mono font-bold text-accent-lime uppercase tracking-widest mt-4">
                LEARN DETAILS &rarr;
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialsProps {
  initialReviews: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    inventory: {
      condition: string;
      product: {
        name: string;
      };
    };
  }[];
}

export function TestimonialsSection({ initialReviews }: TestimonialsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState(initialReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerComment.trim()) return;
    setIsSubmitting(true);

    const firstInvId = initialReviews[0]?.id || 'mock_inv_id';
    const res = await submitReview({
      inventoryId: firstInvId,
      userName: reviewerName.trim() || 'Verified Customer',
      rating: reviewerRating,
      comment: reviewerComment.trim(),
    });

    if (res.success && res.review) {
      setReviews([
        {
          id: res.review.id,
          userName: res.review.userName,
          rating: res.review.rating,
          comment: res.review.comment,
          inventory: {
            condition: 'Excellent',
            product: {
              name: res.review.inventory?.product?.name || 'Verified Device',
            },
          },
        },
        ...reviews,
      ]);
    }

    setIsSubmitting(false);
    setIsReviewModalOpen(false);
    setReviewerName('');
    setReviewerComment('');
  };

  return (
    <section id="reviews-section" className="py-24 px-6 md:px-12 lg:px-20 mx-auto max-w-7xl bg-black text-white overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A0A0A0] block mb-2 font-mono">
            VERIFIED CUSTOMER FEEDBACK
          </span>
          <h2 className="font-black text-3xl sm:text-5xl uppercase tracking-[0.08em] text-white">
            REAL REVIEWS &bull; REAL BUYERS
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-2 font-mono">
            OVER 500,000+ CUSTOMERS BUYING CIRCULAR ELECTRONICS
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="border border-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            WRITE A REVIEW
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide scroll-smooth"
      >
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="w-80 sm:w-96 shrink-0 snap-start border border-white/10 bg-white/5 p-7 rounded-2xl flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex gap-1 mb-4 text-accent-lime">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent-lime text-accent-lime" />
                ))}
              </div>
              <p className="text-sm text-gray-200 mb-6 leading-relaxed font-mono italic">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <span>{rev.userName}</span>
                <span className="text-[9px] font-mono bg-white/10 text-accent-lime font-bold px-1.5 py-0.5 rounded">
                  VERIFIED
                </span>
              </p>
              <p className="text-xs text-[#A0A0A0] font-mono mt-1">
                {rev.inventory.product.name} &bull; {rev.inventory.condition}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative bg-black border border-white/20 w-full max-w-md rounded-2xl p-7 shadow-2xl z-10 text-white">
            <h3 className="font-black text-lg uppercase tracking-wider mb-4">POST HARDWARE REVIEW</h3>
            <form onSubmit={handleAddReview} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-gray-400 block mb-1 uppercase tracking-wider">YOUR NAME</label>
                <Input
                  required
                  placeholder="e.g. Liam Foster"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="bg-white/5 border-white/20 text-white text-xs h-10"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 uppercase tracking-wider">RATING</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="p-1 text-accent-lime"
                    >
                      <Star className={`h-5 w-5 ${star <= reviewerRating ? 'fill-accent-lime' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 uppercase tracking-wider">REVIEW COMMENT</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Battery health, physical condition, and performance..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="border border-white/20 px-4 py-2 uppercase tracking-wider text-white hover:border-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-white bg-white text-black font-black px-5 py-2 uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'POST REVIEW'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
