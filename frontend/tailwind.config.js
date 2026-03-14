/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        nexx: {
          900: "#0b0f1a",
          800: "#0d1120",
          700: "#11172b",
          500: "#00d1ff",
          400: "#53e8ff",
          300: "#a3f5ff"
        }
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 209, 255, 0.4)"
      },
      fontFamily: {
        sans: ["var(--font-display)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
