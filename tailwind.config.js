/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          light: {
            bright: '#9AEBA3',
            disabled: '#99B29C',
            gradient: {
              100: '#22CC92',
              200: '#29937E',
            },
          },
          dark: {
            water: '#287A6B',
            swamp: '#4F856A',
            thin: '#3E5E41',
            thick: '#13362C',
            disabled: '#25312C',
            gradient:{
              100: '#5C9794',
              200: '#387F7F',
            },
          },
        },
        black: {
          100: "#25312C",
          500: '#070C0A',
        },
        white:{
          100: "#D9D9D9",
        },
      }
    },
  },
  plugins: ["nativewind/babel"],
}

