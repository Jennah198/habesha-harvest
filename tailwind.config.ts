import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class', 'dark'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C8531A',
          light: '#E8744A',
          dark: '#A03F12',
        },
        forest: {
          DEFAULT: '#2D5016',
          light: '#3D6B1E',
        },
        gold: {
          DEFAULT: '#F5C842',
          dark: '#D4A520',
        },
        linen: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE1',
        },
        espresso: {
          DEFAULT: '#1A1208',
          light: '#2C1F0D',
        },
        warmBrown: '#2C1A0E',
        action: '#F97316',
        cta: '#22C55E',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
