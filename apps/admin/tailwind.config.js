/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary, #f4f7fe)",
        "bg-secondary": "var(--bg-secondary, #ffffff)",
        "bg-tertiary": "var(--bg-tertiary, #f8fafc)",
        "text-primary": "var(--text-primary, #1B2559)",
        "text-secondary": "var(--text-secondary, #475569)",
        "text-tertiary": "var(--text-tertiary, #94a3b8)",
        "accent-primary": "var(--accent-primary, #702DFF)",
        "accent-secondary": "var(--accent-secondary, #5D1FDB)",
        "border-color": "var(--border-color, #e2e8f0)",
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
