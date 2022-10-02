import { createEnhancer } from '@uniformdev/canvas-akeneo';
import defaultAkeneoClient from './akeneoClient';

const akeneoEnhancer = createEnhancer({
  clients: defaultAkeneoClient,
});

export default akeneoEnhancer;
