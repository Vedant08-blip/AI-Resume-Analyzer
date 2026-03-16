/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        "bg-dark": "#020617",
        "card-dark": "rgba(15,23,42,0.9)",
        "accent-purple": "#7c3aed",
        "accent-blue": "#22d3ee",
      },
      boxShadow: {
        glass: "0 18px 45px rgba(15,23,42,0.8)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.18), transparent 55%)",
      },
    },
  },
  plugins: [],
};
