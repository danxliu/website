// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	site: 'https://danxliu.com',
	integrations: [mdx(), sitemap()],
});
