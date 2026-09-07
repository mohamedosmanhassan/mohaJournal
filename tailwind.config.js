/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-main)',
        foreground: 'var(--text-main)',
        card: 'var(--bg-card)',
        border: 'var(--border-main)',
        brand: {
          teal: '#12d6a0',
          blue: '#5c7cff',
          purple: '#8b5cf6',
          dark: '#060b14',
          surface: '#0a101e'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #12d6a0 0%, #5c7cff 55%, #93a5ff 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(18, 214, 160, 0.15) 0%, rgba(92, 124, 255, 0.15) 100%)',
        'aurora': 'radial-gradient(ellipse at top, rgba(92, 124, 255, 0.15), transparent 70%), radial-gradient(ellipse at bottom, rgba(18, 214, 160, 0.15), transparent 70%)'
      },
      boxShadow: {
        'premium': '0 24px 70px rgba(0, 0, 0, 0.25)',
        'glow-teal': '0 0 35px -5px rgba(18, 214, 160, 0.3)',
        'glow-blue': '0 0 35px -5px rgba(92, 124, 255, 0.3)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        shine: 'shine 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
