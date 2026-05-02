import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#050510',
        cyan: { DEFAULT: '#00f0ff', dark: '#00b8cc', light: '#80f8ff' },
        blue: { holo: '#4fc3f7' },
        red: { imperial: '#ff2d2d' },
        gold: '#FFD700',
        green: { saber: '#00ff41' },
        grey: { 100: '#e8eaf0', 200: '#c8ccd6', 300: '#a0a8b8', 400: '#7a84a0', 500: '#5a6480', 600: '#3e4560', 700: '#2a3048', 800: '#181c30', 900: '#0c0e1a' },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'flicker': 'flicker 4s linear infinite',
        'neon-pulse': 'neon-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config