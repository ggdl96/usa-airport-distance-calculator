import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'background-form': '#243c5a24',
        input: "var(--input)",
        'option-highlight': "#c3d5cb",
        error: "#ad2323"
      },
    },
  },
  plugins: [],
} satisfies Config;
