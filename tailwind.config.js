/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        nuvv: {
          purple: '#5A45DE',
          'purple-hover': '#4934C7',
          'purple-light': '#EEF2FF',
          dark: '#0B2154',
          'dark-deep': '#061333',
          green: '#63DDA4',
          'green-dark': '#00C070',
          violet: '#7C3AED',
          accent: '#FFB800',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite',
        'scroll': 'scroll 35s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'nuvv-card': '0 10px 30px -5px rgba(90, 69, 222, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'nuvv-hover': '0 20px 40px -10px rgba(90, 69, 222, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
        'nuvv-glow': '0 0 25px rgba(90, 69, 222, 0.35)',
        'nuvv-green-glow': '0 0 25px rgba(99, 221, 164, 0.4)',
      }
    },
  },
  plugins: [],
}
