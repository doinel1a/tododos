/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-state': 'var(--accent-primary-state)'
      }
    }
  }
};
