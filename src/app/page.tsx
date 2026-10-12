import { getProducts, getReviews } from '@/app/actions';
import { MarketplacePageClient } from '@/components/home/MarketplacePageClient';
import { ProductData } from '@/context/ModalContext';

import fallbackProducts from '@/lib/fallbackData.json';
import fallbackReviews from '@/lib/fallbackReviews.json';

export default async function Home() {
  let initialProducts: ProductData[] = fallbackProducts as unknown as ProductData[];
  let initialReviews = fallbackReviews;

  try {
    const products = await getProducts();
    const reviews = await getReviews();

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
