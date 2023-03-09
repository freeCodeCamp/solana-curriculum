import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      assert: 'assert',
      crypto: 'node_modules/crypto-browserify/index.js',
      util: 'util',
      'near-api-js': 'near-api-js/dist/near-api-js.js'
    }
  },
  define: {
    'process.env': process.env ?? {}
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [nodePolyfills({ crypto: true })]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
    }
  }
});
