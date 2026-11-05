import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      '@eslint-react': eslintReact,
      '@next/next': nextPlugin,
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@eslint-react/no-leaked-conditional-rendering': 'error',
    },
  },
  prettier,
];
