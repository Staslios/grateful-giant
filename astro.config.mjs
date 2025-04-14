// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'https://staslios.github.io',
    base: '/grateful-giant/',
    integrations: [mdx(), sitemap(), react(), partytown()],
});