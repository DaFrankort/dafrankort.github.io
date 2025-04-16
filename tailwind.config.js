/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // https://www.realtimecolors.com/?colors=eeeef6-050506-9d9cce-6b336a-b05e92&fonts=Righteous-Carlito
    colors: {
      ...colors,
      text: {
        50: "#eeeef6",
        100: "#dedeed",
        200: "#bcbcdc",
        300: "#9b9bca",
        400: "#7979b9",
        500: "#5858a7",
        600: "#464686",
        700: "#353564",
        800: "#232343",
        900: "#121221",
        950: "#090911",
      },
      background: {
        50: "#f1f1f3",
        100: "#e3e3e8",
        200: "#c7c7d1",
        300: "#acacb9",
        400: "#9090a2",
        500: "#74748b",
        600: "#5d5d6f",
        700: "#464653",
        800: "#2e2e38",
        900: "#17171c",
        950: "#0c0c0e",
      },
      primary: {
        50: "#eeeef7",
        100: "#ddddee",
        200: "#bbbbdd",
        300: "#9998cd",
        400: "#7776bc",
        500: "#5654ab",
        600: "#444389",
        700: "#333267",
        800: "#222244",
        900: "#111122",
        950: "#090811",
      },
      secondary: {
        50: "#f7eef7",
        100: "#eeddee",
        200: "#debadd",
        300: "#cd98cc",
        400: "#bd75bc",
        500: "#ac53ab",
        600: "#8a4289",
        700: "#673266",
        800: "#452144",
        900: "#221122",
        950: "#110811",
      },
      accent: {
        50: "#f7eef3",
        100: "#eedde8",
        200: "#ddbbd1",
        300: "#cd98b9",
        400: "#bc76a2",
        500: "#ab548b",
        600: "#89436f",
        700: "#673253",
        800: "#442238",
        900: "#22111c",
        950: "#11080e",
      },
    },
  },

  fontSize: {
    sm: "0.750rem",
    base: "1rem",
    xl: "1.333rem",
    "2xl": "1.777rem",
    "3xl": "2.369rem",
    "4xl": "3.158rem",
    "5xl": "4.210rem",
  },
  fontFamily: {
    heading: "Righteous",
    body: "Carlito",
  },
  fontWeight: {
    normal: "400",
    bold: "700",
  },

  plugins: [forms],
};
