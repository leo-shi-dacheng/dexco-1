import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import vitePluginCommonjs from 'vite-plugin-commonjs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
    vitePluginCommonjs()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: [
      'buffer', 
      'crypto-browserify', 
      'stream-browserify', 
      'assert'
    ],
    esbuildOptions: {
      target: 'es2020',
    },
  }
})