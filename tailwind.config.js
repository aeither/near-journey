const { colors } = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        white: "#F5F5F5",
        accent: "#63A2DC",
        "neutral-light": "#3C4142",
        "neutral-mid": "#2A2B2C",
        "neutral-dark": "#202323",
        brand: {
          50: "#f3f3f3",
          100: "#e7e7e7",
          200: "#c4c4c4",
          300: "#a0a0a0",
          400: "#585858",
          500: "#111111",
          600: "#0f0f0f",
          700: "#0d0d0d",
          800: "#0a0a0a",
          900: "#080808",
          DEFAULT: "#111111",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
  ],
};
