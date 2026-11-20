/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#F7F4EF",
          100: "#EFEAE2",
          200: "#E2DAD0",
          300: "#CFC4B6",
          400: "#B3A494",
          500: "#8F7E6E",
          600: "#6E5E50",
          700: "#524539",
          800: "#3A3028",
          900: "#241C16",
          950: "#120E0B",
        },
        accent: {
          50: "#FBF5F1",
          100: "#F6E7DC",
          200: "#EECFBA",
          300: "#E2AD8C",
          400: "#D18455",
          500: "#9A4518",
          600: "#7E3814",
          700: "#632C12",
          800: "#4A210E",
          900: "#32160B",
          950: "#1C0C06",
        },
      },
    },
  },
  plugins: [],
};
