import { EnhancerBuilder } from '@uniformdev/canvas';
import { getProduct } from './commerce';
import { AKENEO_PARAMETER_TYPES } from '@uniformdev/canvas-akeneo';
import akeneoEnhancer from './akeneo/akeneoEnhancer';

export const createDefaultEnhancerBuilder = new EnhancerBuilder().parameterType(AKENEO_PARAMETER_TYPES, akeneoEnhancer);

export const createProductDetailEnhancers = ({ productId, locale }: { productId: string; locale: string }) => {
  return new EnhancerBuilder().data('product', async () =>
    productId ? await getProduct(productId, locale) : undefined
  );
};
