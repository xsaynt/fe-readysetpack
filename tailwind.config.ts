import type { Config } from 'tailwindcss'

export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CCD5AE",   // Main elements or header background
        secondary: "#E9ECDB", // Buttons, card backgrounds
        background: "#F5F7EE", // General page background
        hoverLight: "#9CAD6E", // Hover state for light mode
        accent: "#4D5932",    // Text and icons in light mode
        highlight: "#1C2112", // Text and icons in dark mode
        hoverDark: "#63733D", // Hover state for dark mode
      },
    },
  },
  plugins: [],
} satisfies Config

