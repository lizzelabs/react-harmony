/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />

import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import react from '@vitejs/plugin-react';
import ttsc from '@ttsc/unplugin/vite';
import dts from 'unplugin-dts/vite';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      react(),
      ttsc({
        project: 'tsconfig.app.json',
      }),
      dts({ tsconfigPath: './tsconfig.app.json' }),
    ],
    build: {
      sourcemap: true,
      watch: {
        include: ['src/**', './tsconfig.json', './tsconfig.app.json'],
      },
    },
  }),
);
