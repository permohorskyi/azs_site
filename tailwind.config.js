/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/plugins/formkit/theme.ts", "./src/**/*.vue"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
    screens: {
      "h-md": { raw: "(max-height: 650px)" },
    },
  },
  plugins: [],
}
