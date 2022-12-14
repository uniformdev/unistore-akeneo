import { categoryEnhancers } from '@/utils/enhancers';
import { CanvasClient, CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE, enhance } from '@uniformdev/canvas';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { apiKey, apiHost, projectId },
} = getConfig();

export const canvasClient = new CanvasClient({
  apiKey: apiKey,
  apiHost: apiHost,
  projectId: projectId,
});

// export async function getCompositionBySlug(slug: string, context: any) {
//   const { preview } = context || {};
//   const { composition } = await canvasClient.getCompositionBySlug({
//     slug: slug,
//     state: getState(preview),
//   });

//   await enhance({
//     composition,
//     context,
//     enhancers: defaultEnhancers,
//   });

//   return composition;
// }

// export async function getProductDetailComposition(productId: string, context: any) {
//   const { preview } = context || {};
//   const { composition } = await canvasClient.getCompositionBySlug({
//     slug: 'product-detail',
//     state: getState(preview),
//     skipEnhance: false,
//   });

//   await enhance({
//     composition,
//     enhancers: productDetailEnhancers({ productId }),
//     context,
//   });
//   return composition;
// }

export async function getCategoryComposition(categoryId: string, context: any) {
  const { preview } = context || {};
  const locale = 'en_US';
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: 'product-category',
    state: getState(preview),
    skipEnhance: false,
  });

  await enhance({
    composition,
    enhancers: categoryEnhancers({ categoryId, locale }),
    context: {},
  });
  return composition;
}

export const getState = (preview: boolean | undefined) =>
  process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;

export const getCompositionPaths = async () => {
  const pages = await canvasClient.getCompositionList({
    skipEnhance: true,
    state: getState(undefined),
  });

  return pages.compositions
    .filter(c => c.composition._slug && c.composition._slug !== '/')
    .map(c => (c.composition._slug?.startsWith('/') ? `${c.composition._slug}` : `/${c.composition._slug}`));
};
