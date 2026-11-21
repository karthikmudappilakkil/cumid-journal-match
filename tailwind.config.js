/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4EDE0',
          300: '#EADFCF',
          400: '#DFCDB7',
          900: '#2A2621',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E7EFE7',
          200: '#D2E1D2',
          300: '#B4CCB4',
          400: '#91B291',
          500: '#729772',
          700: '#466246',
          900: '#233423',
        },
        lavender: {
          50: '#F8F6FA',
          100: '#F1ECF5',
          200: '#E3DAEC',
          300: '#CEBEDE',
          400: '#B69ECC',
          500: '#9C7EBA',
          700: '#694E85',
          900: '#39284B',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E5DFD7',
          300: '#D5CCC1',
          400: '#B8ABA0',
        },
        terracotta: {
          50: '#FBF5F3',
          100: '#F6E8E3',
          400: '#D48C7B',
          600: '#B35E4B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(42, 38, 33, 0.05)',
        'soft-md': '0 8px 24px -4px rgba(42, 38, 33, 0.07)',
        'soft-lg': '0 16px 36px -8px rgba(42, 38, 33, 0.10)',
        'soft-hover': '0 20px 40px -12px rgba(42, 38, 33, 0.14)',
      }
    },
  },
  plugins: [],
};
