import { EnhancerBuilder, compose } from '@uniformdev/canvas';
import { getProduct } from './commerce';
import { AKENEO_PARAMETER_TYPES } from '@uniformdev/canvas-akeneo';
import akeneoEnhancer from './akeneo/akeneoEnhancer';
import { createCloudinaryEnhancer, CLOUDINARY_PARAMETER_TYPES } from '@uniformdev/canvas-cloudinary';
import { akeneoModelConverter } from './akeneo/akeneoModelConverter';
import { cloudinaryConverter } from './cloudinaryConverter';

export const createDefaultEnhancerBuilder = new EnhancerBuilder()
  .parameterType(AKENEO_PARAMETER_TYPES, compose(akeneoEnhancer, akeneoModelConverter))
  .parameterType(CLOUDINARY_PARAMETER_TYPES, compose(createCloudinaryEnhancer(), cloudinaryConverter));

export const createProductDetailEnhancers = ({ productId, locale }: { productId: string; locale: string }) => {
  return new EnhancerBuilder().data('product', async () =>
    productId ? await getProduct(productId, locale) : undefined
  );
};
