import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vitePluginCommonjs from 'vite-plugin-commonjs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { createRequire } from 'module'
import wasm from 'vite-plugin-wasm'

const require = createRequire(import.meta.url)

export default defineConfig({
  plugins: [
    vue(),
    wasm(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
      include: ['stream', 'buffer']
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
    },
    {
      name: 'handle-wasm',
      transform(code, id) {
        if (id.endsWith('.wasm')) {
          return {
            code: `
              export default function initWasm() {
                return import('${id}').then(module => module.default());
              }
            `,
            map: null
          };
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@wallet-sdk': path.resolve(__dirname, 'lib/wallet-sdk/dist/esm'),
      'crypto': 'crypto-browserify'
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.wasm']
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/lib\/wallet-sdk\/.*/, /node_modules\/.*/]
    },
    target: ['es2020'],
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // 只保留一个入口点
      output: {
        format: 'iife',
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(css)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'css'
          }
          return `${extType}/[name]-[hash][extname]`
        },
        inlineDynamicImports: false // 确保这个选项设置为 false
      }
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: { bigint: true }
    },
    include: [
      'buffer', 
      'crypto-browserify', 
      'stream-browserify', 
    ],
    exclude: ['@wallet-sdk']
  },
  server: {
    fs: {
      allow: ['.', './lib/wallet-sdk']
    }
  },
  base: './',
  publicDir: 'public'
})
