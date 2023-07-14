import { defineConfig } from 'vite';
import nodePolyFills from 'rollup-plugin-polyfill-node';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  define: {
    'process.env.BROWSER': 'true'
  },
  plugins: [
    nodePolyFills({
      include: ['buffer']
    }),
    resolve({
      browser: true,
      extensions: ['.js', '.ts'],
      dedupe: ['bn.js', 'buffer'],
      preferBuiltins: false
    })
  ],
  build: {
    rollupOptions: {
      external: ['buffer', 'bn.js']
    }
  }
});
