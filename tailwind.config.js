/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand — violet (replaces navy)
        navy: {
          DEFAULT: "#7C3AED",
          deep: "#2A1B54",
          light: "#A78BFA",
          50: "#F3EFFE",
          100: "#EAE3FC",
          200: "#D6C9F9",
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#3B2B5E",
          900: "#2A1B54",
        },
        // Accent — coral/amber gradient pair (replaces gold)
        gold: {
          DEFAULT: "#FB6B6B",
          light: "#FF9B7A",
          dark: "#E14F63",
          50: "#FFEFEF",
        },
        amber: {
          DEFAULT: "#F5A524",
          light: "#FFD166",
          dark: "#B7791F",
          50: "#FFF3DC",
        },
        teal: {
          DEFAULT: "#14B8B0",
          light: "#5EEAD4",
          dark: "#0F8A83",
          50: "#E4F8F6",
        },
        ink: "#1E1B33",
        muted: "#746E8A",
        canvas: "#F6F5FC",
        border: "#ECE9F7",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Sora", "ui-sans-serif", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #FB6B6B 100%)",
        "sidebar-gradient": "linear-gradient(190deg, #2A1B54 0%, #5B2A86 120%)",
        "violet-gradient": "linear-gradient(135deg, #7C3AED, #A78BFA)",
        "coral-gradient": "linear-gradient(135deg, #FB6B6B, #FF9B7A)",
        "teal-gradient": "linear-gradient(135deg, #14B8B0, #5EEAD4)",
        "amber-gradient": "linear-gradient(135deg, #F5A524, #FFD166)",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(30,27,51,0.04), 0 1px 3px 0 rgba(30,27,51,0.06)",
        panel: "0 4px 16px -4px rgba(30,27,51,0.10)",
        dropdown: "0 10px 30px -8px rgba(30,27,51,0.18)",
        glow: "0 8px 20px -6px rgba(124,58,237,0.45)",
        lift: "0 16px 30px -12px rgba(30,27,51,0.18)",
      },
      borderRadius: {
        DEFAULT: "10px",
        xl: "16px",
      },
      keyframes: {
        rise: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(40px,30px) scale(1.15)" },
        },
      },
      animation: {
        rise: "rise .55s ease forwards",
        drift: "drift 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
