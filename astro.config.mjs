// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import { SITE_BASE, SITE_DOMAIN } from "./src/consts.js";

// https://astro.build/config
export default defineConfig({
    site: SITE_DOMAIN,
    base: SITE_BASE,
    integrations: [mdx(), sitemap(), react(), partytown()],
});