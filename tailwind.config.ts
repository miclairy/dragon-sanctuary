import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                blueLight: '#d5f1f7',
                pinkLight: '#f1d5f7',
                purpleLight: '#e4e2f7',
                blue: '#86B8E7',
                purple: '#7B60BD',
                pink: '#CB5FA6',
                greenLight: '#dbf7d5',
                green: '#96cc60',
            },
        },
    },
    plugins: [],
};
export default config;