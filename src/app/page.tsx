import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { MarketplacePageClient } from '@/components/home/MarketplacePageClient';
import { ProductData } from '@/context/ModalContext';

export default async function Home() {
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

  const initialProducts: ProductData[] = JSON.parse(JSON.stringify(products));
  const initialReviews = JSON.parse(JSON.stringify(reviews));

  return (
    <MarketplacePageClient
      initialProducts={initialProducts}
      initialReviews={initialReviews}
    />
  );
}
