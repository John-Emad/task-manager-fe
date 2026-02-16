/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: "#f15946",
        navy: "#1f006c",
        white: "#ffffff",
        "tuscan-sun": "#f9c22e",
        "pacific-blue": "#53b3cb",
      },
    },
  },
  plugins: [],
};
