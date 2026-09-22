/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        barra: "#3A4674",
        boton: "#37426F",
        acento: "#2E5F6E",
        bloq: "#7D9AA3",
        campo: "#F1F2F5",
        label: "#5D6173",
        gris: "#6B6F7C",
        garita: "#3F4A7E",
        morado: "#7B2D8E",
        naranja: "#F57C20",
        verdeaz: "#2E5F6E",
        verde: "#1F7A44",
        rojo: "#B3261E",
      },
      keyframes: {
        late: { "50%": { opacity: "0.25" } },
        entra: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        sube: {
          from: { transform: "translateY(40px)" },
          to: { transform: "none" },
        },
      },
      animation: {
        late: "late 1.2s infinite",
        entra: "entra 0.25s ease-out",
        sube: "sube 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
