/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.5em'
      }
    },
  },
  plugins: [],
}

