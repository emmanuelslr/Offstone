import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Alliance No.1"', 'sans-serif'],
      },
      colors: {
        accent: 'var(--accent)',
        blue: {
          400: '#60a5fa',
        },
        violet: {
          500: '#8b5cf6',
        },
        zinc: {
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        gray: {
          100: '#f3f4f6',
          300: '#d1d5db',
          400: '#9ca3af',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    'text-white',
    'bg-black',
    'bg-white',
    'text-black',
    'bg-transparent',
    'text-gray-300',
    'text-gray-400',
    'bg-zinc-900',
    'bg-white/10',
    {
      pattern: /from-(black|blue|violet)-(400|500|600|700|800|900)/,
    },
    {
      pattern: /to-(black|blue|violet)-(400|500|600|700|800|900)/,
    },
  ],
}

export default config
