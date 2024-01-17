/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        zink: {
          900: "#18181b",
          800: "#27272a",
        },
        stone: {
          800: "#292524",
          600: "#57534e",
          500: "#78716c",
          400: "#a8a29e",
          100: "#f5f5f4",
        },
        red: {
          200: "#fecaca",
        },
        beige: "#F5F5DC",
        brown: "#8B4513",
        "dark-brown": "#5C3317",
      },
    },
  },
  plugins: [],
};
