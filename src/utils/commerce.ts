import { ProductData } from '@uniformdev/canvas-akeneo';
import defaultAkeneoClient from './akeneo/akeneoClient';
import { transformAkeneoProduct } from './akeneo/akeneoModelConverter';
//import productUrls from '../../data/productUrls.json';
import categoryUrls from '../../data/categoryUrls.json';
import { sluggify } from './stringUtils';

export async function getProduct(productId: string, locale: string) {
  return await (
    await defaultAkeneoClient.getProducts({ productIds: [productId], locale: locale })
  ).map(p => transformAkeneoProduct(p))[0];
}

// export function getProductUrls(): string[] {
//   return productUrls;
// }

export async function getProductUrls(): Promise<string[]> {
  const categories = categoryUrls.map(c => c.href);
  const products = await defaultAkeneoClient.getProductsFromCategories({
    categories,
    channel: 'ecommerce',
    locale: 'en_US',
    limit: 100,
  });

  const productUrls = products
    ? products.map(p => {
        const product = transformAkeneoProduct(p);
        return `/products/${sluggify(product.name)}-${product.id.replace('-', '+')}`;
      })
    : [];
  return productUrls;
}

export async function getProducts(): Promise<ProductData[]> {
  const products = await defaultAkeneoClient.getAllProducts({ channel: 'ecommerce', locale: 'en_US' });
  return products.map(p => transformAkeneoProduct(p));
}

export async function getProductsByCategory(categoryId: string, limit: number): Promise<ProductData[]> {
  // appending "master_" to category id by convention
  const category = categoryId.startsWith('master_') ? categoryId : `master_${categoryId}`;
  return await (
    await defaultAkeneoClient.getProductsFromCategories({
      categories: [category],
      channel: 'ecommerce',
      locale: 'en_US',
      limit: limit,
    })
  ).map(p => transformAkeneoProduct(p));
}

export async function getCategoryName(categoryId: string, locale: string): Promise<string> {
  // appending "master_" to category id by convention
  const categoryIdentifier = categoryId.startsWith('master_') ? categoryId : `master_${categoryId}`;
  const category = await defaultAkeneoClient.getCategory(categoryIdentifier);
  if (category) {
    return category.labels[locale];
  }
  return '';
}
