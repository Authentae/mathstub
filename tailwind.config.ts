import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  // Class-based dark mode forced via <html class="dark"> in layout.tsx —
  // the site is now always dark per the Variant B homepage. Switching
  // from 'media' to 'class' ensures every `dark:` variant on calc pages,
  // forms, blog cards, etc. applies regardless of the user's OS setting.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Full 50–900 brand-blue scale. Earlier config only defined 50,
        // 100, 500, 600, 700, 900 — so any class using brand-200/300/
        // 400/800 was a Tailwind no-op and rendered as inherited white
        // (which is why the homepage's italic accents on "actually" and
        // "30 seconds" looked white instead of blue). Standard Tailwind
        // blue palette for the missing shades.
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
