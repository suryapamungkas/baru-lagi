import React from 'react';
import { getProducts } from '@/app/actions';
import { ProductsView } from './ProductsView';
import { ProductData } from '@/context/ModalContext';

export async function ProductsGrid() {
  const rawProducts = await getProducts();
  const products: ProductData[] = JSON.parse(JSON.stringify(rawProducts));

  return <ProductsView initialProducts={products} />;
}
