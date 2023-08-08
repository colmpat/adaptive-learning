import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        main: "calc(100vh - 4rem)",
      },
      colors: {
        canvas: '#f6f8fa',
        fgDefault: '#24292f',
        fgMuted: '#57606a',
        fgSubtle: '#6e7781',
        borderDefault: "#d0d7de",
      },
    },
  },
  plugins: [],
} satisfies Config;
