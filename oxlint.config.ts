import { defineConfig } from 'oxlint';

export default defineConfig({
  ignorePatterns: ['setupTests.ts', '**/*.test.ts', '**/*.test.tsx'],
  plugins: ['typescript', 'eslint', 'react'],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'warn',
  },
  jsPlugins: [
    {
      name: 'react-plugin',
      specifier: 'eslint-plugin-react',
    },
    {
      name: 'react-hooks-js',
      specifier: 'eslint-plugin-react-hooks',
    },
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/strict-boolean-expressions': 'off',
    'typescript/prefer-nullish-coalescing': 'off',
    'typescript/no-misused-spread': 'off',
    'typescript/prefer-readonly-parameter-types': 'off',
    'typescript/no-unnecessary-type-parameters': 'off',
    'typescript/restrict-template-expressions': 'off',
    'eslint/no-underscore-dangle': 'off',
    'typescript/no-redundant-type-constituents': 'off',
    'react/react-in-jsx-scope': 'off',
    'eslint/max-lines-per-function': 'off',
    'react/only-export-components': [
      'error',
      {
        allowConstantExport: true,
        allowExportNames: ['meta', 'links', 'loader', 'action'],
      },
    ],
  },
});
