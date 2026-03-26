/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'carbon-bg': '#0B0D10',
        'carbon-surface': '#151A21',
        'brand-teal': '#2DD4BF',
      },
    },
  },
  plugins: [],
}