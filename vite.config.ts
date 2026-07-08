/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
import { resolve } from 'node:path';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    emptyOutDir: true,
    rolldownOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: '[name].es.js',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
        },
      ],
    },
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        media: resolve(__dirname, 'src/components/media/index.ts'),
        animations: resolve(__dirname, 'src/components/animations/index.ts'),
        piece: resolve(__dirname, 'src/components/piece/index.ts'),
        'piece-provider': resolve(
          __dirname,
          'src/components/piece-provider/index.ts',
        ),
        screen: resolve(__dirname, 'src/components/screen/index.ts'),
        scrollable: resolve(__dirname, 'src/components/scrollable/index.ts'),
        hocs: resolve(__dirname, 'src/hocs/index.ts'),
        text: resolve(__dirname, 'src/components/text/index.ts'),
        systems: resolve(__dirname, 'src/systems/index.ts'),
        types: resolve(__dirname, 'src/types'),
        utils: resolve(__dirname, 'src/utils'),
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    sourcemap: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      ],
    },
  },
});
