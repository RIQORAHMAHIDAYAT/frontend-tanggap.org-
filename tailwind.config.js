/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sma-primary': '#1E40AF', // Blue-800
        'sma-secondary': '#0EA5E9', // Sky-500
        'sma-dark': '#0F172A', // Slate-900
        'sma-light': '#F8FAFC', // Slate-50
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

