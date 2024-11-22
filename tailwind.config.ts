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
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: 'transparent',
        current: 'currentColor',
        'darkblue':'#130767',
        'middleblue':'#221b96',
        'lightblue':'#312fc3',
        'mustard':'#ffbd59',
        
        'darkwhite':'#DEE4EA',
        'lightwhite':'#F9FCFF'
      },

      fontFamily: {
        'poppins-400': ['var(--font-poppins)', 'sans-serif'],
        'poppins-600': ['var(--font-poppins)', 'sans-serif'],
        'poppins-700': ['var(--font-poppins)', 'sans-serif'],
        'roboto-400': ['var(--font-roboto)', 'sans-serif'],
        'roboto-500': ['var(--font-roboto)', 'sans-serif'],
        'roboto-700': ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
