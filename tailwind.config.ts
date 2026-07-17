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
        canvas: "#FFFFFF",
        surface: "#F5F5F5",
        ink: "#2D2D2D",
        muted: "#666666",
        accent: {
          DEFAULT: "#C62828",
          soft: "#FDECEA",
        },
        /* Ergonomics palette — used by the Chair Health Score and Advisor so
           scoring reads as measurement, not as a brand-red sales message. */
        sage: {
          DEFAULT: "#7FB69A",
          soft: "#E8F3EC",
          ink: "#356B52",
        },
        honey: {
          DEFAULT: "#E5B972",
          soft: "#FBF1DF",
          ink: "#8A5D1E",
        },
        lilac: {
          DEFAULT: "#A493C9",
          soft: "#F0ECF8",
          ink: "#4B3F72",
        },
        /* Utility blue for viewer controls (3D / AR). Deliberately outside the
           brand red: these are tools for inspecting the product, not calls to
           action, and reading them as "buy" would be wrong. */
        azure: {
          DEFAULT: "#2F6FEB",
          soft: "#E8F0FE",
          ink: "#1A46A8",
        },
        /* Warm neutral used for full-width section grounds. */
        cream: "#FBF6EC",
        walnut: "#6D4C41",
        line: "#E5E5E5",
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
        /* Barely-there edge for the full-width header — a hint of separation
           without the bar looking like it floats above the page. */
        hairline: "0 1px 2px -1px rgba(45,45,45,0.04), 0 4px 16px -12px rgba(45,45,45,0.10)",
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
        "zoom-in-out": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        marquee: "marquee 80s linear infinite",
        "zoom-in-out": "zoom-in-out 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
