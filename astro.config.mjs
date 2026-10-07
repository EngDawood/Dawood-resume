// @ts-check
import { defineConfig } from 'astro/config';

// BASE_PATH is set by the deploy workflow from actions/configure-pages:
// "" once the custom domain (resume.engdawood.com) points here, "/Dawood-resume" before that.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://resume.engdawood.com',
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
