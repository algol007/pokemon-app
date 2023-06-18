/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0E1F40',
        secondary: '#263C66',
        orange: '#FF7A2E',
      }
    },
  },
  plugins: [],
}

