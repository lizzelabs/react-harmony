import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import react from '@vitejs/plugin-react';
import ttsc from '@ttsc/unplugin/vite';
import dts from 'unplugin-dts/vite';

export default mergeConfig(viteConfig, {
  plugins: [
    react(),
    ttsc({
      project: 'tsconfig.app.json',
    }),
    dts({ tsconfigPath: './tsconfig.app.json' }),
  ],
});
