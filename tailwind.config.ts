import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#15283A",
          dark: "#0D1A28",
          light: "#1E3A54",
          subtle: "#244463",
        },
        bronze: {
          DEFAULT: "#866B55",
          light: "#A88D77",
          dark: "#6B523F",
          muted: "#9C7E66",
        },
        warm: {
          white: "#F3EFE8",
          card: "#FAF8F5",
          border: "#E4DCD3",
          dark: "#2A2521",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "'Times New Roman'", "Times", "serif"],
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(13, 26, 40, 0.12)",
        "luxury-lg": "0 25px 50px -12px rgba(13, 26, 40, 0.25)",
        card: "0 4px 20px -2px rgba(21, 40, 58, 0.06)",
        "bronze-glow": "0 0 25px -5px rgba(134, 107, 85, 0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
        shimmer: "shimmer 3s infinite linear",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
