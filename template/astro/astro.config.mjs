import { defineConfig } from 'astro/config'
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  server: {
    port: 2960,
    host: true
  },
  integrations: [mdx(),solidJs()],
  vite: {
    ssr: {
      noExternal: ['@googlemaps/js-api-loader'],
    }
  }
});
