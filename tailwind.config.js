/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'in-pop': { '0%': { opacity: 0, transform: 'scale(.92)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        'fade':   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'float':  { '0%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' }, '100%': { transform: 'translateY(0)' } }
      },
      animation: {
        'in-pop': 'in-pop .25s ease-out both',
        'fade': 'fade .25s ease-out both',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 10px 40px rgba(2,132,199,.25)'
      }
    },
  },
  plugins: [],
}

