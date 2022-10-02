import { EnhancerBuilder, compose } from '@uniformdev/canvas';
import { getProduct } from './commerce';
import { AKENEO_PARAMETER_TYPES } from '@uniformdev/canvas-akeneo';
import akeneoEnhancer from './akeneo/akeneoEnhancer';
import { createCloudinaryEnhancer, CLOUDINARY_PARAMETER_TYPES } from '@uniformdev/canvas-cloudinary';
import { akeneoModelConverter } from './akeneo/akeneoModelConverter';
import { cloudinaryConverter } from './cloudinaryConverter';
import { transformAkeneoProduct } from '@/utils/akeneo/akeneoModelConverter';
import { getCategoryName, getProductsByCategory } from '@/utils/commerce';

export const categoryEnhancers = ({ categoryId, locale }: { categoryId: string; locale: string }) => {
  return new EnhancerBuilder()
    .parameterType(AKENEO_PARAMETER_TYPES, compose(akeneoEnhancer, akeneoModelConverter))
    .parameterType(CLOUDINARY_PARAMETER_TYPES, compose(createCloudinaryEnhancer(), cloudinaryConverter))
    .data('categoryName', async () => (categoryId ? await getCategoryName(categoryId, locale) : ''))
    .parameterName('currentCategoryProducts', async p => {
      const limit = p.parameter.value as string;
      const products = (await getProductsByCategory(categoryId, Number.parseInt(limit)))?.map(p =>
        transformAkeneoProduct(p)
      );
      return products;
    });
};

export const createDefaultEnhancerBuilder = new EnhancerBuilder()
  .parameterType(AKENEO_PARAMETER_TYPES, compose(akeneoEnhancer, akeneoModelConverter))
  .parameterType(CLOUDINARY_PARAMETER_TYPES, compose(createCloudinaryEnhancer(), cloudinaryConverter));

export const createProductDetailEnhancers = ({ productId, locale }: { productId: string; locale: string }) => {
  return new EnhancerBuilder()
    .parameterType(AKENEO_PARAMETER_TYPES, compose(akeneoEnhancer, akeneoModelConverter))
    .parameterType(CLOUDINARY_PARAMETER_TYPES, compose(createCloudinaryEnhancer(), cloudinaryConverter))
    .data('product', async () => (productId ? await getProduct(productId, locale) : undefined));
};
