/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      // Safelist untuk warna tema
      {
        pattern: /bg-(primary|secondary|accent|neutral)-(50|100|200|300|400|500|600|700|800|900)/,
      },
      {
        pattern: /text-(primary|secondary|accent|neutral)-(50|100|200|300|400|500|600|700|800|900)/,
      },
      {
        pattern: /border-(primary|secondary|accent|neutral)-(50|100|200|300|400|500|600|700|800|900)/,
      },
      // Safelist untuk gradient dan shadows
      'bg-gradient-premium',
      'shadow-elegant',
      'shadow-premium',
      // Safelist untuk layout
      'container',
      'flex',
      'flex-col',
      'items-center',
      'justify-between',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#E6F6EF',
            100: '#C1E9D7',
            200: '#9ADCBF',
            300: '#73CFA7',
            400: '#4DC293',
            500: '#38A169', // Primary green
            600: '#2F8A59',
            700: '#27744A',
            800: '#1F5D3A',
            900: '#17472B',
          },
          secondary: {
            50: '#E6F1FB',
            100: '#C1DBF5',
            200: '#9BC4EF',
            300: '#76AEE9',
            400: '#5098E3',
            500: '#3182CE', // Secondary blue
            600: '#2A6CB0',
            700: '#235792',
            800: '#1C4573',
            900: '#153455',
          },
          accent: {
            50: '#FDF1E7',
            100: '#FADBC2',
            200: '#F7C59C',
            300: '#F4AF76',
            400: '#F19951',
            500: '#ED8936', // Accent orange
            600: '#CB752E',
            700: '#A96126',
            800: '#864E1F',
            900: '#643A17',
          },
          neutral: {
            50: '#F7FAFC',
            100: '#EDF2F7',
            200: '#E2E8F0',
            300: '#CBD5E0',
            400: '#A0AEC0',
            500: '#718096',
            600: '#4A5568',
            700: '#2D3748', // Dark charcoal
            800: '#1A202C',
            900: '#171923',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          heading: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        },
        boxShadow: {
          'elegant': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        backgroundImage: {
          'gradient-premium': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        }
      },
    },
    plugins: [],
  }