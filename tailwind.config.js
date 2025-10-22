/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#e6efff',
          200: '#c9dcff',
          300: '#9fbfff',
          400: '#6f99ff',
          500: '#3f75ff',
          600: '#2557e6',
          700: '#1b43b4',
          800: '#173990',
          900: '#142f75'
        }
      }
    },
  },
  plugins: [],
}
