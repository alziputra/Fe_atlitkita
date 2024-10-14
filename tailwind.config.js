/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["chakra petch", "sans-serif"],
    },
    extend: {},
  },
  plugins: [("@tailwindcss/typography"), daisyui],
};
