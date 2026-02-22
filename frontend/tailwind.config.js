/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          burgundy: '#722F37',
          dark: '#5A252C',
          light: '#8B4049',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#D4B44A',
          dark: '#A88B1F',
        },
        vintage: {
          paper: '#F5F0E8',
          dark: '#1A1A1A',
          brown: '#8B4513',
          cream: '#FDF8E8',
        },
        'wine-burgundy': '#722F37',
        'gold': '#C9A227',
        'gold-dark': '#A88B1F',
        'gold-light': '#D4B44A',
        'vintage-dark': '#1A1A1A',
        'vintage-cream': '#FDF8E8',
        'vintage-paper': '#F5F0E8',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'vintage-pattern': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #D4B44A 50%, #C9A227 100%)',
      },
    },
  },
  plugins: [],
};
