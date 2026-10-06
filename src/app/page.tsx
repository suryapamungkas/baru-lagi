import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { MarketplacePageClient } from '@/components/home/MarketplacePageClient';
import { ProductData } from '@/context/ModalContext';

import fallbackProducts from '@/lib/fallbackData.json';
import fallbackReviews from '@/lib/fallbackReviews.json';

export default async function Home() {
  let initialProducts: ProductData[] = fallbackProducts as unknown as ProductData[];
  let initialReviews = fallbackReviews;

  try {
    const products = await prisma.product.findMany({
      include: {
        inventories: {
          include: {
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const reviews = await prisma.review.findMany({
      include: {
        inventory: {
          include: {
            product: true,
          },
        },
      },
      take: 10,
      orderBy: { date: 'desc' },
    });

    if (products && products.length > 0) {
      initialProducts = JSON.parse(JSON.stringify(products));
    }
    if (reviews && reviews.length > 0) {
      initialReviews = JSON.parse(JSON.stringify(reviews));
    }
  } catch (error) {
    console.warn('Using pre-bundled fallback database for Vercel deployment:', error);
  }

  return (
    <MarketplacePageClient
      initialProducts={initialProducts}
      initialReviews={initialReviews}
    />
  );
}
