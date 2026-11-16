import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://flame338.github.io',
  base: process.env.BASE_PATH ?? '/steve-portfolio',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  build: { inlineStylesheets: 'always' },
});
