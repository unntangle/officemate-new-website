import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        canvas: "#F8F5F2",
        surface: "#EFE9E3",
        ink: "#2D2D2D",
        muted: "#7A6B63",
        accent: {
          DEFAULT: "#C62828",
          soft: "#FDECEA",
        },
        walnut: "#6D4C41",
        line: "#E2D9D0",
        card: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        eyebrow: "0.22em",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(45,45,45,0.06), 0 8px 30px -12px rgba(45,45,45,0.10)",
        lift: "0 10px 40px -12px rgba(45,45,45,0.18)",
        accent: "0 12px 34px -12px rgba(198,40,40,0.40)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
