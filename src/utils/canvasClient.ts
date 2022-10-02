import {
  CanvasClient,
  CANVAS_PUBLISHED_STATE,
  CANVAS_DRAFT_STATE,
  enhance,
  EnhancerBuilder,
  compose,
} from '@uniformdev/canvas';
import { AKENEO_PARAMETER_TYPES } from '@uniformdev/canvas-akeneo';
import getConfig from 'next/config';
import akeneoEnhancer from './akeneo/akeneoEnhancer';
import { akeneoModelConverter } from './akeneo/akeneoModelConverter';

const {
  serverRuntimeConfig: { apiKey, apiHost, projectId },
} = getConfig();

export const canvasClient = new CanvasClient({
  apiKey: apiKey,
  apiHost: apiHost,
  projectId: projectId,
});

export async function getCompositionBySlug(slug: string, context: any) {
  const { preview } = context || {};
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: slug,
    state: getState(preview),
  });

  await enhance({
    composition,
    context,
    enhancers: new EnhancerBuilder().parameterType(
      AKENEO_PARAMETER_TYPES,
      compose(akeneoEnhancer, akeneoModelConverter)
    ),
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
