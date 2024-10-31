import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { min: "1440px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "480px" },
      xs: { max: "360px" },
    },
    extend: {
      colors: {
        base_green: "var(--base_green)",
        dark_green: "var(--dark_green)",
        light_green: "var(--light_green)",
        acsent_orange: "var(--acsent_orange)",
        active_orange: "var(--active_orange)",
        acsent_red: "var(--acsent_red)",
        dark_grey: "var(--dark_grey)",
        medium_grey: "var(--medium_grey)",
        base_grey: "var(--base_grey)",
        ligth_grey: "var(--ligth_grey)",
        white: "var(--white)",
        black: "var(--black)",
      },
      backgroundImage: {
        hero: "url('/assets/images/bg_main.jpg')",
      },

      fontFamily: {
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
