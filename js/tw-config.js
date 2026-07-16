/* Tailwind CDN brand config — mirrors AI Studio @theme tokens */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#fdfdfa",
          cream: "#faf7f2",
          "cream-dark": "#f0ebe1",
          green: {
            50: "#f4f7f5",
            100: "#e2ede5",
            150: "#e8f0eb",
            500: "#2d5a3f",
            600: "#21432f",
            700: "#162f21",
            800: "#0d1e15",
            900: "#070f0a",
            950: "#030805"
          },
          yellow: {
            400: "#d4af37",
            500: "#c5a028"
          },
          teal: {
            50: "#f1f5f9",
            100: "#e2e8f0",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b"
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      maxWidth: {
        "7xl": "80rem"
      }
    }
  }
};
