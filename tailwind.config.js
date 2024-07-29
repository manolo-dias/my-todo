/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'transform': 'transform',
      },
      scale: {
        '110': '1.1',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'],
    },
  },
  plugins: [],
}