import React from 'react';
import { getReviews } from '@/app/actions';
import { PromoBanners, TrustPromise, TestimonialsSection } from './DynamicSectionsClient';

export { PromoBanners, TrustPromise };

export async function Testimonials() {
  const rawReviews = await getReviews();
  const reviews = JSON.parse(JSON.stringify(rawReviews));

  return <TestimonialsSection initialReviews={reviews} />;
}
