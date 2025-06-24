import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class", "[data-theme='night']"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Day mode
        sage: '#7B9B7E',
        limestone: '#F5F2ED',
        charcoal: '#2C2C2C',
        lavender: '#E6E0F5',
        terracotta: '#D4846F',
        ocean: '#6B8CAE',
        moss: '#5F7955',
        // Night mode
        'deep-sage': '#4A5F4C',
        midnight: '#1A1A1A',
        pearl: '#F5F5F5',
        'deep-lavender': '#4A4565',
        burgundy: '#8B4A47',
        'deep-ocean': '#3A5470',
        forest: '#3A4A3A',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        120: '30rem',
      },
    },
  },
  plugins: [],
}

export default config
