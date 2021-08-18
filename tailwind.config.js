const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './packages/renderer/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Indigo 500
        secondary: '#4F46E5', // Indigo 600
        gray: colors.gray,
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
