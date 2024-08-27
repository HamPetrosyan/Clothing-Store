/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customeLightPurple: "#faf5ff",
        customeNormPurple: "#4d347c",
        customeDarkPurple: "#29164c",
        shadowPurple: "rgba(77, 52, 124, 0.4)",
        borderPurple: "rgba(41, 22, 76, 0.4)",
        bgPurple: "rgba(141, 127, 173, 0.5)",
      },
      screens: {
        custom: "840px",
      },
    },
  },
  plugins: [],
};
