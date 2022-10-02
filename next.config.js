const path = require('path');
const createNextPluginPreval = require('next-plugin-preval/config');

const withNextPluginPreval = createNextPluginPreval();

const config = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'images.unsplash.com',
      'y3ev57a1.twic.pics',
    ],
    unoptimized: true,
  },
  env: {
    THEME: process.env.THEME || 'light',
  },
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'unistore',
    outputType: process.env.UNIFORM_OUTPUT_TYPE || 'standard',
  },
  swcMinify: false,
  publicRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
  },
};

module.exports = withNextPluginPreval(config);
