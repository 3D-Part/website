/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      //
      white: "#ffffff",
      black: "#101010",
      transparent: "transparent",
      //
      neutral: {
        50: "#F2F2F2",
        100: "#dedede",
        200: "#bdbdbd",
        300: "#9b9b9b",
        400: "#7a7a7a",
        500: "#595959",
        600: "#474747",
        700: "#353535",
        800: "#242424",
        900: "#121212",
      },
      //
      primary: {
        50: "#eff6ff",
        100: "#d8e6fd",
        400: "#629bf8",
        500: "#3b82f6",
        600: "#2f68c5",
      },
      //
      secondary: {
        50: "#fff8eb",
        100: "#fff1d7",
        400: "#fdc65d",
        500: "#fdb835",
        600: "#ca932a",
      },
      //
      success: {
        50: "#dcfce7",
        100: "#d3f3df",
        400: "#4ed17e",
        500: "#22c55e",
        600: "#1b9e4b",
      },
      //
      warning: {
        50: "#fffbeb",
        100: "#fdecce",
        400: "#f7b13c",
        500: "#f59e0b",
        600: "#c47e09",
      },
      //
      error: {
        50: "#fef2f2",
        100: "#fcdada",
        400: "#f26969",
        500: "#ef4444",
        600: "#bf3636",
      },
    },
    fontFamily: {
      exo2: ["var(--font-exo2)"],
    },
    // screens:{

    // },
    extend: {
      screens: {
        xsm: "480px",
      },
    },
  },
  plugins: [],
};
