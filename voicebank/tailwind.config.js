/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The new dark theme palette
        dark: {
          bg: '#0F0F12',      // Main background (very dark)
          card: '#18181C',    // Card background (slightly lighter)
          border: '#2D2D32',  // Border color
          text: '#FFFFFF',    // Main text
          muted: '#8F9098',   // Secondary text
        },
        brand: {
          500: '#6C5DD3', // Purple accent (like the reference image)
          600: '#594BB8',
          glow: 'rgba(108, 93, 211, 0.5)'
        },
        accent: {
          green: '#22C55E',
          blue: '#3B82F6',
          orange: '#F97316',
          purple: '#A855F7'
        }
      },
      animation: {
        'mic-pulse': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5', boxShadow: '0 0 0 0 rgba(108, 93, 211, 0.7)' },
          '100%': { transform: 'scale(2.2)', opacity: '0', boxShadow: '0 0 0 20px rgba(108, 93, 211, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}