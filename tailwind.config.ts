import type { Config } from 'tailwindcss'

export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Source Serif Pro', 'Georgia', 'serif'],
        body: ['Synonym', 'system-ui', 'sans-serif']
      },
      colors: {
        lightGreen: '#CCD5AE',
        paleGreen: '#E9EDC9',
        cream: '#FEFAE0',
        beige: '#FAEDCD',
        tan: '#D4A373',
      },
    },
  },
  plugins: [],
} satisfies Config

