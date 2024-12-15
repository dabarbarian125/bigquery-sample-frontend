// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'ui-sans-serif', 'system-ui'],
        mono: ['Ubuntu Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        text: '#14061c',
        background: '#f7eefc',
        primary: '#9c30d5',
        secondary: '#e69584',
        accent: '#ddad57'
      },
    },
  },
  plugins: [],
}

