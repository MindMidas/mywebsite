// @ts-check
import { createRequire } from 'node:module';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { CONFIG } from './src/data/config.ts';

const require = createRequire(import.meta.url);
const astroPrerenderEntry = require.resolve('astro/entrypoints/prerender');

// https://astro.build/config
export default defineConfig({
  site: CONFIG.site.url,
  devToolbar: {
    enabled: false,
  },

  vite: {
    resolve: {
      alias: {
        'astro/entrypoints/prerender': astroPrerenderEntry,
      },
    },
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap(),
  ],
});
