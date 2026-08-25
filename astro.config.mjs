import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = env.PUBLIC_SITE_URL?.trim();

// https://astro.build/config
export default defineConfig({
	...(site ? { site } : {}),
	integrations: site ? [sitemap()] : [],
	output: 'static',
});
