/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["chakra petch", "sans-serif"],
    },
    screens: {
      sm: "340px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {},
  },
  plugins: [("@tailwindcss/typography"), daisyui],
};
