/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#07111E',
          800: '#0A192F',
          700: '#0F2B48',
          600: '#1B3B6F',
          500: '#2A5298',
        },
        gold: {
          900: '#8A6D1C',
          800: '#B59231',
          700: '#D4AF37',
          600: '#E6C687',
          500: '#F3E5AB',
        },
        teal: {
          900: '#0f766e',
          800: '#115e59',
          700: '#0d9488',
          600: '#14b8a6',
          500: '#2dd4bf',
          400: '#5eead4',
          300: '#99f6e4',
          200: '#ccfbf1',
          100: '#e6fffa',
          50:  '#f0fdf4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
