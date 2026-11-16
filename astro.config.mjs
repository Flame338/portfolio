import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL ?? 'https://flame338.github.io';
const base = process.env.BASE_PATH ?? '/portfolio';
// The sitemap integration reports the 404 route as the base URL without its trailing slash.
const notFoundUrl = new URL(site).origin + base.replace(/\/$/, '');

export default defineConfig({
  site,
  base,
  integrations: [sitemap({ filter: (page) => page !== notFoundUrl })],
  build: { inlineStylesheets: 'always' },
});
