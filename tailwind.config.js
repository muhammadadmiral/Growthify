/** @type {import('tailwindcss').Config} */
export default {
  
  darkMode: 'class',
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // Tambahkan variasi warna untuk dark mode
      colors: {
        // Existing color configurations...
        
        // Dark mode spesifik
        dark: {
          background: '#1E293B',
          text: '#F8FAFC',
          primary: '#4FD1C5',
          secondary: '#63B3ED',
          accent: '#48BB78'
        }
      },
      
      // Optional: tambahkan transisi untuk smooth dark mode switch
      transitionProperty: {
        'dark-mode': 'background-color, color, border-color, text-decoration-color, fill, stroke'
      }
    }
  },
  safelist: [
    // Tambahkan dark mode safelist
    'dark:bg-dark-background',
    'dark:text-dark-text',
    'dark:bg-dark-primary',
    'dark:text-dark-secondary',
    
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
        // New enhanced color palette
        primary: {
          50: '#E6FFFA',
          100: '#B2F5EA',
          200: '#81E6D9',
          300: '#4FD1C5',
          400: '#38B2AC',
          500: '#319795', // Primary teal-green
          600: '#2C7A7B',
          700: '#285E61',
          800: '#234E52',
          900: '#1D4044',
        },
        secondary: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#3182CE', // Secondary blue
          600: '#2B6CB0',
          700: '#2C5282',
          800: '#2A4365',
          900: '#1A365D',
        },
        accent: {
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#38A169', // Accent green
          600: '#2F855A',
          700: '#276749',
          800: '#22543D',
          900: '#1C4532',
        },
        neutral: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
        // New additional colors
        background: {
          light: '#F0F9FF', // Light blue tint for backgrounds
          DEFAULT: '#EDF2F7', // Default background
          dark: '#1E293B', // Dark background
        },
        content: {
          light: '#E0F2FE', // Light content background
          DEFAULT: '#FFFFFF', // Default content background
          dark: '#0F172A', // Dark content background  
        },
        text: {
          light: '#F8FAFC', // Light text
          DEFAULT: '#334155', // Default text (softer than black)
          dark: '#0F172A', // Dark text
          muted: '#64748B', // Muted text
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
        'gradient-cool': 'linear-gradient(135deg, #319795, #3182CE)', // Teal to blue
        'gradient-warm': 'linear-gradient(135deg, #3182CE, #38A169)', // Blue to green
        'gradient-hero': 'linear-gradient(135deg, #E6FFFA, #EBF8FF, #F0FFF4)', // Subtle teal-blue-green
      }
    },
  },
  plugins: [],
}