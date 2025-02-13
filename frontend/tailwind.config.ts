import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        MainColor: "#1E1F20",
        SecondaryColor: "#2C353D",
        AccnetColor: "#FF4155"
      },
    },
  },
  plugins: [],
} satisfies Config;
