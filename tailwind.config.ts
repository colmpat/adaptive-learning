import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f8fa',
        fgDefault: '#24292f',
        fgMuted: '#57606a',
        fgSubtle: '#6e7781'
      },
    },
  },
  plugins: [],
} satisfies Config;
