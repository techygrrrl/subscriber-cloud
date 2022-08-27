import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    manifest: false,
    sourcemap: true,

    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]', // works for CSS!

        // thank you joshwashywash!
        entryFileNames: '[name].js',
      }
    }
  },

  base: '',

  server: {
    // https: true
  },

  plugins: [
  ]
})