import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vitePluginCommonjs from 'vite-plugin-commonjs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

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
    vitePluginCommonjs(),
    {
      name: 'resolve-wallet-sdk-deps',
      resolveId(source, importer) {
        if (importer && importer.includes('lib/wallet-sdk') && !source.startsWith('.')) {
          try {
            return require.resolve(source, { paths: [path.resolve(__dirname, 'lib/wallet-sdk')] })
          } catch (e) {
            console.warn(`Failed to resolve ${source} from wallet-sdk`)
          }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@wallet-sdk': path.resolve(__dirname, 'lib/wallet-sdk/dist')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/lib\/wallet-sdk\/.*/, /node_modules\/.*/]
    }
  },
  optimizeDeps: {
    include: [
      'buffer', 
      'crypto-browserify', 
      'stream-browserify', 
      'assert'
    ],
    exclude: ['@wallet-sdk']
  },
  server: {
    fs: {
      allow: ['.', './lib/wallet-sdk']
    }
  }
})
