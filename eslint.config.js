
import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            '@eslint-react': eslintReact,
            '@next/next': nextPlugin,
        },
        rules: {
            ...eslintReact.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            '@eslint-react/no-leaked-conditional-rendering': 'error',
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        // JS files sit outside tsconfig's project service, so lint them untyped.
        files: ['**/*.{js,mjs}'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        // pino/logger.js runs on both server and browser.
        files: ['pino/**/*.js'],
        languageOptions: {
            globals: { process: 'readonly', navigator: 'readonly', Blob: 'readonly' },
        },
    },
  prettier,
    {
        ignores: [
            // Dependencies
            'node_modules/**',

            // Next.js generated files
            '.next/**',
            'out/**',
            'build/**',

            // Generated files
            'next-env.d.ts',
            'coverage/**',
            'src/generated/**',

            // Tooling
            'dist/**',
            '.turbo/**',
            '.vercel/**',

            // Generated Prisma files
            'prisma/generated/**',

            // Lock files
            'package-lock.json',
        ],
    },
];
