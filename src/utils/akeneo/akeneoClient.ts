import { AkeneoClient, AuthType } from '@uniformdev/canvas-akeneo';

const defaultAkeneoClient = new AkeneoClient({
  url: process.env.AKENEO_BASE_URL!,
  authType: AuthType.APPLICATION,
  token: process.env.AKENEO_TOKEN,
});

export default defaultAkeneoClient;
