/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
import { resolve } from 'node:path';
import tsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  build: {
    emptyOutDir: true,
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
        text: resolve(__dirname, 'src/components/text/index.ts'),
        systems: resolve(__dirname, 'src/systems/index.ts'),
        types: resolve(__dirname, 'src/types'),
        utils: resolve(__dirname, 'src/utils'),
      },
      formats: ['cjs', 'es'],
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
  plugins: [
    react(),
    tsConfigPaths(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    setupFiles: './setupTests.ts',
  },
});
