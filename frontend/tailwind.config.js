/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],

  // enable dark mode via class strategy
  darkMode: 'media',

  theme: {
    extend: {
      // extend base Tailwind CSS utility classes
      colors: {
        primary: {"50":"#f5f3ff","100":"#ede9fe","200":"#ddd6fe","300":"#c4b5fd","400":"#a78bfa","500":"#8b5cf6","600":"#7c3aed","700":"#6d28d9","800":"#5b21b6","900":"#4c1d95"}
      }
    },
    fontFamily: {
      'body': [
    'Inter', 
      ]
    }
  },

  plugins: [require('flowbite/plugin')],
}