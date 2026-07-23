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
        background: "#FAFBFC",
        foreground: "#0F172A",
        primary: {
          DEFAULT: "#0D9488",
          dark: "#0F766E",
          light: "#CCFBF1",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#D97706",
          light: "#FEF3C7",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #134E4A 100%)",
        "gradient-accent": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "gradient-hero": "linear-gradient(135deg, rgba(13,148,136,0.9) 0%, rgba(15,118,110,0.8) 50%, rgba(19,78,74,0.9) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.12)",
        "glow": "0 0 20px rgba(13, 148, 136, 0.3)",
        "glow-accent": "0 0 20px rgba(245, 158, 11, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
