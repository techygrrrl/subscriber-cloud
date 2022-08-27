import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    manifest: false,
    sourcemap: true,
  },

  base: './',

  server: {
    // https: true
  },

  plugins: [
  ]
})