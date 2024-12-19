/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        majesticPurple: '#E056FD',
        lightPurple: '#E4C1E8',
        darkPurple: '#8E44AD',
        neonPink: '#FD79A8',
      },
    },
  },
  plugins: [],
};
