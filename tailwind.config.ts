import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#0D0E14",
          card: "#1A1B28",
          column: "#13141F",
          elevated: "#1E1F2E",
          border: "#252636",
          line: "#1E1F2E",
        },
        brand: {
          purple: "#6C63FF",
          amber: "#F59E0B",
          blue: "#3B82F6",
          green: "#10B981",
          red: "#EF4444",
        },
        text: {
          primary: "#E8E8F0",
          muted: "#777",
          faint: "#555",
          ghost: "#333",
        },
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(250%)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.25s ease-out",
        fadeUp: "fadeUp 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
