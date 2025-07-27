/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        page: {
          light: "#F9FAFB",
          dark: "#1F2937",
        },
        card: {
          light: "#FFFFFF", // white
          dark: "#111827", // gray‑900
        },
        primary: {
          light: "#3B82F6", // blue‑500
          dark: "#60A5FA", // blue‑400
        },
        secondary: {
          light: "#6B7280", // gray‑500
          dark: "#9CA3AF", // gray‑400
        },
        accent: {
          light: "#F97316", // orange‑500
          dark: "#FB923C", // orange‑400
        },
        success: {
          light: "#10B981",
          dark: "#34D399",
        },
        warning: {
          light: "#F59E0B",
          dark: "#FBBF24",
        },
        danger: {
          light: "#EF4444",
          dark: "#F87171",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["SpaceMono", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
