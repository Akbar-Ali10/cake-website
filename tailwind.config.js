/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfaf6',
          100: '#faf6f0',
          200: '#f5ede3',
          300: '#ede0d0',
          400: '#dccbb5',
        },
        cocoa: {
          50: '#f7f2ee',
          100: '#e8d8cc',
          200: '#d0b39e',
          300: '#b08c72',
          400: '#8a6850',
          500: '#6b4226',
          600: '#5a3820',
          700: '#4a2e1a',
          800: '#3d2817',
          900: '#2e1d10',
        },
        blush: {
          50: '#fef5f6',
          100: '#fdeced',
          200: '#f5e6e8',
          300: '#ecd0d5',
          400: '#dab0b8',
          500: '#c48a95',
          600: '#a86774',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
