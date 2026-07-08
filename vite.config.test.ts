import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import ttsc from '@ttsc/unplugin/vite';
import dts from 'unplugin-dts/vite';

export default mergeConfig(viteConfig, {
  plugins: [
    react(),
    ttsc({
      project: 'tsconfig.test.json',
      plugins: false,
    }),
    dts({ tsconfigPath: './tsconfig.test.json' }),
  ],
  test: {
    globals: false,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    setupFiles: ['./src/setupTests.ts'],
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      screenshotDirectory: './failures',
      screenshotFailures: false,
      instances: [{ browser: 'chromium' }],
    },
  },
});
