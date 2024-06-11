import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const hash = Math.floor(Math.random() * 90000) + 10000

export default defineConfig({
  plugins: [
    vue(),

    VitePWA({
      includeAssets: ['/images/gigaswap/pwa-512.png'],
      manifest: {
        name: 'GigaSwap Interface',
        short_name: 'GigaSwap',
        description: 'Secure OTC exchange of cryptocurrencies, NFTs and tokens without the participation of a third party.',
        theme_color: '#FFE79BFF',
        icons: [
          {
            src: '/images/gigaswap/pwa/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/gigaswap/pwa/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      }
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },

  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import '@/app/styles/variables.sass'\n`
      }
    }
  },

  define: {
    global: 'globalThis'
  },

  server: {
    host: true,
  },

  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`
      }
    }
  },
})
